<template>
	<div class="ProveedoresLista">
		<section class="row mb-4">
			<form class="col" v-on:submit.prevent="buscar()">
				<input
					list="proveedores"
					type="text"
					class="form-control txtbuscar"
					placeholder="Proveedor"
					v-model="nombre"
				/>
				<datalist id="proveedores">
					<option v-for="prov in proveedores" :key="prov.clave">
						{{ prov.nombre }}
					</option>
				</datalist>
				<button type="submit" class="btn btn-info busc">Buscar</button>
			</form>
			<div class="col">
				<button
					class="btn btn-success btn-lg"
					@click.prevent="nuevoProveedor()"
				>
					Nuevo
				</button>
			</div>
		</section>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>No.</th>
					<th>Nombre</th>
					<th>RFC</th>
					<th>Dirección</th>
					<th>Teléfono</th>
					<th>Observaciones</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="prov in proveedores" :key="prov.clave">
					<td>{{ prov.clave }}</td>
					<td>{{ prov.nombre }}</td>
					<td>{{ prov.RFC }}</td>
					<td>{{ prov.direccion }}</td>
					<td>{{ prov.telefono }}</td>
					<td>{{ prov.observaciones }}</td>
					<td>
						<button
							class="btn btn-info"
							@click.prevent="editarProveedor(prov.clave)"
						>
							Editar
						</button>
						<button
							class="btn btn-danger"
							@click.prevent="eliminarProveedor(prov.clave, prov.nombre)"
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
	name: "ProveedoresLista",
	components: {},
	data: function () {
		return {
			proveedores: [],
			nombre: "",
		};
	},
	created() {
		this.traeProveedores();
	},
	methods: {
		traeProveedores: async function () {
			let p = [];
			await axios
				.get(URL_DATOS + "/proveedores")
				.then(function (response) {
					// console.log(response);
					p = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.proveedores = p;
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
		nuevoProveedor: function () {
			this.$router.push({ name: "nuevo-proveedor", params: {} });
		},
		buscar: async function () {
			if (this.nombre === "") {
				this.traeProveedores();
				return;
			}
			let a = [];
			await axios
				.get(URL_DATOS + "/proveedoresnom/" + this.nombre)
				.then(function (response) {
					// console.log(response);
					a = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.proveedores = a;
		},
	},
};
</script>

<style scoped lang="scss">
.btn {
	margin-right: 10px;
}

.txtbuscar {
	width: 200px;
	display: inline-block;
}

.busc {
	margin-left: 10px;
}
</style>
