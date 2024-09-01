import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faTrash,
  faPenToSquare,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';
import { CCard, CModal, CButton, CForm, CFormLabel, CFormInput, CFormTextarea } from "@coreui/react";

const apiUrl = import.meta.env.VITE_API_URL;

const Contrato = () => {
  const [contrato, setContrato] = useState([]);
  const [detalhesContrato, setDetalhesContrato] = useState(null);
  const [modalEdicaoVisible, setModalEdicaoVisible] = useState(false);
  const [contratoEditando, setContratoEditando] = useState(null);

  // Função para buscar contratos
  const fetchContrato = async () => {
    try {
      const response = await fetch(`${apiUrl}/contratos/getContratos`);

      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data);
        
        if (data.contratos && Array.isArray(data.contratos)) {
          const contratoFormatados = data.contratos.map(contrato => ({
            ...contrato,
            dataInicio: formatarData(contrato.dataInicio),
            dataFinalizacao: formatarData(contrato.dataFinalizacao),
          }));
          setContrato(contratoFormatados.reverse());
        } else {
          console.error('Dados de contrato não encontrados ou inválidos:', data);
        }
      } else {
        console.error('Erro na solicitação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  // Função para formatar data
  const formatarData = (data) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(data).toLocaleDateString(undefined, options);
  };

  // Função para verificar situação do contrato
  const verificarSituacao = (dataInicio, dataFinalizacao) => {
    const dataInicioObj = moment(dataInicio, 'DD/MM/YYYY');
    const dataFimObj = moment(dataFinalizacao, 'DD/MM/YYYY');
    const dataAtual = moment();
  
    if (dataAtual.isBefore(dataInicioObj)) {
      return { texto: 'Ainda não começou', cor: 'blue' };
    } else if (dataAtual.isSameOrAfter(dataInicioObj) && dataAtual.isBefore(dataFimObj)) {
      const diferencaDias = dataFimObj.diff(dataAtual, 'days');
      const diferencaMeses = dataFimObj.diff(dataAtual, 'months', true);
  
      if (diferencaDias < 0) {
        return { texto: 'Está Vencido', cor: 'red' };
      } else if (diferencaMeses <= 3) {
        return { texto: 'Término Iminente', cor: 'yellow' };
      } else {
        return { texto: 'Em vigência', cor: 'green' };
      }
    } else {
      return { texto: 'Está vencido', cor: 'red' };
    }
  };

  // Função para excluir contrato
  const handleExcluirContrato = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/contratos/excluirContrato/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const novosContrato = contrato.filter((c) => c.id !== id);
        setContrato(novosContrato);
      } else {
        console.error('Erro ao excluir contrato:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
    }
  };

  // Função para abrir modal de detalhes
  const abrirModalDetalhes = (contrato) => {
    setDetalhesContrato(contrato);
  };

  // Função para abrir modal de edição
  const abrirModalEdicao = (contrato) => {
    setContratoEditando(contrato);
    setModalEdicaoVisible(true);
  };

  // Função para fechar modal de edição
  const fecharModalEdicao = () => {
    setModalEdicaoVisible(false);
    setContratoEditando(null);
  };

  // Função para lidar com alterações no formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContratoEditando(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para atualizar contrato
  const handleAtualizarContrato = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/contratos/atualizarContrato/${contratoEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contratoEditando),
      });

      if (response.ok) {
        const dadosAtualizados = await response.json();
        const novosContrato = contrato.map((c) =>
          c.id === dadosAtualizados.id ? { ...c, ...contratoEditando } : c
        );
        setContrato(novosContrato);
        fecharModalEdicao();
      } else {
        console.error('Erro ao atualizar contrato:', response.statusText);
        alert('Erro ao atualizar contrato: ' + response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      alert('Erro ao atualizar contrato: ' + error.message);
    }
  };

  // Use useEffect para definir o intervalo
  useEffect(() => {
    fetchContrato(); // Carrega os dados inicialmente

    const intervalId = setInterval(() => {
      fetchContrato(); // Atualiza os dados a cada segundo
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, []); // Dependências vazias para que o efeito execute apenas uma vez

  return (
    <div>
      {contrato.length > 0 ? (
        contrato.map((contrato) => {
          const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
          return (
            <div key={contrato.id}>
              <CCard className='c mb-3 p-2'>
                <table>
                  <thead>
                    <tr>
                      <th className='Descr' style={{ width: '38%' }}>Orgão</th>
                      <th className='Descr' style={{ width: '15%' }}>Modalidade</th>
                      <th className='Descr' style={{ width: '12%' }}>Valor</th>
                      <th className='Descr' style={{ width: '12%' }}>Data Inicio</th>
                      <th className='Descr' style={{ width: '14%' }}>Data Finalização</th>
                      <th className='Descr' style={{ width: '12%' }}>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="Orgão">{contrato.orgao}</td>
                      <td data-label="Modalidade">{contrato.modalidade}</td>
                      <td data-label="Valor">R${contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td data-label="Data Inicio">{contrato.dataInicio}</td>
                      <td data-label="Data Finalização">{contrato.dataFinalizacao}</td>
                      <td data-label="Situação" style={{ color: situacao.cor }}>{situacao.texto}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th className='Descr' data-label='Objeto'>Objeto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4">{contrato.objetoContrato}</td>
                      <td colSpan="4">
                        <div className='Icon' style={{ float: 'right' }}>
                          <span className='m-2'>
                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => abrirModalEdicao(contrato)} />
                          </span>
                          <span className='m-2' onClick={() => handleExcluirContrato(contrato.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                          <span className='m-2'>
                            <Link to={`/espelhoNota/${contrato.id}`}>
                              <FontAwesomeIcon icon={faFileSignature} />
                            </Link>
                          </span>
                          <span className='m-2' onClick={() => abrirModalDetalhes(contrato)}>
                            <FontAwesomeIcon icon={faEye} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCard>
            </div>
          );
        })
      ) : (
        <div>Não há contratos cadastrados.</div>
      )}

      {detalhesContrato && (
        <CModal visible={!!detalhesContrato} onClose={() => setDetalhesContrato(null)}>
          <CModal.Header>
            <h5 className="modal-title">Detalhes do Contrato</h5>
          </CModal.Header>
          <CModal.Body>
            <p><strong>Orgão:</strong> {detalhesContrato.orgao}</p>
            <p><strong>Modalidade:</strong> {detalhesContrato.modalidade}</p>
            <p><strong>Valor:</strong> R${detalhesContrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p><strong>Data Início:</strong> {detalhesContrato.dataInicio}</p>
            <p><strong>Data Finalização:</strong> {detalhesContrato.dataFinalizacao}</p>
            <p><strong>Objeto:</strong> {detalhesContrato.objetoContrato}</p>
          </CModal.Body>
          <CModal.Footer>
            <CButton color="secondary" onClick={() => setDetalhesContrato(null)}>Fechar</CButton>
          </CModal.Footer>
        </CModal>
      )}

      {contratoEditando && (
        <CModal visible={modalEdicaoVisible} onClose={fecharModalEdicao}>
          <CModal.Header>
            <h5 className="modal-title">Editar Contrato</h5>
          </CModal.Header>
          <CModal.Body>
            <CForm onSubmit={handleAtualizarContrato}>
              <CFormLabel htmlFor="orgao">Orgão</CFormLabel>
              <CFormInput
                type="text"
                id="orgao"
                name="orgao"
                value={contratoEditando.orgao}
                onChange={handleFormChange}
              />
              <CFormLabel htmlFor="modalidade">Modalidade</CFormLabel>
              <CFormInput
                type="text"
                id="modalidade"
                name="modalidade"
                value={contratoEditando.modalidade}
                onChange={handleFormChange}
              />
              <CFormLabel htmlFor="valorContratado">Valor</CFormLabel>
              <CFormInput
                type="number"
                id="valorContratado"
                name="valorContratado"
                value={contratoEditando.valorContratado}
                onChange={handleFormChange}
              />
              <CFormLabel htmlFor="dataInicio">Data Início</CFormLabel>
              <CFormInput
                type="date"
                id="dataInicio"
                name="dataInicio"
                value={contratoEditando.dataInicio}
                onChange={handleFormChange}
              />
              <CFormLabel htmlFor="dataFinalizacao">Data Finalização</CFormLabel>
              <CFormInput
                type="date"
                id="dataFinalizacao"
                name="dataFinalizacao"
                value={contratoEditando.dataFinalizacao}
                onChange={handleFormChange}
              />
              <CFormLabel htmlFor="objetoContrato">Objeto</CFormLabel>
              <CFormTextarea
                id="objetoContrato"
                name="objetoContrato"
                value={contratoEditando.objetoContrato}
                onChange={handleFormChange}
              />
              <div className="d-flex justify-content-between mt-3">
                <CButton type="submit" color="primary">Salvar</CButton>
                <CButton color="secondary" onClick={fecharModalEdicao}>Cancelar</CButton>
              </div>
            </CForm>
          </CModal.Body>
        </CModal>
      )}
    </div>
  );
};

export default Contrato;
