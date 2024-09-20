import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CNavbar, CNavbarNav, CNavLink, CNavItem, CCollapse } from "@coreui/react";
import {
  CCol,
  CFormInput,
  CRow,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CFormCheck,
} from "@coreui/react";
import Button from 'react-bootstrap/Button';

const DetalheContrato = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('detalhes'); // Define qual aba está ativa

  const renderContent = () => {
    switch (activeTab) {
      case 'detalhes':
        return (
          <div>
              <CCardBody>
                <CRow className="g-2 mb-3">
                  <CCol sm={4}>
                    <CFormLabel className='required'>Nº do processo adm/Ano</CFormLabel>
                  </CCol>

                  <CCol sm={4}>
                    <CFormLabel className='required'>Nº do contrato/Ano</CFormLabel>

                  </CCol>

                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Modalidade
                    </CFormLabel>
                  </CCol>

                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Registro de Preço
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6}>
                    <CFormLabel  className="required">
                      Orgão
                    </CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel >
                      CNPJ do Contratante
                    </CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel className="required">
                      Valor do Contratado
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className='g-2 mb-3'>
                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Data da Assinatura
                    </CFormLabel>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel  className="required">
                      Data de Início
                    </CFormLabel>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Data de Finalização
                    </CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel  className="required">
                      Secretarias
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className='g-2 mb-3'>
                  <CCol sm={10}>
                    <CFormLabel className="required">
                      Objeto do Contrato
                    </CFormLabel>
                  </CCol>
                </CRow>
                  
              </CCardBody>
          </div>
        );
      case 'espelho':
        return (
          <div>
            <h5>Espelho do Contrato</h5>
            <p>Este espaço pode ser utilizado para visualizar uma cópia ou espelho do contrato.</p>
            {/* Futuro conteúdo para o espelho do contrato */}
          </div>
        );
      case 'editar':
        return (
          <div>
            <CCardBody>
                <CRow className="g-2 mb-3">
                  <CCol sm={4}>
                    <CFormLabel className='required'>Nº do processo adm/Ano</CFormLabel>
                  </CCol>

                  <CCol sm={4}>
                    <CFormLabel className='required'>Nº do contrato/Ano</CFormLabel>

                  </CCol>

                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Modalidade
                    </CFormLabel>
                  </CCol>

                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Registro de Preço
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6}>
                    <CFormLabel  className="required">
                      Orgão
                    </CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel >
                      CNPJ do Contratante
                    </CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel className="required">
                      Valor do Contratado
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className='g-2 mb-3'>
                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Data da Assinatura
                    </CFormLabel>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel  className="required">
                      Data de Início
                    </CFormLabel>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="required">
                      Data de Finalização
                    </CFormLabel>
                  </CCol>
                  <CCol>
                    <CFormLabel  className="required">
                      Secretarias
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow className='g-2 mb-3'>
                  <CCol sm={10}>
                    <CFormLabel className="required">
                      Objeto do Contrato
                    </CFormLabel>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol sm={6} md={4}>
                    <Button variant="success">Salvar</Button>
                  </CCol>
                  <CCol sm={6} md={4}>
                    <Button variant="info">Limpar</Button>
                  </CCol>
                  <CCol sm={6} md={4}>
                    <Button variant="danger">Excluir</Button>
                  </CCol>
                </CRow>
              </CCardBody>
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
                    to="/detalhes"
                    active={activeTab === 'detalhes'} 
                    onClick={() => setActiveTab('detalhes')}
                  >
                    Detalhes
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink 
                    to="/espelho"
                    active={activeTab === 'espelho'} 
                    onClick={() => setActiveTab('espelho')}
                  >
                    Espelho
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    to="/editar"
                    active={activeTab === 'editar'} 
                    onClick={() => setActiveTab('editar')}
                  >
                    Editar
                  </CNavLink>
                </CNavItem>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
        </CCardHeader>
        <CCardBody>
          {renderContent()} {/* Exibe o conteúdo correspondente à aba ativa */}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default DetalheContrato;
