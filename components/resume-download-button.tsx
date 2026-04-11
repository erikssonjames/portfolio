"use client"

import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const RESUME_FILE_PATH = "/James_CV___ENG.pdf"

type ResumeDownloadButtonProps = {
  className?: string
  size?: React.ComponentProps<typeof Button>["size"]
  variant?: React.ComponentProps<typeof Button>["variant"]
  label?: string
}

export function ResumeDownloadButton({
  className,
  size = "default",
  variant = "outline",
  label = "Download resume",
}: ResumeDownloadButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={RESUME_FILE_PATH} download="James_Eriksson_CV_ENG.pdf">
        {label}
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  )
}

export { RESUME_FILE_PATH }
