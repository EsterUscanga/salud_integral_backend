const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
//const { conn } = require('./conf/conf.js')

const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "db_salud_integral"
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/usuario/:matricula', async (req, res) => {
    const matricula = req.params.matricula
    if(matricula){
        const obtenerUsuarioArea = `select usuarios.matricula, usuarios.sexo, usuarios.nombre, usuarios.apellido_paterno, usuarios.apellido_materno, usuarios.imss, areas.nombre as area 
                                    from usuarios, areas 
                                    where matricula = ${conn.escape(matricula)} and usuarios.area_id = areas.id;`
        conn.query(obtenerUsuarioArea, (error, result, fileds) => {
            if(error) 
                res.status(500).send(error)
            else 
                res.status(200).send(result[0])
        })
    } else {
        res.status(401).send({error:"Se necesita matricula"})
    }
})

app.post('/atencionNutricionalFormulario', async (req, res) => {
    const matricula = req.body.matricula
    const talla = req.body.talla
    const peso = req.body.peso
    const imc = req.body.imc
    if(matricula && talla && peso && imc){
        const obtenerIdPorMatricua =  `select id from usuarios where matricula = ${conn.escape(matricula)};`
        conn.query(obtenerIdPorMatricua, (error, result, fileds) => {
            if(error) 
                res.status(500).send({error: error})
            else {
                const id = result[0].id
                const insertarAtencionNutricionalFormulario = `INSERT INTO formularios_atencion_nutrimental (usuario_id, talla, peso, imc) VALUES (${conn.escape(id)}, ${conn.escape(talla)}, ${conn.escape(peso)}, ${conn.escape(imc)});`
                conn.query(insertarAtencionNutricionalFormulario, (error, result, fileds) => {
                    if(error) 
                        res.status(500).send(error)
                    else 
                        res.status(200).send({status: "Operacion exitosa"})
                })
            }
        })
    } else {
        res.status(401).send({error:"Se necesita talla, peso e imc del usuario"})
    }
})

const printMessage = () => { console.log('Running at http://localhost:3000/') }

app.listen(3000, printMessage)
