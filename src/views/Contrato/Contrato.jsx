import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate
import moment from 'moment';
import '../../css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFileSignature, faEdit} from '@fortawesome/free-solid-svg-icons';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol,
  CFormSelect, CFormLabel, CButton, CModal, CModalHeader, CModalBody, CModalFooter
} from "@coreui/react";
import Button from 'react-bootstrap/Button';

const apiUrl = import.meta.env.VITE_API_URL;

const formatarData = (data) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(data).toLocaleDateString(undefined, options);
};

const verificarSituacao = (dataInicio, dataFinalizacao) => {
  const dataInicioObj = moment(dataInicio, 'DD/MM/YYYY');
  const dataFimObj = moment(dataFinalizacao, 'DD/MM/YYYY');
  const dataAtual = moment();

  // Se a data atual for antes da data de início
  if (dataAtual.isBefore(dataInicioObj)) {
    return { texto: 'Ainda não começou', cor: 'blue' };
  } 
  // Se a data atual for entre a data de início e a data de finalização
  else if (dataAtual.isSameOrAfter(dataInicioObj) && dataAtual.isBefore(dataFimObj)) {
    const diferencaMeses = dataFimObj.diff(dataAtual, 'months', true);
    // Se o término for iminente, dentro de 3 meses
    return diferencaMeses <= 3 ? { texto: 'Término Iminente', cor: 'yellow' } : { texto: 'Em vigência', cor: 'green' };
  } 
  // Se a data atual for após a data de finalização
  else {
    return { texto: 'Está vencido', cor: 'red' };
  }
};


