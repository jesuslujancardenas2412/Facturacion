const tbody = document.getElementById("tbody");

let objFactura = JSON.parse(window.localStorage.getItem("facturas"));
console.log(objFactura);
console.log(objFactura.factura);

const redibujarTbody = () => {
  // limpiamos el contenido
  tbody.innerHTML = "";

  //tbody falso
  let tbodyFalso = new DocumentFragment();

  objFactura.forEach((pro, ind) => {
    // CREAMOS LOS ELEMENTOS HTML
    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let tdcFact = document.createElement("td");
    tdcFact.innerText = pro.factura;
    tdcFact.classList.add("tbody__cant");

    let tdCliente = document.createElement("td");
    tdCliente.innerText = pro.nombre;
    tdCliente.classList.add("tbody__desc");

    let tdRUC = document.createElement("td");
    tdRUC.innerText = pro.ruc;
    tdRUC.classList.add("tbody__cant");

    let tdDirec = document.createElement("td");
    tdDirec.innerText = pro.direccion;
    tdDirec.classList.add("tbody__desc");

    let tdpTotal = document.createElement("td");
    tdpTotal.innerText = pro.totalFactura;
    tdpTotal.classList.add("tbody__cant");

    tr.appendChild(tdcFact);
    tr.appendChild(tdCliente);
    tr.appendChild(tdRUC);
    tr.appendChild(tdDirec);
    tr.appendChild(tdpTotal);

    tbodyFalso.appendChild(tr);
  });
  tbody.appendChild(tbodyFalso);
};
redibujarTbody();
