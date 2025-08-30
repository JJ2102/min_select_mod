function startAction() {
  getApiData("https://www.leitstellenspiel.de/einsaetze.json")
    .then((data) => {
      console.log(typeof data);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    });
}

function initLogic() {
  console.log("Logik geladen");
}
