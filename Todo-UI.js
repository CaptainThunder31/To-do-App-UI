const app = new TodoApp();

const navToggle =
  document.getElementById("nav-toggle");
const navCross = document.getElementById('nav-cross');

const navSlide = document.getElementById('nav-slide');

const header = document.getElementById('header');

const taskBtn = document.getElementById('taskBtn');

const textInput = document.getElementById('areaTextTask');

const wrapper = document.getElementById('wrapper');
const opt = document.getElementById('operations');

let isBtnTransformed = false;
let isOptDown = false;
let tasks = app.getTasks();

let lastTap = 0;
const doubleTapDelay = 300;
navToggle.onclick = () => {
  navSlide.style.animation = "slide 0.5s ease-out forwards";
}

navCross.onclick = () => {
  navSlide.style.animation = "slideBack 0.5s ease-in forwards";
}

document.addEventListener("DOMContentLoaded", () => {

  // Function to render tasks in the taskList div
  function renderTasks() {
    wrapper.innerHTML = ""; // Clear existing content
    tasks.forEach(task => {
      let currentId = 1;
      const taskDiv = document.createElement("div");
      taskDiv.textContent = task.task;
      taskDiv.classList.add('taskDiv')
      taskDiv.setAttribute('data-id', currentId)
      wrapper.appendChild(taskDiv);
      currentId++;
    });

    const taskDiv = document.querySelectorAll('.taskDiv');
    
    let selectedTasks = [];
    
wrapper.addEventListener('click', function(e) {
  if (e.target.classList.contains('taskDiv')) {
    const itemId = e.target.getAttribute('data-id');
    
    // Toggle selection
    if (selectedTasks.includes(itemId)) {
      selectedTasks = selectedTasks.filter(id => id !== itemId);
      e.target.classList.remove('selected');
    } else {
      selectedTasks.push(itemId);
      e.target.classList.add('selected');
    }
    
    console.log(selectedTasks);  // Output selected item IDs
  }
});

// Example: Add new items dynamically


  }

  // Load existing tasks when the window is loaded
  renderTasks();

  taskBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    taskBtn.style.animation = "transform 0.5s ease-out forwards";
    taskBtn.innerHTML = "+";

    textInput.style.animation = "tInptransform 0.5s ease-out forwards";

    setTimeout(function() {
      isBtnTransformed = true;
    }, 500);

    if (isBtnTransformed) {

      const newTask = textInput.value.trim();

      if (newTask !== "") {

        app.addTask(newTask);
        renderTasks();
        textInput.value = "";
      }

      const currentTime = new Date().getTime();
      const tapGap = currentTime - lastTap;

      if (tapGap < doubleTapDelay && tapGap > 0) {
        opt.style.animation = "show 0.5s ease-out forwards";
        wrapper.style.marginTop = "100px";
        isOptDown = true;
      }

      lastTap = currentTime;
    }
  });

});



document.addEventListener('click', (event) => {

  if (!taskBtn.contains(event.target) && !textInput.contains(event.target) && isBtnTransformed) {

    taskBtn.style.animation = "revtransform 0.5s ease-out forwards";
    taskBtn.innerHTML = "+Add Task";

    textInput.style.animation = "revtInptransform 0.5s ease-out forwards";

    textInput.value = "";
  }
});

