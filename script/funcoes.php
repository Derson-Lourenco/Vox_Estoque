<?php
include_once('../MixEstoque/BD_MIX/conexao.php');

function gravar($conexao, $nome, $email, $senha)
{
    $sql = "INSERT INTO usuario (nome, email, senha) VALUES ('$nome', '$email', '$senha')";
    if (mysqli_query($conexao, $sql)) {
        return true;
    } else {
        return false;
    }
}

function gravarEstoq($conexao, $Produto, $Cod, $DataEnt, $QuantEntrada, $Depart, $Marca)
{
    $sql = "INSERT INTO estoque (Produto, Cod, DataEnt, Valor, QuantAtual, QuantEntrada, QuantSaida, Depart, Marca) VALUES ('$Produto', '$Cod', '$DataEnt', ' ', ' ', '$QuantEntrada', ' ' , '$Depart', '$Marca')";
    if (mysqli_query($conexao, $sql)) {
        return true;
    } else {
        return false;
    }
}
function solicitacao($conexao, $Produto, $Cod, $Quantidade)
{
    $sql = "INSERT INTO solicitacao (Produto, Cod, Quantidade) VALUES ('$Produto', '$Cod', '$Quantidade')";
    if (mysqli_query($conexao, $sql)) {
        return true;
    } else {
        return false;
    }
}
function verificaEmail($conexao, $email)
{
    $consulta = "SELECT * FROM usuario  WHERE email ='$email'";
    $resultado = mysqli_query($conexao, $consulta);
    $linhas = mysqli_num_rows($resultado);
    if ($linhas > 0) {
        return true;
    } else {
        return false;
    }
}
function verificaProduto($conexao, $Cod)
{
    $consulta = "SELECT * FROM estoque WHERE Cod ='$Cod'";
    $resultado = mysqli_query($conexao, $consulta);
    $linhas = mysqli_num_rows($resultado);
    if ($linhas > 0) {
        return true;
    } else {
        return false;
    }
}
//Verificar mas tarde, é indentifiar quem tem o acesso ao estoque.

function Conect($conexao, $email, $cod)
{
    $sql = "SELECT * FROM usuario  WHERE email='$email' "
        . "AND cod='{$cod}'";
    if ($resultado = mysqli_query($conexao, $sql)) {
        $dados = mysqli_fetch_array($resultado);
        $linhas = mysqli_num_rows($resultado);
        if ($linhas > 0) {
            session_start();
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function login($conexao, $email, $senha)
{
    $sql = "SELECT * FROM usuario  WHERE email='$email' "
        . "AND senha='{$senha}'";
    if ($resultado = mysqli_query($conexao, $sql)) {
        $dados = mysqli_fetch_array($resultado);
        $linhas = mysqli_num_rows($resultado);
        if ($linhas > 0) {
            session_start();
            $_SESSION['nome'] = $dados['nome'];
            $_SESSION['cod'] = $dados['cod'];
            return true;
        } else {
            return false;
        }
    }
    return false;
}
function enviarSolicitacao($intens, $conexao)
{
    foreach ($_SESSION['itens'] as $indice => $item) {
        if (!empty($item['Produto'])) {
            $Produto = $item['Produto'];
            $Cod = $item['Cod'];
            $Quantidade = $item['Quantidade'];

            // Inserir os dados na tabela
            $sql = "INSERT INTO solicitacao (Produto, Cod, Quantidade) VALUES ('$Produto', '$Cod', '$Quantidade')";
            if ($conexao->query($sql) !== TRUE) {
                echo "Erro ao inserir os dados na tabela: " . $conexao->error;
            }
        }
    }

    // Limpar o array da sessão
    $_SESSION['itens'] = array();
}

function upt($intens, $conexao)
{
    foreach ($_SESSION['itens'] as $indice => $item) {
        if (!empty($item['Produto'])) {
            $Cod = $item['Cod'];
            $quantidade = $item['Quantidade'];

            // Consulta o registro do item no banco de dados para obter a quantidade atual
            $sql = "SELECT * FROM estoque WHERE Cod = $Cod";
            $resultado = mysqli_query($conexao, $sql);
            $item = mysqli_fetch_assoc($resultado);

            if ($item['QuantAtual'] > 0 && $item['QuantAtual'] >= $quantidade) {
                $quantidade_Saida = $item['QuantSaida'] + $quantidade;

                $sql = "UPDATE estoque SET QuantSaida = $quantidade_Saida WHERE Cod = $Cod";
                mysqli_query($conexao, $sql);

                // Subtrai a quantidade solicitada da quantidade atual
                $quantidade_atualizada = $item['QuantAtual'] - $quantidade;

                // Atualiza o registro no banco de dados com a nova quantidade
                $sql = "UPDATE estoque SET QuantAtual = $quantidade_atualizada WHERE Cod = $Cod";
                mysqli_query($conexao, $sql);

                enviarSolicitacao($intens, $conexao);
            } else {
                echo "<script>alert('Alguma Quantidade está maior que o estoque!')</script>";
            }
        }
    }
}
function logout()
{
    session_destroy();
    session_unset();
    header('location:/MixEstoque/index.php');
}
