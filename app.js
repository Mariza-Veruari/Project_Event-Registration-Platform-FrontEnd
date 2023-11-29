const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

 
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://marveruari:yM6uR7iPKMwFSA4h@cluster0.xyo4ifk.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

 
const userRoutes = require('./routes/User');
const eventRoutes = require('./routes/Event');
app.use('/user', userRoutes);
app.use('/event', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
