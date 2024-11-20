import React, { useEffect, useState } from 'react'; // Certifique-se de incluir useEffect
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
import '../../css/style.css';

const apiUrl = import.meta.env.VITE_API_URL; // Certifique-se de que esta variável está correta e corresponde à URL do backend

// import File from "./File";

const NovoContrato = () => {
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userid');
    if (storedUserId) {
      setUserid(storedUserId);
    }
  }, []);

  const now = new Date();
  const todayISO = now.toISOString().split('T')[0];

  const [validated, setValidated] = useState(false);
  const [numeroProcesso, setNumeroProcesso] = useState("");
  const [numeroContrato, setNumeroContrato] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [registro, setRegistro] = useState("");
  const [orgao, setOrgao] = useState("");
  const [cnpjContratante, setCnpjContratante] = useState("");
  const [valorContratado, setValorContratado] = useState("");
  const [dataAssinatura, setDataAssinatura] = useState(todayISO);
  const [dataInicio, setDataInicio] = useState(todayISO);
  const [dataFinalizacao, setDataFinalizacao] = useState(todayISO);
  const [secretarias, setSecretarias] = useState("");
  const [objetoContrato, setObjetoContrato] = useState("");

  const formatarValor = (valor) => {
    const options = { style: "currency", currency: "BRL" };
    return Number(valor).toLocaleString('pt-BR', options);
  };

  console.log('ID do usuário:', userid);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const valorFormatado = valorContratado.toString();
      const response = await fetch(`${apiUrl}/contratos/salvarContrato`, { // Atualizado aqui
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          processoAno: `${numeroProcesso}/${now.getFullYear()}`,
          numeroContrato: `${numeroContrato}/${now.getFullYear()}`,
          modalidade,
          registro,
          orgao,
          cnpjContratante,
          valorContratado: valorFormatado,
          dataAssinatura,
          dataInicio,
          dataFinalizacao,
          secretarias,
          objetoContrato,
          cliente_id: userid
        }),
      });

      if (response.ok) {
        console.log("Contrato salvo com sucesso!");
        form.reset();
        setValidated(false);
      } else {
        console.error("Erro ao salvar contrato:", response.statusText);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  return (
    <CForm
      id="contractForm"
      className="needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipal">Novo Contrato</h2>
      </CCard>

      <CCard className="CardPrincipal">
        <CCardHeader> 
          <span className="textNovoContrato">
            Campos obrigatórios
          </span>
          <span className="textNovoContrato">(</span><span className="obrigatorio">*</span><span className="textNovoContrato">)</span> 
          
        </CCardHeader>
          
        <CCardBody>
          <CRow className="g-2 mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="processoAno" className='textNovoContrato required'>Nº do processo adm/Ano<span className="obrigatorio">*</span></CFormLabel>
              <CInputGroup>
                <CFormInput
                  className='CardInputNovoContrato'
                  id="processoAno"
                  type="text"
                  required
                  value={numeroProcesso}
                  onChange={(e) => setNumeroProcesso(e.target.value)}
                  tooltipFeedback
                />
                <CInputGroupText className='CardInputNovoContrato'>/</CInputGroupText>
                <CFormInput
                  className='CardInputNovoContrato'
                  type="number"
                  defaultValue={now.getFullYear()}
                  readOnly
                />
              </CInputGroup>
            </CCol>

            <CCol sm={4}>
              <CFormLabel htmlFor="numeroContrato" className='textNovoContrato required'>Nº do contrato/Ano<span className="obrigatorio">*</span></CFormLabel>
              <CInputGroup>
                <CFormInput
                  className='CardInputNovoContrato'
                  id="numeroContrato"
                  type="text"
                  required
                  value={numeroContrato}
                  onChange={(e) => setNumeroContrato(e.target.value)}
                  tooltipFeedback
                />
                <CInputGroupText className='CardInputNovoContrato'>/</CInputGroupText>
                <CFormInput
                  className='CardInputNovoContrato'
                  type="number"
                  defaultValue={now.getFullYear()}
                  readOnly
                />
              </CInputGroup>
            </CCol>

            <CCol sm={2}>
              <CFormLabel htmlFor="modalidade" className="textNovoContrato required">
                Modalidade<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormSelect
                className='CardInputNovoContrato'
                id="modalidade"
                value={modalidade}
                onChange={(e) => setModalidade(e.target.value)}
                required
                tooltipFeedback
              >
                <option value="">Selecione</option>
                <option value="Pregão Eletrônico">Pregão Eletrônico</option>
                <option value="Adesão">Adesão</option>
                <option value="Dispensa">Dispensa</option>
              </CFormSelect>
            </CCol>

            <CCol sm={2} xs={12} className="mb-3">
              <CFormLabel htmlFor="registroPreco" className="textNovoContrato required">
                Registro de Preço<span className="obrigatorio">*</span>
              </CFormLabel>
              <div className="d-flex justify-content-start">
                <CFormCheck
                  className="CardInputNovoContrato2"
                  inline
                  checked={registro === 'Sim'}
                  onChange={() => setRegistro('Sim')}
                  id="registroSim"
                  label="Sim"
                />
                <CFormCheck
                  className="CardInputNovoContrato2"
                  inline
                  checked={registro === 'Não'}
                  onChange={() => setRegistro('Não')}
                  id="registroNao"
                  label="Não"
                />
              </div>
            </CCol>

          </CRow>

          <CRow className="g-2 mb-3">
            <CCol sm={6}>
              <CFormLabel htmlFor="orgao" className="textNovoContrato required">
                Orgão<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputNovoContrato'
                id="orgao"
                type="text"
                required
                value={orgao}
                onChange={(e) => setOrgao(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol>
              <CFormLabel className="textNovoContrato" htmlFor="cnpjContratante">
                CNPJ do Contratante
              </CFormLabel>
              <CFormInput
                className='CardInputNovoContrato'
                id="cnpjContratante"
                type="text"
                value={cnpjContratante}
                onChange={(e) => setCnpjContratante(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="valorContratado" className="textNovoContrato required">
                Valor do Contratado<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputNovoContrato'
                id="valorContratado"
                type="text"
                required
                value={valorContratado}
                onChange={(e) => {
                  const valor = e.target.value;
                  const valorNumerico = parseFloat(valor.replace(',', '.'));
                  setValorContratado(isNaN(valorNumerico) ? '' : valorNumerico);
                }}
                tooltipFeedback
              />
            </CCol>
          </CRow>

          <CRow className='g-2 mb-3'>
            <CCol sm={2}>
              <CFormLabel htmlFor="dataAssinatura" className="textNovoContrato required">
                Data da Assinatura<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputNovoContrato'
                id="dataAssinatura"
                type='date'
                required
                value={dataAssinatura}
                onChange={(e) => setDataAssinatura(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="dataInicio" className="textNovoContrato required">
                Data de Início<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputNovoContrato'
                id="dataInicio"
                type='date'
                required
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="dataFinalizacao" className="textNovoContrato required">
                Data de Finalização<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputNovoContrato'
                id="dataFinalizacao"
                type='date'
                required
                value={dataFinalizacao}
                onChange={(e) => setDataFinalizacao(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="secretarias" className="textNovoContrato required">
                Secretarias<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormTextarea
                className='CardInputNovoContrato'
                id="secretarias"
                rows={1}
                required
                value={secretarias}
                onChange={(e) => setSecretarias(e.target.value)}
                tooltipFeedback
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm={8}>
              <CFormLabel htmlFor="objetoContrato" className="textNovoContrato required">
                Objeto do Contrato<span className="obrigatorio">*</span>
              </CFormLabel>
              <CFormTextarea
                className="CardInputNovoContrato"
                id="objetoContrato"
                rows={3}
                required
                value={objetoContrato}
                onChange={(e) => setObjetoContrato(e.target.value)}
                tooltipFeedback
              />
            </CCol>

            {/* <CCol sm={4} className="d-flex justify-content-center align-items-center">
              <File /> 
            </CCol> */}
          </CRow>

            <CRow className="justify-content-end">
              <CCol sm={2}>
                <CButton type="submit" className="btn-salvar">Salvar</CButton>
              </CCol>
              <CCol sm={2}>
                <CButton type="button" className="btn-limpar">Limpar</CButton>
              </CCol>
            </CRow>


        </CCardBody>
      </CCard>
    </CForm>
  );
};

export default NovoContrato;
