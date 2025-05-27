import { Task } from "../App";
import { ChangeEvent } from "react";
import { Button } from "../components/button/Button";
import { CreateItemForm } from "../components/createItemForm/CreateItemForm";
import { EditableSpan } from "../components/editableSpan/EditableSpan";

type FilterValues = 'all' | 'active' | 'completed';

type Todolist = {
    id: string;
    title: string;
    filter: FilterValues;
}

type Props = {
    todolist: Todolist;
    tasks: Task[];
    deleteTask: (taskId: string) => void;
    changeFilter: (todolistId: string, filter: FilterValues) => void;
    createTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    deleteTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void

}

export const TodolistItem = (props: Props) => {
    const {
        todolist: { id, title, filter },
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    } = props;

    const changeTaskStatusHandler = (taskId: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        changeTaskStatus(taskId, newStatusValue);
    };

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter);
    };

    const deleteTodolistHandler = () => {
        deleteTodolist(id);
    };

    const deleteTaskHandler = (taskId: string) => () => {
        deleteTask(taskId);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
            </h3>
            <div>
                <CreateItemForm onCreateItem={createTask} />
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(id, task.id, newTitle);
                        };

                        const changeTaskStatusHandlerForTask = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(task.id, newStatusValue);
                        };

                        const deleteTaskHandlerForTask = () => {
                            deleteTask(task.id);
                        };

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatusHandlerForTask}
                                />
                                <EditableSpan
                                    value={task.title}
                                    onChange={changeTaskTitleHandler}
                                />
                                <Button
                                    title={'x'}
                                    onClick={deleteTaskHandlerForTask}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
            <div>
                <Button
                    className={filter === 'all' ? 'active-filter' : ''}
                    title={'All'}
                    onClick={() => changeFilterHandler('all')}
                />
                <Button
                    className={filter === 'active' ? 'active-filter' : ''}
                    title={'Active'}
                    onClick={() => changeFilterHandler('active')}
                />
                <Button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    title={'Completed'}
                    onClick={() => changeFilterHandler('completed')}
                />
            </div>
            <div>
                <Button
                    title={'Delete Todolist'}
                    onClick={deleteTodolistHandler}
                />
            </div>
        </div>
    );
};
