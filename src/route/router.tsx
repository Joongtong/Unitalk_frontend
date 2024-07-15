import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Components
import EmpHome from 'pages/emp/EmpHome';

import ProgramList from 'pages/program/ProgramList';
import ProgramDetail from 'pages/program/ProgramDetail';
import ProgramManagement from 'pages/program/ProgramManagement';
import ProgramForm from 'components/program/ProgramForm';
import ApplicantList from 'pages/program/AllApplicantPage';
import StudentApplicant from 'pages/program/StudentApplicant';

import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';

//Import Css
import 'assets/styles/Header.css';
import 'assets/styles/Footer.css';

function Router() {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/empHome' element={<EmpHome />} />
                <Route path='/program' element={<ProgramList />} /> // 프로그램 목록 
                <Route path='/program/:programNo' element={<ProgramDetail />}/> // 프로그램 상세페이지
                <Route path='/program/create' element={<ProgramForm />} /> // 프로그램 작성
                <Route path='/program/update/:programNo' element={<ProgramForm isEdit={true} />} /> // 프로그램 수정
                <Route path='/program/management' element={<ProgramManagement />} /> // 프로그램 및 신청 관리
                <Route path='/applicant/student/:studentId' element={<StudentApplicant />} /> // 학생 본인신청목록
                <Route path='/applicant' element={<ApplicantList />} /> // 전체 신청 목록
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;