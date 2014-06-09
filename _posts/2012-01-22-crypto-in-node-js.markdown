---
layout: post
title: crypto in node.js
tags:
- Code
- crypto
- hashlib
- javascript
- nodejs
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '548685721'
---
For a few <a href="http://nodejs.org/">node</a> projects of mine, I depend on hashing, predominantly MD5 and HMAC-SHA1 signing. Until recently, I depended on a library called <a href="https://github.com/brainfucker/hashlib">hashlib</a> for quickly generating my digests. Its got a very quick and simple syntax, and is written in C/C++.

{% highlight js %}
var hashlib = require('hashlib');

hashlib.md5('something');
hashlib.hmac_sha1('something', 'key');
{% endhighlight %}

This worked really well for a while, until node 0.6 hit and there were some compatibility issues (on build the extension, and the occassional segfault). I turned away, and back to the <a href="http://nodejs.org/docs/v0.3.1/api/crypto.html">crypto</a> library, which is part of the standard library.

{% highlight js %}
var crypto = require('crypto');

var md5er = crypto.createHash('md5');
md5er.update('something');
md5er.digest('hex');

var hmacer = crypto.createHmac('sha1', 'key');
hmacer.update('something');
hmacer.digest('hex');
{% endhighlight %}

The syntax, while longer, feels more flexible.

My true appreciation for <a href="https://github.com/brainfucker/hashlib">hashlib</a>,   if the issues are resolved I ll definitely go back. For the time being, <code>crypto</code> is an easy replacement that's stable in node 0.6+.
