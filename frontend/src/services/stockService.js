import axios from "axios";

const API_URL = "/api/stocks";

// Get auth token from localStorage (Assuming you're storing it after login)
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`, // Ensure token is sent
    },
  };
};

// 📌 Fetch all stocks
export const getStocks = async () => {
  try {
    const { data } = await axios.get(API_URL, getAuthHeaders());
    return data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    throw error;
  }
};

// 📌 Add new stock (🔹 Include auth headers)
export const addStock = async (stock) => {
  try {
    const { data } = await axios.post(API_URL, stock, getAuthHeaders());
    return data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw error;
  }
};

// 📌 Update existing stock (🔹 Include auth headers)
export const updateStock = async (id, stock) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/${id}`,
      stock,
      getAuthHeaders()
    );
    return data;
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
};

// 📌 Delete stock (🔹 Include auth headers)
export const deleteStock = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  } catch (error) {
    console.error("Error deleting stock:", error);
    throw error;
  }
};
