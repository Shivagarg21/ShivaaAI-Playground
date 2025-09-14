"use client"

import { useState, useRef, useEffect } from "react"
import { ChatBubble } from "./chat-bubble"
import { Button } from "@/components/ui/button"
import { Plus, X, Edit2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Input } from "@/components/ui/input"

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  model?: string
  tokens?: number
}

interface ChatSession {
  id: string
  name: string
  messages: ChatMessage[]
  createdAt: Date
}

export function ChatInterface() {
  const [sessions, setSessions] = useLocalStorage<ChatSession[]>("ai-playground-sessions", [
    {
      id: "1",
      name: "New Chat",
      messages: [
        {
          id: "1",
          content: "Hello! I'm your AI assistant. How can I help you today?",
          role: "assistant",
          timestamp: new Date(),
          model: "GPT-4",
          tokens: 12,
        },
      ],
      createdAt: new Date(),
    },
  ])
  const [activeSessionId, setActiveSessionId] = useState("1")
  const [isLoading, setIsLoading] = useState(false)
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeSession = sessions.find((s) => s.id === activeSessionId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeSession?.messages])

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
    }
    setSessions([...sessions, newSession])
    setActiveSessionId(newSession.id)
  }

  const closeSession = (sessionId: string) => {
    if (sessions.length === 1) return // Don't close the last session

    const updatedSessions = sessions.filter((s) => s.id !== sessionId)
    setSessions(updatedSessions)

    if (activeSessionId === sessionId) {
      setActiveSessionId(updatedSessions[0].id)
    }
  }

  const startEditingSession = (sessionId: string, currentName: string) => {
    setEditingSessionId(sessionId)
    setEditingName(currentName)
  }

  const saveSessionName = () => {
    if (!editingSessionId || !editingName.trim()) return

    setSessions((prev) =>
      prev.map((session) => (session.id === editingSessionId ? { ...session, name: editingName.trim() } : session)),
    )
    setEditingSessionId(null)
    setEditingName("")
  }

  const cancelEditingSession = () => {
    setEditingSessionId(null)
    setEditingName("")
  }

  const simulateAIResponse = async (userMessage: string) => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: ChatMessage = {
      id: Date.now().toString(),
      content: `I understand you said: "${userMessage}". This is a simulated response from the AI assistant. In a real implementation, this would be connected to an actual AI model API.`,
      role: "assistant",
      timestamp: new Date(),
      model: "GPT-4",
      tokens: Math.floor(Math.random() * 100) + 50,
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId ? { ...session, messages: [...session.messages, aiResponse] } : session,
      ),
    )

    setIsLoading(false)

    // Save to history
    const historyItem = {
      id: Date.now().toString(),
      prompt: userMessage,
      response: aiResponse.content,
      model: aiResponse.model || "GPT-4",
      timestamp: new Date(),
      tokens: aiResponse.tokens || 0,
      sessionName: activeSession?.name || "Unknown Session",
    }

    const existingHistory = JSON.parse(localStorage.getItem("ai-playground-history") || "[]")
    const updatedHistory = [historyItem, ...existingHistory].slice(0, 50) // Keep only last 50 items
    localStorage.setItem("ai-playground-history", JSON.stringify(updatedHistory))
  }

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !activeSession) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId ? { ...session, messages: [...session.messages, userMessage] } : session,
      ),
    )

    // Simulate AI response
    simulateAIResponse(content.trim())
  }

  return (
    <div className="flex flex-col h-full">
      {/* Session Tabs */}
      <div className="flex items-center gap-2 p-4 border-b border-border/40 overflow-x-auto">
        {sessions.map((session) => (
          <div key={session.id} className="flex items-center gap-1 flex-shrink-0">
            {editingSessionId === session.id ? (
              <div className="flex items-center gap-1">
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveSessionName()
                    if (e.key === "Escape") cancelEditingSession()
                  }}
                  onBlur={saveSessionName}
                  className="h-8 w-32 text-sm"
                  autoFocus
                />
              </div>
            ) : (
              <>
                <Button
                  variant={activeSessionId === session.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSessionId(session.id)}
                  className={cn(
                    "h-8 px-3 text-sm",
                    activeSessionId === session.id ? "bg-primary text-primary-foreground" : "",
                  )}
                >
                  {session.name}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditingSession(session.id, session.name)}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </>
            )}
            {sessions.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => closeSession(session.id)}
                className="h-6 w-6 p-0 hover:bg-destructive/20"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
        <Button variant="ghost" size="sm" onClick={createNewSession} className="h-8 px-2 flex-shrink-0">
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {activeSession?.messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <ChatBubble
              message={{
                id: "loading",
                content: "",
                role: "assistant",
                timestamp: new Date(),
              }}
              isLoading={true}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  )
}
