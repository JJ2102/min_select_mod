function startAction() {
  changeBtnText("Lade...", true);

  // holt die Einsatz-Id
  const missionId = getMissionId();
  if (!missionId) return console.error("Keine Einsatz-ID gefunden");

  // holt sich eine JSON aller Einsätze
  getApiData("https://www.leitstellenspiel.de/einsaetze.json")
    .then((data /* Alle Einsätze */) => {
      console.log("Einsätze erfolgreich geladen...");
      const currentOperation = getCurentOperation(data, missionId);
      console.log(currentOperation);
      alert(`Akktueller Einsatz:\n${currentOperation.name}`);
    })
    .catch((error) => {
      console.error("Fehler:", error);
    })
    .finally(() => {
      changeBtnText();
    });
}

// returt die akktuelle Einsatz-Id
function getMissionId() {
  const el = document.querySelector("#mission_help");
  if (!el) return null;
  const match = el.href.match(/\/einsaetze\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function getCurentOperation(allOperations, id) {
  return (
    allOperations.find((op) => parseInt(op.id, 10) === parseInt(id, 10)) || null
  );
}

function initLogic() {
  console.log("Logik geladen");
}
