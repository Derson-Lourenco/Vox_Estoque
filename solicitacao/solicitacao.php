<?php
require_once('../../MixEstoque/script/funcoes.php');
require_once('../../MixEstoque/BD_MIX/conexao.php');

session_start();
$_SESSION['click_count'] = 0;
if (isset($_SESSION['click_count'])) {
  $_SESSION['click_count']++;
} else {
  $_SESSION['click_count'] = 1;
}

$cod = $_SESSION['cod'];
if (!isset($_SESSION['login'])) {
  header('location:../../MixEstoque/index.php');
}

if (isset($_GET['logout'])) {
  logout();
}
if (!empty($_GET['search'])) {
  $data = $_GET['search'];
  $sql = "SELECT * FROM estoque WHERE id LIKE '%$data' or Produto LIKE '%$data' or Cod LIKE '%$data' ORDER BY id DESC";
  $resuldadoPag = mysqli_query($conexao, $sql);

  while ($user_data = mysqli_fetch_array($resuldadoPag)) {
    $Produto = $user_data['Produto'];
    $Cod = $user_data['Cod'];
    $QuantAtual = $user_data['QuantAtual'];
  }
} else {
  $sql = "SELECT * FROM estoque ";
  $resultados = mysqli_query($conexao, $sql);
}
$sql = "SELECT * FROM solicitacao ";
$resultados = mysqli_query($conexao, $sql);

?>

<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estoque</title>
  <link rel="stylesheet" type="text/css" href="../style/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
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
                  <li><a class="dropdown-item" href="../../MixEstoque/home.php/?logout">Sair</a></li>
                </ul>
              </li>
            </ul>
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
              <a class="nav-link" href="/MixEstoque/solicitacao/solicitacao.php">
                <span data-feather="file-text"></span>
                Pedidos
              </a>
            </li>
            <?php if ($cod) : ?>
              <li class="nav-item">
                <a class="nav-link" href="../../MixEstoque/estoque/estoque.php">
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

      <!-- Aqui é os botões para colocar junto com a logo--->
      <nav class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <nav class="">
          <div class="col-md-12">
            <h3>Solicitação de Mercadoria</h3>
          </div>
          <div class="box-search col-md-9 ml-sm-auto col-lg-6 px-4">
            <input class="form-control me-2" id="pesquisar2" type="search" placeholder="Buscar..." aria-label="Search">
            <button onclick="searchData2()" class="btn btn-outline-success" type="submit">Buscar</button>
          </div>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <form action="" id="meuFormulario" method="POST" class="row g-3 m-3">
              <div class="col-md-5">
                <label for="Produto" class="form-label">Produto</label>
                <input type="text" readonly class="form-control" id="Produto" value="<?php echo $Produto ?> " name="Produto">
              </div>
              <div class="col-md-3">
                <label for="Cod" class="form-label">Cod. de Barras</label>
                <input type="text" readonly class="form-control" id="Cod" value="<?php echo $Cod ?>" name="Cod">
              </div>
              <div class="col-md-2">
                <label for="QuantAtual" class="form-label">Quantidade Atual</label>
                <input type="text" readonly class="form-control" id="QuantAtual" value="<?php echo $QuantAtual ?>" name="QuantAtual">
              </div>
              <div class="col-md-2">
                <label for="Quantidade" class="form-label">Quantidade</label>
                <input type="text" class="form-control" id="Quantidade" value="" name="Quantidade">
              </div>
              <div class="col-12">
                <button type="submit" nome="upd" id="submit" class="btn btn-outline-success">Adicionar</button>
              </div>
            </form>
        </nav>
        <nav class="">
          <?php
          session_start();

          // Verificar se a sessão já tem um array de itens
          if (!isset($_SESSION['itens'])) {
            $_SESSION['itens'] = array();
          }

          if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Obter os valores do formulário
            $Produto = $_POST['Produto'];
            $Cod = $_POST['Cod'];
            $Quantidade = $_POST['Quantidade'];

            // Armazenar os valores no array da sessão
            $_SESSION['itens'][] = array('Produto' => $Produto, 'Cod' => $Cod, 'Quantidade' => $Quantidade);

            // Verificar se o usuário confirmou o envio dos dados
            if (isset($_POST['confirmar'])) {
              upt($intens, $conexao);
            } else if (isset($_POST['excluir'])) {
              // Obter o índice do item a ser excluído
              $indice = $_POST['excluir'];
              // Remover o item do array da sessão
              array_splice($_SESSION['itens'], $indice, 1);
            }
          }
          ?>

          <form action="" method="POST">
            <?php
            if (count($_SESSION['itens']) > 0) : ?>
              <table class="table table-spacing" id="tabelaItens">
                <thead>
                  <tr>
                    <th scope="col">Produto</th>
                    <th scope="col">Cod. Barras</th>
                    <th scope="col">Quantidade</th>
                    <th style="text-align: center ">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                  // Percorrer o array da sessão e exibir os valores na tabela
                  foreach ($_SESSION['itens'] as $indice => $item) {
                    if (!empty($item['Produto'])) {
                      echo "<tr>";
                      echo "<td>" . $item['Produto'] . "</td>";
                      echo "<td>" . $item['Cod'] . "</td>";
                      echo "<td>" . $item['Quantidade'] . "</td>";
                      if (count($_SESSION['itens']) > 0 && $item['Produto'] != "") {
                        echo "<td style=text-align: center;'>
                        <button type='submit' class='btn btn-secondary btn-sm bi bi-trash3' name='excluir' value='$indice'></button>
                        <input type='hidden' name='item_index' value='$indice'>
                        </td>";
                      }
                      echo "<tr>";
                    }
                  }
                  ?>
                </tbody>
              </table>
            <?php endif; ?>
            <button type="submit" class="btn btn-outline-success" name="confirmar" value="1">Confirmar e Enviar</button>
          </form>
        </nav>
      </nav>

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
        var search2 = document.getElementById("pesquisar2");

        search2.addEventListener("keydown", function(event) {
          if (event.key === "Enter") {
            searchData2();
          }
        });

        function searchData2() {
          window.location = 'solicitacao.php?search=' + search2.value;
        }
      </script>
</body>

</html>