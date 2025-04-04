import axios from "axios";
import { data } from "react-router-dom";

export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

// export const login = async (email, password) => {
//   const { data } = await axios.post("api/users/login", { email, password });
//   localStorage.setItem("user", JSON.stringify(data));
//   return data;
// };

export const login = async (email, password) => {
  const { data } = await axios.post("api/users/login", { email, password });

  // Store full user data
  localStorage.setItem("user", JSON.stringify(data));

  // Store token separately for easier access
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const register = async (registerData) => {
  const { data } = await axios.post("api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

/////-----------------------------------------------------

// export const updateProfile=async (user)=>{
// //const user = localStorage.getItem('user');
// const token = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token;

//  const updatedUser = { name: 'Updated Name' };

// try {
//   const { data } = await axios.post('/api/users/updateProfile', updatedUser, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   localStorage.setItem('user',JSON.stringify(data));
//   console.log('Profile updated:', data);
// } catch (error) {
//   console.error('Error updating profile:', error.response?.data || error.message);
//   return data;
// }
// }

////-------------------------------------------------------

export const updateProfile = async (updatedUserData) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    console.error("Token not found!");
    return;
  }

  console.log("Token:", token);

  const currentUser = user ? JSON.parse(user) : null;

  if (!currentUser) {
    console.error("No user data found in localStorage");
    return;
  }

  const updatedUser = { ...currentUser, ...updatedUserData };

  try {
    const { data } = await axios.post("/api/users/updateProfile", updatedUser, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Save updated user data back to localStorage
    localStorage.setItem("user", JSON.stringify(data));
    console.log("Profile updated:", data);

    return data;
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
  }
};

export const changePassword = async (passwords) => {
  // const token = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token;
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    console.error("Token not found!");
    return;
  }

  try {
    const { data } = await axios.post("/api/users/changePassword", passwords, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Password updated:", data);
  } catch (error) {
    console.error(
      "Error updating password:",
      error.response?.data || error.message
    );
    return data;
  }
};














export const getAll = async (searchTerm) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    console.error("Token not found!");
    return [];
  }

  try {
    const { data } = await axios.get("/api/users/getAll", {
      params: { search: searchTerm ?? "" }, // Correct way to pass searchTerm
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched users:", data);
    return data; // Ensure data is returned properly
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return []; // Return an empty array to avoid errors in .map()
  }
};




export const toggleBlock = async (userId) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    console.error("Token not found!");
    return [];
  }

  try {
    // const { data } = await axios.get("/api/users/toggleBlock", {
      const { data } = await axios.post(`/api/users/toggleBlock/${userId}`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched users:", data);
    return data; // Ensure data is returned properly
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return []; // Return an empty array to avoid errors in .map()
  }
};


export const getById = async (userId) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    console.error("Token not found!");
    return [];
  }

  try {
    // const { data } = await axios.get("/api/users/toggleBlock", {
      const { data } = await axios.get("/api/users/getById/"+userId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched users:", data);
    return data; // Ensure data is returned properly
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return []; // Return an empty array to avoid errors in .map()
  }
};








export const updateUser = async (userData) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : null;

  if (!token) {
    console.error("Token not found!");
    return [];
  }

  try {
      const { data } = await axios.post("/api/users/update",userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Fetched users:", data);
    return data; // Ensure data is returned properly
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    return []; // Return an empty array to avoid errors in .map()
  }
};




