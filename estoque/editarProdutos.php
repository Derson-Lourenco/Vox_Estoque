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

$sql = "SELECT * FROM estoque ";
$result = $conexao->query($sql);

?>

<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estoque</title>
  <link rel="stylesheet" type="text/css" href="/MixEstoque/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <script type="text/javascript" src="js/bootstrap.js"></script>
</head>

<!-- Aqui começa a logo e nome-->

<body>
  <div class="container-fluid bodyCor">
    <div class="row bodyCor">
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm-2 col-xs-12 bodyCor" id="logo"></nav>
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm-10 col-xs-12 bodyCor">
        <!---<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>-->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto ml-2 ml-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $_SESSION['nome']; ?>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Meu dados</a></li>
                  <li><a class="dropdown-item" href="../Mix/home.php/?logout">Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search">
            <button class="btn btn-outline-success" type="submit">OK</button>
          </form>
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
              <a class="nav-link active" href="/MixEstoque/home.php">
                <span data-feather="home"></span>
                home <span class="sr-only"></span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/MixEstoque/solicitacao.php">
                <span data-feather="file"></span>
                Pedidos
              </a>
            </li>
            <?php if ($cod) : ?>
              <li class="nav-item">
                <a class="nav-link" href="/MixEstoque/estoque.php">
                  <span data-feather="shopping-cart"></span>
                  Produtos
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
                  <span data-feather="bar-chart-2"></span>
                  Relatórios
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="layers"></span>
                  Integrações
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

      <!-- Aqui é os botões para colocar junto com a logo--->
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <!--- Começa o Form de Cadastro-->
          <form method="POST" class="row g-3 m-3">
            <div class="col-md-5">
              <label for="Produto" class="form-label">Produto</label>
              <input type="text" class="form-control" id="Produto" value="<?php echo $Produto ?>" name="Produto">
            </div>
            <div class="col-md-5">
              <label for="Cod" class="form-label">Cod. de Barras</label>
              <input type="text" class="form-control" id="Cod" value="<?php echo $Cod ?>" name="Cod">
            </div>
            <div class="col-md-2">
              <label for="QuantEntrada" class="form-label">Quantidade</label>
              <input type="text" class="form-control" id="QuantEntrada" value="<?php echo $QuantEntrada ?>" name="QuantEntrada">
            </div>
            <div class="col-md-2">
              <label for="DataEnt" class="form-label">Data de Entrada</label>
              <input type="date" class="form-control" id="DataEnt" value="<?php echo $DataEnt ?>" name="DataEnt">
            </div>
            <div class="col-md-5">
              <label for="Marca" class="form-label">Marca</label>
              <input type="text" class="form-control" id="Marca" value="<?php echo $Marca ?>" name="Marca">
            </div>
            <div class="col-md-5">
              <label for="Depart" class="form-label">Departamento</label>
              <select id="Depart" class="form-select" name="Depart">
                <option selected>Brinquedos</option>
                <option selected>Escritorio</option>
                <option selected>Enxoval</option>
                <option selected>Informática</option>
                <option selected>Permanente</option>
                <option selected></option>
              </select>
            </div>
            <div class="col-12">
              <button type="submit" nome="update" class="btn btn-primary">Salvar</button>
            </div>
          </form>
      </main>




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
</body>

</html>