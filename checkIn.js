const iniciarCheckIn = () => {
    const pasajeroId = document.getElementById("input-id").value.trim();
    const logsBox = document.getElementById("logs-box")
    if (pasajeroId === null || pasajeroId === undefined || pasajeroId === "") return;

    logsBox.style.visibility = "visible";
    logsBox.innerHTML = `<p>ID ingresado: ${pasajeroId}</p><p>Iniciando Validaciones...</p>`;

    Promise.all([validarPasaporte(pasajeroId), verificarRestriccionesVisa(pasajeroId)])
        .then((msgs) => {
            logsBox.innerHTML = "";
            msgs.forEach((msg) => {
                console.log(msg);
                logsBox.innerHTML += `<p>${msg}</p>`;
            });

            logsBox.innerHTML += `<p>Asignando asiento...</p>`;
            return asignarAsiento();
        })
        .then((asiento) => {
            console.log(asiento);
            logsBox.innerHTML += `<p>Asiento asignado: ${asiento}</p>`;
        })
        .catch((error) => {
            console.log(error);
            logsBox.innerHTML = `<p>${error}</p>`;
        });
};

const validarPasaporte = (id) => {
    return new Promise((resolve, reject) => {
        console.log("Validando id del pasaporte");

        setTimeout(() => {
            if (id % 2 == 0) {
                reject(new Error("Id invalido"));
            }
            resolve("Id valido");
        }, 1500);
    });
};

const verificarRestriccionesVisa = (id) => {
    return new Promise((resolve, reject) => {
        console.log(`Verificando restricciones de visa para el pasajero ${id}`);

        setTimeout(() => {
            return Math.random() < 0.3
                ? reject(new Error("Visa no valida para el destino"))
                : resolve("Visa verificada");
        }, 2000);
    });
};

const asignarAsiento = () => {
    const rows = Array.from({ length: 30 }, (_, i) => i + 1);
    const seats = ["A", "B", "C", "D", "E", "F"];

    return new Promise((resolve) => {
        console.log("Asignando asiento");

        setTimeout(() => {
            const row = rows[Math.floor(Math.random() * rows.length)];
            const seat = seats[Math.floor(Math.random() * seats.length)];
            resolve(`${row}${seat}`);
        }, 1000);
    });
};

const generarPaseAbordar = (datos) => {
};
