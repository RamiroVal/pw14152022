<template>
	<div class="ClientesLista">
		<button class="btn btn-success btn-lg" @click.prevent="nuevoCliente()">
			Nuevo
		</button>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>No.</th>
					<th>Nombre</th>
					<th>Dirección</th>
					<th>RFC</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="cln in clientes" :key="cln.clave">
					<td>{{ cln.clave }}</td>
					<td>{{ cln.nombre }}</td>
					<td>{{ cln.direccion }}</td>
					<td>{{ cln.RFC }}</td>
					<td>
						<button
							class="btn btn-info"
							@click.prevent="editarCliente(cln.clave)"
						>
							Editar
						</button>
						<button
							class="btn btn-danger"
							@click.prevent="eliminarCliente(cln.clave, cln.nombre)"
						>
							Eliminar
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes.js";
import axios from "axios";

export default {
	name: "ClientesLista",
	components: {},
	data: function () {
		return {
			clientes: [],
		};
	},
	created() {
		this.traeClientes();
	},
	methods: {
		traeClientes: async function () {
			let c = [];
			await axios
				.get(URL_DATOS + "/clientes")
				.then(function (response) {
					// console.log(response);
					c = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.clientes = c;
		},
		editarCliente: function (id) {
			this.$router.push({ name: "editar-cliente", params: { id: id } });
		},
		eliminarCliente: async function (id, desc) {
			if (confirm("¿Seguro de eliminar al cliente " + desc + "?")) {
				const res = await axios.delete(URL_DATOS + "/clientes/" + id);
				this.traeClientes();
			}
		},
		nuevoCliente: function () {
			this.$router.push({ name: "nuevo-cliente", params: {} });
		},
	},
};
</script>

<style scoped lang="scss">
.btn {
	margin-right: 10px;
}
</style>
