const taskInput     = document.querySelector("#taskInput");
const addTaskButton = document.querySelector("#addTask");
const taskList      = document.querySelector("#taskList");
const contador      = document.querySelector("#contador");

// ── Adicionar tarefa ───────────────────────────────
addTaskButton.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  createTask(text);
  saveTasks();
  updateContador();

  taskInput.value = "";
  taskInput.focus();
});

// Permite adicionar com Enter
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTaskButton.click();
});

// ── Criar elemento de tarefa ───────────────────────
function createTask(text, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  if (completed) span.classList.add("completed");

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    saveTasks();
    updateContador();
  });

  const removeButton = document.createElement("button");
  removeButton.innerText = "x";

  removeButton.addEventListener("click", () => {
    li.remove();
    saveTasks();
    updateContador();
    checkVazio();
  });

  li.appendChild(span);
  li.appendChild(removeButton);
  taskList.appendChild(li);

  checkVazio();
}

// ── Salvar no LocalStorage ─────────────────────────
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li span").forEach(span => {
    tasks.push({
      text: span.innerText,
      completed: span.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ── Carregar do LocalStorage ───────────────────────
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach(task => createTask(task.text, task.completed));
}

// ── Atualizar contador ─────────────────────────────
function updateContador() {
  const total      = document.querySelectorAll("#taskList li").length;
  const concluidas = document.querySelectorAll("#taskList .completed").length;

  if (total === 0) {
    contador.textContent = "";
  } else {
    contador.textContent = total + " tarefa" + (total > 1 ? "s" : "") + " - " + concluidas + " concluida" + (concluidas !== 1 ? "s" : "");
  }
}

// ── Mensagem lista vazia ───────────────────────────
function checkVazio() {
  const existente = document.querySelector(".vazio");
  const total = document.querySelectorAll("#taskList li").length;

  if (total === 0 && !existente) {
    const vazio = document.createElement("p");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma tarefa por aqui ainda...";
    taskList.appendChild(vazio);
  } else if (total > 0 && existente) {
    existente.remove();
  }
}

// ── Inicializar ────────────────────────────────────
loadTasks();
updateContador();
checkVazio();
