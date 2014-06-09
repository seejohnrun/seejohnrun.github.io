---
layout: post
title: Writing Node.js in CoffeeScript
tags:
- Code
- coffeescript
- javascript
- nodejs
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _yoast_wpseo_title: ''
  _yoast_wpseo_focuskw: ''
  _yoast_wpseo_metadesc: ''
  _yoast_wpseo_metakeywords: ''
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '652301219'
  _yoast_wpseo_linkdex: '0'
---
Now I know I've <a href="http://www.seejohncode.com/2011/02/13/coffeescript/">spoken slightly poorly of CoffeeScript</a> in the past, but I've been getting into it a bit more recently on some small libraries I've been writing for Node.  Turns out, it's really easy to write parts of your Node applications in CoffeeScript and have them automatically compiled for you.

First, add "coffee-script" to your dependencies in package.json (definitely specify a real version instead of using *):
<pre>{
  ...
  "dependencies": {
    "coffee-script": "*"
  }
  ... 
}</pre>
And then, any time you need a file that's written in CoffeeScript, just make sure you have require "coffee-script" before requiring it:

{% highlight js %}
require("coffee-script");
require("./something_in_coffeescript"); // something_in_coffeescript.coffee
...
{% endhighlight %}

And off you go!
