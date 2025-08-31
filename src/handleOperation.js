function handleOperation(op) {
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
