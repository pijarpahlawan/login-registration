const cors = require('cors');
const express = require('express');
const routes = require('./routes/hello');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.redirect('api');
});

app.listen(port, () => console.log(`App running on http://localhost:${port}`));
