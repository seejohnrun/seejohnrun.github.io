---
layout: post
title: Vim Pro Tip
tags:
- Tools
- vim
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '570508604'
---
Another vim pro-tip today. This one is pretty basic, but if you don t know it, it can save you a whole bunch of typing.

A lot of times, whether it be while testing, <code>grep</code>ing, or <code>ack</code>ing   you know the line you want to go to before you open a file.

When launching vim, you can specify the number to open the first file to, like:
<div>
<pre><code>$ vim somefile.rb +24</code></pre>
</div>
And the cursor will be placed at the beginning of that line, centered on the screen.
