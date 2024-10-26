import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import {
  CCol,
  CFormInput,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CForm,
  CButton,
  CFormCheck,
} from "@coreui/react";
const apiUrl = import.meta.env.VITE_API_URL; // Certifique-se de que esta variável está correta e corresponde à URL do backend
import './LicitacoesTCE.css';
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
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipal">Mural de Licitações</h2>
      </CCard>
      {error && <p>{error}</p>}

      {licitacoes.length > 0 ? (
        <ul>
          {licitacoes.map((licitacao, index) => (
            <div key={index}>
              <CCard>
                <CCardBody>
                  <CRow className="g-2 mb-3">
                    {/* Exibição para dispositivos móveis */}
                    <CCol xs={12} className="d-md-none">
                      <div>
                        <strong>ÓRGÃO:</strong> {licitacao.unidadeOrcamentaria}<br />
                        <strong>MODALIDADE:</strong> {licitacao.modalidade}<br />
                        <strong>VALOR PREVISTO:</strong> R$ {licitacao.previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                        <strong>DATA:</strong> {licitacao.data}<br />
                        <strong>OBJETO:</strong> {licitacao.objeto}<br />
                      </div>
                    </CCol>

                    {/* Exibição para telas maiores */}
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel>ÓRGÃO</CFormLabel>
                      <div>{licitacao.unidadeOrcamentaria}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel>MODALIDADE</CFormLabel>
                      <div>{licitacao.modalidade}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel>VALOR PREVISTO</CFormLabel>
                      <div>R$ {licitacao.previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel>DATA</CFormLabel>
                      <div>{licitacao.data}</div>
                    </CCol>
                  </CRow>
                  <CRow className="g-2 mb-3">
                    <CCol sm={10} className="d-none d-md-block">
                      <CFormLabel>OBJETO</CFormLabel>
                      <div>{licitacao.objeto}</div>
                    </CCol>
                    <CCol sm={2} className="d-flex align-items-center">
                      <a href={licitacao.mural} target="_blank" rel="noopener noreferrer" className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faEye} />
                      </a>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <br />
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
