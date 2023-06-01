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
  $sql = "SELECT * FROM usuario WHERE id LIKE '%$data' or Produto LIKE '%$data' or Cod LIKE '%$data' ORDER BY id DESC";
  $resuldadoPag = mysqli_query($conexao, $sql);
} else {
  $pagina = (isset($_GET['pagina'])) ? $_GET['pagina'] : 1;
  $sql = "SELECT * FROM usuario ";
  $resultados = mysqli_query($conexao, $sql);
  $totalPagina = mysqli_num_rows($resultados);
  $qntPaginas = 15;
  $numPaginas = ceil($totalPagina / $qntPaginas);
  $inicio = ($qntPaginas * $pagina) - $qntPaginas;
  $Resu = "SELECT * FROM usuario limit $inicio, $qntPaginas";
  $resuldadoPag = mysqli_query($conexao, $Resu);
  $totalPagina = mysqli_num_rows($resuldadoPag);
}

?>

<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>usuario</title>
  <link rel="stylesheet" type="text/css" href="../style/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <script type="text/javascript" src="js/bootstrap.js"></script>
</head>

<!-- Aqui começa a logo e nome-->

<body class="bg-light">
  <div class="container-fluid bodyCor bg-light">

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
      <div class="col-sm-10 col py-0 px-md-0">
        <table class="table bg-light text-dark table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Cliente</th>
              <th scope="col">Senha</th>
              <th scope="col">E-mail</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <?php

            while ($user_data = mysqli_fetch_assoc($resuldadoPag)) {
              echo "<tr>";
              echo "<td>" . $user_data['id'] . "</td>";
              echo "<td style='width: 20%'> " . $user_data['nome'] . "</td>";
              echo "<td style='width: 20%'>" . $user_data['senha'] . "</td>";
              echo "<td style='width: 40%'>" . $user_data['email'] . "</td>";
              echo "<td style=text-left;'>
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
      </div>
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

    <!---  Carousel Index --->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script>
      window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"><\/script>')
    </script>

    <script src="../../assets/js/vendor/popper.min.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>

    <!--Ícones-->
    <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>
    <script>
      feather.replace()
    </script>

    <script>
      var search = document.getElementById("pesquisar");

      search.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          searchData();
        }
      });

      function searchData() {
        window.location = 'estoque.php?search=' + search.value;
      }
    </script>

</body>

</html>