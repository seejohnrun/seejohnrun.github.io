---
layout: post
title: Git over HTTPS
tags:
- git
- https
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '585210210'
---
<p>Last night I was trying to push to a few repositories (one of them this blog) from a KFC (free wifi) in London. I was having some problems, at first with connecting on port 22 (SSH), and then with getting ICMP requests to go through to github.com:</p>
<pre>~$ ping github.com
PING github.com (1.0.0.1): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
...</pre>
<p>Then I remembered that Git supports Git over HTTP/HTTPS. A quick edit of my .git/config files to change:</p>
<pre><code>git@github.com:seejohnrun/seejohnrun.github.com.git</code></pre>
<p>to:</p>
<pre><code>https://github.com/seejohnrun/seejohnrun.github.com.git</code></pre>
<p>Prompted me for my username and password and I was good to go. Thought it was good for others to keep in mind, rather than trying to fight or abandon networks like theirs.</p>
