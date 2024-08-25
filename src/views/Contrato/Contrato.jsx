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
import { CCard, Modal, Button, Form } from "@coreui/react";

const baseURL = process.env.REACT_APP_API_URL;

const Contrato = () => {
  const [contrato, setContrato] = useState([]);
  const [detalhesContrato, setDetalhesContrato] = useState(null);
  const [modalEdicaoVisible, setModalEdicaoVisible] = useState(false);
  const [contratoEditando, setContratoEditando] = useState(null);

  // Função para buscar contratos
  const fetchContrato = async () => {
    try {
      const response = await fetch(`${baseURL}/contratos/getContratos`);
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
      const response = await fetch(`${baseURL}/contratos/excluirContrato/${id}`, {
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
      const response = await fetch(`${baseURL}/contratos/atualizarContrato/${contratoEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contratoEditando)
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
                      <th className='Descr' style={{ width: '12%' }}>Data Início</th>
                      <th className='Descr' style={{ width: '12%' }}>Data Fim</th>
                      <th className='Descr' style={{ width: '11%' }}>Situação</th>
                      <th className='Descr' style={{ width: '1%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-truncate'>{contrato.orgao}</td>
                      <td className='text-truncate'>{contrato.modalidade}</td>
                      <td className='text-truncate'>{contrato.valor}</td>
                      <td className='text-truncate'>{contrato.dataInicio}</td>
                      <td className='text-truncate'>{contrato.dataFinalizacao}</td>
                      <td style={{ color: situacao.cor }}>{situacao.texto}</td>
                      <td>
                        <button onClick={() => abrirModalDetalhes(contrato)}>
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button onClick={() => abrirModalEdicao(contrato)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button onClick={() => handleExcluirContrato(contrato.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCard>

              {/* Modal de detalhes */}
              {detalhesContrato && (
                <Modal
                  show={!!detalhesContrato}
                  onClose={() => setDetalhesContrato(null)}
                >
                  <Modal.Header>
                    <h5 className="modal-title">Detalhes do Contrato</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Orgão: {detalhesContrato.orgao}</p>
                    <p>Modalidade: {detalhesContrato.modalidade}</p>
                    <p>Valor: {detalhesContrato.valor}</p>
                    <p>Data Início: {detalhesContrato.dataInicio}</p>
                    <p>Data Fim: {detalhesContrato.dataFinalizacao}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button color="secondary" onClick={() => setDetalhesContrato(null)}>Fechar</Button>
                  </Modal.Footer>
                </Modal>
              )}

              {/* Modal de edição */}
              {modalEdicaoVisible && contratoEditando && (
                <Modal
                  show={modalEdicaoVisible}
                  onClose={fecharModalEdicao}
                >
                  <Modal.Header>
                    <h5 className="modal-title">Editar Contrato</h5>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleAtualizarContrato}>
                      <Form.Group>
                        <Form.Label>Orgão</Form.Label>
                        <Form.Control
                          type="text"
                          name="orgao"
                          value={contratoEditando.orgao}
                          onChange={handleFormChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Modalidade</Form.Label>
                        <Form.Control
                          type="text"
                          name="modalidade"
                          value={contratoEditando.modalidade}
                          onChange={handleFormChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                          type="text"
                          name="valor"
                          value={contratoEditando.valor}
                          onChange={handleFormChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Data Início</Form.Label>
                        <Form.Control
                          type="text"
                          name="dataInicio"
                          value={contratoEditando.dataInicio}
                          onChange={handleFormChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Data Fim</Form.Label>
                        <Form.Control
                          type="text"
                          name="dataFinalizacao"
                          value={contratoEditando.dataFinalizacao}
                          onChange={handleFormChange}
                        />
                      </Form.Group>
                      <Button type="submit">Atualizar</Button>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button color="secondary" onClick={fecharModalEdicao}>Cancelar</Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          );
        })
      ) : (
        <p>Nenhum contrato disponível</p>
      )}
    </div>
  );
};

export default Contrato;
