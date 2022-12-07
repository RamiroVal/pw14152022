<template>
	<div class="ArticulosLista">
		<section class="row mb-4">
			<form class="col" v-on:submit.prevent="buscar()">
				<input
					list="articulos"
					type="text"
					class="form-control txtbuscar"
					placeholder="Articulo"
					v-model="descripcion"
				/>
				<datalist id="articulos">
					<option v-for="art in articulos" :key="art.id">
						{{ art.descripcion }}
					</option>
				</datalist>
				<button type="submit" class="btn btn-info busc">Buscar</button>
			</form>
			<div class="col">
				<button class="btn btn-success btn-lg" @click.prevent="nuevoArticulo()">
					Nuevo
				</button>
			</div>
		</section>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>No.</th>
					<th>Descripción</th>
					<th>Precio</th>
					<th>Cantidad</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="art in articulos" :key="art.id">
					<td>
						<a href="" @click.prevent="detalleArticulo(art.id)">{{ art.id }}</a>
					</td>
					<td>{{ art.descripcion }}</td>
					<td>{{ art.precio }}</td>
					<td>{{ art.cantidad }}</td>
					<td>
						<button
							class="btn btn-info"
							@click.prevent="editarArticulo(art.id)"
						>
							Editar
						</button>
						<button
							class="btn btn-danger"
							@click.prevent="eliminarArticulo(art.id, art.descripcion)"
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
	name: "ArticulosLista",
	components: {},
	data: function () {
		return {
			articulos: [],
			descripcion: "",
		};
	},
	created() {
		this.traeArticulos();
	},
	methods: {
		traeArticulos: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/articulos")
				.then(function (response) {
					// console.log(response);
					a = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.articulos = a;
		},
		detalleArticulo: function (id) {
			this.$router.push({ name: "detalle", params: { id: id } });
		},
		editarArticulo: function (id) {
			this.$router.push({ name: "editar", params: { id: id } });
		},
		eliminarArticulo: async function (id, desc) {
			if (confirm("¿Seguro de eliminar el artículo " + desc + "?")) {
				const res = await axios.delete(URL_DATOS + "/articulos/" + id);
				this.traeArticulos();
			}
		},
		nuevoArticulo: function () {
			this.$router.push({ name: "nuevo", params: {} });
		},
		buscar: async function () {
			if (this.descripcion === "") {
				this.traeArticulos();
				return;
			}
			let a = [];
			await axios
				.get(URL_DATOS + "/articulosdesc/" + this.descripcion)
				.then(function (response) {
					// console.log(response);
					a = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.articulos = a;
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
