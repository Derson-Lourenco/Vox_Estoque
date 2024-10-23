import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf_cnpj: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/clientes/register`, formData);

      if (response.status === 201) {
        alert('Cadastro realizado com sucesso!');
      } else {
        alert('Erro ao realizar cadastro');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Registrar</h1>
                  <CFormInput
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="mb-3"
                  />
                  <CFormInput
                    type="text"
                    name="cpf_cnpj"
                    placeholder="CPF/CNPJ"
                    value={formData.cpf_cnpj}
                    onChange={handleChange}
                    className="mb-3"
                  />
                  <CFormInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mb-3"
                  />
                  <CFormInput
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    className="mb-3"
                  />
                  <CButton color="primary" type="submit">Registrar</CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
