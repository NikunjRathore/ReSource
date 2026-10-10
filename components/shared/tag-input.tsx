"use client"

import { useState, KeyboardEvent } from "react"
import { X } from "lucide-react"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"

const SUGGESTED_TAGS = [
  "urgent",
  "food",
  "clothing",
  "books",
  "toys",
  "furniture",
  "medical",
  "school",
  "winter",
  "hygiene",
  "electronics",
  "fresh",
]

type TagInputProps = {
  name?: string
  defaultTags?: string[]
  className?: string
}

export function TagInput({ name = "tags", defaultTags = [], className }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(defaultTags)
  const [input, setInput] = useState("")

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase()
    if (!tag || tag.length > 30 || tags.includes(tag)) return
    setTags((prev) => [...prev, tag])
    setInput("")
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1))
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <input type="hidden" name={name} value={tags.join(",")} />
      <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-lg border border-[#d7dfd1] bg-[#fbfcf8] px-3 py-2 focus-within:border-[#789345] focus-within:ring-3 focus-within:ring-[#d9f26b]/60">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="gap-1 border-[#d7dfd1] bg-[#eff4e4] text-[#385642]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="rounded-full hover:bg-[#d9f26b]/50"
              aria-label={`Remove ${tag}`}
            >
              <X size={12} />
            </button>
          </Badge>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          placeholder={tags.length === 0 ? "Type a tag and press Enter…" : "Add more…"}
          className="min-w-30 flex-1 bg-transparent text-sm text-[#234334] outline-none placeholder:text-[#829087]"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="text-xs text-[#829087]">Suggestions:</span>
        {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).slice(0, 8).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => addTag(tag)}
            className="rounded-full border border-[#e4e9dc] bg-white px-2 py-0.5 text-xs text-[#567065] transition hover:border-[#789345] hover:bg-[#eff4e4]"
          >
            + {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
