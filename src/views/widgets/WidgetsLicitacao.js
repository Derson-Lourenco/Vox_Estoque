import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilStorage, cilSave } from '@coreui/icons';
import { CChart } from '@coreui/react-chartjs';

const apiUrl = import.meta.env.VITE_API_URL;

const WidgetsLicitacoes = (props) => {
  const [dadosLicitacoes, setDadosLicitacoes] = useState({
    total: 0,
    salvas: 0,
  });
  const [quantidadeSalvas, setQuantidadeSalvas] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    console.log('ID do usuário logado:', storedId);
    if (storedId) setUserId(storedId);
  }, []);
  
  useEffect(() => {
    if (userId) {  // Verifica se o userId já foi setado
      const fetchLicitacoes = async () => {
        try {
          // Primeira requisição para obter o total de licitações
          const response = await fetch(`${apiUrl}/licitacoes?idUsuario=${userId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Dados das licitações:', data);
  
            const total = data.totalLicitacoesGeral || 0;
  
            setDadosLicitacoes({ total });
          } else {
            console.error('Erro ao buscar licitações:', response.statusText);
          }
  
          // Segunda requisição para pegar a quantidade de licitações salvas para o usuário
          const salvasResponse = await fetch(`${apiUrl}/licitacoes/quantidadeSalvas/${userId}`);
          if (salvasResponse.ok) {
            const salvasData = await salvasResponse.json();
            console.log('Dados das licitações salvas para o usuário:', salvasData); // Adicionando um log para depuração
            setQuantidadeSalvas(salvasData.quantidade);
          } else {
            console.error('Erro ao buscar licitações salvas:', salvasResponse.statusText);
          }
        } catch (error) {
          console.error('Erro na solicitação:', error);
        }
      };
  
      fetchLicitacoes();
    }
  }, [userId]);

  const barChartOptions = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: true },
    },
    scales: { x: { beginAtZero: true } },
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <CRow className={`${props.className} d-flex justify-content-center`} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={6}>
        <CChart
          type="bar"
          data={{
            labels: ['Total de Licitações', 'Licitações Salvas'],
            datasets: [
              {
                label: 'Licitacoes',
                data: [dadosLicitacoes.total, quantidadeSalvas],
                backgroundColor: ['#ff6600', '#007bff'],
              },
            ],
          }}
          options={barChartOptions}
        />
      </CCol>

      <CCol sm={6} xl={6}>
        <CChart
          type="pie"
          data={{
            labels: ['Total de Licitações', 'Licitações Salvas'],
            datasets: [
              {
                label: 'Licitacoes',
                data: [dadosLicitacoes.total, quantidadeSalvas],
                backgroundColor: ['#ff6600', '#007bff'],
              },
            ],
          }}
          options={pieChartOptions}
        />
      </CCol>
      
      {dadosLicitacoes.total > 0 && (
        <CCol sm={5} xl={4} xxl={3}>
          <CWidgetStatsD
            icon={<CIcon icon={cilStorage} height={52} className="my-2 text-white" />}
            values={[{ title: 'Total de Licitações', value: dadosLicitacoes.total }]}
            style={{ '--cui-card-cap-bg': '#ff6600' }}
          />
        </CCol>
      )}

      {quantidadeSalvas > 0 && (
        <CCol sm={5} xl={4} xxl={3}>
          <CWidgetStatsD
            icon={<CIcon icon={cilSave} height={52} className="my-2 text-white" />}
            values={[{ title: 'Licitações Salvas', value: quantidadeSalvas }]}
            style={{ '--cui-card-cap-bg': '#007bff' }}
          />
        </CCol>
      )}

      {dadosLicitacoes.total === 0 && (
        <CCol xs={12}>
          <h5>Sem licitações para exibir</h5>
        </CCol>
      )}
    </CRow>
  );
};

WidgetsLicitacoes.propTypes = {
  className: PropTypes.string,
};

export default WidgetsLicitacoes;
