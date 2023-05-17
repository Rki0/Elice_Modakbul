const {Product} = require("../db/index");
const {Category} = require("../db/index");



// 상품 추가
const addProduct = async (productInfo, imagePath) => {
  try{
    const {name, price, category, description, summary, company, stock} = productInfo;
    const categoryName = await Category.findOne({name: category});
  
    // 상품 이름 중복 체크 
    const nameDuplicate = await Product.findOne({ name });

    if (nameDuplicate) {
      throw new Error("이미 등록된 상품입니다.");
    }

    // 상품 정보 생성
    const newProduct = new Product ({
      name,
      price,
      category: categoryName._id,
      description,
      summary,
      company,
      stock,
      imgPath: imagePath,
    });

    // 상품 정보 저장
    const savedProduct = await newProduct.save();
    
    return savedProduct;
  } catch(err) {
    throw err;
  }
};


// 모든 상품 정보 조회
const findAll = async () => {
    try {
        
        const products = await Product.find({}).populate('category');
        
        let data;

        data = products.map((product) => {
          return {
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            description: product.description,
            summary: product.summary,
            company: product.company,
            stock: product.stock,
            imgPath: product.imgPath,
          };
        
        })
        return data;
    }
    catch (err) {
        throw new Error(`상품 조회에 실패했습니다. ${err.message}`);
    }
};

// 특정 상품 조회
const findProductByName = async (name) => {
    try {
        
        const product = await Product.findOne({name}).populate('category');

        if(!product) {
            throw new Error(`존재하지 않는 상품입니다.`);
        }
        
          const data = {
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            description: product.description,
            summary: product.summary,
            company: product.company,
            stock: product.stock,
            imgPath: product.imgPath,
          };
        
        

        return data;

    } catch (err) {
        throw new Error(`상품 조회 실패: ${err.message}`);
    }
};

// 특정 상품정보 수정
// productId = db에서 제공하는 ObjectId 
// 몽고db에서 제공하는 findByIdAndUpdate 메서드를 사용, 첫번째 인자 = ObjectId, 
const updateProduct = async (productId, productInfo, imagePath) => {
  try {
      const product = await Product.findOne({_id: productId});

      if (!product) {
        throw new Error("상품 정보가 없습니다.");
      }
  

      if (imagePath) {
        return await Product
        .updateOne({_id: productId}, productInfo)
        .updateOne({_id: productId}, {imgPath: imagePath});
      }

      return await Product.updateOne({_id: productId}, productInfo, imagePath);
  } catch (err) {
      throw new Error(`상품 수정 실패: ${err.message}`);
  }
};

//특정 상품정보 삭제
const deleteProduct = async (name) => {
    try {
        // Buffer.from 메서드를 사용하여 name매개변수를 UTF-8 인코딩 버퍼로 인코딩 즉, 한글을 삭제하려면 인코딩해줘야함
        const encodedName = Buffer.from(name,'utf-8');
        const product = await Product.deleteOne({name: encodedName});

        if(!product) {
            throw new Error(`삭제할 상품이 없습니다.`);
        }

        return product;
    } catch (err) {
        throw new Error(`상품 삭제 실패: ${err.message}`);
    }
}

module.exports = {addProduct, findAll, updateProduct, findProductByName, deleteProduct};
