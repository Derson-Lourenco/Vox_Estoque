<?php
require_once('../../MixEstoque/script/funcoes.php');
require_once('../../MixEstoque/BD_MIX/conexao.php');

session_start();
$cod = $_SESSION['cod'];
if (!isset($_SESSION['login'])) {
  header('location:index.php');
}

if (isset($_GET['logout'])) {
  logout();
}
if (!empty($_GET['search'])) {
  $data = $_GET['search'];
  $sql = "SELECT * FROM estoque WHERE id LIKE '%$data' or Produto LIKE '%$data' or Cod LIKE '%$data' ORDER BY id DESC";
  $resuldadoPag = mysqli_query($conexao, $sql);
} else {
  $pagina = (isset($_GET['pagina'])) ? $_GET['pagina'] : 1;
  $sql = "SELECT * FROM estoque ";
  $resultados = mysqli_query($conexao, $sql);
  $totalPagina = mysqli_num_rows($resultados);
  $qntPaginas = 15;
  $numPaginas = ceil($totalPagina / $qntPaginas);
  $inicio = ($qntPaginas * $pagina) - $qntPaginas;
  $Resu = "SELECT * FROM estoque limit $inicio, $qntPaginas";
  $resuldadoPag = mysqli_query($conexao, $Resu);
  $totalPagina = mysqli_num_rows($resuldadoPag);
}

?>

<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estoque</title>
  <link rel="stylesheet" type="text/css" href="/MixEstoque/style/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <script type="text/javascript" src="js/bootstrap.js"></script>
</head>


<!-- Aqui começa a logo e nome-->

