---
layout: post
title: HTML5 Canvas Pong
tags:
- canvas
- html5
- javascript
- Thoughts
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '419179055'
---
A while ago, I thought it would be fun to play around with <a href="http://en.wikipedia.org/wiki/Canvas_element">HTML5 Canvas</a> a little bit. I came up with <a href="http://seejohncode.com/canvaspong/">Canvas Pong</a>.

The way it works is by giving a 100% x 100% <code>&lt;canvas&gt;</code> element absolute positioning on a page with a flexible height. Using the height in pixels (which can change depending on difficulty) and the current scroll position, I can easily work out the size of the right paddle. Once I had that going, I just constructed (with the <a href="http://dev.w3.org/html5/2dcontext/">2D Javascript drawing API</a> and pure DOM manipulations) a bar on the other side that matches the height of your paddle, and a ball to move around.

Definitely not meant to be performant, but it was a really good project to play with<code>&lt;canvas&gt;</code>. You can take a read of the code by viewing source, or on the <a href="https://github.com/seejohnrun/canvaspong">GitHub project page</a>. Think up a project of your own and see what you can make.
<ul>
	<li><a href="http://www.johncrepezzi.com/canvaspong/">Play the game</a></li>
	<li><a href="https://github.com/seejohnrun/canvaspong">Source on GitHub</a></li>
</ul>
