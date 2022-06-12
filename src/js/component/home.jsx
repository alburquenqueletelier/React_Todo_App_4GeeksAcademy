import React, { useEffect, useState } from "react";
import "./home.css";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [tasks, setTasks] = useState([]);
	const [empty, setEmpty] = useState(true);
	const [deleteTask, setDeleteTask] = useState(null);

	function addTask(event) {
		// console.log(event.target.value);
		if (inputValue == "")
			return alert("Debes escribir una tarea para agregar");
		if (event.key === "Enter" || event.type == "click") {
			setTasks([...tasks, inputValue]);
			setEmpty(false);
			return setInputValue("");
		}
	}

	function deleteOpt(event) {
		event.preventDefault();
		setDeleteTask(event.target.innerText);
	}

	function deleteFunction() {
		let updateTasks = tasks.filter((task) => task != deleteTask);
		return setTasks(updateTasks);
	}

	return (
		<div className="container bg-light p-3">
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
			{empty ? (
				<h3 className="text-center">No hay tareas. Añade una tarea</h3>
			) : (
				<div className="task-list">
					<ul className="list-group">
						{!!tasks &&
							tasks.map((val, index) => {
								return (
									<li
										className="list-group-item d-flex justify-content-between"
										key={index}
										onMouseEnter={(e) => deleteOpt(e)}
										onMouseLeave={() =>
											setDeleteTask(null)
										}>
										{val}
										{deleteTask == tasks[index] && (
											<button
												type="button"
												className="btn btn-danger"
												onClick={deleteFunction}>
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
