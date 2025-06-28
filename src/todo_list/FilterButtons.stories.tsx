import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../features/store';
import { FilterButtons } from './FilterButtons';
import { Todolist } from '../types';

const meta: Meta<typeof FilterButtons> = {
  title: 'TodoList/FilterButtons',
  component: FilterButtons,
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

export const AllFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'all',
    },
  },
};

export const ActiveFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'active',
    },
  },
};

export const CompletedFilter: Story = {
  args: {
    todolist: {
      ...mockTodolist,
      filter: 'completed',
    },
  },
}; 