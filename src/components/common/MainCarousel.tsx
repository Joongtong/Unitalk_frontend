// MainCarousel.tsx
import React, { useState } from 'react';
import Card from './Card';
import { programData, Program } from 'components/common/SampleData';
import 'assets/styles/common/MainCarousel.css';

const MainCarousel: React.FC = () => {
    const [index, setIndex] = useState(0);
    const totalSlides = Math.ceil(programData.length / 4);

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
        const visibleCards = programData.slice(startIdx, endIdx);

        return (
            <div className="card-group">
                {visibleCards.map((program: Program) => (
                    <div className='carousel-item' key={program.programNo}>
                        <Card {...program} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='carousel'>
            <div className={`carousel-control prev ${index === 0 ? 'hidden' : ''}`} onClick={handlePrev}>
                이전
            </div>
            <div className='carousel-content'>
                {renderCards()}
            </div>
            <div className={`carousel-control next ${index === totalSlides - 1 ? 'hidden' : ''}`} onClick={handleNext}>
                다음
            </div>
        </div>
    );
};

export default MainCarousel;
