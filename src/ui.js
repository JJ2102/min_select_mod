function initUI() {
  const btnID = "min_btn";
  const btnContent = "Select min";
  const alarmBtn = document.getElementById("alert_btn");

  if (alarmBtn) {
    if (document.getElementById(btnID)) return;

    const btn = document.createElement("button");
    btn.id = btnID;
    btn.textContent = btnContent;
    btn.classList.add("btn", "btn-success");
    alarmBtn.parentNode.insertBefore(btn, alarmBtn);

    btn.addEventListener("click", () => {
      startAction();
    });
  }
}
