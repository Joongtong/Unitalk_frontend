import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInfo } from '../../types/interface/LoginInfo';
import 'assets/styles/login/login.css';
import logo from 'assets/images/unitalk_red.png'

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

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
        const { token, ...user } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        navigate('/main');
      } else {
        const errorData = await response.json();
        setLoginError('로그인 실패: ' + (errorData.message || '자격 증명을 확인해 주세요.'));
      }
    } catch (error) {
      setLoginError('네트워크 오류: ' + (error as Error).message);
    }
  };

  return (
    <div className='contents_login'>
      {/* 로그인 로고 */}
      <div className='logo_img'>
        <img className='login-logoimg' src={logo} alt='login'/>
      </div>
      {/* 로그인폼 타이틀 */}
        {/* <div className='login-title'>Login</div> */}
      {/* 로그인폼 시작 */}
      <div className='login_frm'>
          <form onSubmit={handleLogin}>
            <label><input className='input_info'  style={{ paddingLeft: '20px' }} placeholder='학번' type="text" value={userId} onChange={(e) => setUserId(e.target.value)} /></label>
            <label><input className='input_info ' style={{ paddingLeft: '20px' }}placeholder='비밀번호' type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
            <button className='input_button'  type="submit">로그인</button>
          </form>
        {loginError && <p>{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;
