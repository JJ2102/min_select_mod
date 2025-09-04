let btn;
const btnContent = "Select min";

function initUI() {
  // add Button
  const btnID = "min_btn";
  const alarmBtn = document.getElementById("alert_btn");

  if (alarmBtn) {
    if (document.getElementById(btnID)) return;

    btn = document.createElement("button");
    btn.id = btnID;
    btn.type = "button";
    btn.textContent = btnContent;
    btn.classList.add("btn", "btn-success");
    alarmBtn.parentNode.insertBefore(btn, alarmBtn);

    btn.addEventListener("click", () => {
      startAction();
    });
  }
}

function changeBtnText(text, disabled) {
  if (!btn) return;
  btn.textContent = text || btnContent;
  btn.disabled = disabled || false;
}
