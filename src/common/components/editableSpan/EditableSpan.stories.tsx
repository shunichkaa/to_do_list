import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { EditableSpan } from './EditableSpan';

const meta: Meta<typeof EditableSpan> = {
  title: 'Common/EditableSpan',
  component: EditableSpan,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Редактируемый текст',
    onChange: (title: string) => console.log('Changed to:', title),
  },
};

export const ShortText: Story = {
  args: {
    value: 'Текст',
    onChange: (title: string) => console.log('Changed to:', title),
  },
};

export const LongText: Story = {
  args: {
    value: 'Очень длинный текст, который может не поместиться в одну строку и потребует переноса',
    onChange: (title: string) => console.log('Changed to:', title),
  },
};

export const EmptyText: Story = {
  args: {
    value: '',
    onChange: (title: string) => console.log('Changed to:', title),
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    value: 'Текст с символами: !@#$%^&*()_+-=[]{}|;:,.<>?',
    onChange: (title: string) => console.log('Changed to:', title),
  },
}; 