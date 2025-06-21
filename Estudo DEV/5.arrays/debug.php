<?php

//formas mais utilizadas para debugar arrays


// Exemplo de array complexo
$array = [
    'nome' => 'João',
    'idade' => 30,
    'linguagens' => ['PHP', 'JavaScript', 'Python'],
    'ativo' => true
];

echo "<h2>Debug Básico</h2>";

// --- print_r() ---
echo "<h3>print_r()</h3>";
echo '<pre>';
print_r($array);
echo '</pre>';

// --- var_dump() ---
echo "<h3>var_dump()</h3>";
echo '<pre>';
var_dump($array);
echo '</pre>';

// --- var_export() ---
echo "<h3>var_export()</h3>";
echo '<pre>';
var_export($array);
echo '</pre>';

// --- debug_zval_dump() ---
echo "<h3>debug_zval_dump()</h3>";
echo '<pre>';
debug_zval_dump($array);
echo '</pre>';

// --- json_encode (console do navegador) ---
echo "<h2>Debug no Console do Navegador (json_encode)</h2>";
echo "<script>console.log(" . json_encode($array) . ");</script>";

// --- Logs usando error_log ---
echo "<h2>Debug via error_log()</h2>";
error_log("Log com print_r:");
error_log(print_r($array, true));

error_log("Log com json_encode:");
error_log(json_encode($array));

// --- Teste de visualização em JSON direto (opcional) ---
echo "<h2>Visualização JSON direta</h2>";
echo '<pre>';
echo json_encode($array, JSON_PRETTY_PRINT);
echo '</pre>';

?>
