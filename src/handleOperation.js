const IGNORED_REQUIREMENTS = [
  "water_needed", // späteres feature
  "foam_needed", // späteres feature
];

let additionalToId;
let requirementsToId;

function handleOperation(op) {
  try {
    additionalToId = JSON.parse(GM_getResourceText("additionalToId"));
    requirementsToId = JSON.parse(GM_getResourceText("requirementsToId"));
  } catch (error) {
    console.error("Fehler beim laden der to id dateien", error);
  }

  console.log(additionalToId);

  if (!op) return alert("Kein passender Einsatz gefunden");

  let requirements = handleAdditional(op.additional, op.requirements || {});

  if (Object.keys(requirements).length === 0) {
    return alert("Keine Anforderungen vorhanden.");
  }

  selectMinRequiredVehicles(requirements, op.chances);

  const msg = Object.entries(requirements).map(([typ, amount]) => {
    return `${typ}: ${amount}`;
  });
  console.log(requirements);
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

    let ids = requirementsToId[requirement] || additionalToId[requirement];
    if (!ids) {
      unmapped.push(requirement);
      return;
    }

    let selected = 0;
    for (const id of ids) {
      const boxes = document.querySelectorAll(
        `input.vehicle_checkbox[vehicle_type_id="${id}"]`
      );

      for (const box of boxes) {
        if (!box.checked && selected < amount) {
          box.click();
          selected++;
        }
      }

      if (selected >= amount) break;
    }

    if (selected < amount) {
      missing.push({ requirement, missing: amount - selected });
    }
  });

  if (unmapped.length) {
    alert("Kein Mapping für: \n" + unmapped.join("\n"));
  }

  if (missing.length) {
    const msg = missing.map(({ requirement, missing }) => {
      return `${requirement}: ${missing}`;
    });
    alert("Nicht genügend Fahrzeuge:\n" + msg.join("\n"));
  }
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
