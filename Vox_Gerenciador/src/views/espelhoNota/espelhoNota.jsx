
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EspelhoNota = () => {
  const { id } = useParams();
  const [contratoDetalhes, setContratoDetalhes] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchContratoDetalhes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/espelhoNota/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContratoDetalhes(data.contrato);
          
        } else {
          console.error('Erro na solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };

    fetchContratoDetalhes();
  }, [id]);

  return (
    <div>
      {contratoDetalhes ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Orgão</th>
              {/* Adicione mais colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contratoDetalhes.id}</td>
              <td>{contratoDetalhes.orgao}</td>
              {/* Adicione mais células conforme necessário */}
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Carregando detalhes do contrato...</div>
        
      )}
    </div>
  );
};

export default EspelhoNota;
