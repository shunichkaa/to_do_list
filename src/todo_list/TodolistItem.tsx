import React, { ChangeEvent, useState } from "react";
import { FilterValues, Task, Todolist } from "../App";
import { Button } from "../Button";

type Props = {
    todolist: Todolist;
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    changeFilter: (todolistId: string, filter: FilterValues) => void;
    createTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const TodolistItem: React.FC<Props> = ({
                                                  todolist: { id, title, filter },
                                                  tasks,
                                                  deleteTask,
                                                  changeFilter,
                                                  createTask,
                                                  changeTaskStatus,
                                              }) => {
    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim();
        if (trimmedTitle !== "") {
            createTask(trimmedTitle);
            setTaskTitle("");
        } else {
            setError("Title is required");
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
        setError(null);
    };

    const changeFilterHandler = (filterValue: FilterValues) => {
        changeFilter(id, filterValue);
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={handleTitleChange}
                    className={error ? "error" : ""}
                />
                <Button title="+" onClick={createTaskHandler} />
                {error && <div className="error-message">{error}</div>}
            </div>

            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id} className={task.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                            />
                            <span>{task.title}</span>
                            <Button title="x" onClick={() => deleteTask(task.id)} />
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')} />
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')} />
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')} />
            </div>
        </div>
    );
};