const express = require('express');
const Usuario = require('../models/usuario');
const app = express();



app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'leonardo',
        anio: new Date().getFullYear()
    });
});


app.get('/primer_semestre', (req, res) => {
    res.render('primer_semestre', {
        anio: new Date().getFullYear()
    });
});
app.get('/oracion', (req, res) => {
    res.render('oracion', {
        anio: new Date().getFullYear()
    });
});
app.get('/login', (req, res) => {
    res.render('login', {
        nombre: 'leonardo',
        anio: new Date().getFullYear()
    });
});

module.exports = app