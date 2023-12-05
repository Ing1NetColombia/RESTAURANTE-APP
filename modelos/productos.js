class ProductTable {
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

// Example JavaScript functions for edit and delete actions
function editProduct(productId) {
    alert("Editing product with ID: " + productId);
}

function deleteProduct(productId) {
    alert("Deleting product with ID: " + productId);
}