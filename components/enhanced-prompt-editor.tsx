"use client"

import { useState, useRef, useCallback } from "react"
import { Bold, Italic, Code, Save, FileText, Play, RotateCcw } from "lucide-react"
import { AccessibleButton } from "./accessible-button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FocusTrap } from "./focus-trap"

interface Template {
  id: string
  name: string
  description: string
  content: string
  category: string
}

interface EnhancedPromptEditorProps {
  onRun?: (prompt: string) => void
}

const defaultTemplates: Template[] = [
  {
    id: "code-review",
    name: "Code Review",
    description: "Review code for best practices and improvements",
    content:
      "Please review the following code and provide feedback on:\n\n1. Code quality and readability\n2. Performance optimizations\n3. Security considerations\n4. Best practices\n\n```\n[Paste your code here]\n```",
    category: "Development",
  },
  {
    id: "creative-writing",
    name: "Creative Writing",
    description: "Generate creative content and stories",
    content:
      "Write a creative story with the following elements:\n\n- Setting: [Describe the setting]\n- Characters: [List main characters]\n- Theme: [What's the main theme?]\n- Tone: [What tone should it have?]\n\nPlease make it engaging and original.",
    category: "Creative",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Analyze data and provide insights",
    content:
      "Please analyze the following data and provide insights:\n\n**Data Description:**\n[Describe your dataset]\n\n**Questions to Answer:**\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n\n**Expected Output:**\n- Summary statistics\n- Key findings\n- Recommendations",
    category: "Analysis",
  },
]

