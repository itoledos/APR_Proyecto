const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Requerir configuración

// COMANDO NECESARIO PARA GET
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Cookies
app.use(cookieParser());

// COMANDOS NECESARIOS PARA POST
// Se usan para análisis de request body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config');
require('./routes/pet.routes')(app);
require('./routes/usuario.routes')(app);
require('./routes/consumer.routes')(app);
require('./routes/reading.routes')(app);

// ESCUCHAR PUERTO //
app.listen(port, () => console.log(`Port: ${port}`));
