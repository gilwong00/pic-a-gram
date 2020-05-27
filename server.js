require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const colors = require('colors');
const routes = require('./routes');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection
  .once('open', () => console.log(colors.green('connected to mongodb')))
  .on('err', (err) =>
    console.log(colors.red('error connecting to mongodb:', err))
  );

app.listen(PORT, (err) => {
  if (err) {
    console.error(colors.red(err.message));
  }
  console.log(colors.green(`Listening on port ${PORT}`));
});
