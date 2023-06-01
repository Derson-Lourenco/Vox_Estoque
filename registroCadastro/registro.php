<?php
require_once('../../MixEstoque/script/funcoes.php');
require_once('../../MixEstoque/BD_MIX/conexao.php');

if (!empty($_POST['nome']) && !empty($_POST['email']) && !empty($_POST['senha'])) {

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    if (!verificaEmail($conexao, $email)) {
        gravar($conexao, $nome, $email, $senha);
        echo "<script>alert('Sucesso!')</script>";
    } else {
        echo "<script>alert('Email já cadastrado!')</script>";
    }
}

?>
<html>

<head>
    <title>Cadastro</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="/Mix/style.css" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <script type="text/javascript" src="js/bootstrap.js"></script>
</head>

<body>
    <div class="principal-cadastro">
        <form action="" method="POST">
            <div class="esquedo-cadastro">
                <div class="card-cadastro">
                    <h1>Cadastro</h1>
                    <div class="textCard">
                        <label for="usuario">Nome</label>
                        <input id=nome type="text" name="nome" placeholder="Nome">
                    </div>
                    <div class="textCard">
                        <label for="usuario">E-mail</label>
                        <input id=email type="email" name="email" placeholder="exemplo@email.com">
                    </div>
                    <div class="textCard">
                        <label for="senha">Senha</label>
                        <input id=senha type="password" name="senha" placeholder="senha">
                    </div>
                    <div class="textCard">
                        <label for="Codigo Id">Senha</label>
                        <input id=cod type="text" name="cod" placeholder="***">
                    </div>
                    <input type="submit" class="bt-cadastro" name="botao" value="Salvar">
                    <a href="/MixEstoque/home.php">Voltar</a>
                </div>
            </div>
        </form>
    </div>

</body>

</html>