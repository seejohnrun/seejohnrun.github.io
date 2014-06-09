---
layout: post
title: ! 'laze: Lazy Properties in JavaScript'
tags:
- Code
- javascript
- nodejs
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '631806148'
  _syntaxhighlighter_encoded: '1'
  _yoast_wpseo_focuskw: ''
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
  _yoast_wpseo_linkdex: '0'
---
Yesterday I released a small JavaScript module called <a href="https://github.com/seejohnrun/laze">laze</a> for defining lazy properties in JavaScript.  With laze, you can have properties of an object not be created until they are accessed.

{% highlight js %}
var Thing = function () { };

Thing.prototype = {
  prop: function () {
    // some expensive operation
  }
};
laze.make(Thing.prototype, 'prop');
{% endhighlight %}

Once you have it set up, you can access "prop" as a property instead of as a function:

{% highlight js %}
var thing = new Thing();
thing.prop; // function is run now
thing.prop; // and cached forever
{% endhighlight %}
