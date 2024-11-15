import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCard, CCardBody, CRow, CCol, CButton, CNav, CNavItem, CNavLink
} from "@coreui/react";
import '../css/style.css';
const apiUrl = import.meta.env.VITE_API_URL;

const Municipios = () => {
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipios, setSelectedMunicipios] = useState([]);
  const [savedMunicipios, setSavedMunicipios] = useState(new Set());
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('salvos'); // Estado para controlar a aba ativa

  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    const storedName = localStorage.getItem('username');

    if (storedId) setUserid(storedId);
    if (storedName) setUsername(storedName);
  }, []);

  // Função para buscar municípios
  const fetchMunicipios = async () => {
    try {
      const response = await fetch(`${apiUrl}/municipios`);
      if (!response.ok) {
        throw new Error(`Erro de HTTP: status ${response.status}`);
      }
      const data = await response.json();
      setMunicipios(data);
    } catch (error) {
      console.error('Erro ao buscar municípios:', error);
      alert(`Erro ao buscar municípios: ${error.message}`);
    }
  };

  // Função para buscar municípios salvos
  const fetchSavedMunicipios = async () => {
    try {
      const response = await axios.get(`${apiUrl}/municipios/municipios/salvos/${userid}`);
      setSavedMunicipios(new Set(response.data.map(m => m.municipio_id)));
    } catch (error) {
      console.error('Erro ao buscar municípios salvos:', error);
      alert(`Erro ao buscar municípios salvos: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMunicipios();
    if (userid) fetchSavedMunicipios();
  }, [userid]);

  const handleSelect = (id) => {
    setSelectedMunicipios((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      return isSelected 
        ? prevSelected.filter((municipioId) => municipioId !== id) 
        : [...prevSelected, id];
    });
  };

  const removeSavedMunicipio = async (id) => {
    try {
      await axios.post(`${apiUrl}/municipios/remover-prefeituras`, { 
        municipios: [id], 
        id_usuario: userid 
      });
      setSavedMunicipios((prev) => {
        const newSaved = new Set(prev);
        newSaved.delete(id);
        return newSaved;
      });
      alert('Município removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover município:', error);
      alert(`Erro ao remover município: ${error.message}`);
    }
  };

  const handleSave = async () => {
    try {
      const municipiosSelecionados = selectedMunicipios.map((id) => {
        const municipio = municipios.find((m) => m.id === id);
        return { municipio_id: id, nome_municipio: municipio.nome };
      });

      await axios.post(`${apiUrl}/municipios/salvar-prefeituras`, { 
        municipios: municipiosSelecionados, 
        id_usuario: userid 
      });

      alert('Municípios salvos com sucesso!');
      setSelectedMunicipios([]);
      fetchSavedMunicipios();
    } catch (error) {
      console.error('Erro ao salvar municípios:', error);
      alert(`Erro ao salvar municípios: ${error.message}`);
    }
  };

  const municipiosDisponiveis = municipios.filter(municipio => !savedMunicipios.has(municipio.id));

  return (
    <div >       
      <CCard className='CardTextPrincipal'>
        <h2 className='TextPrincipal'>Configuração</h2>
      </CCard>

        {/* Navegação entre as abas */}
      <CCard className="CardTextPrincipal">
        <CNav variant="tabs" className="txtBorder">
          <CNavItem>
            <CNavLink
              className="nav-link-Municipio"
              active={activeTab === 'salvos'} 
              onClick={() => setActiveTab('salvos')}
            >
              Municípios Salvos
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink 
              active={activeTab === 'todos'} 
              onClick={() => setActiveTab('todos')}
            >
              Adicionar Municípios
            </CNavLink>
          </CNavItem>
        </CNav>

        {/* Conteúdo baseado na aba ativa */}
        <CCardBody className=''>
          {activeTab === 'salvos' && (
            <div>
              <CCard className='CardTextPrincipal'>
                <h2 className='TextMunicipios'>Municípios Salvos</h2>
              </CCard>
              
              <CRow>
                {Array.from(savedMunicipios).map(id => {
                  const municipio = municipios.find(m => m.id === id);
                  return (
                    <CCol xs="12" sm="4" key={id} className="tx">
                      <div className="municipio-card">
                        <span className='text'>
                          <span>P. M</span>
                          <span>{municipio?.nome}</span>
                        </span>
                        <CButton 
                          color="danger" 
                          onClick={() => removeSavedMunicipio(id)}
                          className="remove-btn"
                        >
                          X
                        </CButton>
                      </div>
                    </CCol>
                  );
                })}
              </CRow>
            </div>
          )}

          {activeTab === 'todos' && (
            <div>
              <CCard className='CardTextPrincipal'>
                <h2 className='TextMunicipios'>Lista Todos os Municípios do Estado do Piauí</h2>
                            
                <CRow>
                  {municipiosDisponiveis.map((municipio) => (
                    <CCol xs="12" sm="4" key={municipio.id} className="">
                      <div className="municipio-card2">
                        <label>
                          <input
                            className='InputMunicipio'
                            type="checkbox"
                            checked={selectedMunicipios.includes(municipio.id)}
                            onChange={() => handleSelect(municipio.id)}
                          />
                        </label>
                        <span className='text'> P. M {municipio.nome}</span>
                      </div>
                    </CCol>
                  ))}
                </CRow>
              </CCard>
              <CButton color="primary" onClick={handleSave} className="mt-3">
                Salvar Municípios
              </CButton>
            </div>
          )}
        </CCardBody>
      </CCard>
      
     
    </div>
  );
};

export default Municipios;
