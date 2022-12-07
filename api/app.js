let express = require("express");
let mysql = require("mysql");
let cors = require("cors");
let app = express();

// El servidor entienda JSON
app.use(express.json());
// Acepte solicitudes del FrontEnd (Cliente)
app.use(cors());

let puerto = 3001;
app.listen(puerto, function () {
	console.log("Servidor en línea");
});

// Base de datos
// Parámetros de conexión
let conexion = mysql.createConnection({
	host: "localhost",
	user: "pw",
	password: "12345678",
	database: "pw",
});

// Conectarnos a la base de datos
conexion.connect(function (error) {
	if (error) {
		throw error;
	} else {
		console.log("Conectado a la BD");
	}
});

// Rutas de acceso
app.get("/", function (req, res) {
	res.send("Ruta de inicio");
}); // Ruta raiz

/**************************************************
 * ************************************************
 * ************************************************
 * *******************ARTICULOS********************
 * ************************************************
 * ************************************************
 *************************************************/

// Todos los artículos
app.get("/api/articulos/", function (req, res) {
	conexion.query("SELECT * FROM articulos", function (error, filas) {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

// Solo un artículo
app.get("/api/articulos/:id", function (req, res) {
	conexion.query(
		"SELECT * FROM articulos where id = ?",
		[req.params.id],
		function (error, fila) {
			if (error) {
				throw error;
			} else {
				res.send(fila);
			}
		}
	);
});

// Articulos por descripcion
app.get("/api/articulosdesc/:desc", function (req, res) {
	let desc = "%" + req.params.desc + "%";
	conexion.query(
		"SELECT * FROM articulos where descripcion LIKE ?",
		[desc],
		function (error, fila) {
			if (error) {
				throw error;
			} else {
				res.send(fila);
			}
		}
	);
});

// ID y descripcion de los articulos
app.get("/api/articulosid/", function (req, res) {
	conexion.query(
		"SELECT id, descripcion FROM articulos",
		function (error, filas) {
			if (error) {
				throw error;
			} else {
				res.send(filas);
			}
		}
	);
});

// Agregar un artículo
app.post("/api/articulos", function (req, res) {
	// Post es para hacer nuevas inserciones, put es para actualizar
	let data = {
		descripcion: req.body.descripcion,
		precio: req.body.precio,
		cantidad: req.body.cantidad,
	};

	let sql = "INSERT INTO articulos SET ?";

	conexion.query(sql, data, function (error, results) {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

// Actualizar articulo
app.put("/api/articulos/:id", function (req, res) {
	let id = req.params.id;
	let descripcion = req.body.descripcion;
	let precio = req.body.precio;
	let cantidad = req.body.cantidad;
	let sql =
		"UPDATE articulos SET descripcion = ?, precio = ?, cantidad = ? where id = ?";
	conexion.query(
		sql,
		[descripcion, precio, cantidad, id],
		function (error, results) {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

// Borrar un articulo
app.delete("/api/articulos/:id", function (req, res) {
	let id = req.params.id;
	conexion.query(
		"DELETE FROM articulos WHERE id = ?",
		[id],
		function (error, results) {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

/**************************************************
 * ************************************************
 * ************************************************
 * ******************PROVEEDORES*******************
 * ************************************************
 * ************************************************
 *************************************************/

// Todos los proveedores
app.get("/api/proveedores/", function (req, res) {
	conexion.query("SELECT * FROM proveedores", function (error, filas) {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

// Solo un proveedor
app.get("/api/proveedores/:clave", function (req, res) {
	conexion.query(
		"SELECT * FROM proveedores where clave = ?",
		[req.params.clave],
		function (error, fila) {
			if (error) {
				throw error;
			} else {
				res.send(fila);
			}
		}
	);
});

// Proveedores por nombre
app.get("/api/proveedoresnom/:nom", function (req, res) {
	let nombre = "%" + req.params.nom + "%";
	conexion.query(
		"SELECT * FROM proveedores where nombre LIKE ?",
		[nombre],
		function (error, fila) {
			if (error) {
				throw error;
			} else {
				res.send(fila);
			}
		}
	);
});

// ID y nombre del proveedor
app.get("/api/proveedoresid/", function (req, res) {
	conexion.query(
		"SELECT clave, nombre FROM proveedores",
		function (error, filas) {
			if (error) {
				throw error;
			} else {
				res.send(filas);
			}
		}
	);
});

// Agregar un proveedor
app.post("/api/proveedores", function (req, res) {
	let data = {
		nombre: req.body.nombre,
		rfc: req.body.RFC,
		direccion: req.body.direccion,
		telefono: req.body.telefono,
		observaciones:
			req.body.observaciones === undefined ? "N/A" : req.body.observaciones,
	};

	let sql = "INSERT INTO proveedores SET ?";

	conexion.query(sql, data, function (error, results) {
		if (error) {
			console.log("Observaciones:", data.observaciones);
			throw error;
		} else {
			res.send(results);
		}
	});
});

// Actualizar proveedor
app.put("/api/proveedores/:clave", function (req, res) {
	let clave = req.params.clave;
	let nombre = req.body.nombre;
	let rfc = req.body.RFC;
	let direccion = req.body.direccion;
	let telefono = req.body.telefono;
	let observaciones = req.body.observaciones;
	let sql =
		"UPDATE proveedores SET nombre = ?, rfc = ?, direccion = ?, telefono = ?, observaciones = ? where clave = ?";
	conexion.query(
		sql,
		[nombre, rfc, direccion, telefono, observaciones, clave],
		function (error, results) {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

// Borrar un proveedor
app.delete("/api/proveedores/:clave", function (req, res) {
	let clave = req.params.clave;
	conexion.query(
		"DELETE FROM proveedores WHERE clave = ?",
		[clave],
		function (error, results) {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

/**************************************************
 * ************************************************
 * ************************************************
 * *******************CLIENTES*********************
 * ************************************************
 * ************************************************
 *************************************************/

// Todos los clientes
app.get("/api/clientes/", function (req, res) {
	conexion.query("SELECT * FROM clientes", function (error, filas) {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

// Solo un cliente
app.get("/api/clientes/:clave", function (req, res) {
	conexion.query(
		"SELECT * FROM clientes where clave = ?",
		[req.params.clave],
		function (error, fila) {
			if (error) {
				throw error;
			} else {
				res.send(fila);
			}
		}
	);
});

// ID y descripcion de los articulos
app.get("/api/clientesid/", function (req, res) {
	conexion.query("SELECT clave, nombre FROM clientes", function (error, filas) {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

// Agregar un cliente
app.post("/api/clientes", function (req, res) {
	let data = {
		nombre: req.body.nombre,
		direccion: req.body.direccion,
		rfc: req.body.RFC,
	};

	let sql = "INSERT INTO clientes SET ?";

	conexion.query(sql, data, function (error, results) {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});
});

// Actualizar cliente
app.put("/api/clientes/:clave", function (req, res) {
	let clave = req.params.clave;
	let nombre = req.body.nombre;
	let direccion = req.body.direccion;
	let rfc = req.body.RFC;
	let sql =
		"UPDATE clientes SET nombre = ?, direccion = ?, rfc = ? where clave = ?";
	conexion.query(
		sql,
		[nombre, direccion, rfc, clave],
		function (error, results) {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

// Borrar un cliente
app.delete("/api/clientes/:clave", function (req, res) {
	let clave = req.params.clave;
	conexion.query(
		"DELETE FROM clientes WHERE clave = ?",
		[clave],
		function (error, results) {
			if (error) {
				throw error;
			} else {
				res.send(results);
			}
		}
	);
});

/**************************************************
 * ************************************************
 * ************************************************
 * *******************ENTRADAS*********************
 * ************************************************
 * ************************************************
 *************************************************/

// Todas las entradas
app.get("/api/entradas/", function (req, res) {
	conexion.query(
		`
			SELECT e.id, a.descripcion, e.cantidad, e.costo, p.nombre FROM entradas AS e INNER JOIN articulos AS a ON e.articuloid = a.id INNER JOIN
			proveedores AS p on e.proveedorid = p.clave`,
		function (error, filas) {
			if (error) {
				throw error;
			} else {
				res.send(filas);
			}
		}
	);
});

// Detalle de entrada
app.get("/api/entradas_detalle/:id", function (req, res) {
	conexion.query(
		`SELECT e.id, e.articuloid AS IDArticulo, e.cantidad AS Cantidadentrada, e.costo AS Costoentrada, a.descripcion, a.precio AS PrecioVenta, a.cantidad AS 
		Cantidadtotal, p.clave AS IDProveedor, p.nombre AS Proveedor, p.RFC, p.direccion, p.telefono, p.observaciones FROM entradas AS e INNER JOIN articulos AS 
		a ON e.articuloid = a.id INNER JOIN proveedores AS p on e.proveedorid = p.clave where e.id = ?`,
		[req.params.id],
		function (error, filas) {
			if (error) {
				throw error;
			} else {
				res.send(filas);
			}
		}
	);
});

// Agregar una entrada
app.post("/api/entradas", function (req, res) {
	let data = {
		articuloid: req.body.clave,
		cantidad: req.body.cantidad,
		costo: req.body.costo,
		proveedorid: req.body.proveedor,
	};

	let sql = "INSERT INTO entradas SET ?";

	conexion.query(sql, data, function (error, results) {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});

	cambiarExistencia(req.body.entrada, data.articuloid, data.cantidad);
});

// Actualizar articulo
function cambiarExistencia(agrega, id, cantidad) {
	let sql = agrega
		? "UPDATE articulos SET cantidad = cantidad + ? where id = ?"
		: "UPDATE articulos SET cantidad = cantidad - ? where id = ?";
	conexion.query(sql, [cantidad, id], function (error, results) {
		if (error) {
			throw error;
		}
	});
}

app.get("/api/proveedores/", function (req, res) {
	conexion.query("SELECT * FROM proveedores", function (error, filas) {
		if (error) {
			throw error;
		} else {
			res.send(filas);
		}
	});
});

/**************************************************
 * ************************************************
 * ************************************************
 * ********************SALIDAS*********************
 * ************************************************
 * ************************************************
 *************************************************/

// Todas las salidas
app.get("/api/salidas/", function (req, res) {
	conexion.query(
		`SELECT s.id, a.descripcion, s.cantidad, s.venta, c.nombre FROM salidas AS s INNER JOIN articulos AS a ON s.articulo = a.id INNER JOIN
	 clientes AS c on c.clave = s.cliente`,
		function (error, filas) {
			if (error) {
				throw error;
			} else {
				res.send(filas);
			}
		}
	);
});

// Agregar una salida
app.post("/api/salidas", function (req, res) {
	let data = {
		articulo: req.body.clave,
		cantidad: req.body.cantidad,
		venta: req.body.costo,
		cliente: req.body.cliente,
	};
	console.log(data);

	let sql = "INSERT INTO salidas SET ?";

	conexion.query(sql, data, function (error, results) {
		if (error) {
			throw error;
		} else {
			res.send(results);
		}
	});

	cambiarExistencia(req.body.entrada, data.articulo, data.cantidad);
});
