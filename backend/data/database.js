import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PassMan",
    })
    .then((c) => console.log(`Database connected with ${c.connection.host}`))
    .catch((error) => console.log(error));
};
