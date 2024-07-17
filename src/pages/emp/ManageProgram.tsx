import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';

//Import Components
import EmpTopMenu from 'components/emp/EmpTopMenu';
import ProgramManagement from 'pages/program/ProgramManagement';

//Import Css
// import 'assets/styles/emp/ManageCounseling.css';
// import 'assets/styles/emp/Assignment.css';
import 'assets/styles/program/ProgramList.css';

function ManageProgram() {
    return (
        <>
        <section className='body-section'>
            <div className='top-menu-area'>
                <EmpTopMenu />
            </div>
            <br/><br/>
            <div className='content-area'>
                <ProgramManagement />
            </div>
        </section>
        </>
    )
}

export default ManageProgram;