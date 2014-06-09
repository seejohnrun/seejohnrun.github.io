---
layout: post
title: Copying an Array in JavaScript
tags:
- Code
- javascript
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _yoast_wpseo_focuskw: javascript
  _syntaxhighlighter_encoded: '1'
  _yoast_wpseo_title: Copying an Array in JavaScript - Array#slice
  dsq_thread_id: '626517193'
  _yoast_wpseo_metadesc: Copying an Array in JavaScript is much easier than iterating
    over the elements.  You can use Array#slice to do it in one line.
  _yoast_wpseo_metakeywords: javascript array slice
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
  _yoast_wpseo_linkdex: '84'
---
Of course when you assign an existing object to a variable in JavaScript, you actually receive a reference to the object.  So modifications on the reference, cause changes on the original.  This shouldn't be a surprise at all, and just to illustrate:

{% highlight js %}
var a = [1, 2, 3];
var b = a;
b.push(4);
a; // [1, 2, 3, 4]
{% endhighlight %}

It's common to see code for making a copy of an array by iterating over the elements:

{% highlight js %}
var a = [1, 2, 3];
var b = new Array(a.length);
for (var i = 0; i < a.length; i++) {
  b[i] = a[i];
}
{% endhighlight %}

After which we're safe since we have an element-by-element copy of the original (safe if the elements are primitives!):

{% highlight js %}
b.push(4);
a; // [1, 2, 3]
{% endhighlight %}

Pretty ugly code for such a simple, common operation.  Luckily JavaScript has a nifty method on Array called "slice", which is for selecting a segment of an existing Array.  We can abuse slice to make the copy for us:

{% highlight js %}
var a = [1, 2, 3];
var b = a.slice(0, a.length);

b.push(4);
a; // [1, 2, 3]
{% endhighlight %}

And wouldn't you know it - the second argument is optional:

{% highlight js %}
var a = [1, 2, 3];
var b = a.slice(0);
{% endhighlight %}

AND, don't tell the old-school JavaScript developers but if you're programming in a decently new version of JavaScript (hey node.js guys) - that first argument is also optional:

{% highlight js %}
var a = [1, 2, 3];
var b = a.slice();
{% endhighlight %}
