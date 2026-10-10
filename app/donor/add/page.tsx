import { AddItemForm } from "@/components/donor/add-item-form"

export default function DonorAddPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#72884c]">
          New listing
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#17352b]">
          Add an item to donate
        </h1>
        <p className="mt-2 text-sm text-[#748379]">
          Fill in the details, add tags, and upload a photo so NGOs can discover your donation.
        </p>
      </div>
      <AddItemForm />
    </div>
  )
}
