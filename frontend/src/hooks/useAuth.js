import { createContext ,useState,useContext} from "react";
import * as userService from '../services/userService';
import {toast} from 'react-toastify';

const AuthContext=createContext(null);

export const AuthProvider=({children})=>
{
    const [user,setUser]=useState(userService.getUser());
  
  
    const login=async (email,password) => {
      
        try{
              const user=await userService.login(email,password);
              setUser(user);
              toast.success('Login successfull')
        }
        catch(err)
        {
              
            toast.error(err.response.data);
        }
        
    };


   const logout =()=>
   {
       userService.logout();
       setUser(null);
       toast.success('Logout Successful !');
   };

    return (
        <AuthContext.Provider value={{user,login,logout}} >
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth=()=>useContext(AuthContext);




