import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

//Routes

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
   cors({
      credentials: true,
   })
);

app.listen(process.env.PORT);
