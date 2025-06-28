import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CreateItemForm } from './CreateItemForm';

const meta: Meta<typeof CreateItemForm> = {
  title: 'Common/CreateItemForm',
  component: CreateItemForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onCreateItem: {
      action: 'created',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCreateItem: (title: string) => console.log('Created item:', title),
  },
};

export const WithLongPlaceholder: Story = {
  args: {
    onCreateItem: (title: string) => console.log('Created item:', title),
  },
  parameters: {
    docs: {
      description: {
        story: 'Форма создания элемента с длинным placeholder текстом',
      },
    },
  },
}; 