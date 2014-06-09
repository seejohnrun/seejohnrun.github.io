---
layout: post
title: Installing the "Fast Require" Patch via RVM
tags:
- fastrequire
- quick tips
- rails
- rvm
status: publish
type: post
published: true
meta:
  _yoast_wpseo_linkdex: '42'
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  skip_rss_flag: 'true'
  _yoast_wpseo_focuskw: patch via rvm
  _yoast_wpseo_title: Installing the "Fast Require" patch via RVM
  _yoast_wpseo_metadesc: Installing the patch doesn't have to be a pain
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
  dsq_thread_id: '1012659613'
---
I've looked up a bunch of times where to download the so called "fast require" patch for Ruby.  Every time that I install a new version, I have to look it up again.  It's very annoying.

You can also install the patch (and others) via RVM:

{% highlight bash %}
rvm reinstall 1.9.3 --patch railsexpress
{% endhighlight %}

If you haven't read about this (now somewhat old) patch yet, read the <a href="http://www.rubyinside.com/ruby-1-9-3-faster-loading-times-require-4927.html">story here</a>.
