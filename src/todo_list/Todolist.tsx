import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValues, Task } from "../App";

type TaskItemProps = {
    task: Task;
    onStatusChange: (taskId: string, isDone: boolean) => void;
    onRemove: (taskId: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onRemove }) => (
    <li className={task.isDone ? "is-done" : ""}>
        <label>
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => onStatusChange(task.id, e.currentTarget.checked)}
            />
            <span>{task.title}</span>
        </label>
        <button onClick={() => onRemove(task.id)}>x</button>
    </li>
);

type FilterButtonsProps = {
    filter: FilterValues;
    onFilterChange: (filter: FilterValues) => void;
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, onFilterChange }) => (
    <div>
        <button className={filter === "all" ? "active-filter" : ""} onClick={() => onFilterChange("all")}>All</button>
        <button className={filter === "active" ? "active-filter" : ""} onClick={() => onFilterChange("active")}>Active</button>
        <button className={filter === "completed" ? "active-filter" : ""} onClick={() => onFilterChange("completed")}>Completed</button>
    </div>
);

type TodolistProps = {
    title: string;
    tasks: Task[];
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValues) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValues;
};

export const Todolist: React.FC<TodolistProps> = ({
                                                      title,
                                                      tasks,
                                                      removeTask,
                                                      changeFilter,
                                                      addTask,
                                                      changeTaskStatus,
                                                      filter,
                                                  }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        setError(null);
    };

    const handleTaskAdd = () => {
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle) {
            addTask(trimmedTitle);
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleTaskAdd();
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={handleNewTitleChange}
                    onKeyDown={handleKeyDown}
                    className={error ? "error" : ""}
                />
                <button onClick={handleTaskAdd}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onStatusChange={changeTaskStatus}
                        onRemove={removeTask}
                    />
                ))}
            </ul>
            <FilterButtons filter={filter} onFilterChange={changeFilter} />
        </div>
    );
};