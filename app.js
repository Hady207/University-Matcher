const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const universityRoute = require('./routes/universityRoute');
const reviewRoute = require('./routes/reviewRoute');
const userRoute = require('./routes/userRoute');
const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/universities', universityRoute);
app.use('/reviews', reviewRoute);
app.use('/users', userRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
