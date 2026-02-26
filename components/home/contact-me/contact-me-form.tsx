"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/send-email";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
// ...your other imports

export function ContactMeForm() {
  const [pending, startTransition] = React.useTransition();
  const formRef = React.useRef<HTMLFormElement>(null);

  async function clientAction(formData: FormData) {
    startTransition(async () => {
      const res = await sendContactEmail(formData);

      if (res.ok) {
        toast.success("Message sent! I’ll reply soon.");
        formRef.current?.reset();
      } else {
        toast.error(res.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form ref={formRef} className="grid gap-5" action={clientAction}>
      {/* Honeypot */}
      <input type="text" name="_company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-zinc-200">Name</Label>
          <Input id="name" name="name" required autoComplete="name" /* ... */ />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-zinc-200">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" /* ... */ />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="subject" className="text-zinc-200">Subject</Label>
        <Input id="subject" name="subject" /* ... */ />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message" className="text-zinc-200">Message</Label>
        <Textarea id="message" name="message" required /* ... */ />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-zinc-400">By sending this, you agree I can reply to your email.</p>

        <Button type="submit" size="lg" disabled={pending} className="group relative bg-yellow-400 text-black hover:bg-yellow-300">
          {pending ? "Sending..." : "Send message"}
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </form>
  );
}