const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS 
app.use(express.json());

// Mapa de provincias
const provincias = {
    '01': 'Azuay',
    '02': 'Bolivar',
    '03': 'Cañar',
    '04': 'Carchi',
    '05': 'Cotopaxi',
    '06': 'Chimborazo',
    '07': 'El Oro',
    '08': 'Esmeraldas',
    '09': 'Guayas',
    '10': 'Imbabura',
    '11': 'Loja',
    '12': 'Los Rios',
    '13': 'Manabi',
    '14': 'Morona Santiago',
    '15': 'Napo',
    '16': 'Pastaza',
    '17': 'Pichincha',
    '18': 'Tungurahua',
    '19': 'Zamora Chinchipe',
    '20': 'Galapagos',
    '21': 'Sucumbios',
    '22': 'Orellana',
    '23': 'Santo Domingo de los Tsachilas',
    '24': 'Santa Elena',
    '30': 'Ecuatorianos residentes en el exterior'
};

// Función para validar la cédula ecuatoriana
function validarCedula(cedula) {
    if (cedula.length !== 10) {
        return { esValida: false, provincia: null };
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
    const esValida = digitoVerificadorCalculado === digitoVerificador;

    const codigoProvincia = cedula.substring(0, 2);
    const provincia = provincias[codigoProvincia] || null;

    return { esValida, provincia };
}

// Ruta para validar la cédula
app.get('/validcedulaec/:cedula', (req, res) => {
    const { cedula } = req.params;

    if (!cedula) {
        return res.status(400).json({ error: 'Debe proporcionar un número de cédula' });
    }

    const { esValida, provincia } = validarCedula(cedula);

    if (esValida) {
        res.json({ mensaje: 'La cédula es válida', provincia });
    } else {
        res.json({ mensaje: 'La cédula no es válida', provincia: provincia || 'Código de provincia no válido' });
    }
});


// Iniciar el servidor
app.listen(3000, () => {
    console.log("El servidor está ejecutándose en el puerto 3000");
});


//1002003001