import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Provider } from 'react-redux';
import { store } from '../features/store';
import { TaskItem } from './TaskItem';
import { Task } from '../types';

const meta: Meta<typeof TaskItem> = {
  title: 'TodoList/TaskItem',
  component: TaskItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    task: {
      control: 'object',
    },
    todolistId: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTask: Task = {
  id: '1',
  title: 'Изучить React',
  isDone: false,
};

const mockCompletedTask: Task = {
  id: '2',
  title: 'Изучить TypeScript',
  isDone: true,
};

export const Default: Story = {
  args: {
    task: mockTask,
    todolistId: 'todolist-1',
  },
};

export const Completed: Story = {
  args: {
    task: mockCompletedTask,
    todolistId: 'todolist-1',
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      ...mockTask,
      title: 'Очень длинное название задачи, которое может не поместиться в одну строку и потребует переноса текста',
    },
    todolistId: 'todolist-1',
  },
};

export const ShortTitle: Story = {
  args: {
    task: {
      ...mockTask,
      title: 'Задача',
    },
    todolistId: 'todolist-1',
  },
}; 