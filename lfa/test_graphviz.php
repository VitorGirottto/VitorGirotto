<?php

$dot = <<<DOT
digraph Test {
    rankdir=LR;
    node [shape=box, style=filled, color=lightblue];

    Inicio -> Processando;
    Processando -> Finalizado;
}
DOT;

file_put_contents("teste.dot", $dot);

$output = [];
$return_var = 0;

exec("dot -Tpng teste.dot -o teste.png 2>&1", $output, $return_var);

echo "<pre>";
echo "Output:\n";
print_r($output);
echo "Status: $return_var\n";
echo "</pre>";

if (file_exists("teste.png")) {
    echo "<h2>Imagem gerada com sucesso:</h2>";
    echo "<img src='teste.png' />";
} else {
    echo "<h2>Erro ao gerar imagem.</h2>";
}
