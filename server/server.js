const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const port = 7986;

// middleware
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
