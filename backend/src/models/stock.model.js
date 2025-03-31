import { model, Schema } from "mongoose";

const stockSchema = new Schema({
  name: String,
  category: String,
  quantity: Number,
});

const StockModel = model("Stock", stockSchema);

export default StockModel;
