import { Int32 } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  password: {
    type: String, 
    required: true,
  },
  money: {
    type: Number,
  },
  accountType: {
    type: String,
    enum: ['Classic', 'Admin'], // in aplicatia noastra avem 2 tipuri de autentificari - utilizator conectat clasic si administrator
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
export default User;