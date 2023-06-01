<?php

include_once("conexao.php");

//$dados = $_FILES['arquivo'];
//var_dump($dados);

if (!empty($_FILES['arquivo']['tmp_name'])) {
  $arquivo = new DomDocument();
  $arquivo->load($_FILES['arquivo']['tmp_name']);
  //var_dump($arquivo);

  $linhas = $arquivo->getElementsByTagName("Row");
  //var_dump($linhas);

  $primeira_linha = true;

  foreach ($linhas as $linha) {
    if ($primeira_linha == false) {
      $Cod = $linha->getElementsByTagName("Data")->item(0)->nodeValue;
      echo "Cod: $Cod	 <br>";

      $Produto = $linha->getElementsByTagName("Data")->item(1)->nodeValue;
      echo "Produto: $Produto <br>";

      $DataEnt = $linha->getElementsByTagName("Data")->item(2)->nodeValue;
      echo "DataEnt: $DataEnt <br>";

      $QuantEntrada = $linha->getElementsByTagName("Data")->item(3)->nodeValue;
      echo "QuantEntrada: $QuantEntrada	 <br>";

      $QuantSaida = $linha->getElementsByTagName("Data")->item(4)->nodeValue;
      echo "QuantSaida: $QuantSaida	 <br>";

      $QuantAtual = $linha->getElementsByTagName("Data")->item(5)->nodeValue;
      echo "QuantAtual: $QuantAtual <br>";
      echo "<hr>";

      //Inserir o usuário no BD
      $sql = "INSERT INTO estoque (Produto, Cod, DataEnt, Valor, QuantAtual, QuantEntrada, QuantSaida, Depart, Marca) VALUES ('$Produto','$Cod', '$DataEnt', ' ', '$QuantAtual', '$QuantEntrada', '$QuantSaida', ' ', ' ')";
      $sql = mysqli_query($conexao, $sql);
    }
    $primeira_linha = false;
  }
}
