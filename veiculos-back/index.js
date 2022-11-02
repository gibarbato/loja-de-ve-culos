const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());


const veiculos = [
    {
        "placa": "qwe1234",
        "marca": "chery",
        "modelo": "celer",
        "ano": 2015
    },
    {
        "placa": "asd1234",
        "marca": "fiat",
        "modelo": "uno",
        "ano": 2000
    }, {
        "placa": "zxc1234",
        "marca": "fiat",
        "modelo": "palio",
        "ano": 2011
    }, {
        "placa": "qaz1234",
        "marca": "vw",
        "modelo": "gol",
        "ano": 1999
    }, {
        "placa": "wsx1234",
        "marca": "vw",
        "modelo": "fusca",
        "ano": 1982
    },

];

server.get('/veiculos', (req, res) => {

    return res.json(veiculos);
})

// index -> nome do parametro que se quer
server.get('/veiculos/:index', (req, res) => {
    const { index } = req.params;
    veiculos[index]
    return res.json(veiculos[index])
    /*     const params = req.params;
        params.index;
        livros[index]  */
})

server.post('/veiculos', (req, res) => {
    let veiculoPlaca = req.body.placa
    let veiculoModelo = req.body.modelo
    const veiculo = req.body
    let isValid = true;

    veiculos.forEach((v) => {
        if (veiculoPlaca === v.placa && veiculoModelo === v.modelo) {
            isValid = false;
        }
    })

    if (isValid) {
        veiculos.push(veiculo)
        return res.json(veiculos)
    } else {
        return res.json('Veículo já cadastrado')
    }
})

server.delete('/veiculos/:index', (req, res) => {
    const { index } = req.params;
    veiculos.splice(index, 1);
    return res.json(veiculos)
})

server.put('/veiculos/:index', (req, res) => {
    let veiculoPlaca = req.body.placa
    let veiculoModelo = req.body.modelo
    const veiculo = req.body
    let isValid = false;

    veiculos.forEach((v) => {
        if (veiculoPlaca === v.placa && veiculoModelo === v.modelo) {
            isValid = true;
        }
    })

    if (isValid) {
        const { index } = req.params;
        veiculos[index] = veiculo;
        return res.json(veiculos)
    } else {
        return res.json('veículo não já cadastrado')

    }
})





/////////////////////////////////////////////
server.listen(3000, () => {
    console.log('Server is up!');
});