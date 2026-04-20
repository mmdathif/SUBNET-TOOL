const express = require('express');
const cors = require('cors');
const path = require('path'); 

const subnetRoutes = require('./routes/subnetRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes FIRST
app.use('/', subnetRoutes);


app.use(express.static(path.join(__dirname, "frontend/latest/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/latest/dist/index.html"));
});

// ✅ Dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});