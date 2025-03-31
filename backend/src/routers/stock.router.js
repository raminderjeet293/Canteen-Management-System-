import { Router } from "express";
import StockModel from "../models/stock.model.js";
import handler from "express-async-handler";
import admin from "../middleware/admin.mid.js";

const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const stocks = await StockModel.find({});
    res.send(stocks);
  })
);

router.post(
  "/",
  admin,
  handler(async (req, res) => {
    const { name, quantity } = req.body;
    const stock = new StockModel({ name, quantity });
    await stock.save();
    res.send(stock);
  })
);

router.put(
  "/:id",
  admin,
  handler(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await StockModel.updateOne({ _id: id }, { name, quantity });
    res.send({ message: "Stock updated successfully" });
  })
);

router.delete(
  "/:id",
  admin,
  handler(async (req, res) => {
    const { id } = req.params;
    await StockModel.deleteOne({ _id: id });
    res.send({ message: "Stock deleted successfully" });
  })
);

const generateStockResponse = (stock) => {
  return {
    id: stock.id,
    name: stock.name,
    quantity: stock.quantity,
    price: stock.price,
    category: stock.category,
    createdAt: stock.createdAt,
    updatedAt: stock.updatedAt,
  };
};

export default router;
