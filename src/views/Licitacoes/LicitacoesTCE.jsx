import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {
  CCol,
  CFormInput,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CInputGroup,
  CInputGroupText,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CForm,
  CButton,
  CFormCheck,
} from "@coreui/react";
const apiUrl = import.meta.env.VITE_API_URL; // Certifique-se de que esta variável está correta e corresponde à URL do backend
import '../../css/style.css';

// Função para formatar a data no formato DD/MM/YYYY
const formatarData = (dataString) => {
  if (!dataString) return '';

  const ano = dataString.slice(0, 4);
  const mes = dataString.slice(4, 6);
  const dia = dataString.slice(6, 8);
  return `${dia}/${mes}/${ano}`;
};
const LicitacoesPage = () => {
  const [licitacoes, setLicitacoes] = useState([]);
  const [error, setError] = useState('');
  const [userid, setUserid] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('userid');
    const storedName = localStorage.getItem('username');
    if (storedId) setUserid(storedId);
    if (storedName) setUsername(storedName);

    // Logando o ID e o nome do usuário
    console.log('ID do usuário:', storedId);
    console.log('Nome do usuário:', storedName);
  }, []);

  useEffect(() => {
    // Garantir que o userid esteja definido antes de buscar as licitações
    if (userid) {
      const fetchLicitacoes = async () => {
        try {
          const response = await fetch(`${apiUrl}/licitacoes?idUsuario=${userid}`);
          if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
          }
          const data = await response.json();
  
          // Ajustando para acessar o array de licitações dentro do campo 'detalhes'
          setLicitacoes(data.detalhes);  // Agora 'detalhes' contém as licitações
        } catch (err) {
          console.error('Erro ao buscar licitações:', err);
          setError('Erro ao buscar licitações: ' + err.message);
        }
      };
      fetchLicitacoes();
    }
  }, [userid]); // O efeito depende de userid
  

  const salvarLicitacao = async (licitacao) => {
    const { unidadeOrcamentaria, modalidade, previsto, data, mural } = licitacao;
    try {
      // Enviar a requisição POST para salvar a licitação
      const response = await fetch(`${apiUrl}/licitacoes/salvar_licitacao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idUsuario: userid,
          orgao: unidadeOrcamentaria,
          modalidade,
          valorPrevisto: previsto,
          data,
          link: mural,
        }),
      });
  
      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        // Feedback ao usuário
        alert('Licitação salva com sucesso!');
        
        // Atualizar a lista de licitações sem navegar para outra página
        const updatedLicitacoes = await response.json();
        setLicitacoes(updatedLicitacoes);
      } else {
        throw new Error('Erro ao salvar licitação');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar licitação');
    }
  };

  return (
    <div>
      <CCard className="CardTextPrincipal">
        <h2 className="TextPrincipal">Mural de Licitações</h2>
      </CCard>
      {error && <p>{error}</p>}

      {licitacoes.length > 0 ? (
        <div>
          {licitacoes.map((licitacao, index) => (
            <div key={index}>
              <CCard className="CardPrincipal">
                <CCardBody>
                  <CRow className="g-2 mb-3">
                    {/* Exibição para dispositivos móveis */}
                    <CCol xs={12} className="d-md-none">
                      <div>
                        <strong>ÓRGÃO:</strong> {licitacao.unidadeOrcamentaria}<br />
                        <strong>MODALIDADE:</strong> {licitacao.modalidade}<br />
                        <strong>VALOR PREVISTO:</strong> R$ {licitacao.previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}<br />
                        <strong>DATA:</strong> {formatarData(licitacao.data)}<br /> {/* Aqui você formata a data */}
                        <strong>OBJETO:</strong> {licitacao.objeto}<br />
                      </div>
                    </CCol>

                    {/* Exibição para telas maiores */}
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel className="textoPrinc">ÓRGÃO</CFormLabel>
                      <div className="textoResunt">{licitacao.unidadeOrcamentaria}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel className="textoPrinc">MODALIDADE</CFormLabel>
                      <div className="textoResunt">{licitacao.modalidade}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel className="textoPrinc">VALOR PREVISTO</CFormLabel>
                      <div className="textoResunt">R$ {licitacao.previsto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                    </CCol>
                    <CCol sm={6} md={3} className="d-none d-md-block">
                      <CFormLabel className="textoPrinc">DATA</CFormLabel>
                      <div className="textoResunt">{formatarData(licitacao.data)}</div> {/* Aqui você formata a data */}
                    </CCol>
                  </CRow>
                  <CRow className="g-2 mb-3">
                    <CCol sm={10} className="d-none d-md-block">
                      <CFormLabel className="textoPrinc">OBJETO</CFormLabel>
                      <div className="textoResunt">{licitacao.objeto}</div>
                    </CCol>
                    <CCol sm={1} className="d-flex align-items-center justify-content-end">
                      <a href={licitacao.mural} target="_blank" rel="noopener noreferrer" className="d-flex justify-content-center">
                        <FontAwesomeIcon icon={faEye} className="icon-ver"/>
                      </a>
                    </CCol>
                    <CCol sm={1} className="d-flex align-items-center justify-content-end">
                      <CButton onClick={() => salvarLicitacao(licitacao)}>
                        <FontAwesomeIcon icon={faSave} className="icon-save"/>
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma licitação encontrada.</p>
      )}
    </div>
  );
};

export default LicitacoesPage;
