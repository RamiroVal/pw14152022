<template>
	<div class="home">
		<div class="imagenes">
			<img alt="huella1" src="../assets/huella.png" id="huella1" />
			<img alt="logo" src="../assets/doge.png" id="logo" />
			<img alt="huella2" src="../assets/huella.png" id="huella2" />
		</div>
		<HelloWorld msg="Bienvendio a la Doge Shop" />
		<div class="ab">
			<p alt="e1" id="e1">
				hay palabras que nos cambian la vida pero hay ladridos que nos cambian
				el alma
			</p>
			<br />
		</div>
		<div class="ab2">
			<br />
			<br />
			<br />
			<br />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
	name: "HomeView",
	components: {
		HelloWorld,
	},
};
</script>

<style scoped>
.home {
	background-color: rgb(244, 116, 69);
}
.ab {
	background-color: rgba(236, 202, 190, 0.905);
}
.ab2 {
	background-color: burlywood;
}

#logo {
	height: 375px;
	max-width: fit-content;
	display: inline-block;
}

#e1 {
	font-size: 65px;
	text-align: center;
	color: rgb(255, 255, 255);
	font-style: italic;
}
#huella1 {
	display: inline-block;
}

#huella2 {
	display: inline-block;
}
</style>
