const productos = [
    { id: 1, nombre: "Chocolate", precio: 2500, stock: 10 },
    { id: 2, nombre: "Galleta", precio: 700, stock: 20 },
    { id: 3, nombre: "Caramelo", precio: 15, stock: 30 },
    { id: 4, nombre: "Gomitas", precio: 200, stock: 15 },
    { id: 5, nombre: "Chicle", precio: 15, stock: 25 },
    { id: 6, nombre: "Chupetin", precio: 50, stock: 20 },
    { id: 7, nombre: "Mentitas", precio: 200, stock: 10 },
    { id: 8, nombre: "Turron", precio: 150, stock: 12 },
    { id: 9, nombre: "Barra de cereal", precio: 150, stock: 18 },
    { id: 10, nombre: "Regaliz", precio: 40, stock: 25 },
    { id: 11, nombre: "Bombón", precio: 60, stock: 20 }
];

let cambioTotal = 0;

function capturarDineroUsuario() {
    const dineroUsuario = parseFloat(prompt("Por favor, ingresa la cantidad de dinero que tienes (en pesos):"));
    return dineroUsuario;
}

function mostrarProductos() {
    let listaProductos = "Productos disponibles:\n";
    productos.forEach(producto => {
        listaProductos += `${producto.id}. ${producto.nombre} - ${producto.precio} pesos - Stock: ${producto.stock}\n`;
    });
    const dulceSeleccionado = parseInt(prompt(listaProductos + "\nPor favor, selecciona el número correspondiente al dulce que deseas comprar (o presiona 'Cancelar' para finalizar):"));
    return dulceSeleccionado;
}

function comprarProducto(dineroUsuario) {
    while (true) {
        let dulceSeleccionado = mostrarProductos();
        if (!dulceSeleccionado) {
            cambioTotal = dineroUsuario;
            break;
        }
        const producto = productos.find(item => item.id === dulceSeleccionado);
        if (producto) {
            if (producto.stock > 0) {
                if (dineroUsuario >= producto.precio) {
                    dineroUsuario -= producto.precio; // Resta el precio del dulce del dinero
                    producto.stock -= 1; // Decrementa el stock del producto
                    const respuesta = prompt(`¡Disfruta tu ${producto.nombre}! Tu dinero restante es de ${dineroUsuario.toFixed(2)} pesos. ¿Deseas comprar otro producto? (Sí/No)`).toLowerCase();
                    if (respuesta !== 'si') {
                        cambioTotal = parseFloat(dineroUsuario.toFixed(2)); // Calcula el cambio total restando el total gastado del dinero inicial
                        break;
                    }
                } else {
                    alert("Lo siento, no tienes suficiente dinero para comprar este producto.");
                }
            } else {
                alert("Lo siento, el producto seleccionado no está disponible en esta máquina.");
            }
        } else {
            alert("Lo siento, el producto seleccionado no está disponible en esta máquina.");
        }
    }
}

document.getElementById("startButton").addEventListener("click", function () {
    const nombreUsuario = prompt("¡Bienvenido a la Máquina Expendedora de Dulces! Por favor, introduce tu nombre:");
    let dineroUsuario = capturarDineroUsuario();
    if (dineroUsuario <= 0 || isNaN(dineroUsuario)) {
        alert("Cantidad de dinero no válida. Por favor, recarga e intenta nuevamente.");
        return;
    }
    comprarProducto(dineroUsuario);
    alert(`Gracias por utilizar nuestra Máquina Expendedora de Dulces, ${nombreUsuario}. Tu cambio total es de ${cambioTotal.toFixed(2)} pesos. ¡Que tengas un buen día!`);
});
