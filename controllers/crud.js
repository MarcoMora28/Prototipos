const { render } = require('ejs');
const conexion = require('../database/db');
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

exports.registrarUsuario = async (peticion, respuesta) => {
    const nombre = peticion.body.nombre;
    const edad = peticion.body.edad;
    const contraseña = peticion.body.contraseña;
    let contrahash = await bcrypt.hash(contraseña,8);
    conexion.query('select count(*) as contador from usuario where nombre=?', [nombre], (error, resultados) => {
        if (resultados[0].contador == 0){
            conexion.query('INSERT INTO usuario SET ?', { nombre: nombre, edad: edad, contraseña: contrahash }, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Datos registrados");
                    respuesta.redirect('/');
                }
            });
        } else {
            console.log("Usuario existente");
        }
    });
};