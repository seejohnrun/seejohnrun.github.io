---
layout: post
title: Presentations with Showoff
tags:
- markdown
- ruby
- showoff
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '580909701'
---
I got a few questions today about my slides, so I thought I'd do a quick writeup on how they're made.

There's a package called <a href="https://github.com/schacon/showoff">showoff</a> which allows you to write your slides in <a href="http://daringfireball.net/projects/markdown/">Markdown</a> and style them with CSS. Then it hosts a local web service on <a href="http://localhost:9090/">localhost:9090</a> by default by just running <code>showoff serve</code>. Your slides are there, and you can just click through them for your presentation.

You can include code examples, images, incremental bullets, etc   all by just writing some markdown.

I've been using this for my talks for about a year and a half now, and I find it perfectly flexible to handle everything I want. Its amazing how gracefully it can transition from an outline into a presentation.

Check out my markup on my <a href="https://github.com/seejohnrun/talks/tree/master/ciconf-2012/slides">CICONF slides</a>, or go directly to the README for showoff!
