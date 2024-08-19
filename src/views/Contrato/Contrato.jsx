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

const Contrato = () => {
  const [contrato, setContrato] = useState([]);

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
  
  return (
    <div>
      {contrato.length > 0 ? (
        contrato.map((contrato) => {
          const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
          return (
            <div key={contrato.id}>
              <CCard className='c mb-3 p-2'>
                <table>
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
                      <th className='DescricaoObjeto'>Objeto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="6" className='DescricaoObjeto'>{contrato.objetoContrato}</td>
                      <td colSpan="6">
                        <div className='Icon' style={{ float: 'right' }}>
                          <span className='m-2'>
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
                          <span className='m-2'>
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

export default Contrato;