<body class="bg-light">
  <div class="container-fluid bodyCor">

    <div class="row bodyCor">
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm-2 col-xs-12 bodyCor" id="logo"></nav>
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm-10 col-xs-12 bodyCor">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto ml-2 ml-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $_SESSION['nome']; ?>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Meu dados</a></li>
                  <li><a class="dropdown-item" href="/MixEstoque/home.php/?logout">Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="box-search">
            <input class="form-control me-2" id="pesquisar" type="search" placeholder="Buscar..." aria-label="Search">
            <button onclick="searchData()" class="btn btn-outline-success" type="submit">OK</button>
          </div>
        </div>
      </nav>
      <!---Aqui vai começar a adaptação-->
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-md-2 d-none d-md-block bg-light sidebar">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="../../MixEstoque/home.php">
                <span data-feather="home"></span>
                home <span class="sr-only"></span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../../MixEstoque/solicitacao/solicitacao.php">
                <span data-feather="file-text"></span>
                Pedidos
              </a>
            </li>
            <?php if ($cod) : ?>
              <li class="nav-item">
                <a class="nav-link" href="/MixEstoque/estoque/estoque.php">
                  <span data-feather="box"></span>
                  Estoque
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="users"></span>
                  Clientes
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="clipboard"></span>
                  Relatórios
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../../MixEstoque/estatistica/estatistica.php">
                  <span data-feather="bar-chart-2"></span>
                  Estatística
                </a>
              </li>
            <?php endif; ?>
            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Relatórios salvos</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="navbar-nav flex-column">
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Neste mês
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Último trimestre
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Engajamento social
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file-text"></span>
                  Vendas do final de ano
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </nav>
      <nav class="col py-0 px-md-0 navbar navbar-expand-lg navbar-right bg-right  col-sm-10 col-xs-12 bodyCor">
        <div class="col-sm-12 col py-0 px-md-0">
          <table class="table bg-light text-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Produto</th>
                <th scope="col">Cod. Barras</th>
                <th scope="col">Quantidade</th>
                <th style="text-align: center ">Ações</th>
              </tr>
            </thead>
            <tbody>
              <?php

              while ($user_data = mysqli_fetch_assoc($resuldadoPag)) {
                echo "<tr>";
                echo "<td>" . $user_data['id'] . "</td>";
                echo "<td>" . $user_data['Produto'] . "</td>";
                echo "<td>" . $user_data['Cod'] . "</td>";
                echo "<td style='width: 5%; text-align: center;'>" . $user_data['QuantAtual'] . "</td>";
                echo "<td style=text-align: center;'>
                <a class = 'btn btn-secondary btn-sm bi bi-pencil-square' href='/MixEstoque/editarProdutos.php?id=$user_data[id]'></a>
                </a> 
                <a class = 'btn btn-secondary btn-sm bi bi-trash3' href='/MixEstoque/editarProdutos.php?id=$user_data[id]'></a>
                </a>
                </td>";
                echo "<tr>";
              }


              ?>
            </tbody>
          </table>
      </nav>
      <?php
      $pag_ant = $pagina - 1;
      $pag_Pos = $pagina + 1;
      ?>
      <?php
      //Apresentar a paginacao
      for ($i = 1; $i <= $pagina; $i++) {
        $ant = $i - 1;
        $atual = $i;
        $dep = $i + 1;
        $dep2 = $i + 2;
      }

      ?>
      <nav aria-label="...">
        <ul class="pagination justify-content-center ">
          <!-- Aqui é para vim na primeira pagina --->
          <li class="page-item bg-secondary text-white">
            <?php
            if ($pag_ant != 0) { ?>
              <a class="page-link bg-light text-success border border-white" href="estoque.php?pagina=<?php echo $pagina = 1; ?>" tabindex="-1">&lt;&lt;</a>
            <?php } ?>
          </li>
          <li class="page-item bg-secondary text-white">
            <?php
            if ($pag_ant != 0) { ?>
              <a class="page-link bg-light text-success border border-white" href="estoque.php?pagina=<?php echo $pag_ant; ?>" tabindex="-1">&lt;</a>
            <?php } ?>
          </li>

          <?php
          if ($pag_ant != 0) { ?>
            <li class="page-item "><a class="page-link bg-light text-success border-success" href="estoque.php?pagina=<?php echo $pag_ant; ?>"><?php echo $pag_ant; ?></a></li>
          <?php } ?>
          <li class="page-item active ">
            <a class="page-link bg-success text-white border-success" href="estoque.php?pagina=<?php echo $atual; ?>"><?php echo $atual; ?><span class="sr-only"></span></a>
          </li>

          <?php
          if ($pag_Pos <= $numPaginas) { ?>
            <li class="page-item"><a class="page-link bg-light text-success border-success" href="estoque.php?pagina=<?php echo $dep; ?>"><?php echo $pag_Pos; ?></a></li>
          <?php } ?>

          <?php
          if ($pag_Pos <= $numPaginas - 1) { ?>
            <li class="page-item"><a class="page-link bg-light text-success border-success" href="estoque.php?pagina=<?php echo $dep2; ?>"><?php echo $pag_Pos + 1; ?></a></li>
          <?php } ?>

          <?php ?>
          <li class="page-item">
            <?php
            if ($pag_Pos <= $numPaginas) { ?>
              <a class="page-link bg-light text-success border border-white" href="estoque.php?pagina=<?php echo $pag_Pos; ?>" tabindex="-1">&gt;</a>
              </a>
            <?php } ?>
          <li class="page-item">
            <?php
            if ($pag_Pos <= $numPaginas) { ?>
              <a class="page-link bg-light text-success border border-white" href="estoque.php?pagina=<?php echo $numPaginas; ?>" tabindex="-1">&gt;&gt;</a>
              </a>
            <?php } ?>
          </li>
        </ul>
      </nav>
    </div>
    <footer class="col-md-12 bg-light container-fluid w-100">
      <div class="row">
        <div class="col-4">
          <ul class="nav flex-column ">
            <li class="nav-link" id="esp"><a href="#">Retornar à Loja</a></li>
            <li class="nav-link"><a href="#">Sobre</a></li>
            <li class="nav-link"><a href="#">Contato</a></li>
            <li class="nav-link"><a href="#">Suporte</a></li>
          </ul>
        </div>
        <div class="col-6 m-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sed necessitatibus id asperiores iste fugiat, praesentium obcaecati explicabo consequatur voluptatem eos earum blanditiis dolorem eaque veritatis libero? Magni, nam fugiat.
          </p>
          <ul class="nav">
            <li class="nav-link"><i class="fab fa-facebook fa-2x "></i></li>
            <li class="nav-link"><i class="fab fa-instagram fa-2x"></i></li>
            <li class="nav-link"><i class="fab fa-twitter fa-2x"></i></li>
            <li class="nav-link"><i class="fab fa-whatsapp fa-2x"></i></li>
          </ul>
        </div>
      </div>
      <div class="text-center bg-light">
        &copy; 2022 Mix Sua Loja Completa
      </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous"></script>
    <!--Ícones-->
    <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
    <script>
      feather.replace()
    </script>

</body>

</html>