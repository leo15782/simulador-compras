// Array para almacenar los productos agregados
const productos = [];
// Solicitar nombre de usuario y mostrar mensaje de bienvenida
let usuario = "";
while (true) {
  usuario = prompt("Ingrese su nombre de usuario:");
  if (usuario && usuario.trim() !== "") {
    break;
  } else {
    alert("Error: Debe ingresar un nombre de usuario válido.");
  }
}
alert(`¡Bienvenido/a, ${usuario}!`);

// Solicitar presupuesto inicial y validar que sea un número
let presupuesto;
while (true) {
  const input = prompt("Ingrese su presupuesto inicial:");
  presupuesto = Number(input);
  if (!isNaN(presupuesto) && input.trim() !== "" && presupuesto > 0) {
    break;
  } else {
    alert("Error: Debe ingresar un número válido para el presupuesto.");
  }
}

// Función para agregar un producto al array
function agregarProducto() {
  // Solicitar nombre del producto
  const nombre = prompt("Ingrese el nombre del producto:");

  // Solicitar y validar precio
  let precio;
  while (true) {
    const inputPrecio = prompt("Ingrese el precio del producto:");
    precio = Number(inputPrecio);
    if (!isNaN(precio) && inputPrecio.trim() !== "" && precio > 0) {
      break;
    } else {
      alert("Error: Debe ingresar un número válido para el precio.");
    }
  }

  // Solicitar y validar cantidad
  let cantidad;
  while (true) {
    const inputCantidad = prompt("Ingrese la cantidad del producto:");
    cantidad = Number(inputCantidad);
    if (!isNaN(cantidad) && inputCantidad.trim() !== "" && cantidad > 0) {
      break;
    } else {
      alert("Error: Debe ingresar un número válido para la cantidad.");
    }
  }

  // Comprobar si el producto cabe en el presupuesto
  const totalActual = calcularTotal();
  const totalNuevo = totalActual + precio * cantidad;
  if (totalNuevo > presupuesto) {
    alert(
      "Error: La compra excede el presupuesto disponible. Producto no agregado."
    );
    return;
  }

  // Agregar producto al array
  productos.push({ nombre, precio, cantidad });
  console.log("Producto agregado:", { nombre, precio, cantidad });
  const restante = presupuesto - totalNuevo;
  alert(`Presupuesto restante: $${restante}`);
}

// Función para calcular el total gastado
function calcularTotal() {
  return productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
}

// Función para mostrar el resumen de la compra y el contenido del array
function mostrarResumen() {
  const total = calcularTotal();
  console.log("Resumen de la compra:");
  productos.forEach((producto) => {
    console.log(
      `${producto.cantidad} x ${producto.nombre} a $${producto.precio} cada uno`
    );
  });
  console.log(`Total gastado: $${total}`);
  const restante = presupuesto - total;
  console.log(`Presupuesto restante: $${restante}`);
  // Mensaje de despedida
  alert(`¡Gracias por tu compra, ${usuario}! Que tengas un excelente día.`);
  // Mostrar el array productos en consola
  console.log("Contenido del array productos:", productos);
}

// Bucle principal para agregar productos
let continuar = true;
while (continuar) {
  agregarProducto();
  continuar = confirm("¿Desea agregar otro producto?");
}

// Mostrar resumen final y productos
mostrarResumen();
