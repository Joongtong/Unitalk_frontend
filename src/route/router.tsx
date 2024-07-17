import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import 공통 Components
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import NavigationMenu from 'components/common/layout/NavigationMenu';

//Import Route Components
import Main from 'pages/common/Main';
import Assignment from 'pages/emp/Assignment';
import ViewAssignment from 'pages/emp/ViewAssignment';
import ManageProgram from "pages/emp/ManageProgram";

//Import 공통 Css
import 'assets/styles/common/Header.css';
import 'assets/styles/common/Footer.css';
import 'assets/styles/common/NavigationMenu.css';

// 프로그램 Component
import ProgramList from 'pages/program/ProgramList';
import ProgramDetail from 'pages/program/ProgramDetail';
import ProgramManagement from 'pages/program/ProgramManagement';
import ProgramForm from 'components/program/ProgramForm';
import ApplicantList from 'pages/program/AllApplicantPage';
import StudentApplicant from 'pages/program/StudentApplicant';

// 카운셀링 Component
import CounselingMyStatus from "pages/counseling/CounselingMyStatus";
import CounselorMyStatus from "pages/counseling/CounselorMyStatus";
import ApplyCounseling from "pages/counseling/ApplyCounseling";

import ChatHome from 'pages/online/ChatHome';

function Router() {
    return (
        <BrowserRouter>
            <Header/>
            <NavigationMenu/>
            <Routes>
                  {/* EMP파트 START */}
                <Route path='/main' element={<Main/>} />
                <Route path='/emp/assignment' element={<Assignment/>} />
                <Route path='/emp/assignment/:deptId' element={<Assignment />} />
                <Route path='/emp/assignment/view' element={<ViewAssignment/>} />
                <Route path='/emp/assignment/view/:deptId' element={<ViewAssignment />} />
                <Route path='/emp/manageProgram' element={<ManageProgram />} />

                {/* 프로그램 파트 */}
                <Route path='/program' element={<ProgramList />} /> // 프로그램 목록 
                <Route path='/program/:programNo' element={<ProgramDetail />}/> // 프로그램 상세페이지
                <Route path='/emp/manageProgram/create' element={<ProgramForm />} /> // 프로그램 작성
                <Route path='/emp/manageProgram/update/:programNo' element={<ProgramForm isEdit={true} />} /> // 프로그램 수정
                <Route path='/emp/manageProgram/management' element={<ProgramManagement />} /> // 프로그램 및 신청 관리
                <Route path='/applicant/student/:studentId' element={<StudentApplicant />} /> // 학생 본인신청목록
                <Route path='/applicant' element={<ApplicantList />} /> // 전체 신청 목록 
                
                {/* 카운셀링 파트 */}
                <Route path="/counseling" element={<CounselingMyStatus />} />
                <Route path="/counselor" element={<CounselorMyStatus />} />
                <Route path="/applyCounseling" element={<ApplyCounseling />} />
                
                {/* 채팅파트 */}
                <Route path="/online" element={<ChatHome />} />
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}   

export default Router;
