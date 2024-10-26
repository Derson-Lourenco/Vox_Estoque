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
  CFormSelect,
  CFormTextarea,
  CFormInput,
} from "@coreui/react";
import './novoContrato.css';
import CIcon from "@coreui/icons-react";
import { cilLink } from "@coreui/icons";

const File = () => {
  const [visible, setVisible] = useState(false);

  const downloadTemplate = () => {
    // Adicione a lógica para iniciar o download do modelo de planilha aqui
    // Pode ser uma chamada de API ou uma simples abertura de uma nova janela com o link direto
    // No exemplo abaixo, um link direto é aberto em uma nova janela
    window.open('http://localhost:5000/download-template', '_blank');
  };

  return (
    <>
      <CButton className="teste" onClick={() => setVisible(!visible)}>
        <CIcon icon={cilLink} />
        Anexar Arquivos
      </CButton>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader className="CardPrincipalAnexo">
          <CModalTitle id="StaticBackdropExampleLabel">Anexar arquivo</CModalTitle>
        </CModalHeader>
        <CModalBody className="CardPrincipalAnexo">
          <CRow className="mb-3">
            <CCol sm={4}>
              <CFormSelect
                className='CardInput2'
                label="Tipo"
                options={[
                  "",
                  { label: "Proposta Readequada", value: "1" },
                  { label: "Contrato", value: "2" },
                  { label: "Extrato de Contrato", value: "3" },
                  { label: "Aditivo", value: "4" },
                ]}
              />
            </CCol>
            <CCol sm={4}>
              <span>
                Modelo de Planilha{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    downloadTemplate();
                  }}
                >
                  (Download)
                </a>
              </span>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormTextarea
                className='CardInput2'
                id="exampleFormControlTextarea1"
                label="Descrição"
                rows={3}
              ></CFormTextarea>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormInput className='CardInput2' type="file" id="formFile" label="Arquivo" />
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

export default File;
