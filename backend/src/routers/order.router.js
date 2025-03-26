import { Router } from "express";
import handler from "express-async-handler";
import auth from "../middleware/auth.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

import { UserModel } from "../models/user.model.js";

const router = Router();
router.use(auth);

router.post(
  "/create",
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(BAD_REQUEST).send("Cart Is Empty!");

    //  await OrderModel.deleteOne({
    //   user: req.user.id,
    //   status: OrderStatus.NEW,
    // });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder); // sent to client side
  })
);

router.get(
  "/newOrderForCurrentUser",
  handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);
    console.log("New Order:", order);
    if (order) res.send(order);
    else res.status(BAD_REQUEST).send("No New Order Found");
  })
);
router.get("/allstatus", (req, res) => {
  try {
    const allStatus = Object.values(OrderStatus);
    res.send(allStatus);
  } catch (error) {
    console.error("Error fetching order statuses:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/",
  handler(async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) return res.status(404).send("User not found");

      const filter = {};
      if (!user.isAdmin) filter.user = user._id;

      const orders = await OrderModel.find(filter).sort("-createdAt");
      res.send(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send("Internal Server Error");
    }
  })
);

const getNewOrderForCurrentUser = async (req) =>
  await OrderModel.findOne({
    user: req.user.id,
    status: OrderStatus.NEW,
  });

export default router;
