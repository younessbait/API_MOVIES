const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const movieRouter = require("./routes/movie");
const wachlistRouter = require("./routes/wachlist");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/watchlist", wachlistRouter);
mongoose.connect(process.env.DB_URL);
module.exports = app;
