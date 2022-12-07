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
							v-model="entrada.clave"
							required
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
							v-model="entrada.cantidad"
							required
						/>
					</div>
				</div>
			</div>

			<div class="row mb-4">
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="selproveedor">Proveedor</label>
						<select
							name="selproveedor"
							id="selproveedor"
							class="form-select form-select mb-3"
							v-model="entrada.proveedor"
							required
						>
							<option
								v-for="prov in proveedores"
								:key="prov.clave"
								:value="prov.clave"
							>
								{{ prov.nombre }}
							</option>
						</select>
					</div>
				</div>
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="txtcosto">Costo</label>
						<input
							type="number"
							id="txtcosto"
							class="form-control"
							v-model="entrada.costo"
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
			entrada: [],
			articulos: [],
			proveedores: [],
		};
	},
	created() {
		this.articulosID();
		this.proveedoresID();
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
		proveedoresID: async function () {
			let p = [];
			await axios
				.get(URL_DATOS + "/proveedoresid/")
				.then(function (response) {
					p = response.data;
				})
				.catch(function (error) {
					console.log(error);
				});
			this.proveedores = p;
		},
		nuevo: async function () {
			console.log(this.entrada);
			const res = await axios.post(URL_DATOS + "/entradas/", {
				clave: this.entrada.clave,
				cantidad: this.entrada.cantidad,
				costo: this.entrada.costo,
				proveedor: this.entrada.proveedor,
				entrada: true,
			});
			this.limpiar();
			alert("Se ha agregado una entrada.");
		},
		limpiar: function () {
			document.getElementById("txtcantidad").value = "";
			document.getElementById("txtcosto").value = "";
		},
	},
};
</script>
