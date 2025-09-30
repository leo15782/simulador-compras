# 🛒 Simulador de Compras

Un simulador de compras interactivo desarrollado con HTML5, CSS3 y JavaScript vanilla. Permite a los usuarios gestionar un carrito de compras con validaciones estrictas, persistencia de datos y formato profesional de moneda.

## 🚀 Características Principales

### 💰 Gestión de Presupuesto

- **Validación estricta** por tipos de datos
- **Formato de moneda** con separadores de miles ($1,234.56)
- **Control de presupuesto** en tiempo real
- **Alertas inteligentes** de presupuesto disponible

### 🛍️ Carrito de Compras

- **Unificación automática** de productos repetidos
- **Acumulación de cantidades** para productos idénticos
- **Eliminación individual** de productos
- **Cálculos precisos** sin errores de punto flotante

### 🔒 Validaciones Robustas

- **Verificación por tipos de datos** (string, number, integer)
- **Validación carácter por carácter** para nombres
- **Rangos específicos** para precios y cantidades
- **Mensajes de error específicos** y claros

### 💾 Persistencia de Datos

- **Guardado automático** en localStorage
- **Restauración de sesiones** al recargar la página
- **Datos seguros** con manejo de errores

### 🎨 Interfaz de Usuario

- **Diseño moderno** y responsive
- **Animaciones suaves** y transiciones
- **Favicon personalizado** con carrito de compras
- **Footer profesional** con créditos

## 📱 Tecnologías Utilizadas

- **HTML5** - Estructura semántica y accesible
- **CSS3** - Diseño responsive con Flexbox y Grid
- **JavaScript ES6+** - Lógica de aplicación y manipulación del DOM
- **LocalStorage API** - Persistencia de datos del lado cliente
- **Intl.NumberFormat** - Formato internacional de moneda

## 🎯 Funcionalidades

### Configuración Inicial

1. **Ingreso de usuario** - Solo texto válido (letras y espacios)
2. **Establecer presupuesto** - Validación numérica estricta
3. **Guardado automático** de la configuración

### Gestión de Productos

1. **Agregar productos** con nombre, precio y cantidad
2. **Validación en tiempo real** de todos los campos
3. **Unificación automática** de productos duplicados
4. **Visualización del carrito** con formato profesional

### Finalización de Compra

1. **Resumen detallado** de la compra
2. **Totales calculados** con precisión
3. **Presupuesto restante** actualizado
4. **Opción de nueva compra** o cancelación

## 🔧 Validaciones Implementadas

### Nombre de Usuario

```javascript
- Tipo: string
- Longitud: 2-50 caracteres
- Permitidos: letras, espacios, acentos, ñ
- Prohibidos: números, símbolos especiales
```

### Presupuesto

```javascript
- Tipo: number
- Rango: $0.01 - $999,999,999.00
- Formato: hasta 2 decimales
- Validación: número finito válido
```

### Productos

```javascript
Nombre:
- Tipo: string alfanumérico
- Longitud: 2-100 caracteres
- Permitidos: letras, números, espacios, guiones, puntos

Precio:
- Tipo: number
- Rango: $0.01 - $999,999,999.00
- Validación: número decimal válido

Cantidad:
- Tipo: integer
- Rango: 1 - 99,999
- Validación: número entero sin decimales
```

## 📋 Instalación y Uso

### 🔗 Opción 1: GitHub Pages (Recomendado)

Accede directamente desde tu navegador:

```
https://leo15782.github.io/simulador-compras
```

### 💻 Opción 2: Local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/leo15782/simulador-compras.git
   ```

2. Navega al directorio:

   ```bash
   cd simulador-compras
   ```

3. Abre `index.html` en tu navegador web preferido

## 🎮 Cómo Usar

1. **Ingresa tu nombre** y **presupuesto inicial**
2. **Agrega productos** con nombre, precio y cantidad
3. **Visualiza tu carrito** en tiempo real
4. **Controla tu presupuesto** con alertas automáticas
5. **Finaliza tu compra** y revisa el resumen
6. **Inicia una nueva compra** cuando desees

## 🏗️ Estructura del Proyecto

```
simulador-compras/
├── index.html          # Estructura HTML principal
├── main.js            # Lógica de la aplicación
├── style.css          # Estilos y diseño
└── README.md          # Documentación
```

## 🔄 Funciones Principales

### Validación de Tipos de Datos

```javascript
esTextoValido(valor); // Valida strings carácter por carácter
esNumeroValido(valor); // Valida números decimales
esEnteroValido(valor); // Valida números enteros
```

### Formato de Moneda

```javascript
formatearMoneda(valor); // $1,234.56 (con símbolo)
formatearNumero(valor); // 1,234.56 (sin símbolo)
```

### Gestión de Productos

```javascript
agregarProducto(); // Agrega o unifica productos
eliminarProducto(); // Elimina producto del carrito
actualizarCarrito(); // Actualiza visualización
```

## 👨‍💻 Desarrollador

**LE Desarrollo y Soluciones 2025**

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un [issue](https://github.com/leo15782/simulador-compras/issues) en GitHub.

---

⭐ **¡Dale una estrella al proyecto si te resultó útil!** ⭐
