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

global $connection;
$client_id= $_SESSION['user_id'];
  $find_client = "SELECT * FROM client WHERE client_id='$client_id'";
 
  $find_result= mysqli_query($connection,$find_client);
  $row_find= mysqli_fetch_assoc($find_result);

  $query_guadagno = "SELECT SUM(importo_amount) AS importsum FROM importo WHERE cliente_id='$client_id'";
  $result_guadagno= mysqli_query($connection,$query_guadagno);
  $row_guadagno = mysqli_fetch_assoc($result_guadagno);

  $query_show ="SELECT SUM(bonifico_quantita)  AS totalbon FROM bonifico WHERE client_reconazition='$client_id'";
  $resut_show = mysqli_query($connection,$query_show);
  $row_show  = mysqli_fetch_assoc($resut_show);

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
                <div class="row my-3">
                    <div class="col-md-3  ">
                        <div class="counter-box   r-5 p-3  " style="background-color: #00765e;">
                            <div class="p-4">
                                <div class="float-right">
                                    <span class="icon icon-account_balance_wallet text-light s-48"></span>
                                </div>
                                <div class="counter-title text-light">Totale: guadagnio</div>
                                <h5 class="  mt-3   text-light">
                                    <?php echo $row_guadagno['importsum'] ." €";?> </h5>
                            </div>
                            <div class="progress progress-xs r-0">
                                <div class="progress-bar" role="progressbar" style="width: 25%;"
                                    aria-valuenow=" <?php echo $row_guadagno['importsum'] ;?>" aria-valuemin="0"
                                    aria-valuemax="9999999999999"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3  ">
                        <div class="counter-box   r-5 p-3  " style="background-color: #00765e;">
                            <div class="p-4">
                                <div class="float-right">
                                    <span class="icon icon-money-1 text-light s-48"></span>
                                </div>
                                <div class="counter-title text-light">Totale bonifico</div>
                                <h5 class=" mt-3 text-light">
                                    <?php echo $row_show['totalbon'] ." €";?>


                                </h5>
                            </div>
                            <div class="progress progress-xs r-0">
                                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="0"
                                    aria-valuemin="0" aria-valuemax="9999999999999"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3  ">
                        <div class="counter-box   r-5 p-3  " style="background-color: #00765e;">
                            <div class="p-4">
                                <div class="float-right">
                                    <span class="icon icon-money2 text-light s-48"></span>
                                </div>
                                <div class="counter-title text-light">Saldo disponibile</div>
                                <h5 class="  mt-3 counter-animated text-light">0</h5>
                            </div>
                            <div class="progress progress-xs r-0">
                                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="0"
                                    aria-valuemin="0" aria-valuemax="9999999999999"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3  ">
                        <div class="counter-box   r-5 p-3  " style="background-color: #00765e;">
                            <div class="p-4">
                                <div class="float-right">
                                    <span class="icon icon-taxes text-light s-48"></span>
                                </div>
                                <div class="counter-title text-light">TAX </div>
                                <h5 class="  mt-3  text-light">(<?php echo  $row_find['client_tax']; ?>%)</h5>
                            </div>
                            <div class="progress progress-xs r-0">
                                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="0"
                                    aria-valuemin="0" aria-valuemax="9999999999999"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card  ">
                    <center>
                        <iframe class=" mt-3"
                            src="//www.exchangerates.org.uk/widget/ER-LRTICKER.php?w=600&s=2&mc=GBP&mbg=F0F0F0&bs=yes&bc =000044&f=verdana&fs=10px&fc=000044&lc=000044&lhc= FE9A00&vc=FE9A00&vcu=008000&vcd=FF0000&"
                            height="30" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe>
                    </center>
                    <div class="col-12 row d-flex justify-content-around">

                        <!-- EXCHANGERATES.ORG.UK CHART WIDGET START -->
                        <div style="width:178px;margin:0;padding:0;border:1px solid #B4B4B4;background:#8C881C;">
                            <div class="col-3"
                                style="width:174px;text-align:center;margin:2px;padding:2px 0px;background:#B4B4B4;font-family:;font-size:11px;color:#FFFFFF;font-weight:bold;vertical-align:middle;">
                                <a rel="nofollow" style="color:#FFFFFF;text-decoration:none;text-transform:uppercase;"
                                    href="https://www.exchangerates.org.uk/Euros-to-Yemen-Riyal-currency-conversion-page.html"
                                    target="_new" title="EUR YER">EUR YER</a> CHARTS
                            </div>
                            <div style="padding:2px;">
                                <script type="text/javascript">
                                var dcf = 'EUR';
                                var dct = 'YER';
                                var mcol = 'B4B4B4';
                                var mbg = '8C881C';
                                var tc = 'FFFFFF';
                                var tz = '1';
                                </script>
                                <script type="text/javascript" src="https://www.currency.me.uk/remote/ER-CHART-1.php">
                                </script>
                            </div>
                        </div>
                        <!-- EXCHANGERATES.ORG.UK CHART WIDGET END -->
                        <!-- EXCHANGERATES.ORG.UK CHART WIDGET START -->
                        <div style="width:178px;margin:0;padding:0;border:1px solid #B4B4B4;background:#1D8C3B;">
                            <div class="col-3"
                                style="width:174px;text-align:center;margin:2px;padding:2px 0px;background:#B4B4B4;font-family:;font-size:11px;color:#FFFFFF;font-weight:bold;vertical-align:middle;">
                                <a rel="nofollow" style="color:#FFFFFF;text-decoration:none;text-transform:uppercase;"
                                    href="https://www.exchangerates.org.uk/Euros-to-South-Korean-Won-currency-conversion-page.html"
                                    target="_new" title="EUR KRW">EUR KRW</a> CHARTS
                            </div>
                            <div style="padding:2px;">
                                <script type="text/javascript">
                                var dcf = 'EUR';
                                var dct = 'KRW';
                                var mcol = 'B4B4B4';
                                var mbg = '1D8C3B';
                                var tc = 'FFFFFF';
                                var tz = '1';
                                </script>
                                <script type="text/javascript" src="https://www.currency.me.uk/remote/ER-CHART-1.php">
                                </script>
                            </div>
                        </div>
                        <!-- EXCHANGERATES.ORG.UK CHART WIDGET END -->
                        <!-- EXCHANGERATES.ORG.UK CHART WIDGET START -->
                        <div style="width:174px margin:0;padding:0;border:1px solid #B4B4B4;background:#8C0404;">
                            <div class="col-3"
                                style="width:174px;text-align:center;margin:2px;padding:2px 0px;background:#B4B4B4;font-family:;font-size:11px;color:#FFFFFF;font-weight:bold;vertical-align:middle;">
                                <a rel="nofollow" style="color:#FFFFFF;text-decoration:none;text-transform:uppercase;"
                                    href="https://www.exchangerates.org.uk/Euros-to-Pounds-currency-conversion-page.html"
                                    target="_new" title="EUR GBP">EUR GBP</a> CHARTS
                            </div>
                            <div style="padding:2px;">
                                <script type="text/javascript">
                                var dcf = 'EUR';
                                var dct = 'GBP';
                                var mcol = 'B4B4B4';
                                var mbg = '8C0404';
                                var tc = 'FFFFFF';
                                var tz = '1';
                                </script>
                                <script type="text/javascript" src="https://www.currency.me.uk/remote/ER-CHART-1.php">
                                </script>
                            </div>
                        </div>
                        <!-- EXCHANGERATES.ORG.UK CHART WIDGET END -->


                        <div style="width:178px;margin:0;padding:0;border:1px solid #2D6AB4;background:#E6F2FA;">
                            <div class="col-3"
                                style=" text-align:center;margin:2px;padding:2px 0px;background:#2D6AB4;font-family:;font-size:11px;color:#FFFFFF;font-weight:bold;vertical-align:middle;">
                                <a rel="nofollow" style="color:#FFFFFF;text-decoration:none;text-transform:uppercase;"
                                    href="https://www.exchangerates.org.uk/Euros-to-Dollars-currency-conversion-page.html"
                                    target="_new" title="EUR USD">EUR USD</a> CHARTS
                            </div>
                            <div style="padding:2px;">
                                <script type="text/javascript">
                                var dcf = 'EUR';
                                var dct = 'USD';
                                var mcol = '2D6AB4';
                                var mbg = 'E6F2FA';
                                var tc = 'FFFFFF';
                                var tz = '1';
                                </script>
                                <script type="text/javascript" src="https://www.currency.me.uk/remote/ER-CHART-1.php">
                                </script>
                            </div>
                        </div>


                    </div>
                    <!-- EXCHANGERATES.ORG.UK CHART WIDGET START -->

                    <!-- EXCHANGERATES.ORG.UK CHART WIDGET END -->


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
                    <div class="col-12 row d-flex justify-content-around mt-3">
                        <div class="col-4"
                            style="height:433px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F; padding: 0px; margin: 0px;  ">
                            <div style="height:413px; padding:0px; margin:0px; width: 100%;"><iframe
                                    src="https://widget.coinlib.io/widget?type=full_v2&theme=light&cnt=6&pref_coin_id=1506&graph=yes"
                                    width="100%" height="409px" scrolling="auto" marginwidth="0" marginheight="0"
                                    frameborder="0" border="0" style="border:0;margin:0;padding:0;"></iframe></div>
                            <div
                                style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
                                <a href="https://coinlib.io" target="_blank"
                                    style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency
                                    Prices</a>&nbsp;by NPM PARIBAS BANK
                            </div>
                        </div>
                        <div class="col-6"
                            style="height:560px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid #56667F; border-radius: 4px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px; width: 100%;">
                            <div style="height:540px; padding:0px; margin:0px; width: 100%;"><iframe
                                    src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1506"
                                    width="100%" height="536px" scrolling="auto" marginwidth="0" marginheight="0"
                                    frameborder="0" border="0"
                                    style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div>
                            <div
                                style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;">
                                <a href="https://coinlib.io" target="_blank"
                                    style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency
                                    Prices</a>&nbsp;by NPM PARIBAS BANK
                            </div>
                        </div>


                    </div>
                    <br><br>
                    <center>
                        <div class="nomics-ticker-widget col-12 mt-3" data-name="Bitcoin" data-base="BTC"
                            data-quote="USD">
                        </div>
                    </center>
                    <script src="https://widget.nomics.com/embed.js"></script>
                </div>
            </div>
        </div>
    </div>
    </div>

    <?php include "scripts.php";
    
 ?>

</html>