function handleOperation(op) {
  if (!op) return alert("Kein passender Einsatz gefunden");

  let requirements = handleAdditional(op.additional, op.requirements || {});

  if (Object.keys(requirements).length === 0) {
    return alert("Keine Anforderungen vorhanden.");
  }

  getApiData("https://api.lss-manager.de/de_DE/einsaetze")
    .then((data /* firetruck -> Löschfahrzeug */) => {
      requirementsAsVehicle = getVehiclesFromTyp(
        requirements,
        data.requirements
      );

      const msg = requirementsAsVehicle.map((obj) => {
        const [typ, amount] = Object.entries(obj)[0];
        return `${typ}: ${amount}`;
      });
      alert("Benötigt:\n" + msg.join("\n"));
    })
    .catch((error) => {
      console.error("Fehler beim holen der fahrzeug typen:", error);
    });
}

/** ======= Helper ======= */
// überprüft die additionals
function handleAdditional(additional, requirements) {
  if (!additional) return;

  // fügt bei bedarf die benötigte anzahl an rtws den requirements hinzu
  if (additional.possible_patient_min > 0) {
    requirements.ambulances =
      (requirements.ambulances || 0) + additional.possible_patient_min;
  }

  return requirements;
}

function getVehiclesFromTyp(requirements, vehicleMap) {
  return Object.entries(requirements).map(([typ, amount]) => {
    const vehicle = vehicleMap[typ] || typ;
    return { [vehicle]: amount };
  });
}
