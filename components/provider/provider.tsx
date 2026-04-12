import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";

interface ProviderProps {
    children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
        >
            <TooltipProvider>
                <Toaster richColors closeButton />
                {children}
            </TooltipProvider>
        </ThemeProvider>
    )
}