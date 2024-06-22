import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//RAGISTER
export const ragister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const is_email_exist = await UserModel.findOne({ email });
    if (is_email_exist) {
      return res.status(404).send({
        success: false,
        message: "The Email Already Ragistered Try Login",
      });
    }

    //Password Hashing
    const hashedpass = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedpass,
    });

    return res.status(201).send({
      success: true,
      message: "The User Ragistered Succesfully",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "The Email is not ragistered try ragister",
      });
    }

    //possword
    const is_match = await bcrypt.compare(password, user.password);
    if (!is_match) {
      return res.status(404).send({
        success: false,
        message: "The Password is wrong",
      });
    }

    //token generates
    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);

    res.status(200).send({
      success: true,
      message: "User Login Succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({
      success: true,
      message: "Logout Succefully",
    });
  } catch (error) {
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};

//GET USER
export const user = async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await UserModel.findById(userid);

    res.status(200).send({
      success: true,
      message: "Find use Succefully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(504).send({
      success: false,
      message: error.message,
    });
  }
};
