<template>
	<div class="EntradasLista">
		<button class="btn btn-success btn-lg" @click.prevent="nuevaSalida()">
			Nuevo
		</button>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>No.</th>
					<th>Articulo</th>
					<th>Cantidad</th>
					<th>Costo de Venta</th>
					<th>Cliente</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="sal in salidas" :key="sal.id">
					<td>{{ sal.id }}</td>
					<td>{{ sal.descripcion }}</td>
					<td>{{ sal.cantidad }}</td>
					<td>{{ sal.venta }}</td>
					<td>{{ sal.nombre }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes.js";
import axios from "axios";

export default {
	name: "SalidaLista",
	components: {},
	data: function () {
		return {
			salidas: [],
		};
	},
	created() {
		this.traeSalidas();
	},
	methods: {
		traeSalidas: async function () {
			let s = [];
			await axios
				.get(URL_DATOS + "/salidas")
				.then(function (response) {
					// console.log(response);
					s = response.data;
				})
				.catch(function (error) {});
			this.salidas = s;
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
		nuevaSalida: function () {
			this.$router.push({ name: "nuevo-salida", params: {} });
		},
	},
};
</script>

<style scoped lang="scss">
.btn {
	margin-right: 10px;
}
</style>
