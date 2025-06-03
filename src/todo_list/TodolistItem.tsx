import {Task} from "../App";
import {ChangeEvent} from "react";
import {CreateItemForm} from "../components/createItemForm/CreateItemForm";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {getListItemSx} from "../components/createItemForm/TodolistItem.styles";

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
    changeTodolistTitle: (todolistId: string, title: string) => void;
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    } = props;

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter);
    };

    const deleteTodolistHandler = () => {
        deleteTodolist(id);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={deleteTodolistHandler}>
                    <Delete/>
                </IconButton>
                <CreateItemForm onCreateItem={createTask}/>
            </h3>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map(task => {
                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(id, task.id, newTitle);
                        };

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(task.id, newStatusValue);
                        };

                        const deleteTaskHandler = () => {
                            deleteTask(task.id);
                        };

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <EditableSpan
                                        value={task.title}
                                        onChange={changeTaskTitleHandler}
                                    />
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
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