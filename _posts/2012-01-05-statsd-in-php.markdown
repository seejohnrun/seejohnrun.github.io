---
layout: post
title: StatsD in PHP
tags:
- Code
- php
- statsd
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '527792257'
---
<a href="http://graphite.wikidot.com/">Graphite</a> is a popular realtime graphing package I ve used a bunch at <a href="http://patch.com/">Patch</a> and at Newco. A popular way to roll data up to it is by using a <code>statsd</code> server (ex:<a href="https://github.com/etsy/statsd">etsy/statsd</a> from etsy) which packages up multiple statistics requests and sends them to graphite in batches (at a default flush interval of 10s).

This morning, having a need for a statsd-client in PHP - I put one together and released it as a <a href="http://getsparks.org/packages/statsd/show">spark</a>. Check it out if you re interested in statsd/graphite in PHP, but more importantly   if you have similarly small libraries you ve written, don t be afraid to release them because they re  too small . Anything someone else doesn t have to write will be useful, as long as its abstracted enough away from your application.

---

Using php-statsd is easy - I ll focus on using it with CodeIgniter (but it can be used without, see the README)

``` php
<?php
$this->load->spark('statsd');

// Count a use of the browse page over time
$this->statsd->counting('browse_page');

// Record the load time of something (milliseconds)
$this->statsd->timing('load', 123);

// Record the load time of a anonymous function
$this->statsd->time_this('something', function() {
  sleep(1);
});
```
