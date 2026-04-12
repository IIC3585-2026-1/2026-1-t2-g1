const checkInTimeout = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("El proceso de check-in ha tardado demasiado. Por favor, inténtelo de nuevo."));
        }, 4000);
    });
};

const iniciarCheckIn = () => {
    const pasajeroId = document.getElementById("input-id").value.trim();
    const logsBox = document.getElementById("logs-box");
    const inputButton = document.getElementById("input-btn");
    inputButton.disabled = true;
    logsBox.innerHTML = "";

    const log = (message) => {
        logsBox.innerHTML += `<p>${message}</p>`;
    }

    if (pasajeroId === null || pasajeroId === undefined || pasajeroId === "") return;

    log(`ID ingresado: ${pasajeroId}`);
    log(`Iniciando Validaciones...`);

    Promise.race([flujoCheckIn(pasajeroId, log), checkInTimeout()])
        .then((pase) => {
            inputButton.disabled = false;
            mostrarBoardingPass(pase);
        })

        .catch((error) => {
            console.log(error);
            logsBox.innerHTML = `<p>Error: ${error.message}</p>`;
            inputButton.disabled = false;
        });
};

const flujoCheckIn = (pasajeroId, log) => {
    const validationPromises = [validarPasaporte(pasajeroId).then((msg) => log(msg)), 
        verificarRestriccionesVisa(pasajeroId).then((msg) => log(msg))];
        
    return Promise.all(validationPromises)
        .then(() => {
            log(`Asignando asiento...`);
            return asignarAsiento();
        })

        .then((asiento) => {
            console.log(asiento);
            // logsBox.innerHTML += `<p>Asiento asignado: ${asiento}</p>`;

            return generarPaseAbordar({
                pasajeroId,
                asiento
            });
        })
    };

const validarPasaporte = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id % 2 == 0) {
                reject(new Error("El ID de pasaporte es inválido"));
            }
            resolve("Id valido");
        }, 1500);
    });
};

const verificarRestriccionesVisa = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return Math.random() < 0.3
                ? reject(new Error("Visa no válida para el destino."))
                : resolve("Visa verificada");
        }, 2000);
    });
};

const asignarAsiento = () => {
    const rows = Array.from({ length: 30 }, (_, i) => i + 1);
    const seats = ["A", "B", "C", "D", "E", "F"];

    return new Promise((resolve) => {
        setTimeout(() => {
            const row = rows[Math.floor(Math.random() * rows.length)];
            const seat = seats[Math.floor(Math.random() * seats.length)];
            resolve(`${row}${seat}`);
        }, 1000);
    });
};

const generarPaseAbordar = (datos) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(datos);
        }, 500);
    });
};