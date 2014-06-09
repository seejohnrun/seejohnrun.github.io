---
layout: post
title: Sass is Boss
tags:
- blueprint
- Code
- compass
- css
- sass
- scss
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '608791400'
---
Another installment of my  .. is boss  series, where I highlight a technology I love. This week, one that I ve been using for about two years. Its called Sass, and it provides a syntax called  SCSS  (Sassy CSS), which is an extension of CSS3 that can be compiled down to CSS with a <a href="http://sass-lang.com/download.html">sass compiler</a>.

I ve used Sass in many projects, even outside of Ruby / Rails, where it is just as valid, only less popular.

By being compiled, Sass is able to add a few amazing features. Here are two of my favorites:
<h2 id="nesting">Nesting</h2>
A lot of times we want one rule nested inside of the selector of another rule:

{% highlight css %}
#page {
  background: #990000;
}
#page .box {
  color: #fff;
  padding: 10px;
}
{% endhighlight %}

We can let Sass/SCSS handle the nesting, with a much more natural syntax:

{% highlight css %}
#page {
  background: #990000;
  .box {
    color: #fff;
    padding: 10px;
  }
}
{% endhighlight %}

This can get dangerous quickly if you nest too heavy, so definitely always be mindful of what your SCSS will compile down to.
<h2 id="variables">Variables</h2>
How many times have you wished CSS had variables? Sass lets you have them, and also do transforms on them. So you can perform mathematical operations to systematically cut up widths instead of changing numbers in 10 places when you want to change the page width. Or you can darken a master color and use it all over your page. You can end up with your style guide specified as a set of configs and mixins that you load in where you want them. And since it all compiles down before hitting the server, for the client it will be just as fast as a static CSS file (when set up properly).

Some sample usage:

{% highlight css %}
$red: #990000 body {
  background: $red;
}
#page {
  background: darken($red, 20%);
}
{% endhighlight %}
<h2 id="theres_more">There s more</h2>
Mixins are a great feature of Sass also, and its absolutely worth checking out more on <a href="http://sass-lang.com/">sass-lang.com</a>.

When you re done there, your next stop should be at the site for <a href="http://compass-style.org/">Compass</a>. Compass builds on top of Sass to add more helpers to Sass.

My favorite is their <a href="http://compass-style.org/reference/compass/css3/">CSS3 Compatibility</a>, which provide cross-browser ways to use things like <code>opacity</code>. You use these helpers and inserted in their place is all of the various ways that browsers want to see those rules. No more googling  cross-browser opacity :

{% highlight css %}
@import &quot;compass/css3/opacity&quot;
.box {
  @include opacity(0.5);
}
{% endhighlight %}
<h2 id="wrapup">Wrap-up</h2>
If you haven't already used Sass, I hope I ve inspired you to go check it out! It ll really speed up your CSS workflow.

<hr />

<ul>
	<li><a href="http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#plugin">sass reference</a></li>
	<li><a href="http://compass-style.org/reference/compass/">compass reference</a></li>
	<li><a href="http://getsparks.org/search">getsparks.org search</a> (for  sass )</li>
</ul>
