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
import InputMask from 'react-input-mask';

const NovoContrato = () => {
  const now = new Date();
  const todayISO = now.toISOString().split('T')[0];

  const [validated, setValidated] = useState(false);

  const [numeroProcesso, setnumeroProcesso] = useState("");
  const [numeroContrato, setNumeroContrato] = useState(0);
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

    // Função para formatar o valor como decimal
    const formatarValor = (valor) => {
      const options = { style: "currency", currency: "BRL" };
      return Number(valor).toLocaleString('pt-BR', options);
    };

  const handleSubmit = async () => {
    const form = document.getElementById("contractForm");
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
        // Limpar o formulário ou redirecionar para outra página, se necessário
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
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
        <CCard>
          <CCardHeader>Campus obrigatórios (*)</CCardHeader>
          <CCardBody>
          <CRow className="g-2 mb-3">
            <CCol sm={4} >
              <CFormLabel htmlFor="basic-url" className='required'>Nº do processo adm/Ano </CFormLabel>
              <CInputGroup>
                <CFormInput
                  id="processoAno"
                  type="text"
                  required
                  tooltipFeedback
                  onChange={(e) => setnumeroProcesso(e.target.value)}                  
                />
                <CInputGroupText>/</CInputGroupText>
                <CFormInput
                    type="number"
                    defaultValue={now.getFullYear()}
                    required
                    tooltipFeedback
                  />
              </CInputGroup>
            </CCol>

            <CCol sm={4} >
            <CFormLabel htmlFor="basic-url" className='required'>Nº do contrato/Ano</CFormLabel>
              <CInputGroup>
                <CFormInput
                    id="processoAno"
                    type="text"
                    required
                    tooltipFeedback
                    onChange={(e) => setNumeroContrato(e.target.value)}
                  /> 
                  <CInputGroupText>/</CInputGroupText>
                  <CFormInput type='number' defaultValue={now.getFullYear()}/>
              </CInputGroup>
            </CCol>

            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className="required">
                Modalidade
              </CFormLabel>
                <CFormSelect
                  id="modalidade"
                  value={modalidade}
                  onChange={(e) => setModalidade(e.target.value)}
                  required
                  tooltipFeedback
                >
                  <option value=""></option>
                  <option value="Pregão Eletrônico">Pregão Eletrônico</option>
                  <option value="Adesão">Adesão</option>
                  <option value="Dispensa">Dispensa</option>
              </CFormSelect>
            </CCol>

            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className="required">
                Registro de Preço
              </CFormLabel>
              <CFormCheck 
                inline
                checked={registro === 'Sim'}
                onChange={() => setRegistro('Sim')}
                id="inlineCheckbox1"
                label="Sim"
              />
              <CFormCheck 
                inline
                checked={registro === 'Não'}
                onChange={() => setRegistro('Não')}
                id="inlineCheckbox2"
                label="Não"
              />
            </CCol>
          </CRow>
          <CRow className="g-2 mb-3">
            <CCol sm={6}>
              <CFormLabel htmlFor="basic-url" className="required">
                Orgão
              </CFormLabel>
              <CFormInput 
                type='text' 
                feedbackValid=""
                id="validationTooltip02" 
                required
                tooltipFeedback
                onChange={(e) => setOrgao(e.target.value)} 
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="basic-url">
                CNPJ do Contratante
              </CFormLabel>
              <CFormInput 
                type='text'
                feedbackValid=""
                id="validationTooltip02"
                tooltipFeedback
                onChange={(e) => setCnpjContratante(e.target.value)} 
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="basic-url" className="required">
                Valor do Contratado
              </CFormLabel>
              <CFormInput 
                type='text'  // Alterado para 'text' para permitir pontos decimais
                feedbackValid=""
                id="validationTooltip02" 
                required 
                tooltipFeedback
                onChange={(e) => {
                  const valor = e.target.value;
                  // Usando parseFloat para converter o valor para um número de ponto flutuante
                  const valorNumerico = parseFloat(valor.replace(',', '.')); // Tratando ponto decimal
                  setValorContratado(isNaN(valorNumerico) ? '' : valorNumerico);
                }}
              />
            </CCol>


          </CRow>
          <CRow className='g-2 mb-3'>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className="required">
                Data da Assinatura
              </CFormLabel>
              <CFormInput 
                type='date' 
                feedbackValid=""
                id="validationTooltip02" 
                required 
                tooltipFeedback
                onChange={(e) => setDataAssinatura(e.target.value)}
              />
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className="required">
                Data de Incío
              </CFormLabel>
              <CFormInput 
                type='date' 
                feedbackValid=""
                id="validationTooltip02" 
                required 
                tooltipFeedback
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </CCol>
            <CCol sm={2}>
              <CFormLabel htmlFor="basic-url" className="required">
                Data de Finalização
              </CFormLabel>
              <CFormInput 
                type='date' 
                feedbackValid=""
                id="validationTooltip02" 
                required 
                tooltipFeedback
                onChange={(e) => setDataFinalizacao(e.target.value)}
              />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="basic-url" className="required">
                Secretarias
              </CFormLabel>
              <CFormTextarea
              id="Secretarias"
              rows={1}
              required
              tooltipFeedback 
              onChange={(e) => setSecretarias(e.target.value)}
            ></CFormTextarea>
            </CCol>
          </CRow>
          <CRow className='g-2 mb-3'>
            <CCol sm={10}>
              <CFormLabel htmlFor="basic-url" className="required">
                Objeto do Contrato
              </CFormLabel>
              <CFormTextarea
                id="objetoContrato"
                rows={1}
                required
                tooltipFeedback
                onChange={(e) => setObjetoContrato(e.target.value)}
              ></CFormTextarea>
            </CCol>

            <CCol sm={2} className='mt-4'>
              <File />
            </CCol>

          </CRow>
          </CCardBody>
        </CCard>
          <CCol xs={12} className="position-relative">
          <CButton color="primary" type="button" onClick={handleSubmit}>
            Salvar
          </CButton>
          </CCol>

      </CForm>
    )
}

  export default NovoContrato

