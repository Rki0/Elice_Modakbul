const {productService} = require('../service/index');
const { Product } = require("../db/index");
const utils = require('../misc/utils');

const createProduct = async(req, res, next) => {
  try {
    const productInfo = req.body;
    const imagePath = req.file.path.replace(/\\/g, "/");

    const product = await productService.addProduct(productInfo, imagePath);

    res.status(200).json(utils.buildResponse(product));

  } catch(err) {
    next(err);
  }
};

const findAllProduct = async (req, res) => {
    try {
        const products = await productService.findAll();
        res.status(200).json(utils.buildResponse(products));
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
};

const findOneProduct = async(req, res) => {
    const name = req.params.name;

    try {
        const product = await productService.findProductByName(name);

        res.status(200).json(utils.buildResponse(product));
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const productInfo = req.body;
  const product = await Product.findOne({_id: productId});
  let imagePath = req.file && req.file.path; // req.file이 존재하면 req.file.path, 아니면 undefined
  
  try {
    if (!imagePath) {
      const updatedProduct = await productService.updateProduct(productId, productInfo, imagePath = product.imgPath || '');

      if (!updatedProduct) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
      }

      res.status(200).json(utils.buildResponse(updatedProduct));
    } else {
      const updatedProduct = await productService.updateProduct(productId, productInfo, imagePath);

      if (!updatedProduct) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
      }

      res.status(200).json(utils.buildResponse(updatedProduct));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: '서버 에러' });
  }
};




const deleteProduct = async (req, res) => {
    const name = req.params.name;
  
    try {
      const product = await productService.deleteProduct(name);
  
      res.status(200).json(utils.buildResponse(product));
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `서버 에러`});
    } 
  };

const productController = {
    createProduct,
    findAllProduct,
    findOneProduct,
    updateProduct,
    deleteProduct
};

module.exports = productController;