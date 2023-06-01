<html>

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Estoque</title>
  <link rel="stylesheet" type="text/css" href="../style/style.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
  <script type="text/javascript" src="js/bootstrap.js"></script>
</head>

<body>
  <div class="container-fluid bodyCor">
    <div class="row bodyCor">
      <nav class="col-md-2 ml-sm-auto col-lg-8 px-5">
        <nav class="border border-success navbar navbar-expand-lg navbar-light bg-white text-dark col-sm-12 col-xs-10 bodyCor">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <table class="table table-spacing bg-white text-dark" id="tabelaItens">
              <tbody>
                <tr>
                  <td class="">
                    COMERCIAL CAMPOS LTDA <br />
                    Comércio Varejista de Artigos de Papelaria <br />
                    CNPJ: 37.578.243/0001-11 <br />
                    AV GETULIO VAGAS, 475 – Centro – Picos – PI <br />
                    CEP: 64600-002 Fine: (89) 3422-8811
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav class="navbar navbar-expand-lg navbar-right bg-white text-dark col-sm-5 col-xs-10 bodyCor" id="logo"></nav>
        </nav>

        <nav class="text-center">
          <?php if (
            count($_SESSION['itens']) >
            0
          ) : ?>
            <table class="border border-success table table-spacing bg-white text-dark" id="tabelaItens">
              <thead>
                <tr>
                  <th class="text-center" scope="col">Produto</th>
                  <th class="text-center" scope="col">Cod. Barras</th>
                  <th class="text-center" scope="col">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($_SESSION['itens'] as $item) : ?>
                  <tr>
                    <td><?= $item['Produto'] ?></td>
                    <td class="text-center"><?= $item['Cod'] ?></td>
                    <td class="text-center"><?= $item['Quantidade'] ?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          <?php else : ?>
            <p>Nenhum item adicionado à lista ainda.</p>
          <?php endif; ?>
        </nav>
        <nav class="border border-success table bg-white text-dark">
          <div class="row">
            <div class="col-md-6">
              <h5>
                Nome:
                <?php echo $_SESSION['nome']; ?>
              </h5>
            </div>
            <div class="col-md-6">
              <h5>Data e Hora</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <h5>1º Assinatura</h5>
            </div>
            <div class="col-md-6">
              <h5>2º Assinatura</h5>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  </div>
</body>

</html>