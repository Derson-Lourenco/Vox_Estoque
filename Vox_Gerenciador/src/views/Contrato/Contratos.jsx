import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faTrash,
  faPenToSquare,
  faFilePen,
  faFileSignature,
} from '@fortawesome/free-solid-svg-icons';
import {
  CCol,
  CFormInput,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CFormLabel,
} from "@coreui/react";
import '@coreui/icons/css/free.min.css';
import CIcon from '@coreui/icons-react';
const Contratos = () => {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await fetch('http://localhost:5000/contratos/getContratos');
        if (response.ok) {
          const data = await response.json();
          const contratosFormatados = data.contratos.map(contrato => ({
            ...contrato,
            dataInicio: formatarData(contrato.dataInicio),
            dataFinalizacao: formatarData(contrato.dataFinalizacao),
          }));
          setContratos(contratosFormatados.reverse());
        } else {
          console.error('Erro na solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };

    fetchContratos();
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
        return { texto: 'Está Vencido', cor: 'black' };
      } else if (diferencaDias <= 30) {
        return { texto: 'Encerramento Próximo', cor: 'red' };
      } else if (diferencaMeses <= 3) {
        return { texto: 'Término Iminente', cor: 'yellow' };
      } else {
        return { texto: 'Em vigência', cor: 'green' };
      }
    } else {
      return { texto: 'Está vencido', cor: 'black' };
    }
  };

  const handleExcluirContrato = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/contratos/excluirContrato/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Atualizar a lista de contratos após a exclusão
        const novosContratos = contratos.filter((c) => c.id !== id);
        setContratos(novosContratos);
      } else {
        console.error('Erro ao excluir contrato:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir contrato:', error);
    }
  };
  
  return (
    <div>
      
      {contratos.length > 0 ? (
        contratos.map((contrato) => {
          const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
          return (
            <div>
              <CCard key={contrato.id} className='c mb-3 p-2'>
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
                      <td>{contrato.orgao}</td>
                      <td>{contrato.modalidade}</td>
                      <td>R${contrato.valorContratado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                      <td>{contrato.dataInicio}</td>
                      <td>{contrato.dataFinalizacao}</td>
                      <td style={{ color: situacao.cor }}>{situacao.texto}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th className='Descr'>Objeto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4">{contrato.objetoContrato}</td>
                      <td colSpan="4">
                        <div className='Icon' style={{ float: 'right' }}>
                          <span href="#" className='m-2'>
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
                          <span href="#" className='m-2'>
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
    </div>
  );
};

export default Contratos;
