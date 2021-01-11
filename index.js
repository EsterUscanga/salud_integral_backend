const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      fs = require('fs'),
      app = express()
      

app.use(cors())

const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/usuario/:matricula', (req, res) => {
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

app.post('/atencionNutricionalFormulario', (req, res) => {
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
        res.status(401).send("Se necesita talla, peso e imc del usuario")
    }
})

app.get('/clasificacionesEnfermedades', (req, res) => {
    const obtenerClasificacionesEnfermedades = `select * from calisficaciones_enfermedades;`
    conn.query(obtenerClasificacionesEnfermedades, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.get('/responsablesDeLlenado', (req, res) => {
    const obtenerResponsablesLlenado = `select * from responsables_llenado;`
    conn.query(obtenerResponsablesLlenado, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.get('/antecendentesPatologicos', (req, res) => {
    const obtenerAntecendentesPatologicos = `select * from antecedentes_patologicos;`
    conn.query(obtenerAntecendentesPatologicos, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.get('/antecedentesFamiliares', (req, res) => {
    const obtenerAntecendentesFamiliares = `select * from antecedentes_familiares;`
    conn.query(obtenerAntecendentesFamiliares, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.get('/gruposSanguineos', (req, res) => {
    const obtenerGruposSanguineos = `select * from grupos_sanguineos;`
    conn.query(obtenerGruposSanguineos, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.get('/metodosAnticonceptivos', (req, res) => {
    const obtenerMetodosAnticonceptivos = `select * from metodos_anticonceptivos;`
    conn.query(obtenerMetodosAnticonceptivos, (error, result, fileds) => {
        if (error)
            res.status(500).send(error)
        else
            res.status(200).send(result)
    })
})

app.post('/saludPreventivaFormulario', (req, res) => {
    const matricula = req.body.matricula,
          responsableDeLlenado = req.body.responsableDeLlenado,
          edad = req.body.edad,
          peso = req.body.peso,
          talla = req.body.talla,
          grupoSanguineo = req.body.grupoSanguineo,
          fuma = req.body.fuma ? 1 : 0,
          ingiereBebidasAlcoholicas = req.body.ingiereBebidasAlcoholicas ? 1 : 0,
          ingieraOtraSustancia = req.body.ingieraOtraSustancia,
          usaLentes = req.body.usaLentes ? 1 : 0,
          numeroEmbarazos = req.body.numeroEmbarazos,
          actividadFisica = req.body.actividadFisica ? 1 : 0,
          antecedentesPatologicos = req.body.antecedentesPatologicos,
          antecedentesFamiliares = req.body.antecedentesFamiliares,
          metodosAnticonceptivos = req.body.metodosAnticonceptivos
    
    if(matricula) {

        const obtenerIdPorMatricua = `select id from usuarios where matricula = ${conn.escape(matricula)};`
        conn.query(obtenerIdPorMatricua, (error, result, fileds) => {
            if (error)
                res.status(500).send(error)
            else {
                console.log(result[0])
                const insertarSaludPreventivaFormulario = 
                    `INSERT INTO formularios_salud_preventiva 
                    (usuario_id, responsable_llenado_id, edad, peso, talla, grupo_sanguineo_id, fuma, bebidas_alcoholicas, 
                    otra_sustancia, uso_lentes, numero_embarazos, actividad_fisica, antecedentes_patologicos, antecedentes_familiares, 
                    metodos_anticonceptivos) VALUES 
                    (${conn.escape(result[0].id)}, ${conn.escape(responsableDeLlenado)} , ${conn.escape(edad)}, 
                    ${conn.escape(peso)}, ${conn.escape(talla)}, ${conn.escape(grupoSanguineo)}, ${conn.escape(fuma)}, 
                    ${conn.escape(ingiereBebidasAlcoholicas)}, ${conn.escape(ingieraOtraSustancia)}, ${conn.escape(usaLentes)}, 
                    ${conn.escape(numeroEmbarazos)}, ${conn.escape(actividadFisica)}, ${conn.escape(antecedentesPatologicos)},
                    ${conn.escape(antecedentesFamiliares)}, ${conn.escape(metodosAnticonceptivos)});`
                conn.query(insertarSaludPreventivaFormulario, (error, result, fileds) => {
                    if (error) {
                        console.log(error)
                        res.status(500).send(error)
                    } else {
                        res.status(200).send({status : "Formulario enviado exitosamente."})        

                    } 
                })
            }
        })    
    } else {
        res.status(401).send("Porfavor llenar todos los campos")
    }     
    

})

app.post('/justificacionFaltasFormulario', (req, res) => {
    const matricula = req.body.matricula,
          cuatrimestre = req.body.cuatrimestre,
          fechaInicio = req.body.fechaInicio,
          fechaFin = req.body.fechaFin,
          clasificacionEnfermedad = req.body.clasificacionEnfermedad,
          descripcionEnfermedad = req.body.descripcionEnfermedad,
          comprobante = req.body.comprobante

    if (matricula) {
        const obtenerIdPorMatricua = `select id from usuarios where matricula = ${conn.escape(matricula)};`
        conn.query(obtenerIdPorMatricua, (error, result, fileds) => {
            if (error)
                res.status(500).send(error)
            else {
               const insertarFormularioJustificaciones = `INSERT INTO formularios_justificaciones (usuario_id, cuatrimestre, fecha_inicio, fecha_fin, clasificacion_enfermedad_id, descripcion_enfermedad, comprobante) VALUES (${conn.escape(result[0].id)}, ${conn.escape(cuatrimestre)}, ${conn.escape(fechaInicio)}, ${conn.escape(fechaFin)}, ${conn.escape(clasificacionEnfermedad)}, ${conn.escape(descripcionEnfermedad)}, ${conn.escape(comprobante)});`
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
        res.status(401).send("Se necesita talla, peso e imc del usuario")
    }

          
})

const printMessage = () => { console.log('Running at http://localhost:3000/') }

app.listen(3000, printMessage)
