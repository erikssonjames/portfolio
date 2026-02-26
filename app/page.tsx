import { AboutMe } from "@/components/home/about-me";
import { ContactMe } from "@/components/home/contact-me";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";

export default function Page() {
    return (
        <div className="size-full overflow-y-auto">
            <Hero />

            <Projects />

            <AboutMe />

            <ContactMe />
        </div>
    )
}