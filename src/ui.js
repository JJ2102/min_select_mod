function initUI() {
  const panel = document.createElement("div");
  panel.id = "my-lss-panel";
  panel.style.position = "fixed";
  panel.style.top = "100px";
  panel.style.right = "20px";
  panel.style.backgroundColor = "white";
  panel.style.border = "1px solid black";
  panel.style.padding = "10px";
  panel.style.zIndex = 1000;

  // Button erstellen
  const button = document.createElement("button");
  button.id = "my-button";
  button.innerText = "Klick mich!";
  panel.appendChild(button);

  document.body.appendChild(panel);

  // Button-Event
  button.addEventListener("click", () => {
    startAction();
  });
}
