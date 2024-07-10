import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Components
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import NavigationMenu from 'components/common/layout/NavigationMenu';
import Main from 'pages/common/Main';

//Import Css
import 'assets/styles/common/Header.css';
import 'assets/styles/common/Footer.css';
import 'assets/styles/common/NavigationMenu.css';

function Router() {
    return(
        <BrowserRouter>
            <Header/>
            <NavigationMenu/>
            <Main/>
            <Routes>
                
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;