import React from 'react'
import MainMyListCounselor from './MainMyListCounselor'

export default function MainMyList() {
    return (
        <>
            <div className='Main-MyList-content'>
                <div className='Main-MyList-title'>My List</div>
                <div className='Main-MyList'>
                    <MainMyListCounselor counselorNo={2} />
                </div>
            </div>
        </>
    )
}