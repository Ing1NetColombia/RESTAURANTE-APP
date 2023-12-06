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

function guardarproducto(){
    let id = document.getElementById("idproducto").value;
    let nombre = document.getElementById("nomproducto").value;
    let descripcion = document.getElementById("descripcion").value;
    let valor = document.getElementById("valor").value;
    let categoria = document.getElementById("idcategoria").value;
    let recomendado = document.getElementById("recomendado").value;
  
    var produc = JSON.parse(localStorage.getItem("produc")) || [];
         //alerta(book);
      var a_produtos = produc.filter(function(produc_f){
          return (produc_f["produc"] == nombre);
      });
      alert(nombre)
     if(a_produtos.length > 0){
        alert("Producto ya existe");
        return;
    }

    let produc_r = { "idproducto" : id,"nomproducto":nombre,"descripcion" : descripcion,"valor" : valor,"idcategoria":categoria,"recomendado" : recomendado}
    produc.push(produc_r);
  
    localStorage.setItem("produc", JSON.stringify(produc));
      alert("Registro completo");
      document.getElementById("incio").reset();
  
}

function Leerproductos(elem) {
    var produc = JSON.parse(localStorage.getItem("produc")) || [];

    
  
        switch(elem){
            case 'table':
                var tblProductos = document.getElementById("tblproductos");
                console.log(tblProductos)
                tblProductos.innerHTML = "";
                produc.forEach(function (producto) {
                    var cadena =`<tr>
                                    <td>
                                        <button class="btn btn-primary" onclick="EditarProducto(${producto.id})">
                                            Editar <span class="bi bi-eye"></span>
                                        </button>
                                        
                                        <button class="btn btn-warning" onclick="EliminarProducto(${producto.id})">
                                            Eliminar <span class="bi bi-bar-chart"></span>
                                        </button>
                                    </td>
                                    <td>${producto.nomproducto}</td>
                                    <td>${producto.descripcion}</td>
                                    <td>${producto.valor}</td>
                                    <td>${producto.idcategoria}</td> 
                                    <td>${producto.recomendado}</td>             
                                </tr>`;
                                tblProductos.innerHTML += cadena;
                });
            case 'card':
                var CardProductos = document.getElementById("CardProductos");
                console.log(CardProductos)
                CardProductos.innerHTML = "";
                produc.forEach(function (producto) {
                    var cadena =`<div class="form-group col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h3 class="card-title">${producto.nomproducto}</h3>
                                            <p class="card-text">${producto.descripcion}</p>
                                            <p class="card-text">${producto.valor}</p>
                                        </div>
                                    </div>
                                </div>`;
                                CardProductos.innerHTML += cadena;
                });
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
    var objvalor = document.getElementById("valor").value;
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
        return producto.id != id;
    });

    localStorage.setItem("produc", JSON.stringify(productosFiltrados));
    Leerusuario();
}

  //Función mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}