import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://Surajbnp:Suraj8809@cluster0.reokdx2.mongodb.net/zuraprofile?retryWrites=true&w=majority");
    console.log("connected to mongodb");
  } catch {
    console.log("error while connecting the database");
  }
};

export default connectMongoDB;
