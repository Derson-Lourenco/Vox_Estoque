import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol,
  CFormSelect, CFormLabel, CButton, CModal, CModalHeader, CModalBody, CModalFooter
} from "@coreui/react";
import Button from 'react-bootstrap/Button';

const apiUrl = import.meta.env.VITE_API_URL;

// Função para formatar data
const formatarData = (data) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(data).toLocaleDateString(undefined, options);
};

// Função para verificar situação do contrato
const verificarSituacao = (dataInicio, dataFinalizacao) => {
  const dataInicioObj = moment(dataInicio, 'DD/MM/YYYY');
  const dataFimObj = moment(dataFinalizacao, 'DD/MM/YYYY');
  const dataAtual = moment();

  if (dataAtual.isBefore(dataInicioObj)) {
    return { texto: 'Ainda não começou', cor: 'blue' };
  } else if (dataAtual.isSameOrAfter(dataInicioObj) && dataAtual.isBefore(dataFimObj)) {
    const diferencaMeses = dataFimObj.diff(dataAtual, 'months', true);
    return diferencaMeses <= 3 ? { texto: 'Término Iminente', cor: 'yellow' } : { texto: 'Em vigência', cor: 'green' };
  } else {
    return { texto: 'Está vencido', cor: 'red' };
  }
};

