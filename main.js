// Array para almacenar los productos agregados
const productos = [];
let usuario = "";
let presupuesto = 0;

// Función para redondear correctamente números decimales a 2 decimales
function redondearPrecio(numero) {
  return parseFloat(numero.toFixed(2));
}

// Función para formatear valores como moneda
function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(redondearPrecio(valor));
}

// Función para formatear solo el número con separadores (sin símbolo $)
function formatearNumero(valor) {
  return new Intl.NumberFormat("es-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(redondearPrecio(valor));
}

// Array de saludos aleatorios
const saludos = [
  "¡Hola! ¡Que tengas un excelente día de compras!",
  "¡Bienvenido! ¡Esperamos que encuentres lo que buscas!",
  "¡Saludos! ¡Disfruta de tu experiencia de compra!",
  "¡Hola! ¡Que tengas una jornada de compras fantástica!",
  "¡Bienvenido! ¡Encuentra las mejores ofertas aquí!",
  "¡Hola! ¡Que tus compras sean geniales hoy!",
];

// Función para mostrar saludo aleatorio en HTML
function mostrarSaludoAleatorio() {
  const saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];
  const elementoSaludo = document.getElementById("saludo-aleatorio");
  if (elementoSaludo) {
    elementoSaludo.textContent = saludoAleatorio;
  }
}

// Función para mostrar mensaje
function mostrarMensaje(texto, tipo = "info") {
  const mensajesDiv = document.getElementById("mensajes");
  if (!mensajesDiv) return;

  mensajesDiv.textContent = texto;
  mensajesDiv.className = `mensaje-${tipo}`;
}

// Función para mostrar error en un campo específico
function mostrarError(campo, mensaje) {
  const errorDiv = document.getElementById(`error-${campo}`);
  if (errorDiv) {
    errorDiv.textContent = mensaje;
  }
}

// Función para limpiar errores
function limpiarErrores() {
  const errores = document.querySelectorAll(".error");
  errores.forEach((error) => (error.textContent = ""));
}

// Funciones auxiliares para validación de tipos de datos
function esTextoValido(valor) {
  // Verificar que sea string y solo contenga letras y espacios
  if (typeof valor !== "string") return false;

  // Verificar que no esté vacío después del trim
  const textoLimpio = valor.trim();
  if (textoLimpio.length === 0) return false;

  // Verificar que cada carácter sea una letra o espacio
  for (let i = 0; i < textoLimpio.length; i++) {
    const char = textoLimpio[i];
    const esLetra =
      (char >= "a" && char <= "z") ||
      (char >= "A" && char <= "Z") ||
      char === " " ||
      // Caracteres con acentos y ñ
      "áéíóúÁÉÍÓÚñÑàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ".includes(char);

    if (!esLetra) return false;
  }

  return true;
}

function esNumeroValido(valor) {
  // Verificar que se pueda convertir a número
  const numero = Number(valor);

  // Verificar que no sea NaN y que sea un número finito
  if (isNaN(numero) || !isFinite(numero)) return false;

  // Verificar que el string original solo contenga dígitos, punto decimal y posiblemente signo negativo
  const valorLimpio = valor.toString().trim();
  if (!/^-?\d*\.?\d+$/.test(valorLimpio)) return false;

  return true;
}

function esEnteroValido(valor) {
  // Verificar que sea un número válido primero
  if (!esNumeroValido(valor)) return false;

  const numero = Number(valor);

  // Verificar que sea un entero (sin decimales)
  return Number.isInteger(numero);
}

// Funciones para manejo de localStorage
function guardarEnLocalStorage() {
  const datosSimulador = {
    productos: productos,
    usuario: usuario,
    presupuesto: presupuesto,
    fechaGuardado: new Date().toISOString(),
  };

  try {
    localStorage.setItem("simuladorCompras", JSON.stringify(datosSimulador));
    console.log("Datos guardados en localStorage:", datosSimulador);
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
    mostrarMensaje(
      "Error al guardar los datos. Verifique el almacenamiento del navegador.",
      "error"
    );
  }
}

