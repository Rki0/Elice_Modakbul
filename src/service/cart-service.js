const {Cart} = require('../db/index');
const {User} = require('../db/index');
const mongoose = require('mongoose');

//장바구니 추가 
const postCart = async (userIdKey, cartAdd)=> {
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userIdKey){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
        };
        //추가하려는 물품의 이름, 가격, 회사, 구매수량을 추가합니다.
        const { imgURL, name, price, company, quantity } = cartAdd;

        //장바구니에 추가
        const newCart = new Cart ({
            imgURL,
            name,
            price,
            company,
            quantity,
            poster: userIdKey
        });
        //중복 추가 방지를 위해 확인합니다.
        const duplicateCart = await Cart.findOne({ imgURL, name, price, company, poster: userIdKey });
            if(duplicateCart){
                throw new Error ('이미 장바구니에 추가된 상품입니다.');
            };
        //장바구니에 저장합니다.
        await newCart.save();
        //장바구니에 제대로 저장이 되었는지 확인합니다.
        const checkCart = await Cart.find({ imgURL, name, price, company, poster: userIdKey });
            if(checkCart.length === 0){
                throw new Error ('현재 장바구니에 상품이 추가되지 않습니다.');
            };    
        //장바구니 document의 ObjectId를 User Schema의 cart 필드에 추가합니다.
            const insertCart = await User.findByIdAndUpdate(
                userIdKey,
                { $push: { cart: newCart._id } },
                { new: true }
            );
            //해당 유저의 장바구니 칸에도 상품 id 값이 제대로 저장 되었는지 확인합니다.
            const userCartCheck = await User.findById(userIdKey, { cart: newCart._id });
                if(!userCartCheck.cart.some(cartItem => cartItem.equals(newCart._id))){
                    //만약 Cart Collection에 추가된 상품이 유저의 Cart 필드에 추가가 안될 경우
                    //추후에 같은 상품을 주문할 때 중복 오류가 발생할 수 있으므로 장바구니 Document를 찾아
                    //지워줘야 합니다.
                    await Cart.findOneAndDelete({ _id: newCart._id })
                    throw new Error ('장바구니 추가 중 문제가 발생하였습니다.');
                };
            return insertCart.cart;
        } catch (err) {
            throw new Error (`${err.message}`);
        };
};


//장바구니 목록 띄우기(장바구니에 넣은 전체 상품을 표시합니다.)
const presentCart = async (userIdKey)=> {
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userIdKey){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
        };
        //해당 유저의 모든 장바구니 물품들의 내역을 표시합니다.
        const cartItems = await User.findById(userIdKey).populate('cart');
        //장바구니에 상품이 없다면 오류를 출력합니다.
        /*if (cartItems.cart.length === 0){
            throw new Error ('현재 장바구니에 상품이 없습니다.');
        };*/
        //장바구니에 담긴 상품들을 나열합니다.
        const arrangeCart = cartItems.cart;
        const cartItemData = arrangeCart.map((item)=> ({
            _id: item._id,
            imgURL : item.imgURL,
            name: item.name,
            price: item.price,
            company: item.company,
            quantity: item.quantity,
        }));
        /*if(cartItemData.length === 0){
            throw new Error ('장바구니에 상품이 출력 되지 않았습니다.')
        };*/
        return cartItemData;
    } catch (err) {
        throw new Error (`${err.message}`)
    };
};


//장바구니 목록 삭제
const removeCart = async (userIdKey, cartId)=> {
    //해당 부분은 실제로 프론트에서 어떠한 데이터 정보로 넘어오는지 확인 후
    //수정이 필요해 보입니다. 현재로써는 구현이 잘 됩니다.
    const modifyCartId = JSON.stringify(cartId)
    .substring(11)
    .slice(0,-2);
    const newCartId = mongoose.Types.ObjectId(modifyCartId)
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userIdKey){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
    };
        //해당 유저의 물품들의 내역을 표시합니다.
        const usersCart = await User.findById(userIdKey).populate('cart');
        //장바구니에 상품이 없다면 오류를 출력합니다.
        if (usersCart.cart.length === 0){
            throw new Error ('현재 장바구니에 상품이 없습니다.');
        };
        //유저의 장바구니 품목을 삭제합니다.
        await User.findByIdAndUpdate(
            userIdKey,
            { $pull: { cart: newCartId } },
            { new: true }
        );
        //장바구니의 품목이 삭제되었는지 확인합니다.
        const isThisCartDeleted = await User.find({ cart: newCartId });
        if(isThisCartDeleted.length !== 0) {
            throw new Error ('장바구니 상품이 삭제되지 않았습니다.')
        };
        //참조되고 있던 cart document도 같이 삭제합니다.
        await Cart.deleteOne({ _id: newCartId });
    } catch (err){
        throw new Error(`${err.message}`);
    }
};


//장바구니 목록 전체 삭제
const removeAllCart = async (userIdKey)=> {
    try{
        //맨 먼저 유저가 제대로 접속해 있는 상황인지 확인합니다.
        if(!userIdKey){
            throw new Error('먼저 로그인 상태를 확인해 주세요');
    }
        //해당 유저의 물품들의 내역을 표시합니다.
        const usersCart = await User.findById(userIdKey).populate('cart');
        //장바구니에 상품이 없다면 오류를 출력합니다.
        if (usersCart.cart.length === 0){
            throw new Error ('현재 장바구니에 상품이 없습니다.');
        }
        //장바구니에서 모든 상품을 삭제합니다.
        await User.findByIdAndUpdate(userIdKey, { $set: { cart: [] } });
        //만약 제대로 삭제되지 않았다면 오류를 출력합니다.
        const isUsersCartDeleted = await User.findById(userIdKey).populate('cart');
        if(isUsersCartDeleted.cart.length !== 0){
            throw new Error ('장바구니 상품이 삭제되지 않았습니다.')
        };
        //참조되고 있던 cart document도 전부 삭제합니다.
        /*const cartIds = usersCart.cart.map((item)=> item._id);
        await Cart.deleteMany({ _id: { $in: cartIds } });*/
        return;
    } catch (err) {
        throw new Error (`${err.message}`);
    }
};

const cartService = {
    postCart,
    presentCart,
    removeCart,
    removeAllCart
};

module.exports = cartService;
