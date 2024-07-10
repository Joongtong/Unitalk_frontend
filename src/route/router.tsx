import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Components
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
                
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;