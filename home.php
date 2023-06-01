<?php
require_once('../MixEstoque/script/funcoes.php');
require_once('../MixEstoque/BD_MIX/conexao.php');


session_start();
$cod = $_SESSION['cod'];

if (!isset($_SESSION['login'])) {
  header('location:/MixEstoque/index.php');
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
  <title>Home</title>
  <link rel="stylesheet" type="text/css" href="/MixEstoque/style/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  <script type="text/javascript" src="js/bootstrap.js"></script>
</head>

<body>
  <header>
    <div class="container-fluid ">
      <div class="row bodyCor">
        <img src="./imag/MixLogo.png" class="bg-light col-sm-2 col-xs-12 bodyCor">
        <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm-10 col-xs-12 bodyCor">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto ml-2 ml-lg-0">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $_SESSION['nome']; ?>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Meu dados</a></li>
                    <li><a class="dropdown-item" href="/MixEstoque/index.php?logout">Sair</a></li>
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
      </div>
    </div>
  </header>
  <div class="container-fluid ">
    <div class="row bg-light main-container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm col-md-2 d-none d-md-block bg-light sidebar">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="../MixEstoque/home.php">
                <span data-feather="home"></span>
                home <span class="sr-only"></span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../MixEstoque/solicitacao/solicitacao.php">
                <span data-feather="file-text"></span>
                Pedidos
              </a>
            </li>
            <?php if ($cod) : ?>
              <li class="nav-item">
                <a class="nav-link" href="../MixEstoque/estoque/estoque.php">
                  <span data-feather="box"></span>
                  Estoque
                </a>
              </li>
              <!-- Fazer Funcionaridade Para entrar para ver e cadastrar crientes-->
              <li class="nav-item">
                <ul class="navbar-nav ms-auto ml-2 ml-lg-0">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span data-feather="users"></span>
                      Clientes
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" href="/MixEstoque/registroCadastro/dadospessoas.php">Ver Clientes</a></li>
                      <li><a class="dropdown-item" href="/MixEstoque/registroCadastro/registro.php">Cadastrar Cliente</a></li>
                    </ul>
                  </li>
                </ul>
                <!--<a class="nav-link" href="#">
                  <span data-feather="users"></span>

                </a>-->
                <!---------------------------------------------------------------------------------->
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="clipboard"></span>
                  Relatórios
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../MixEstoque/estatistica/estatistica.php">
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
      <main class="col-sm-10 col-md-10 main-content">
        <h1>Conteudo</h1>
      </main>
    </div>
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