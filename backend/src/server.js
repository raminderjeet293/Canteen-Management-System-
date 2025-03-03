import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";
import userRouter from './routers/user.router.js';
import {dbconnect} from "../src/config/database.config.js";
import orderRouter from './routers/order.router.js'


console.log('MONGO_URI:',process.env.MONGO_URI); // Log the MongoDB URI
console.log('Attempting to connect to MongoDB...');

dbconnect();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);


app.use("/api/foods", foodRouter);

app.use("/api/users", userRouter);

app.use("/api/orders",orderRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});