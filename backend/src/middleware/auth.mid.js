import  verify  from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

export default (req, res, next) => {
  
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(UNAUTHORIZED).send();
   
    const token = req.headers.access_token;
    if (!token) return res.status(UNAUTHORIZED).send();


    // token verified in system or not 
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};