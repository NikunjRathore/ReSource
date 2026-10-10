import { ItemCategory } from "@/generated/prisma/enums"
import { BookOpen, Box, Shirt, Sofa, UtensilsCrossed } from "lucide-react"
import { cn } from "cn"

const CATEGORY_ICONS: Record<ItemCategory, typeof Box> = {
  FOOD: UtensilsCrossed,
  TOY: Box,
  CLOTH: Shirt,
  BOOK: BookOpen,
  FURNITURE: Sofa,
}

const CATEGORY_GRADIENTS: Record<ItemCategory, string> = {
  FOOD: "from-[#d1dfc1] to-[#bdd09c]",
  TOY: "from-[#efd8bd] to-[#d8a36d]",
  CLOTH: "from-[#dceba4] to-[#b8d45a]",
  BOOK: "from-[#c8d9e8] to-[#9bb8d4]",
  FURNITURE: "from-[#e7eddc] to-[#c4d4b0]",
}

export function ItemPlaceholder({
  category,
  className,
}: {
  category: ItemCategory
  className?: string
}) {
  const Icon = CATEGORY_ICONS[category]
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-linear-to-br",
        CATEGORY_GRADIENTS[category],
        className
      )}
    >
      <Icon size={48} className="text-[#17352b]/30" strokeWidth={1.2} />
    </div>
  )
}
