<template>
	<div class="Nuevo">
		<h2>Datos del artículo - Nuevo</h2>
		<br />
		<label for="txtdescripcion">Descripción</label>
		<input
			type="text"
			name="txtdescripcion"
			id="txtdescripcion"
			v-model="articulos.descripcion"
			class="form-control"
			required
		/>
		<br />
		<label for="txtcantidad">Cantidad</label>
		<input
			disabled
			type="text"
			name="txtcantidad"
			id="txtcantidad"
			v-model="articulos.cantidad"
			class="form-control"
			required
		/>
		<br />
		<label for="txtprecio">Precio</label>
		<input
			type="text"
			name="txtprecio"
			id="txtprecio"
			v-model="articulos.precio"
			class="form-control"
			required
		/>
		<br />
		<button @click.prevent="nuevo()" class="btn btn-primary btn-lg">
			Nuevo artículo
		</button>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes.js";
import axios from "axios";

export default {
	name: "Nuevo",
	components: {},
	data: function () {
		return {
			articulos: [],
		};
	},
	created() {
		this.articulos.cantidad = 0;
	},
	methods: {
		nuevo: async function () {
			const res = await axios.post(URL_DATOS + "/articulos/", {
				descripcion: this.articulos.descripcion,
				precio: this.articulos.precio,
				cantidad: this.articulos.cantidad,
			});
			this.limpiar();
			alert("El articuo " + this.articulos.descripcion + " se ha guardado.");
		},
		limpiar: function () {
			document.getElementById("txtdescripcion").value = "";
			document.getElementById("txtcantidad").value = "";
			document.getElementById("txtprecio").value = "";
		},
	},
};
</script>
