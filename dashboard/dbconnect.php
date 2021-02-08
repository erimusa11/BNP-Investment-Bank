<?php

// the conection of database local host  where the datas are stored
DEFINE('DB_HOSTNAME', 'localhost');
DEFINE('DB_DATABASE', 'dilaxzzk_bnpbankdb');
DEFINE('DB_USERNAME', 'dilaxzzk_bnpbankuser');
DEFINE('DB_PASSWORD', 'gzav-cmf!1nc');

DEFINE('CONTROLL', '#5484Dfs');

$connection = mysqli_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
mysqli_set_charset($connection, "utf8");