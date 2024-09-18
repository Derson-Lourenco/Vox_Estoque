import { useState, useEffect } from 'react';
import { CCard } from "@coreui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
} from '@fortawesome/free-solid-svg-icons';
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
      {error && <p>{error}</p>}

      {licitacoes.length > 0 ? (
        <ul>
          {licitacoes.map((licitacao, index) => (
            <div key={index}>

<CCard className='c mb-3 p-2'>
                <table>
                  <thead>
                    <tr>
                      <th className='Descr'>ORGÃO</th>
                      <th className='Descr'>MODALIDADE</th>
                      <th className='Descr'>VALOR PREVISTO</th>
                      <th className='Descr'>DATA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Orgão">{licitacao.unidadeOrcamentaria}</td>
                      <td data-label="Modalidade">{licitacao.modalidade}</td>
                      <td data-label="Valor">R$ {licitacao.previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td data-label="Data Inicio">{licitacao.data}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th className='Descr' data-label='Objeto'>OBJETO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4">{licitacao.objeto}</td>
                      <td>
                        <a href={licitacao.mural} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faEye} />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCard>

            </div>
          ))}
        </ul>
      ) : (
        <p>Nenhuma licitação encontrada.</p>
      )}
    </div>
  );
};

export default LicitacoesPage;
