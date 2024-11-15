import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from "@coreui/react";

const apiUrl = import.meta.env.VITE_API_URL;

const LicitacoesSalvas = () => {
  const [licitacoesSalvas, setLicitacoesSalvas] = useState([]);
  const [loading, setLoading] = useState(true); // Adicionando estado de carregamento
  const [error, setError] = useState(null); // Estado para capturar erros

  useEffect(() => {
    const fetchLicitacoesSalvas = async () => {
      const userid = localStorage.getItem('userid');
      if (userid) {
        try {
          // Chama a nova rota GET para buscar as licitações salvas
          const response = await fetch(`${apiUrl}/licitacoes/salvas/${userid}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar licitações salvas, status: ' + response.status);
          }
          const data = await response.json();
          console.log(data); // Verificando os dados recebidos

          // Verifique se os dados são um array antes de atualizar o estado
          if (Array.isArray(data)) {
            setLicitacoesSalvas(data);
          } else {
            console.error('Erro: os dados recebidos não são um array:', data);
            setError('Dados inválidos recebidos.');
          }
        } catch (err) {
          console.error('Erro ao buscar licitações salvas:', err);
          setError('Erro ao buscar licitações salvas.');
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      } else {
        setError('Usuário não encontrado.');
        setLoading(false);
      }
    };

    fetchLicitacoesSalvas();
  }, []);

  // Exibe uma mensagem de carregamento ou erro enquanto espera os dados
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se ocorrer algum erro, exibe a mensagem de erro
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <CCard>
        <CCardBody>
          <h2>Licitações Salvas</h2>
          {licitacoesSalvas.length === 0 ? (
            <p>Nenhuma licitação salva disponível.</p>
          ) : (
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ÓRGÃO</CTableHeaderCell>
                  <CTableHeaderCell>MODALIDADE</CTableHeaderCell>
                  <CTableHeaderCell>VALOR PREVISTO</CTableHeaderCell>
                  <CTableHeaderCell>DATA</CTableHeaderCell>
                  <CTableHeaderCell>LINK</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {licitacoesSalvas.map((licitacao, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{licitacao.orgao}</CTableDataCell>
                    <CTableDataCell>{licitacao.modalidade}</CTableDataCell>
                    <CTableDataCell>R$ {licitacao.valor_previsto}</CTableDataCell>
                    <CTableDataCell>{licitacao.data}</CTableDataCell>
                    <CTableDataCell><a href={licitacao.link} target="_blank" rel="noopener noreferrer">Ver</a></CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default LicitacoesSalvas;
