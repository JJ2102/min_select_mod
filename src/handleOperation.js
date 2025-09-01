const IGNORED_REQUIREMENTS = [
  "water_needed", // späteres feature
  "foam_needed", // späteres feature
];

let additionalToId;
let requirementsToId;
let oneofToId;
let VehicleId;

function handleOperation(op) {
  try {
    additionalToId = JSON.parse(GM_getResourceText("additionalToId"));
    requirementsToId = JSON.parse(GM_getResourceText("requirementsToId"));
    oneofToId = JSON.parse(GM_getResourceText("oneofToId"));
    VehicleId = JSON.parse(GM_getResourceText("VehicleId"));
  } catch (error) {
    console.error("Fehler beim laden der to id dateien", error);
  }

  if (!op) return alert("Kein passender Einsatz gefunden");

  let requirements = handleAdditional(op.additional, op.requirements || {});
  requirements = normalizeRequirements(requirements);

  if (Object.keys(requirements).length === 0) {
    return alert("Keine Anforderungen vorhanden.");
  }

  const { ids, unmapped } = getRequiredIds(requirements, op.chances);

  if (unmapped.length) {
    alert("Kein Mapping für: \n" + unmapped.join("\n"));
  }

  selectMinRequiredVehicles(ids);

  console.log(requirements);
}

function selectMinRequiredVehicles(ids) {
  const missing = [];

  // Iteriren durch die ids Map
  for (const [idArray, amount] of ids.entries()) {
    let selected = 0;

    // Iteriren durch die einzelenen ids
    for (const id of idArray) {
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
      const missingVehicles = [];

      for (const id of idArray) {
        missingVehicles.push(VehicleId[id] || id);
      }

      missing.push({
        required: missingVehicles.join(","),
        missing: amount - selected,
      });
    }
  }

  if (missing.length) {
    const msg = missing.map(({ required, missing }) => {
      return `${required}: ${missing}`;
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

// Holle die benötigten ids aus den json datein und returne sie
function getRequiredIds(requirements, chances) {
  const unmapped = [];
  /**
   * ids = {
   *  [0, 1, 2, 3]: 3,
   *  [31, 23, 43]: 5,
   *  [requiered IDs]: amount // requierment
   * }
   */
  let ids = new Map();

  // Iteriren durch requirements
  Object.entries(requirements).forEach(([requirement, amount]) => {
    // Ignorieren ausgewählter requirements
    if (IGNORED_REQUIREMENTS.includes(requirement)) {
      return console.log(`Ignoriere: ${requirement}`);
    }

    // überspringen nicht zu 100% benötigter requirements
    if (requirement in chances) return;

    // Holen der benötigten ids aus den JSON dateien
    const requiredIDs =
      requirementsToId[requirement] || additionalToId[requirement];

    if (!requiredIDs || requiredIDs.length === 0) {
      unmapped.push(requirement);
      return;
    }

    // einfügen des requierment in ids
    ids.set(requiredIDs, amount);
  });

  return { ids, unmapped };
}

function normalizeRequirements(requirements) {
  const newReqs = { ...requirements }; // Kopie

  // Iteriere durch alle festen Anforderungen
  for (const [fixedReq, fixedAmount] of Object.entries(requirements)) {
    if (fixedAmount <= 0) continue;

    // Prüfe alle OneOf-Anforderungen
    for (const [oneofKey, oneofIds] of Object.entries(oneofToId)) {
      if (!(oneofKey in requirements)) continue; // falls Requirement gar nicht gebraucht wird

      // IDs des festen Requirements holen
      const fixedIds = requirementsToId[fixedReq] || additionalToId[fixedReq];
      if (!fixedIds) continue;

      // Prüfen, ob eine ID des fixedReq in der OneOf-Gruppe vorkommt
      if (fixedIds.some((id) => oneofIds.includes(id))) {
        // OneOf-Anforderung um den festen Anteil reduzieren (mind. 0)
        newReqs[oneofKey] = Math.max(0, newReqs[oneofKey] - fixedAmount);

        console.log(
          `[normalizeRequirements] Reduziere ${oneofKey} um ${fixedAmount}, wegen ${fixedReq}`
        );
      }
    }
  }

  return newReqs;
}
