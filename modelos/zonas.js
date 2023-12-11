function guardarzona() {
    let id = document.getElementById("idzona").value;
    let descripcion = document.getElementById("descripcion").value;
    let estado = document.querySelector('input[name="estado"]:checked').value;
    //let recomendado = document.getElementById("recomendado").value;

    if (id == '' || descripcion == '' || estado == '') {
        Swal.fire({
            title: "Error",
            text: "Favor de llenar todos los campos.",
            icon: "success"
        });
        //alert("Favor de llenar todos los campos");
        return;
    }

    var zona = JSON.parse(localStorage.getItem("zonas")) || [];

    var a_zonas = zona.filter(function (zonas_f) {
        return (zonas_f.idzona == id);
    });

    if (a_zonas.length > 0) {
        Swal.fire({
            title: "Error",
            text: "Zona ya existe.",
            icon: "success"
        });
        return;
    }

    let zonas_r = {
        "idzona": id, "descripcion": descripcion,"estado": estado,
    }
    zona.push(zonas_r);

    localStorage.setItem("zonas", JSON.stringify(zona));

    Swal.fire({
        title: "Completo",
        text: "Registro completo.",
        icon: "success"
    });
    //alert("Registro completo");

}

function Leerzona(elem) {
    var zona = JSON.parse(localStorage.getItem("zonas")) || [];

    switch (elem) {
        case 'table':
            var tblZonas = document.getElementById("tblZonas");

            tblZonas.innerHTML = "";
            zona.forEach(function (zonas) {
                
                var cadena = `<tr>
                                    <td>
                                        <button class="btn btn-primary" onclick="EditarZona(${zonas.idzona})">
                                            Editar 
                                        </button>
                                        
                                        <button class="btn btn-warning" onclick="EliminarZona(${zonas.idzona})">
                                            Eliminar 
                                        </button>
                                    </td>
                                    <td>${zonas.idzona}</td>
                                    <td>${zonas.descripcion}</td>
                                    <td>${zonas.estado}</td>
                                </tr>`;
                tblZonas.innerHTML += cadena;
            });
            break

        case 'select':
            var selZonas = document.getElementById("idzona");

            selZonas.innerHTML = "";
            zona.forEach(function (zonas) {
                if(zonas.estado == "1"){
                    var cadena = `<option value="${zonas.idzona}">${zonas.descripcion}</optrion>`;
                    selZonas.innerHTML += cadena;
                }
            });
            break
    }
}

function EditarZona(id) {
    var zona = JSON.parse(localStorage.getItem("zonas")) || [];

    var zonas = zona.find(function (zonas) {
        return zonas.idzona == id;
    });

    var objid = document.getElementById("idzona");
    var objdescripcion = document.getElementById("descripcion");
    //var objestado = document.getElementById("estado");

    objid.value = zonas.idzona;
    objdescripcion.value = zonas.descripcion
    //objestado.value = zonas.estado;
    
    mostrarform('zonas',false)
}

function EliminarZona(id) {
    var zona = JSON.parse(localStorage.getItem("zonas")) || [];

    var zonasFiltrados = zona.filter(function (zonas) {
        return zonas.idzona != id;
    });

    localStorage.setItem("zonas", JSON.stringify(zonasFiltrados));
    Leerzona('table');
}