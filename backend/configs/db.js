import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("connect To DB Successfully :)");
    }
  } catch (e) {
    console.log("Error connect To DB =>", e.message);
  }
};

export default connectToDB;
