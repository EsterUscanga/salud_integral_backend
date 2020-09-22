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
                res.status(500).send({error: error})
            else 
                res.status(200).send(result[0])
        })
    } else {
        res.status(401).send({error:"Se necesita matricula"})
    }
})

const printMessage = () => { console.log('Running at http://localhost:3000/') }

app.listen(3000, printMessage)
