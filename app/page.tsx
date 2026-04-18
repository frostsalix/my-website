import Image from "next/image";
import Link from "next/link";
import { getBasePath } from "@/data/posts";
import ThemeToggle from "./theme-toggle";

export default function Home() {
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
          <Link className="about-link" href="/" aria-current="page">
            Home
          </Link>
          <Link className="about-link" href="/about">
            About
          </Link>
          <Link className="about-link" href="/contact">
            Contact
          </Link>
        </aside>

        <section id="main-content" className="main reveal reveal-delay-1">
          <header className="intro">
            <p className="kicker">Front porch for weird thoughts</p>
            <h2>Quiet notes, curious tools, and a few suspicious ideas.</h2>
            <p>“If the hallway disappears, assume the hallway was never serious.”</p>
          </header>

          <section id="Profound paragraph" className="block" aria-labelledby="Profound paragraph-title">
            <h3 id="Profound paragraph-title">Profound paragraph</h3>
            <br></br>
            <p>
              &ldquo;I&rsquo;d rather you shot at tin cans in the backyard, but I know you&rsquo;ll go
              after birds. Shoot all the blue jays you want, if you can hit &lsquo;em, but remember
              it&rsquo;s a sin to kill a mockingbird.&rdquo; That was the only time I ever heard Atticus
              say it was a sin to do something, and I asked Miss Maudie about it. &ldquo;Your
              father&rsquo;s right,&rdquo; she said. &ldquo;Mockingbirds don&rsquo;t do one thing except make
              music for us to enjoy. They don&rsquo;t eat up people&rsquo;s gardens, don&rsquo;t nest in corn
              cribs, they don&rsquo;t do one thing but sing their hearts out for us. That&rsquo;s why
              it&rsquo;s a sin to kill a mockingbird.&rdquo;
              </p>
            <p>
              &ldquo;I nodded at the time, though I still didn&rsquo;t fully understand. That evening, as
              the light slowly faded, I sat on the front steps, watching the shadows of the
              trees stand still in the distance. Suddenly, a small bird landed on the fence and
              began to sing softly. The song was simple, yet it quieted something inside me.&ldquo;
            </p>
            <p>
              &ldquo;I began to realize that some things do not need explaining. Their mere existence
              is already something precious. They harm no one and ask for nothing, offering only
              the best part of themselves to the world.&ldquo;
            </p>
            <p>
              &ldquo;After that, whenever I heard such a song, I would think of those words again&mdash;that
              some things are wrong not because they are written in rules, but because they harm
              what should never have been harmed.&rdquo;
            </p>
          </section>

          <footer className="footnote">Made of notes, snacks, and movie magic.</footer>
        </section>
      </div>
    </main>
  );
}