export function EnhancedPromptEditor({ onRun }: EnhancedPromptEditorProps) {
  const [prompt, setPrompt] = useState("")
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [newTemplateName, setNewTemplateName] = useState("")
  const [newTemplateDescription, setNewTemplateDescription] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertFormatting = useCallback(
    (before: string, after = "") => {
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = prompt.substring(start, end)
      const newText = prompt.substring(0, start) + before + selectedText + after + prompt.substring(end)

      setPrompt(newText)

      // Restore cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, end + before.length)
      }, 0)
    },
    [prompt],
  )

  const loadTemplate = useCallback((template: Template) => {
    setPrompt(template.content)
    setSelectedTemplate(template)
    // Announce to screen readers
    const announcement = `Template "${template.name}" loaded`
    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", "polite")
    announcer.setAttribute("aria-atomic", "true")
    announcer.className = "sr-only"
    announcer.textContent = announcement
    document.body.appendChild(announcer)
    setTimeout(() => document.body.removeChild(announcer), 1000)
  }, [])

  const saveAsTemplate = useCallback(() => {
    if (!newTemplateName.trim() || !prompt.trim()) return

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: newTemplateName,
      description: newTemplateDescription,
      content: prompt,
      category: "Custom",
    }

    setTemplates([...templates, newTemplate])
    setNewTemplateName("")
    setNewTemplateDescription("")
    setIsTemplateDialogOpen(false)

    // Announce success
    const announcement = `Template "${newTemplateName}" saved successfully`
    const announcer = document.createElement("div")
    announcer.setAttribute("aria-live", "polite")
    announcer.className = "sr-only"
    announcer.textContent = announcement
    document.body.appendChild(announcer)
    setTimeout(() => document.body.removeChild(announcer), 1000)
  }, [newTemplateName, newTemplateDescription, prompt, templates])

  const clearPrompt = useCallback(() => {
    setPrompt("")
    setSelectedTemplate(null)
    textareaRef.current?.focus()
  }, [])

  const handleRun = useCallback(async () => {
    if (!prompt.trim() || !onRun) return

    setIsRunning(true)
    try {
      await onRun(prompt.trim())
    } finally {
      setIsRunning(false)
    }
  }, [prompt, onRun])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Development":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Creative":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Analysis":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Communication":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Custom":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="glass-card" role="region" aria-label="Prompt Editor">
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Prompt Editor</h3>
          <div className="flex items-center gap-2">
            {selectedTemplate && (
              <Badge variant="secondary" className="text-xs" aria-label={`Using template: ${selectedTemplate.name}`}>
                {selectedTemplate.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 mb-3" role="toolbar" aria-label="Text formatting tools">
          <div className="flex items-center gap-1 border-r border-border/40 pr-2">
            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting("**", "**")}
              className="h-8 px-2"
              aria-label="Bold text"
              aria-describedby="bold-help"
            >
              <Bold className="h-3 w-3" />
            </AccessibleButton>
            <div id="bold-help" className="sr-only">
              Make selected text bold
            </div>

            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting("*", "*")}
              className="h-8 px-2"
              aria-label="Italic text"
              aria-describedby="italic-help"
            >
              <Italic className="h-3 w-3" />
            </AccessibleButton>
            <div id="italic-help" className="sr-only">
              Make selected text italic
            </div>

            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={() => insertFormatting("`", "`")}
              className="h-8 px-2"
              aria-label="Code formatting"
              aria-describedby="code-help"
            >
              <Code className="h-3 w-3" />
            </AccessibleButton>
            <div id="code-help" className="sr-only">
              Format selected text as code
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AccessibleButton variant="ghost" size="sm" className="h-8 px-2" aria-label="Select template">
                <FileText className="h-3 w-3 mr-1" />
                Templates
              </AccessibleButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 glass-card" role="menu">
              {Object.entries(
                templates.reduce(
                  (acc, template) => {
                    if (!acc[template.category]) acc[template.category] = []
                    acc[template.category].push(template)
                    return acc
                  },
                  {} as Record<string, Template[]>,
                ),
              ).map(([category, categoryTemplates]) => (
                <div key={category}>
                  <div
                    className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
                    role="group"
                    aria-label={category}
                  >
                    {category}
                  </div>
                  {categoryTemplates.map((template) => (
                    <DropdownMenuItem
                      key={template.id}
                      onClick={() => loadTemplate(template)}
                      className="flex flex-col items-start gap-1 p-3"
                      role="menuitem"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="font-medium">{template.name}</span>
                        <Badge className={`text-xs ${getCategoryColor(template.category)}`}>{template.category}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{template.description}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1 ml-auto">
            <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
              <DialogTrigger asChild>
                <AccessibleButton
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  aria-label="Save current prompt as template"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </AccessibleButton>
              </DialogTrigger>
              <DialogContent className="glass-card" aria-labelledby="save-template-title">
                <FocusTrap active={isTemplateDialogOpen}>
                  <DialogHeader>
                    <DialogTitle id="save-template-title">Save as Template</DialogTitle>
                    <DialogDescription>Save your current prompt as a reusable template.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="template-name">Template Name</Label>
                      <Input
                        id="template-name"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        placeholder="Enter template name"
                        aria-required="true"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="template-description">Description</Label>
                      <Input
                        id="template-description"
                        value={newTemplateDescription}
                        onChange={(e) => setNewTemplateDescription(e.target.value)}
                        placeholder="Brief description of the template"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <AccessibleButton variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
                      Cancel
                    </AccessibleButton>
                    <AccessibleButton
                      onClick={saveAsTemplate}
                      disabled={!newTemplateName.trim() || !prompt.trim()}
                      aria-describedby="save-template-help"
                    >
                      Save Template
                    </AccessibleButton>
                    <div id="save-template-help" className="sr-only">
                      {!newTemplateName.trim()
                        ? "Template name is required"
                        : !prompt.trim()
                          ? "Prompt content is required"
                          : "Save the template"}
                    </div>
                  </DialogFooter>
                </FocusTrap>
              </DialogContent>
            </Dialog>

            <AccessibleButton
              variant="ghost"
              size="sm"
              onClick={clearPrompt}
              className="h-8 px-2"
              aria-label="Clear prompt"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear
            </AccessibleButton>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here... Use Ctrl+/ to focus this editor, or select a template to get started."
          className="min-h-[200px] resize-none bg-input/50 border-border/40 focus:bg-input/70 transition-colors"
          aria-label="Prompt input"
          aria-describedby="prompt-help character-count"
        />
        <div id="prompt-help" className="sr-only">
          Enter your AI prompt here. Use the toolbar above for formatting or keyboard shortcuts: Ctrl+Enter to run,
          Ctrl+K to search templates.
        </div>

        <div className="flex items-center justify-between mt-4">
          <div id="character-count" className="text-xs text-muted-foreground" aria-live="polite">
            {prompt.length} characters
          </div>
          <div className="flex items-center gap-2">
            <AccessibleButton variant="outline" size="sm" aria-label="Save current prompt">
              Save Prompt
            </AccessibleButton>
            <AccessibleButton
              size="sm"
              onClick={handleRun}
              disabled={!prompt.trim()}
              loading={isRunning}
              loadingText="Running..."
              className="bg-primary hover:bg-primary/90"
              aria-label="Run prompt with AI"
              aria-describedby="run-help"
            >
              <Play className="h-3 w-3 mr-1" />
              Run
            </AccessibleButton>
            <div id="run-help" className="sr-only">
              {!prompt.trim() ? "Enter a prompt to run" : "Send prompt to AI assistant"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
