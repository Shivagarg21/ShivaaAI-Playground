import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Slider } from "../components/ui/slider"
import { Label } from "../components/ui/label"
import { Card } from "../components/ui/card"

const meta = {
  title: "AI Playground/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: { onValueChange: fn() },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}

export const Temperature: Story = {
  render: (args) => (
    <Card className="p-4 w-80">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Temperature</Label>
          <span className="text-sm text-muted-foreground">0.7</span>
        </div>
        <Slider {...args} defaultValue={[0.7]} min={0} max={2} step={0.1} className="w-full" />
        <p className="text-xs text-muted-foreground">Controls randomness. Higher values make output more creative.</p>
      </div>
    </Card>
  ),
}

export const MaxTokens: Story = {
  render: (args) => (
    <Card className="p-4 w-80">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Max Tokens</Label>
          <span className="text-sm text-muted-foreground">2048</span>
        </div>
        <Slider {...args} defaultValue={[2048]} min={1} max={4096} step={1} className="w-full" />
        <p className="text-xs text-muted-foreground">Maximum number of tokens to generate in the response.</p>
      </div>
    </Card>
  ),
}

export const TopP: Story = {
  render: (args) => (
    <Card className="p-4 w-80">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Top P</Label>
          <span className="text-sm text-muted-foreground">1.0</span>
        </div>
        <Slider {...args} defaultValue={[1.0]} min={0} max={1} step={0.01} className="w-full" />
        <p className="text-xs text-muted-foreground">Controls diversity via nucleus sampling.</p>
      </div>
    </Card>
  ),
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    disabled: true,
  },
}
