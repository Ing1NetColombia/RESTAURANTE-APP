window.addEventListener("load",function(){CargarContenido('vistas/inicio.html','contenido')});

function Sesionusu(elem){

    CargarContenido('vistas/usuario.html','login');

    if(elem){
        iniuser.style.display  = 'block';
        loguser.style.display  = 'none';
    }else
    {
        loguser.style.display  = 'block';
        iniuser.style.display  = 'none';
    }
    
}

function CargarContenido(url, div){
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

