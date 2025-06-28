import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Tasks } from './Tasks';
import { Todolist, Task } from '../types';

// Создаем мок store для stories
const createMockStore = (tasks: Record<string, Task[]>) => {
  return configureStore({
    reducer: {
      tasks: (state = tasks) => state,
      todolists: (state = {}) => state,
      app: (state = {}) => state,
    },
  });
};

const meta: Meta<typeof Tasks> = {
  title: 'TodoList/Tasks',
  component: Tasks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    todolist: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTodolist: Todolist = {
  id: 'todolist-1',
  title: 'Мой список задач',
  filter: 'all',
};

const mockTasks: Task[] = [
  { id: '1', title: 'Изучить React', isDone: false },
  { id: '2', title: 'Изучить TypeScript', isDone: true },
  { id: '3', title: 'Создать проект', isDone: false },
  { id: '4', title: 'Написать тесты', isDone: true },
];

const mockStoreWithTasks = createMockStore({
  'todolist-1': mockTasks,
});

const mockStoreEmpty = createMockStore({
  'todolist-1': [],
});

export const WithTasks: Story = {
  args: {
    todolist: mockTodolist,
  },
  decorators: [
    (Story) => (
      <Provider store={mockStoreWithTasks}>
        <div style={{ width: '400px', padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const Empty: Story = {
  args: {
    todolist: mockTodolist,
  },
  decorators: [
    (Story) => (
      <Provider store={mockStoreEmpty}>
        <div style={{ width: '400px', padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const ActiveFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'active',
    },
  },
  decorators: [
    (Story) => (
      <Provider store={mockStoreWithTasks}>
        <div style={{ width: '400px', padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const CompletedFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'completed',
    },
  },
  decorators: [
    (Story) => (
      <Provider store={mockStoreWithTasks}>
        <div style={{ width: '400px', padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}; 