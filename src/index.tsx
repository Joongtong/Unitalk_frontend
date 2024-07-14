import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

const rootElement = document.getElementById('root');
//(희진)
//최종:: isLogin이 true일 때, webSocket에 연결 
//최종:: nav/header에 삽입될 예정이기에 index.tsx에 연결하면 좋다
//최종:: recoil을 활용하여 현재 페이지의 state를 불러와서 알림을 띄우자
//최종:: token 검증부 추가, connection관리, (test)-> 서버 연결 전 요청함수: 서버down 상태에서도 동작
//최종:: 보안 미비로 ws 요청불가 -> header에 토큰 삽입>> ${token} 
//최종:: 소켓이 열려있다면 HTTP세션을 만료시키지 않는다

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <RecoilRoot>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RecoilRoot>
  );

  reportWebVitals();
}

