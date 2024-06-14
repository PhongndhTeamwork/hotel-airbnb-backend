import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth.js";
import { router as hotelRoutes } from "./routes/hotelier.js";
import { router as customerRoutes } from "./routes/customer.js";
import { router as userRoutes } from "./routes/user.js";

dotenv.config();

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, dile, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
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
app.use("/images", express.static("images"));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(
  cors({
    credentials: true,
  })
);

// test
app.post("/upload", async (req, res) => {
  try {
    const { filename, path: filepath } = req.file;

    // Insert file metadata into the database
    // await db("images").insert({ filename, filepath });

    res.json({ message: "File uploaded successfully", file: req.file });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload file", error });
  }
});

app.use(authRoutes);
app.use(hotelRoutes);
app.use(customerRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log("app is running on port "+process.env.PORT);
});
