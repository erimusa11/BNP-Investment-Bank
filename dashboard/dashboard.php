<?php
session_start();
include 'functions.php';

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
}

if (isset($_POST['logout'])) {
  $_SESSION = array();
  session_destroy();
  return header("Location: login.php");
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
    <title>Dashboard</title>

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
                        <h6> Crea un nuovo cliente. </h6>
                    </div>
                    <div class="invoice white shadow">


                        <div class="p-5">
                            <!-- title row -->
                            <div class="card">
                                <div class="card-body b-b">
                                    <h4>Compila i campi per creare un utente.</h4>
                                    <br>
                                    <form method="POST" action="dashboard.php" class="form-material">
                                        <!-- Input -->
                                        <div class="body row">
                                            <div class="col-6">
                                                <h6>Nome del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" name="client_name" required
                                                                    class="form-control" placeholder="....">
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
                                                                <input type="text" required name="client_subname"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>Username del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" required name="username"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6>Password del cliente</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <input type="text" required name="password"
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
                                                                <input type="text" required name="client_email"
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
                                                                <input type="text" required name="client_phone"
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
                                                                <input type="text" required name="client_adress"
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
                                                                <input type="text" required name="client_tax"
                                                                    class="form-control" placeholder="....">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <h6 class="text-center">Data</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">
                                                                <div class="form-group">
                                                                    <input name="date_client" type="text"
                                                                        class="date-time-picker form-control form-control-lg"
                                                                        data-options='{
                                                                        "theme":"light",
                                                                        "inline":true,
                                                                        "format":"d.m.Y"
                                                                        }' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-6">
                                                <h6 class="text-center">Payment Due</h6>
                                                <div class="row clearfix">
                                                    <div class="col-sm-12">
                                                        <div class="form-group col-12">
                                                            <div class="form-line">

                                                                <div class="form-group">
                                                                    <input name="payemnt_due" type="text"
                                                                        class="date-time-picker form-control form-control-lg"
                                                                        data-options='{
                                                                        "theme":"light",
                                                                        "inline":true,
                                                                        "format":"d.m.Y"
                                                                        }' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 d-flex justify-content-center">

                                                <button type="submit" name="client_submit" class="btn btn-success">Crea
                                                    l`nuovo cliente</button>
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
       createClient();
      
      ?>

</html>