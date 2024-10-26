import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://100.27.193.147:5000/', { email, senha });
      alert('Login realizado com sucesso!');
      localStorage.setItem('token', response.data.token); // Armazena o token no localStorage
    } catch (err) {
      console.error('Erro ao fazer login:', err.response.data); // Logar erro para depuração
      setError(err.response?.data?.message || 'Erro ao fazer login. Verifique seu email e senha.'); // Mensagem de erro detalhada
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
