const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS 
app.use(express.json());


// Función para validar la cédula ecuatoriana
function validarCedula(cedula) {
    if (cedula.length !== 10) {
        return false;
    }

    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
        let digito = parseInt(cedula[i]) * coeficientes[i];
        if (digito > 9) {
            digito -= 9;
        }
        suma += digito;
    }

    const digitoVerificadorCalculado = (10 - (suma % 10)) % 10;
    const digitoVerificador = parseInt(cedula[9]);

    return digitoVerificadorCalculado === digitoVerificador;
}

// Ruta para validar la cédula
app.post('/validar-cedula', (req, res) => {
    const { cedula } = req.body;

    if (!cedula) {
        return res.status(400).json({ error: 'Debe proporcionar un número de cédula' });
    }

    const esValida = validarCedula(cedula);

    if (esValida) {
        res.json({ mensaje: 'La cédula es válida' });
    } else {
        res.json({ mensaje: 'La cédula no es válida' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`El servidor está ejecutándose en el puerto ${port}`);
});













// Iniciar el servidor
app.listen(3000, () => {
    console.log("El servidor está ejecutándose en el puerto 3000");
});