function cargarDesdeLocalStorage() {
  try {
    const datosGuardados = localStorage.getItem("simuladorCompras");
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);

      // Restaurar datos si existen
      if (datos.productos && Array.isArray(datos.productos)) {
        productos.splice(0, productos.length, ...datos.productos);
      }
      if (datos.usuario) {
        usuario = datos.usuario;
      }
      if (datos.presupuesto && !isNaN(datos.presupuesto)) {
        presupuesto = datos.presupuesto;
      }

      console.log("Datos cargados desde localStorage:", datos);
      return true;
    }
  } catch (error) {
    console.error("Error al cargar desde localStorage:", error);
    mostrarMensaje("Error al cargar los datos guardados.", "error");
  }
  return false;
}

function limpiarLocalStorage() {
  try {
    localStorage.removeItem("simuladorCompras");
    console.log("Datos eliminados del localStorage");
  } catch (error) {
    console.error("Error al limpiar localStorage:", error);
  }
}

// Función para cargar datos automáticamente al inicio (solo si existen)
function cargarDatosAutomaticamente() {
  const datosGuardados = localStorage.getItem("simuladorCompras");
  if (datosGuardados) {
    try {
      const datos = JSON.parse(datosGuardados);

      // Restaurar datos si existen
      if (datos.productos && Array.isArray(datos.productos)) {
        productos.splice(0, productos.length, ...datos.productos);
      }
      if (datos.usuario) {
        usuario = datos.usuario;
        document.getElementById("input-usuario").value = usuario;
      }
      if (datos.presupuesto && !isNaN(datos.presupuesto)) {
        presupuesto = datos.presupuesto;
        document.getElementById("input-presupuesto").value = presupuesto;
      }

      // Si hay productos, mostrar directamente el simulador
      if (productos.length > 0 && usuario && presupuesto > 0) {
        document
          .getElementById("configuracion-inicial")
          .classList.add("oculto");
        document
          .getElementById("simulador-principal")
          .classList.remove("oculto");
        actualizarInfoSesion();
        actualizarCarrito();
        mostrarMensaje(
          `Sesión restaurada. Bienvenido de vuelta, ${usuario}!`,
          "info"
        );
      }

      console.log("Datos cargados automáticamente:", datos);
    } catch (error) {
      console.error("Error al cargar datos automáticamente:", error);
    }
  }
}

// Función para validar configuración inicial
function validarConfiguracionInicial() {
  limpiarErrores();
  let esValido = true;

  // Validar usuario
  const inputUsuario = document.getElementById("input-usuario");
  const valorUsuario = inputUsuario.value.trim();

  // Validaciones del nombre de usuario usando verificación de tipos
  if (typeof valorUsuario !== "string") {
    mostrarError("usuario", "El nombre debe ser texto válido");
    esValido = false;
  } else if (!valorUsuario) {
    mostrarError("usuario", "El nombre de usuario es requerido");
    esValido = false;
  } else if (!esTextoValido(valorUsuario)) {
    mostrarError("usuario", "El nombre solo puede contener letras y espacios");
    esValido = false;
  } else if (valorUsuario.trim().length < 2) {
    mostrarError("usuario", "El nombre debe tener al menos 2 caracteres");
    esValido = false;
  } else if (valorUsuario.trim().length > 50) {
    mostrarError("usuario", "El nombre no puede exceder 50 caracteres");
    esValido = false;
  }

  // Validar presupuesto
  const inputPresupuesto = document.getElementById("input-presupuesto");
  const valorPresupuestoString = inputPresupuesto.value.trim();
  const valorPresupuesto = redondearPrecio(parseFloat(valorPresupuestoString));

  // Validaciones del presupuesto usando verificación de tipos
  if (!valorPresupuestoString) {
    mostrarError("presupuesto", "El presupuesto es requerido");
    esValido = false;
  } else if (typeof valorPresupuestoString !== "string") {
    mostrarError(
      "presupuesto",
      "El presupuesto debe ser un valor numérico válido"
    );
    esValido = false;
  } else if (!esNumeroValido(valorPresupuestoString)) {
    mostrarError(
      "presupuesto",
      "Debe ingresar un número válido (solo dígitos y punto decimal)"
    );
    esValido = false;
  } else {
    const valorPresupuesto = redondearPrecio(
      parseFloat(valorPresupuestoString)
    );
    if (typeof valorPresupuesto !== "number") {
      mostrarError("presupuesto", "Error al procesar el número ingresado");
      esValido = false;
    } else if (valorPresupuesto <= 0) {
      mostrarError("presupuesto", "El presupuesto debe ser mayor a 0");
      esValido = false;
    } else if (valorPresupuesto < 0.01) {
      mostrarError(
        "presupuesto",
        `El presupuesto mínimo es ${formatearMoneda(0.01)}`
      );
      esValido = false;
    } else if (valorPresupuesto > 999999999) {
      mostrarError(
        "presupuesto",
        `El presupuesto máximo es ${formatearMoneda(999999999)}`
      );
      esValido = false;
    } else {
      // Si llegamos aquí, asignar el valor validado
      presupuesto = valorPresupuesto;
    }
  }

  if (esValido) {
    usuario = valorUsuario.trim();
    // presupuesto ya se asignó en la validación si es válido
  }

  return esValido;
}

