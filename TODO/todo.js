let todoList = [];
 
function todo() {
	let task = document.querySelector('.task');
	let value = task.value;
	let date = document.querySelector('.date');
	let dateValue = date.value;

	todoList.push({
		name: value,
		dateTime: dateValue 
	});
	
	document.querySelector('.task').value = '';
	showTasks();
	
}

function showTasks() {
	let html = ``;
	for (let i = 0; i < todoList.length; i++){
		let	todohtml = `
		<p>${todoList[i].name} ${todoList[i].dateTime}
		<button onclick="
		todoList.splice(${i} ,1);
		showTasks();
		" >Delete</button>
		</p>`;
		html += todohtml;
	}
	document.querySelector('.dashboard').innerHTML = html;
		
}