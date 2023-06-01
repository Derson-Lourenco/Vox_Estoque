<?php
require_once('../../MixEstoque/script/funcoes.php');
require_once('../../MixEstoque/BD_MIX/conexao.php');

session_start();
$cod = $_SESSION['cod'];
if (!isset($_SESSION['login'])) {
  header('location:../MixEstoque/index.php');
}

if (isset($_GET['logout'])) {
  logout();
}

if (!empty($_POST['Produto']) && !empty($_POST['Cod']) && !empty($_POST['DataEnt']) && !empty($_POST['QuantEntrada']) && !empty($_POST['Depart']) && !empty($_POST['Marca'])) {

  $Produto = $_POST['Produto'];
  $Cod = $_POST['Cod'];
  $DataEnt = $_POST['DataEnt'];
  $QuantEntrada = $_POST['QuantEntrada'];
  $Depart = $_POST['Depart'];
  $Marca = $_POST['Marca'];

  if (!verificaProduto($conexao, $Cod)) {
    gravarEstoq($conexao, $Produto, $Cod, $DataEnt, $QuantEntrada, $Depart, $Marca);
    echo "<script>alert('Cadastrado com Sucesso!')</script>";
  } else {
    echo "<script>alert('Cadastrado já existe!')</script>";
  }
}
?>
<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estoque Cadastro</title>
  <link rel="stylesheet" type="text/css" href="../style/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
  <script type="text/javascript" src="js/bootstrap.js"></script>
</head>

<!-- Aqui começa a logo e nome-->

<body class="bg-light">
  <div class="container-fluid bodyCor">
    <div class="row bodyCor">
      <div class="col-sm-2 col-xs-12 bodyCor" id="logo-home"></div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light col-sm-10 col-xs-12 bodyCor">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="./home.php">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Solicitação</a>
            </li>
            <?php if ($cod) : ?>
              <li class="nav-item">
                <a class="nav-link" href="/MixEstoque/cadastroProdutos.php">Cadastrar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/MixEstoque/editarProdutos.php">Editar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/MixEstoque/excluirProdutos.php">Excluir</a>
              </li>
            <?php endif; ?>
          </ul>
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
    </div>
    <!--- Começa o Form de Cadastro-->
    <form method="POST" class="row g-3 m-3">
      <div class="col-md-5">
        <label for="Produto" class="form-label">Produto</label>
        <input type="text" class="form-control" id="Produto" name="Produto">
      </div>
      <div class="col-md-5">
        <label for="Cod" class="form-label">Cod. de Barras</label>
        <input type="text" class="form-control" id="Cod" name="Cod">
      </div>
      <div class="col-md-2">
        <label for="QuantEntrada" class="form-label">Quantidade</label>
        <input type="text" class="form-control" id="QuantEntrada" name="QuantEntrada">
      </div>
      <div class="col-md-2">
        <label for="DataEnt" class="form-label">Data de Entrada</label>
        <input type="date" class="form-control" id="DataEnt" name="DataEnt">
      </div>
      <div class="col-md-5">
        <label for="Marca" class="form-label">Marca</label>
        <input type="text" class="form-control" id="Marca" name="Marca">
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
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  </div>



  <!---  Carousel Index --->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>

</html>