import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  getStocks,
  addStock,
  updateStock,
  deleteStock,
} from "../../services/stockService";
import styles from "./stockPage.module.css";

const StockPage = () => {
  const [stocks, setStocks] = useState([]);
  const [stockData, setStockData] = useState({ name: "", quantity: 0 });
  const [editingStockId, setEditingStockId] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await getStocks();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const handleChange = (e) => {
    setStockData({ ...stockData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStockId) {
        await updateStock(editingStockId, stockData);
        setEditingStockId(null);
      } else {
        await addStock(stockData);
      }
      setStockData({ name: "", quantity: 0 });
      fetchStocks();
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  const handleEdit = (stock) => {
    setStockData(stock);
    setEditingStockId(stock._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStock(id);
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const stockLabels = stocks.map((item) => item.name);
  const stockQuantities = stocks.map((item) => item.quantity);

  const barData = {
    labels: stockLabels,
    datasets: [
      {
        label: "Stock Quantity",
        data: stockQuantities,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#AB47BC",
          "#EC407A",
        ],
      },
    ],
  };

  const pieData = {
    labels: stockLabels,
    datasets: [
      {
        data: stockQuantities,
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#AB47BC",
          "#EC407A",
        ],
      },
    ],
  };

  return (
    <div className={styles["stock-container"]}>
      <h1 className={styles["stock-header"]}>Stock Inventory</h1>

      <form onSubmit={handleSubmit} className={styles["stock-form"]}>
        <input
          type="text"
          name="name"
          value={stockData.name}
          onChange={handleChange}
          placeholder="Stock Name"
          required
        />
        <input
          type="number"
          name="quantity"
          value={stockData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button type="submit">
          {editingStockId ? "Update Stock" : "Add Stock"}
        </button>
      </form>

      <table className={styles["stock-table"]}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td
                className={
                  item.quantity < 10
                    ? styles["stock-status"]["low"]
                    : styles["stock-status"]["in-stock"]
                }
              >
                {item.quantity < 10 ? "Low Stock" : "In Stock"}
              </td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["stock-charts"]}>
        <div className={styles["chart-box"]}>
          <h2 className={styles["chart-title"]}>
            Stock Distribution (Bar Chart)
          </h2>
          <Bar data={barData} />
        </div>
        <div className={styles["chart-box"]}>
          <h2 className={styles["chart-title"]}>
            Stock Distribution (Pie Chart)
          </h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default StockPage;
