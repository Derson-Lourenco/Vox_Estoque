import React, { useState } from "react";
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

import File from "./File";

const NovoContrato = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      const valorFormatado = valorContratado.toString();
      const response = await fetch('https://vox-server.onrender.com/contratos/salvarContrato', {
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
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCard>
        <CCardHeader>Campos obrigatórios (*)</CCardHeader>
        <CCardBody>
          <CRow className="g-2 mb-3">
            <CCol sm={4}>
              <CFormLabel htmlFor="processoAno" className='required'>Nº do processo adm/Ano</CFormLabel>
              <CInputGroup>
                <CFormInput
                  id="processoAno"
                  type="text"
                  required
                  value={numeroProcesso}
                  onChange={(e) => setNumeroProcesso(e.target.value)}
                  tooltipFeedback
                />
                <CInputGroupText>/</CInputGroupText>
                <CFormInput
                  type="number"
                  defaultValue={now.getFullYear()}
                  readOnly
                />
              </CInputGroup>
            </CCol>

            <CCol sm={4}>
              <CFormLabel htmlFor="numeroContrato" className='required'>Nº do contrato/Ano</CFormLabel>
              <CInputGroup>
                <CFormInput
                  id="numeroContrato"
                  type="text"
                  required
                  value={numeroContrato}
                  onChange={(e) => setNumeroContrato(e.target.value)}
                  tooltipFeedback
                />
                <CInputGroupText>/</CInputGroupText>
                <CFormInput
                  type="number"
                  defaultValue={now.getFullYear()}
                  readOnly
                />
              </CInputGroup>
            </CCol>

            <CCol sm={2}>
              <CFormLabel htmlFor="modalidade" className="required">
                Modalidade
              </CFormLabel>
              <CFormSelect
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

            <CCol sm={2}>
              <CFormLabel htmlFor="registroPreco" className="required">
                Registro de Preço
              </CFormLabel>
              <CFormCheck
                inline
                checked={registro === 'Sim'}
                onChange={() => setRegistro('Sim')}
                id="registroSim"
                label="Sim"
              />
              <CFormCheck
                inline
                checked={registro === 'Não'}
                onChange={() => setRegistro('Não')}
                id="registroNao"
                label="Não"
              />
            </CCol>
          </CRow>

          <CRow className="g-2 mb-3">
            <CCol sm={6}>
              <CFormLabel htmlFor="orgao" className="required">
                Orgão
              </CFormLabel>
              <CFormInput
                id="orgao"
                type="text"
                required
                value={orgao}
                onChange={(e) => setOrgao(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="cnpjContratante">
                CNPJ do Contratante
              </CFormLabel>
              <CFormInput
                id="cnpjContratante"
                type="text"
                value={cnpjContratante}
                onChange={(e) => setCnpjContratante(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="valorContratado" className="required">
                Valor do Contratado
              </CFormLabel>
              <CFormInput
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
              <CFormLabel htmlFor="dataAssinatura" className="required">
                Data da Assinatura
              </CFormLabel>
              <CFormInput
                id="dataAssinatura"
                type='date'
                required
                value={dataAssinatura}
                onChange={(e) => setDataAssinatura(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="dataInicio" className="required">
                Data de Início
              </CFormLabel>
              <CFormInput
                id="dataInicio"
                type='date'
                required
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="dataFinalizacao" className="required">
                Data de Finalização
              </CFormLabel>
              <CFormInput
                id="dataFinalizacao"
                type='date'
                required
                value={dataFinalizacao}
                onChange={(e) => setDataFinalizacao(e.target.value)}
                tooltipFeedback
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="secretarias" className="required">
                Secretarias
              </CFormLabel>
              <CFormTextarea
                id="secretarias"
                rows={1}
                required
                value={secretarias}
                onChange={(e) => setSecretarias(e.target.value)}
                tooltipFeedback
              />
            </CCol>
          </CRow>

          <CRow className='g-2 mb-3'>
            <CCol sm={10}>
              <CFormLabel htmlFor="objetoContrato" className="required">
                Objeto do Contrato
              </CFormLabel>
              <CFormTextarea
                id="objetoContrato"
                rows={1}
                required
                value={objetoContrato}
                onChange={(e) => setObjetoContrato(e.target.value)}
                tooltipFeedback
              />
            </CCol>

            <CCol sm={2} className='mt-4'>
              <File />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCol xs={12} className="position-relative">
        <CButton color="primary" type="submit">
          Salvar
        </CButton>
      </CCol>
    </CForm>
  );
}

export default NovoContrato;
