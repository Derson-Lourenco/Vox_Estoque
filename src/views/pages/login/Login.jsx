import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from 'react-router-dom';
import TelaConstrucao from '../../../img/LogoInicio.png';

const apiUrl = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const { login } = useAuth(); // Função para autenticação
  const navigate = useNavigate(); // Hook para navegação
  const [email, setEmail] = useState(''); // Estado para o email
  const [senha, setSenha] = useState(''); // Estado para a senha
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    try {
      const response = await axios.post(`${apiUrl}/login/getLogin`, { email, senha });
      const token = response.data.token;

      if (token) {
        login(token); // Passa o token para a função de login

        // Armazena o nome do usuário no localStorage
        localStorage.setItem('username', response.data.user.nome);
        localStorage.setItem('userid', response.data.user.id);

        // Navega para a página do dashboard
        navigate('/dashboard');
      } else {
        setError('Token não recebido');
      }
    } catch (error) {
      // Tratamento de erro
      if (error.response) {
        setError(error.response.data.message || 'Erro ao fazer login');
      } else {
        setError('Erro ao fazer login. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <div className="Login-principal-login d-flex flex-column flex-md-row align-items-center justify-content-center vh-100">
      <div className="Login-direito-login col-md-6 d-none d-md-flex justify-content-center">
        <img src={TelaConstrucao} alt="Logo Vox" style={{ width: '80%', height: 'auto' }} />
      </div>
      <form onSubmit={handleSubmit} className="col-md-6 col-12 d-flex justify-content-center vh-85">
        <div className="Login-esquedo-login w-100">
          <div className="Login-card-login">
            <h1>Login</h1>
            <div className="Login-textCard">
              <label style={{ display: 'block', marginBottom: '5px' }}>Usuário:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemplo@email.com"
                className="w-100 input-custom" // Adiciona 100% de largura para o campo de entrada
              />
            </div>
            <div className="Login-textCard">
              <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="senha"
                className="w-100 input-custom" // Adiciona 100% de largura para o campo de entrada
              />
            </div>

            <button 
              type="submit" 
              className="Login-bt-login w-100" // Adiciona 100% de largura para o botão
            >
              Entrar
            </button>
            {/* Link para a página de registro */}
            <div className="text-center mt-3">
              <Link to="/register">Não tem uma conta? Registre-se aqui</Link>
            </div>
          </div>
        </div>
        {error && (
          <div className="error-toast">
            <p>{error}</p>
          </div>
        )}
        
      </form>
    </div>
  );
};

export default LoginForm;
