import type { Meta, StoryObj } from "@storybook/react"
import { ChatBubble } from "../components/chat-bubble"

const meta = {
  title: "AI Playground/ChatBubble",
  component: ChatBubble,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
  },
} satisfies Meta<typeof ChatBubble>

export default meta
type Story = StoryObj<typeof meta>

const sampleUserMessage = {
  id: "1",
  content: "Can you help me write a Python function to calculate the factorial of a number?",
  role: "user" as const,
  timestamp: new Date(),
}

const sampleAssistantMessage = {
  id: "2",
  content: `Here's a Python function to calculate the factorial of a number:

\`\`\`python
def factorial(n):
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    elif n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result

# Example usage
print(factorial(5))  # Output: 120
\`\`\`

This function handles edge cases like negative numbers and uses an iterative approach for efficiency.`,
  role: "assistant" as const,
  timestamp: new Date(),
  model: "GPT-4",
  tokens: 89,
}

export const UserMessage: Story = {
  args: {
    message: sampleUserMessage,
  },
}

export const AssistantMessage: Story = {
  args: {
    message: sampleAssistantMessage,
  },
}

export const LoadingMessage: Story = {
  args: {
    message: {
      id: "loading",
      content: "",
      role: "assistant",
      timestamp: new Date(),
    },
    isLoading: true,
  },
}

export const ShortMessage: Story = {
  args: {
    message: {
      id: "3",
      content: "Hello! How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
      model: "GPT-4",
      tokens: 8,
    },
  },
}

export const LongMessage: Story = {
  args: {
    message: {
      id: "4",
      content: `This is a much longer message that demonstrates how the chat bubble handles extensive content. It includes multiple paragraphs and shows how the component adapts to different content lengths.

The chat bubble should maintain proper spacing and readability even with longer text content. It should also preserve formatting and line breaks as intended.

Here are some key features:
- Proper text wrapping
- Maintained spacing
- Action buttons on hover
- Timestamp and metadata display
- Copy and download functionality

This helps ensure that users can easily read and interact with both short and long AI responses in the playground interface.`,
      role: "assistant",
      timestamp: new Date(),
      model: "Claude 3",
      tokens: 156,
    },
  },
}

export const Conversation: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <ChatBubble message={sampleUserMessage} />
      <ChatBubble message={sampleAssistantMessage} />
      <ChatBubble
        message={{
          id: "5",
          content: "Thank you! That's exactly what I needed.",
          role: "user",
          timestamp: new Date(),
        }}
      />
    </div>
  ),
}
