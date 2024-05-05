import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { routes as authRoutes } from "./routes/auth.js";


dotenv.config();


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
   cors({
      credentials: true,
   })
);

app.use(authRoutes);

app.listen(process.env.PORT);
