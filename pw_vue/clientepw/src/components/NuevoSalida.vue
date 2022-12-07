<template>
	<div class="Nuevo">
		<form v-on:submit.prevent="nuevo()">
			<div class="row mb-4">
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="selarticulo">Articulo</label>
						<select
							name="selarticulo"
							id="selarticulo"
							class="form-select form-select mb-3"
							v-model="salida.articulo"
							required
							v-on:change="determinaPrecio()"
						>
							<option v-for="art in articulos" :key="art.id" :value="art.id">
								{{ art.descripcion }}
							</option>
						</select>
					</div>
				</div>
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="txtcantidad">Cantidad</label>
						<input
							type="number"
							id="txtcantidad"
							class="form-control"
							v-model="salida.cantidad"
							v-on:change="determinaPrecio()"
							required
						/>
					</div>
				</div>
			</div>

			<div class="row mb-4">
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="selproveedor">Cliente</label>
						<select
							name="selproveedor"
							id="selproveedor"
							class="form-select form-select mb-3"
							v-model="salida.cliente"
							v-on:change="determinaPrecio()"
							required
						>
							<option
								v-for="cln in clientes"
								:key="cln.clave"
								:value="cln.clave"
							>
								{{ cln.nombre }}
							</option>
						</select>
					</div>
				</div>
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="txtcosto">Valor de Venta</label>
						<input
							type="number"
							id="txtcosto"
							class="form-control"
							v-model="salida.venta"
							disabled
							required
						/>
					</div>
				</div>
			</div>
			<button type="submit" class="btn btn-primary btn-block mb-4">
				Agregar
			</button>
		</form>
	</div>
</template>

<script>
import { URL_DATOS } from "../utils/constantes.js";
import axios from "axios";

export default {
	name: "NuevoEntrada",
	components: {},
	data: function () {
		return {
			salida: [],
			articulos: [],
			articulo: [],
			clientes: [],
		};
	},
	created() {
		this.articulosID();
		this.clientesID();
		this.salida.cantidad = 1;
	},
	methods: {
		articulosID: async function () {
			let a = [];
			await axios
				.get(URL_DATOS + "/articulosid/")
				.then(function (response) {
					a = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.articulos = a;
		},
		clientesID: async function () {
			let c = [];
			await axios
				.get(URL_DATOS + "/clientesid/")
				.then(function (response) {
					c = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.clientes = c;
		},
		nuevo: async function () {
			const res = await axios.post(URL_DATOS + "/salidas/", {
				clave: this.salida.articulo,
				cantidad: this.salida.cantidad,
				costo: this.salida.venta,
				cliente: this.salida.cliente,
				entrada: false,
			});
			this.limpiar();
			alert("Se ha agregado una salida.");
		},
		limpiar: function () {
			document.getElementById("txtcantidad").value = "";
			document.getElementById("txtcosto").value = "";
		},
		determinaPrecio: async function () {
			if (this.salida.articulo !== undefined) {
				let a = [];
				await axios
					.get(URL_DATOS + "/articulos/" + this.salida.articulo)
					.then(function (response) {
						a = response.data;
					})
					.catch(function (error) {
						console.log(error);
					});
				if (this.salida.cantidad > a[0].cantidad) {
					document.getElementById("txtcantidad").value = a[0].cantidad;
				}
				document.getElementById("txtcosto").value =
					a[0].precio * this.salida.cantidad;
				this.salida.venta = a[0].precio * this.salida.cantidad;
			}
		},
	},
};
</script>
