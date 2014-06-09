---
layout: post
title: Introducing CodeIgniter Sparks
tags:
- Code
- getsparks
- php
- sparks
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '351386217'
---
I've been spending some time (along with an <a href="http://getsparks.org/contact">excellent team</a> on a package management system for CodeIgniter called <a href="http://getsparks.org/">Sparks</a>. <em>Sparks</em> makes it really easy to distribute CodeIgniter packages. For example, I made a simple spark called<a href="http://getsparks.org/packages/gravatar_helper/versions/HEAD/show">gravatar_helper</a> which just provides a small helper class for working with <a href="http://en.gravatar.com/">Gravatar</a>. To install the spark, you d use:

{% highlight bash %}
$ php tools/spark install -v1.2 gravatar_helper
{% endhighlight %}

And once the package is installed, you can get started using the helper right away:

``` php
<?php
function index() {
  $this->load->spark('gravatar_helper/1.2');
  echo img(Gravatar_helper::from_email('john.crepezzi@gmail.com'));
}
```

We're really excited for what this means for sharing and versioning CI code, getting libraries you use commonly set up quickly, and discovering new packages other people have built. So if you're a CI developer, head over to <a href="http://getsparks.org/">http://getsparks.org/</a> and see what you can find (and contribute)!
