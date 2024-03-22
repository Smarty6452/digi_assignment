import express from "express";
import mongoose from "mongoose";
import cors from "cors"; 
import router from "./routes/user.route";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors()); 
app.use("/api/user", router);

mongoose
  .connect(
    "mongodb+srv://admin:3UilNcxEW37bz7Ym@blog.rnfwqtw.mongodb.net/?retryWrites=true&w=majority&appName=blog" //can use env and your url also 
  )
  .then(() => app.listen(PORT))
  .then(() => console.log(`Connected mongo and listening on port ${PORT}`));

app.use("/api", (req, res) => {
  res.send("hello");
});
