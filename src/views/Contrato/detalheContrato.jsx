import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CCard, 
  CCardBody, 
  CNav, 
  CNavItem, 
  CNavLink, 
  CRow, 
  CCol, 
  CFormLabel, 
  CFormInput, 
  CButton 
} from "@coreui/react";
import '../../css/style.css';

const apiUrl = import.meta.env.VITE_API_URL;

const DetalheContrato = () => {
  const [activeTab, setActiveTab] = useState('detalhes'); // Aba ativa
  const { id } = useParams();
  const [contrato, setContrato] = useState(null);
  const [editandoContrato, setEditandoContrato] = useState(null); // Estado de edição
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalhesContrato = async () => {
      try {
        const response = await fetch(`${apiUrl}/contratos/detalheContrato/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContrato(data.contrato);
          setEditandoContrato(data.contrato); // Inicializa o estado para edição
        } else {
          console.error('Erro ao buscar detalhes do contrato:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do contrato:', error);
      }
    };
    fetchDetalhesContrato();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditandoContrato((prevContrato) => ({
      ...prevContrato,
      [name]: value,
    }));
  };

  const handleUpdateContrato = async () => {
    try {
      const response = await fetch(`${apiUrl}/contratos/atualizarContrato/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editandoContrato),
      });
      if (response.ok) {
        alert('Contrato atualizado com sucesso!');
        window.location.reload();
      } else {
        console.error('Erro ao atualizar contrato:', response.statusText);
        alert('Erro ao atualizar contrato.');
      }
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      alert('Erro ao atualizar contrato.');
    }
  };

  const handleExcluirContrato = async () => {
    try {
      const response = await fetch(`${apiUrl}/contratos/excluirContrato/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Contrato excluído com sucesso!');
        navigate('/contrato');
      } else {
        console.error('Erro ao excluir contrato:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'detalhes':
        return (
          <div>
            {contrato ? (
            <CCardBody className="CardTextPrincipal">
              <CRow className="g-2 mb-3">
                {/* Exibição para dispositivos móveis */}
                <CCol xs={12} className="d-md-none">
                  <div>
                    <strong>Nº do processo adm/Ano:</strong> {contrato.processoAno}<br />
                    <strong>Nº do contrato/Ano:</strong> {contrato.numeroContrato}<br />
                    <strong>Modalidade:</strong> {contrato.modalidade}<br />
                    <strong>Registro de Preço:</strong> {new Date(contrato.registro).toLocaleDateString()}<br />
                    <strong>Órgão:</strong> {contrato.orgao}<br />
                    <strong>CNPJ do Contratante:</strong> {contrato.cnpjContratante}<br />
                    <strong>Valor do Contratado:</strong> R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                    <strong>Valor Atual:</strong> R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                    <strong>Data da Assinatura:</strong> {new Date(contrato.dataAssinatura).toLocaleDateString()}<br />
                    <strong>Data de Início:</strong> {new Date(contrato.dataInicio).toLocaleDateString()}<br />
                    <strong>Data de Finalização:</strong> {new Date(contrato.dataFinalizacao).toLocaleDateString()}<br />
                    <strong>Secretarias:</strong> {contrato.secretarias}<br />
                    <strong>Objeto do Contrato:</strong> {contrato.objetoContrato}<br />
                  </div>
                </CCol>

                {/* Exibição para telas maiores */}
                <CCol sm={6} md={3} className=" d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos" >Nº do processo adm/Ano</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.processoAno}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Nº do contrato/Ano</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.numeroContrato}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Modalidade</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.modalidade}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Registro de Preço</CFormLabel>
                  <div className="textDetalhesContratosResult">{new Date(contrato.registro).toLocaleDateString()}</div>
                </CCol>
              </CRow>

              <CRow className="g-2 mb-3">
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Órgão</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.orgao}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Cnpj do Contratante</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.cnpjContratante}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Valor do Contratado</CFormLabel>
                  <div className="textDetalhesContratosResult">R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Valor Atual</CFormLabel>
                  <div className="textDetalhesContratosResult">R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </CCol>
              </CRow>

              <CRow className="g-2 mb-3">
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Data da Assinatura</CFormLabel>
                  <div className="textDetalhesContratosResult">{new Date(contrato.dataAssinatura).toLocaleDateString()}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Data de Início</CFormLabel>
                  <div className="textDetalhesContratosResult">{new Date(contrato.dataInicio).toLocaleDateString()}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Data FInalização</CFormLabel>
                  <div className="textDetalhesContratosResult">{new Date(contrato.dataFinalizacao).toLocaleDateString()}</div>
                </CCol>
                <CCol sm={6} md={3} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Secretarias</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.secretarias}</div>
                </CCol>
              </CRow>

              <CRow className="g-2 mb-3">
                <CCol sm={6} md={12} className="d-none d-md-block">
                  <CFormLabel className="textDetalhesContratos">Objeto do Contrato</CFormLabel>
                  <div className="textDetalhesContratosResult">{contrato.objetoContrato}</div>
                </CCol>
              </CRow>
            </CCardBody>
          ) : (
              <p>Carregando...</p>
            )}
          </div>
        );
      case 'editar':
        return (
          <div>
            {editandoContrato ? (
              
              <CCardBody className="CardTextPrincipal">
                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Nº do processo adm/Ano</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="processoAno"
                      value={editandoContrato.processoAno}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Nº do contrato/Ano</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="numeroContrato"
                      value={editandoContrato.numeroContrato}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Modalidade</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="modalidade"
                      value={editandoContrato.modalidade}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Registro de Preço</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="registro"
                      type="date"
                      value={editandoContrato.registro}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Orgão</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="orgao"
                      value={editandoContrato.orgao}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Cnpj do Contratante</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="cnpjContratante"
                      value={editandoContrato.cnpjContratante}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Valor do Contratado</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="valorContratado"
                      value={editandoContrato.valorContratado}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Valor Atual</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="valorAtual"
                      value={editandoContrato.valorAtual}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Data da Assinatura</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="dataAssinatura"
                      type="date"
                      value={editandoContrato.dataAssinatura}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Data de Início</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="dataInicio"
                      type="date"
                      value={editandoContrato.dataInicio}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Data Finalização</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="dataFinalizacao"
                      type="date"
                      value={editandoContrato.dataFinalizacao}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel className="textDetalhesContratos">Secretarias</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="secretarias"
                      value={editandoContrato.secretarias}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={12}>
                    <CFormLabel className="textDetalhesContratos">Objeto do Contrato</CFormLabel>
                    <CFormInput
                      className="CardInputDetalhesContratos"
                      name="objetoContrato"
                      value={editandoContrato.objetoContrato}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CButton className="btn-salvar" onClick={handleUpdateContrato}>Salvar</CButton>
                <CButton variant="danger" className="btn-excluir" onClick={() => handleExcluirContrato(contrato.id)}>
                Excluir
              </CButton>
              </CCardBody>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        );
      default:
        return <p>Selecione uma aba.</p>;
    }
  };

  return (
    <>
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipal">Detalhes do Contrato</h2>
      </CCard>
      <CCard className="CardTextPrincipal">
        <CNav variant="tabs" className="txtBorder">
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
              active={activeTab === 'editar'}
              onClick={() => setActiveTab('editar')}
            >
              Editar
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'proposta'}
              onClick={() => setActiveTab('proposta')}
            >
              Porposta Readequada
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              active={activeTab === 'espelho'}
              onClick={() => setActiveTab('espelho')}
            >
              Espelho de Proposta
            </CNavLink>
          </CNavItem>
        </CNav>
        {renderContent()}
      </CCard>
    </>
  );
};

export default DetalheContrato;
