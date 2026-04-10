const iniciarCheckIn = () => {
    const pasajeroId = document.getElementById("input-id").value.trim();
    const logsBox = document.getElementById("logs-box");
    const inputButton = document.getElementById("input-btn");
    inputButton.disabled = true;

    if (pasajeroId === null || pasajeroId === undefined || pasajeroId === "") return;

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
            // logsBox.innerHTML += `<p>Asiento asignado: ${asiento}</p>`;

            return generarPaseAbordar({
                pasajeroId,
                asiento
            });
        })

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

const validarPasaporte = (id) => {
    return new Promise((resolve, reject) => {
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

const mostrarBoardingPass = (pase) => {
    document.getElementById("checkin-view").style.display = "none";

    const boardingView = document.getElementById("boarding-view");
    boardingView.style.display = "block";

    const template = document.getElementById("boarding-template");
    const clone = template.content.cloneNode(true);

    clone.querySelector(".pasajero").textContent = pase.pasajeroId;
    clone.querySelector(".asiento").textContent = pase.asiento;

    boardingView.querySelectorAll(".boarding-card-frame").forEach(el => el.remove());

    boardingView.prepend(clone);
};

const volverAlCheckIn = () => {
    document.getElementById("checkin-view").style.display = "block";

    const boardingView = document.getElementById("boarding-view");
    boardingView.style.display = "none";

    boardingView.querySelectorAll(".boarding-card-frame").forEach(el => el.remove());

    document.getElementById("input-id").value = "";

    const logsBox = document.getElementById("logs-box");
    logsBox.innerHTML = "";
    logsBox.style.visibility = "visible";
};