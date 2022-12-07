<template>
	<div class="Editar">
		<h2>Datos del proveedor</h2>
		<br />
		<label for="txtnombre">Nombre</label>
		<input
			type="text"
			name="txtnombre"
			id="txtnombre"
			v-model="proveedores.nombre"
			class="form-control"
		/>
		<br />
		<label for="txtrfc">RFC</label>
		<input
			type="text"
			name="txtrfc"
			id="txtrfc"
			v-model="proveedores.RFC"
			class="form-control"
		/>
		<br />
		<label for="txtdireccion">Dirección</label>
		<input
			type="text"
			name="txtdireccion"
			id="txtdireccion"
			v-model="proveedores.direccion"
			class="form-control"
		/>
		<br />
		<label for="txttelefono">Teléfono</label>
		<input
			type="text"
			name="txttelefono"
			id="txttelefono"
			v-model="proveedores.telefono"
			class="form-control"
		/>
		<br />
		<div class="form-outline mb-4">
			<label class="form-label" for="txtobservaciones">Observaciones</label>
			<textarea
				class="form-control"
				id="txtobservaciones"
				v-model="proveedores.observaciones"
				rows="4"
			></textarea>
		</div>
		<br />
		<button @click.prevent="actualizar()" class="btn btn-primary btn-lg">
			Actualizar Proveedor
		</button>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes";
import axios from "axios";
export default {
	name: "editar-proveedor",
	components: {},
	props: {
		id: Number,
	},
	data: function () {
		return {
			proveedores: [],
		};
	},
	created() {
		this.traeDetalle();
	},
	methods: {
		traeDetalle: async function () {
			let p = [];
			await axios
				.get(URL_DATOS + "/proveedores/" + this.id)
				.then(function (response) {
					p = response.data[0];
				})
				.catch(function (error) {
					console.log(error);
				});
			this.proveedores = p;
		},
		actualizar: async function () {
			const res = await axios.put(URL_DATOS + "/proveedores/" + this.id, {
				nombre: this.proveedores.nombre,
				RFC: this.proveedores.RFC,
				direccion: this.proveedores.direccion,
				telefono: this.proveedores.telefono,
				observaciones: this.proveedores.observaciones,
			});
			alert(
				"El proveedor " + this.proveedores.nombre + " ha sido actualizado."
			);
			// console.log(res);
		},
	},
};
</script>

<style scoped lang="scss">
.Editar {
	font-size: 16px; /* 1em */
	margin: 0px auto;
	max-width: 1024px;
}
</style>
