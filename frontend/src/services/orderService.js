import axios from "axios";

export const createOrder = async (order) => {
  try {
    
    console.log('Creating order:', order);
    const user = localStorage.getItem('user');
    const token = user && JSON.parse(user).token;
    const { data } = await axios.post('/api/orders/create', order, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    
    return data;
  }
   catch (error) 
     {  
      console.error('Error creating order:', error);
     }
};






