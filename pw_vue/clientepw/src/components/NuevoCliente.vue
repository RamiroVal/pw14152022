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
							v-model="clientes.nombre"
							required
						/>
					</div>
				</div>

				<div class="form-group mb-4">
					<label class="form-label" for="txtdireccion">Dirección</label>
					<input
						type="text"
						id="txtdireccion"
						class="form-control"
						v-model="clientes.direccion"
						required
					/>
				</div>

				<div class="col">
					<div class="form-outline">
						<label class="form-label" for="txtrfc">RFC</label>
						<input
							type="text"
							id="txtrfc"
							class="form-control"
							v-model="clientes.RFC"
							maxlength="13"
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
	name: "NuevoCliente",
	components: {},
	data: function () {
		return {
			clientes: [],
		};
	},
	methods: {
		nuevo: async function () {
			const res = await axios.post(URL_DATOS + "/clientes/", {
				nombre: this.clientes.nombre,
				direccion: this.clientes.direccion,
				RFC: this.clientes.RFC,
			});
			this.limpiar();
			alert("El cliente " + this.clientes.nombre + " se ha guardado.");
		},
		limpiar: function () {
			document.getElementById("txtnombre").value = "";
			document.getElementById("txtdireccion").value = "";
			document.getElementById("txtrfc").value = "";
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
