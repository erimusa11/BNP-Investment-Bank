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
                    <div class="card-header white">
                        <h6> Modifica un cliente. </h6>
                    </div>
                    <div class="invoice white shadow">


                        <div class="p-5">
                            <!-- title row -->
                            <div class="card">
                                <div class="card-body b-b">
                                    <h4>Compila i campi per modificare un utente.</h4>
                                    <br>
                                    <form method="POST" action="modificaCliente.php" class="form-material">
                                        <!-- Input -->
                                        <div class="body row">

                                                <div class="col-12 ">
                                                <center>
                                                    <h6>Seleziona il cliente che volete modificare gli dati</h6>
                                                    <div class="row clearfix">
                                                        <div class="col-sm-12">
                                                            <div class="form-group col-12">
                                                                <div class="form-line">
                                                                    <select class="select2" onchange="this.form.submit()" name="client_reconazition"  >
                                                                    <option value="">Seleziona</option>
                                        <?php 
                    
                                            global $connection; 
                                            $query_select = "SELECT * FROM client ORDER BY client_name";
                                            $result_select = mysqli_query($connection,$query_select);
                                            while($row_select = mysqli_fetch_array($result_select)){
                                                
                                                if ($_POST['client_reconazition']==$row_select['client_id']) {
                                                    $selected="selected";
                                                }else {
                                                    $selected="";
                                                }

                                            echo '<option '.$selected.' value="'.$row_select['client_id'].'">'.$row_select['client_name'].' '.$row_select['client_subname'].'</option>';

                                            }


                                                if(isset($_POST['client_reconazition'])){

                                        $id_cliente= $_POST['client_reconazition'];
                                        $query_select = "SELECT * FROM client WHERE client_id='$id_cliente'";
                                       
                                        $result_select = mysqli_query($connection,$query_select);
                                        $row_asscoc = mysqli_fetch_assoc($result_select);

                                                        }


                                            
                    ?>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </center>
                                                </div>

                                            <div class="col-6">
                                            
                                                <h6>Nome del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" name="client_name" required
                                                                    class="form-control" value="<?php echo $row_asscoc['client_name'];?>" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>Cognome del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" value="<?php echo $row_asscoc['client_subname'];?>"  required name="client_subname"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>Email del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" value="<?php echo $row_asscoc['client_email'];?>"   required name="client_email"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>Telefono del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text"  value="<?php echo $row_asscoc['client_phone'];?>"  required name="client_phone"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>Indirizio del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text"  value="<?php echo $row_asscoc['client_adress'];?>"  required name="client_adress"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>TAX</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" value="<?php echo $row_asscoc['client_tax'];?>"  required name="client_tax"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6 class="">Data</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                           
                                                                <input type="text" value="<?php echo $row_asscoc['date_client'];?>"   name="date_client" class="date-time-picker form-control" data-options="{&quot;timepicker&quot;:false, &quot;format&quot;:&quot;d-m-Y&quot;}" />
                                                             
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-6">
                                                <h6 class="">Payment Due</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                           
                                                                <input type="text" value="<?php echo $row_asscoc['payemnt_due'];?>"  name="payemnt_due" class="date-time-picker form-control" data-options="{&quot;timepicker&quot;:false, &quot;format&quot;:&quot;d-m-Y&quot;}"  />
                                                        
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 d-flex justify-content-center">

                                                <button type="submit" value="<?php echo $row_asscoc['client_name'];?>"  name="Modifica_client_submit" class="btn btn-success">Salva le modifice</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <?php include "scripts.php"; ?>
        <?php 
      modificaCliente();
      ?>

</html>