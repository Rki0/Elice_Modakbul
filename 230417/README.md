## **🗓️ 4/17(월) 회의록**

# 😳 프론트엔드

> 1. 페이지 접근 권한 관련 논의 필요

---

# 😳 백엔드

> 바로가기
>
> - [API 구분 및 method 결정](#😤-api-구분-및-method-결정)
> - [DB 스키마 결정](#😤-db-스키마-결정)

## 😤 API 구분 및 method 결정

### 🤔 user (사용자 관련 기능)

| 내용             | method      | 비고                                                                                           |
| ---------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| 회원가입         | POST        | 1. 이메일, 이름, 비밀번호(해쉬 문자), 주소</br>2. 관리자, 일반 회원 구분 가능한 key-value 생성 |
| 로그인           | POST        | 1. 관리자, 일반 회원 구분해서 JWT 생성해주기                                                   |
| 로그아웃         | GET or POST | -                                                                                              |
| 사용자 정보 조회 | GET         | -                                                                                              |
| 사용자 정보 수정 | PATCH       | -                                                                                              |
| 사용자 정보 삭제 | DELETE      | -                                                                                              |
| 관리자 기능      | -           | 회원가입, 로그인에 묶어서 처리                                                                 |

### 🤔 product (상품 관련 기능)

| 내용          | method | 비고                                                                                                                                                           |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 카테고리 조회 | GET    | -                                                                                                                                                              |
| 카테고리 추가 | POST   | 1. 어떤 카테고리인지 결정 후 추가</br>2. 이름, 가격, 설명, 제조사, 카테고리</br>3. [nanoid](https://www.npmjs.com/package/nanoid)를 사용하여 상품 고유 id 생성 |
| 카테고리 수정 | PATCH  | -                                                                                                                                                              |
| 카테고리 삭제 | DELTE  | -                                                                                                                                                              |
| 상품 추가     | POST   | -                                                                                                                                                              |
| 상품 수정     | PATCH  | -                                                                                                                                                              |
| 상품 삭제     | DELETE | -                                                                                                                                                              |
| 상품 정보     | -      | 카테고리 추가와 묶어서 처리                                                                                                                                    |
| 상품 목록     | GET    | -                                                                                                                                                              |
| 상품 상세     | GET    | -                                                                                                                                                              |

### 🤔 cart (장바구니 관련 기능)

> 1. 프론트팀에서 어떤 storage 사용할지 정한 뒤 진행
> 2. 로그인/비로그인 유저의 장바구니 데이터 관리 방법을 다르게 가져간다 => API/브라우저 저장소

| 내용               | method | 비고                                       |
| ------------------ | ------ | ------------------------------------------ |
| 장바구니 추가      | POST   | -                                          |
| 장바구니 수정      | PATCH  | -                                          |
| 장바구니 전체 삭제 | DELETE | 비회원은 프론트쪽에서, 회원은 백엔드쪽에서 |
| 장바구니 부분 삭제 | DELETE | 비회원은 프론트쪽에서, 회원은 백엔드쪽에서 |
| 장바구니 조회      | GET    | -                                          |
| 장바구니 가격 조회 | -      | 프론트에서 처리                            |

### 🤔 order (주문 관련 기능)

| 내용               | method | 비고                                                                                                                                           |
| ------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 주문 추가          | POST   | 1. 배송지 정보, 주문 총액, 수령자 이름 및 연락처, 배송 상태</br>2. [nanoid](https://www.npmjs.com/package/nanoid)를 사용하여 주문 고유 id 생성 |
| 주문 수정 - 관리자 | PATCH  | -                                                                                                                                              |
| 주문 수정 - 사용자 | PATCH  | -                                                                                                                                              |
| 주문 완료          | -      | 프론트에서 처리. 배송지, 주문 번호, 제품까지 보여주는 걸로                                                                                     |
| 주문 조회 - 관리자 | GET    | -                                                                                                                                              |
| 주문 조회 - 사용자 | GET    | 같은 컬렉션 사용. filter로 구분해서 전송                                                                                                       |
| 주문 취소 - 관리자 | DELETE | -                                                                                                                                              |
| 주문 취소 - 사용자 | DELETE | -                                                                                                                                              |

## 😤 DB 스키마 결정

### 🤔 user-schema

| 내용                | key         | type   | required | unique |
| ------------------- | ----------- | ------ | -------- | ------ |
| 이메일              | email       | String | true     | true   |
| 이름                | fullName    | String | true     | false  |
| 비밀번호(해쉬 문자) | password    | String | true     | false  |
| 휴대폰 번호         | phoneNumber | String | true     | false  |
| 주소                | address     | String | required | false  |
| 관리자/일반 회원    | role        | String | false    | false  |
| 카트                | cart        | Array  | false    | false  |

### 🤔 product_schema

| 내용     | key         | type   | required | unique |
| -------- | ----------- | ------ | -------- | ------ |
| 이름     | name        | String | true     | true   |
| 가격     | price       | Number | true     | false  |
| 카테고리 | category    | String | true     | false  |
| 설명     | description | String | true     | false  |
| 요약     | summary     | String | true     | false  |
| 제조사   | company     | String | true     | false  |
| 재고     | stock       | Number | true     | false  |

### 🤔 cart_schema

> 1. 로그인 했을 때는 백엔드 API, 비로그인은 프론트 storage

| 내용 | key    | type   | required | unique |
| ---- | ------ | ------ | -------- | ------ |
| 수량 | number | Number | true     | false  |

### 🤔 order_schema

> 1. 유저의 주문 정보를 배열에 넣는다
> 2. 총액은 프론트에서 계산해서 보내주는 걸로
> 3. 배송 상태 = "배송 준비 중", "배송 중", "배송 완료"
> 4. 주문 수정은 "배송 준비 중" 일 때만 가능하다.
> 5. 비회원 주문 수정은 이름, 휴대폰 번호 입력 후 가능.
> 6. 주문 조회 = 비회원 주문 조회(휴대폰, 이름)/회원 주문 조회(이메일) 나눠서 하자.
> 7. "배송 중"으로 변경 시, product 모델에서 재고 조정.

| 내용        | key         | type   | required | unique | 비고                     |
| ----------- | ----------- | ------ | -------- | ------ | ------------------------ |
| 이메일      | email       | String | false    | false  | 비회원/회원 구분         |
| 이름        | fullName    | String | ture     | false  | -                        |
| 휴대폰 번호 | phoneNumber | String | true     | false  | -                        |
| 주소        | address     | String | true     | false  | -                        |
| 카트        | cart        | Array  | true     | false  | 주문 정보 모두 담고 있음 |
| 배송 상태   | status      | String | true     | false  | -                        |
| 총액        | total       | Number | true     | false  | -                        |

Copyright © 2023. Rki0(Pak-Kiyoung). All rights reserved.
