import { Router } from "express";
import jwt from "jsonwebtoken";
const router = Router();
import auth from '../middleware/auth.mid.js'
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import admin from "../middleware/admin.mid.js";

const PASSWORD_HASH_SALT_ROUNDS = 10;

router.get(
  "/",
  handler(async (req, res) => {
    const users = await UserModel.find({});
    res.json(users);
  })
);
router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
      return;
    }
    res.status(BAD_REQUEST).send("Username or password is invalid");
  })
);

router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(BAD_REQUEST).send("User already exists,please login!");
      return;
    }
   
    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    };

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  })
);

////-----------------------------

router.post(
  '/updateProfile',
  auth,
  handler(async (req, res) => {
    console.log('Update Profile route hit');
    const {name} = req.body;
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }
   

    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Log the user ID format for debugging
    console.log('Formatted User ID for query:', userId);



   // Try to find the user in the database
   const user1 = await UserModel.findById(userId);
   console.log('User found in database:', user1);
  

    
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {name},
      { new: true }
    );
    console.log('User found after update:', user);
    console.log({name})



  
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
 
   
    res.send(generateTokenResponse(user));
  })
);

//---------------------------



router.post('/changePassword',
  auth,
  handler(async(req,res)=>{
      const {currentPassword,newPassword}=req.body;
      const user= await UserModel.findById(req.user.id);

      if(!user)
      {
        res.status(BAD_REQUEST).send('Change Password Failed !');
        return ;
      }
     
      const equal = await bcrypt.compare(currentPassword,user.password);
      if(!equal){
           res.status(BAD_REQUEST).send('Current Password Is Not Correct !');
           return;
      }

        user.password=await bcrypt.hash(newPassword,PASSWORD_HASH_SALT_ROUNDS);
        await user.save();
        res.send();

  })
);


router.get(
  '/getall/:searchTerm?',
  admin,
  handler(async (req, res) => {
    const { searchTerm } = req.params;

    const filter = searchTerm
      ? { name: { $regex: new RegExp(searchTerm, 'i') } }
      : {};
  const users = await UserModel.find(filter, { password: 0 });
    res.send(users);
  })
);




router.post(
  '/toggleBlock/:userId',
  admin,
  handler(async (req, res) => {
    const { userId } = req.params;

    if (userId === req.user.id) {
      res.status(BAD_REQUEST).send("Can't block yourself!");
      return;
    }

    const user = await UserModel.findById(userId);
    user.isBlocked = !user.isBlocked;
    user.save();

    res.send(user.isBlocked);
  })
);




router.get(
  '/getById/:userId',
  admin,
  handler(async (req, res) => {
    const { userId } = req.params;

    const user = await UserModel.findById(userId, {password:0});
   

    res.send(user);
  })
);


router.post(
  '/update',
  admin,
  handler(async (req, res) => {
    const { id,name,email,isAdmin} = req.body;

    await UserModel.findByIdAndUpdate(id,
      {
        name,email,
        isAdmin
      }
    );
   

    res.send();
  })
);








const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    //  name:user.name,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;

