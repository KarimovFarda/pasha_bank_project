import { Router, Response } from "express";
import { ILogin, IRegister, IAdmin } from "../Interface/types";
import User from '../models/authenticated'
import * as yup from "yup";
import userModel, { login } from '../models/authenticated'
import jwt from "jsonwebtoken";

export const AuthRouter = Router();


var nodemailer = require("nodemailer")


const TOKEN = process.env.JWT_KEY || "";

let authSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),

});

AuthRouter.post("/register", async (req, res: Response) => {
  const registerhPayload: IRegister = req.body;
  try {
    const validPayload = await authSchema.validate(registerhPayload);
    const newUserObj = new userModel(validPayload);
    const newUser = await newUserObj.save();


       
var transporter = nodemailer.createTransport({
  service : "gmail",
  auth : {
  user : "fardask@code.edu.az",
  pass : "314159265zZ."
  }
  });
  var mailOptions = {
  from : "fardask@code.edu.az",
  to : "ferdakerim@gmail.com",
  subject : "Sending Mail",
  text : "Hi",
  }

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      phonenumber: newUser.phonenumber,
    });
     
  transporter.sendMail(mailOptions,function(error:any,info:any){
    if(error){
    console.log(error)}
    else{
    console.log('Email sent' + info.response)
    }
    })
    
  } catch (err) {
    res.status(422).json({ errors: err.errors });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const loginPayload: ILogin = req.body;

  try {
    const validPayload = await authSchema.validate(loginPayload);

    try {
      const user = await login(validPayload.email, validPayload.password);
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        "SHH_its_SECRET"
      );
      res.json({ token });
    } catch (error) {
      res.status(422).json({ errors: error.message });
    }
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
});


AuthRouter.post("/admin", async (req, res) => {
  const loginPayload: ILogin = req.body;


  try {
    const user = await login("admin@gmail.com", "admin");
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      "SHH_its_SECRET"
    );
    res.json({ token });
  } catch (error) {
    res.status(422).json({ errors: error.message });
  }
});


// AuthRouter.get("/register", async (req: Request, res: Response) => {
//   try {
//       const user = await User.find();
//       res.status(200).json(user);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// })