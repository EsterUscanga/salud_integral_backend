const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      app = express()

app.use(cors())

const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: "db_salud_integral"
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/usuario/:matricula', async (req, res) => {
    const matricula = req.params.matricula
    if (matricula) {
        const obtenerUsuarioArea = `select usuarios.matricula, usuarios.sexo, usuarios.nombre, usuarios.apellido_paterno, usuarios.apellido_materno, usuarios.imss, areas.nombre as area 
                                    from usuarios, areas 
                                    where matricula = ${conn.escape(matricula)} and usuarios.area_id = areas.id;`
        conn.query(obtenerUsuarioArea, (error, result, fileds) => {
            if (error)
                res.status(500).send(error)
            else 
                res.status(200).send(result[0])
            
        })
    } else {
        res.status(401).send({ error: "Se necesita matricula" })
    }
})

app.post('/atencionNutricionalFormulario', async (req, res) => {
    const matricula = req.body.matricula,
          talla = req.body.talla,
          peso = req.body.peso,
          imc = req.body.imc
    if (matricula && talla && peso && imc) {
        const obtenerIdPorMatricua = `select id from usuarios where matricula = ${conn.escape(matricula)};`
        conn.query(obtenerIdPorMatricua, (error, result, fileds) => {
            if (error)
                res.status(500).send(error)
            else {
                console.log(result[0])
                const insertarAtencionNutricionalFormulario = `INSERT INTO formularios_atencion_nutrimental (usuario_id, talla, peso, imc) VALUES (${conn.escape(result[0].id)}, ${conn.escape(talla)}, ${conn.escape(peso)}, ${conn.escape(imc)});`
                conn.query(insertarAtencionNutricionalFormulario, (error, result, fileds) => {
                    if (error)
                        res.status(500).send(error)
                    else 
                        res.status(200).send({status : "Formulario enviado exitosamente."})        
                })
            }
        })
    } else {
        res.status(401).send({ error: "Se necesita talla, peso e imc del usuario" })
    }
})

app.get('/clasificacionesEnfermedades', async (req, res) => {
    const obtenerIdPorMatricua = `select * from calisficaciones_enfermedades;`
    conn.query(obtenerIdPorMatricua, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.post('/justificacionFaltasFormulario', async (req, res) => {
    const matricula = req.body.matricula,
          cuatrimestre = req.body.cuatrimestre,
          fechaIncio = "2020-12-09 13:31:33",
          fechaFin = "2020-12-11 13:31:33",
          clasificacionEnfermedad = req.body.clasificacionEnfermedad,
          descripcionEnfermedad = req.body.descripcionEnfermedad

    if (matricula && cuatrimestre && fechaIncio && fechaFin && clasificacionEnfermedad && descripcionEnfermedad) {
        const obtenerIdPorMatricua = `select id from usuarios where matricula = ${conn.escape(matricula)};`
        conn.query(obtenerIdPorMatricua, (error, result, fileds) => {
            if (error)
                res.status(500).send(error)
            else {
                const insertarFormularioJustificaciones = `INSERT INTO formularios_justificaciones (usuario_id, cuatrimestre, fecha_inicio, fecha_fin, clasificacion_enfermedad_id, descripcion_enfermedad) VALUES (${conn.escape(result[0].id)}, ${conn.escape(cuatrimestre)}, CURRENT_DATE, CURRENT_DATE, ${conn.escape(clasificacionEnfermedad)}, ${conn.escape(descripcionEnfermedad)});`
                conn.query(insertarFormularioJustificaciones, (error, result, fileds) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send(error)
                    }
                    else
                        res.status(200).send({ status: "Formulario enviado exitosamente." })
                })
            }
        })
    } else {
        res.status(401).send({ error: "Se necesita talla, peso e imc del usuario" })
    }

          
})

const printMessage = () => { console.log('Running at http://localhost:3000/') }

app.listen(3000, printMessage)
