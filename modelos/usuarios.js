function Sesionusu(elem) {
    setTimeout(() => {
        if (elem) {
            document.getElementById("iniuser").style.display = 'block';
            document.getElementById("loguser").style.display = 'none';
            document.getElementById("claveuser").style.display = 'none';
        } else {
            document.getElementById("loguser").style.display = 'block';
            document.getElementById("iniuser").style.display = 'none';
            document.getElementById("claveuser").style.display = 'none';
        }
    }, 100);

}

function guardarusuario() {
    let id = document.getElementById("idusuario").value;
    let nombre = document.getElementById("nomusuario").value;
    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("webcontrasena").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;

    if (id || nombre || usuario || contrasena || email || telefono) {
        alert("Favor de llenar todos los campos");
        return;
    }

    var user = JSON.parse(localStorage.getItem("user")) || [];
    console.log(user);
    var a_usuario = user.filter(function (user_f) {
        return (user_f["user"] == id);
    });

    alert(id)

    if (a_usuario.length > 0) {
        alert("Usuario ya existe");
        return;
    }

    let usuario_r = { "idusuario": id, "nomusuario": nombre, "usuario": usuario, "webcontrasena": contrasena, "email": email, "telefono": telefono }
    user.push(usuario_r);
    console.log(user);
    console.log(usuario_r);
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registro completo");

}

function LeerUsuario() {
    var user = JSON.parse(localStorage.getItem("user")) || [];

    var tblUsuario = document.getElementById("tblUsuario");
    tblUsuario.innerHTML = "";

    user.forEach(function (usuario) {
        var cadena = `
            <tr>
                <td>
                    <button onclick="EditarUsuario(${usuario.idusuario})">Editar</button>
                    <button onclick="Eliminarusuario(${usuario.idusuario})">Eliminar</button>
                </td>
                <td>${usuario.nomusuario}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.webcontrasena}</td>
                <td>${usuario.email}</td> 
                <td>${usuario.telefono}</td>             
            </tr>                
        `;

        tblUsuario.innerHTML += cadena;
    });
}

function Editarusuario(id) {
    var user = JSON.parse(localStorage.getItem("user")) || [];

    var usuario = user.find(function (usuario) {
        return usuario.idusuario == id;
    });
    var objid = document.getElementById("idusuario");
    var objnombre = document.getElementById("nomusuario");
    var objusuario = document.getElementById("usuario");
    var objcontrasena = document.getElementById("webcontrasena");
    var objemail = document.getElementById("email");
    var objtelefono = document.getElementById("telefono");

    objid.value = usuario.idusuario;
    objnombre.value = usuario.nomusuario;
    objusuario.value = usuario.usuario
    objcontrasena.value = usuario.webcontrasena
    objemail.value = usuario.email
    objtelefono.value = usuario.telefono;
}

function Eliminarusuario(id) {
    var user = JSON.parse(localStorage.getItem("user")) || [];

    var usuariosFiltrados = user.filter(function (usuario) {
        return usuario.idusuario != id;
    });

    localStorage.setItem("user", JSON.stringify(usuariosFiltrados));
    Leerusuario();
}