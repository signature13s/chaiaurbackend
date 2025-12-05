import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config({ path: "./env" });
connectDB();

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
