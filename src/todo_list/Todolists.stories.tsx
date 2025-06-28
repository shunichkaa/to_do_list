import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Todolists } from './Todolists';
import { Todolist } from '../types';

// Создаем мок store для stories
const createMockStore = (todolists: Todolist[]) => {
  return configureStore({
    reducer: {
      todolists: (state = todolists) => state,
      tasks: (state = {}) => state,
      app: (state = {}) => state,
    },
  });
};

const meta: Meta<typeof Todolists> = {
  title: 'TodoList/Todolists',
  component: Todolists,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockTodolists: Todolist[] = [
  {
    id: 'todolist-1',
    title: 'Рабочие задачи',
    filter: 'all',
  },
  {
    id: 'todolist-2',
    title: 'Личные задачи',
    filter: 'active',
  },
  {
    id: 'todolist-3',
    title: 'Покупки',
    filter: 'completed',
  },
];

const mockStoreWithTodolists = createMockStore(mockTodolists);
const mockStoreEmpty = createMockStore([]);

export const WithTodolists: Story = {
  decorators: [
    (Story) => (
      <Provider store={mockStoreWithTodolists}>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <Provider store={mockStoreEmpty}>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const SingleTodolist: Story = {
  decorators: [
    (Story) => (
      <Provider store={createMockStore([mockTodolists[0]])}>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}; 