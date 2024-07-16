import React, { useState } from 'react';
import { LoginInfo } from '../../types/interface/LoginInfo';

interface LoginProps {
  setUser: (user: LoginInfo) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("#2 Response data:", data);
        const { token, ...user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        alert('로그인 성공!');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert('로그인 실패: ' + (errorData.message || '자격 증명을 확인해 주세요.'));
        setLoginError('로그인 실패: ' + (errorData.message || '자격 증명을 확인해 주세요.'));
      }
    } catch (error) {
      setLoginError('네트워크 오류: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          UserID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
