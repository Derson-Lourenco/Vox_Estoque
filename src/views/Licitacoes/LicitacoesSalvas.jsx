import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CRow, 
  CCol, 
  CTable, 
  CTableHead, 
  CTableRow, 
  CTableHeaderCell, 
  CTableBody, 
  CTableDataCell, 
  CSpinner, 
  CAlert, 
  CButton 
} from "@coreui/react";
import { faEye, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
const apiUrl = import.meta.env.VITE_API_URL;

const LicitacoesSalvas = () => {
  const [licitacoesSalvas, setLicitacoesSalvas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLicitacoesSalvas();
  }, []);

  const fetchLicitacoesSalvas = async () => {
    const userid = localStorage.getItem('userid');
    if (!userid) {
      setError('Usuário não encontrado. Por favor, faça login.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/licitacoes/salvas/${userid}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar licitações salvas, status: ${response.status}`);
      }

      const data = await response.json();
      setLicitacoesSalvas(data);
    } catch (err) {
      setError('Erro ao carregar licitações salvas.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta licitação?')) return;

    try {
      const response = await fetch(`${apiUrl}/licitacoes/salvas/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Erro ao excluir licitação salva.');
      }

      setLicitacoesSalvas(prevState => prevState.filter(licitacao => licitacao.id !== id));
    } catch (err) {
      console.error('Erro ao excluir licitação:', err);
      setError('Erro ao excluir licitação.');
    }
  };

  if (loading) {
    return (
      <CRow className="justify-content-center">
        <CSpinner color="primary" size="lg" />
      </CRow>
    );
  }

  if (error) {
    return <CAlert color="danger">{error}</CAlert>;
  }

  return (
    <div>
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipal">Licitações Salvas </h2>
      </CCard>

      <CCard className="CardTextPrincipal">
        <CCardBody>
          {licitacoesSalvas.length === 0 ? (
            <CAlert color="info">Nenhuma licitação salva disponível.</CAlert>
          ) : (
            <>
              <CTable striped hover responsive className="d-none d-md-table">
                <CTableHead>
                  <CTableRow className="CardTextPrincipal">
                    <CTableHeaderCell className="TableHeaderCell">ÓRGÃO</CTableHeaderCell>
                    <CTableHeaderCell className="TableHeaderCell">MODALIDADE</CTableHeaderCell>
                    <CTableHeaderCell className="TableHeaderCell">VALOR PREVISTO</CTableHeaderCell>
                    <CTableHeaderCell className="TableHeaderCell">DATA</CTableHeaderCell>
                    <CTableHeaderCell className="TableHeaderCell">LINK</CTableHeaderCell>
                    <CTableHeaderCell className="TableHeaderCell">AÇÕES</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {licitacoesSalvas.map((licitacao) => (
                    <CTableRow key={licitacao.id}>
                      <CTableDataCell className="TableDataCell">{licitacao.orgao}</CTableDataCell>
                      <CTableDataCell className="TableDataCell">{licitacao.modalidade}</CTableDataCell>
                      <CTableDataCell className="TableDataCell">
                        R$ {licitacao.valor_previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </CTableDataCell>
                      <CTableDataCell className="TableDataCell">
                        {new Date(licitacao.data).toLocaleDateString('pt-BR')}
                      </CTableDataCell>
                      <CTableDataCell className="TableDataCell iconB">
                        <a href={licitacao.link} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon className="icon-ver" title="Ver" icon={faEye} />
                        </a>
                      </CTableDataCell>
                      <CTableDataCell className="TableDataCell">
                        <CButton size="sm" onClick={() => handleDelete(licitacao.id)}>
                          <FontAwesomeIcon className="icon-excluir" title="Excluir" icon={faTrash} />
                        </CButton>
                      </CTableDataCell> 
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
                  
              {licitacoesSalvas.map((licitacao) => (
                <CCol xs={12} className="d-md-none mb-3" key={licitacao.id}>
                  <div className="CaixaLicita p-3">
                    <strong className="TableHeaderCell">ÓRGÃO:</strong> 
                    <span className="TableDataCell">{licitacao.orgao}</span><br />
                    
                    <strong className="TableHeaderCell">MODALIDADE:</strong> 
                    <span className="TableDataCell">{licitacao.modalidade}</span><br />
              

                    <strong className="TableHeaderCell">VALOR PREVISTO:</strong> 
                    <span className="TableDataCell"> R$ {licitacao.valor_previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span><br />
                    

                    <strong className="TableHeaderCell">DATA:</strong> 
                    <span className="TableDataCell">{new Date(licitacao.data).toLocaleDateString('pt-BR')}</span><br />
                    

                    <div className="d-flex justify-content-end align-items-center gap-2">
                      <a href={licitacao.link} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon className="icon-ver" title="Ver" icon={faEye} />
                      </a>
                      <CButton size="sm" onClick={() => handleDelete(licitacao.id)}>
                        <FontAwesomeIcon className="icon-excluir" title="Excluir" icon={faTrash} />
                      </CButton>
                    </div>

                  </div>
                </CCol>
              ))}
            </>
          )}

        </CCardBody>
          
      </CCard>
    </div>
  );
};

export default LicitacoesSalvas;
