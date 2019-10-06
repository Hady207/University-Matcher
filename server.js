const mongoose = require('mongoose');
const port = 3000 || process.env.PORT;
const app = require('./app');

mongoose
  .connect('mongodb://localhost:27017/chatbot-v1', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database is connected'))
  .catch(err => console.log(err.message));

app.listen(port, () => console.log(`server started on ${port}`));
