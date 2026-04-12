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