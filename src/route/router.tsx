import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import EmpHome from 'pages/emp/EmpHome';
import CounselingMyStatus from 'pages/counseling/CounselingMyStatus';

function Router() {
    return(
        <BrowserRouter>
            {/* <Header/> */}
            <Routes>
                <Route path='/empHome' element={<EmpHome/>} />
                <Route path='/counseling' element={<CounselingMyStatus/>} />
            </Routes>
            {/* <Footer/> */}
        </BrowserRouter>
    )
}   

export default Router;