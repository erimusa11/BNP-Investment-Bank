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
$client_id=$_GET['client_reconazition'];
  $find_client = "SELECT * FROM client WHERE client_id='$client_id'";
 
  $find_result= mysqli_query($connection,$find_client);
  $row_find= mysqli_fetch_assoc($find_result);
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
                    <div class="card-header white">
                        <h6> Vizualiza gli bonifici </h6>
                    </div>
                    <div class="invoice white shadow">


                        <div class="p-5">
                            <!-- title row -->
                            <div class="row">
                                <div class="col-12">

                                    <img class="w-80px mb-4"
                                        src="data:image/png;base64,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"
                                        alt="">

                                    <div class="float-right">

                                        <h4>Invoice #007612</h4><br>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td class="font-weight-normal">Date:</td>
                                                    <td> <?php echo   date("d-m-Y", strtotime($row_find['date_client'])); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="font-weight-normal">Payment Due: &nbsp; &nbsp; &nbsp;
                                                    </td>
                                                    <td><?php echo  date("d-m-Y", strtotime($row_find['payemnt_due']));?>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                                <!-- /.col -->
                            </div>

                            <!-- info row -->
                            <div class="row my-3 ">

                                <!-- /.col -->
                                <div class="col-sm-4">
                                    Il cliente
                                    <address>
                                        <strong>Nome/Cognome:</strong>
                                        <?php echo $row_find['client_name'].' '.$row_find['client_subname']; ?><br>
                                        <strong>Email:</strong> <?php echo  $row_find['client_email']; ?><br>
                                        <strong>Indirizio: </strong> <?php echo  $row_find['client_adress']; ?><br>
                                        <strong>Telefono: </strong> <?php echo  $row_find['client_phone']; ?><br>

                                    </address>
                                </div>
                                <!-- /.col -->
                                <div class="col-sm-4">

                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <!-- Table row -->
                            <div class="row my-3">
                                <div class="col-12 table-responsive">
                                    <table class="table table-bordered table-hover data-tables"
                                        data-options='{"searching":true}'>
                                        <thead>

                                            <tr>
                                                <th>Informazione</th>
                                                <th>Data Bonifico</th>
                                                <th>Quantita</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php 
                                                
                                               

                                                        global $connection; 
                                                     $total =0;
                                                         
                                                        $query_show ="SELECT * FROM bonifico WHERE client_reconazition='$client_id' ORDER BY bonifico_data DESC";
                                                        $resut_show = mysqli_query($connection,$query_show);
                                                        while($row_show = mysqli_fetch_array($resut_show)){
                                                        $total=  $row_show['bonifico_quantita']+$total;
                                                ?>
                                            <tr>
                                                <td>Bonifico Sefa</td>
                                                <td><?php echo  date("d-m-Y", strtotime($row_show['bonifico_data']))?>
                                                </td>
                                                <td><?php echo  $row_show['bonifico_quantita']."€"?></td>


                                            </tr>
                                            <?php 
                                                        }
                                         
                                                    ?>
                                        </tbody>
                                    </table>

                                </div>
                                <!-- /.col -->
                            </div>
                            <!-- /.row -->

                            <div class="row">
                                <!-- accepted payments column -->
                                <div class="col-6">
                                    <?php 
                      global $connetion;
                      
                      $query_count = "SELECT COUNT(client_id) AS totalId FROM prelievo WHERE client_id='$client_id'";
                        $result_count= mysqli_query($connection,$query_count);
                        $row_count = mysqli_fetch_assoc($result_count);
                        if($row_count['totalId']>0){

                          echo ' <h1 class="text-success text-bold well well-sm no-shadow" style="margin-top: 10px;">
                          Quadro RW NON PRESENTE
                        </h1>';
                        } else {
                          echo ' <h1 class="text-danger text-bold well well-sm no-shadow" style="margin-top: 10px;">
                          FATTURAZIONE INSOLUTA
                        </h1>';
                        }
                    


                        $query_guadagno = "SELECT SUM(importo_amount) AS importsum FROM importo WHERE cliente_id='$client_id'";
                        $result_guadagno= mysqli_query($connection,$query_guadagno);
                        $row_guadagno = mysqli_fetch_assoc($result_guadagno);
                    ?>


                                </div>
                                <!-- /.col -->
                                <div class="col-6">
                                    <p class="lead">Informazioni</p>

                                    <div class="table-responsive">
                                        <table class="table">
                                            <tbody>
                                                <tr>
                                                    <th style="width:50%">Totale importo depositato:</th>
                                                    <td><?php echo  $total."€" ?></td>
                                                </tr>
                                                <tr>
                                                    <th style="width:50%">Totale guadagno:</th>
                                                    <td><?php echo  $row_guadagno['importsum']."€" ?></td>
                                                </tr>
                                                <tr>
                                                    <th>Tax (<?php echo  $row_find['client_tax']; ?>%)</th>
                                                    <td> <?php echo  ($row_find['client_tax']/100)*($total+ $row_guadagno['importsum'])."€" ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Totale:</th>
                                                    <td> <?php echo  $row_guadagno['importsum'] + $total ."€"; ?>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <!-- /.col -->
                                <div class="col-12 d-flex justify-content-center">
                                    <form action="addPrelievo.php" method="GET" class="col-3">
                                        <button type="submit" name="person_id" value="<?php echo $client_id;?>"
                                            class="col-12 btn btn btn-md btn-success"> Fai un prelievo</button>
                                    </form>
                                </div>
                            </div>
                            <!-- /.row -->
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <?php include "scripts.php"; ?>

</html>