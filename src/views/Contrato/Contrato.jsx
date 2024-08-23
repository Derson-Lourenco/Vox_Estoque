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
import { CCard } from "@coreui/react";
import { Modal, Button, Form } from 'react-bootstrap';

const Contrato = () => {
  const [contrato, setContrato] = useState([]);
  const [detalhesContrato, setDetalhesContrato] = useState(null);
  const [modalEdicaoVisible, setModalEdicaoVisible] = useState(false);
  const [contratoEditando, setContratoEditando] = useState(null);

  useEffect(() => {
    const fetchContrato = async () => {
      try {
        const response = await fetch('https://vox-server.onrender.com/contratos/getContratos');
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

    fetchContrato();
  }, []);

  const formatarData = (data) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(data).toLocaleDateString(undefined, options);
  };

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

  const handleExcluirContrato = async (id) => {
    try {
      const response = await fetch(`https://vox-server.onrender.com/contratos/excluirContrato/${id}`, {
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

  const mostrarDetalhes = (contrato) => {
    setDetalhesContrato(contrato);
  };

  const abrirModalEdicao = (contrato) => {
    setContratoEditando(contrato);
    setModalEdicaoVisible(true);
  };

  const fecharModalEdicao = () => {
    setModalEdicaoVisible(false);
    setContratoEditando(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContratoEditando((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAtualizarContrato = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://vox-server.onrender.com/contratos/atualizarContrato/${contratoEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contratoEditando)
      });
  
      if (response.ok) {
        const dadosAtualizados = await response.json();
        const novosContrato = contrato.map((c) =>
          c.id === dadosAtualizados.id ? dadosAtualizados : c
        );
        setContrato(novosContrato);
        fecharModalEdicao();
      } else {
        console.error('Erro ao atualizar contrato:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
    }
  };

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
                          <span className='m-2' onClick={() => abrirModalEdicao(contrato)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </span>
                          <span className='m-2' onClick={() => handleExcluirContrato(contrato.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                          <span className='m-2'>
                            <Link to={`/espelhoNota/${contrato.id}`}>
                              <FontAwesomeIcon icon={faFileSignature} />
                            </Link>
                          </span>
                          <span className='m-2' onClick={() => mostrarDetalhes(contrato)}>
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
        <Modal show={true} onHide={() => setDetalhesContrato(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalhes do Contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Orgão:</strong> {detalhesContrato.orgao}</p>
            <p><strong>Modalidade:</strong> {detalhesContrato.modalidade}</p>
            <p><strong>Valor:</strong> R${detalhesContrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p><strong>Data Inicio:</strong> {detalhesContrato.dataInicio}</p>
            <p><strong>Data Finalização:</strong> {detalhesContrato.dataFinalizacao}</p>
            <p><strong>Objeto:</strong> {detalhesContrato.objetoContrato}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDetalhesContrato(null)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {modalEdicaoVisible && contratoEditando && (
        <Modal show={modalEdicaoVisible} onHide={fecharModalEdicao}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAtualizarContrato}>
              <Form.Group controlId="formOrgao">
                <Form.Label>Orgão</Form.Label>
                <Form.Control
                  type="text"
                  name="orgao"
                  value={contratoEditando.orgao}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formModalidade">
                <Form.Label>Modalidade</Form.Label>
                <Form.Control
                  type="text"
                  name="modalidade"
                  value={contratoEditando.modalidade}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formValor">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  name="valorContratado"
                  value={contratoEditando.valorContratado}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formDataInicio">
                <Form.Label>Data Inicio</Form.Label>
                <Form.Control
                  type="date"
                  name="dataInicio"
                  value={moment(contratoEditando.dataInicio, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formDataFinalizacao">
                <Form.Label>Data Finalização</Form.Label>
                <Form.Control
                  type="date"
                  name="dataFinalizacao"
                  value={moment(contratoEditando.dataFinalizacao, 'DD/MM/YYYY').format('YYYY-MM-DD')}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group controlId="formObjeto">
                <Form.Label>Objeto</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="objetoContrato"
                  value={contratoEditando.objetoContrato}
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Atualizar
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={fecharModalEdicao}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Contrato;
