<template>
	<div class="Editar">
		<h2>Datos del cliente</h2>
		<br />
		<label for="txtnombre">Nombre</label>
		<input
			type="text"
			name="txtnombre"
			id="txtnombre"
			v-model="clientes.nombre"
			class="form-control"
			required
		/>
		<br />
		<label for="txtdireccion">Dirección</label>
		<input
			type="text"
			name="txtdireccion"
			id="txtdireccion"
			v-model="clientes.direccion"
			class="form-control"
			required
		/>
		<br />
		<label for="txtrfc">RFC</label>
		<input
			type="text"
			name="txtrfc"
			id="txtrfc"
			v-model="clientes.RFC"
			class="form-control"
			required
		/>
		<br />
		<button @click.prevent="actualizar()" class="btn btn-primary btn-lg">
			Actualizar Cliente
		</button>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes";
import axios from "axios";
export default {
	name: "editar-cliente",
	components: {},
	props: {
		id: Number,
	},
	data: function () {
		return {
			clientes: [],
		};
	},
	created() {
		this.traeDetalle();
	},
	methods: {
		traeDetalle: async function () {
			let c = [];
			await axios
				.get(URL_DATOS + "/clientes/" + this.id)
				.then(function (response) {
					c = response.data[0];
				})
				.catch(function (error) {
					console.log(error);
				});
			this.clientes = c;
		},
		actualizar: async function () {
			const res = await axios.put(URL_DATOS + "/clientes/" + this.id, {
				nombre: this.clientes.nombre,
				RFC: this.clientes.RFC,
				direccion: this.clientes.direccion,
			});
			if (res.statusText == "OK") {
				alert("El cliente " + this.clientes.nombre + " ha sido actualizado.");
			}
		},
	},
};
</script>

<style scoped lang="scss">
.Editar {
	margin: 0px auto;
	max-width: 1024px;
}
</style>
