// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;



// ============================
//  Entorno
// ============================


process.env.NODE_ENV = process.env.NODE_ENV || 'dev'



// ============================
//  Base de datos
// ============================


let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/escuela_online';
} else {
    urlDB = 'mongodb://escuela_online:upernikao19!@ds261486.mlab.com:61486/escuela_online';
}

process.env.URLDB = urlDB;