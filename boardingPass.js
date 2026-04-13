const crearVistaBoardingPass = (pase) => ({
  checkinDisplay: "none",
  boardingDisplay: "block",
  pasajero: pase.pasajeroId,
  asiento: pase.asiento,
});

const crearVistaCheckIn = () => ({
  checkinDisplay: "block",
  boardingDisplay: "none",
  limpiarBoarding: true,
  limpiarInput: true,
  limpiarLogs: true,
});

const renderBoardingPass = (vista) => {
  const checkinView = document.getElementById("checkin-view");
  const boardingView = document.getElementById("boarding-view");
  const template = document.getElementById("boarding-template");

  checkinView.style.display = vista.checkinDisplay;
  boardingView.style.display = vista.boardingDisplay;

  boardingView.querySelectorAll(".boarding-card-frame").forEach((el) => el.remove());

  const clone = template.content.cloneNode(true);
  const pasajeroEl = clone.querySelector(".pasajero");
  const asientoEl = clone.querySelector(".asiento");

  if (pasajeroEl) pasajeroEl.textContent = vista.pasajero;
  if (asientoEl) asientoEl.textContent = vista.asiento;

  boardingView.prepend(clone);
};

const renderCheckIn = (vista) => {
  const checkinView = document.getElementById("checkin-view");
  const boardingView = document.getElementById("boarding-view");
  const inputId = document.getElementById("input-id");
  const logsBox = document.getElementById("logs-box");

  checkinView.style.display = vista.checkinDisplay;
  boardingView.style.display = vista.boardingDisplay;

  if (vista.limpiarBoarding) {
    boardingView.querySelectorAll(".boarding-card-frame").forEach((el) => el.remove());
  }

  if (vista.limpiarInput) {
    inputId.value = "";
  }

  if (vista.limpiarLogs) {
    logsBox.innerHTML = "";
    logsBox.style.visibility = "visible";
  }
};

const mostrarBoardingPass = (pase) => {
  renderBoardingPass(crearVistaBoardingPass(pase));
};

const volverAlCheckIn = () => {
  renderCheckIn(crearVistaCheckIn());
};