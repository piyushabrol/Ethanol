const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/product'));
app.use('/api',require('./routes/submitForm'))

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
