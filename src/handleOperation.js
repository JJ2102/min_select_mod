const IGNORED_REQUIREMENTS = [
  "water_needed", // späteres feature
  "foam_needed", // späteres feature
];

function handleOperation(op) {
  try {
    const additionalToId = JSON.parse(GM_getResourceText("additionalToId"));
    const requirementsToId = JSON.parse(GM_getResourceText("requirementsToId"));
  } catch (error) {
    console.error("Fehler beim laden der to id dateien", error);
  }

  console.log(additionalToId);

  if (!op) return alert("Kein passender Einsatz gefunden");

  let requirements = handleAdditional(op.additional, op.requirements || {});

  if (Object.keys(requirements).length === 0) {
    return alert("Keine Anforderungen vorhanden.");
  }

  const msg = Object.entries(requirements).map(([typ, amount]) => {
    return `${typ}: ${amount}`;
  });
  alert("Benötigt:\n" + msg.join("\n"));
}

function selectMinRequiredVehicles(requirements, chances) {
  const missing = [];
  const unmapped = [];

  Object.entries(requirements).forEach(([requirement, amount]) => {
    if (IGNORED_REQUIREMENTS.includes(requirement)) {
      return console.log(`Ignoriere: ${requirement}`);
    }

    if (requirement in chances) return;
  });
}

/** ======= Helper ======= */
// überprüft die additionals
function handleAdditional(additional, requirements) {
  if (!additional) return;

  // fügt bei bedarf die benötigte anzahl an rtws den requirements hinzu
  if (additional.possible_patient_min > 0) {
    requirements.patient =
      (requirements.patient || 0) + additional.possible_patient_min;
  }

  return requirements;
}
