> 24 INHA EV의 데이터 로깅 앱입니다. 차량의 컨트롤러 밑 차량에 부착된 모듈에서 오는 데이터값을 시각화하며 분석할 수 있습니다.
> 

https://github.com/nitepp04/24_icc_ev_client

https://github.com/nitepp04/24_icc_ev_server

# 24 INHA EV 데이터 로깅 앱

> ### 개발 스택
> 
> 
> ### JavaScript, Node.js, React, AWS DynamoDB, AWS EC2, Vercel, GitHub etc.
> 
> (무슨 역할인지만 아시면 돼요. 바로 실행하실 수 있도록 최대한 해놨습니다)
> 

> 사용법
> 
> 
> (Fork, clone 등의 용어 등은 밑에 따로 정리해두었습니다.)
> 
> 기본 설정
> 
> 1. AWS, GitHub 계정 생성 (관리 잘 하셔야 돼요. 안 그러면 비용 폭탄 맞아요)
> 2. GitHub에서 Fork (포크가 뭔지 설명 __ 링크 __ )
> 3. 프론트엔드 레포지토리 clone
> 4. 프론트엔드 깃허브 레포지토리 Vercel에 연동
> 
> 백엔드
> 
> 1. 백엔드 서버 구동 방법 두가지
>     1. 아마존 EC2에서 구동
>         1. AWS EC2 검색
>         2. 인스턴스 → 인스턴스 시작
>         3. Amazon Linux 또는 Ubuntu 선택
>             
>             ![image.png](attachment:07872886-bd80-4794-b461-7ed9bc5364ff:image.png)
>             
>         4. 인스턴스 유형 [t3.mini](http://t3.mini) 이상 추천 
>             1. t3.micro (프리티어 인스턴스 구동 시 인스턴스 사양 한계치 바로 넘어섬)
>             
>             ![image.png](attachment:f6e08520-34ef-418d-9a35-5bcd4d661575:image.png)
>             
>         5. 키페어 생성 후 선택 (키페어 잘 갖고 계세요)
>             
>             ![image.png](attachment:4160f0ad-79ce-43d5-931b-d4c3eb5fd91e:image.png)
>             
>         6. 인스턴스 생성
>         7. 생성된 인스턴스의 인스턴스 ID 클릭
>             
>             ![image.png](attachment:08b7378a-c05a-4c1a-97e2-976498443683:image.png)
>             
>         8. 상단의 연결 클릭 후 SSH 클라이언트
>             
>             ![image.png](attachment:a2b697d1-4294-486d-ab83-313097a51be2:image.png)
>             
>         9. 이 상태로 VS 코드 열기
>         10. Ctrl + Shift + ` 눌러 터미널 열기
>         11. VS코드에 EC2 SSH 연결하기
>             1. 키페어 우클릭 후 경로 복사
>             2. cd 키페어경로 - 키페어 이름)
>                 1. Ctrl + V 대신 우클릭 사용
>                 2. 이때 복사된 경로를 다음과 같은 형식으로 변경
>                     1. "C:\Users\sondh\.ssh\키페어.pem” → C:/Users/.ssh/sondh
>                 3. cd C:/Users/.ssh/sondh
>             3. chmod 400 키페어.pem
>             4. AWS EC2 인스턴스 연결 창으로 이동하여 하단의 예시 복사
>             5. Ctrl +Shift + p → Add New SSH Host…
>                 
>                 ![image.png](attachment:fccce8bf-aa9d-4cf3-9b4b-8ec2c8e833e5:image.png)
>                 
>             6. 붙여넣기 엔터
>             7. Ctrl + Shift + p → Open SSH Configuration File...
>             8. 아래를 읽고 변경
>                 1. Host 뒤에는 원하는 이름 아무거나 ex) happy
>                 2. HostName 뒤에는 인스턴스 ID 클릭했을 때 뜨는 인스턴스 요약 창에서 다음의 것들 중 원하는 것을 선택하여 입력.  순서대로 진행했다면 IPv4 DNS가 입력되어 있을 것임
>                 3. 퍼블릭 IPv4 주소
>                 4. 퍼블릭 IPv4 DNS
>                 5. User 뒤에는 그대로 두거나 자신이 선택한 os에 맞게 변경. ex) ubuntu 선택 시 ubuntu
>                 6. IdentityFile 뒤에는 키페어 주소
>                 7. 변경 완료 시 Ctrl + S 저장
>                     
>                     ![image.png](attachment:952b3618-f768-483c-a498-9ad9f9dc107a:image.png)
>                     
>             9. Ctrl + Shift + p → Connect to Host… → Linux
>             10. VS 코드 좌측 하단에 다음과 같이 표시되면 연결 성공
>                 
>                 ![image.png](attachment:b0c44768-1a58-444b-aded-a4b8defdb08a:image.png)
>                 
>         12. node.js 설치
>             1. 명령어 차례로 입력
>                 - sudo apt-get update
>                 sudo apt-get install -y build-essential
>                 sudo apt-get install curl
>                 curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash --
>                 sudo apt-get install -y nodejs
>                 - node -v로 설치 완료됐는지 체크 (버전이 뜨면 설치 완료)
>         13. ㅇㅇ
>         14. 
>         15. Ctrl + Shift + ` → mkdir 24_ev_server → git 
>         
>     2. 유기 포트포워딩을 통하여 서버컴 구축 후 구동 (사설 공유기 있다면 이 방법 추천)
>         1. 공유기 포트포워딩
>         2. 서버컴으로 쓸 컴퓨터에서 서버 구동
> 2. AWS DynamoDB 생성
> 3. 백엔드 코드에서 AWS DynamoDB 연동 (액세스키와 시크릿액세스키 잘 챙겨요)
> 4. 백엔드 코드

- git clone github주소
    - ex) git clone [h](https://github.com/nitepp04/24_icc_ev_client.git)ttps://어쩌고저쩌고
    
    ![image.png](attachment:b51612d8-e01c-49be-9561-1734224c1cb7:image.png)