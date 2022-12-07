<template>
	<div class="Detalle">
		Articulo número: {{ id }}
		<br />
		ID del Articulo: {{ entradas.IDArticulo }}
		<br />
		Cantidad de entrada: {{ entradas.Cantidadentrada }}
		<br />
		Costo de entrada: {{ entradas.Costoentrada }}
		<br />
		Articulo: {{ entradas.descripcion }}
		<br />
		Precio de venta: {{ entradas.PrecioVenta }}
		<br />
		Cantidad total de articulos: {{ entradas.Cantidadtotal }}
		<br />
		ID del Proveedor: {{ entradas.IDProveedor }}
		<br />
		Proveedor: {{ entradas.Proveedor }}
		<br />
		RFC: {{ entradas.RFC }}
		<br />
		Direccion: {{ entradas.direccion }}
		<br />
		Telefono: {{ entradas.telefono }}
		<br />
		Observaciones: {{ entradas.observaciones }}
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes";
import axios from "axios";
export default {
	name: "Detalle",
	components: {},
	props: {
		id: Number,
	},
	data: function () {
		return {
			entradas: [],
		};
	},
	created() {
		this.traeDetalle();
	},
	methods: {
		traeDetalle: async function () {
			let e = [];
			await axios
				.get(URL_DATOS + "/entradas_detalle/" + this.id)
				.then(function (response) {
					e = response.data[0];
				})
				.catch(function (error) {
					console.log(error);
				});
			this.entradas = e;
		},
	},
};
</script>