// Función para iniciar el simulador
function iniciarSimulador() {
  if (validarConfiguracionInicial()) {
    // Guardar configuración inicial en localStorage
    guardarEnLocalStorage();

    // Ocultar configuración inicial
    document.getElementById("configuracion-inicial").classList.add("oculto");
    // Mostrar simulador principal
    document.getElementById("simulador-principal").classList.remove("oculto");

    // Actualizar información de sesión
    actualizarInfoSesion();
    actualizarCarrito();

    mostrarMensaje(
      `¡Bienvenido/a ${usuario}! Puedes comenzar a agregar productos.`,
      "exito"
    );
  }
}

// Función para actualizar información de sesión
function actualizarInfoSesion() {
  document.getElementById("usuario-actual").textContent = usuario;
  document.getElementById("presupuesto-actual").textContent =
    formatearNumero(presupuesto);
  document.getElementById("presupuesto-restante-actual").textContent =
    formatearNumero(presupuesto - calcularTotal());
}

// Función para calcular el total gastado
function calcularTotal() {
  const total = productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
  return redondearPrecio(total);
}

// Función para validar producto
function validarProducto() {
  limpiarErrores();
  let esValido = true;

  // Validar nombre del producto usando verificación de tipos
  const inputNombre = document.getElementById("input-nombre-producto");
  const nombre = inputNombre.value;

  if (typeof nombre !== "string") {
    mostrarError("nombre-producto", "El nombre debe ser texto válido");
    esValido = false;
  } else if (!nombre.trim()) {
    mostrarError("nombre-producto", "El nombre del producto es requerido");
    esValido = false;
  } else if (nombre.trim().length < 2) {
    mostrarError(
      "nombre-producto",
      "El nombre debe tener al menos 2 caracteres"
    );
    esValido = false;
  } else if (nombre.trim().length > 100) {
    mostrarError(
      "nombre-producto",
      "El nombre no puede exceder 100 caracteres"
    );
    esValido = false;
  } else {
    // Verificar que solo contenga caracteres permitidos para nombres de productos
    const nombreLimpio = nombre.trim();
    let caracteresValidos = true;

    for (let i = 0; i < nombreLimpio.length; i++) {
      const char = nombreLimpio[i];
      const esCaracterPermitido =
        (char >= "a" && char <= "z") ||
        (char >= "A" && char <= "Z") ||
        (char >= "0" && char <= "9") ||
        char === " " ||
        char === "-" ||
        char === "." ||
        "áéíóúÁÉÍÓÚñÑàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ".includes(char);

      if (!esCaracterPermitido) {
        caracteresValidos = false;
        break;
      }
    }

    if (!caracteresValidos) {
      mostrarError(
        "nombre-producto",
        "Solo se permiten letras, números, espacios, guiones y puntos"
      );
      esValido = false;
    }
  }

  // Validar precio usando verificación de tipos
  const inputPrecio = document.getElementById("input-precio-producto");
  const precioString = inputPrecio.value.trim();

  if (!precioString) {
    mostrarError("precio-producto", "El precio es requerido");
    esValido = false;
  } else if (typeof precioString !== "string") {
    mostrarError(
      "precio-producto",
      "El precio debe ser un valor numérico válido"
    );
    esValido = false;
  } else if (!esNumeroValido(precioString)) {
    mostrarError(
      "precio-producto",
      "Debe ingresar un número válido (solo dígitos y punto decimal)"
    );
    esValido = false;
  } else {
    const precio = redondearPrecio(parseFloat(precioString));
    if (typeof precio !== "number" || !Number.isFinite(precio)) {
      mostrarError("precio-producto", "Error al procesar el número ingresado");
      esValido = false;
    } else if (precio <= 0) {
      mostrarError("precio-producto", "El precio debe ser mayor a 0");
      esValido = false;
    } else if (precio < 0.01) {
      mostrarError(
        "precio-producto",
        `El precio mínimo es ${formatearMoneda(0.01)}`
      );
      esValido = false;
    } else if (precio > 999999999) {
      mostrarError(
        "precio-producto",
        `El precio máximo es ${formatearMoneda(999999999)}`
      );
      esValido = false;
    }
  }

  // Validar cantidad usando verificación de tipos
  const inputCantidad = document.getElementById("input-cantidad-producto");
  const cantidadString = inputCantidad.value.trim();

  if (!cantidadString) {
    mostrarError("cantidad-producto", "La cantidad es requerida");
    esValido = false;
  } else if (typeof cantidadString !== "string") {
    mostrarError(
      "cantidad-producto",
      "La cantidad debe ser un valor numérico válido"
    );
    esValido = false;
  } else if (!esEnteroValido(cantidadString)) {
    mostrarError(
      "cantidad-producto",
      "Debe ingresar un número entero válido (sin decimales)"
    );
    esValido = false;
  } else {
    const cantidad = parseInt(cantidadString);
    if (typeof cantidad !== "number" || !Number.isInteger(cantidad)) {
      mostrarError("cantidad-producto", "Error al procesar el número entero");
      esValido = false;
    } else if (cantidad <= 0) {
      mostrarError("cantidad-producto", "La cantidad debe ser mayor a 0");
      esValido = false;
    } else if (cantidad > 99999) {
      mostrarError("cantidad-producto", "La cantidad máxima es 99,999");
      esValido = false;
    }
  }

  // Validar presupuesto considerando productos existentes
  if (esValido) {
    // Obtener los valores validados de los inputs
    const nombreValidado = document
      .getElementById("input-nombre-producto")
      .value.trim();
    const precioValidado = redondearPrecio(
      parseFloat(document.getElementById("input-precio-producto").value.trim())
    );
    const cantidadValidada = parseInt(
      document.getElementById("input-cantidad-producto").value.trim()
    );

    const totalActual = calcularTotal();

    // Verificar si el producto ya existe para calcular correctamente el nuevo total
    const productoExistente = productos.find(
      (p) =>
        p.nombre.toLowerCase() === nombreValidado.toLowerCase() &&
        Math.abs(p.precio - precioValidado) < 0.001
    );

    let costoAdicional;
    if (productoExistente) {
      // Solo el costo de la cantidad adicional
      costoAdicional = precioValidado * cantidadValidada;
    } else {
      // Costo del producto completo (es nuevo)
      costoAdicional = precioValidado * cantidadValidada;
    }

    const totalNuevo = totalActual + costoAdicional;
    if (totalNuevo > presupuesto) {
      const disponible = presupuesto - totalActual;
      mostrarError(
        "precio-producto",
        `La compra excede el presupuesto disponible. Disponible: ${formatearMoneda(
          disponible
        )}`
      );
      mostrarMensaje(
        `Error: La compra excede el presupuesto disponible. Disponible: ${formatearMoneda(
          disponible
        )}`,
        "error"
      );
      esValido = false;
    }
  }

  if (esValido) {
    // Devolver los valores validados y procesados
    const nombreFinal = document
      .getElementById("input-nombre-producto")
      .value.trim();
    const precioFinal = redondearPrecio(
      parseFloat(document.getElementById("input-precio-producto").value.trim())
    );
    const cantidadFinal = parseInt(
      document.getElementById("input-cantidad-producto").value.trim()
    );

    return {
      nombre: nombreFinal,
      precio: precioFinal,
      cantidad: cantidadFinal,
    };
  }

  return null;
}

