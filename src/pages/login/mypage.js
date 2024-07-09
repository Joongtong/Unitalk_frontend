// mypage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/mypage', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching mypage data', error);
            }
        };

        fetchData();
    }, []);

    return <div>{message}</div>;
}

export default MyPage;
