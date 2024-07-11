import React from 'react'

interface CardProps {
    thumbnailFile: string;
    programName: string;
    recruitStart: string;
    recruitEnd: string;
    operationStart: string;
    operationEnd: string;
    recruitNum: number;
    status: number;
    viewCnt: number;
}

const Card: React.FC<CardProps> = ({
    thumbnailFile,
    programName,
    recruitStart,
    recruitEnd,
    operationStart,
    operationEnd,
    recruitNum,
    status,
    viewCnt
}) => {
    return (
        <div className='card'>
            <img src={thumbnailFile} alt={programName} className='card-img-top' />
            <div className='card-body'>
                <div className='card-title'>{programName}</div>
                <div className='card-text'>모집 시작일 : {recruitStart}</div>
                <div className='card-text'>모집 마감일 : {recruitEnd}</div>
                <div className='card-text'>운영 시작일 : {operationStart}</div>
                <div className='card-text'>운영 종료일 : {operationEnd}</div>
                <div></div>
                <div className='card-text'>모집 인원 : {recruitNum}</div>
                <div className='card-text'>모집 상태 : {status === 1 ? '신청 가능' : '신청 불가'}</div>
                <div></div>
                <div className='card-text'>조회수 : {viewCnt}</div>
            </div>
        </div>
    );
};

export default Card;
