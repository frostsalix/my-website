import Image from "next/image";
import Link from "next/link";
import { getBasePath } from "@/data/posts";
import ThemeToggle from "../theme-toggle";
import MessageForm from "../about/message-form";

export default function MessageWallPage() {
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
          <Link className="about-link" href="/">
            Home
          </Link>
          <Link className="about-link" href="/about">
            About
          </Link>
          <Link className="about-link" href="/contact" aria-current="page">
            Contact
          </Link>
        </aside>

        <section id="main-content" className="main reveal reveal-delay-1">
          <header className="intro">
            <p className="kicker">Contact</p>
            <h2>Send me message</h2>
            <p>
              Leave your name and what you want to send me. I read every message that reaches my
              inbox.
            </p>
          </header>

          <section className="block" aria-labelledby="contact-form-title">
            <h3 id="contact-form-title">Write to me</h3>
            <MessageForm />
          </section>

          <section id="links" className="block" aria-labelledby="links-title">
            <h3 id="links-title">Find me lurking on</h3>
            <ul className="link-list" aria-label="Social links">
              <li>
                <a href="https://github.com/frostsalix" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://x.com/frostsalix" target="_blank" rel="noreferrer">
                  X
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@frostsalix" target="_blank" rel="noreferrer">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/frostsalix" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://discord.gg/JJxpH8p2" target="_blank" rel="noreferrer">
                  Discord
                </a>
              </li>
              <li>
                <a href="mailto:frostsalix@gmail.com">Email</a>
              </li>
            </ul>
          </section>

          <div className="page-actions">
            <Link href="/">Back home</Link>
          </div>
        </section>
      </div>
    </main>
  );
}