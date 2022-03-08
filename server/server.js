const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const listThingsRoutes = require('./routes/api/listThings');
const { PORT, mongoUri } = require('./config.js');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database Connected...'))
.catch(err => console.log(err));

app.use('/api/listThings', listThingsRoutes);
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
});
