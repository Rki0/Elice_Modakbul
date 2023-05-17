const express = require("express");
const config = require("./src/config");
const cors = require("cors");
const path = require("path");

const { cartRouter } = require("./src/routes/index");
const { productRouter } = require("./src/routes/index");
const { userRouter } = require("./src/routes/index");
const { categoryRouter } = require("./src/routes/index");
const { orderRouter } = require("./src/routes/index");

const mongoose = require("mongoose");

mongoose.connect(config.mongoDBUri);

mongoose.connection.on("connected", () => {
  console.log("MONGODB SERVER START!");
});

mongoose.connection.on("disconnected", (err) => {
  if (err) {
    console.log(`MongoDB 연결중 에러 발생: ` + err);
  }
  console.log("MongoDB disconnected");
  console.log("Bye");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //headers 값을 읽으려면 true로

// cors 방지
app.use(cors());

// 정적 파일 제공
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.get("/", (req, res) => {
  res.send("root page");
});

app.use("/api/categories", categoryRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(config.port, () => {
  console.log(`SERVER START 5000`);
});
