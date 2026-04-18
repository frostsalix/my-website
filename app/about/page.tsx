import Image from "next/image";
import Link from "next/link";
import { getBasePath } from "@/data/posts";
import ThemeToggle from "../theme-toggle";

export default function AboutPage() {
  const avatarSrc = `${getBasePath()}/IMG2.png`;

  return (
    <main className="shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="layout">
        <aside className="side reveal" aria-label="Profile and site links">
          <Image
            className="avatar"
            src={avatarSrc}
            alt="frostsalix avatar"
            width={700}
            height={700}
            priority
            suppressHydrationWarning
          />
          <h1>frostsalix</h1>
          <p className="tagline">Occasional code wizard, frequent overthinker.</p>
          <ThemeToggle />
          <nav className="side-nav" aria-label="Primary">
            <Link className="about-link" href="/">
              Home
            </Link>
            <Link className="about-link" href="/about" aria-current="page">
              About
            </Link>
            <Link className="about-link" href="/contact">
              Contact
            </Link>
          </nav>
        </aside>

        <section id="main-content" className="main reveal reveal-delay-1">
          <header className="intro">
            <p className="kicker">About</p>
            <h2>About</h2>
            <p>
              I enjoy building practical tools, writing engineering notes, and nudging interfaces
              until they stop pretending to be corporate. Most updates begin as a small tweak and
              end as a slightly cursed improvement.
            </p>
          </header>

          <section className="block">
            <p>
              The rest of this site is where the experiments spill out: posts, odd pages, and the
              occasional overbuilt detail that exists because the quieter version felt too polite.
            </p>
          </section>

          <div className="page-actions">
            <Link href="/">Back home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}