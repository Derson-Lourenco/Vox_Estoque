import React from 'react';
import '../../css/style.css';
import {
  CCol,
  CFormInput,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CFormLabel,
  CFormTextarea,
  CForm,
  CButton,
  CFormSelect,
} from "@coreui/react";

import Button from 'react-bootstrap/Button';
import FileDocumentos from "./FileDocumentos";

const NovoDocumento = () => {
  return (
    <>
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipal">Documentos</h2>
      </CCard>

      <CCard className='CardTextPrincipal'>
        <CCardHeader>
          <div className="BuscaDocumentos">
            <div className="BuscaItemDocumentos">
              <FileDocumentos />
            </div>

            <div className="BuscaItemDocumentos">
              <CFormSelect className='CardInputDocumentos'>
                <option value="">Buscar Por Situação</option>
              </CFormSelect>
            </div>

            <div className="BuscaItemDocumentos">
              <CFormSelect className='CardInputDocumentos'>
                <option value="">Buscar Por Situação</option>
              </CFormSelect>
            </div>

            <div className="BuscaBotoesDocumentos">
              <Button className="btn-limpar" variant="info">Limpar</Button>
            </div>
          </div>
        </CCardHeader>
      </CCard>

      <CCard className="CardPrincipal">
        {/* Adicione o conteúdo do cartão principal aqui, se necessário */}
      </CCard>
    </>
  );
};

export default NovoDocumento;
