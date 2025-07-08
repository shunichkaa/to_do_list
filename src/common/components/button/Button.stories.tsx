import type { Meta, StoryObj } from "@storybook/react-webpack5"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Common/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "outlined", "contained"],
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "error", "info", "success", "warning"],
    },
    onClick: {
      action: "clicked",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Кнопка",
    onClick: () => console.log("Button clicked"),
  },
}

export const WithChildren: Story = {
  args: {
    children: "Кнопка с контентом",
    onClick: () => console.log("Button clicked"),
  },
}

export const Primary: Story = {
  args: {
    title: "Основная кнопка",
    color: "primary",
    onClick: () => console.log("Primary button clicked"),
  },
}

export const Secondary: Story = {
  args: {
    title: "Вторичная кнопка",
    color: "secondary",
    onClick: () => console.log("Secondary button clicked"),
  },
}

export const Outlined: Story = {
  args: {
    title: "Контурная кнопка",
    variant: "outlined",
    onClick: () => console.log("Outlined button clicked"),
  },
}

export const Contained: Story = {
  args: {
    title: "Заполненная кнопка",
    variant: "contained",
    onClick: () => console.log("Contained button clicked"),
  },
}

export const Success: Story = {
  args: {
    title: "Успех",
    color: "success",
    variant: "contained",
    onClick: () => console.log("Success button clicked"),
  },
}

export const Error: Story = {
  args: {
    title: "Ошибка",
    color: "error",
    variant: "contained",
    onClick: () => console.log("Error button clicked"),
  },
}
