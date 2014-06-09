---
layout: post
title: Searching Git History
tags:
- git
- pickaxe
- Tools
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
  dsq_thread_id: '640939542'
  _yoast_wpseo_linkdex: '0'
---
Today I'm going to talk about a way to search git history.  Imagine you want to find out when a certain term was changed (as part of an add or remove) in your project.  The git log "pickaxe" operator is just for that.

{% highlight bash %}
$ git log -S &quot;some_string_you_know&quot;
{% endhighlight %}

will show you the git log history of only commits that contain the given string in an add or remove.

It's super useful for dealing with code you've never seen before, or searching for the last change to a term that you <em>know</em> exists.