/*

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
  CFormTextarea
}from '@coreui/react'

import File from './File'


const NovoContrato = () => {
  const now = new Date
  return (
    <CCard>
      <CCardHeader>Campus obrigatórios (*)</CCardHeader>
      <CCardBody>
      <CRow className="g-2 mb-3">
        <CCol sm={4} >
        <CFormLabel htmlFor="basic-url" className='required'>Nº do processo adm/Ano </CFormLabel>
          <CInputGroup>
              <CFormInput/> 
              <CInputGroupText>/</CInputGroupText>
              <CFormInput type='number' defaultValue={now.getFullYear()}/>
          </CInputGroup>
          
        </CCol>
        <CCol sm={2}>
          <CFormSelect 
            label="Modalidade" 
            options={[
            'Open this select menu',
            { label: 'Pregão Presencial', value: '1' },
            { label: 'Carta Convite', value: '2' },
            { label: 'Dispensa', value: '3', disabled: true }
           ]}
          /> 
        </CCol>
      </CRow>
      <CRow className="g-2 mb-3">
        <CCol sm={4} >
        <CFormLabel htmlFor="basic-url" className='required'>Nº do contrato/Ano</CFormLabel>
          <CInputGroup>
              <CFormInput/> 
              <CInputGroupText>/</CInputGroupText>
              <CFormInput type='number' defaultValue={now.getFullYear()}/>
          </CInputGroup>
        </CCol>
        <CCol sm={2}>
          <CFormSelect 
            label="Tipo"
            options={[
            'Open this select menu',
            { label: 'Serviço', value: '1' },
            { label: 'Produto', value: '2' },
           ]}
          /> 
        </CCol >
        <CCol sm={4}>
          <CFormInput type='text' label='Contratante'/>
        </CCol>
      </CRow>
      <CRow className='g-2 mb-3'>
        <CCol>
          <CFormInput type='text' label='Empresa/Pessoa Contratada'/>
        </CCol>
        <CCol>
          <CFormInput type='text' label='CNPJ/CPF do Contratado'/>
        </CCol>
        <CCol>
          <CFormInput type='text' label='Valor do Contratado'/>
        </CCol>
      </CRow>
      <CRow className='g-2 mb-3'>
        <CCol>
          <CFormInput type='date' label='Data da Assinatura'/>
        </CCol>
        <CCol>
          <CFormInput type='date' label='Data de Incío'/>
        </CCol>
        <CCol>
          <CFormInput type='date' label='Data de Finalização'/>
        </CCol>
      </CRow>
      <CRow className='g-2 mb-3'>
        <CCol>
          <CFormTextarea
          id="exampleFormControlTextarea1"
          label="Objeto do Contrato"
          rows={4}
        ></CFormTextarea>
        </CCol>
      </CRow>
      <CRow className='g-2 mb-3'>
        <CCol>
          <CFormTextarea
          id="exampleFormControlTextarea1"
          label="Secretarias"
          rows={2}
        ></CFormTextarea>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={3} >
          <File />
        </CCol>
      </CRow>
      </CCardBody>
    </CCard>
  )
}

export default NovoContrato

*/