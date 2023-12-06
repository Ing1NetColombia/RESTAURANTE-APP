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

