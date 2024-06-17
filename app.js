import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth.js";
import { router as hotelierRoutes } from "./routes/hotelier.js";
import { router as customerRoutes } from "./routes/customer.js";
import { router as userRoutes } from "./routes/user.js";
import { router as adminRoutes } from "./routes/admin.js";

dotenv.config();

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(
  cors({
    credentials: true,
  })
);
app.use("/images", express.static("images"));

app.use(authRoutes);
app.use(hotelierRoutes);
app.use(customerRoutes);
app.use(userRoutes);
app.use(adminRoutes);

app.listen(process.env.PORT, () => {
  console.log("app is running on port " + process.env.PORT);
});
