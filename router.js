const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

const conexion = require('./database/db');

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

const session = require('express-session');
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

router.get('/', (peticion, respuesta) => {
    respuesta.render('inicio');
});

router.get('/registro', (peticion, respuesta) => {
    respuesta.render('registro');
});

router.get('/perfil', (peticion, respuesta) => {
    const nombre = peticion.query.a;
    const contraseña = peticion.query.b;
    console.log(peticion.query);
    conexion.query('SELECT * FROM usuario where nombre = ?', [nombre], (error, datosUsuario) => {
        if (datosUsuario[0].length == 0) {
            respuesta.redirect('/registro');
        } else {
            peticion.session.loggedin = true;
            peticion.session.name = datosUsuario[0].name;
            console.log(datosUsuario[0].nombre + " ha ingresado");
            respuesta.render('perfil', { datos: datosUsuario[0] });
        }
    });
});

router.get('/abecedario', (peticion, respuesta) => {
    respuesta.render('abecedario');
});

router.get('/grabar', (peticion, respuesta) => {
    respuesta.render('grabar');
});

router.get('/escribir', (peticion, respuesta) => {
    respuesta.render('escribir');
});

const crud = require('./controllers/crud');
router.post('/registrarUsuario', crud.registrarUsuario);

module.exports = router;