// Función para agregar producto
function agregarProducto() {
  const producto = validarProducto();

  if (producto) {
    // Buscar si el producto ya existe (mismo nombre y precio)
    const productoExistente = productos.find(
      (p) =>
        p.nombre.toLowerCase() === producto.nombre.toLowerCase() &&
        Math.abs(p.precio - producto.precio) < 0.001
    );

    let mensajeAccion = "";

    if (productoExistente) {
      // Si el producto existe, acumular la cantidad
      const cantidadAnterior = productoExistente.cantidad;
      productoExistente.cantidad += producto.cantidad;
      mensajeAccion = `Cantidad actualizada para ${producto.nombre}: ${cantidadAnterior} + ${producto.cantidad} = ${productoExistente.cantidad}`;
    } else {
      // Si no existe, agregarlo como nuevo producto
      productos.push(producto);
      mensajeAccion = `Producto agregado: ${producto.nombre} (cantidad: ${producto.cantidad})`;
    }

    // Guardar en localStorage después de agregar/actualizar el producto
    guardarEnLocalStorage();

    // Limpiar formulario
    document.getElementById("input-nombre-producto").value = "";
    document.getElementById("input-precio-producto").value = "";
    document.getElementById("input-cantidad-producto").value = "";

    // Actualizar interfaz
    actualizarInfoSesion();
    actualizarCarrito();

    const restante = presupuesto - calcularTotal();
    mostrarMensaje(
      `${mensajeAccion}. Presupuesto restante: ${formatearMoneda(restante)}`,
      "exito"
    );
  }
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";

  if (productos.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No hay productos en el carrito";
    li.className = "carrito-vacio";
    listaCarrito.appendChild(li);
  } else {
    productos.forEach((producto, index) => {
      const li = document.createElement("li");
      const subtotal = redondearPrecio(producto.precio * producto.cantidad);

      // Crear contenedor para el producto y el botón eliminar
      li.className = "producto-carrito";

      const textoProducto = document.createElement("span");
      textoProducto.textContent = `${producto.cantidad} x ${
        producto.nombre
      } a ${formatearMoneda(producto.precio)} c/u = ${formatearMoneda(
        subtotal
      )}`;

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "×";
      btnEliminar.className = "btn-eliminar-producto";
      btnEliminar.title = `Eliminar ${producto.nombre}`;

      btnEliminar.addEventListener("click", () => eliminarProducto(index));

      li.appendChild(textoProducto);
      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);
    });
  }
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  if (index >= 0 && index < productos.length) {
    const productoEliminado = productos[index];
    productos.splice(index, 1);

    // Guardar cambios en localStorage
    guardarEnLocalStorage();

    // Actualizar interfaz
    actualizarInfoSesion();
    actualizarCarrito();

    mostrarMensaje(`Producto eliminado: ${productoEliminado.nombre}`, "info");
  }
}

