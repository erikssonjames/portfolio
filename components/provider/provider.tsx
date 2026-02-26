import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "../ui/sonner";

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
            <Toaster richColors closeButton />
            {children}
        </ThemeProvider>
    )
}