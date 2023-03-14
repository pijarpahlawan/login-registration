const cors = require('cors');
const express = require('express');
const routes = require('./routes/auth');

const app = express();
const port = 7986;

// middleware
app.use(cors());
app.use(express.json());

app.use('/auth', routes);

app.get('/', (req, res) => {
  res.redirect('auth');
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