// Función para finalizar compra
function finalizarCompra() {
  if (productos.length === 0) {
    mostrarMensaje(
      "No hay productos en el carrito para finalizar la compra.",
      "error"
    );
    return;
  }

  // Ocultar simulador principal
  document.getElementById("simulador-principal").classList.add("oculto");
  // Mostrar resumen final
  document.getElementById("resumen-compra").classList.remove("oculto");

  mostrarResumenFinal();
}

// Función para mostrar el resumen final
function mostrarResumenFinal() {
  const total = calcularTotal();
  const restante = presupuesto - total;

  // Información del usuario
  document.getElementById("nombre-usuario-final").textContent = usuario;
  document.getElementById("presupuesto-inicial-final").textContent =
    formatearNumero(presupuesto);

  // Lista de productos
  const listaProductosFinal = document.getElementById("productos-lista-final");
  listaProductosFinal.innerHTML = "";
  productos.forEach((producto) => {
    const li = document.createElement("li");
    const subtotal = redondearPrecio(producto.precio * producto.cantidad);
    li.textContent = `${producto.cantidad} x ${
      producto.nombre
    } a ${formatearMoneda(producto.precio)} cada uno = ${formatearMoneda(
      subtotal
    )}`;
    listaProductosFinal.appendChild(li);
  });

  // Totales
  document.getElementById("total-gastado-final").textContent =
    formatearNumero(total);
  document.getElementById("presupuesto-restante-final").textContent =
    formatearNumero(restante);
}

