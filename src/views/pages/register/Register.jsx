import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const apiUrl = import.meta.env.VITE_API_URL; 

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpfCnpj: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/clientes/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf_cnpj: formData.cpfCnpj,
          email: formData.email,
          password: formData.password,
        }),
      });
      

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Cliente registrado com sucesso!');
        setFormData({
          nome: '',
          cpfCnpj: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert(result.error || 'Erro ao registrar cliente.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar cliente');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Registrar</h1>
                  <p className="text-body-secondary">Criar um Cadastro</p>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="nome"
                      placeholder="Nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      name="cpfCnpj"
                      placeholder="Cpf/Cnpj"
                      value={formData.cpfCnpj}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="confirmPassword"
                      placeholder="Repeat password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  
                  <div className="d-grid">
                    <CButton type="submit" color="success">Salvar</CButton>
                  </div>
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
