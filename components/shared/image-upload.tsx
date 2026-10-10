"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImagePlus, X } from "lucide-react"
import { cn } from "cn"

type ImageUploadProps = {
  name?: string
  className?: string
}

export function ImageUpload({ name = "imageUrl", className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | null) {
    if (!file) return
    if (!file.type.startsWith("image/")) return
    if (file.size > 500_000) {
      alert("Image must be under 500 KB.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreview(result)
      setUrlInput(result)
    }
    reader.readAsDataURL(file)
  }

  function clearImage() {
    setPreview(null)
    setUrlInput("")
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <div className={cn("space-y-3", className)}>
      <input type="hidden" name={name} value={urlInput} />
      {preview ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-[#e4e9dc] bg-[#f0f2e8]">
          <Image
            src={preview}
            alt="Item preview"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/90 text-[#17352b] shadow-sm transition hover:bg-white"
            aria-label="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex aspect-video w-full max-w-sm flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#d7dfd1] bg-[#fbfcf8] text-[#829087] transition hover:border-[#789345] hover:bg-[#eff4e4] hover:text-[#385642]"
        >
          <ImagePlus size={28} />
          <span className="text-sm font-medium">Upload image (max 500 KB)</span>
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#829087]">or paste URL</span>
        <input
          type="url"
          value={urlInput.startsWith("data:") ? "" : urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value)
            setPreview(e.target.value || null)
          }}
          placeholder="https://example.com/image.jpg"
          className="h-9 flex-1 rounded-lg border border-[#d7dfd1] bg-[#fbfcf8] px-3 text-sm outline-none focus-visible:border-[#789345] focus-visible:ring-3 focus-visible:ring-[#d9f26b]/60"
        />
      </div>
    </div>
  )
}
