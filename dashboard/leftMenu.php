<!-- Pre loader -->
<div id="loader" class="loader">
    <div class="plane-container">
        <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-blue">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>

            <div class="spinner-layer spinner-red">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>

            <div class="spinner-layer spinner-yellow">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>

            <div class="spinner-layer spinner-green">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="app">

    <aside class="main-sidebar fixed offcanvas shadow" data-toggle='offcanvas'>
        <section class="sidebar">
            <div class="w-160px mt-3 mb-3 ml-3">
                <img src="../LOGO.png" alt="">
            </div>
            <div class="relative">
                <a data-toggle="collapse" href="# " role="button" aria-expanded="false"
                    aria-controls="userSettingsCollapse"
                    class="btn-fab btn-fab-sm absolute fab-right-bottom fab-top btn-primary shadow1 ">
                    <i class="icon icon-cogs"></i>
                </a>
                <div class="user-panel p-3 light mb-2">
                    <div>
                        <div class="float-left image">
                            <img class="user_avatar" src="assets/img/dummy/u2.png" alt="User Image">
                        </div>
                        <div class="float-left info">
                            <h6 class="font-weight-light mt-2 mb-1">
                                <?php echo $_SESSION['user_name'] . " ". $_SESSION['user_subname'];?></h6>
                            <a href="#"><i class="icon-circle text-primary blink"></i> Online</a>
                        </div>
                    </div>

                </div>
            </div>
            <ul class="sidebar-menu">
                <li class="header"><strong>Le mie azioni</strong></li>
                <li class="treeview"><a href="graps.php">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Panello di controllo</span>

                    </a>
                    < </li>
                        <?php if( $_SESSION['client'] == 0 ){ ?>
                <li class="treeview"><a href="#">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Administazione
                            clienti</span> <i class="icon icon-angle-left s-18 pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="dashboard.php"><i class="icon icon-folder5"></i>Crea Cliente</a>
                        </li>
                        <li><a href="modificaCliente.php"><i class="icon icon-folder5"></i>Modifica cliente</a>
                        </li>
                    </ul>
                </li>
                <li class="treeview"><a href="#">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Gestione bonifico</span> <i
                            class="icon icon-angle-left s-18 pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="creaBonifico.php"><i class="icon icon-folder5"></i>Crea un bonifico per il
                                cliente</a>
                        </li>
                        <li><a href="eliminaBonifico.php"><i class="icon icon-folder5"></i>Elimina un bonifico al
                                cliente </a>
                        </li>
                    </ul>
                </li>
                <li class="treeview"><a href="#">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Gestione guadagnio</span> <i
                            class="icon icon-angle-left s-18 pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="creaGuadagnio.php"><i class="icon icon-folder5"></i>Crea un guadagnio per il
                                cliente</a>
                        </li>
                        <li><a href="eliminaGuadagnio.php"><i class="icon icon-folder5"></i>Elimina un guadagnio al
                                cliente </a>
                        </li>
                    </ul>
                </li>
                <li class="treeview"><a href="selectClients.php">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Visualizzazione
                            bonifico</span> <i class="icon icon-angle-left s-18 pull-right"></i>
                    </a>

                </li>
                <li class="treeview"><a href="#">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Prelievo</span> <i
                            class="icon icon-angle-left s-18 pull-right"></i>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="addPrelievo.php"><i class="icon icon-folder5"></i>Aggiungi i prelievi al
                                cliente</a>
                        </li>
                        <li><a href="vizualizaPrelievo.php"><i class="icon icon-folder5"></i>Vizualizza i prelievi del
                                cliente</a>
                        </li>

                    </ul>
                </li>
                <?php } else {
                    
                    ?>
                <li class="treeview"><a href="invoiceclient.php">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Vizualizza il mio
                            bonifico</span> <i class="icon icon-angle-left s-18 pull-right"></i>
                    </a>

                </li>
                <li class="treeview"><a href="vizualizaPrelievocliente.php">
                        <i class="icon icon-sailing-boat-water purple-text s-18"></i> <span>Vizualizza il mio
                            preliavo</span> <i class="icon icon-angle-left s-18 pull-right"></i>
                    </a>

                </li>

                <?php
                    
                }
                    ?>
            </ul>
        </section>
    </aside>