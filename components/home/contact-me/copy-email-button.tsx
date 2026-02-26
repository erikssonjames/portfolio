"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner";

export function CopyEmailButton({ email }: { email: string }) {
    const onCopy = () => {
        navigator.clipboard.writeText(email);
        toast("Copied email to clipboard!");
    }

    return (
        <Button 
            className="" 
            onClick={onCopy}
            size="icon-xs"
        >
            <Copy />
        </Button>
    )
}