const express = require("express");
const colors = require('colors');
const connectDB = require('./db/db-config');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/error-middleware');
const port = 8000;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/libros', require('./routes/libro-routes'));

app.use(errorHandler);
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
