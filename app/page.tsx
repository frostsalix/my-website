import Link from "next/link";
import Image from "next/image";
import { getRecentPosts } from "@/data/posts";

export default function Home() {
  const posts = getRecentPosts(3);

  const projects = [
    {
      name: "Button Press Simulator",
      summary: "A tidy studio lot that behaves like a polite robot until you ask it for chaos.",
      href: "/posts/designing-a-personal-site-that-scales-into-a-blog",
    },
    {
      name: "Sticky Note Factory",
      summary: "A tiny lab for collecting odd UI ideas before they escape into production.",
      href: "/posts/static-first-dynamic-later",
    },
  ];

  return (
    <main className="shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="layout">
        <aside className="side reveal" aria-label="Profile and site links">
          <Image className="avatar" src="/IMG2.png" alt="frostsalix avatar" width={700} height={700} priority />
          <h1>frostsalix</h1>
          <p className="tagline">Occasional code wizard, frequent overthinker.</p>
          <nav aria-label="Section links" className="side-nav">
            <Link href="/posts">Posts</Link>
            <Link href="/archive">Archive</Link>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
            <a href="#links">Links</a>
          </nav>
          <p className="micro">“A lamp learns nothing, but it still lights the room.”</p>
        </aside>

        <section id="main-content" className="main reveal reveal-delay-1">
          <header className="intro">
            <p className="kicker">Front porch for weird thoughts</p>
            <h2>Quiet notes, curious tools, and a few suspicious ideas.</h2>
            <p>“If the hallway disappears, assume the hallway was never serious.”</p>
          </header>

          <section id="posts" className="block" aria-labelledby="posts-title">
            <div className="block-head">
              <h3 id="posts-title">Fresh scraps</h3>
              <Link href="/posts" aria-label="See the whole pile">
                See the whole pile
              </Link>
            </div>

            <ul className="post-list">
              {posts.map((post) => (
                <li key={post.slug} className="post-card">
                  <p className="meta">
                    {post.date} · {post.readingText}
                  </p>
                  <h4>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <p>{post.excerpt}</p>
                  <p className="chips">
                    {post.tags.map((tag, index) => (
                      <span key={tag}>
                        <Link href={`/posts/tags/${tag.toLowerCase()}`}>{tag}</Link>
                        {index < post.tags.length - 1 ? " / " : ""}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section id="projects" className="block" aria-labelledby="projects-title">
            <h3 id="projects-title">Selected oddities</h3>
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.name} className="project-row">
                  <a href={project.href}>{project.name}</a>
                  <p>{project.summary}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="about" className="block" aria-labelledby="about-title">
            <h3 id="about-title">About</h3>
            <p>
              I enjoy building practical tools, writing engineering notes, and nudging interfaces
              until they stop pretending to be corporate. Most updates begin as a small tweak and
              end as a slightly cursed improvement.
            </p>
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

          <footer className="footnote">Made of notes, snacks, and movie magic.</footer>
        </section>
      </div>
    </main>
  );
}
