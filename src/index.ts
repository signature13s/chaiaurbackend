import dotenv from "dotenv";
import connectDB from "./db";
import app from "./app";

dotenv.config({ path: "./env" });
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("application not working");
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("mongo DB connection Failed");
  });

// const app = express();
// //iffy statemnet
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     const server = app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//     server.on("error", (error) => {
//       console.log("application not working");
//       throw error;
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     process.exit(1)
//   }
// })();
