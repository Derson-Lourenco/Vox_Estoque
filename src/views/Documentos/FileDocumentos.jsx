import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CFormInput,
} from "@coreui/react";
import '../../css/style.css';
import CIcon from "@coreui/icons-react";
import { cilLink } from "@coreui/icons";

const FileDocumentos = () => {
  const [visible, setVisible] = useState(false);

  const downloadTemplate = () => {
    // Adicione a lógica para iniciar o download do modelo de planilha aqui
    // Pode ser uma chamada de API ou uma simples abertura de uma nova janela com o link direto
    // No exemplo abaixo, um link direto é aberto em uma nova janela
    window.open('http://localhost:5000/download-template', '_blank');
  };

  return (
    <>
      <CButton className="BotaoFile" onClick={() => setVisible(!visible)}>
        Novo Documento
      </CButton>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader className="CardPrincipalAnexo">
          <CModalTitle id="StaticBackdropExampleLabel">Adiconar Novo Documento</CModalTitle>
        </CModalHeader>
        <CModalBody className="CardPrincipalAnexo">
          <CRow className="mb-3">
            <CCol>
              <CFormTextarea
                className='CardInputAnexo'
                id="exampleFormControlTextarea1"
                label="Nome do Documento"
                rows={1}
              ></CFormTextarea>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput className='CardInputAnexo' type="file" id="formFile" label="Arquivo" />
            </CCol>
          </CRow>

          <CRow className='g-2 mb-3'>
            <CCol sm={6}>
              <CFormLabel htmlFor="dataAssinatura" className="text required">
                Data da Assinatura<span className="p">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputAnexo'
                id="dataAssinatura"
                type='date'
              />
            </CCol>
            <CCol sm={6}>
              <CFormLabel htmlFor="dataInicio" className="text required">
                Data de Início<span className="p">*</span>
              </CFormLabel>
              <CFormInput
                className='CardInputAnexo'
                id="dataInicio"
                type='date'
              />
            </CCol>
          </CRow>

        </CModalBody>
        <CModalFooter className="CardPrincipalAnexo">
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Fechar
          </CButton>
          <CButton color="primary">Salvar</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default FileDocumentos;
