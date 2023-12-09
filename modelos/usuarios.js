function Sesionusu() {
    var sesion = JSON.parse(localStorage.getItem("sesion")) || [];
    imglog = sesion.imguser
    txtuser = sesion.usuario
    txtemail = sesion.email

    if (sesion.length == []){
        let sesion= { "idusuario":null, "usuario":null, "email":null, "telefono":null, "imguser":null, "rol":null }
        localStorage.setItem("sesion", JSON.stringify(sesion));
    }

    if(!sesion.id){
        imglog = "files/usuarios/user.png"
        txtuser = "Iniciar Sesion"
        txtemail = ""
    }

    objuser = document.getElementById("txt_user");

    if (objuser.parentNode) {
        objuser.parentNode.removeChild(objuser);
    }
    var text = document.createTextNode(txtuser);
    objuser.appendChild(text);

    var text = document.createTextNode(txtemail);
    document.getElementById("txt_email").appendChild(text);

    const imgElement = document.getElementById('imglog'); 
    imgElement.src = imglog;
}

function logusu(elem){
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

    if (id == '' || nombre == '' || usuario == '' || contrasena == '' || email == '' || telefono == '') {
        alert("Favor de llenar todos los campos");
        return;
    }

    var imguser = localStorage.getItem("objImage") || [];
    var user = JSON.parse(localStorage.getItem("user")) || [];

    var a_usuario = user.filter(function (user_f) {
        return (user_f["user"] == id);
    });

    if (a_usuario.length > 0) {
        alert("Usuario ya existe");
        return;
    }

    let usuario_r = { "idusuario":id, "nomusuario":nombre, "usuario":usuario, "webcontrasena":contrasena, "email":email, "telefono":telefono, "imguser":imguser }
    user.push(usuario_r);

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

function iniciarSesion() {
    let usuario = document.getElementById("logina").value;
    let contra = document.getElementById("clavea").value;
  
    var users = JSON.parse(localStorage.getItem("user")) || [];
    var userLog = null;
  
    if (users.length > 0) {
      users.forEach(function(usuarios_f) {
        var nombreUsuario = usuarios_f["usuario_init"];
        
        if (nombreUsuario === usuario) {
          userLog = usuarios_f;
          return;
        }
      });
    } else {
      console.log("No hay usuarios almacenados en el localStorage");
    }
  
    if (!userLog) {
      alert("Usuario no encontrado");
      return;
    }
  
    if (userLog["contra_init"] !== contra) {
      alert("Contraseña incorrecta");
      return;
    }
  
    localStorage.setItem("usuarioActual", JSON.stringify(userLog));
  
    console.log("Antes de la redirección");
  
    // var local = window.location.href
    
    // Cambiar la ubicación (URL) a "login_2.html"
    window.location.href = "../index.html";
    // alert("ingresando")
  
    // Este mensaje puede no mostrarse inmediatamente debido a la redirección
    // console.log("Después de la redirección");
  }