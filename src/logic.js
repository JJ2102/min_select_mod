function startAction() {
  getApiData("https://www.leitstellenspiel.de/einsaetze.json")
    .then((data) => {
      alert("API erfolgreich");
      console.log(data);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    });
}

function initLogic() {
  console.log("Logik geladen");
}
