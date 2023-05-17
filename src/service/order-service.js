const {User} = require("../db/index");
const {Order} = require("../db/index");
const {Cart} = require("../db/index");

//주문 내역 확인
const findOrder = async(userId) => {

  const getUserOrders = await Order.find({customerId: userId}).populate("customerId", "-password").populate("cart");

  if (!getUserOrders) {
    throw new Error("주문 내역이 없습니다.");
  }

  return getUserOrders;
};

//관리자) 주문 내역 확인
const adminFindOrder = async() => {

  try {
    //password 외의 모든 user의 정보를 가져옴
    const getUserOrders = await Order.find({}).populate("customerId", "-password").populate("cart");

    if (!getUserOrders) {
      throw new Error("주문 내역이 없습니다.");
    }

    return getUserOrders;
  } catch(err) {
    throw err;
  }
  
};

const nonMemberFindOrder = async(orderNumber) => {

  try {
    const getUserOrders = await Order.findOne({orderNumber}).populate("cart");

    if (!getUserOrders || getUserOrders.length === 0) {
      throw new Error("주문 내역이 없습니다.");
    }

    return [getUserOrders];
  } catch(err) {
    throw err;
  }
  
};

//새로운 주문 추가
const addOrder = async(orderInfo) => {
  try {
    const {
      customerId,
      customerName, 
      customerEmail,
      customerPhoneNumber, 
      customerAddress, 
      cart, 
      orderStatus, 
      total
    } = orderInfo;
    const order = await User.findOne({_id: customerId}).lean();

    //주문번호 생성 함수 구현
    const createDateYYMMDD = () => {
      //
      const date = new Date();
      const year = String(date.getFullYear() - 2000);
      const month = String(date.getMonth() + 1).padStart(2, 0);
      const day = String(date.getDate()).padStart(2, 0);
      
      //랜덤 함수
      const randomNum = () => {
        const rdNum = String(Math.floor(Math.random() * 99999));
      
        if (rdNum.length < 5) {
          return rdNum.padStart(5, "0");
        }
        return rdNum;
      }

      return `${year}${month}${day}${randomNum()}`;
    };

      let arr = [];
      for (let i=0; i<cart.length; i++) {
        const cartData = await Cart.findOne({_id: cart[i]});
        arr.push(cartData);    
      }

    const newOrder = new Order ({
      customerId: order._id, //user의 ID를 받아옴
      customerName, 
      customerEmail,
      customerPhoneNumber,
      customerAddress,
      cart: arr,
      orderStatus,
      total,
      orderNumber: createDateYYMMDD(),
    });
    return await newOrder.save(); 
  } catch(err) {
    throw new Error(`주문이 실패하였습니다. ${err}`);
  }
};

const nonMemberAddOrder = async(orderInfo) => {
  try {
    const {
      customerName, 
      customerEmail, 
      customerPhoneNumber, 
      customerAddress, 
      orderStatus, 
      total
    } = orderInfo;

    //주문번호 생성 함수 구현
    const createDateYYMMDD = () => {
      //
      const date = new Date();
      const year = String(date.getFullYear() - 2000);
      const month = String(date.getMonth() + 1).padStart(2, 0);
      const day = String(date.getDate()).padStart(2, 0);
      
      //랜덤 함수
      const randomNum = () => {
        const rdNum = String(Math.floor(Math.random() * 99999));
      
        if (rdNum.length < 5) {
          return rdNum.padStart(5, "0");
        }
        return rdNum;
      }

      return `${year}${month}${day}${randomNum()}`;
    }

    const newOrder = new Order ({
      customerName,
      customerEmail,
      customerPhoneNumber,
      customerAddress,
      orderStatus,
      total,
      orderNumber: createDateYYMMDD(),
    });
    return await newOrder.save();
  } catch(err) {
    throw new Error(`주문이 실패하였습니다. ${err}`);
  }
};

//주문 수정
const updateOrder = async(orderId, orderInfo) => {
  try {
    const order = await Order.findOne({_id: orderId}).lean();

    if (!order) {
      throw new Error("주문 정보가 없습니다.");
    }

    return await Order.updateOne({_id: orderId}, orderInfo).lean();
  } catch(err) {
    throw err;
  }

};

//주문 취소
const deletedOrder = async(orderId) => {
  try {
    return await Order.deleteOne({_id:orderId}).lean();
  } catch(err) {
    throw err;
  }
};


const OrderService = {
  findOrder, 
  adminFindOrder, 
  nonMemberFindOrder,
  addOrder, 
  nonMemberAddOrder,
  updateOrder, 
  deletedOrder,
};

module.exports = OrderService;