const Contrato = () => {
  const navigate = useNavigate(); // Inicializando o useNavigate
  const [userId, setUserid] = useState(null); // Definindo o estado para o ID do usuário
  const [username, setUsername] = useState(null); // Definindo o estado para o nome do usuário
  const [contrato, setContrato] = useState([]);
  const [detalhesContrato, setDetalhesContrato] = useState(null);
  const [orgaoOptions, setOrgaoOptions] = useState([]);
  const [modalidadeOptions, setModalidadeOptions] = useState([]);
  const [situacaoOptions, setSituacaoOptions] = useState([]);
  const [filtroOrgao, setFiltroOrgao] = useState('');
  const [filtroModalidade, setFiltroModalidade] = useState('');
  const [filtroSituacao, setFiltroSituacao] = useState('');

  // UseEffect para recuperar o ID e nome do usuário do localStorage
  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    const storedName = localStorage.getItem('username');
    console.log('ID:', storedId); // Debug
    console.log('Nome do usuário encontrado:', storedName); // Debug
    
    if (storedId) setUserid(storedId);
    if (storedName) setUsername(storedName);
  }, []);

  // Função para buscar contratos pelo ID do usuário
  const fetchContrato = async () => {
    if (!userId) return; // Verifica se userId está disponível
    try {
      const response = await fetch(`${apiUrl}/contratos/getContratos/${userId}`);
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
    fetchContrato();
  }, [userId]); // Dependendo do userId

  return (
    <div>
      <CCard className='CardTextPrincipal'>
        <h2 className='TextPrincipal'>Contratos</h2>
      </CCard>
      <CCard className='CardTextPrincipal'>
        <CCardHeader>
          <div className="busca-contratos ">
            <div className="busca-item">
              <CFormSelect className='CardInputContratos' value={filtroOrgao} onChange={(e) => setFiltroOrgao(e.target.value)}>
                <option value="">Buscar Por Órgão</option>
                {orgaoOptions.map(orgao => (
                  <option key={orgao} value={orgao}>{orgao}</option>
                ))}
              </CFormSelect>
            </div>

            <div className="busca-item">
              <CFormSelect className='CardInputContratos' value={filtroModalidade} onChange={(e) => setFiltroModalidade(e.target.value)}>
                <option value="">Buscar Por Modalidade</option>
                {modalidadeOptions.map(modalidade => (
                  <option key={modalidade} value={modalidade}>{modalidade}</option>
                ))}
              </CFormSelect>
            </div>

            <div className="busca-item">
              <CFormSelect className='CardInputContratos' value={filtroSituacao} onChange={(e) => setFiltroSituacao(e.target.value)}>
                <option value="">Buscar Por Situação</option>
                {situacaoOptions.map(situacao => (
                  <option key={situacao} value={situacao}>{situacao}</option>
                ))}
              </CFormSelect>
            </div>

            <div className="busca-botoes">
              <Button className='btn-limpar' variant="info" onClick={() => {
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
              <CCard className="CardPrincipal">
                <CCardBody>
                  <CRow className="">
                    <CCol xs={12} className="d-md-none">
                      <div>
                        <strong>Órgão:</strong> {contrato.orgao}<br />
                        <strong>Modalidade:</strong> {contrato.modalidade}<br />
                        <strong>Valor:</strong> R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                        <strong>Objeto:</strong> {contrato.objetoContrato}<br />
                        <strong>Situação:</strong> <span style={{ color: situacao.cor }}>{situacao.texto}</span>
                      </div>
                    </CCol>

                    <CCol xs={12} sm={2} md={3} className="d-none d-md-block">
                      <CFormLabel className="textContratos">Órgão</CFormLabel>
                      <div className="textoResunt">{contrato.orgao}</div>
                    </CCol>
                    <CCol sm={6} md={2} className="d-none d-md-block">
                      <CFormLabel className="textContratos">Valor</CFormLabel>
                      <div className="textoResunt">R$ {contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </CCol>
                    <CCol xs={12} sm={2} md={2} className="d-none d-md-block">
                      <CFormLabel className="textContratos">Objeto</CFormLabel>
                      <div className="textoResunt">{contrato.objetoContrato}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel className="textContratos">Situação</CFormLabel>
                      <div className="textoResunt" style={{ color: situacao.cor }}>{situacao.texto}</div>
                    </CCol>
                    <CCol xs={12} sm={2} className="d-none d-md-block text-end">
                      <CButton onClick={() => abrirModalDetalhes(contrato)}>
                        <FontAwesomeIcon className="icon-ver" icon={faEye} />
                      </CButton>
                      <Button className="ButtonIcon">
                        <Link to={`/detalheContrato/${contrato.id}`}>
                          <FontAwesomeIcon className="icon-edit" icon={faEdit} />
                        </Link>
                      </Button>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <br />
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <h5>Esse usuário não tem contratos.</h5>
        </div>
      )}

      <CModal  visible={!!detalhesContrato} onClose={() => setDetalhesContrato(null)}>
        <CModalHeader className="CardPrincipalAnexo">
          <h5 className="textContratosCard2">Detalhes do Contrato</h5>
        </CModalHeader>
        <CModalBody className="CardPrincipalAnexo">
          {detalhesContrato && (
            <div>
              <p className="textoResunt"><span className="textContratos">Órgão:</span> {detalhesContrato.orgao}</p>
              <p className="textoResunt"><span className="textContratos">Modalidade:</span> {detalhesContrato.modalidade}</p>
              <p className="textoResunt"><span className="textContratos">Valor:</span> R$ {detalhesContrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p className="textoResunt"><span className="textContratos">Objeto:</span> {detalhesContrato.objetoContrato}</p>
              <p className="textoResunt"><span className="textContratos">Data de Início:</span> {detalhesContrato.dataInicio}</p>
              <p className="textoResunt"><span className="textContratos">Data de Finalização:</span> {detalhesContrato.dataFinalizacao}</p>
            </div>
          )}
        </CModalBody>
        <CModalFooter className="CardPrincipalAnexo">
          <Button className="btn-fechar" onClick={() => setDetalhesContrato(null)}>
            Fechar
          </Button>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Contrato;
