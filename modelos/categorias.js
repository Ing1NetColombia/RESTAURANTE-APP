function guardarcategoria() {
    let id = document.getElementById("idcategoria").value;
    let nombre = document.getElementById("nomcategoria").value;
    let estado = document.querySelector('input[name="estado"]:checked').value;
    
    if (id == '' || nombre == '' || estado == '') {
        localStorage.removeItem("objImage");
        Swal.fire({
            title: "Error",
            text: "Favor de llenar todos los campos.",
            icon: "success"
        });
        //alert("Favor de llenar todos los campos");
        return;
    }
    
    var catego = JSON.parse(localStorage.getItem("categorias")) || [];

    var a_catego = catego.filter(function (catego_f) {
        return (catego_f.idproducto == id);
    });

    if (a_catego.length > 0) {
        Swal.fire({
            title: "Error",
            text: "Categoria ya existe.",
            icon: "success"
        });
        return;
    }

    let catego_r = {
        "idcategoria": id, "nomcategoria": nombre, "estado": estado
    }

    catego.push(catego_r);

    localStorage.setItem("categorias", JSON.stringify(catego));
   
    Swal.fire({
        title: "Completo",
        text: "Registro completo.",
        icon: "success"
    });
    //alert("Registro completo");

}

function Leercategoria(elem) {
    var catego = JSON.parse(localStorage.getItem("categorias")) || [];

    switch (elem) {
        case 'table':
            var tblCategoria = document.getElementById("tblCategoria");

            tblCategoria.innerHTML = "";
            catego.forEach(function (categotia) {
                
                var cadena = `<tr>
                                    <td>
                                        <button class="btn btn-primary" onclick="EditarCategoria(${producto.idproducto})">
                                            Editar 
                                        </button>
                                        
                                        <button class="btn btn-warning" onclick="EliminarCategoria(${producto.idproducto})">
                                            Eliminar 
                                        </button>
                                    </td>
                                    <td>${categotia.idcategoria}</td>
                                    <td>${categotia.nomcategoria}</td>
                                    <td>${categotia.estado}</td>
                                </tr>`;
                tblCategoria.innerHTML += cadena;
            });
            break

        case 'select':
            var selCategoria = document.getElementById("idcategoria");

            selCategoria.innerHTML = "";
            catego.forEach(function (categotia) {
                if(categotia.estado == "si"){
                    var cadena = `<option value="${categotia.idcategoria}">${categotia.nomcategoria}</optrion>`;
                    selCategoria.innerHTML += cadena;
                }
            });
            break
    }
}

function Editarcategotia(id) {
    var catego = JSON.parse(localStorage.getItem("Categorias")) || [];

    var categoria = catego.find(function (categoria) {
        return categoria.idcategoria == id;
    });

    var objid = document.getElementById("idcategoria");
    var objnombre = document.getElementById("nomcategoria");
    var objestado = document.getElementById("estado");
    
    objid.value = categoria.idcategoria;
    objnombre.value = categoria.nomcategoria;
    objestado.value = categoria.estado;
}

function Eliminarcategoria(id) {
    var catego = JSON.parse(localStorage.getItem("Categorias")) || [];

    var categoriaFiltrados = catego.find(function (categoria) {
        return categoria.idcategoria == id;
    });

    localStorage.setItem("Categorias", JSON.stringify(categoriaFiltrados));
    Leercategoria('table');
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