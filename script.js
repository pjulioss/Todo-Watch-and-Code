var todoList = {
	todos: [],
	addTodos: function (todoText) {
			this.todos.push({
			todoText: todoText,
			completed: false
		});
	},

	changeTodos: function (position, todoText) {
		this.todos[position].todoText = todoText;
	},

	deleteTodos: function (position) {
		this.todos.splice(position, 1);
	},

	toggleCompleted: function (position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},

	toggleAll: function () {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		this.todos.forEach(function(todo) {
			if(todo.completed === true){
				completedTodos++;
			}	
		});

		if (completedTodos === totalTodos) {
			this.todos.forEach(function(todo){
				todo.completed = false;
			});
		} else {
				this.todos.forEach(function(todo){
					todo.completed = true;
				});
		}
	}
};


var handlers = {
	addTodo: function(){
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		todoList.addTodos(addTodoTextInput.value);
		addTodoTextInput.value = ""; //limpar o campo de texto após um valor ser inserido
		view.displayTodos();
	},
	changeTodo: function(){
		var changeTodoInputPosition = document.getElementById('changeTodoInputPosition');
		var changeTodoInputText = document.getElementById('changeTodoInputText');
		todoList.changeTodos(changeTodoInputPosition.valueAsNumber, changeTodoInputText.value);
		changeTodoInputPosition.value = "";
		changeTodoInputText.value = "";
		view.displayTodos();
	},
	deleteTodo: function(position){
		todoList.deleteTodos(position);
		view.displayTodos();
	},
	toggleAsComplete: function(){
		var toggleAsComplete = document.getElementById("toggleAsComplete");
		todoList.toggleCompleted(toggleAsComplete.valueAsNumber);
		toggleAsComplete.value = "";
		view.displayTodos();
	},
	toggleAll: function(){
		todoList.toggleAll();
		view.displayTodos();
	}
}

var view = {
	displayTodos: function(){
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";
		
		todoList.todos.forEach(function(todo, position){
			var todosLi = document.createElement("li");
			var todoMark = "";

			if(todo.completed === true){
				todoMark = '(x) ' + todo.todoText;
			} else {
				todoMark = '( ) ' + todo.todoText;
			}

			todosLi.id = position;
			todosLi.textContent = todoMark;
			todosLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todosLi);
		}, this);
	},
	createDeleteButton: function(){
		var deleteButton = document.createElement("button");
		deleteButton.textContent = "x";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	setUpEventListeners: function(){
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener("click", function(event){
			var elementClicked = event.target;
			if (elementClicked.className === "deleteButton"){
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

view.setUpEventListeners();