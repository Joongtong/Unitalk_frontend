import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { fetchProgramById } from 'utils/api';
import { getProgramById } from 'utils/recoilState';
import { useParams, useNavigate } from 'react-router-dom';

import Detail from 'components/program/DetailItem';

const ProgramDetail: React.FC = () => {
    const [program, setProgram] = useRecoilState(getProgramById);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { programNo } = useParams<{ programNo: string }>();

    useEffect(() => {
        const fetchProgram = async () => {
            if (!programNo) {
                setError('해당 게시글이 없습니다.');
                return;
            }

            try {
                setLoading(true);
                const fetchedProgram = await fetchProgramById(parseInt(programNo, 10));
                setProgram(fetchedProgram);
                setLoading(false);
            } catch (err) {
                setError('게시글을 불러오는데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchProgram();
    }, [programNo, setProgram]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!program) return <div>프로그램을 찾을 수 없습니다.</div>;

    return (
        <div className="program-detail-page">
            <Detail program={program} />
            <button onClick={() => navigate(-1)}>뒤로 가기</button>
        </div>
    );
};

export default ProgramDetail;