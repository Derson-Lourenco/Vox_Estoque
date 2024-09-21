import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CNavbar, CNavbarNav, CNavLink, CNavItem, CCollapse } from "@coreui/react";
import { CCol, CFormLabel, CRow } from "@coreui/react";
import Button from 'react-bootstrap/Button';

const apiUrl = import.meta.env.VITE_API_URL;

const DetalheContrato = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('detalhes'); // Define qual aba está ativa
  const { id } = useParams();
  const [contrato, setContrato] = useState(null);

  useEffect(() => {
    const fetchDetalhesContrato = async () => {
      try {
        const response = await fetch(`${apiUrl}/contratos/detalheContrato/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Verifica a resposta da API
          setContrato(data.contrato); // Acessa o objeto contrato
        } else {
          console.error('Erro ao buscar detalhes do contrato:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do contrato:', error);
      }
    };

    fetchDetalhesContrato();
  }, [id]);

  const renderContent = () => {
    switch (activeTab) {
      case 'detalhes':
        return (
          <div>
            {contrato ? (
              <CCardBody>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel>Nº do processo adm/Ano</CFormLabel>
                    <div>{contrato.processoAno}</div>
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Nº do contrato/Ano</CFormLabel>
                    <div>{contrato.numeroContrato}</div>
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Modalidade</CFormLabel>
                    <div>R$ {contrato.modalidade}</div>
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Registro de Preço</CFormLabel>
                    <div>{new Date(contrato.registro).toLocaleDateString()}</div>
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel>ORGÃO</CFormLabel>
                    <div>{contrato.orgao}</div>
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>CNPJ do Contratante</CFormLabel>
                    <div>{contrato.cnpjContratante}</div>
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Valor do Contratado</CFormLabel>
                    <div>R$ {contrato.valorContratado}</div>
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Valor Atual</CFormLabel>
                    <div>R$ {contrato.valorContratado}</div>
                  </CCol>
                  
                </CRow>
                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                      <CFormLabel>Data da Assinatura</CFormLabel>
                      <div>{new Date(contrato.dataAssinatura).toLocaleDateString()}</div>
                    </CCol>
                    <CCol sm={6} md={3}>
                      <CFormLabel>Data de Início</CFormLabel>
                      <div>{new Date(contrato.dataInicio).toLocaleDateString()}</div>
                    </CCol>
                    <CCol sm={6} md={3}>
                      <CFormLabel>DATA FINALIZAÇÃO</CFormLabel>
                      <div>{new Date(contrato.dataFinalizacao).toLocaleDateString()}</div>
                    </CCol>
                    <CCol sm={6} md={3}>
                      <CFormLabel>Secretarias</CFormLabel>
                      <div>{new Date(contrato.secretarias).toLocaleDateString()}</div>
                    </CCol>
                </CRow>
                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={12}>
                      <CFormLabel>Objeto do Contrato</CFormLabel>
                      <div>{new Date(contrato.objetoContrato).toLocaleDateString()}</div>
                    </CCol>
                </CRow>
              </CCardBody>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        );
      case 'espelho':
        return (
          <div>
            <h5>Espelho do Contrato</h5>
            <p>Este espaço pode ser utilizado para visualizar uma cópia ou espelho do contrato.</p>
          </div>
        );
      case 'editar':
        return (
          <div>
            <CCardBody>
              {/* Implementação da aba de edição */}
            </CCardBody>
          </div>
        );
      case 'documentos':
        return (
          <div>
            <h5>Documentos de Contrato</h5>
            <p>Este espaço pode ser utilizado para visualizar uma cópia ou Documentos de Contrato.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <CCard>
        <CCardHeader>
          <CNavbar expand="lg" className="">
            <CCollapse className="navbar-collapse" visible={visible}>
              <CNavbarNav>
                <CNavItem>
                  <CNavLink 
                    active={activeTab === 'detalhes'} 
                    onClick={() => setActiveTab('detalhes')}
                  >
                    Detalhes
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink 
                    active={activeTab === 'espelho'} 
                    onClick={() => setActiveTab('espelho')}
                  >
                    Espelho Nota
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink 
                    active={activeTab === 'editar'} 
                    onClick={() => setActiveTab('editar')}
                  >
                    Editar
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink 
                    active={activeTab === 'documentos'} 
                    onClick={() => setActiveTab('documentos')}
                  >
                    Documentos
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
        </CCardHeader>
        <CCardBody>
          {renderContent()}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default DetalheContrato;
