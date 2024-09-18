import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL; // Certifique-se de que esta variável está correta e corresponde à URL do backend

// Função para formatar a data no formato YYYYMMDD
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const LicitacoesPage = () => {
  const [licitacoes, setLicitacoes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLicitacoes = async () => {
      try {
        const response = await fetch(`${apiUrl}/licitacoes`); // Certifique-se de que apiUrl está correto
        console.log('Resposta da API:', response);
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        const data = await response.json();
        console.log('Dados recebidos:', data);
        setLicitacoes(data);
      } catch (err) {
        console.error('Erro ao buscar licitações:', err);
        setError('Erro ao buscar licitações.');
      }
    };

    fetchLicitacoes();
  }, []);

  return (
    <div>
      <h1>Licitacoes</h1>
      {error && <p>{error}</p>}

      {licitacoes.length > 0 ? (
        <ul>
          {licitacoes.map((licitacao, index) => (
            <li key={index}>
              <p><strong>Data:</strong> {licitacao.data}</p>
              <p><strong>Modalidade:</strong> {licitacao.modalidade}</p>
              <p><strong>Objeto:</strong> {licitacao.objeto}</p>
              <p><strong>Valor Previsto:</strong> {licitacao.previsto}</p>
              <p><strong>Unidade Orçamentária:</strong> {licitacao.unidadeOrcamentaria}</p>
              <p><strong>Link:</strong> <a href={licitacao.mural} target="_blank" rel="noopener noreferrer">Ver Detalhes</a></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma licitação encontrada.</p>
      )}
    </div>
  );
};

export default LicitacoesPage;
