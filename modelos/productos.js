function guardarproducto() {
    let id = document.getElementById("idproducto").value;
    let nombre = document.getElementById("nomproducto").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = document.getElementById("valor").value;
    let categoria = document.getElementById("idcategoria").value;
    let recomendado = document.querySelector('input[name="recomendado"]:checked').value;
    //let recomendado = document.getElementById("recomendado").value;

    if (id == '' || nombre == '' || descripcion == '' || valor == '' || categoria == '' || recomendado == '') {
        localStorage.removeItem("objImage");
        Swal.fire({
            title: "Error",
            text: "Favor de llenar todos los campos.",
            icon: "success"
        });
        //alert("Favor de llenar todos los campos");
        return;
    }

    var imgproduc = localStorage.getItem("objImage") || [];
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    var a_produtos = produc.filter(function (produc_f) {
        return (produc_f.idproducto == id);
    });

    if (a_produtos.length > 0) {
        localStorage.removeItem("objImage");
        Swal.fire({
            title: "Error",
            text: "Producto ya existe.",
            icon: "success"
        });
        //alert("Producto ya existe");
        return;
    }

    let produc_r = {
        "idproducto": id, "nomproducto": nombre, "descripcion": descripcion,
        "valor": valor, "idcategoria": categoria, "recomendado": recomendado,
        "imgproduc":imgproduc
    }

    produc.push(produc_r);

    localStorage.setItem("produc", JSON.stringify(produc));
    localStorage.removeItem("objImage");

    Swal.fire({
        title: "Completo",
        text: "Registro completo.",
        icon: "success"
    });
    //alert("Registro completo");

}

function Leerproductos(elem) {
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    switch (elem) {
        case 'table':
            var tblProductos = document.getElementById("tblproductos");

            tblProductos.innerHTML = "";
            produc.forEach(function (producto) {
                let imgproduc = producto.imgproduc.length == []? 'files/img/no img.png':producto.imgproduc;
                var cadena = `<tr>
                                    <td>
                                        <button class="btn btn-primary" onclick="EditarProducto(${producto.idproducto})">
                                            Editar 
                                        </button>
                                        
                                        <button class="btn btn-warning" onclick="EliminarProducto(${producto.idproducto})">
                                            Eliminar 
                                        </button>
                                    </td>
                                    <td>${producto.idproducto}</td>
                                    <td>${producto.nomproducto}</td>
                                    <td>${producto.descripcion}</td>
                                    <td>${producto.idcategoria}</td> 
                                    <td>${producto.valor}</td>
                                    <td>${producto.recomendado}</td>
                                    <td><img src=${imgproduc} style="max-width: 50px;"
                                    alt="Item Image"></td>
                                </tr>`;
                tblProductos.innerHTML += cadena;
            });
            break

        case 'card':
            var CardProductos = document.getElementById("CardProductos");

            if (produc.length == []) {
                break
            }
            
            CardProductos.innerHTML = "";
            produc.forEach(function (producto) {
                let imgproduc = producto.imgproduc.length == []? 'files/img/no img.png':producto.imgproduc;
                var cadena = `<div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <img src="${imgproduc}" class="img-fluid rounded-circle" style="width: 170px; height: 170px;" alt="Item Image">
                                                </div>
                                                <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <h3 class="card-title">${producto.nomproducto}</h3>
                                                    <p class="card-text">${producto.descripcion}</p>
                                                    <p class="card-text">Precio: $${producto.valor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                CardProductos.innerHTML += cadena;
            });
            break

        case 'card2':

            var CardProductos = document.getElementById("CardProductos");

            if (produc.length == []) {
                break
            }

            CardProductos.innerHTML = "";
            produc.forEach(function (producto) {
                if (producto.recomendado == "1") {
                    let imgproduc = producto.imgproduc.length == []? 'files/img/no img.png':producto.imgproduc;
                    var cadena = `<div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                        <img src="${imgproduc}" class="img-fluid rounded-circle" style="width: 170px; height: 170px;" alt="Item Image">
                                                    </div>
                                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                        <h3 class="card-title">${producto.nomproducto}</h3>
                                                        <p class="card-text">${producto.descripcion}</p>
                                                        <p class="card-text">Precio: $${producto.valor}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                    CardProductos.innerHTML += cadena;
                }
            });
            break
    }
}

function EditarProducto(id) {
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    var producto = produc.find(function (producto) {
        return producto.idproducto == id;
    });

    var objid = document.getElementById("idproducto");
    var objnombre = document.getElementById("nomproducto");
    var objdescripcion = document.getElementById("descripcion");
    var objvalor = document.getElementById("valor");
    var objcategoria = document.getElementById("idcategoria");
    var objimgprev = document.getElementById("imgprev");
    //var objrecomendado = document.getElementById("recomendado");

    objid.value = producto.idproducto;
    objnombre.value = producto.nomproducto;
    objdescripcion.value = producto.descripcion;
    objvalor.value = producto.valor;
    objcategoria.value = producto.idcategoria;
    objimgprev.src = producto.imgproduc;
    //objrecomendado.value = producto.recomendado;
    mostrarform('productos',false)
}

function EliminarProducto(id) {
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    var productosFiltrados = produc.filter(function (producto) {
        return producto.idproducto != id;
    });

    localStorage.setItem("produc", JSON.stringify(productosFiltrados));
    Leerproductos('table');
}
