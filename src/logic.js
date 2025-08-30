function startAction() {
  getApiDatam("https://www.leitstellenspiel.de/einsaetze.json")
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    });
}

function initLogic() {
  console.log("Logik geladen");
}
