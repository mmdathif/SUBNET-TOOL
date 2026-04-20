const express = require('express');
const cors = require('cors');


const subnetRoutes = require('./routes/subnetRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// use routes
app.use('/', subnetRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});