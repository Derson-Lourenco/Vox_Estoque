import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Municipios.css';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol,
  CFormSelect, CFormLabel, CButton, CModal, CModalHeader, CModalBody, CModalFooter
} from "@coreui/react";

const apiUrl = import.meta.env.VITE_API_URL; // Certifique-se de que a variável de ambiente está correta

const Municipios = () => {
  const [municipios, setMunicipios] = useState([]);
  const [selectedMunicipios, setSelectedMunicipios] = useState([]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const response = await fetch(`${apiUrl}/municipios`); // Ajuste a URL se necessário
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Converte a resposta em JSON
        setMunicipios(data); // Atualiza o estado com os dados recebidos
      } catch (error) {
        console.error('Erro ao buscar municípios:', error);
        alert(`Erro ao buscar municípios: ${error.message}`); // Exibe a mensagem de erro
      }
    };

    fetchMunicipios();
  }, []);

  const handleSelect = (id) => {
    setSelectedMunicipios((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((municipioId) => municipioId !== id) // Remove se já está selecionado
        : [...prevSelected, id] // Adiciona se não está selecionado
    );
  };

  const handleSave = async () => {
    try {
      await axios.post(`${apiUrl}/salvar-prefeituras`, { municipios: selectedMunicipios });
      alert('Municípios salvos com sucesso!');
      setSelectedMunicipios([]); // Limpa as seleções
    } catch (error) {
      console.error('Erro ao salvar municípios:', error);
      alert(`Erro ao salvar municípios: ${error.message}`); // Exibe a mensagem de erro
    }
  };

  return (
    <div>
      <CCard className='CardTextPrincipal'>
        <h2 className='TextPrincipal'>Configuração</h2>
      </CCard>
      <ul>
        {municipios.map((municipio) => (
          <li className='text' key={municipio.id}>
            <label>
              <input
                
                type="checkbox"
                checked={selectedMunicipios.includes(municipio.id)}
                onChange={() => handleSelect(municipio.id)}
              />
              {municipio.nome} (ID: {municipio.id})
              <br />
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Salvar Municípios</button>
    </div>
  );
};

export default Municipios;
