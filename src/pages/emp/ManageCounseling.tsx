import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams, useNavigate } from 'react-router-dom';

//Import Components
import EmpTopMenu from 'components/emp/EmpTopMenu';

//Import Css
// import 'assets/styles/emp/ManageCounseling.css';
import 'assets/styles/emp/Assignment.css';

function ManageCounseling() {
    return (
        <>
        <section className='body-section'>
            <div className='top-menu-area'>
                <EmpTopMenu />
            </div>
            <br/><br/>
            <div className='menu-content-grid'>
            <div className='menu-area'>

            </div>
            <div className='content-area'>
                <div>ManageCounseling</div>
            </div>
            </div>
        </section>
        </>
    )
}

export default ManageCounseling;