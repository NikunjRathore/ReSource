"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { createItem } from "@/actions/items"
import { ItemCategory } from "@/generated/prisma/enums"
import { CATEGORY_LABELS } from "@/lib/item-utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TagInput } from "@/components/shared/tag-input"
import { ImageUpload } from "@/components/shared/image-upload"

export function AddItemForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(createItem, {
    message: "",
    success: false,
  })

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => router.push("/donor"), 1200)
      return () => clearTimeout(timer)
    }
  }, [state.success, router])

  return (
    <form action={formAction} className="space-y-8">
      <div className="rounded-3xl border border-[#e4e9dc] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#17352b]">
          Item details
        </h2>
        <p className="mt-1 text-sm text-[#748379]">
          Describe what you&apos;re donating so NGOs can find it easily.
        </p>

        <FieldGroup className="mt-6">
          <Field>
            <FieldLabel className="text-[#294536]" htmlFor="title">
              Title
            </FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Winter jackets (5 pieces)"
              className="h-11 border-[#d7dfd1] bg-[#fbfcf8]"
              required
            />
          </Field>

          <Field>
            <FieldLabel className="text-[#294536]" htmlFor="description">
              Description
            </FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Condition, size, brand, or any helpful details…"
              rows={4}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel className="text-[#294536]" htmlFor="category">
                Category
              </FieldLabel>
              <select
                id="category"
                name="category"
                className="h-11 w-full rounded-lg border border-[#d7dfd1] bg-[#fbfcf8] px-3 text-sm outline-none focus-visible:border-[#789345] focus-visible:ring-3 focus-visible:ring-[#d9f26b]/60"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                {Object.values(ItemCategory).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel className="text-[#294536]" htmlFor="expiryDate">
                Expiry date (optional)
              </FieldLabel>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                className="h-11 border-[#d7dfd1] bg-[#fbfcf8]"
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel className="text-[#294536]" htmlFor="quantity">
                Quantity
              </FieldLabel>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                defaultValue={1}
                className="h-11 border-[#d7dfd1] bg-[#fbfcf8]"
                required
              />
            </Field>

            <Field>
              <FieldLabel className="text-[#294536]" htmlFor="unit">
                Unit
              </FieldLabel>
              <Input
                id="unit"
                name="unit"
                placeholder="kg, pieces, boxes…"
                className="h-11 border-[#d7dfd1] bg-[#fbfcf8]"
                required
              />
            </Field>
          </div>

          <Field>
            <FieldLabel className="text-[#294536]">Tags</FieldLabel>
            <TagInput />
          </Field>

          <Field>
            <FieldLabel className="text-[#294536]">Photo</FieldLabel>
            <ImageUpload />
          </Field>
        </FieldGroup>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {state.message && (
          <p
            aria-live="polite"
            className={
              state.success ? "text-sm text-[#4f793d]" : "text-sm text-red-700"
            }
            role={state.success ? "status" : "alert"}
          >
            {state.message}
          </p>
        )}
        <Button
          type="submit"
          disabled={pending}
          className="h-12 rounded-full bg-[#17352b] px-8 text-white hover:bg-[#285441] sm:ml-auto"
        >
          {pending ? "Listing item…" : "List item for donation"}
          {!pending && <ArrowRight size={17} />}
        </Button>
      </div>
    </form>
  )
}
