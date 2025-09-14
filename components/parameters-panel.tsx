"use client"

import { useState } from "react"
import { RotateCcw, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Parameters {
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
}

const defaultParameters: Parameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 1.0,
  frequencyPenalty: 0.0,
}

export function ParametersPanel() {
  const [parameters, setParameters] = useState<Parameters>(defaultParameters)

  const updateParameter = (key: keyof Parameters, value: number) => {
    setParameters((prev) => ({ ...prev, [key]: value }))
  }

  const resetParameters = () => {
    setParameters(defaultParameters)
  }

  return (
    <Card className="p-4 glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Parameters</h3>
        <Button variant="ghost" size="sm" onClick={resetParameters} className="h-8 px-2">
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="temperature" className="text-sm font-medium">
              Temperature
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Controls randomness. Higher values make output more creative, lower values more focused.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground ml-auto">{parameters.temperature}</span>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={2}
            step={0.1}
            value={[parameters.temperature]}
            onValueChange={(value) => updateParameter("temperature", value[0])}
            className="w-full"
          />
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="maxTokens" className="text-sm font-medium">
              Max Tokens
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Maximum number of tokens to generate in the response.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Slider
              id="maxTokens"
              min={1}
              max={4096}
              step={1}
              value={[parameters.maxTokens]}
              onValueChange={(value) => updateParameter("maxTokens", value[0])}
              className="flex-1"
            />
            <Input
              type="number"
              value={parameters.maxTokens}
              onChange={(e) => updateParameter("maxTokens", Number.parseInt(e.target.value) || 0)}
              className="w-20 h-8 text-xs"
              min={1}
              max={4096}
            />
          </div>
        </div>

        {/* Top P */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="topP" className="text-sm font-medium">
              Top P
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Controls diversity via nucleus sampling. Lower values focus on more likely tokens.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground ml-auto">{parameters.topP}</span>
          </div>
          <Slider
            id="topP"
            min={0}
            max={1}
            step={0.01}
            value={[parameters.topP]}
            onValueChange={(value) => updateParameter("topP", value[0])}
            className="w-full"
          />
        </div>

        {/* Frequency Penalty */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="frequencyPenalty" className="text-sm font-medium">
              Frequency Penalty
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Reduces repetition. Higher values discourage repeating the same words.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground ml-auto">{parameters.frequencyPenalty}</span>
          </div>
          <Slider
            id="frequencyPenalty"
            min={-2}
            max={2}
            step={0.1}
            value={[parameters.frequencyPenalty]}
            onValueChange={(value) => updateParameter("frequencyPenalty", value[0])}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  )
}
