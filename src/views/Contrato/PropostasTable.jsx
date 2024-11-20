import React, { useEffect, useState } from 'react';
import { 
  CCard, 
  CCardBody, 
  CNav, 
  CNavItem, 
  CNavLink, 
  CRow, 
  CCol, 
  CFormLabel, 
  CFormInput, 
  CButton,
  CCardHeader,
  CFormSelect
} from "@coreui/react";
// URL da API definida na variável de ambiente
const apiUrl = import.meta.env.VITE_API_URL;

const PropostasTable = ({ userId, contratoId }) => {
  const [propostas, setPropostas] = useState([]); // Estado para armazenar as propostas
  const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
  const [quantidadesRetirar, setQuantidadesRetirar] = useState({}); // Estado para quantidades a retirar

  // Função para buscar propostas do backend
  useEffect(() => {
    const fetchPropostas = async () => {
      if (!userId || !contratoId) {
        alert('userId ou contratoId não fornecido');
        setLoading(false);
        return;
      }

      try {
        console.log('Buscando propostas com userId:', userId, 'contratoId:', contratoId);

        const response = await fetch(`${apiUrl}/contratos/propostas/${userId}/${contratoId}`);
        const textResponse = await response.text(); // Obtém a resposta bruta
        console.log('Resposta da API (bruta):', textResponse);

        const result = JSON.parse(textResponse); // Converte para JSON
        console.log('Dados processados:', result);

        if (result.success) {
          setPropostas(result.data); // Atualiza as propostas
        } else {
          alert(result.message || 'Erro ao buscar dados');
        }
      } catch (error) {
        console.error('Erro ao buscar propostas:', error);
        alert('Erro ao buscar propostas');
      } finally {
        setLoading(false); // Desativa o carregamento
      }
    };

    fetchPropostas();
  }, [userId, contratoId]); // Atualiza sempre que userId ou contratoId mudar

  // Função para manipular a quantidade retirada
  const handleRetirar = async (id, quantidade) => {
    if (!quantidade || quantidade <= 0) {
      alert('Insira uma quantidade válida');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/contratos/propostas/${id}/retirar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantidade }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);

        // Atualiza a quantidade no estado local
        setPropostas((prevPropostas) =>
          prevPropostas.map((proposta) =>
            proposta.id === id
              ? { ...proposta, quantidade_atual: proposta.quantidade_atual - quantidade }
              : proposta
          )
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Erro ao retirar quantidade:', error);
      alert('Erro ao processar a solicitação');
    }
  };

  // Função para lidar com mudanças no campo de quantidade
  const handleQuantidadeChange = (id, quantidade) => {
    setQuantidadesRetirar((prev) => ({
      ...prev,
      [id]: quantidade,
    }));
  };

  // Exibe um indicador de carregamento
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Renderiza a tabela de propostas
  return (
    <>
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipalReadequada">Proposta Readequada do Contrato {contratoId}</h2>
      </CCard>
  
      <CCard className="CardTextPrincipal">
        <table className="tabelaCentralizada">
          <thead>
            <tr>
              <th style={{ width: '60px' }}  className="TextPrincipalReadequadaTabela">Item</th>
              <th className="TextPrincipalReadequadaTabela">Descrição</th>
              <th style={{ width: '83px' }}  className="TextPrincipalReadequadaTabela">Unidade</th>
              <th style={{ width: '115px' }} className="TextPrincipalReadequadaTabela">Quantidade</th>
              <th style={{ width: '160px' }} className="TextPrincipalReadequadaTabela">Marca</th>
              <th style={{ width: '150px' }} className="TextPrincipalReadequadaTabela">Valor Unitario</th>
              <th style={{ width: '150px' }} className="TextPrincipalReadequadaTabela">Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {propostas.length > 0 ? (
              propostas.map((proposta) => (
                <tr key={proposta.id}>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.itens}</td>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.descricao}</td>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.und}</td>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.qnt}</td>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.marca}</td>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.valor_unit}</td>
                  <td className="TextPrincipalReadequadaTabelaText">{proposta.valor_total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>
                  Nenhuma proposta disponível.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CCard>
    </>
  );
  
};

export default PropostasTable;
