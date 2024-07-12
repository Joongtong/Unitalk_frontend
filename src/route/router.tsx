import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Components
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import Assignment from 'pages/emp/Assignment';
import ViewAssignment from 'pages/emp/ViewAssignment';

//Import Css
import 'assets/styles/common/Header.css';
import 'assets/styles/common/Footer.css';

function Router() {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
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