import mongoose from "mongoose";

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
  }
};

export default DBconnect;
