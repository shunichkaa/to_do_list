import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react';
import { FilterValues } from "../App";

const MAX_TASK_TITLE_LENGTH = 100;

interface TaskType {
    id: string;
    title: string;
    isDone: boolean;
}

interface TaskItemProps {
    task: TaskType;
    onStatusChange: (taskId: string, isDone: boolean) => void;
    onRemove: (taskId: string) => void;
}

interface TodolistProps {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValues) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValues;
}

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
        <button
            onClick={() => onRemove(task.id)}
            aria-label={`Удалить задачу ${task.title}`}
        >x</button>
    </li>
);

type FilterButtonsProps = {
    filter: FilterValues;
    onFilterChange: (filter: FilterValues) => void;
};

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, onFilterChange }) => {
    const handleFilterChange = useCallback((filter: FilterValues) => () => {
        onFilterChange(filter);
    }, [onFilterChange]);

    return (
        <div>
            <button className={filter === "all" ? "active-filter" : ""} onClick={handleFilterChange("all")}>All</button>
            <button className={filter === "active" ? "active-filter" : ""} onClick={handleFilterChange("active")}>Active</button>
            <button className={filter === "completed" ? "active-filter" : ""} onClick={handleFilterChange("completed")}>Completed</button>
        </div>
    );
};

export const Todolist: React.FC<TodolistProps> = ({
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    filter
}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const handleTaskAdd = () => {
        const trimmedTitle = newTaskTitle.trim();
        if (trimmedTitle) {
            addTask(trimmedTitle);
            setNewTaskTitle("");
        }
        else {
            setError("Title is required");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter" && newTaskTitle.trim()) {
            handleTaskAdd();
        }
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={handleNewTitleChange}
                    onKeyDown={handleKeyDown}
                    aria-label="Новая задача"
                    maxLength={MAX_TASK_TITLE_LENGTH}
                    className={error ? "error" : ""}
                />
                <button
                    onClick={handleTaskAdd}
                    aria-label="Добавить задачу"
                >+</button>
                {error && <div className={"error-message"}>{error}</div>}
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
            <FilterButtons 
                onFilterChange={changeFilter} 
                filter={filter} // передаем filter
            />
        </div>
    );
};