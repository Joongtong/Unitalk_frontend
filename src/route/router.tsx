import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import EmpHome from 'pages/emp/EmpHome';
import ChatHome from 'pages/online/ChatHome';

function Router() {
    return (
        <BrowserRouter>
            {/* <Header/> */}
            <Routes>
                <Route path='/empHome' element={<EmpHome />} />
                <Route path="/chathome" element={<ChatHome />} />
            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>
    )
}   

export default Router;