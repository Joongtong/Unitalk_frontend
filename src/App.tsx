import React, { useState, useEffect } from 'react';
import Router from './route/router';
import { LoginInfo } from './types/interface/LoginInfo';

const App: React.FC = () => {
  const [user, setUser] = useState<LoginInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
    <div style={{ minWidth: '1920px' }}>
      <Router user={user} setUser={setUser} />
      </div>
    </>
  );
}

export default App;
