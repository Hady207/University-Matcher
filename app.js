const express = require("express");
const globalErrorHandler = require("./controller/error");
const AppError = require("./utils/appError");
const universityRoute = require("./routes/universityRoute");
const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use("/universities", universityRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
