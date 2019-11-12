require('dotenv').config({ path: './config.env' });

const mongoose = require('mongoose');
const port = 3000 || process.env.PORT;
const app = require('./app');

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

app.listen(port, () => console.log(`server started on ${port}`));
