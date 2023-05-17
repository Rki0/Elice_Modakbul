// 회원가입, 회원 정보 수정 폼
export function userForm() {
  const field = `
  <div class="container">
  <div class="md-3">
  <label class="label form-label" for="emailInput">Email</label>
  <input class="input form-control" id="emailInput" type="text" />
  </div>
  <div class="field md-3">
  <label class="label form-label" for="passwdInput">Password</label>
  <input class="input form-control" id="passwdInput" type="password" />
  </div>
  <div class="field md-3 ">
  <label class="label form-label" for="passwdConfirmInput">verify password</label>
  <input class="input form-control" id="passwdConfirmInput" type="password" />
  </div>
  <div class="field md-3">
  <label class="label form-label" for="nameInput">Name</label>
  <input class="input form-control" id="nameInput" type="text" />
  </div>
  <div class="field md-3">
  <label class="label form-label" for="phoneNumInput">Phone Number</label>
  <input class="input form-control" id="phoneNumInput" type="text" />
  </div>
  <div class="field md-3">
  <label>Adress</label>
  <div class="address">
  <div class="row ustify-content-center">
  <div class="col-4">
  <input
    type="text"
    class="input form-control "
    id="postNumber"
    placeholder="Zip code"
    readonly
  />
  </div>
  <div class="col-4">
  <input
    type="button"
    id="findAddressBtn"
    value="주소검색"
    class="findAddressBtn btn btn-outline-dark"
  />
  </div>
  </div>
  </div>
  </div>
  <div class="field">
  <input
  type="text"
  class="input form-control"
  id="addInput1"
  placeholder="Adress"
  readonly
  />
  </div>
  <div class="field">
  <input
  type="text"
  class="input form-control "
  id="addInput2"
  placeholder="Adress detail"
  />
  </div>

  <div class="text-center"><button id="signInBtn" class="btn btn-dark mt-3" type="submit">Sign In</div>
`;

  return field;
}
