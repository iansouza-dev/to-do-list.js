const inputTarefa = document.getElementById("tarefa");
const botaoAdicionar = document.getElementById("adicionar");
const lista = document.getElementById("lista");

function criarItem(texto, done = false) {
  const li = document.createElement("li");
  li.dataset.done = String(done);

  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;
  spanTexto.style.textDecoration = done ? "line-through" : "none";
  li.appendChild(spanTexto);

  spanTexto.addEventListener("click", function () {
    const novo = !(li.dataset.done === "true");
    li.dataset.done = String(novo);
    spanTexto.style.textDecoration = novo ? "line-through" : "none";
    salvarTarefas();
    // debug:
    // console.log("toggle:", { texto, novo });
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "❌";
  botaoRemover.style.marginLeft = "10px";
  botaoRemover.addEventListener("click", function () {
    lista.removeChild(li);
    salvarTarefas();
  });

  li.appendChild(botaoRemover);
  lista.appendChild(li);
}

function salvarTarefas() {
  const itens = [];
  document.querySelectorAll("#lista li").forEach(li => {
    const span = li.querySelector("span");
    const texto = span.textContent.trim();
    // fonte principal: dataset; fallback: estilo
    const doneByDataset = li.dataset.done === "true";
    const doneByStyle = span.style.textDecoration === "line-through";
    const done = doneByDataset || doneByStyle;
    itens.push({ texto, done });
  });
  localStorage.setItem("tarefas", JSON.stringify(itens));
  // debug:
  // console.log("SALVO:", JSON.parse(localStorage.getItem("tarefas") || "[]"));
}

function carregarTarefas() {
  const salvas = JSON.parse(localStorage.getItem("tarefas") || "[]");

  if (salvas.length > 0 && typeof salvas[0] === "string") {
    // formato antigo: só textos
    salvas.forEach(t => criarItem(t, false));
    salvarTarefas(); // migra para o novo formato
  } else {
    // formato novo: { texto, done }
    salvas.forEach(item => {
      const texto = item.texto ?? "";
      const done = item.done === true || item.done === "true";
      criarItem(texto, done);
    });
  }
}

botaoAdicionar.addEventListener("click", function () {
  const texto = inputTarefa.value.trim();
  if (texto === "") {
    alert("Digite uma tarefa");
    return;
  }
  criarItem(texto);
  salvarTarefas();
  inputTarefa.value = "";
});

inputTarefa.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    botaoAdicionar.click();
  }
});

carregarTarefas();
