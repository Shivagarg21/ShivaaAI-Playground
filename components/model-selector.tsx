"use client"

import { useState } from "react"
import { Check, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Model {
  id: string
  name: string
  description: string
  status: "available" | "limited" | "offline"
  provider: string
}

const models: Model[] = [
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "Most capable model, best for complex tasks",
    status: "available",
    provider: "OpenAI",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "Fast and efficient for most tasks",
    status: "available",
    provider: "OpenAI",
  },
  {
    id: "claude-3",
    name: "Claude 3",
    description: "Excellent for analysis and reasoning",
    status: "available",
    provider: "Anthropic",
  },
  {
    id: "llama-2",
    name: "Llama 2",
    description: "Open source model for general use",
    status: "limited",
    provider: "Meta",
  },
  {
    id: "custom",
    name: "Custom Model",
    description: "Your own fine-tuned model",
    status: "offline",
    provider: "Custom",
  },
]

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0])

  const getStatusColor = (status: Model["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "limited":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Model["status"]) => {
    switch (status) {
      case "available":
        return "Available"
      case "limited":
        return "Limited"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <Card className="p-4 glass-card">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-medium">Model Selection</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose the AI model that best fits your task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between glass bg-transparent">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedModel.status)}`} />
              <div className="text-left">
                <div className="font-medium">{selectedModel.name}</div>
                <div className="text-xs text-muted-foreground">{selectedModel.provider}</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 glass-card">
          {models.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onClick={() => setSelectedModel(model)}
              className="flex items-center gap-3 p-3"
            >
              <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{model.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getStatusText(model.status)}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{model.description}</div>
                <div className="text-xs text-muted-foreground">{model.provider}</div>
              </div>
              {selectedModel.id === model.id && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mt-3 p-3 rounded-md bg-muted/50">
        <div className="text-sm font-medium">{selectedModel.name}</div>
        <div className="text-xs text-muted-foreground mt-1">{selectedModel.description}</div>
      </div>
    </Card>
  )
}
