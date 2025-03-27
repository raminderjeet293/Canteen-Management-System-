import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};

export const getAllByTag = async (tag) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("/api/foods/tag/" + tag);
  return data;
};

export const getById = async (foodId) => {
  const { data } = await axios.get("/api/foods/" + foodId);
  return data;
};


// export async function deleteById(foodId)
// {
//     await axios.delete('/api/foods/' + foodId);
// }




export async function deleteById(foodId) {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage
  console.log("Token retrieved for deleteById:", token);  // Check the token here

  if (!token) {
    throw new Error('No authentication token available');
  }

  try {
    await axios.delete('/api/foods/' + foodId, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add the token to the request headers
      },
    });
  } catch (error) {
    console.error('Error deleting food:', error);
    throw error;  // Re-throw error to handle it higher up
  }
  
}
