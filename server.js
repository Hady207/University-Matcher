require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = require('./app');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful'))
  .catch(err => console.log(err.message));

// mongoose
//   .connect('mongodb://localhost:27017/universityMatcher-v1', {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('Database is connected'))
//   .catch(err => console.log(err.message));

const server = app.listen(port, () =>
  console.log(`server started on ${port}...`)
);

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log(`👋 SIGTERM RECIVED. Shutting down gracefully`);
  server.close(() => {
    console.log('💥 Process terminated');
  });
});
