import React, { useEffect, useState } from 'react';

// Import Types Interface
import { ITop12CardItem } from 'types/interface';

// Import Components
import Top12CardItem from './Top12CardItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Import Css
import 'assets/styles/common/MainCarousel.css';

// Import API Functions
import { fetchTop12Programs } from 'utils/api';

export default function MainCarousel() {

    const [top12Data, setTop12Data] = useState<ITop12CardItem[]>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchTop12Programs()
        .then(data => {
            setTop12Data(data);
        })
        .catch(error => {
            console.error('Error fetching Top12 Program data', error);
        });
    }, []);

    const totalSlides = Math.ceil(top12Data.length / 4);

    const handleNext = () => {
        if (index < totalSlides - 1) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const renderCards = () => {
        const startIdx = index * 4;
        const endIdx = startIdx + 4;
        const visibleCards = top12Data.slice(startIdx, endIdx);

        return (
            <div className='card-group'>
                {visibleCards.map((top12: ITop12CardItem) => (
                    <div className='carousel-item' key={top12.programNo}>
                        <Top12CardItem top12CardItem={top12} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='carousel'>
            <div className={`carousel-control prev ${index === 0 ? 'hidden' : ''}`} onClick={ handlePrev }>
                <ArrowBackIosNewIcon />
            </div>
            <div className='carousel-content'>
                { renderCards() }
            </div>
            <div className={`carousel-control next ${index === totalSlides - 1 ? 'hidden' : ''}`} onClick={handleNext}>
                <ArrowForwardIosIcon />
            </div>
        </div>
    );
}