const Contrato = () => {
  const [contrato, setContrato] = useState([]);
  const [detalhesContrato, setDetalhesContrato] = useState(null);
  const [orgaoOptions, setOrgaoOptions] = useState([]);
  const [modalidadeOptions, setModalidadeOptions] = useState([]);
  const [situacaoOptions, setSituacaoOptions] = useState([]);
  const [filtroOrgao, setFiltroOrgao] = useState('');
  const [filtroModalidade, setFiltroModalidade] = useState('');
  const [filtroSituacao, setFiltroSituacao] = useState('');

  // Função para buscar contratos
  const fetchContrato = async () => {
    try {
      const response = await fetch(`${apiUrl}/contratos/getContratos`);
      if (response.ok) {
        const data = await response.json();
        if (data.contratos && Array.isArray(data.contratos)) {
          const contratoFormatados = data.contratos.map(contrato => ({
            ...contrato,
            dataInicio: formatarData(contrato.dataInicio),
            dataFinalizacao: formatarData(contrato.dataFinalizacao),
          }));

          const orgaosUnicos = [...new Set(contratoFormatados.map(c => c.orgao))];
          const modalidadesUnicas = [...new Set(contratoFormatados.map(c => c.modalidade))];
          const situacoesUnicas = [...new Set(contratoFormatados.map(c => verificarSituacao(c.dataInicio, c.dataFinalizacao).texto))];

          setOrgaoOptions(orgaosUnicos);
          setModalidadeOptions(modalidadesUnicas);
          setSituacaoOptions(situacoesUnicas);
          setContrato(contratoFormatados.reverse());
        } else {
          console.error('Dados de contrato não encontrados ou inválidos:', data);
        }
      } else {
        console.error('Erro na solicitação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  // Função para aplicar os filtros
  const aplicarFiltros = useMemo(() => {
    return contrato.filter(c => 
      (filtroOrgao ? c.orgao === filtroOrgao : true) &&
      (filtroModalidade ? c.modalidade === filtroModalidade : true) &&
      (filtroSituacao ? verificarSituacao(c.dataInicio, c.dataFinalizacao).texto === filtroSituacao : true)
    );
  }, [contrato, filtroOrgao, filtroModalidade, filtroSituacao]);

  // Função para abrir modal de detalhes
  const abrirModalDetalhes = (contrato) => {
    setDetalhesContrato(contrato);
  };

  // UseEffect para carregar os contratos
  useEffect(() => {
    fetchContrato(); // Carrega os dados inicialmente
  }, []);

  return (
    <div>
      <CCard className='CardTextPrincipal'>
        <h2 className='TextPrincipal'>Contratos</h2>
      </CCard>
      <CCard>
        <CCardHeader>
          <div className="busca-contratos">
            <div className="busca-item">
              <CFormSelect value={filtroOrgao} onChange={(e) => setFiltroOrgao(e.target.value)}>
                <option value="">Buscar Por Órgão</option>
                {orgaoOptions.map(orgao => (
                  <option key={orgao} value={orgao}>{orgao}</option>
                ))}
              </CFormSelect>
            </div>

            <div className="busca-item">
              <CFormSelect value={filtroModalidade} onChange={(e) => setFiltroModalidade(e.target.value)}>
                <option value="">Buscar Por Modalidade</option>
                {modalidadeOptions.map(modalidade => (
                  <option key={modalidade} value={modalidade}>{modalidade}</option>
                ))}
              </CFormSelect>
            </div>

            <div className="busca-item">
              <CFormSelect value={filtroSituacao} onChange={(e) => setFiltroSituacao(e.target.value)}>
                <option value="">Buscar Por Situação</option>
                {situacaoOptions.map(situacao => (
                  <option key={situacao} value={situacao}>{situacao}</option>
                ))}
              </CFormSelect>
            </div>

            <div className="busca-botoes">
              <Button variant="info" onClick={() => {
                setFiltroOrgao('');
                setFiltroModalidade('');
                setFiltroSituacao('');
              }}>Limpar</Button>
            </div>
          </div>
        </CCardHeader>
      </CCard>

      <br />
      {aplicarFiltros.length > 0 ? (
        aplicarFiltros.map(contrato => {
          const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
          return (
            <div key={contrato.id}>
              <CCard>
                <CCardBody>
                  <CRow className="g-2 mb-3">
                    <CCol xs={12} className="d-md-none">
                      <div>
                        <strong>Órgão:</strong> {contrato.orgao}<br />
                        <strong>Modalidade:</strong> {contrato.modalidade}<br />
                        <strong>Valor:</strong> R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                        <strong>Objeto:</strong> {contrato.objetoContrato}<br />
                        <strong>Situação:</strong> <span style={{ color: situacao.cor }}>{situacao.texto}</span>
                      </div>
                    </CCol>

                    <CCol xs={12} sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel>ÓRGÃO</CFormLabel>
                      <div>{contrato.orgao}</div>
                    </CCol>
                    <CCol sm={6} md={2} className="d-none d-md-block">
                      <CFormLabel>MODALIDADE</CFormLabel>
                      <div>{contrato.modalidade}</div>
                    </CCol>
                    <CCol sm={6} md={2} className="d-none d-md-block">
                      <CFormLabel>VALOR</CFormLabel>
                      <div>R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </CCol>
                    <CCol sm={6} md={2} className="d-none d-md-block">
                      <CFormLabel>SITUAÇÃO</CFormLabel>
                      <div><span style={{ color: situacao.cor }}>{situacao.texto}</span></div>
                    </CCol>

                    <CCol xs={12} className="d-md-none">
                      <Button variant="info" onClick={() => abrirModalDetalhes(contrato)}>
                        <FontAwesomeIcon icon={faEye} /> Detalhes
                      </Button>
                    </CCol>

                    <CCol xs={12}>
                      <Link to={`/historico/${contrato.id}`}>
                        <Button variant="primary">
                          <FontAwesomeIcon icon={faFileSignature} /> Histórico
                        </Button>
                      </Link>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </div>
          );
        })
      ) : (
        <h5>Nenhum contrato encontrado.</h5>
      )}

      {/* Modal para detalhes do contrato */}
      <CModal visible={detalhesContrato !== null} onClose={() => setDetalhesContrato(null)}>
        <CModalHeader>
          <h5 className="modal-title">Detalhes do Contrato</h5>
        </CModalHeader>
        <CModalBody>
          {detalhesContrato && (
            <div>
              <p><strong>ID:</strong> {detalhesContrato.id}</p>
              <p><strong>Órgão:</strong> {detalhesContrato.orgao}</p>
              <p><strong>Modalidade:</strong> {detalhesContrato.modalidade}</p>
              <p><strong>Valor:</strong> R$ {detalhesContrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p><strong>Objeto:</strong> {detalhesContrato.objetoContrato}</p>
              <p><strong>Data de Início:</strong> {detalhesContrato.dataInicio}</p>
              <p><strong>Data de Finalização:</strong> {detalhesContrato.dataFinalizacao}</p>
              <p><strong>Situação:</strong> <span style={{ color: verificarSituacao(detalhesContrato.dataInicio, detalhesContrato.dataFinalizacao).cor }}>
                {verificarSituacao(detalhesContrato.dataInicio, detalhesContrato.dataFinalizacao).texto}
              </span></p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <Button variant="secondary" onClick={() => setDetalhesContrato(null)}>Fechar</Button>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Contrato;
