---
layout: post
title: JavaScript in-place concat
tags:
- Code
- concat
- javascript
status: publish
type: post
published: true
meta:
  _syntaxhighlighter_encoded: '1'
  _edit_last: '1'
  dsq_thread_id: '621176328'
  _yoast_wpseo_focuskw: concat
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
  _yoast_wpseo_linkdex: '40'
---
In JavaScript, a lot of times you want to combine two arrays.  Since `concat` doesn't work in-place, you end up with something like:
<pre>var a = [1, 2, 3];
var b = [4, 5, 6];
a = a.concat(b); // [1, 2, 3, 4, 5, 6]</pre>
But since `push` can take multiple arguments, we can use `apply` to do a little better:
<pre>var a = [1, 2, 3];
var b = [4, 5, 6];
a.push.apply(a, b); // 6
a; // [1, 2, 3, 4, 5, 6]</pre>
