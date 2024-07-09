import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Components
import EmpHome from 'pages/emp/EmpHome';
import ViewAssignment from 'pages/emp/ViewAssignment';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';

//Import Css
import 'assets/styles/common/Header.css';
import 'assets/styles/common/Footer.css';

function Router() {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/empHome' element={<EmpHome/>} />
                <Route path='/empHome/:deptId' element={<EmpHome />} />
                <Route path='/viewAssignment' element={<ViewAssignment/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;