import { cn } from "cn"

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-lg border border-[#d7dfd1] bg-[#fbfcf8] px-3 py-2 text-sm text-[#234334] outline-none placeholder:text-[#829087] focus-visible:border-[#789345] focus-visible:ring-3 focus-visible:ring-[#d9f26b]/60 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
