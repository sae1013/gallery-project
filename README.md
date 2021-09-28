# 블로그형 게시판 ⭐️
<br>👨‍💻&nbsp;개인 프로젝트  

## 구현기술
프론트: 리액트(redux, redux-thunk, styled-component,materialUI)
백엔드: 파이어베이스( realtimeDB,&nbsp;firestore)

## 성과  
**자동 로그인 & 로그아웃** 

- 파이어베이스 인증, 인증key를 활용하여 보안강화
- 인증받은 key를 세션스토리지에 저장하여 자동 로그인 구현

**redux를 통한 상태관리**

- 로그인 정보, 포스트, 댓글, 실시간 알람, 데이터 요청상태를 전역으로 관리하였음
    - 로그인 정보: 페이지의 접근권한을 강화
    - 포스트, 댓글, 실시간 알람: 전역에 데이터가 존재할 경우 불필요한 api요청에 대비
    - 데이터 요청상태: 리렌더링시 발생할 수 있는 중복 api요청에 대비

**렌더링 개선**

- usecallback,usememo를 통한 메모리누수, 중복렌더링 방지
- Route에 코드 스플리팅(lazy-loading)을 적용하여 초기 렌더링속도 개선
- 무한 스크롤 도입, 불필요한 데이터요청을 방지함으로써 서버 과부하 방지 & 렌더링속도 향상

**반응형UI 적용**

- 태블릿 이하 버전, 데스크톱 버전에 따라 반응형UI 개선
- 반응형 hook 도입을 통해 화면크기에 따라 데이터 fetch갯수 최적화
  
**사용자경험 향상**
- 로딩스피너, 스켈레톤UI를 적용하여 UX향상
- 이미지 로드 시, 지연로딩을 통해 이미지 끊김문제 해결

## 배포
https://gallery-hosting.web.app/
  

## 테스트계정
id:admin@admin.com , pw:000000<br>
id:admin2@admin.com , pw:000000

## 동작
#### 비로그인시 메인화면
<br>
<p align="center">
<img width="550" alt="스크린샷 2021-09-24 오후 7 24 11" src="https://user-images.githubusercontent.com/63229394/134662096-6c5aaf29-0b91-4a70-be6f-4b361d636b9d.png">
<hr></p>

#### 로그인 화면
<br>
<p align="center">
<img width="550" alt="스크린샷 2021-09-24 오후 7 26 27" src="https://user-images.githubusercontent.com/63229394/134662121-58556ee3-0a30-46cd-ae81-a82d5bdb1356.png">
  </p>
<hr>

#### 회원가입 
<br>
<p align="center">
<img width="550" alt="스크린샷 2021-09-24 오후 7 26 42" src="https://user-images.githubusercontent.com/63229394/134662139-ca92508e-44db-4afb-80a5-42b9d29b4c14.png"></p>
<br>
회원가입/로그인 시, 입력한 데이터 혹은 계정의 유효성 검사를 제공합니다.
<hr>

#### 로그인 후 메인화면
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 27 20" src="https://user-images.githubusercontent.com/63229394/134662416-e724b941-952f-4976-bb47-8277f1224c88.png">
<hr></p>

#### 포스팅 화면 
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 59 21" src="https://user-images.githubusercontent.com/63229394/134664040-3d523d64-e691-43f7-aba9-f1e6987fae0e.png"></p>

<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 50 28" src="https://user-images.githubusercontent.com/63229394/134664044-4f12d48d-b87f-4250-985d-46e430799be0.png"></p>
게시글 작성 시, 이미지 미리보기 화면을 제공합니다. URL로 변경된 이미지를 보게됩니다.<br>
<hr>

#### 게시글 수정화면
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 27 45" src="https://user-images.githubusercontent.com/63229394/134663105-ac74aaa2-dc22-4d44-9798-ed0c2b5f9164.png"></p>

<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 50 28" src="https://user-images.githubusercontent.com/63229394/134663111-8db5ce57-e9c0-4459-83b0-299402f1443f.png"></p>
<hr>

#### 게시글, 댓글 보기화면
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-28 오후 9 36 07" src="https://user-images.githubusercontent.com/63229394/135088436-a97315dd-104e-4ed4-8bc3-16cad2351312.png"></p>

<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 8 01 02" src="https://user-images.githubusercontent.com/63229394/134664393-91718a39-e8aa-4202-a08a-d14413060eec.png"></p>

<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 8 01 10" src="https://user-images.githubusercontent.com/63229394/134664347-d1dbe23d-8696-48b2-90f7-cdd2aad46a5f.png"></p>
리스트를 보여주는 페이지는 데이터 로드시, 로딩스피너 대신 스켈레톤UI를 적용
<hr>


#### 실시간 알람 
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 29 43" src="https://user-images.githubusercontent.com/63229394/134663696-9f9f5942-05fa-4237-864f-6a269e9c3a3f.png"></p>

<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 29 54" src="https://user-images.githubusercontent.com/63229394/134664847-ec6fbdaa-49af-4714-a23b-94822b1cd736.png"></p>
다른사람의 게시글에 댓글을 단경우 상대방에게 알람이 가도록 하였습니다.<br>
알람이 도착하면, 상단에 빨간불이 들어옵니다.<br>
읽지않은 알람과 읽은 알람의 색을 구분하였습니다.
<hr>

#### 내 정보 변경화면
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 8 08 06" src="https://user-images.githubusercontent.com/63229394/134665063-cb393c4a-8a7d-4f7a-9b80-57089b33aecf.png"></p>
닉네임, 프로필사진을 변경할 수 있습니다.<br> 
<hr>

#### 404페이지
<br>
<p align="center"><img width="550" alt="스크린샷 2021-09-24 오후 7 30 45" src="https://user-images.githubusercontent.com/63229394/134662659-c9c0fb94-1b5b-402a-84fa-30b3fcea69a0.png"></p>
잘못된 경로, 이미 삭제된 포스팅에 대한 알람을 클릭한 경우 등 404페이지로 이동합니다.

