function reservarLibro(){
  let name_book1 = document.getElementById("name-book");
  let name_book = name_book1.innerText;
  let autor1 = document.getElementById("book-author");
  let autor = autor1.innerText;
  let editorial1 = document.getElementById("book-editorial");
  let editorial = editorial1.innerText;
  let fecha = new Date();
  let fechaReserva = fecha.toISOString(); 


  var reserva = JSON.parse(localStorage.getItem("reserva")) || [];
     
  alert(name_book)

  var ReservaLog = reserva.filter(function(reserva_l){
      return (reserva_l["name-book"] == name_book);
  });

  if(ReservaLog.length > 0){
      alert("Usuario ya existe");
      return;
  }
  let ReservaL = { "name-book" : name_book,"book-author":autor, "book-editorial":editorial,"fecha_reserva" :fechaReserva }
  reserva.push(ReservaL);

  alert(JSON.stringify(ReservaL));  
  localStorage.setItem("reserva", JSON.stringify(reserva));
  alert("Registro completo");
  //document.getElementById("formRegistro").reset();
}

// Función para cargar dinámicamente el historial en la tabla
function cargarHistorial() {
  var tablaBody = document.getElementById("historialTablaBody");
  var datosGuardados = JSON.parse(localStorage.getItem("reserva"));

  datosGuardados.forEach(element => {
    var fila = document.createElement("tr");

    var celdaLibro = document.createElement("td");
    celdaLibro.textContent = element["name-book"];
    fila.appendChild(celdaLibro);

    var celdaAutor = document.createElement("td");
    celdaAutor.textContent = element["book-author"];  // Corregido el nombre de la variable
    fila.appendChild(celdaAutor);

    var celdaEditorial = document.createElement("td");
    celdaEditorial.textContent = element["book-editorial"];  // Corregido el nombre de la variable
    fila.appendChild(celdaEditorial);

    var celdaFecha = document.createElement("td");
    celdaFecha.textContent = element["fecha_reserva"];
    fila.appendChild(celdaFecha);

    tablaBody.appendChild(fila);
  });
}