# Unitalk_frontend 폴더구조

```
my-react-app/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── App.css
│   │       ├── index.css
│   │       └── [other style files]
│   ├── components/
│   │   ├── common/
│   │   ├── counseling/
│   │   ├── emp/
│   │   ├── login/
│   │   ├── online/
│   │   └── program/
│   ├── context/
│   │   └── [context files]
│   ├── hooks/
│   │   └── [custom hooks]
│   ├── pages/
│   │   ├── common/
│   │   ├── counseling/
│   │   ├── emp/
│   │   ├── login/
│   │   ├── online/
│   │   └── program/
│   ├── services/
│   │   └── [api services]
│   ├── utils/
│   │   └── [utility functions]
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── setupTests.js
│   └── [other root-level files]
├── .gitignore
├── package.json
├── README.md
└── [other configuration files]
```
## 폴더구조 정의

- public/: 정적 파일들을 포함합니다.
  - index.html: 메인 HTML 파일입니다.
  - favicon.ico: 즐겨찾기 아이콘 파일입니다.
  - manifest.json: 웹 애플리케이션 매니페스트 파일입니다.

- src/: 소스 코드 파일들이 포함됩니다.
  - assets/: 이미지, 스타일 파일 등 정적 자산을 포함합니다.
    - images/: 이미지 파일들을 포함합니다.
    - styles/: CSS 파일들을 포함합니다. 
      - App.css: 전체 앱 스타일 파일입니다.
      - index.css: 전역 스타일 파일입니다.

  - components/: 재사용 가능한 React 컴포넌트들을 포함합니다.
    - common/: 공통 컴포넌트를 포함합니다.
    - counseling/: 상담 관련 컴포넌트를 포함합니다.
    - emp/: 직원 관련 컴포넌트를 포함합니다.
    - login/: 로그인 관련 컴포넌트를 포함합니다.
    - online/: 온라인 관련 컴포넌트를 포함합니다.
    - program/: 프로그램 관련 컴포넌트를 포함합니다.

  - context/: React Context 관련 파일들을 포함합니다.
  - hooks/: 커스텀 훅을 포함합니다.
  - pages/: 각 페이지 컴포넌트를 포함합니다
    - common/: 공통 페이지 컴포넌트를 포함합니다.
    - counseling/: 상담 페이지 컴포넌트를 포함합니다.
    - emp/: 직원 페이지 컴포넌트를 포함합니다.
    - login/: 로그인 페이지 컴포넌트를 포함합니다.
    - online/: 온라인 페이지 컴포넌트를 포함합니다.
    - program/: 프로그램 페이지 컴포넌트를 포함합니다.
   
  - services/: API 호출 등의 서비스 로직을 포함합니다.
  - utils/: 유틸리티 함수들을 포함합니다.
  - App.js: 메인 애플리케이션 컴포넌트입니다.
  - App.test.js: 메인 애플리케이션 컴포넌트의 테스트 파일입니다.
  - index.js: 애플리케이션 진입 파일입니다.
  - setupTests.js: 테스트 설정 파일입니다.

- .gitignore: Git에 포함되지 않을 파일들을 명시합니다.
- package.json: 프로젝트 메타데이터 및 의존성 목록을 포함합니다.
- README.md: 프로젝트 설명서 파일입니다.

# Recoil 설치
- npm i recoil

# date-fns 라이브러리 설치(날짜형식 변환)
- npm install date-fns

# MUI 설치
- npm install @mui/icons-material