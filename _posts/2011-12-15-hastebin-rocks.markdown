---
layout: post
title: Hastebin Rocks
tags:
- hastebin
- nodejs
- redis
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '608834640'
---
A few weeks ago, we had some sensitive data at work that we were passing around, and realized there was a real need for an open source pastebin software that could be installed behind a VPN. I liked the project, so I took it up for fun in my spare time. I wanted to keep the dependencies as small as possible, so I ended up going with a<a href="http://nodejs.org/">node.js</a> server, backed by files and serving static assets.

The project is called <a href="https://github.com/seejohnrun/haste-server">haste-server</a>, and there is a publicly available version at<a href="http://hastebin.com/">hastebin.com</a>. The response to the project and the concept has been great, and I ve seen a lot of people using it. Definitely check it out if you haven't already, and be sure to also look at <a href="https://github.com/seejohnrun/haste-client">haste-client</a>, a tiny CLI tool for uploading pastes to hastebin (or a private hastebin). Basic usage of <a href="https://github.com/seejohnrun/haste-client">haste-client</a> is like:
<div>
<pre><code>$ cat something | haste | pbcopy # mac os
$ cat something | haste | xsel # linux </code></pre>
</div>
After which, a URL with the output of STDOUT for <code>cat something</code> will be placed into your clipboard!

Read more on the <a href="http://hastebin.com/about.md">about page</a> and let me know what you think!
