<?php
    require_once "config/connexion.php";
    require_once "model/patientModel.php";
    require_once "model/maladieModel.php";
    session_start();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hopital App</title>
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<?php
    
    require_once "view/navBar.php";
?>
<div class="mt-5 container jumbotron" align="center">
    <?php
        if (!isset($_SESSION['loginMed'])) {
            $page = isset($_GET["page"]) ? $_GET["page"] : "accueil";
            $page .=".php";
            $view = scandir("view");
            // var_dump($view);
            if(!in_array($page,$view))$page="404.php";
           if (!isset($_SESSION['loginMed']) and $page=='patientList.php' or $page=='maladieList.php' or $page=='consultationList.php') {
               $page="loginFirstMSG.php";
            }
            require_once "view/".$page;
        }else {
          $page = isset($_GET["page"]) ? $_GET["page"] : "accueil";
            $page .=".php";
            $view = scandir("view");
            // var_dump($view);
            if(!in_array($page,$view))$page="404.php";
           if (!isset($_SESSION['loginMed']) and $page=='patientList.php' and $page=='maladieList.php' and $page=='consultationList.php') {
               $page="loginFirstMSG.php";
            }
            require_once "view/".$page;
        }

    ?>
</div>


<script src="assets/js/jquery.js"></script>
<script src="assets/js/popper.js"></script>
<script src="assets/js/bootstrap.js"></script>
</body>
</html>