<?php
// automata.php – Lógica de gramática e autômatos

/**
 * Estrutura de um autômato usada neste projeto:
 * [
 *   'states'      => ['S', 'A', ...],
 *   'alphabet'    => ['a', 'b'],
 *   'initial'     => 'S',
 *   'finals'      => ['S', 'A'],
 *   'transitions' => [
 *       'S' => ['a' => ['A'], 'b' => ['B']],
 *       'A' => ['a' => ['A'], 'b' => ['C']],
 *   ]
 * ]
 */

/**
 * Faz o parse de uma gramática em BNF.
 */
function parse_grammar(string $content): array
{
    $lines         = preg_split("/\r\n|\n|\r/", trim($content));
    $productions   = [];
    $non_terminals = [];
    $terminals_set = [];
    $start         = null;

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '') continue;

        if (!preg_match('/^<([^>]+)>\s*::=\s*(.+)$/', $line, $m)) {
            continue; // linha inválida, ignora
        }

        $lhs      = $m[1];
        $rhs_str  = $m[2];

        if ($start === null) {
            $start = $lhs;
        }

        $non_terminals[$lhs] = true;

        $alts = preg_split('/\|/', $rhs_str);
        foreach ($alts as $alt) {
            $alt = trim($alt);
            if ($alt === '') continue;

            $productions[$lhs][] = $alt;

            if ($alt === 'ε') {
                continue;
            }

            // captura terminais (letras minúsculas)
            if (preg_match_all('/[a-z]/', $alt, $tm)) {
                foreach ($tm[0] as $t) {
                    $terminals_set[$t] = true;
                }
            }
        }
    }

    return [
        'productions'   => $productions,
        'non_terminals' => array_keys($non_terminals),
        'terminals'     => array_keys($terminals_set),
        'start'         => $start ?? 'S',
    ];
}

/**
 * Converte gramática regular para AFN.
 */
function grammar_to_afn(array $grammar): array
{
    $states   = $grammar['non_terminals'];
    $alphabet = $grammar['terminals'];
    $initial  = $grammar['start'];
    $finals   = [];
    $trans    = [];

    foreach ($states as $s) {
        $trans[$s] = [];
        foreach ($alphabet as $a) {
            $trans[$s][$a] = [];
        }
    }

    foreach ($grammar['productions'] as $nt => $prods) {
        foreach ($prods as $p) {
            $p = trim($p);

            if ($p === 'ε') {
                if (!in_array($nt, $finals, true)) {
                    $finals[] = $nt;
                }
                continue;
            }

            // padrão a<B> ou a
            if (preg_match('/^([a-z])(?:<([^>]+)>)?$/', $p, $m)) {
                $symbol = $m[1];
                $dest   = $m[2] ?? null;

                if ($dest === null) {
                    // produção do tipo a (sem não-terminal) – cria estado final implícito
                    $sink = '#F#';
                    if (!in_array($sink, $states, true)) {
                        $states[] = $sink;
                        $trans[$sink] = [];
                        foreach ($alphabet as $a) {
                            $trans[$sink][$a] = [];
                        }
                        $finals[] = $sink;
                    }
                    $dest = $sink;
                }

                if (!isset($trans[$nt][$symbol])) {
                    $trans[$nt][$symbol] = [];
                }
                if (!in_array($dest, $trans[$nt][$symbol], true)) {
                    $trans[$nt][$symbol][] = $dest;
                }
            }
        }
    }

    if (empty($finals)) {
        $finals[] = $initial; // fallback
    }

    return [
        'states'      => $states,
        'alphabet'    => $alphabet,
        'initial'     => $initial,
        'finals'      => $finals,
        'transitions' => $trans,
        'type'        => 'AFN',
    ];
}

/**
 * Determiniza AFN em AFD (construção do conjunto de estados).
 */
