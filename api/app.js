let express = require('express')
let mysql = require('mysql')
let cors = require('cors')
let app = express()

// El servidor entienda JSON
app.use(express.json())
// Acepte solicitudes del FrontEnd (Cliente)
app.use(cors())

let puerto = 3001
app.listen(puerto, function() {
  console.log("Servidor en línea")
})

// Base de datos
// Parámetros de conexión
let conexion = mysql.createConnection({
  host: 'localhost',
  user: 'pw',
  password: '12345678',
  database: 'pw'
})

// Conectarnos a la base de datos
conexion.connect(function(error){
  if(error) {
    throw error
  }else {
    console.log('Conectado a la BD')
  }
})

// Rutas de acceso
app.get('/',function(req,res){
  res.send('Ruta de inicio')
}) // Ruta raiz

// Todos los artículos
app.get('/api/articulos/',function(req,res) {
  conexion.query('SELECT * FROM articulos',function(error,filas) {
    if(error) {
      throw error
    }else {
      res.send(filas)
    }
  })
})

// Solo un artículo
app.get('/api/articulos/:id',function(req,res) {
  conexion.query('SELECT * FROM articulos where id = ?',[req.params.id],function(error,fila) {
    if(error) {
      throw error
    }else {
      res.send(fila)
    }
  })
})

// Agregar un artículo
app.post('/api/articulos',function(req,res) { // Post es para hacer nuevas inserciones, put es para actualizar
  let data = {
    descripcion:req.body.descripcion,
    precio:req.body.precio,
    cantidad:req.body.cantidad
  }

  let sql = 'INSERT INTO articulos SET ?'
  
  conexion.query(sql,data,function(error,results) {
    if(error) {
      throw error
    }else {
      res.send(results)
    }
  })
})

// Actualizar articulo
app.put('/api/articulos/:id',function(req,res) {
  let id = req.params.id
  let descripcion = req.body.descripcion
  let precio = req.body.precio
  let cantidad = req.body.cantidad
  let sql= "UPDATE articulos SET descripcion = ?, precio = ?, cantidad = ? where id = ?"
  conexion.query(sql,[descripcion,precio,cantidad,id], function(error,results) {
    if(error) {
      throw error
    }else {
      res.send(results)
    }
  })
})

// Borrar un articulo
app.delete('/api/articulos/:id',function(req,res) {
  let id = req.params.id
  conexion.query("DELETE FROM articulos WHERE id = ?",[id],function(error,results) {
    if(error) {
      throw error
    }else {
      res.send(results)
    }
  })
})
