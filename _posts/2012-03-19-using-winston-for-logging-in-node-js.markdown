---
layout: post
title: Using winston for logging in Node.js
tags:
- Code
- javascript
- logging
- nodejs
- winston
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '617200242'
  _yoast_wpseo_linkdex: '0'
---
I've been through a lot of different logging libraries in <a href="http://nodejs.org/">Node.js</a> for different projects, but <a href="https://github.com/flatiron/winston">Winston</a> is the one I always come back to.  Winston is asynchronous, offers support for multiple transports, and is damned easy to get set up.

First, add it to your dependencies:

``` js
"dependencies": {
  "winston": "~ 0.5.10"
}
```

The basic usage would be just as you'd imagine:

{% highlight js %}
var winston = require('winston');

winston.info('this is some info');
winston.debug('a debug message');
{% endhighlight %}

You can also attach meta info to any log call, so that your calls can not have to block on building up custom strings:

{% highlight js %}
winston.log('listening on ' + host + ':' + port); // old
winston.log('listening', { host: host, port: port }); // new
{% endhighlight %}

Its easy to configure and create custom logger objects too.  I love how simple the whole thing is.  I have a few commits on winston, and it's inspired the work I've done so far on <a href="https://github.com/seejohnrun/iolog">iolog</a> (a similar logging library for <a href="http://www.iolanguage.com/">Io</a>).
