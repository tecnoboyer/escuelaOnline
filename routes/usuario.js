const express = require('express');
const Usuario = require('../models/usuario');
const app = express();

const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    Usuario.find({}, 'nombre  email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }

            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });





        })
});


// // SE POSTELGA EL AÑADIR USUARIOS
app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});





app.post('/valida', function(req, res) {
    let body = req.body;
    // let usuario = new Usuario;
    let nombre = body.nombre;
    // email: body.email,
    let password = body.password;

    // Inicio de la prueba
    Usuario.findOne({ nombre: nombre }, function(err, usuarioDB) {
        if (err) {
            return res.json({
                Ok: false,
                message: 'password correcto'

            });
        }

        let bandera = bcrypt.compare(password, usuarioDB.password)
            .then(function(samePassword) {
                if (samePassword) {
                    if (usuarioDB.role === 'USER_ROLE') {
                        return res.render("usuarioUser")
                    }
                    if (usuarioDB.role === 'USER_ADMIN') {
                        return res.render("usuarioAdmin")
                    } else {
                        res.json({
                            Ok: false,
                            message: 'No tenemos un rol adecuado para este usuario'

                        });
                    }

                } else {
                    res.json({
                        Ok: false,
                        message: 'no escribió el password correcto'

                    });
                }
            });




        // if (usuarioDB.role === 'USER_ROLE') {
        // return res.render("usuarioUser")


    });
});










app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });

        }

        res.json({
            ok: true,
            usuario: usuarioBorrado

        });

    });



});

module.exports = app;