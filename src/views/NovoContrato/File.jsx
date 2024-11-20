import React, { useState, useEffect } from "react";
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
  CFormInput,
} from "@coreui/react";
import '../../css/style.css';
import CIcon from "@coreui/icons-react";
import { cilLink } from "@coreui/icons";
import * as XLSX from 'xlsx'; // Importa a biblioteca XLSX
const apiUrl = import.meta.env.VITE_API_URL;

const File = ({ contratoId }) => {
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    const storedName = localStorage.getItem('username');
    console.log('ID:', storedId); // Debug
    console.log('Nome do usuário encontrado:', storedName); // Debug
    
    if (storedId) setUserId(storedId);
    if (storedName) setUsername(storedName);
  }, []); // Executa uma vez quando o componente for montado

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryString = event.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });
        setFileData(data);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSave = async () => {
    if (selectedOption !== "1") {
      alert("Por favor, selecione 'Proposta Readequada'.");
      return;
    }
  
    if (!fileData) {
      alert("Faça o upload de um arquivo.");
      return;
    }
  
    if (!userId) {
      alert("Usuário não encontrado.");
      return;
    }

    const fileDataFormatted = fileData.map(row => ({
      codProd: row[0],
      itens: row[1],
      descricao: row[2],
      und: row[3],
      qnt: row[4],
      marca: row[5],
      fabricante: row[6],
      valor_unit: row[7],
      valor_total: row[8],
    }));
  
    const requestData = {
      usuarioId: userId,  // Usando o userId recuperado
      contratoId,  // Passando o contratoId
      data: fileDataFormatted,
      tipo: selectedOption,
    };
  
    try {
      const response = await fetch(`${apiUrl}/contratos/upload-proposta/${userId}/${contratoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Erro na resposta da API: ' + response.status);
      }
  
      const result = await response.json();
  
      if (!result) {
        throw new Error('A resposta da API está vazia.');
      }
  
      if (result.success) {
        alert("Arquivo salvo com sucesso!");
        setVisible(false);
      } else {
        alert("Erro ao salvar o arquivo.");
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert("Erro ao enviar dados.");
    }
  };

  return (
    <>
      <CButton className="BotaoFile" onClick={() => setVisible(!visible)}>
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
                className='CardInputAnexo'
                label="Tipo"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                options={[
                  "",
                  { label: "Proposta Readequada", value: "1" },
                  { label: "Proposta Readequada PDF", value: "2" },
                ]}
              />
            </CCol>
            <CCol sm={8}>
              <CFormInput 
                type="file" 
                onChange={handleFileUpload} 
                label="Escolha o arquivo Excel"
              />
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Fechar</CButton>
          <CButton color="primary" onClick={handleSave}>Salvar</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default File;
