<?php

// ===== 1. Criação de arrays =====
$numeros1 = [1, 2, 3];
$numeros2 = [4, 5, 6];

// array_merge: junta arrays
$todosNumeros = array_merge($numeros1, $numeros2);

// range: cria um array de 1 a 10
$intervalo = range(1, 10);

// array_fill: preenche array com valores iguais
$repetidos = array_fill(0, 5, 'PHP');

// array_combine: combina chaves com valores
$chaves = ['nome', 'idade'];
$valores = ['João', 30];
$associativo = array_combine($chaves, $valores);

// ===== 2. Debugging =====
echo "\n--- Debugging ---\n";
print_r($associativo);
var_dump($todosNumeros);
var_export($intervalo);

// ===== 3. Verificações =====
echo "\n--- Verificações ---\n";
echo in_array(5, $todosNumeros) ? "5 está no array\n" : "5 não está no array\n";
echo array_key_exists('idade', $associativo) ? "Chave 'idade' existe\n" : "Não existe\n";
echo "Índice de 4 no array: " . array_search(4, $todosNumeros) . "\n";

// ===== 4. Ordenação =====
echo "\n--- Ordenação ---\n";
sort($todosNumeros);    // Ordena e reseta índices
print_r($todosNumeros);

rsort($todosNumeros);   // Ordem reversa
print_r($todosNumeros);

asort($intervalo);      // Mantém índices
print_r($intervalo);

ksort($associativo);    // Ordena por chave
print_r($associativo);

// ===== 5. Estatísticas =====
echo "\n--- Estatísticas ---\n";
echo "Total de números: " . count($todosNumeros) . "\n";
echo "Soma dos números: " . array_sum($todosNumeros) . "\n";

// Duplicados e contagem de frequência
$comDuplicatas = [1, 2, 2, 3, 3, 3, 4];
$unicos = array_unique($comDuplicatas);
print_r($unicos);
print_r(array_count_values($comDuplicatas));

// ===== 6. Extração =====
echo "\n--- Extração ---\n";
$fatia = array_slice($todosNumeros, 1, 3);
print_r($fatia);

array_splice($todosNumeros, 2, 1); // Remove elemento
print_r($todosNumeros);

$blocos = array_chunk($todosNumeros, 2);
print_r($blocos);

// ===== 7. Funções com callback =====
echo "\n--- Funções com callback ---\n";
$nomes = ['ana', 'carlos', 'joão'];

$nomesMaiusculos = array_map(fn($n) => strtoupper($n), $nomes);
print_r($nomesMaiusculos);

$maioresQue2 = array_filter($comDuplicatas, fn($n) => $n > 2);
print_r($maioresQue2);

$somaTotal = array_reduce($comDuplicatas, fn($acum, $n) => $acum + $n, 0);
echo "Soma via reduce: $somaTotal\n";

// ===== 8. Loop foreach =====
echo "\n--- Foreach ---\n";
foreach ($associativo as $chave => $valor) {
    echo "$chave => $valor\n";
}
?>
