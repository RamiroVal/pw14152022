<template>
	<div class="Nuevo">
		<form v-on:submit.prevent="nuevo()">
			<div class="row mb-4">
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="txtnombre">Nombre</label>
						<input
							type="text"
							id="txtnombre"
							class="form-control"
							v-model="proveedores.nombre"
							required
						/>
					</div>
				</div>
				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="txtrfc">RFC</label>
						<input
							type="text"
							id="txtrfc"
							class="form-control"
							v-model="proveedores.RFC"
							maxlength="13"
							required
						/>
					</div>
				</div>
			</div>

			<div class="form-group mb-4">
				<label class="form-label" for="txtdireccion">Dirección</label>
				<input
					type="text"
					id="txtdireccion"
					class="form-control"
					v-model="proveedores.direccion"
					required
				/>
			</div>

			<div class="form-outline mb-4">
				<label class="form-label" for="txttelefono">Teléfono</label>
				<input
					type="text"
					id="txttelefono"
					class="form-control"
					v-model="proveedores.telefono"
					required
				/>
			</div>

			<div class="form-outline mb-4">
				<label class="form-label" for="txtobservaciones">Observaciones</label>
				<textarea
					class="form-control"
					id="txtobservaciones"
					v-model="proveedores.observaciones"
					rows="4"
				></textarea>
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
	name: "NuevoProveedor",
	components: {},
	data: function () {
		return {
			proveedores: [],
		};
	},
	methods: {
		nuevo: async function () {
			const res = await axios.post(URL_DATOS + "/proveedores/", {
				nombre: this.proveedores.nombre,
				RFC: this.proveedores.RFC,
				direccion: this.proveedores.direccion,
				telefono: this.proveedores.telefono,
				observaciones: this.observaciones,
			});
			this.limpiar();
			alert("El proveedor " + this.proveedores.nombre + " se ha guardado.");
		},
		limpiar: function () {
			document.getElementById("txtnombre").value = "";
			document.getElementById("txtrfc").value = "";
			document.getElementById("txtdireccion").value = "";
			document.getElementById("txttelefono").value = "";
			document.getElementById("txtobservaciones").value = "";
		},
	},
};
</script>

<style scoped lang="scss">
.Nuevo {
	margin: 0px auto;
	max-width: 1024px;
}
</style>
