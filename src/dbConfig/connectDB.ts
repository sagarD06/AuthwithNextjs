import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected!");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB Connection failed, please make sure db is up and running: " +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Someting went wrong while connecting to DB.");
    console.log(error);
  }
}
