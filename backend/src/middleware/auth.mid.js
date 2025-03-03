// import  verify  from 'jsonwebtoken';
// import { UNAUTHORIZED } from '../constants/httpStatus.js';

// export default (req, res, next) => {
  
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(UNAUTHORIZED).send();
   
//     const token = req.headers.access_token;
//     if (!token) return res.status(UNAUTHORIZED).send();


//     // token verified in system or not 
//   try {
//     const decoded = verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//   } catch (error) {
//     res.status(UNAUTHORIZED).send();
//   }

//   return next();
// };

import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/httpStatus.js";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No Authorization header or incorrect format");
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User:", decoded); // Debugging log
    next();
  } catch (error) {
    console.log("Invalid token:", error.message);
    return res.status(UNAUTHORIZED).json({ message: "Unauthorized: Invalid token" });
  }
};
