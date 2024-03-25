import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import CORS middleware
import router from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors()); // Use CORS middleware
app.use("/api/user", router);

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => app.listen(PORT))
  .then(() => console.log(`Connected mongo and listening on port ${PORT}`));

app.use("/api", (req, res) => {
  res.send("hello");
});
app.use(errorHandler);
