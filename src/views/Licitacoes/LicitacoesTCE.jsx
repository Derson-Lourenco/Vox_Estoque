import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;
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
        const response = await fetch(`${apiUrl}/licitacoes-com-detalhes`);
      
        const data = response.data;

        if (Array.isArray(data)) {
          setLicitacoes(data);
          setError('');
        } else {
          throw new Error('Dados recebidos não estão no formato esperado');
        }
      } catch (err) {
        console.error('Erro ao buscar licitações:', err);
        setError('Erro ao buscar licitações.');
        setLicitacoes([]);
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
