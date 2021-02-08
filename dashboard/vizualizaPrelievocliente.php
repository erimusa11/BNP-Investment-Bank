<?php
session_start();
include 'functions.php';

if (!isset($_SESSION['user_id'])) {
  header("Location: ../index.php");
}

if (isset($_POST['logout'])) {
  $_SESSION = array();
  session_destroy();
  return header("Location: ../index.php");
  exit();
}
?>

<!DOCTYPE html>
<html lang="zxx">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="assets/img/basic/favicon.ico" type="image/x-icon">
    <title>Panello di controllo</title>

    <?php include "cssLinks.php" ?>

</head>

<body class="light">

    <?php include "leftMenu.php"; ?>

    <!--Sidebar End-->
    <div class="page has-sidebar-left">
        <div class="pos-f-t">
            <div class="collapse" id="navbarToggleExternalContent">
                <div class="bg-dark pt-2 pb-2 pl-4 pr-2">
                    <div class="search-bar">
                        <input class="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50" type="text"
                            placeholder="start typing...">
                    </div>
                    <a href="#" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-expanded="false"
                        aria-label="Toggle navigation" class="paper-nav-toggle paper-nav-white active "><i></i></a>
                </div>
            </div>
        </div>
        <?php include "topMenu.php" ?>

        <div class="container-fluid animatedParent animateOnce my-3">
            <div class="animated fadeInUpShort">
                <div class="card">

                    <div class="mt-3"
                        style="height:62px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; block-size:62px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px; width: 100%;">
                        <div style="height:40px; padding:0px; margin:0px; width: 100%;"><iframe
                                src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1506&invert_hover=no"
                                width="100%" height="36px" scrolling="auto" marginwidth="0" marginheight="0"
                                frameborder="0" border="0" style="border:0;margin:0;padding:0;"></iframe></div>
                        <div
                            style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
                            <a href="https://coinlib.io" target="_blank"
                                style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency
                                Prices</a>&nbsp;by NPM PARIBAS BANK
                        </div>
                    </div>
                    <div class="invoice white shadow  ">
                        <div class="p-5 col-12 ">
                            <br>
                            <table class="table table-bordered table-hover data-tables"
                                data-options='{"searching":true}'>
                                <thead>
                                    <tr>
                                        <th>Beneficario</th>
                                        <th>Swift</th>
                                        <th>Importo</th>
                                        <th>Iban</th>
                                        <th>Causale</th>
                                        <th>Stato</th>
                                        <th>Citta</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <?php
                                     
                                                global $connection;
                                                $client_id = $_SESSION['user_id'];
                                                $query_find= "SELECT * FROM prelievo WHERE client_id='$client_id'";
                                                $result_find= mysqli_query($connection,$query_find);
                                                while($row_find=mysqli_fetch_array($result_find)){



                                              

                                    
                                    ?>
                                    <tr>
                                        <td><?php echo $row_find['beneficario']  ?></td>
                                        <td><?php echo $row_find['swift']  ?></td>
                                        <td><?php echo $row_find['importo']."€"  ?></td>
                                        <td><?php echo $row_find['iban']  ?></td>
                                        <td><?php echo $row_find['causale']  ?></td>
                                        <td><?php echo $row_find['stato']  ?></td>
                                        <td><?php echo $row_find['citta']  ?></td>
                                    </tr>

                                    <?php 
                                    
                                }
            
                                    ?>

                                    </tfoot>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <?php include "scripts.php";
    
 ?>

</html>