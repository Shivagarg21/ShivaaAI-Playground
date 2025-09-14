"use client"

import { useState } from "react"
import { Sparkles, MessageSquare } from "lucide-react"
import { EnhancedPromptEditor } from "./enhanced-prompt-editor"
import { ChatInterface } from "./chat-interface"
import { AccessibleButton } from "./accessible-button"
import { KeyboardNavigation } from "./keyboard-navigation"

export function MainContent() {
  const [hasStartedChat, setHasStartedChat] = useState(false)

  const handleRunPrompt = (prompt: string) => {
    setHasStartedChat(true)
    // This would typically send the prompt to the chat interface
  }

  return (
    <main className="flex-1 flex flex-col" role="main" aria-label="AI Playground Main Content">
      <KeyboardNavigation />

      {!hasStartedChat ? (
        <>
          {/* Welcome Area */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary mb-4">
                  <Sparkles className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to AI Playground</h2>
                <p className="text-muted-foreground text-balance">
                  Start a conversation with your AI assistant. Choose a model, adjust parameters, and begin exploring.
                </p>
                <AccessibleButton
                  onClick={() => setHasStartedChat(true)}
                  className="mt-6"
                  size="lg"
                  aria-label="Start new chat session"
                >
                  <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
                  Start Chatting
                </AccessibleButton>
              </div>
            </div>
          </div>

          {/* Prompt Editor */}
          <div className="border-t border-border/40 p-6">
            <div className="max-w-4xl mx-auto">
              <EnhancedPromptEditor onRun={handleRunPrompt} />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            <ChatInterface />
          </div>

          {/* Prompt Editor */}
          <div className="border-t border-border/40 p-6">
            <div className="max-w-4xl mx-auto">
              <EnhancedPromptEditor onRun={handleRunPrompt} />
            </div>
          </div>
        </>
      )}
    </main>
  )
}
