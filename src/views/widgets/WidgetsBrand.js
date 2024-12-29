import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning, cilTask, cilBan } from '@coreui/icons';
import { CChart } from '@coreui/react-chartjs';
import moment from 'moment';

const apiUrl = import.meta.env.VITE_API_URL;

const WidgetsBrand = (props) => {
  const [dadosContrato, setDadosContrato] = useState({
    novos: 0,
    iminentes: 0,
    vencidos: 0,
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    console.log('ID do usuário logado:', storedId);
    if (storedId) setUserId(storedId);
  }, []);

  const fetchContratos = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${apiUrl}/contratos/getContratos/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Dados da resposta da API:', data);

        let novos = 0;
        let iminentes = 0;
        let vencidos = 0;

        data.contratos.forEach(contrato => {
          const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
          console.log(`Contrato ID ${contrato.id}: ${situacao.texto}`);

          if (situacao.texto === 'Em vigência') {
            novos += 1;
          } else if (situacao.texto === 'Término Iminente') {
            iminentes += 1;
          } else if (situacao.texto === 'Está vencido') {
            vencidos += 1;
          }
        });

        console.log(`Novos: ${novos}, Iminentes: ${iminentes}, Vencidos: ${vencidos}`);
        setDadosContrato({ novos, iminentes, vencidos });
      } else {
        console.error('Erro na solicitação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchContratos();

    const intervalId = setInterval(() => {
      fetchContratos();
    }, 10000); // Atualizando a cada 10 segundos

    return () => clearInterval(intervalId);
  }, [userId]);

  const verificarSituacao = (dataInicio, dataFinalizacao) => {
    const dataInicioObj = moment(dataInicio, 'YYYY-MM-DD');
    const dataFimObj = moment(dataFinalizacao, 'YYYY-MM-DD');
    const dataAtual = moment();
  
    console.log(`Data Atual: ${dataAtual.format('YYYY-MM-DD')}`);
    console.log(`Data Início: ${dataInicioObj.format('YYYY-MM-DD')}`);
    console.log(`Data Finalização: ${dataFimObj.format('YYYY-MM-DD')}`);
  
    if (dataAtual.isBefore(dataInicioObj)) {
      return { texto: 'Ainda não começou', cor: 'blue' };
    } else if (dataAtual.isSameOrAfter(dataInicioObj) && dataAtual.isBefore(dataFimObj)) {
      const diferencaDias = dataFimObj.diff(dataAtual, 'days');
      
      if (diferencaDias <= 1) {
        return { texto: 'Está vencido', cor: 'red' };
      } else if (diferencaDias <= 60) {
        return { texto: 'Término Iminente', cor: 'yellow' };
      } else {
        return { texto: 'Em vigência', cor: 'green' };
      }
    } else {
      return { texto: 'Está vencido', cor: 'red' };
    }
  };
  

  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    indexAxis: 'y',  // Altera a orientação das barras para horizontal
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={6}>
        <CChart
          type="bar"
          data={{
            labels: ['Novos', 'Iminentes', 'Vencidos'],
            datasets: [
              {
                label: 'Contratos',
                data: [dadosContrato.novos, dadosContrato.iminentes, dadosContrato.vencidos],
                backgroundColor: ['#28A745', '#FF5722', '#C82333'],
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
            labels: ['Novos', 'Iminentes', 'Vencidos'],
            datasets: [
              {
                label: 'Contratos',
                data: [dadosContrato.novos, dadosContrato.iminentes, dadosContrato.vencidos],
                backgroundColor: ['#28A745', '#FF5722', '#C82333'],
              },
            ],
          }}
          options={pieChartOptions}
        />
      </CCol>

      {dadosContrato.novos > 0 && (
        <CCol sm={5} xl={4} xxl={3}>
          <CWidgetStatsD
            {...(props.withCharts && {
              chart: (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  options={chartOptions}
                />
              ),
            })}
            icon={<CIcon icon={cilTask} height={52} className="my-2 text-white" />}
            values={[
              { title: 'Novos Contratos', value: dadosContrato.novos },
            ]}
            style={{
              '--cui-card-cap-bg': '#28A745',
            }}
          />
        </CCol>
      )}

      {dadosContrato.iminentes > 0 && (
        <CCol sm={5} xl={4} xxl={3}>
          <CWidgetStatsD
            {...(props.withCharts && {
              chart: (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  options={chartOptions}
                />
              ),
            })}
            icon={<CIcon icon={cilWarning} height={52} className="my-2 text-white" />}
            values={[
              { title: 'Contratos Iminentes', value: dadosContrato.iminentes },
            ]}
            style={{
              '--cui-card-cap-bg': '#FF5722',
            }}
          />
        </CCol>
      )}

      {dadosContrato.vencidos > 0 && (
        <CCol sm={5} xl={4} xxl={3}>
          <CWidgetStatsD
            {...(props.withCharts && {
              chart: (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  options={chartOptions}
                />
              ),
            })}
            icon={<CIcon icon={cilBan} height={52} className="my-2 text-white" />}
            values={[
              { title: 'Contratos Vencidos', value: dadosContrato.vencidos },
            ]}
            style={{
              '--cui-card-cap-bg': '#C82333',
            }}
          />
        </CCol>
      )}

      {dadosContrato.novos === 0 && dadosContrato.iminentes === 0 && dadosContrato.vencidos === 0 && (
        <CCol xs={12}>
          <h5>Sem contratos para exibir</h5>
        </CCol>
      )}
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
