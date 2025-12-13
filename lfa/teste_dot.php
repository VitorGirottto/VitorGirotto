<?php
$output = [];
exec("dot -V 2>&1", $output);
echo "<pre>";
print_r($output);
