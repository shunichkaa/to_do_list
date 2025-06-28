import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../features/store';
import { TodolistItem } from './TodolistItem';
import { Todolist } from '../types';

const meta: Meta<typeof TodolistItem> = {
  title: 'TodoList/TodolistItem',
  component: TodolistItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ width: '400px', padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
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

const mockTodolistWithLongTitle: Todolist = {
  id: 'todolist-2',
  title: 'Очень длинное название списка задач, которое может не поместиться в одну строку',
  filter: 'all',
};

const mockTodolistWithShortTitle: Todolist = {
  id: 'todolist-3',
  title: 'Задачи',
  filter: 'all',
};

export const Default: Story = {
  args: {
    todolist: mockTodolist,
  },
};

export const LongTitle: Story = {
  args: {
    todolist: mockTodolistWithLongTitle,
  },
};

export const ShortTitle: Story = {
  args: {
    todolist: mockTodolistWithShortTitle,
  },
};

export const WithActiveFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'active',
    },
  },
};

export const WithCompletedFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'completed',
    },
  },
}; 