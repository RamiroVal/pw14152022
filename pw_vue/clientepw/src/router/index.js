import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Articulos from "../views/Articulos.vue";
import Proveedores from "../views/Proveedores.vue";
import Clientes from "../views/Clientes.vue";
import Entradas from "../views/Entradas.vue";
import Salidas from "../views/Salidas.vue";
import Detalle from "../components/Detalle.vue";
import Editar from "../components/Editar.vue";
import EditarProveedor from "../components/EditarProveedor.vue";
import Nuevo from "../components/Nuevo.vue";
import NuevoProveedor from "../components/NuevoProveedor.vue";
import EditarCliente from "../components/EditarCliente.vue";
import NuevoCliente from "../components/NuevoCliente.vue";
import DetalleEntradas from "../components/DetalleEntradas.vue";
import NuevoEntrada from "../components/NuevoEntrada.vue";
import NuevoSalida from "../components/NuevoSalida.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/articulos",
		name: "articulos",
		component: Articulos,
	},
	{
		path: "/proveedores",
		name: "proveedores",
		component: Proveedores,
	},
	{
		path: "/clientes",
		name: "clientes",
		component: Clientes,
	},
	{
		path: "/entradas",
		name: "entradas",
		component: Entradas,
	},
	{
		path: "/salidas",
		name: "salidas",
		component: Salidas,
	},
	{
		path: "/detalle",
		name: "detalle",
		component: Detalle,
		props: true,
	},
	{
		path: "/detalle-entradas",
		name: "detalle-entradas",
		component: DetalleEntradas,
		props: true,
	},
	{
		path: "/editar",
		name: "editar",
		component: Editar,
		props: true,
	},
	{
		path: "/editar-proovedor",
		name: "editar-proveedor",
		component: EditarProveedor,
		props: true,
	},
	{
		path: "/editar-cliente",
		name: "editar-cliente",
		component: EditarCliente,
		props: true,
	},
	{
		path: "/nuevo",
		name: "nuevo",
		component: Nuevo,
	},
	{
		path: "/nuevo-proveedor",
		name: "nuevo-proveedor",
		component: NuevoProveedor,
	},
	{
		path: "/nuevo-cliente",
		name: "nuevo-cliente",
		component: NuevoCliente,
	},
	{
		path: "/nuevo-entrada",
		name: "nuevo-entrada",
		component: NuevoEntrada,
	},
	{
		path: "/nuevo-salida",
		name: "nuevo-salida",
		component: NuevoSalida,
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: function () {
			return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
