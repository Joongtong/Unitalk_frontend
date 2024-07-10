import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Components
import EmpHome from 'pages/emp/EmpHome';
import Program from 'pages/program/Program';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';

//Import Css
import 'assets/styles/Header.css';
import 'assets/styles/Footer.css';

function Router() {
    console.log("Router is rendered");
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/empHome' element={<EmpHome/>} />
                <Route path='/program' element={<Program/>} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;