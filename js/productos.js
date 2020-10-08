/**
 * PRODUCTOS
 */

let productos = [
  {
    id: 1,
    descripcion: "Fresa",
    precioUnitario: 2.5,
    imagen: "./img/fresa.png",
  },
  {
    id: 2,
    descripcion: "Manzana",
    precioUnitario: 1.5,
    imagen: "./img/manzana.png",
  },
  {
    id: 3,
    descripcion: "Naranja",
    precioUnitario: 2.0,
    imagen: "./img/naranja.png",
  },
  { id: 4, descripcion: "Pera", precioUnitario: 2.2, imagen: "./img/pera.png" },
  {
    id: 5,
    descripcion: "Sandia",
    precioUnitario: 3.5,
    imagen: "./img/sandia.png",
  },
];

const tbody = document.getElementById("tbody");
const selectProductos = document.getElementById("selectProductos");
const cantidad = document.getElementById("cantidad");
const precioUnitario = document.getElementById("precioUnitario");
const precioTotal = document.getElementById("precioTotal");
const imagen = document.getElementById("imagen");
const btnAdd = document.getElementById("btnAdd");

precioUnitario.setAttribute("disabled", "true");
precioTotal.setAttribute("disabled", "true");

let productosAgregados = [];

// ELIMINAR USUARIO
const eliminarUsuario = (posicion) => {
  console.log("Eliminando " + posicion);
  
  productosAgregados = productosAgregados.filter((usu,i) => {
    if (i !== posicion) {
      return usu;
    }
  });

  redibujarTbody();
};

// REDIBUJAR TBODY
const redibujarTbody = () => {
  // limpiamos el contenido
  tbody.innerHTML = "";

  //tbody falso
  let tbodyFalso = new DocumentFragment();

  productosAgregados.forEach((pro,ind) => {
    // CREAMOS LOS ELEMENTOS HTML
    let tr = document.createElement("tr");
    tr.classList.add("tr");

    let tdCantidad = document.createElement("td");
    tdCantidad.innerText = pro.cantidad;
    tdCantidad.classList.add("tbody__cant");

    let tdDescripcion = document.createElement("td");
    tdDescripcion.innerText = pro.descripcion;
    tdDescripcion.classList.add("tbody__desc");

    let tdPrecioUnitario = document.createElement("td");
    tdPrecioUnitario.innerText = pro.precioUnitario;
    tdPrecioUnitario.classList.add("tbody__unit");

    let tdPrecioTotal = document.createElement("td");
    tdPrecioTotal.innerText = pro.precioTotal;
    tdPrecioTotal.classList.add("tbody__total");

    let tdAct = document.createElement("td");
    tdAct.classList.add("tbody__act");

    let btn = document.createElement("button");
    btn.classList.add("btnBody__eliminar");
    btn.innerText = "X";
    btn.onclick = () => {
      // Eliminar
      eliminarUsuario(ind);
    };    

    tdAct.appendChild(btn);

    tr.appendChild(tdCantidad);
    tr.appendChild(tdDescripcion);
    tr.appendChild(tdPrecioUnitario);
    tr.appendChild(tdPrecioTotal);
    tr.appendChild(tdAct);

    tbodyFalso.appendChild(tr);
  });
  tbody.appendChild(tbodyFalso);
  montoTotalfactura();
};

// LENADO DEL SELECT PRODUCTOS
const llenarProductos = () => {
  let options = `<option value="0">--- Seleccione ---</option>`;
  productos.forEach((producto) => {
    options =
      options +
      `<option value="${producto.id}">${producto.descripcion}</option>`;
  });
  selectProductos.innerHTML = options;
};

// CALCULO PRECIO TOTAL PRODUCTO
let calculoPrecioTotalProducto = () => {
  if (cantidad.value <= 0) {
    cantidad.value = 1;
  }
  let precioT = cantidad.value * precioUnitario.value;
  precioTotal.value = precioT.toFixed(2);
};

// CALCULO MONTO TOTAL FACTURA
let montoTotalfactura = () => {
  let total = 0;
  for (let i = 0; i < productosAgregados.length; i++) {
    total = total + parseFloat(productosAgregados[i].precioTotal);
  }
  totalInput.value = total.toFixed(2);
};

// LLENADO DE PRECIO E IMAGEN SEGUN PRODUCTO SELECCIONADO
const precioUnitarioPorIdProducto = (id) => {
  cantidad.value = 1;

  if (id == 0) {
    cantidad.value = 1;
    precioUnitario.value = 0;
    precioTotal.value = 0;
    imagen.setAttribute("src", "");
  } else {
    let resultado = productos.filter((elemento) => {
      if (elemento.id == id) {
        return elemento;
      }
    });
    console.log(resultado);
    //   console.log(`valor : ${resultado[0].precioUnitario}`);
    precioUnitario.value = resultado[0].precioUnitario.toFixed(2);
    imagen.setAttribute("src", resultado[0].imagen);
    calculoPrecioTotalProducto();
  }
};

// VERIFICAR PRODUCTO AGREGADO PARA EVITAR DUPLICIDAD
const verificarProductoAgregado = (id) => {
  if (id !== 0) {
    let resultado = productosAgregados.filter((elemento) => {
      if (elemento.id == id) {
        return elemento;
      }
    });
    return resultado;
  }
};

selectProductos.onchange = () => {
  let id = selectProductos.value;
  console.log(`id seleccionado : ${id}`);
  precioUnitarioPorIdProducto(id);
};

cantidad.onchange = () => {
  calculoPrecioTotalProducto();
};

btnAdd.onclick = () => {
  let id = selectProductos.value;

  if (id === "0") {
    alert("Seleccione un producto");
  } else {
    if (verificarProductoAgregado(id).length === 0) {
      // creamos objeto detalles
      let pTotal = precioTotal.value;
      let objDetalles = {
        id: id,
        cantidad: cantidad.value,
        descripcion:
          selectProductos.options[selectProductos.selectedIndex].text,
        precioUnitario: precioUnitario.value,
        precioTotal: pTotal,
      };
      productosAgregados.push(objDetalles);
      console.log(`producto agregados: ${productosAgregados}`);
      redibujarTbody();
    } else {
      alert("El producto seleccionado ya se encuentra agregado");
    }
  }
};

llenarProductos();
