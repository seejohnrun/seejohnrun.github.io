---
layout: post
title: JavaScript Labels
tags:
- Code
- javascript
- label
status: publish
type: post
published: true
meta:
  _edit_last: '1'
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
  dsq_thread_id: '637099450'
  _yoast_wpseo_linkdex: '0'
---
WAT?  JavaScript doesn't have labels..  Well sure it does!  Well, to be fair, they're only for controlling loop flow.  Let's take a look!

Imagine the case where we have two loops and you want to break from the inner-most loop out of the outer loop.  This is often achieved with a flag:

{% highlight js %}
var stop = false;
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    stop = true;
    break;
  }
  if (stop) {
    break;
  }
}
{% endhighlight %}

With the labels, you can rewrite the above as:

{% highlight js %}
outer:
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    break outer;
  }
}
{% endhighlight %}

You can do the same with a continue inside of a nested loop.  In that case, you'll break into the next iteration of the loop you continue to:

{% highlight js %}
outer:
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    continue outer;
  }
  console.log('this will never print');
}
{% endhighlight %}

Whether you think this type of mild-goto usage is a good plan (I think it is when used correctly), its good to know they're around for when you see them in use.
