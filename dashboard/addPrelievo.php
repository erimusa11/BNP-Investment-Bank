<?php
session_start();
include 'functions.php';

if (!isset($_SESSION['user_id'])) {
  header("Location:  login.php");
}

if (isset($_POST['logout'])) {
  $_SESSION = array();
  session_destroy();
  return header("Location:  login.php");
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
                        <h6> Compila i campi per fare un prelievo</h6>
                    </div>
                    <div class="invoice white shadow">

                        <div class="p-5 col-12 ">

                            <div class="card-body">
                                <form action="addPrelievo.php" method="POST">
                                    <div class="form-row">
                                        <div class="col-md-4 mb-3">
                                            <label for="validationDefault01">Beneficario</label>
                                            <input type="text" name="beneficario" class="form-control"
                                                id="validationDefault01" placeholder="...." required="">
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationDefault02">Swift</label>
                                            <input type="text" name="swift" class="form-control"
                                                id="validationDefault02" placeholder="...." required="">
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationDefaultUsername">IBAN</label>
                                            <input type="text" name="iban" class="form-control" id="validationDefault02"
                                                placeholder="...." required="">
                                        </div>
                                    </div>
                                    <div class="form-row">

                                        <div class="col-md-4 mb-3">
                                            <label for="validationDefault03">Importo</label>
                                            <input type="text" name="importo" class="form-control"
                                                id="validationDefault03" placeholder="...." required="">
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationDefault04">Citta</label>
                                            <input type="text" name="citta" class="form-control"
                                                id="validationDefault04" placeholder="...." required="">
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationDefault05">Stato</label>
                                            <input type="text" name="stato" class="form-control"
                                                id="validationDefault05" placeholder="...." required="">
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <label for="validationDefault03">Causale</label>
                                            <textarea type="text" name="causale" class="form-control"
                                                id="validationDefault03" placeholder="...." row="7"
                                                required=""></textarea>
                                        </div>
                                    </div>
                                    <center>
                                        <button class="btn btn-success" name="addprelievo"
                                            value="<?php echo $_GET['person_id']?>" type="submit">Conferma il
                                            prelievo</button>
                                    </center>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include "scripts.php"; 
addprelievo();

    ?>


</html>