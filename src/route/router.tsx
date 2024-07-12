import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import 공통 Components
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import NavigationMenu from 'components/common/layout/NavigationMenu';

//Import Route Components
import Main from 'pages/common/Main';
import Assignment from 'pages/emp/Assignment';
import ViewAssignment from 'pages/emp/ViewAssignment';

//Import 공통 Css
import 'assets/styles/common/Header.css';
import 'assets/styles/common/Footer.css';
import 'assets/styles/common/NavigationMenu.css';

function Router() {
    return(
        <BrowserRouter>
            <Header/>
            <NavigationMenu/>
            <Routes>
                <Route path='/main' element={<Main/>} />
                <Route path='/emp/assignment' element={<Assignment/>} />
                <Route path='/emp/assignment/:deptId' element={<Assignment />} />
                <Route path='/emp/assignment/view' element={<ViewAssignment/>} />
                <Route path='/emp/assignment/view/:deptId' element={<ViewAssignment />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;