require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const router = require("./routes/router");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }) 
);
app.use(express.json());
app.use(cookieParser());


app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server started on PORT-${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();