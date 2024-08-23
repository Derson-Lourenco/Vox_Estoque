import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning, cilTask, cilBan } from '@coreui/icons';
import { CChart } from '@coreui/react-chartjs';
import moment from 'moment';

const WidgetsBrand = (props) => {
  const [dadosContrato, setDadosContrato] = useState({
    novos: 0,
    iminentes: 0,
    vencidos: 0,
  });

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await fetch('https://vox-server.onrender.com/contratos/getContratos');
        if (response.ok) {
          const data = await response.json();

          console.log('Dados recebidos:', data); // Verifique os dados recebidos

          let novos = 0;
          let iminentes = 0;
          let vencidos = 0;

          data.contratos.forEach(contrato => {
            const situacao = verificarSituacao(contrato.dataInicio, contrato.dataFinalizacao);
            console.log(`Contrato ID ${contrato.id}: ${situacao.texto}`); // Verifique a situação do contrato
            if (situacao.texto === 'Ainda não começou') {
              novos += 1;
            } else if (situacao.texto === 'Término Iminente') {
              iminentes += 1;
            } else if (situacao.texto === 'Em vigência') {
              vencidos += 1;
            }
          });

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

    if (dataAtual.isBefore(dataInicioObj)) {
      return { texto: 'Ainda não começou', cor: 'blue' };
    } else if (dataAtual.isSameOrAfter(dataInicioObj) && dataAtual.isBefore(dataFimObj)) {
      const diferencaDias = dataFimObj.diff(dataAtual, 'days');
      console.log(`Diferença em dias para Em vigência: ${diferencaDias}`); // Verifique a diferença em dias
      if (diferencaDias <= 90) {
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

  console.log('Dados do contrato no estado:', dadosContrato); // Verifique o estado atualizado

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
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
            icon={<CIcon icon={cilTask} height={52} className="my-2 text-white" />}
            values={[
              { title: 'Novos Contratos', value: dadosContrato.vencidos },
            ]}
            style={{
              '--cui-card-cap-bg': '#1b9e3e',
            }}
          />
        </CCol>
      )}

      {/* {dadosContrato.iminentes > 0 && (
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
      )} */}

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
      
      {/* Adicionando um bloco para verificar se o valor está correto */}
      {dadosContrato.vencidos === 0 && dadosContrato.novos === 0 && dadosContrato.iminentes === 0 && (
        <CCol sm={12} xl={12} xxl={12}>
          <div>Sem contratos para exibir</div>
        </CCol>
      )}
    </CRow>
  );
}

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsBrand;
