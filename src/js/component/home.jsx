import React, { useState, useEffect } from "react";
import "../../styles/index.css"
//create your first component
const urlBase = "https://assets.breatheco.de/apis/fake/todos/user/";
const apiUsername = "jesusgomez";
const initialValue = {
	label: "",
	done: false,
}
const Home = () => {
	const [todoList, setTodoList] = useState([]);
	const [task, setTask] = useState(initialValue)

	const fetchTodoApi = async () => {
		try {
			const response = await fetch(`${urlBase}${apiUsername}`);
			const data = await response.json();
			setTodoList(data);
		} catch (error) {
			console.log(error);
		}
	}
	const handleNewTask = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value });
	};
	const updateTodos = async (newTodoList) => {
		try {
			const response = await fetch(`${urlBase}${apiUsername}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodoList),
			});
			if (response.ok === true) {
				fetchTodoApi();
			}
		} catch (error) {
			console.error
		}
	}
	const handleDeleteList = () => {
		updateTodos([{ label: "Agrega una tarea :)", done: false }])
		fetchTodoApi()
	}
	const handleAddTask = (event) => {
		if (event.key === "Enter") {
			const newTask = task;
			const newTodoList = [...todoList, newTask];
			updateTodos(newTodoList)
			setTask(initialValue);
			console.log(event);
		}
	}

	const handleDeleteTask = (id) => {
		let newTodoList = todoList.filter((item, index) => index != id);
		updateTodos(newTodoList)
		setTodoList(newTodoList);
	}
	useEffect(() => {
		fetchTodoApi()
	}, [])
	return (
		<div className=" d-flex justify-content-center align-items-center">
			<div className="cardpage" >
				<h1 className="text-center mt-5 todotitle fw-lighter">Todo list</h1>
				<div className="card m-5 fw-lighter paperBackground" >
					<div className="card-body ">
						<ul className="list-group list-group-flush ">
							<div className="d-flex justify-content-between w-100 gap-2">
								<input
									className="list-group-item transparentBackground fs-4 borderinput w-100 rounded"
									type="text" placeholder="New Task"
									name="label"
									onChange={(event) => { handleNewTask(event) }}
									onKeyDown={(event) => handleAddTask(event)} value={task.label}>
								</input>
								<button className="btn btn-outline-danger" onClick={() => handleDeleteList()}>Delete List</button>
							</div>
							{todoList.map((task, index) => {
								return (
									<li className="list-group-item transparentBackground d-flex justify-content-between fs-4" key={`${task}-${index}`}>
										{task.label}<button type="button" className="transparentBackground borderNone buttonHover fs-4" onClick={() => handleDeleteTask(index)}><i className="fas fa-times buttonHover"></i></button>
									</li>
								);
							})}
						</ul>
					</div>
					<div className="card-footer fs-5 fw-bolder">{todoList.length} pending tasks</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
