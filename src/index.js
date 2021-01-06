const express = require('express');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// INICIALIZAR SERVIDOR
const app = express();

// CONFIGURACION
app.set('puerto', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SERVICIOS
const configAlmacenamiento = multer.diskStorage({
    destination: path.join(__dirname, './public/img'),
    filename: (peticion, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
})
app.use(multer({
    storage: configAlmacenamiento,
    dest: path.join(__dirname, 'public/img'),
    fileFilter: (peticion, file, cb) => {
        const tiposArchivos = /jpeg|jpg|png|gif/;
        const mimetype = tiposArchivos.test(file.mimetype);
        const extension = tiposArchivos.test(path.extname(file.originalname));
        if (mimetype && extension) return cb(null, true);
        cb("El archivo no tiene una extension permitida");
    }
}).single('imagen'));

// RUTAS
app.use(require('./routes/index'));

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));

// MAIN
app.listen(app.get('puerto'), () => console.log(`Servidor en el puerto ${app.get('puerto')}`))