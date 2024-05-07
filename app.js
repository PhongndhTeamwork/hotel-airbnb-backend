import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);

app.use(authRoutes);

app.listen(process.env.PORT, () => {
  console.log("app is running on port 5000");
});
