<?php
// process.php – Processa a gramática, gera AFN, AFD, AFM e mostra resultados
require_once 'automata.php';

session_start();

// ----------------------
// Função para gerar .dot e .png
// ----------------------
function gerarImagemAutomato($nome, $aut) {

    if (!is_dir("graphs")) {
        mkdir("graphs", 0777, true);
    }

    $dotFile = "graphs/$nome.dot";
    $pngFile = "graphs/$nome.png";

    // gera conteúdo DOT pelo automata.php
    $dot = automaton_to_dot($aut);

    file_put_contents($dotFile, $dot);

    // gera PNG usando Graphviz
    exec("dot -Tpng $dotFile -o $pngFile");
}

// ----------------------
// Processar arquivo enviado
// ----------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['grammar_file'])) {
    $file = $_FILES['grammar_file'];
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        die("Erro ao fazer upload do arquivo.");
    }
    
    $content  = file_get_contents($file['tmp_name']);
    $grammar  = parse_grammar($content);
    $afn      = grammar_to_afn($grammar);
    $afd      = afn_to_afd($afn);
    $afm      = minimize_afd($afd);

    // Guardar em sessão para exportação
    $_SESSION['grammar'] = $grammar;
    $_SESSION['afn']     = $afn;
    $_SESSION['afd']     = $afd;
    $_SESSION['afm']     = $afm;

} else {
    // Chamou sem POST – recupera sessão ou redireciona
    if (isset($_SESSION['grammar'], $_SESSION['afn'], $_SESSION['afd'], $_SESSION['afm'])) {
        $grammar = $_SESSION['grammar'];
        $afn     = $_SESSION['afn'];
        $afd     = $_SESSION['afd'];
        $afm     = $_SESSION['afm'];
    } else {
        header("Location: index.php");
        exit;
    }
}

// ----------------------
// Gerar as imagens com Graphviz
// ----------------------
gerarImagemAutomato("afn", $afn);
gerarImagemAutomato("afd", $afd);
gerarImagemAutomato("afm", $afm);

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Resultados - Autômatos Finitos</title>
    <link rel="stylesheet" href="assets/style.css">
</head>

<body>
    <div class="container">

        <header class="header">
            <h1>🤖 Resultados do Processamento</h1>
            <a href="index.php" class="btn-back">⬅️ Voltar</a>
        </header>

        <!-- Gramática Original -->
        <div class="result-card">
            <h2>📝 Gramática Original</h2>

            <table class="data-table">
                <thead>
                    <tr>
                        <th>Não-Terminal</th>
                        <th>Produções</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($grammar['productions'] as $nt => $prods): ?>
                        <tr>
                            <td><strong>&lt;<?= htmlspecialchars($nt) ?>&gt;</strong></td>
                            <td><?= htmlspecialchars(implode(' | ', $prods)) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <div class="info-box">
                <strong>Terminais:</strong> <?= implode(', ', $grammar['terminals']) ?><br>
                <strong>Não-Terminais:</strong> <?= implode(', ', $grammar['non_terminals']) ?><br>
                <strong>Símbolo Inicial:</strong> &lt;<?= htmlspecialchars($grammar['start']) ?>&gt;
            </div>
        </div>

        <!-- AFN -->
        <div class="result-card">
            <h2>🔷 AFN - Autômato Finito Não-Determinístico</h2>
            <?php render_automaton_table($afn); ?>

            <img src="graphs/afn.png" class="dfa-img">

            <div class="button-group">
                <a href="export.php?type=afn" class="btn-export">💾 Exportar AFN (CSV)</a>
            </div>
        </div>

        <!-- AFD -->
        <div class="result-card">
            <h2>🔶 AFD - Autômato Finito Determinístico</h2>
            <?php render_automaton_table($afd); ?>

            <img src="graphs/afd.png" class="dfa-img">

            <div class="button-group">
                <a href="export.php?type=afd" class="btn-export">💾 Exportar AFD (CSV)</a>
            </div>
        </div>

        <!-- AFM -->
        <div class="result-card">
            <h2>⚡ AFM - Autômato Finito Mínimo</h2>
            <?php render_automaton_table($afm); ?>

            <img src="graphs/afm.png" class="dfa-img">

            <div class="button-group">
                <a href="export.php?type=afm" class="btn-export">💾 Exportar AFM (CSV)</a>
            </div>
        </div>

    </div>

    <script src="assets/script.js"></script>
</body>
</html>
