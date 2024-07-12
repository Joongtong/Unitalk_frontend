import React from 'react'
import { ITop12CardItem } from 'types/interface';


interface Top12CardProps {
    top12CardItem: ITop12CardItem;
}

export default function Top12CardItem({ top12CardItem }: Top12CardProps) {

    //properties
    const { programName, recruitStart, recruitEnd, operationStart, operationEnd, recruitNum, status, viewCnt, thumbnailFile } = top12CardItem;

    //render: Top12 Card Item 컴포넌트 렌더링
    return (
        <div className='card'>
            <img src={thumbnailFile.filePath} alt={programName} className='card-img-top' />
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
                <div className='card-text'>Views : {viewCnt}</div>
            </div>
        </div>
    );
}