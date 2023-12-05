window.addEventListener("load",function(){CargarContenido('vistas/inicio.html','contenido')});

var idsesion = false

function Sesionusu(elem){

    CargarContenido('vistas/usuario.html','login');

    setTimeout(() => {
        if(elem){
        document.getElementById("iniuser").style.display  = 'block';
        document.getElementById("loguser").style.display  = 'none';
    }else
    {
        document.getElementById("loguser").style.display  = 'block';
        document.getElementById("iniuser").style.display  = 'none';
    }
    }, 10);
    
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

