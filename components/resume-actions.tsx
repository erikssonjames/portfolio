"use client"

import { ArrowDownToLine, ArrowUpRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export const RESUME_FILE_PATH = "/James_CV___ENG.pdf"

type ResumeButtonProps = {
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
}: ResumeButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={RESUME_FILE_PATH} download="James_Eriksson_CV_ENG.pdf">
        <ArrowDownToLine className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  )
}

export function ResumeViewButton({
  className,
  size = "default",
  variant = "secondary",
  label = "View CV",
}: ResumeButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={RESUME_FILE_PATH} target="_blank" rel="noreferrer">
        <FileText className="mr-2 h-4 w-4" />
        {label}
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  )
}

export function ResumeActionGroup({
  className,
  downloadClassName,
  viewClassName,
}: {
  className?: string
  downloadClassName?: string
  viewClassName?: string
}) {
  return (
    <div className={className}>
      <ResumeViewButton className={viewClassName} />
      <ResumeDownloadButton className={downloadClassName} />
    </div>
  )
}
