## 모닥불 API 명세서

---

## API 명세서

### 유저 정보

| Method | URI                    | Description      |
| ------ | ---------------------- | ---------------- |
| POST   | /api/users/sign-up     | 회원가입         |
| POST   | /api/users/login       | 로그인           |
| POST   | /api/users/admin-login | 관리자) 로그인   |
| GET    | /api/users/:userId     | 사용자 정보 조회 |
| PUT    | /api/users/:userId     | 사용자 정보 수정 |
| DELETE | /api/users/:email      | 사용자 정보 삭제 |

### 상품 정보

| Method | URI                      | Description          |
| ------ | ------------------------ | -------------------- |
| GET    | /api/products            | 모든 상품 정보 조회  |
| GET    | /api/products/:name      | 특정 상품 조회       |
| POST   | /api/products/add        | 새로운 상품 등록     |
| PATCH  | /api/products/:productId | 특정 상품 정보 수정  |
| DELETE | /api/products/:name      | 특정 상품 정보 삭제  |
| GET    | /api/categories          | 전체 카테고리 조회   |
| GET    | /api/categories/:name    | 특정 카테고리 조회   |
| POST   | /api/categories/add      | 새로운 카테고리 등록 |
| PUT    | /api/categories/:name    | 특정 카테고리 수정   |
| DELETE | /api/categories/:name    | 특정 카테고리 삭제   |

### 장바구니 정보

| Method | URI                          | Description                  |
| ------ | ---------------------------- | ---------------------------- |
| POST   | /api/carts/new               | 장바구니 추가                |
| GET    | /api/carts/view              | 모든 장바구니 상품 조회      |
| DELETE | /api/carts/deleteOne/:cartId | 특정 장바구니 상품 개별 삭제 |
| DELETE | /api/carts/deleteAll         | 전체 장바구니 상품 삭제      |

### 주문 정보

| Method | URI                           | Description                 |
| ------ | ----------------------------- | --------------------------- |
| GET    | /api/orders/admin/:adminId    | 관리자)모든 주문 정보 조회  |
| GET    | /api/orders/order/:userId     | 모든 주문 정보 조회         |
| GET    | /api/orders/:orderNumber      | 비회원) 주문 정보 조회      |
| POST   | /api/orders                   | 주문 추가                   |
| POST   | /api/orders/nonmember         | 비회원) 주문 추가           |
| PATCH  | /api/orders/:orderId          | 특정 주문 정보 수정         |
| PATCH  | /api/orders/:adminId/:orderId | 관리자) 특정 주문 정보 수정 |
| DELETE | /api/orders/:orderId          | 주문 취소                   |
| DELETE | /api/orders/:adminId/:orderId | 관리자) 주문 취소           |
