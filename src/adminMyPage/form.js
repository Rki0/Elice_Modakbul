export function productForm() {
    const field =
`<div class="container">
<div class="addproduct-form-container">
    <form id="productForm" enctype="multipart/form-data">
        <div>
            <div class="mb-3">
                <label for="nameInput" class="form-label">Product Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="nameInput"
                    name="name"
                    placeholder="상품명 입력"
                    required
                    >
            </div>
        </div>
        <div>
            <div class="mb-3">
                <label for="priceInput" class="form-label">Product Pcice</label>
                <input
                    type="number"
                    class="form-control"
                    id="priceInput"
                    name="price"
                    placeholder="상품가격 입력"
                    required
                    >
            </div>
        </div>
        <div>
            <div class="mb-3">
                <label for="summaryInput" class="form-label">Product Summary</label>
                <input
                    type="text"
                    class="form-control"
                    id="summaryInput"
                    name="summary"
                    placeholder="상품소개 작성"
                    required
                    >
            </div>
        </div>
        <div>
            <div class="mb-3">
                <label for="companyInput" class="form-label">Company</label>
                <input
                    type="text"
                    class="form-control"
                    id="companyInput"
                    name="company"
                    placeholder="상품 제조회사"
                    required
                    >
            </div>
        </div>
        <div>
        <div class="mb-3">
            <label for="categoryInput" class="form-label">Category</label>
            <input
                type="text"
                class="form-control"
                id="categoryInput"
                name="category"
                disabled readonly
                required
                >
            </div>
        </div>
        <div>
            <div class="mb-3">
                <label for="stockInput" class="form-label">Product Stock</label>
                <input
                    type="number"
                    class="form-control"
                    id="stockInput"
                    name="stock"
                    placeholder="재고입력"
                    required
                    >
            </div>
        </div>

        <div>
            <div class="mb-3">
                <!-- <form> -->
                    <label>
                        <div><img src="https://cdn.icon-icons.com/icons2/2248/PNG/512/file_upload_icon_136628.png" class="image-box" /></div>
                    </label>

                    <div class="input-group fileInput">
                        <input
                            type="file"
                            class="form-control"
                            id="file"
                            name="imgPath"
                            aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload"
                            >
                        <button class="btn btn-outline-secondary" type="submt" id="fileUploadBtn">이미지 등록</button>
                    </div>
                <!-- </form> -->
            </div>
        </div>

        <div>
            <div class="mb-3">
                <label for="descriptionInput" class="form-label">Product Description</label>
                <input
                    type="text"
                    class="form-control"
                    id="descriptionInput"
                    name="description"
                    placeholder="상품상세 입력"
                    required
                    >
            </div>
        </div>

            <div class="d-flex  justify-content-center">
                <button id="saveProductBtn" type="submit" class="btn btn-dark ms-2">Save</button>
                <button id="cancelBtn" type="button"  class="btn btn-outline-danger ms-2">Cancle</button>
            </div>
    </form>
</div>
</div>
`;
  
    return field;
  }