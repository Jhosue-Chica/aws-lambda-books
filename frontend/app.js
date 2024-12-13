const apiBaseUrl = "https://ndl021o79f.execute-api.us-east-1.amazonaws.com";

// Función para agregar tarea
document.getElementById("addTaskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const task = { title, description };

  const response = await fetch(`${apiBaseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  const newTask = await response.json();
  loadTasks(); // Recargar la lista de tareas
});

// Función para cargar las tareas
async function loadTasks() {
  const response = await fetch(`${apiBaseUrl}/tasks`);
  const data = await response.json();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ''; // Limpiar la lista antes de cargar nuevas tareas

  data.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description}<br>
      <button onclick="deleteTask('${task.id}')">Eliminar</button>
      <button onclick="updateTask('${task.id}')">Actualizar</button>
    `;
    taskList.appendChild(li);
  });
}

// Función para eliminar tarea
async function deleteTask(id) {
  await fetch(`${apiBaseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
  loadTasks(); // Recargar la lista después de eliminar
}

// Función para actualizar tarea (marcar como completada o editar)
async function updateTask(id) {
  const newTitle = prompt("Nuevo título");
  const newDescription = prompt("Nueva descripción");
  const done = confirm("¿Está completada la tarea?");

  const updatedTask = {
    title: newTitle,
    description: newDescription,
    done,
  };

  await fetch(`${apiBaseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });

  loadTasks(); // Recargar la lista después de actualizar
}

// Cargar las tareas al inicio
loadTasks();
