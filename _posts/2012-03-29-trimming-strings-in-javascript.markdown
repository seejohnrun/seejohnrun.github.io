---
layout: post
title: Trimming Strings in JavaScript
tags:
- Code
- javascript
- nodejs
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  _yoast_wpseo_focuskw: trimming strings
  _yoast_wpseo_title: ''
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
  dsq_thread_id: '629396290'
  _yoast_wpseo_linkdex: '36'
---
ECMAScript 5 has support for String#trim, so next time you're trimming a String in Node (or in a web browser if you don't care about IE 8), you can trim it like:

{% highlight js %}
' hello '.trim(); // &quot;hello&quot;
{% endhighlight %}

instead of the dated regular expression approach:

{% highlight js %}
return this.replace(/^\s+|\s+$/g, &quot;&quot;);
{% endhighlight %}

Please (please!) use these when you can.  I've got a really fun post coming up on ECMAScript 5 in more detail.  Stay tuned!
