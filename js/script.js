window.addEventListener("load",function(){CargarContenido('vistas/inicio.html','contenido','inicio')});

var idsesion = true

function CargarContenido(url, div, from){
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + url;
    
    var urlP = new URL(baseUrl);
    var id = urlP.searchParams.get("id");
    if(id != null){
        localStorage.setItem("id", id);
    }                       

    fetch(url)
        .then(function(response){ 
            //console.log(response.text());
            return response.text();})
        .then(function(html) {
            var contenido = document.getElementById(div);
            contenido.innerHTML = html;
            ejecutarScriptsEnContenido(contenido);

            switch(from){
                case "productos":
                    Leerproductos('table');
                    break
                case "login":
                    Sesionusu(idsesion);
                    break
                case "inicio":
                    Leerproductos('card2');
                    break
                case "menu":
                    Leerproductos('card');
                    break
            }

    })

}

function ejecutarScriptsEnContenido(elemento) {
    const scripts = elemento.querySelectorAll('script');

    if(!scripts){
        return;
    }

    scripts.forEach(script => {
        const nuevoScript = document.createElement('script');
        nuevoScript.text = script.text;
        script.parentNode.replaceChild(nuevoScript, script);
    });
}  

function cargarImagen(elem) {
    const input = document.getElementById(elem);

    // Verificar si se seleccionó un archivo
    if (input.files.length > 0) {
      const file = input.files[0];
  
      // Convertir la imagen a base64
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
  
        // Guardar la imagen en localStorage
        localStorage.setItem('objImage', base64Image);
  
        Swal.fire({
          title: "Completado",
          text: "Imagen cargada correctamente.",
          icon: "success"
        });
  
      };
  
      reader.readAsDataURL(file);
    } else {
      
      Swal.fire({
        title: "Oops...",
        text: "selecciona una imagen antes de intentar cargarla.",
        icon: "error"
      });
  
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL();
    return dataURL;
}
  
  