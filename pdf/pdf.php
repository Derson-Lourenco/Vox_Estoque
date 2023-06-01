<?php

require_once  'dompdf/autoload.inc.php';

use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();
$options->setChroot(__DIR__);
$options->setIsRemoteEnabled(true);

// instanciar e usar a classe dompdf 
$dompdf = new  Dompdf();

$dompdf->loadHtml('olá mundo');

// (Opcional) Configure o tamanho e a orientação do papel 
$dompdf->setPaper('A4');

// Renderiza o HTML como PDF 
$dompdf->render();

// Saída do PDF gerado para o navegador 
$dompdf->stream(
  "Solicitacao.pdf",
  array(
    "Attachment" => false
  )
);
