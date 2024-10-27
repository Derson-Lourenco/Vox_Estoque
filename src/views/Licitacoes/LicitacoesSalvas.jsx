import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LicitacoesTCE.css';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol,
  CFormSelect, CFormLabel, CButton, CModal, CModalHeader, CModalBody, CModalFooter
} from "@coreui/react";
import TelaConstrucao from '../../img/pagina_em_desenvolvimento.png';

const Documento = () => {


  return (
    <div>
      <CCard className='CardTextPrincipal'>
        <h2 className='TextPrincipal'>Licitações Salvas</h2>
      </CCard>
      <img src={TelaConstrucao} alt="Logo Vox" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Documento;
