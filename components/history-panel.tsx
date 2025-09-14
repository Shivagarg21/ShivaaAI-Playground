"use client"

import { useState, useEffect } from "react"
import { History, Search, Trash2, Clock, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface HistoryItem {
  id: string
  prompt: string
  response: string
  model: string
  timestamp: Date
  tokens: number
  sessionName: string
}

interface HistoryPanelProps {
  onLoadHistory?: (item: HistoryItem) => void
}

export function HistoryPanel({ onLoadHistory }: HistoryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("ai-playground-history")
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
        setHistory(parsed)
      } catch (error) {
        console.error("Failed to load history:", error)
      }
    } else {
      // Add some sample history data
      const sampleHistory: HistoryItem[] = [
        {
          id: "1",
          prompt: "Explain quantum computing in simple terms",
          response: "Quantum computing is a revolutionary approach to computation that leverages quantum mechanics...",
          model: "GPT-4",
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          tokens: 156,
          sessionName: "Science Chat",
        },
        {
          id: "2",
          prompt: "Write a Python function to sort a list",
          response: "Here's a Python function that sorts a list using different algorithms...",
          model: "GPT-3.5 Turbo",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          tokens: 89,
          sessionName: "Code Review",
        },
        {
          id: "3",
          prompt: "Create a marketing strategy for a new app",
          response: "Here's a comprehensive marketing strategy for your new app...",
          model: "Claude 3",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          tokens: 234,
          sessionName: "Business Planning",
        },
        {
          id: "4",
          prompt: "Analyze this dataset for trends",
          response: "Based on the dataset analysis, I've identified several key trends...",
          model: "GPT-4",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          tokens: 178,
          sessionName: "Data Analysis",
        },
        {
          id: "5",
          prompt: "Help me write a cover letter",
          response: "I'd be happy to help you write a compelling cover letter...",
          model: "GPT-3.5 Turbo",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
          tokens: 145,
          sessionName: "Career Help",
        },
      ]
      setHistory(sampleHistory)
      localStorage.setItem("ai-playground-history", JSON.stringify(sampleHistory))
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("ai-playground-history", JSON.stringify(history))
  }, [history])

  const filteredHistory = history.filter(
    (item) =>
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sessionName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("ai-playground-history")
  }

  const deleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <Card className="glass-card">
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="font-medium">History Panel</span>
              <Badge variant="secondary" className="text-xs">
                {history.length}
              </Badge>
            </div>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            {/* Search and Controls */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  placeholder="Search history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
              </div>
              <Button variant="ghost" size="sm" onClick={clearHistory} className="h-8 px-2 text-destructive">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>

            {/* History List */}
            <ScrollArea className="h-80">
              <div className="space-y-2">
                {filteredHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      {searchQuery ? "No matching history found" : "No conversation history yet"}
                    </p>
                  </div>
                ) : (
                  filteredHistory.map((item) => (
                    <Card
                      key={item.id}
                      className="p-3 hover:bg-accent/50 cursor-pointer transition-colors glass border-border/40"
                      onClick={() => onLoadHistory?.(item)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{truncateText(item.prompt, 60)}</p>
                            <p className="text-xs text-muted-foreground mt-1">{truncateText(item.response, 80)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteHistoryItem(item.id)
                            }}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{item.sessionName}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {item.model}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{item.tokens} tokens</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimestamp(item.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
