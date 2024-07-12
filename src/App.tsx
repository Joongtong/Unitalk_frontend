import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ChatPage from '../src/pages/online/ChatPage'
import NotificationPage from '../src/pages/online/NotificationPage'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/" element={<h1>Welcome to UniTalk</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
