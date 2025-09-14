import { NextResponse } from "next/server"

// Mock template data - in a real app, this would come from a database
const templates = [
  {
    id: "code-review",
    name: "Code Review",
    description: "Review code for best practices and improvements",
    content:
      "Please review the following code and provide feedback on:\n\n1. Code quality and readability\n2. Performance optimizations\n3. Security considerations\n4. Best practices\n\n```\n[Paste your code here]\n```",
    category: "Development",
    createdAt: new Date().toISOString(),
  },
  {
    id: "creative-writing",
    name: "Creative Writing",
    description: "Generate creative content and stories",
    content:
      "Write a creative story with the following elements:\n\n- Setting: [Describe the setting]\n- Characters: [List main characters]\n- Theme: [What's the main theme?]\n- Tone: [What tone should it have?]\n\nPlease make it engaging and original.",
    category: "Creative",
    createdAt: new Date().toISOString(),
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Analyze data and provide insights",
    content:
      "Please analyze the following data and provide insights:\n\n**Data Description:**\n[Describe your dataset]\n\n**Questions to Answer:**\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n\n**Expected Output:**\n- Summary statistics\n- Key findings\n- Recommendations",
    category: "Analysis",
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json({ templates })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, content, category } = body

    if (!name || !content) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 })
    }

    const newTemplate = {
      id: Date.now().toString(),
      name,
      description: description || "",
      content,
      category: category || "Custom",
      createdAt: new Date().toISOString(),
    }

    // In a real app, save to database
    templates.push(newTemplate)

    return NextResponse.json({ template: newTemplate }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}
