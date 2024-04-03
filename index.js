const precios = {
    1: { nombre: "Chocolate", precio: 2500 },
    2: { nombre: "Galleta", precio: 700 },
    3: { nombre: "Caramelo", precio: 15 },
    4: { nombre: "Gomitas", precio: 200 },
    5: { nombre: "Chicle", precio: 15 },
    6: { nombre: "Chupetin", precio: 50 },
    7: { nombre: "Mentitas", precio: 200 },
    8: { nombre: "Turron", precio: 150 },
    9: { nombre: "Barra de cereal", precio: 150 },
    10: { nombre: "Regaliz", precio: 40 },
    11: { nombre: "Bombón", precio: 60 }
};

let cambioTotal = 0;

function capturarDineroUsuario() {
    const dineroUsuario = parseFloat(prompt("Por favor, ingresa la cantidad de dinero que tienes (en pesos):"));
    return dineroUsuario;
}

function mostrarProductos() {
    let listaProductos = "Productos disponibles:\n";
    for (const [key, value] of Object.entries(precios)) {
        listaProductos += `${key}. ${value.nombre} - ${value.precio} pesos\n`;
    }
    const dulceSeleccionado = parseInt(prompt(listaProductos + "\nPor favor, selecciona el número correspondiente al dulce que deseas comprar (o presiona 'Cancelar' para finalizar):"));
    return dulceSeleccionado;
}

function comprarProducto(dineroUsuario, dulceSeleccionado) {
    let totalGastado = 0; 

    if (!dulceSeleccionado) { 
        cambioTotal = dineroUsuario;
        return;
    }

    while (true) {
        if (precios.hasOwnProperty(dulceSeleccionado)) {
            const { nombre, precio } = precios[dulceSeleccionado];
            if (dineroUsuario >= precio) {
                dineroUsuario -= precio; // Resta el precio del dulce del dinero
                totalGastado += precio; // Agrega el precio del dulce al total gastado
                const respuesta = prompt("¡Disfruta tu " + nombre + "! Tu dinero restante es de " + dineroUsuario.toFixed(2) + " pesos. ¿Deseas comprar otro producto? (Sí/No)").toLowerCase();
                if (respuesta !== 'si') {
                    cambioTotal = parseFloat(dineroUsuario.toFixed(2)); // Calcula el cambio total restando el total gastado del dinero inicial
                    break; // Salir del bucle si la respuesta no es 'si'
                } else {
                    dulceSeleccionado = mostrarProductos();
                }
            } else {
                alert("Lo siento, no tienes suficiente dinero para comprar este producto.");
                return;
            }
        } else {
            alert("Lo siento, el producto seleccionado no está disponible en esta máquina.");
            return;
        }
    }
}

document.getElementById("startButton").addEventListener("click", function() {
    const nombreUsuario = prompt("¡Bienvenido a la Máquina Expendedora de Dulces! Por favor, introduce tu nombre:");
    let dineroUsuario = capturarDineroUsuario();
    if (dineroUsuario <= 0 || isNaN(dineroUsuario)) {
        alert("Cantidad de dinero no válida. Por favor, recarga e intenta nuevamente.");
        return;
    }
    let dulceSeleccionado = mostrarProductos();
    comprarProducto(dineroUsuario, dulceSeleccionado);
    alert("Gracias por utilizar nuestra Máquina Expendedora de Dulces, " + nombreUsuario + ". Tu cambio total es de " + cambioTotal.toFixed(2) + " pesos. ¡Que tengas un buen día!");
});  