import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CNavbar, CNavbarNav, CNavLink, CNavItem } from "@coreui/react";
import { CCol, CFormLabel, CRow, CFormInput } from "@coreui/react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const DetalheContrato = () => {
  const [activeTab, setActiveTab] = useState('detalhes'); // Define qual aba está ativa
  const { id } = useParams();
  const [contrato, setContrato] = useState(null);
  const [editandoContrato, setEditandoContrato] = useState(null); // Estado para editar os dados

  useEffect(() => {
    const fetchDetalhesContrato = async () => {
      try {
        const response = await fetch(`${apiUrl}/contratos/detalheContrato/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContrato(data.contrato); // Acessa o objeto contrato
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
  const navigate = useNavigate();

  // Função para lidar com as mudanças nos inputs de edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditandoContrato((prevContrato) => ({
      ...prevContrato,
      [name]: value,
    }));
  };

  // Função para enviar as alterações para o backend
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
  // Função para excluir o contrato
  const handleExcluirContrato = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/contratos/excluirContrato/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Contrato excluído com sucesso!');
        navigate('/contrato'); // Redireciona para a tela de contratos
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
                    <div>{contrato.modalidade}</div>
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
                      <div>{contrato.secretarias}</div>
                    </CCol>
                </CRow>
                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={12}>
                      <CFormLabel>Objeto do Contrato</CFormLabel>
                      <div>{contrato.objetoContrato}</div>
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
              <CCardBody>
                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel>Nº do processo adm/Ano</CFormLabel>
                    <CFormInput
                      name="processoAno"
                      value={editandoContrato.processoAno}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Nº do contrato/Ano</CFormLabel>
                    <CFormInput
                      name="numeroContrato"
                      value={editandoContrato.numeroContrato}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Modalidade</CFormLabel>
                    <CFormInput
                      name="modalidade"
                      value={editandoContrato.modalidade}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Registro de Preço</CFormLabel>
                    <CFormInput
                      name="registro"
                      type="date"
                      value={editandoContrato.registro}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel>ORGÃO</CFormLabel>
                    <CFormInput
                      name="orgao"
                      value={editandoContrato.orgao}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>CNPJ do Contratante</CFormLabel>
                    <CFormInput
                      name="cnpjContratante"
                      value={editandoContrato.cnpjContratante}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Valor do Contratado</CFormLabel>
                    <CFormInput
                      name="valorContratado"
                      value={editandoContrato.valorContratado}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Valor Atual</CFormLabel>
                    <CFormInput
                      name="valorAtual"
                      value={editandoContrato.valorAtual}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={3}>
                    <CFormLabel>Data da Assinatura</CFormLabel>
                    <CFormInput
                      name="dataAssinatura"
                      type="date"
                      value={editandoContrato.dataAssinatura}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Data de Início</CFormLabel>
                    <CFormInput
                      name="dataInicio"
                      type="date"
                      value={editandoContrato.dataInicio}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Data Finalização</CFormLabel>
                    <CFormInput
                      name="dataFinalizacao"
                      type="date"
                      value={editandoContrato.dataFinalizacao}
                      onChange={handleInputChange}
                    />
                  </CCol>
                  <CCol sm={6} md={3}>
                    <CFormLabel>Secretarias</CFormLabel>
                    <CFormInput
                      name="secretarias"
                      value={editandoContrato.secretarias}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="g-2 mb-3">
                  <CCol sm={6} md={12}>
                    <CFormLabel>Objeto do Contrato</CFormLabel>
                    <CFormInput
                      name="objetoContrato"
                      value={editandoContrato.objetoContrato}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>

                <Button onClick={handleUpdateContrato}>Salvar</Button>
                <Button variant="danger" className="ms-3" onClick={() => handleExcluirContrato(contrato.id)}>
                Excluir
              </Button>
              </CCardBody>
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <CNavbar>
          <CNavbarNav>
            <CNavItem>
              <CNavLink
                active={activeTab === 'detalhes'}
                onClick={() => setActiveTab('detalhes')}
              >
                Detalhes do Contrato
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                active={activeTab === 'editar'}
                onClick={() => setActiveTab('editar')}
              >
                Editar Contrato
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
        </CNavbar>
      </CCardHeader>
      {renderContent()}
    </CCard>
  );
};

export default DetalheContrato;
