import { Button, Checkbox, IconButton, List, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import { FilterValues } from "../types";
import { CreateItemForm } from "../components/createItemForm/CreateItemForm";
import { getListItemSx } from "../components/createItemForm/TodolistItem.styles";
import { EditableSpan } from "../components/editableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodolistType = {
    id: string;
    title: string;
    filter: FilterValues;
};

interface Props {
    todolist: TodolistType;
    tasks: TaskType[];
    deleteTask: (taskId: string) => void;
    changeFilter: (todolistId: string, filter: FilterValues) => void;
    createTask: (title: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    deleteTodolist: (todolistId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export const TodolistItem = ({
                                 todolist,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle,
                             }: Props) => {
    const { id, title, filter } = todolist;

    const handleFilterChange = (filter: FilterValues) => changeFilter(id, filter);
    const handleDeleteTodolist = () => deleteTodolist(id);
    const handleChangeTodolistTitle = (title: string) => changeTodolistTitle(id, title);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <EditableSpan value={title} onChange={handleChangeTodolistTitle} />
                <IconButton onClick={handleDeleteTodolist}>
                    <Delete />
                </IconButton>
            </div>

            <CreateItemForm onCreateItem={createTask} />

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map((task) => {
                        const handleChangeTitle = (newTitle: string) => changeTaskTitle(id, task.id, newTitle);
                        const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) =>
                            changeTaskStatus(id, task.id, e.currentTarget.checked);
                        const handleDeleteTask = () => deleteTask(task.id);

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <Checkbox checked={task.isDone} onChange={handleStatusChange} />
                                <EditableSpan value={task.title} onChange={handleChangeTitle} />
                                <IconButton onClick={handleDeleteTask}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}

            <div style={{ marginTop: '10px' }}>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color="inherit"
                    onClick={() => handleFilterChange('all')}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color="primary"
                    onClick={() => handleFilterChange('active')}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color="secondary"
                    onClick={() => handleFilterChange('completed')}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};
