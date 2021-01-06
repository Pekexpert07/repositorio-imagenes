const { Router } = require('express');
const router = Router();

router.get('/', (peticion, respuesta) => {
    respuesta.render('index');
})

router.post('/subir-imagen', (peticion, respuesta) => {
    console.log(peticion.file);
    respuesta.send('Imagen subida');
})

module.exports = router;