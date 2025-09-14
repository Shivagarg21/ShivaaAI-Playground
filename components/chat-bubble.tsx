"use client"

import { useState } from "react"
import {
  Copy,
  Download,
  MoreHorizontal,
  User,
  Bot,
  Check,
  Languages,
  Maximize,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp?: string | Date | null
  model?: string
  tokens?: number
}

interface ChatBubbleProps {
  message: ChatMessage
  isLoading?: boolean
}

export function ChatBubble({ message, isLoading = false }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadAsJSON = () => {
    const data = {
      id: message.id,
      content: message.content,
      role: message.role,
      timestamp: message.timestamp,
      model: message.model,
      tokens: message.tokens,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `message-${message.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ✅ SAFE TIMESTAMP HANDLER
  const formatTimestamp = (date: string | Date | null | undefined) => {
    if (!date) return "" // skip if null/undefined

    let validDate: Date
    try {
      validDate = date instanceof Date ? date : new Date(date)
    } catch {
      return "" // fallback if conversion fails
    }

    if (isNaN(validDate.getTime())) {
      return "" // invalid date, skip
    }

    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(validDate)
  }

  return (
    <div
      className={cn(
        "flex gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col gap-2 max-w-[80%]",
          isUser ? "items-end" : "items-start",
        )}
      >
        <Card
          className={cn(
            "p-4 glass-card relative",
            isUser
              ? "bg-primary/10 border-primary/20 text-right"
              : "bg-card border-border/40",
          )}
        >
          {/* Loading Animation */}
          {isLoading && !isUser && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                AI is thinking...
              </span>
            </div>
          )}

          {/* Message Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {message.content}
            </pre>
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity",
              isUser ? "justify-start" : "justify-end",
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-7 px-2"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadAsJSON}
              className="h-7 px-2"
            >
              <Download className="h-3 w-3" />
            </Button>

            {!isUser && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glass-card">
                  <DropdownMenuItem className="text-sm">
                    <FileText className="h-3 w-3 mr-2" />
                    Summarize
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm">
                    <Maximize className="h-3 w-3 mr-2" />
                    Expand
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm">
                    <Languages className="h-3 w-3 mr-2" />
                    Translate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </Card>

        {/* Metadata */}
        <div
          className={cn(
            "flex items-center gap-2 text-xs text-muted-foreground",
            isUser ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span>{formatTimestamp(message.timestamp)}</span>
          {message.model && !isUser && (
            <>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                {message.model}
              </Badge>
            </>
          )}
          {message.tokens && !isUser && (
            <>
              <span>•</span>
              <span>{message.tokens} tokens</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
