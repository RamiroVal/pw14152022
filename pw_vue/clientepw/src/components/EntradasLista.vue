<template>
	<div class="EntradasLista">
		<button class="btn btn-success btn-lg" @click.prevent="nuevaEntrada()">
			Nuevo
		</button>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>No.</th>
					<th>Articulo</th>
					<th>Cantidad</th>
					<th>Costo</th>
					<th>Proveedor</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="ent in entradas" :key="ent.id">
					<td>
						<a href="" @click.prevent="detalleEntradas(ent.id)">{{ ent.id }}</a>
					</td>
					<td>{{ ent.descripcion }}</td>
					<td>{{ ent.cantidad }}</td>
					<td>{{ ent.costo }}</td>
					<td>{{ ent.nombre }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes.js";
import axios from "axios";

export default {
	name: "EntradasLista",
	components: {},
	data: function () {
		return {
			entradas: [],
		};
	},
	created() {
		this.traeEntradas();
	},
	methods: {
		traeEntradas: async function () {
			let e = [];
			await axios
				.get(URL_DATOS + "/entradas")
				.then(function (response) {
					// console.log(response);
					e = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.entradas = e;
		},
		detalleEntradas: function (id) {
			this.$router.push({ name: "detalle-entradas", params: { id: id } });
		},
		editarProveedor: function (id) {
			this.$router.push({ name: "editar-proveedor", params: { id: id } });
		},
		eliminarProveedor: async function (id, desc) {
			if (confirm("¿Seguro de eliminar al proveedor " + desc + "?")) {
				const res = await axios.delete(URL_DATOS + "/proveedores/" + id);
				this.traeProveedores();
			}
		},
		nuevaEntrada: function () {
			this.$router.push({ name: "nuevo-entrada", params: {} });
		},
	},
};
</script>

<style scoped lang="scss">
.btn {
	margin-right: 10px;
}
</style>
