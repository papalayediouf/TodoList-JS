//Recuperation des id
const taskNameInput = document.getElementById('task-name');
const taskDescInput = document.getElementById('task-desc');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterInput = document.getElementById('filter-input');

//  le LocalStorage
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Fonction pour sauvegarder une tache dans LocalStorage
function saveTaskToLocalStorage(taskName, taskDesc) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ name: taskName, desc: taskDesc });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour charger les taches depuis LocalStorage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.name, task.desc));
}

// Fonction pour supprimer une tache de LocalStorage
function deleteTaskFromLocalStorage(taskName) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.name !== taskName);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour ajouter une tache dans le DOM
function addTaskToDOM(taskName, taskDesc) {
  const taskItem = document.createElement('li');
  taskItem.className = 'flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm';
  taskItem.dataset.name = taskName.toLowerCase(); 
  taskItem.dataset.desc = taskDesc.toLowerCase(); 

  taskItem.innerHTML = `
    <div>
      <h3 class="font-bold text-gray-700">Tache: ${taskName}</h3>
      <p class="text-sm text-gray-500">Description: ${taskDesc}</p>
    </div>
    <button class="text-red-500 hover:text-red-600 font-bold">Supprimer</button>
  `;

  // Bouton pour supprimer la tache
  const deleteButton = taskItem.querySelector('button');
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
    deleteTaskFromLocalStorage(taskName); // Supprime la tache du LocalStorage
  });

  // Ajoute la tâche à la liste
  taskList.appendChild(taskItem);
}

// Fonction pour ajouter une tâche 
addTaskButton.addEventListener('click', (e) => {
  e.preventDefault(); 
  
  const taskName = taskNameInput.value.trim();
  const taskDesc = taskDescInput.value.trim();

  if (taskName === '' || taskDesc === '') {
    alert('Veuillez remplir les deux champs.');
    return;
  }

  // Ajoute la tache dans le DOM et dans LocalStorage
  addTaskToDOM(taskName, taskDesc);
  saveTaskToLocalStorage(taskName, taskDesc);

  // Vide les champs
  taskNameInput.value = '';
  taskDescInput.value = '';
});

// Fonction pour filtrer les taches
filterInput.addEventListener('input', () => {
  const filterText = filterInput.value.toLowerCase();
  const tasks = document.querySelectorAll('#task-list li');

  tasks.forEach(task => {
    const taskName = task.dataset.name;
    const taskDesc = task.dataset.desc;

    // Affiche uniquement les taches qui correspondent au filtre
    if (taskName.includes(filterText) || taskDesc.includes(filterText)) {
      task.style.display = 'flex'; 
    } else {
      task.style.display = 'none';
    }
  });
});
