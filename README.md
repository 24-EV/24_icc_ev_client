# 24 INHA EV 데이터 로깅 앱 사용법  



### 완성도를 높이기 위하여 조금씩 수정 예정입니다. 업데이트 날짜 확인하여 이전의 코드, 방식과의 차이점 파악 후 진행해주세요.

### 깃허브 레포지토리 주소

클라이언트 : https://github.com/nitepp04/24_icc_ev_client

서버 : https://github.com/nitepp04/24_icc_ev_server

펌웨어 : https://github.com/nitepp04/24_icc_ev_firmware

## 주요 기능

- 차량의 컨트롤러 및 모듈에서 오는 데이터 값을 시각화
    - 현재 받는 데이터
        - timestamp
            - Real TIme Clock 모듈
            - 당시 RTC 모듈 고장으로 인하여 서버의 시간으로 대체함
            - 복구 원할 시 서버 코드 수정 필요
        - RPM
        - MOTOR_CURRENT
        - BATTERY_VOLTAGE
        - THROTTLE_SIGNAL
        - CONTROLLER_TEMPERATURE
        - SPEED
            - 클라이언트에선 velocity라는 키값으로 사용됨
        - BATTERY_PERCENT
        - lat, lng
            - GPS 모듈 고장
            - 클라이언트 코드에는 구현되어 있으나, 서버 코드에서 삭제함.
            - 복구 원할 시 서버 코드 수정 필요
- 차량 현재 위치 시각화
    - 카카오맵 API를 통하여 차량의 현재 위치를 시각화한다.
- Excel 데이터 다운로드
    - 원하는 시간대의 데이터를 DB에서 불러와 액셀 파일로 다운로드



## 용어 정리

- JavaScript : 프로그래밍 언어
- React : JavaScript 기반 UI 라이브러리
- Node.js : JavaScript 실행 환경
    - 브라우저에서만 실행 가능했던 JavaScript를 서버에서도 실행 가능하도록 해줌
- Express : Node.js의 프레임워크. Express 는 Node.js 위에서 동작하는 웹 프레임 워크
- AWS EC2 : 아마존에서 빌려주는 컴퓨터
- AWS DynamoDB : NoSQL 데이터베이스
    - 고정된 테이블 구조를 사용하지 않고, 다양한 데이터 구조를 저장할 수 있는 데이터 베이스.
    - JSON 형식 저장 가능
- JSON : 사람도 기계도 읽기 쉬운 경량 데이터 형식.
- Vercel : 프론트엔드 프로젝트 배포 클라우드 플랫폼으로, 깃허브와 연동하여 코드 푸시 때마다 자동 업데이트.
- Git : 버전 관리 시스템
- GitHub : Git을 온라인에서 저장하고 협업할 수 있는 플랫폼.
    - 코드를 수정할 때마다 git에 업데이트 하거나, 예전 코드로 다시 돌아갈 수 있고, 이를 github에 올려 온라인으로 저장하고 협업할 수 있습니다.
- 터미널 명령어(CLI) : 터미널에서 사용하는 명령어
    - 이제 등장할 cd, chmod, ls 등이 있다.

프로그램 개선을 원할 때, 어떠한 용어가 있는지 알면 도움이 될 거라 생각하여 검색하기 난감할 것 같은 용어들 몇개만 짧게 적어둡니다.



## 설치 및 실행 방법

### 기본 설정

1. AWS 계정 생성 : https://deoking.tistory.com/27
    1. aws.amazon.com/ko/
    2. 관리 잘 하셔야 돼요. 안 그러면 비용 폭탄 맞아요
2. GitHub 계정 생성
    1. github.com
3. VS 코드 설치 및 환경 설정
    1. Visual Studio Code 검색하여 인스톨
    2. 쭉쭉 넘기다가 추가 작업 선택에서 다음과 같이 체크 (권장)
        
        ![Image](https://github.com/user-attachments/assets/edc1ac56-6e15-4a5e-bb69-75ea12d84e3a)
        
    4. VS 코드를 열어 왼쪽 메뉴바의 Extension → Korean 검색하여 Korean Language Pack for Visual 인스톨
4. 프론트엔드, 백엔드 레포지토리 포크
    1. 현재 문서 상단에 기재되어 있는 프론트엔드, 백엔드의 깃허브 레포지토리 링크로 각각 접속 → 우측 상단의 Fork 버튼 클릭
        
        ![Image](https://github.com/user-attachments/assets/5d70b468-3c6c-47d6-ae72-d00f895edbbf)
        
    2. Owner : 자신 계정, Repository name : 원하는 대로
        
        ![Image](https://github.com/user-attachments/assets/764a0d09-5010-47f1-bfcc-c2e1e4bc7bda)
        
    3. 자신의 깃허브 레포지토리에 포크된 레포지토리가 잘 생성되었나 체크  

---

### 프론트엔드 (단순 배포)

1. Vercel 배포
    1.  [Vercel.com](http://Vercel.com) 가입 후 Add New Project
    2. Import Git Repository
    3. Continue with GitHub → Import Git Repository → 포크한 레포지토리 선택 → Import
        
        ![image](https://github.com/user-attachments/assets/6f613039-7a24-486c-a57a-930b10b3f3b3)

        
    5. 원하는 프로젝트 명 입력, Framework Preset → Create React App 선택 → Deploy
        
       ![image](https://github.com/user-attachments/assets/e1cb14b4-94b4-4885-a81f-2534003a732d)

        
    7. 배포 완료
        1. Domains의 주소들이 배포된 프론트엔드 주소임
        
        ![image](https://github.com/user-attachments/assets/b36e2046-ee4a-45bb-b8c9-1166da900471)

        
2. 카카오맵 API 키 발급
    1. 카카오맵 API 접속 : https://apis.map.kakao.com/ → 우측 상단 APP KEY 발급 → 로그인
    2. 상단 메뉴의 내 애플리케이션 → 애플리케이션 추가하기 → 앱 이름 원하는 거, 나머지 아무거나, → 정책 동의 후 저장
    3. 만들어진 앱 들어가서 왼쪽 메뉴바의 플랫폼 → 웹 플랫폼 등록 → 버셀 도메인 주소 붙여넣기 → 저장
        1. 로컬에서도 원한다면 엔터 눌러서 localhost:포트번호
    4. 왼쪽 메뉴바의 앱 권한 신청 → 앱 권한 → 카카오맵 권한 신청
        1. 신청 불필요 뜨면 넘어가기
    5. 왼쪽 메뉴바의 엡 키 → JavaScript 키 복사
3. 버셀 환경변수 설정
    1. 버셀에서 이전에 배포한 프로젝트로 들어와 상단의 Settings → Environment Variables → Key - Value 항목에 다음과 같이 입력
        
        ```nasm
        KEY | VALUE
        REACT_APP_KAKAO | 앱 키 입력
        REACT_APP_SERVER_URL | 서버 주소 입력
        ```
        
        ![image](https://github.com/user-attachments/assets/8c894b38-8b28-445d-9d9b-a32741dad5c3)

        
    3. KEY 값은 임의로 바꾸면 안 됨. 바꾸려면 코드를 수정해야 함.
    4. 정상 동작하는지 확인
