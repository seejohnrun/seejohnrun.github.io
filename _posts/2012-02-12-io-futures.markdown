---
layout: post
title: Io Futures
tags:
- Code
- futures
- io
- iolanguage
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '573729439'
---
I ve been doing a bit of Io development in my spare time, and I wanted to bring forward a feature that really makes me happy.

The feature is called  futures  and here s how it works:

<pre>
val := futureSend(
# some longish operation
)
# some other things...
val println
</pre>

When <code>futureSend</code> gets activated, it spins off a co-routine with the message passed to <code>futureSend</code> and starts working on it.

When the value returned from <code>futureSend</code> is actually used   the operation blocks until the message has completed (if it hasn't already), and then <code>val</code> becomes the return value of the message.

Its a very clean way to handle joining because they re totally transparent, meaning that <code>val</code> may as well have been activated serially.

If you re looking for a similar behavior other languages:
<ul>
	<li><a href="http://moonbase.rydia.net/software/lazy.rb/">lazy.rb</a> in Ruby</li>
	<li><a href="http://docs.python.org/dev/library/concurrent.futures.html">Future</a> in Python</li>
	<li>Google  Javascript Futures  as there s an entire discussion to be had about the best way to implement these.</li>
</ul>
