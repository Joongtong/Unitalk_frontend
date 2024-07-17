import React, { useState } from 'react';
import Login from '../../components/login/login';
import { LoginInfo } from '../../types/interface/LoginInfo';
import Footer from '../../components/common/layout/Footer';
import 'assets/styles/common/Header.css';

interface LoginPageProps {
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
    user: LoginInfo | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser, user }) => {
  return (
    <div>    
        <div>
            {/* setUser를 Login 컴포넌트에 prop으로 전달 */}
            <Login setUser={setUser} />
        </div>
        {/* <div className='login-footer'>
            <Footer />
        </div> */}
    </div>
  );
}

export default LoginPage;
