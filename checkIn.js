const iniciarCheckIn = () => {
    const pasajeroId = document.getElementById("input-id").value.trim();
    const logsBox = document.getElementById("logs-box");
   
    if (pasajeroId === null || pasajeroId === undefined || pasajeroId === "") return;

    logsBox.style.visibility = 'visible';
    logsBox.innerHTML = `<p>ID ingresado: ${pasajeroId}</p><p>Iniciando Validaciones...</p>`;

    Promise.all([validarPasaporte(pasajeroId), verificarRestriccionesVisa(pasajeroId)])
    .then((msgs) => {
        logsBox.innerHTML = "";
        msgs.forEach((msg) => { // Se agregan los mensajes de éxito al log box
            console.log(msg);
            logsBox.innerHTML += `<p>${msg}</p>`
        });
    })
    .catch((error) => {
        console.log(error);
        logsBox.innerHTML = `<p>${error}</p>`;
    });
};

const validarPasaporte = (id) => {
    return new Promise((resolve, reject) => {
        console.log("Validando id del pasaporte")

        setTimeout(() => {
            if (id % 2 == 0) { reject(new Error("Id inválido")) };
            resolve("Id válido");
        }, 1500);

    });
}

const verificarRestriccionesVisa = (id) => {
    return new Promise((resolve, reject) => {
        console.log(`Verificando restricciones de visa para el pasajero ${id}`);

        setTimeout(() => {
            return Math.random() < 0.3
                ? reject(new Error("Visa no válida para el destino"))
                : resolve("Visa verificada");
        }, 2000);
    });
}

const asignarAsiento = () => {

}


const generarPaseAbordar = () => {

}
