import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types/interface/LoginInfo';

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    console.log("#1 리퀘스트 전송:", { userId, password });
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("#2 리스폰스 데이터:", data);
        const { token, ...user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user); // 사용자 정보 설정
        alert('로그인 성공!');
        navigate('/main'); // 메인 페이지로 이동
      } else {
        const errorData = await response.json(); // JSON 응답을 파싱
        alert('로그인 실패: ' + (errorData.message || '자격 증명을 확인해 주세요.'));
        setLoginError('로그인 실패: ' + (errorData.message || '자격 증명을 확인해 주세요.'));
      }
    } catch (error) {
      setLoginError('네트워크 오류: ' + (error as Error).message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          UserID:
          <input type="text" value={userId} onChange={(e) => {
            console.log("Updating userId:", e.target.value);
            setUserId(e.target.value);
          }} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => {
            console.log("Updating password:", e.target.value);
            setPassword(e.target.value);
          }} />
        </label>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
}

export default Login;
