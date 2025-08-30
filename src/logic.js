function startAction() {
  changeBtnText("Lade...", true);

  getApiData("https://www.leitstellenspiel.de/einsaetze.json")
    .then((data) => {
      console.log("Einsätze erfolgreich geladen:");
      console.log(data);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    })
    .finally(() => {
      changeBtnText();
    });
}

function initLogic() {
  console.log("Logik geladen");
}
