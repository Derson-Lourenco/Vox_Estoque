import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

const LicitacoesTCE = () => {
  const [licitacoes, setLicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicitacoes = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/api/licitacoes/1234/1/20240101`;
        console.log('URL da requisição:', url);

        const response = await axios.get(url);
        console.log('Dados recebidos:', response.data);

        // Verifique se os dados são um array
        if (Array.isArray(response.data)) {
          setLicitacoes(response.data);
        } else {
          console.error('Os dados recebidos não estão no formato esperado:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar licitações do TCE-PI:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLicitacoes();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Licitações do TCE-PI</h1>
      {licitacoes.length > 0 ? (
        <div>
          {licitacoes.map((licitacao, index) => (
            <CCard key={index} className='c mb-3 p-2'>
              <CCardHeader>
                Licitação {index + 1}
              </CCardHeader>
              <CCardBody>
                <table>
                  <thead>
                    <tr>
                      <th className='Descr'>Data</th>
                      <th className='Descr'>Modalidade</th>
                      <th className='Descr'>Objeto</th>
                      <th className='Descr'>Mural</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{new Date(licitacao.data).toLocaleDateString()}</td>
                      <td>{licitacao.modalidade}</td>
                      <td>{licitacao.objeto}</td>
                      <td><a href={licitacao.mural} target="_blank" rel="noopener noreferrer">Ver no mural</a></td>
                    </tr>
                  </tbody>
                </table>
              </CCardBody>
            </CCard>
          ))}
        </div>
      ) : (
        <div>Não há licitações disponíveis.</div>
      )}
    </div>
  );
};

export default LicitacoesTCE;
