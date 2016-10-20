// function to add list item to data
function registerListItem(id, content) {
	var listItem = new ListItem(id, content);
	data.push(listItem);
}

// list item constructor function
function ListItem (id, content) {
	this.id = id;
	this.completed = false;
	this.content = content;
}

// function to add list item to page
function addListItem(id, content, status) {
	var newTodo = document.createElement("li");
	newTodo.classList.add("to-do");
	newTodo.id= "todo" + (id);


	// Create three elements to be inserted into the new todo
	var textSpan = document.createElement("span");
	var itemDeleteButton = document.createElement("button");
	var itemCompleteButton = document.createElement("input");
	itemCompleteButton.setAttribute("type","checkbox");

	// insert the text input into the span
	textSpan.textContent = content;

	// toggle the checkbox appropriately
	itemCompleteButton.checked = status;

	// add classes to the buttons to control them
	itemCompleteButton.classList.add("complete-button");
	itemDeleteButton.classList.add("delete-button");
	itemDeleteButton.textContent = "X";


	// append the items to the newly created li
	newTodo.appendChild(itemCompleteButton);
	newTodo.appendChild(textSpan);
	newTodo.appendChild(itemDeleteButton);

	// put the new list in the array of objects and append the item to the ul
	list.appendChild(newTodo);
}

// Function to render page dynamically
function refreshDisplay (mode) {

		// Clear out list items on screen
	for (var i = list.children.length - 1; i >= 0; i-- ) {
		var removingChild = list.children[i];
		list.removeChild(removingChild);
	}

	var filtered;

	// Display mode "ALL"
	if (mode === 0) {
		for (var i = 0 ; i < data.length ; i++) {
			addListItem(data[i].id, data[i].content, data[i].completed);
		}

		displaying = 0;
	}

	// Display mode "ACTIVE"
	if (mode === 1) {
		filtered = data.filter((value) => (value.completed === false));

		for (var i = 0 ; i < filtered.length ; i++) {
			addListItem(filtered[i].id, filtered[i].content, filtered[i].completed);
		}

		displaying = 1;
	}

	// Display mode "COMPLETED"
	if (mode === 2) {
		filtered = data.filter((value) => (value.completed === true));

		for (var i = 0 ; i < filtered.length ; i++) {
			addListItem(filtered[i].id, filtered[i].content, filtered[i].completed);
		}

		displaying = 2;
	}
}

// empty array to fill with todo objects
var data = [];

var list = document.querySelector("#list-items");
var input = document.querySelector("input");
var showCompleteButton = document.querySelector("#completed-button");
var showActiveButton = document.querySelector("#active-button");
var showAllButton = document.querySelector("#show-all-button");
var idCounter = 1;


var displaying = 0; // 0 - All
					// 1 - Active
					// 2 - Completed



// main event listener for adding todos
input.addEventListener("keydown", function(e) {
	if (e.keyCode === 13 && input.value != "") {

		// add a new object to the list array and create a new li to be inserted, both with id references
		// equal to idCounter
		registerListItem(idCounter, input.value);
		addListItem(idCounter, input.value);
		idCounter++;
		// reset text input to ""
		input.value = "";
	}
});


// Event listener to handle deletions
list.addEventListener("click", function(e) {
	if (e.target.matches(".delete-button")) {
			// grab targeted todo from DOM
		var id = e.target.parentElement.id; 
		var axedItem = document.querySelector("#" + id);

			//remove item from DOM
		// axedItem.parentElement.removeChild(axedItem);
		
			// Find todo in data by id
		id = Number(id.slice(4));
		var index = data.findIndex((value) => (value.id === id));

			// remove item from data
		data.splice(index, 1);


		refreshDisplay(displaying);
	} 
});

// Event listener to handle completions
list.addEventListener("click", function(e) {
	if (e.target.matches(".complete-button")) {
			// grab id of targeted todo from DOM
		var id = e.target.parentElement.id;

			//  Match id to data, set completed property
		id = Number(id.slice(4));
		var index = data.findIndex((value) => (value.id === id));
		data[index].completed = data[index].completed ? false : true;

			// Render to remove item if appropriate
		setTimeout(refreshDisplay.bind(null, displaying), 300);
	} 
});

// Event listener to handle all filter
document.addEventListener("click", function(e) {
	if (e.target.matches("#show-all-button") && !(displaying === 0)) {
		document.querySelector(".active").classList.remove("active");
		showAllButton.parentElement.classList.add("active");
		refreshDisplay(0);
	}
});

// Event listener to handle active filter
document.addEventListener("click", function(e) {
	if (e.target.matches("#active-button") && !(displaying === 1)) {
		document.querySelector(".active").classList.remove("active");
		showActiveButton.parentElement.classList.add("active");
		refreshDisplay(1);
	}
});

// Event listener to handle completed filter
document.addEventListener("click", function(e) {
	if (e.target.matches("#completed-button") && !(displaying === 2)) {
		document.querySelector(".active").classList.remove("active");
		showCompleteButton.parentElement.classList.add("active");
		refreshDisplay(2);
	}
});