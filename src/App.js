import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NotificationPage from './pages/NotificationPage';
import ChatPage from './pages/ChatPage';

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

        <Switch>
          <Route path="/notifications">
            <NotificationPage />
          </Route>
          <Route path="/chat">
            <ChatPage />
          </Route>
          <Route path="/">
            <h1>Welcome to UniTalk</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;