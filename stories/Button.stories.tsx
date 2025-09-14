import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Button } from "../components/ui/button"
import { Play, Save, Download, Copy } from "lucide-react"

const meta = {
  title: "AI Playground/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Primary Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Play className="h-4 w-4 mr-2" />
        Run Prompt
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    variant: "outline",
    size: "icon",
    children: <Save className="h-4 w-4" />,
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
}

export const AIPlaygroundActions: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button>
        <Play className="h-4 w-4 mr-2" />
        Run
      </Button>
      <Button variant="outline">
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
      <Button variant="ghost" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  ),
}
