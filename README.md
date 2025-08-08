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

   3. VS 코드를 열어 왼쪽 메뉴바의 Extension → Korean 검색하여 Korean Language Pack for Visual 인스톨

4. 프론트엔드, 백엔드 레포지토리

   1. 현재 문서 상단에 기재되어 있는 프론트엔드, 백엔드의 깃허브 레포지토리 링크로 각각 접속

      ![Image](https://github.com/user-attachments/assets/5d70b468-3c6c-47d6-ae72-d00f895edbbf)

5. 카카오맵 API 키 발급
   1. 카카오맵 API 접속 : https://apis.map.kakao.com/ → 우측 상단 APP KEY 발급 → 로그인
   2. 상단 메뉴의 내 애플리케이션 → 애플리케이션 추가하기 → 앱 이름 원하는 거, 나머지 아무거나, → 정책 동의 후 저장
   3. 만들어진 앱 들어가서 왼쪽 메뉴바의 플랫폼 → 웹 플랫폼 등록 → 버셀 도메인 주소 붙여넣기 → 저장
      1. 로컬에서도 원한다면 엔터 눌러서 localhost:포트번호
   4. 왼쪽 메뉴바의 앱 권한 신청 → 앱 권한 → 카카오맵 권한 신청
      1. 신청 불필요 뜨면 넘어가기
   5. 왼쪽 메뉴바의 엡 키 → JavaScript 키 복사

---

### 프론트엔드 (단순 배포)

1. Vercel 배포

   1. [Vercel.com](http://Vercel.com) 가입 후 Add New Project
   2. Import Git Repository
   3. Continue with GitHub → Import Git Repository → 포크한 레포지토리 선택 → Import

      ![image](https://github.com/user-attachments/assets/6f613039-7a24-486c-a57a-930b10b3f3b3)

   4. 원하는 프로젝트 명 입력, Framework Preset → Create React App 선택 → Deploy
      ![image](https://github.com/user-attachments/assets/e1cb14b4-94b4-4885-a81f-2534003a732d)
   5. 배포 완료

      1. Domains의 주소들이 배포된 프론트엔드 주소임

      ![image](https://github.com/user-attachments/assets/b36e2046-ee4a-45bb-b8c9-1166da900471)

2. 버셀 환경변수 설정

   1. 버셀에서 이전에 배포한 프로젝트로 들어와 상단의 Settings → Environment Variables → Key - Value 항목에 다음과 같이 입력

      ```nasm
      KEY | VALUE
      REACT_APP_KAKAO | 앱 키 입력
      REACT_APP_SERVER_URL | 서버 주소 입력
      ```

      ![image](https://github.com/user-attachments/assets/8c894b38-8b28-445d-9d9b-a32741dad5c3)

   2. KEY 값은 임의로 바꾸면 안 됨. 바꾸려면 코드를 수정해야 함.
   3. 정상 동작하는지 확인

---

### 프론트엔드 (포트포워딩)

1. git 설치 https://sfida.tistory.com/46
2. node.js 설치 [https://velog.io/@ljs923/Node.js-다운로드-및-설치하기https://velog.io/@ljs923/Node.js-다운로드-및-설치하기](https://velog.io/@ljs923/Node.js-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0)
3. 터미널 창 열기

   1. 터미널 창 열기
      1. terminal이라고 컴퓨터에 검색 후 뜨는 명령 프롬프트 열기
      2. 검은 바탕에 커서 깜빡거리는 프로그램입니다.
   2. 컴퓨터에 자신이 원하는 디렉토리에 폴더 생성 후 경로 복사
      1. 원하는 디렉토리(바탕화면 etc.) "icc_motor" 라는 폴더 만든 후 우클릭하여 경로로 복사
   3. 이때 복사된 경로를 다음과 같이 변경
      1. "C:\Users\sondh\.ssh" → C:/Users/sondh/.ssh
      2. 쌍따옴표를 지우고 역슬래시를 슬래시로 바꾸기
   4. 변경된 경로를 복사하여 cd 변경된경로
      1. ex) cd C:/Users/sondh/.ssh
   5. 아래의 명령어를 입력하여 프로젝트 클론

      ```nasm
      git clone 레포지토리
      ```

      1. 레포지토리 → 초록색 code 버튼 눌러 바로 뜨는 주소 복사하시면 됩니다. (HTTPS 탭 주소 복사)

   6. VS 코드를 열어 왼쪽 상단의 File → Open Folder → 클론한 프로젝트 폴더 찾아 선택
   7. .env 파일 생성

      1. 이때 생성되는 디렉토리는 프로젝트의 가장 최상위 디렉토리여야 한다.
      2. 때문에 저 폴더들이 나열된 화면의 빈 공간을 클릭하여 어떠한 항목도 선택되지 않게 한 후에 우클릭 → New File → .env 입력. (env파일 내의 변수들은 업데이트에 따라 변할 수 있습니다. config 디렉토리에 있는 envConfig.js 내부의 코드를 참고하여 주세요)

         ```cpp
         VITE_KAKAO_MAP_API_KEY=여기에_카카오맵_키_입력
         VITE_SERVER_URL=http://localhost:2004
         VITE_CONTROLLER_VERSION=25
         ```

      3. 가장 왼쪽 메뉴들의 모양과 개수는 저와 달라도 상관 없습니다

      ![Image](https://github.com/user-attachments/assets/860b1cf1-23bc-47e1-a51b-6e4af0a2bbe4)

4. 의존성 설치
   1. VS 코드에서 클론한 프로젝트를 연 후, Ctrl + Shift + ` 를 눌러 터미널 열기
   2. npm install 입력하여 의존성 설치
5. 로컬에서 서버 실행해보기

   1. npm run dev 입력하여 서버 실행

      ![Image](https://github.com/user-attachments/assets/81622968-3803-45e3-befc-718125634e80)

   2. vite.config.js 에 입력된 포트 번호 확인 후 브라우저 주소창에 [localhost:](http://localhost:2004)1101 또는 내부.아이피.주.소:1101입력 시 아래 화면이 뜬다면 로컬 환경에서 서버 구동 성공

      ![Image](https://github.com/user-attachments/assets/1bb7718d-dba1-4871-8e14-45b8215dce69)

      ![Image](https://github.com/user-attachments/assets/a41baf33-4d34-43e5-b56d-ffd331938e9e)

      1. 클론한 서버 코드에 기재된 포트 번호는 1101. 변경하여도 무방함.
      2. 내부 IP 주소는 6. 공유기 포트포워딩 → ipconfig 부분에서 IPv4 주소
      3. 왼쪽 - 오른쪽 / 서버 ON - 서버 OFF

6. 공유기 포트포워딩

   1. 터미널 창 열기 → ipconfig → 기본 게이트웨이 값 복사 → 브라우저 주소창에 입력 → 공유기 회사마다 정해진 아이디 비밀번호가 있음. 이를 검색하여 찾아 입력 후 로그인

      1. SK 공유기 포트포워딩 이런 식으로 검색하면 됨
      2. 나빌레관 115호 ICC 동방의 경우 시설 관리팀에 문의하여 받아와야 하는 걸로 알아요

      ![Image](https://github.com/user-attachments/assets/a0d0365b-6662-421f-94ba-925056fc1d74)

   2. 포트 포워드 또는 포트 포워딩 항목 찾기
      1. 외부 접속 포트 설정
         1. 0~65535 원하는 포트 번호 입력. 주로 3000or8080등의 포트가 쓰임.
      2. ex) 1101 / 1101 → 1101 포트만 포트 포워딩, 1101 / 1103 → 1101 ~ 1103 의 포트 포트 포워딩
      3. 내부 접속 포트 설정
         1. 서버 포트 주소는 현재 2004로 설정되어 있다. 원하는 포트 번호로 바꿔도 무방하다.
      4. 내부 IP 설정
         1. ipconfig → IPv4 주소 입력
      - 간단하게 설명
        - [naver.com](http://naver.com), [google.com](http://google.com) 등의 DNS 주소는 Public IP를 입력하기 쉬운 문자열로 바꾼 것. 실제로는 111.1.1.1:1234 의 외부.아이피.주.소:외부포트 의 구조로 되어 있음.
        - 그리고 이는 해당 프로그램이 구동되고 있는 내부 IP:내부포트 로 연결되어 있음.
        - 예를 들어 내 퍼블릭 아이피 주소가 111.1.1.1이고, 외부 포트 3000 ~ 3003, 내부 포트 2004로 설정 후 포트포워딩을 하였다.
        - 이때 내 컴퓨터에서 내가 2004번 포트에 어떤 프로그램을 실행시킬 때, 누구든지 111.1.1.1:3000~3003을 입력하여 내 프로그램에 접속할 수 있다.
          ![Image](https://github.com/user-attachments/assets/5039558a-a995-4529-b18b-fabf5f00067a)
   3. 완료되었다면 자신의 외부 아이피 주소:외부포트 를 입력하여 로컬에서 실행한 환경과 같은 화면이 뜨는지 확인해보자.

7. 서버와의 연결은 원활한지 등의 테스트 진행해보면 좋습니다.

   1. 서버 주소가 정해졌다면 .env파일의 VITE_SERVER_URL=서버주소 로 교체
      -  (AWS EC2 or 포트포워딩으로 도메인 or 퍼블릭 IP:포트. 도메인 : naver.com 같은 주소 / 퍼블릭 IP : 111.xxx.xxx.xxx 등의 IP. 가장 앞이 10, 172, 16이 아닌 모든 IP)
      - VITE_SERVER_URL=http://test.com/ 또는 VITE_SERVER_URL=http://123.123.123.123:2004
   2. package.json 파일 -> Ctrl + F로 "scripts" 찾기.
   3. "dev" : 어쩌고저쩌고를 통째로