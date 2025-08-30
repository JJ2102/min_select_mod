function startAction() {
  getApiData("https://www.leitstellenspiel.de/einsaetze.json")
    .then((data) => {
      console.log("Einsätze erfolgreich geladen:");
      console.log(data);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    });
}

function initLogic() {
  console.log("Logik geladen");
}
