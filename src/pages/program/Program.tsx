import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';

//Import API Functions
import { frenchPrograms } from 'utils/api';

import { getAllPrograms } from 'utils/recoilState';

//Import States
import ProgramList from 'components/program/ProgramList';
import { Program as ProgramType } from 'types/interface/program';

const Program: React.FC = () => {
const [programs, setPrograms] = useRecoilState(getAllPrograms);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchPrograms = async () => {
        try {
            const fetchedPrograms = await frenchPrograms();
            if (Array.isArray(fetchedPrograms)) {
                setPrograms(fetchedPrograms);
            } else {
                setPrograms([]);
            }
        } catch (err) {
            setError('fetchedPrograms 로드를 실패하였습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

        fetchPrograms();
    }, [setPrograms]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="program-page">
            {programs.length > 0 ? (
                <ProgramList programs={programs} />
            ) : (
                <div>게시글이 없습니다.</div>
            )}
        </div>
    );
};


export default Program;