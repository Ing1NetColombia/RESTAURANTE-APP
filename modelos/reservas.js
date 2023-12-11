function guardarreserva() {
  let cedula = document.getElementById("cedula").value;
  let telefono = document.getElementById("telefono").value;
  let zona = document.getElementById("idzona").value;
  let mesa = document.getElementById("idmesa").value;
  let fecha = new Date(Date.now()).toISOString();
  //let fechreserva = new Date(document.getElementById("fechreserva").value).toISOString;
  let fechreserva = document.getElementById("fechreserva").value;
  let id = cedula + mesa + Math.floor(Math.random() * max);

  if (cedula == '' || telefono == '' || zona == '' || mesa == '' || fechreserva == '') {
      Swal.fire({
          title: "Error",
          text: "Favor de llenar todos los campos.",
          icon: "warning"
      });
      //alert("Favor de llenar todos los campos");
      return;
  }

  var reserv = JSON.parse(localStorage.getItem("reservas")) || [];

  reserv.forEach(function (reserv) {
    if (reserv.cedula == cedula && reserv.mesa == mesa) {
      Swal.fire({
          title: "Error",
          text: "Ya tiene reservada la mesa.",
          icon: "warning"
      });
      return;
  }
  });
  /*var a_reserv = reserv.filter(function (reserv_f) {
      return (reserv_f.idmesas == id);
  });*/

  let reserv_r = {
      "idreserva": id, "cedula": cedula, "telefono": telefono,"idzona": zona, "idmesa": mesa, "fecha": fecha, "fechreserva": fechreserva
  }
  reserv.push(reserv_r);

  localStorage.setItem("mesas", JSON.stringify(reserv));

  Swal.fire({
      title: "Completo",
      text: "Registro completo.",
      icon: "success"
  });
  //alert("Registro completo");

}

function Leerreserva(elem) {
  var reserv = JSON.parse(localStorage.getItem("reservas")) || [];

  switch (elem,sesion.rol) {
      case 'table','admin':
          var tblreservas = document.getElementById("tblreservas");

          tblreservas.innerHTML = "";
          reserv.forEach(function (reserv) {
              var cadena = `<tr>
                                  <td>
                                      <button class="btn btn-primary" onclick="EditarReserva(${reserv.idreserva})">
                                          Editar 
                                      </button>
                                      
                                      <button class="btn btn-warning" onclick="EliminarReserva(${reserv.idreserva})">
                                          Eliminar 
                                      </button>
                                  </td>
                                  <td>${reserv.idreserva}</td>
                                  <td>${reserv.cedula}</td>
                                  <td>${reserv.idzona}</td>
                                  <td>${reserv.idmesas}</td> 
                                  <td>${reserv.fecha}</td>
                                  <td>${reserv.fechreserva}</td>
                              </tr>`;
              tblreservas.innerHTML += cadena;
          });
          break
        case 'table',!'admin':
          var tblreservas = document.getElementById("tblreservas");

          tblreservas.innerHTML = "";
          reserv.forEach(function (reserv) {
              if(sesion.id = reserv.cedula){
              var cadena = `<tr>
                                  <td>
                                      <button class="btn btn-primary" onclick="EditarReserva(${reserv.idreserva})">
                                          Editar 
                                      </button>
                                      
                                      <button class="btn btn-warning" onclick="EliminarReserva(${reserv.idreserva})">
                                          Eliminar 
                                      </button>
                                  </td>
                                  <td>${reserv.idreserva}</td>
                                  <td>${reserv.cedula}</td>
                                  <td>${reserv.idzona}</td>
                                  <td>${reserv.idmesas}</td> 
                                  <td>${reserv.fecha}</td>
                                  <td>${reserv.fechreserva}</td>
                              </tr>`;
              tblreservas.innerHTML += cadena;
              }
          });
          break


  }
}

function EditarReserva(id) {
  var reserv = JSON.parse(localStorage.getItem("reservas")) || [];

  var reservas = reserv.find(function (reservas) {
      return reservas.idreserva == id;
  });

  var objcadula = document.getElementById("cedula");
  var objtelefono = document.getElementById("telefono");
  var objzona = document.getElementById("idzona");
  var objmesa = document.getElementById("idmesa");
  var objfecha = document.getElementById("fechreserva");

  objcadula.value = reservas.cedula;
  objtelefono.value = reservas.telefono
  objzona.value = reservas.idzona
  objmesa.value = reservas.idmesa;
  objfecha.value = reservas.fechreserva;
  
  mostrarform('reservas',false)
}

function EliminarMesa(id) {
  var reserv = JSON.parse(localStorage.getItem("reservas")) || [];

  var reservFiltrados = reserv.filter(function (reservas) {
      return reservas.idreserva != id;
  });

  localStorage.setItem("reservas", JSON.stringify(reservFiltrados));
  Leerproductos('table');
}
