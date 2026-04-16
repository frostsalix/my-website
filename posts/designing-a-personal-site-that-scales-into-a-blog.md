---
title: "Designing a Personal Site That Scales Into a Blog"
date: "2026-04-16"
excerpt: "How to keep a homepage tiny today without accidentally building a haunted mansion for tomorrow."
tags:
  - web
  - notes
---

A personal homepage should be easy to edit, easy to read, and easy to grow without sprouting extra legs.

The trick is not to make the first version clever. Clever usually arrives wearing roller skates.

If you start by treating the homepage like a tiny publishing system instead of a single splash page, later changes become boring in the best possible way.

## Start with stable routes

Begin from route shapes that will not change often, such as `/posts` and `/posts/[slug]`, so future you does not stage a rebellion.

That gives you a clean path for archives, tags, and future experiments without forcing a redesign every time a new idea sneezes.

For example, a homepage can stay deliberately small while the writing area expands underneath it. The reader gets one obvious entrance, and you get room to add things like RSS, tag filters, and yearly archives without moving the front door.

## Keep the first version static

A static-first version is less fragile, easier to refactor, and less likely to bite when nobody is looking.

It also makes local testing boring in the best possible way: you can change one thing, refresh once, and move on with your life.

That is especially useful when you are juggling the usual pile of decisions: what should the homepage say, where should posts live, how should article lists look, and whether the site should feel more like a notebook or a tiny magazine.

## Add features only when they pay rent

Useful features usually announce themselves by saving time. RSS helps people subscribe. A tag page helps people browse. A consistent slug pattern keeps links from turning into spaghetti.

If a feature only exists because it looks impressive in a screenshot, it can probably stay in the screenshot.

### Delay complexity intentionally

You can add search, RSS, and analytics after the core writing workflow feels smooth instead of assembling a spaceship on day one.

If the site already knows where the doors are, the extra machinery can arrive later carrying snacks and manuals.

This is the same reason a lot of good tutorials begin with the smallest useful version first: one page, one path, one action. Once that works, everything else has a place to stand.
