import axios from "axios";

export const createOrder = async (order) => {
  try {
    console.log("Creating order:", order);
    const user = localStorage.getItem("user");
    const token = user && JSON.parse(user).token;
    const { data } = await axios.post("/api/orders/create", order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};

export const getNewOrderForCurrentUser = async () => {
  const user = localStorage.getItem("user");
  const token = user && JSON.parse(user).token;
  const { data } = await axios.get("/api/orders/newOrderForCurrentUser", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// export const getAll = async () => {
//   const user = localStorage.getItem("user");
//   const token = user && JSON.parse(user).token;

//   const { data } = await axios.get(`/api/orders/`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return data;
// };


export const getAll = async (state) => {
  const user = localStorage.getItem("user");
  const token = user && JSON.parse(user).token;

  const { data } = await axios.get(`/api/orders${state ? `?status=${state}` : ""}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return state ? data.filter((order) => order.status === state) : data;

};


export const getAllStatus = async () => {
  const user = localStorage.getItem("user");
  const token = user && JSON.parse(user).token;

  const { data } = await axios.get(`/api/orders/allstatus`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
