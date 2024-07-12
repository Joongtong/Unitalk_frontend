import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components

import ChatPage from 'pages/online/ChatPage';
import NotificationPage from 'pages/online/NotificationPage';

import 'assets/styles/common/Header.css';
import 'assets/styles/common/Footer.css';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/notifications" element={<NotificationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
