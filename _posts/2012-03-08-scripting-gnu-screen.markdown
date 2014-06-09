---
layout: post
title: Scripting GNU Screen
tags:
- gnu
- screen
- scripting
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '604810267'
  _yoast_wpseo_linkdex: '0'
---
Every day when I come over to my computer, I type the same few things to get my <a href="http://www.gnu.org/software/screen/">GNU Screen</a> windows set up properly. I give them names, and I always open them in the same order for a given project.

So I started looking into easy ways to script <code>screen</code>.

Turns out, you can actually execute any screen command against a detached screen. The list of commands is <a href="http://aperiodic.net/screen/commands:start">pretty extensive</a> too.

So a simple script to open two named screens might be as simple as:
<pre><code>screen title "window one" screen title "window two"</code></pre>
Or even more simply:
<pre><code>screen -t "window one" screen -t "window two"</code></pre>
Using the commands there, in addition to some other tools based on what you want to start up   you can put together a completely reasonable script to start up your screen session for a project. I like the idea of rather than executing the things you want on startup, executing them with a comment before them, and then starting them as needed. So if you wanted a rails server, instead of running `rails server`, you d just run `# rails server`. Then you can just hit up when you want to actually start the server.

To run these scripts is a little tricky, but once you know how its easy:
<div>
<pre><code>$ screen -d -m -S &lt;name&gt; -c &lt;script_path&gt; </code></pre>
</div>
And then to re-attach to it:
<div>
<pre><code>$ screen -r &lt;name&gt;</code></pre>
</div>
