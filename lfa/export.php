<?php
// export.php – Exporta AFN/AFD/AFM em CSV
session_start();

if (!isset($_GET['type'])) {
    die('Tipo de autômato não informado.');
}

$type = strtolower($_GET['type']);
$key  = null;

switch ($type) {
    case 'afn':
        $key = 'afn';
        $filename = 'afn.csv';
        break;
    case 'afd':
        $key = 'afd';
        $filename = 'afd.csv';
        break;
    case 'afm':
        $key = 'afm';
        $filename = 'afm.csv';
        break;
    default:
        die('Tipo inválido.');
}

if (!isset($_SESSION[$key])) {
    die('Autômato não encontrado na sessão.');
}

$aut = $_SESSION[$key];

header('Content-Type: text/csv; charset=utf-8');
header("Content-Disposition: attachment; filename=\"$filename\"");

$output = fopen('php://output', 'w');
fputcsv($output, ['Estado', 'Símbolo', 'Destino']);

foreach ($aut['states'] as $s) {
    foreach ($aut['alphabet'] as $a) {
        if (!isset($aut['transitions'][$s][$a])) {
            continue;
        }
        $d = $aut['transitions'][$s][$a];

        if (is_array($d)) {
            foreach ($d as $dest) {
                fputcsv($output, [$s, $a, $dest]);
            }
        } else {
            fputcsv($output, [$s, $a, $d]);
        }
    }
}

fclose($output);
exit;
