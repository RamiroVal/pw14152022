let funcion = function(){
  alert("Le di click")
}

function darClick() {
  alert("di click")
}

function quitarSITEC() {
  let quitar = confirm("¿Seguro que quiere quitar SITEC?")
  if(quitar) {
    alert("Se fue SITEC")
    let arti = document.getElementById("sitec")
    arti.innerHTML = "Chale"
    console.log("Esto no se ve en la página, pero chale")
  }else {
    alert("No se fue SITEC")
  }
}