// Función para mostrar confirmación personalizada usando DOM
function mostrarConfirmacion(mensaje, onConfirmar, onCancelar) {
  // Crear el overlay de confirmación
  const overlay = document.createElement("div");
  overlay.id = "confirmacion-overlay";
  overlay.className = "confirmacion-overlay";

  // Crear el modal de confirmación
  const modal = document.createElement("div");
  modal.className = "confirmacion-modal";

  // Crear el contenido del modal
  modal.innerHTML = `
    <h3>⚠️ Confirmar cancelación</h3>
    <p>${mensaje}</p>
    <button id="btn-confirmar-cancelar" class="btn-cancelar btn-confirmar-cancelar">
      Sí, cancelar
    </button>
    <button id="btn-no-cancelar" class="btn-secundario">
      No, continuar
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Event listeners para los botones
  document
    .getElementById("btn-confirmar-cancelar")
    .addEventListener("click", function () {
      document.body.removeChild(overlay);
      if (onConfirmar) onConfirmar();
    });

  document
    .getElementById("btn-no-cancelar")
    .addEventListener("click", function () {
      document.body.removeChild(overlay);
      if (onCancelar) onCancelar();
    });

  // Cerrar al hacer click en el overlay (fondo)
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      if (onCancelar) onCancelar();
    }
  });
}

// Función para ejecutar la cancelación de compra
function ejecutarCancelacionCompra() {
  // Limpiar localStorage
  limpiarLocalStorage();

  // Limpiar datos
  productos.length = 0;
  usuario = "";
  presupuesto = 0;

  // Limpiar formularios
  document.getElementById("input-usuario").value = "";
  document.getElementById("input-presupuesto").value = "";
  document.getElementById("input-nombre-producto").value = "";
  document.getElementById("input-precio-producto").value = "";
  document.getElementById("input-cantidad-producto").value = "";

  // Limpiar errores
  limpiarErrores();

  // Volver a la configuración inicial
  document.getElementById("simulador-principal").classList.add("oculto");
  document.getElementById("resumen-compra").classList.add("oculto");
  document.getElementById("configuracion-inicial").classList.remove("oculto");

  // Mostrar nuevo saludo aleatorio
  mostrarSaludoAleatorio();

  // Mostrar mensaje de cancelación
  mostrarMensaje(
    "Compra cancelada. Puedes comenzar una nueva sesión cuando desees.",
    "info"
  );
}

// Función para cancelar compra y volver al inicio
function cancelarCompra() {
  const mensaje =
    "¿Estás seguro de que deseas cancelar la compra? Se perderán todos los productos agregados.";

  mostrarConfirmacion(
    mensaje,
    ejecutarCancelacionCompra, // Función que se ejecuta al confirmar
    null // Función que se ejecuta al cancelar (null = no hacer nada)
  );
}

// Función para nueva compra
function nuevaCompra() {
  // Limpiar localStorage
  limpiarLocalStorage();

  // Limpiar datos
  productos.length = 0;
  usuario = "";
  presupuesto = 0;

  // Limpiar formularios
  document.getElementById("input-usuario").value = "";
  document.getElementById("input-presupuesto").value = "";
  document.getElementById("input-nombre-producto").value = "";
  document.getElementById("input-precio-producto").value = "";
  document.getElementById("input-cantidad-producto").value = "";

  // Limpiar errores
  limpiarErrores();

  // Mostrar configuración inicial
  document.getElementById("resumen-compra").classList.add("oculto");
  document.getElementById("simulador-principal").classList.add("oculto");
  document.getElementById("configuracion-inicial").classList.remove("oculto");

  // Mostrar nuevo saludo aleatorio
  mostrarSaludoAleatorio();
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Mostrar saludo aleatorio al cargar
  mostrarSaludoAleatorio();

  // Cargar datos automáticamente si existen
  cargarDatosAutomaticamente();

  // Botón iniciar simulador
  document
    .getElementById("btn-iniciar")
    .addEventListener("click", iniciarSimulador);

  // Botón agregar producto
  document
    .getElementById("btn-agregar-producto")
    .addEventListener("click", agregarProducto);

  // Botón finalizar compra
  document
    .getElementById("btn-finalizar-compra")
    .addEventListener("click", finalizarCompra);

  // Botón cancelar compra
  document
    .getElementById("btn-cancelar-compra")
    .addEventListener("click", cancelarCompra);

  // Botón nueva compra
  document
    .getElementById("btn-nueva-compra")
    .addEventListener("click", nuevaCompra);

  // Enter en los inputs para enviar formularios
  document
    .getElementById("input-presupuesto")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        iniciarSimulador();
      }
    });

  document
    .getElementById("input-cantidad-producto")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        agregarProducto();
      }
    });

  // Limpiar errores cuando el usuario empieza a escribir
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const campo = this.id.replace("input-", "").replace("-producto", "");
      const errorDiv = document.getElementById(`error-${campo}`);
      if (errorDiv) {
        errorDiv.textContent = "";
      }
    });
  });
});
