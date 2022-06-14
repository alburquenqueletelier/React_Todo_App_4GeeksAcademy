import React, { useEffect, useState } from "react";
import "./home.css";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [deleteTask, setDeleteTask] = useState(null);
	const [name, setName] = useState("baal");
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		if (name) loadTasks(name);
	}, []);

	useEffect(() => {
		if (tasks.length !== 0 && name) changeList(name, tasks);
	}, [tasks, name]);

	function submitName(name) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + name, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				// console.log(response);
				if (!response.ok) throw response.json();
				alert("Nombre creado con exito");
				return response.json();
			})
			.catch((error) => {
				console.log(error);
				alert("The name alredy exist in data base");
				return loadTasks(name);
			});
	}

	function loadTasks(fName) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + fName, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) return response.json();
				throw response;
			})
			.then((data) => {
				setTasks(data);
			})
			.catch((error) => {
				console.log(error);
				return submitName(fName);
			});
	}

	function changeList(fName, tasks_list) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + fName, {
			method: "PUT",
			body: JSON.stringify(tasks_list),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				throw resp.json();
			})
			.catch((error) => {
				//error handling
				console.log(error);
				return setTasks([]);
			});
	}

	function addTask(event) {
		if (inputValue == "")
			return alert("Debes escribir una tarea para agregar");
		if (event.key === "Enter" || event.type == "click") {
			let newTask = { label: inputValue, done: false };
			setTasks([...tasks, newTask]);
			return setInputValue("");
		}
	}

	function deleteFunction(key) {
		let updateTasks = tasks.filter((task, index) => index !== key);
		return setTasks(updateTasks);
	}

	function deleteName(name) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/" + name, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
		setTasks([]);
		return setName("");
	}

	return (
		<div className="container bg-light p-3">
			<h3>Your Name: </h3>
			<div>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyPress={(e) =>
						e.key == "Enter" && submitName(name)
					}></input>
				<button
					type="button"
					className="btn btn-primary"
					onClick={() => submitName(name)}>
					Create/Load
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => deleteName(name)}>
					Delete
				</button>
			</div>
			<h1 className="text-center mt-5 bg-primary text-dark">
				Add a task
			</h1>
			<div className="d-flex justify-content-center">
				<input
					type="text"
					className="form-control"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyPress={(e) => e.key == "Enter" && addTask(e)}
				/>
				<button
					type="button"
					className="btn btn-success m-2"
					onClick={(e) => addTask(e)}>
					Add
				</button>
			</div>
			{tasks.length === 0 ? (
				<h3 className="text-center mt-1">
					No hay tareas. Añade una tarea
				</h3>
			) : (
				<div className="task-list">
					<ul className="list-group">
						{!!tasks &&
							tasks.map((val, index) => {
								return (
									<li
										className="list-group-item d-flex justify-content-between"
										key={index}
										onMouseEnter={() =>
											setDeleteTask(index)
										}
										onMouseLeave={() =>
											setDeleteTask(null)
										}>
										{val.label}
										{deleteTask == index && (
											<button
												type="button"
												className="btn btn-danger"
												onClick={() =>
													deleteFunction(index)
												}>
												{" "}
												X{" "}
											</button>
										)}
									</li>
								);
							})}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Home;
