"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ModelSelector } from "./model-selector"
import { ParametersPanel } from "./parameters-panel"
import { HistoryPanel } from "./history-panel"

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "border-r border-border/40 glass-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-80",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          {!isCollapsed && <h2 className="text-lg font-semibold">Controls</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-accent/20"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-auto">
          {!isCollapsed ? (
            <>
              <ModelSelector />
              <ParametersPanel />

              <HistoryPanel />

              <Card className="p-4 glass-card">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Templates
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm h-8">
                    Code Review
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-8">
                    Creative Writing
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-8">
                    Data Analysis
                  </Button>
                </div>
              </Card>
            </>
          ) : (
            <div className="space-y-4">
              <Button variant="ghost" size="icon" className="w-full">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
