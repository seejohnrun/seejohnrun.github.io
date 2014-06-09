---
layout: post
title: Rasmus and I
tags:
- etsy
- Events
- php
- rasmus
- Thoughts
status: publish
type: post
published: true
all_set: true
---

![Rasmus and I]({{ site.url }}/static/rasmus.jpeg)

There I am with <a href="http://en.wikipedia.org/wiki/Rasmus_Lerdorf">Rasmus</a>, the creator of <a href="http://php.net/">PHP</a>..

I went to a talk tonight by Rasmus at the <a href="http://www.etsy.com/">Etsy</a> headquarters in Brooklyn. This isn't the first time I've seen him speak, but it <em>is</em> the first time I've heard him tell his/PHP's backstory.

The thing that really struck me was his description of how PHP wasn't really made to be a programming language in the sense that we use it today. This is really central to his common criticism of frameworks (which is often seen as crotchety).

The problem is (as he laid out), you build this templating language, and then people say:  what is the harm of adding <code>if/else</code> . Once you oblige, everything breaks down:
<ul>
	<li>If we have <code>if/else</code>, why not add <code>switch</code> statements?</li>
	<li>If we have <code>switch</code>, why are there no functions? I m constantly repeating things!</li>
	<li>If there are functions, why are there no classes? Other things have classes!</li>
	<li>Where are closures?!? Namespaces!?</li>
</ul>
Rasmus is put in a position where, regardless of what he thinks PHP should be, PHP being the most popular web programming language has forced him to make concessions to benefit a community whose use isn't his own anymore.

Its an amazing position to be in, that I didn't understand until tonight. An entirely new level of respect and appreciation.
