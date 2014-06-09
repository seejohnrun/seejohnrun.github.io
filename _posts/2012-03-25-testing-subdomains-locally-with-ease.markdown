---
layout: post
title: Testing Subdomains Locally with Ease
tags:
- subdomains
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '624143545'
  _yoast_wpseo_linkdex: '0'
---
When you test subdomains locally using `localhost`, it can be a pain since it won't work out of the box for subdomains you haven't added to /etc/hosts (since there is no support for wildcard subdomains).  You can verify this easily enough:
<pre>~ $ ping john.localhost
ping: cannot resolve john.localhost: Unknown host</pre>
So, when you want something more flexible - there is another <em>easy</em> answer.  You can use "lvh.me", a domain which resolves to 127.0.0.1 (for all subdomains):
<pre>~ $ ping lvh.me
PING lvh.me (127.0.0.1): 56 data bytes</pre>
So, you're actually set up for this right now:
<pre>~ $ ping john.lvh.me
PING john.lvh.me (127.0.0.1): 56 data bytes</pre>
Pretty awesome!  You need an internet connection to use it, so what I do normally is throw the subdomains that I <em>know</em> I'll use into /etc/hosts - that way they work offline too!
