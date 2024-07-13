import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ITop12CardItem } from 'types/interface';


interface Top12CardProps {
    top12CardItem: ITop12CardItem;
}

export default function Top12CardItem({ top12CardItem }: Top12CardProps) {

    const navigate = useNavigate();

    //properties
    const { programNo, programName, recruitStart, recruitEnd, operationStart, operationEnd, recruitNum, status, viewCnt, thumbnailFile } = top12CardItem;

    const handleCardClick = () => {
        navigate(`/program/${ programNo }`);
    }

    //render: Top12 Card Item 컴포넌트 렌더링
    return (
        <div className='card' onClick={handleCardClick}>
            <img src={thumbnailFile.filePath} alt={programName} className='card-img-top' />
            <div className='card-body'>
                <div className='card-title'>{programName}</div>
                <div></div>
                <div className='card-text'>모집기간 : {recruitStart} ~ {recruitEnd} </div>
                <div className='card-text'>운영기간 : {operationStart} ~ {operationEnd}</div>
                <div></div>
                <div className='card-text'>모집 인원 : {recruitNum}</div>
                <div></div>
                <div className='card-bottom'>
                    <div className='card-text'>Views : {viewCnt}</div>
                    <div className={`card-label ${status === 1 ? 'available' : 'unavailable'}`}>
                        {status === 1 ? '신청가능' : '신청불가'}
                    </div>
                </div>
            </div>
        </div>
    );
}