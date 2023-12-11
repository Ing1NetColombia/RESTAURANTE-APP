function guardarmesa() {
    let id = document.getElementById("idmesas").value;
    let descripcion = document.getElementById("descripcion").value;
    let zona = document.getElementById("idzona").value;
    let puestos = document.getElementById("puestos").value;

    let estado = document.querySelector('input[name="estado"]:checked').value;
   
    if (id == '' || descripcion == '' || puestos == '' || estado == '' || zona == '') {
        Swal.fire({
            title: "Error",
            text: "Favor de llenar todos los campos.",
            icon: "success"
        });
        //alert("Favor de llenar todos los campos");
        return;
    }

    var mesa = JSON.parse(localStorage.getItem("mesas")) || [];

    var a_mesas = mesa.filter(function (mesas_f) {
        return (mesas_f.idmesas == id);
    });

    if (a_mesas.length > 0) {
        Swal.fire({
            title: "Error",
            text: "Producto ya existe.",
            icon: "success"
        });
        return;
    }

    let mesas_r = {
        "idmesas": id, "descripcion": descripcion,"puestos": puestos, "idzona": zona, "estado": estado
    }
    mesa.push(mesas_r);

    localStorage.setItem("mesas", JSON.stringify(mesa));

    Swal.fire({
        title: "Completo",
        text: "Registro completo.",
        icon: "success"
    });
    //alert("Registro completo");

}

function Leermesa(elem) {
    var mesa = JSON.parse(localStorage.getItem("mesas")) || [];

    switch (elem) {
        case 'table':
            var tblMesas = document.getElementById("tblMesas");

            tblMesas.innerHTML = "";
            mesa.forEach(function (mesas) {
                var cadena = `<tr>
                                    <td>
                                        <button class="btn btn-primary" onclick="EditarMesa(${mesas.idmesas})">
                                            Editar 
                                        </button>
                                        
                                        <button class="btn btn-warning" onclick="EliminarMesa(${mesas.idmesas})">
                                            Eliminar 
                                        </button>
                                    </td>
                                    <td>${mesas.idmesas}</td>
                                    <td>${mesas.descripcion}</td>
                                    <td>${mesas.puestos}</td>
                                    <td>${mesas.idzona}</td>
                                    <td>${mesas.estado}</td> 
                                </tr>`;
                tblMesas.innerHTML += cadena;
            });
            break

            case 'select':
                var selMesa = document.getElementById("idmesa");
    
                selMesa.innerHTML = "";
                mesa.forEach(function (mesas) {
                    if(mesas.estado == "1"){
                        var cadena = `<option value="${mesas.idmesas}">${mesas.descripcion}</optrion>`;
                        selMesa.innerHTML += cadena;
                    }
                });
                break
    }
}

function EditarMesa(id) {
    var mesa = JSON.parse(localStorage.getItem("mesas")) || [];

    var mesas = produc.find(function (mesas) {
        return mesas.idmesas == id;
    });

    var objid = document.getElementById("idmesas");
    var objdescripcion = document.getElementById("descripcion");
    var objpuestos = document.getElementById("puestos");
    var objestado = document.getElementById("estado");

    objid.value = producto.idmesas;
    objdescripcion.value = producto.descripcion
    objpuestos.value = producto.puestos
    objestado.value = producto.estado;
}

function EliminarMesa(id) {
    var mesa = JSON.parse(localStorage.getItem("mesas")) || [];

    var mesaFiltrados = mesa.filter(function (mesas) {
        return mesas.idmesas != id;
    });

    localStorage.setItem("mesas", JSON.stringify(mesaFiltrados));
    Leerproductos('table');
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