function afn_to_afd(array $afn): array
{
    $alphabet = $afn['alphabet'];
    $initialSet = [$afn['initial']];

    $queue     = [];
    $stateSets = []; // key => ['name' => qX, 'set' => [...]]
    $trans     = [];
    $finals    = [];

    $makeKey = function(array $set): string {
        sort($set);
        return implode(',', $set);
    };

    $key0 = $makeKey($initialSet);
    $stateSets[$key0] = ['name' => 'q0', 'set' => $initialSet];
    $queue[] = $key0;

    $idx = 1;

    while (!empty($queue)) {
        $key = array_shift($queue);
        $info = $stateSets[$key];
        $name = $info['name'];
        $set  = $info['set'];

        if (!isset($trans[$name])) {
            $trans[$name] = [];
        }

        foreach ($alphabet as $symbol) {
            $destSet = [];

            foreach ($set as $s) {
                if (isset($afn['transitions'][$s][$symbol])) {
                    foreach ($afn['transitions'][$s][$symbol] as $d) {
                        if (!in_array($d, $destSet, true)) {
                            $destSet[] = $d;
                        }
                    }
                }
            }

            if (empty($destSet)) {
                continue; // sem transição definida
            }

            $destKey = $makeKey($destSet);
            if (!isset($stateSets[$destKey])) {
                $stateSets[$destKey] = [
                    'name' => 'q' . $idx,
                    'set'  => $destSet,
                ];
                $queue[] = $destKey;
                $idx++;
            }

            $trans[$name][$symbol] = $stateSets[$destKey]['name'];
        }
    }

    // estados finais: conjuntos que contêm algum final do AFN
    $afdStates = [];
    $afdFinals = [];
    $afdInitial = 'q0';

    foreach ($stateSets as $info) {
        $afdStates[] = $info['name'];
        foreach ($info['set'] as $s) {
            if (in_array($s, $afn['finals'], true)) {
                if (!in_array($info['name'], $afdFinals, true)) {
                    $afdFinals[] = $info['name'];
                }
                break;
            }
        }
    }

    return [
        'states'      => $afdStates,
        'alphabet'    => $alphabet,
        'initial'     => $afdInitial,
        'finals'      => $afdFinals,
        'transitions' => $trans,
        'type'        => 'AFD',
    ];
}

/**
 * Minimiza um AFD e retorna AFM.
 */
function minimize_afd(array $afd): array
{
    $states   = $afd['states'];
    $alphabet = $afd['alphabet'];
    $initial  = $afd['initial'];
    $finals   = $afd['finals'];
    $trans    = $afd['transitions'];

    // Partições iniciais: finais e não-finais
    $P = [];
    $F = $finals;
    $NF = array_values(array_diff($states, $F));
    if (!empty($F))  $P[] = $F;
    if (!empty($NF)) $P[] = $NF;

    $getBlockIndex = function(string $state, array $partition): ?int {
        foreach ($partition as $i => $block) {
            if (in_array($state, $block, true)) return $i;
        }
        return null;
    };

    $changed = true;
    while ($changed) {
        $changed = false;
        $newP = [];

        foreach ($P as $block) {
            $groups = [];

            foreach ($block as $s) {
                $keyParts = [];
                foreach ($alphabet as $a) {
                    $dest = $trans[$s][$a] ?? null;
                    $keyParts[] = $dest === null ? 'Ø' : $getBlockIndex($dest, $P);
                }
                $key = implode('|', $keyParts);
                $groups[$key][] = $s;
            }

            if (count($groups) === 1) {
                $newP[] = array_values($block);
            } else {
                foreach ($groups as $g) {
                    $newP[] = array_values($g);
                }
                $changed = true;
            }
        }

        $P = $newP;
    }

    // Criar novos estados p0, p1, ...
    $afmStates   = [];
    $afmFinals   = [];
    $afmTrans    = [];
    $afmInitial  = null;

    foreach ($P as $i => $block) {
        $newName = 'p' . $i;
        $afmStates[] = $newName;

        // inicial
        if (in_array($initial, $block, true)) {
            $afmInitial = $newName;
        }

        // final
        foreach ($block as $s) {
            if (in_array($s, $finals, true)) {
                $afmFinals[] = $newName;
                break;
            }
        }
    }

    // transições
    foreach ($P as $i => $block) {
        $rep    = $block[0];
        $from   = 'p' . $i;
        $afmTrans[$from] = [];

        foreach ($alphabet as $a) {
            if (!isset($trans[$rep][$a])) continue;
            $dest = $trans[$rep][$a];
            $blockIndex = $getBlockIndex($dest, $P);
            if ($blockIndex === null) continue;
            $afmTrans[$from][$a] = 'p' . $blockIndex;
        }
    }

    if ($afmInitial === null && !empty($afmStates)) {
        $afmInitial = $afmStates[0];
    }

    $afmFinals = array_values(array_unique($afmFinals));

    return [
        'states'      => $afmStates,
        'alphabet'    => $alphabet,
        'initial'     => $afmInitial,
        'finals'      => $afmFinals,
        'transitions' => $afmTrans,
        'type'        => 'AFM',
    ];
}

