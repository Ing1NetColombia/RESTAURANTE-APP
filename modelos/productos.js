/*class ProductTable {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        this.render();
    }

    render() {
        const tbody = this.table.querySelector('tbody');
        tbody.innerHTML = '';

        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.idcate}</td>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.valor}</td>
                <td>${product.recomendado}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;

            tbody.appendChild(row);
        });
    }
}

// Example usage
const productTable = new ProductTable('productTable');

// Example product data
const exampleProduct = {
    id: 1,
    idcate: 1,
    nombre: 'Product 1',
    descripcion: 'Description of Product 1',
    valor: 19.99,
    recomendado: 1
};

// Add an example product to the table
productTable.addProduct(exampleProduct);
*/

function guardarproducto() {
    let id = document.getElementById("idproducto").value;
    let nombre = document.getElementById("nomproducto").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = document.getElementById("valor").value;
    let categoria = document.getElementById("idcategoria").value;
    let recomendado = document.querySelector('input[name="recomendado"]:checked').value;
    //let recomendado = document.getElementById("recomendado").value;

    // Ejemplo de uso en un input de tipo file
    const input = document.getElementById('tuInputDeArchivo'); // Reemplaza 'tuInputDeArchivo' con el ID de tu input file
    input.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            convertirImagenABase64(file, function (base64String) {
                console.log(base64String);
                // Aquí puedes trabajar con la cadena base64, por ejemplo, mostrar la imagen en un elemento <img>
                // Ejemplo:
                // const imgElement = document.getElementById('tuElementoImg'); // Reemplaza 'tuElementoImg' con el ID de tu elemento <img>
                // imgElement.src = base64String;
            });
        }
    });

    alert(base64String);

    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    var a_produtos = produc.filter(function (produc_f) {
        return (produc_f.idproducto == id);
    });

    alert(nombre)
    if (a_produtos.length > 0) {
        alert("Producto ya existe");
        //limpiar imagen
        localStorage.removeItem('objImage');
        return;
    }

    let produc_r = {
        "idproducto": id, "nomproducto": nombre, "descripcion": descripcion,
        "valor": valor, "idcategoria": categoria, "recomendado": recomendado,
        "imgproduc": base64String
    }

    produc.push(produc_r);

    localStorage.setItem("produc", JSON.stringify(produc));

    //limpiar imagen
    localStorage.removeItem('objImage');

    alert("Registro completo");

}

function Leerproductos(elem) {
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    switch (elem) {
        case 'table':
            var tblProductos = document.getElementById("tblproductos");
            console.log(tblProductos)
            tblProductos.innerHTML = "";
            produc.forEach(function (producto) {
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
                                </tr>`;
                tblProductos.innerHTML += cadena;
            });
            break

        case 'card':
            var CardProductos = document.getElementById("CardProductos");
            console.log(CardProductos)
            if (produc == []) {
                break
            }
            CardProductos.innerHTML = "";
            produc.forEach(function (producto) {
                var cadena = `<div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                    <img src="${producto.imgproduc}" class="img-circle" style="max-width: 170px;" alt="Item Image">
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
            console.log(CardProductos)
            if (produc.length == []) {
                break
            }
            CardProductos.innerHTML = "";
            produc.forEach(function (producto) {
                if (producto.recomendado == "1") {
                    var cadena = `<div class="form-group col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                        <img src="${producto.imgproduc}" class="img-circle" style="max-width: 170px;" alt="Item Image">
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

    var producto = user.find(function (producto) {
        return producto.id == id;
    });

    var objid = document.getElementById("idproducto");
    var objnombre = document.getElementById("nomproducto");
    var objdescripcion = document.getElementById("descripcion");
    var objvalor = document.getElementById("valor");
    var objcategoria = document.getElementById("idcategoria");
    var objrecomendado = document.getElementById("recomendado");

    objid.value = producto.id;
    objnombre.value = producto.nombre;
    objdescripcion.value = producto.descripcion
    objvalor.value = producto.valor
    objcategoria.value = producto.categoria
    objrecomendado.value = producto.recomendado;
}

function EliminarProducto(id) {
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    var productosFiltrados = produc.filter(function (producto) {
        return producto.idproducto != id;
    });

    localStorage.setItem("produc", JSON.stringify(productosFiltrados));
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