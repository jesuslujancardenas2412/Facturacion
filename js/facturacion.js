const factura = document.getElementById("factura");

const facturaNombre = document.getElementById("facturaNombre");
const facturaRuc = document.getElementById("facturaRuc");
const facturaDireccion = document.getElementById("facturaDireccion");
const facturaFecha = document.getElementById("facturaFecha");
const facturaNumero = document.getElementById("facturaNumero");
const helper = document.getElementById("helper");

const totalInput = document.getElementById("totalInput");

let fecha = new Date();
let contadorFactura = 1;
let objetoContadorfactura;

totalInput.setAttribute("disabled", "true");
facturaFecha.setAttribute("disabled", "true");
facturaNumero.setAttribute("disabled", "true");

const fechaActual = () => {
  facturaFecha.value = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;
};

let facturas = [];

// FUNCIONES
const generarError = () => {
  //va a hacer mostrar el texto de error y le va a colocar el borde rojo al formulario
  // elemento.removeAttribute("atributo"); eliminar el atributo de un elemento
  helper.removeAttribute("hidden");

  // colocar borde rojo al formulario
  factura.classList.add("borde-rojo");
};

const limpiarErrores = () => {
  // quitar el borde rojo al formulario
  factura.classList.remove("borde-rojo");

  // ocultar el small (helper)
  helper.setAttribute("hidden", true);
};

const limpiarPantalla = () => {};

// LISTENER DEL BOTON GUARDAR
factura.addEventListener("submit", (evento) => {
  // detenemos el comportamiento por default del submmit
  evento.preventDefault();

  // validamos los campos antes de guardarlos
  if (
    facturaNombre.value.trim() === "" ||
    facturaRuc.value.trim() === "" ||
    facturaDireccion.value.trim() === "" ||
    facturaFecha.value.trim() === "" ||
    productosAgregados.length === 0
  ) {
    generarError();
    return;
  }

  // creamos el objeto factura
  let objFactura = {
    factura: facturaNumero.value,
    nombre: facturaNombre.value,
    ruc: facturaRuc.value,
    direccion: facturaDireccion.value,
    fecha: facturaFecha.value,
    detalle: productosAgregados,
    totalFactura: totalInput.value,
  };
    // verificarStorage();
  // agregamos el objeto al arreglo
  facturas.push(objFactura);
  console.log("pushFacturas");
  console.log(facturas);

  // limpiamos los datos ingresados
  facturaNombre.value = "";
  facturaRuc.value = "";
  facturaDireccion.value = "";
  fechaActual();
  
  tbody.innerHTML = "";
  totalInput.value = "";

  // limpiamos el mensaje de error si lo hubiera
  limpiarErrores();

  console.log(`facturas: ${facturas}`);
  console.log(facturas);
  console.log(`productosAgregados: ${productosAgregados}`);
  console.log(productosAgregados);
  console.log(`objFactura: ${objFactura}`);
  console.log(objFactura);

  /**
   * JSON
   */
  // 1. convirtiendo un arreglo de objetos a un String
  const facturasString = JSON.stringify(facturas);
  console.log("facturasString");
  console.log(facturasString);

  // 2. guardar los usuarios string en el localstorage
  localStorage.setItem("facturas", facturasString);
  productosAgregados = [];
  console.log("PRODUCTOS AGREGADOS");
  console.log(productosAgregados);
  verificarStorage();
});

// LLAMADO A FUNCIONES

// funcion que verifica si tenemos usuarios en el localstorage, para setear el arreglo de usuarios
const verificarStorage = () => {
  const facturasStorage = window.localStorage.getItem("facturas");
  if (facturasStorage !== null) {
    // que si existe la clave facturas
    // 1.  Convertir un STRING a un objeto JSON
    facturas = JSON.parse(facturasStorage);
    console.log("Json de facturas");
    console.log(facturas);
    // redibujarTbody();
  }

  const correlativoFacturaStorage = localStorage.getItem("facturas");
  if (correlativoFacturaStorage !== null) {
    objetoContadorfactura = JSON.parse(correlativoFacturaStorage);
    // console.log("OBJETO CONTADOR FACTURA PARSEADO");
    // console.log(objetoContadorfactura);

    console.log(
      "obtener ultimo numero de factura, conociendo el numero de objetos"
    );
    console.log(Object.keys(objetoContadorfactura).length);
    facturaNumero.value = Object.keys(objetoContadorfactura).length + 1;
  } else {
    facturaNumero.value = contadorFactura;
  }
};

verificarStorage();
fechaActual();
