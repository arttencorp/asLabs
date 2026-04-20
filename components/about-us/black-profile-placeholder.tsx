import { UserRound } from "lucide-react"

type BlackProfilePlaceholderProps = {
  className?: string
}

export default function BlackProfilePlaceholder({ className = "" }: BlackProfilePlaceholderProps) {
  return (
    <div className={`flex items-center justify-center bg-[#f1f3f5] ${className}`}>
      <UserRound className="h-20 w-20 text-[#a0adbb]" />
    </div>
  )
}