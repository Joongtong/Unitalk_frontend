import React, { useState } from 'react';
import Login from '../../components/login/login';
import { LoginInfo } from '../../types/interface/LoginInfo';

interface LoginPageProps {
    setUser: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
    user: LoginInfo | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser, user }) => {
  return (
      <div>
          <main>
              {/* setUser를 Login 컴포넌트에 prop으로 전달 */}
              <Login setUser={setUser} />
          </main>
      </div>
  );
}

export default LoginPage;
