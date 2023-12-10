function guardarrestaurante() {
    let id = document.getElementById("idrestaurante").value;
    let nombre = document.getElementById("nomrestaurante").value;
    let direccion = document.getElementById("direccion").value;
    let contacto = document.getElementById("contacto").value;
   
    if (id == '' || nombre == '' || direccion == '' || contacto == '') {
        localStorage.removeItem("objImage");
        Swal.fire({
            title: "Error",
            text: "Favor de llenar todos los campos.",
            icon: "success"
        });
        //alert("Favor de llenar todos los campos");
        return;
    }

    var imgplano = localStorage.getItem("objImage") || [];
    var restaurant = JSON.parse(localStorage.getItem("restaurante")) || [];

    let restaurant = {
        "idrestaurante": id, "nomrestaurante": nombre, "direccion": direccion,
        "contacto": contacto, "imgplano":imgplano
    }

    localStorage.setItem("restaurante", JSON.stringify(restaurant));
    localStorage.removeItem("objImage");

    Swal.fire({
        title: "Completo",
        text: "Registro completo.",
        icon: "success"
    });
    //alert("Registro completo");

}

function EditarRestaurante(id) {
    var restaurant = JSON.parse(localStorage.getItem("restaurante")) || [];

    var objid = document.getElementById("idrestaurante");
    var objnombre = document.getElementById("nomrestaurante");
    var objdireccion = document.getElementById("direccion");
    var objcontacto = document.getElementById("contacto");
    var objimgplano = document.getElementById("imgplano");

    objid.value = producto.idproducto;
    objnombre.value = producto.nomproducto;
    objdireccion.value = producto.descripcion;
    objcontacto.value = producto.contacto;
    objimgplano.value = producto.imgplano;
}

//Función mostrar formulario
function mostrarform(flag) {
    limpiar();
    if (flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);
        $("#btnagregar").hide();
    }
    else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
    }
}