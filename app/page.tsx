import { AboutMe } from "@/components/home/about-me";
import { ContactMe } from "@/components/home/contact-me";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { TechIUse } from "@/components/home/tech-i-use";

export default function Page() {
    return (
        <div className="size-full overflow-y-auto">
            <Hero />

            <Projects />

            <TechIUse />

            <Experience />

            <AboutMe />

            <ContactMe />
        </div>
    )
}
