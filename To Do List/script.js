const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        // Create a new list item (task)
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Add a span for the delete button (task remove option)
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Cross symbol
        li.appendChild(span);

        // Add the task to the list container
        listContainer.appendChild(li);

        // Add event listener to remove task when cross is clicked
        span.addEventListener('click', function () {
            li.remove();
            saveData(); // Save after task removal
        });
    }

    // Clear the input field after adding the task
    inputBox.value = "";
    saveData(); // Save the data after task addition
}

// Function to save tasks to localStorage
function saveData() {
    let tasks = [];
    let taskList = listContainer.getElementsByTagName("li");
    
    // Loop through each task and store the task text in the tasks array
    for (let i = 0; i < taskList.length; i++) {
        tasks.push(taskList[i].textContent.replace("\u00d7", "").trim());
    }
    
    // Store the tasks array in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load saved tasks on page load
function loadData() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    
    if (savedTasks) {
        savedTasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7"; // Cross symbol
            li.appendChild(span);
            listContainer.appendChild(li);

            // Add event listener for task removal
            span.addEventListener('click', function () {
                li.remove();
                saveData(); // Save after task removal
            });
        });
    }
}

// Call loadData to load saved tasks when the page loads
window.onload = loadData;
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function voice() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-GB";

    recognition.onresult = function (event) {
        inputBox.value = event.results[0][0].transcript;
    };

    recognition.onerror = function (event) {
        console.error("Speech Recognition Error: ", event.error);
    };

    recognition.start();
}
