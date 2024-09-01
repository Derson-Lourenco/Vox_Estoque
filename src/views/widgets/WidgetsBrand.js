import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning, cilTask, cilBan } from '@coreui/icons';
import { CChart } from '@coreui/react-chartjs';
import moment from 'moment';

// Use a variável de ambiente para a URL da API
CC
const WidgetsBrand = (props) => {
  const [dadosContrato, setDadosContrato] = useState({
    novos: 0,
    iminentes: 0,
    vencidos: 0,
  });

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        // Use a variável baseURL para o fetch
        const response = await fetch(`${apiUrl}/contratos/getContratos`);
        if (response.ok) {
          const data = await response.json();

          let novos = 0;
          let iminentes = 0;
          let vencidos = 0;

          data.contratos.forEach(contrato => {
            const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
            console.log(`Contrato ID ${contrato.id}: ${situacao.texto}`); // Verifique a situação do contrato

            if (situacao.texto === 'Em vigência') {
              novos += 1;
            } else if (situacao.texto === 'Término Iminente') {
              iminentes += 1;
            } else if (situacao.texto === 'Está vencido') {
              vencidos += 1;
            }
          });

          console.log(`Novos: ${novos}, Iminentes: ${iminentes}, Vencidos: ${vencidos}`); // Verifique as contagens
          setDadosContrato({ novos, iminentes, vencidos });
        } else {
          console.error('Erro na solicitação:', response.statusText);
        }
      } catch (error) {
        console.error('Erro na solicitação:', error);
      }
    };

    fetchContratos();
  }, []);

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
      const diferencaMeses = dataFimObj.diff(dataAtual, 'months', true);

      if (diferencaDias <= 10) {
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

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
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
              '--cui-card-cap-bg': '#1b9e3e',
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
              '--cui-card-cap-bg': '#f9b115',
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
              '--cui-card-cap-bg': '#e55353',
            }}
          />
        </CCol>
      )}

      {/* Verifique se todos os valores são zero antes de exibir a mensagem de ausência */}
      {dadosContrato.novos === 0 && dadosContrato.iminentes === 0 && dadosContrato.vencidos === 0 && (
        <CCol sm={12} xl={12} xxl={12}>
          <div>Sem contratos para exibir</div>
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
