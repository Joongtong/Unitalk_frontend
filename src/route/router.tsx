import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import EmpHome from 'pages/emp/EmpHome';

function Router() {
    return(
        <BrowserRouter>
            {/* <Header/> */}
            <Routes>
                <Route path='/empHome' element={<EmpHome/>} />
            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>
    )
}   

export default Router;