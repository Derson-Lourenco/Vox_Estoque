<?php

// Carregar o Composer

require_once  './vendor/autoload.php';

// Instanciar a classe ler conteúdo do PDF
$parser = new \Smalot\PdfParser\Parser();

// Chamar o método e enviar o arquivo
$pdf = $parser->parseFile('arquivos/document_10_pg.pdf');

// ********* INICIO QUEBRA A LINHA APÓS PÁGINA NOVA PDF *********
// Recuperar o texto do PDF
//$text = $pdf->getText();

// Imprimir o texto do PDF
// nl2br — Insere quebras de linha HTML antes de todas quebra de linha em uma string
//echo nl2br($text);
// ********* FIM QUEBRA A LINHA APÓS PÁGINA NOVA PDF *********

// ********* INICIO SEM QUEBRA A LINHA APÓS PÁGINA NOVA PDF *********
// Recuperar as páginas do arquivo PDF
$pages = $pdf->getPages();

// Criar o loop para percorrer cada página para extrair o texto.
foreach ($pages as $page) {
  // Recuperar o texto do PDF
  // nl2br - Inserir quebra de linha HTML antes de todas quebra de linha em uma string
  // PHP_EOL - forçar quebra de linha na visualização
  echo nl2br($page->getText() . PHP_EOL);
}

// ********* FIM SEM QUEBRA A LINHA APÓS PÁGINA NOVA PDF *********