/**
 * Renderiza tabela de transições (AFN/AFD/AFM).
 */
function render_automaton_table(array $aut)
{
    $states   = $aut['states'];
    $alphabet = $aut['alphabet'];
    $initial  = $aut['initial'];
    $finals   = $aut['finals'];
    $trans    = $aut['transitions'];
    ?>
    <table class="data-table">
        <thead>
            <tr>
                <th>Estado</th>
                <?php foreach ($alphabet as $a): ?>
                    <th><?= htmlspecialchars($a) ?></th>
                <?php endforeach; ?>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($states as $s): ?>
                <tr>
                    <td>
                        <?php
                            $mark = [];
                            if ($s === $initial) $mark[] = '→';
                            if (in_array($s, $finals, true)) $mark[] = '★';
                            echo htmlspecialchars($s);
                            if ($mark) echo ' <span class="state-flags">'.implode(' ', $mark).'</span>';
                        ?>
                    </td>
                    <?php foreach ($alphabet as $a): ?>
                        <td>
                            <?php
                                if (!isset($trans[$s][$a])) {
                                    echo '–';
                                } else {
                                    $d = $trans[$s][$a];
                                    if (is_array($d)) {
                                        echo '{'.implode(', ', $d).'}';
                                    } else {
                                        echo htmlspecialchars($d);
                                    }
                                }
                            ?>
                        </td>
                    <?php endforeach; ?>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="info-box">
        Estado inicial: <?= htmlspecialchars($initial) ?><br>
        Estados finais: <?= empty($finals) ? '—' : implode(', ', $finals) ?>
    </div>
    <?php
}

/**
 * Renderiza visualização em cards dos estados e transições.
 */
function render_automaton_diagram(array $aut)
{
    $states   = $aut['states'];
    $alphabet = $aut['alphabet'];
    $initial  = $aut['initial'];
    $finals   = $aut['finals'];
    $trans    = $aut['transitions'];
    ?>
    <div class="diagram-grid">
        <?php foreach ($states as $s): ?>
            <?php
                $classes = 'state-card';
                if ($s === $initial) $classes .= ' state-initial';
                if (in_array($s, $finals, true)) $classes .= ' state-final';
            ?>
            <div class="<?= $classes ?>">
                <div class="state-title">
                    <?= htmlspecialchars($s) ?>
                </div>
                <div class="state-subtitle">
                    <?php
                    $flags = [];
                    if ($s === $initial) $flags[] = 'Inicial';
                    if (in_array($s, $finals, true)) $flags[] = 'Final';
                    echo $flags ? implode(' • ', $flags) : '&nbsp;';
                    ?>
                </div>
                <div class="state-transitions">
                    <?php foreach ($alphabet as $a): ?>
                        <div class="transition-line">
                            <?php
                                $dest = $trans[$s][$a] ?? null;
                                if ($dest === null) {
                                    echo htmlspecialchars($a).' → —';
                                } else {
                                    if (is_array($dest)) {
                                        $txt = '{'.implode(', ', $dest).'}';
                                    } else {
                                        $txt = $dest;
                                    }
                                    echo htmlspecialchars($a).' → '.$txt;
                                }
                            ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php
}
function automaton_to_dot(array $aut): string
{
    $dot = "digraph automaton {\n";
    $dot .= "    rankdir=LR;\n";
    $dot .= "    size=\"10,5\";\n\n";

    $dot .= "    node [shape=point]; qi;\n";
    $dot .= "    qi -> " . $aut['initial'] . ";\n\n";

    // finais com doublecircle
    if (!empty($aut['finals'])) {
        $dot .= "    node [shape=doublecircle]; " . implode(" ", $aut['finals']) . ";\n";
    }

    // não finais
    $nonFinals = array_diff($aut['states'], $aut['finals']);
    if (!empty($nonFinals)) {
        $dot .= "    node [shape=circle]; " . implode(" ", $nonFinals) . ";\n";
    }

    $dot .= "\n";

    foreach ($aut['transitions'] as $state => $transitions) {
        foreach ($transitions as $symbol => $dest) {

            if (is_array($dest)) {
                foreach ($dest as $d) {
                    $dot .= "    $state -> $d [label=\"$symbol\"];\n";
                }
            } else {
                $dot .= "    $state -> $dest [label=\"$symbol\"];\n";
            }
        }
    }

    $dot .= "}\n";
    return $dot;
}
