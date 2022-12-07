<template>
	<div id="app">
		<nav>
			<router-link to="/">Inicio</router-link> |
			<router-link to="/about">About</router-link> |
			<router-link to="/articulos">Articulos</router-link> |
			<router-link to="/proveedores">Proveedores</router-link> |
			<router-link to="/clientes">Clientes</router-link> |
			<router-link to="/entradas">Entradas</router-link> |
			<router-link to="/salidas">Salidas</router-link>
		</nav>
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	background-color: rgba(236, 202, 190, 0.905);
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: rgb(244, 116, 69);
		}
	}
}
</style>
