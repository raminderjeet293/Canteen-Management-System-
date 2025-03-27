// import { UNAUTHORIZED } from '../constants/httpStatus.js';
//  import authMid from './auth.mid.js';
//  const adminMid = (req, res, next) => {
//     console.log("Is user admin: ", req.user.isAdmin); 
//    if (!req.user.isAdmin) res.status(UNAUTHORIZED).send();
 
//    return next();
//  };
//  export default [authMid, adminMid];


import { UNAUTHORIZED } from '../constants/httpStatus.js';
import authMid from './auth.mid.js';


const adminMid = (req, res, next) => {

  if (!req.user) {
    console.log("User is not authenticated. No user data found in request.");
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized: No user data found" });
  }

 
  console.log("Checking if user is admin:", req.user);  
  
  if (!req.user.isAdmin) {
    console.log("User is not an admin:", req.user);  
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized: Admin privileges required" });
  }

  console.log("User is admin:", req.user.isAdmin);  
  return next();  
};

export default [authMid, adminMid];
