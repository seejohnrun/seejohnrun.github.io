---
layout: post
title: ! 'CoffeeScript: A Love Story?'
tags:
- Code
- coffeescript
- css
- haml
- javascript
- sass
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '351130754'
---
I m currently going through the same phase in my relationship with <a href="http://jashkenas.github.com/coffee-script/">CoffeeScript</a> that I went through a year ago with <a href="http://haml-lang.com/">Haml</a> and <a href="http://sass-lang.com/">Sass</a>. For those of you unfamiliar with CoffeeScript, its just a little syntax language that compiles directly to Javascript. Why would you want that? Well, let s look at Haml and Sass:

<strong>Haml</strong>

Haml code looks like this:
<pre>#wrapper
  #sidebar
    %a{:href => 'http://google.com'} Google
  #content
    %img{:src => 'lolcats.jpg'}</pre>
which when compiled to HTML, produces

{% highlight html %}
<div id='wrapper'>
  <div id='sidebar'>
    <a href='http://google.com'>Google</a>
  </div>
  <div id='content'>
    <img src='lolcats.jpg' />
  </div>
</div>
{% endhighlight %}

The cool part here is that since Haml is auto-closing all of your tags, they re automatically balanced. And the syntax is easier to read (IMO).

<strong>Sass</strong>

{% highlight scss %}
$padding_size: 20px
#sidebar a, a:visited
  padding: $padding_size / 2
  text-decoration: none
{% endhighlight %}

when compiled to CSS, produces

{% highlight css %}
#sidebar {
  padding: 10px;
}
#sidebar a, #sidebar a:visited {
  text-decoration: none;
}
{% endhighlight %}

So Sass uses the benefit of precompilation to add a few features (and <a href="http://sass-lang.com/">mixins</a>) to CSS. Above we can see in use: (1) variables, (2) math, (3) nesting.

<strong>CoffeeScript</strong>

So then there s CoffeeScript. If you haven t tried the <a href="http://jashkenas.github.com/coffee-script/"> Try CoffeeScript </a> demo yet, totally do that. Since the CoffeeScript compiler is implemented in JavaScript it can run for reals right in your browser. When you re ready to use it, if you re using Rails,<a href="https://github.com/Sutto/barista">Barista</a> is pretty awesome and quick to set up.

So now - why CoffeeScript again? CoffeeScript addresses a major pain point for Javascript developers: appearance, and <a href="http://www.jslint.com/">JSLint</a>. CoffeeScript always compiles to code that is set for JSLint (and normally more performant).

So this code in CoffeeScript:
<pre>square (x) -> x*x
numbers = [2, 3, 4, 5, 6]
numbers.each (x) -> square(x)</pre>
Compiles to:

{% highlight js %}
var numbers;
square(function(x) {
  return x * x;
});
numbers = [2, 3, 4, 5, 6];
numbers.each(function(x) {
  return square(x);
});
{% endhighlight %}

<strong>So, why the question mark in the title?</strong>

This doesn't speak well to Haml, but Sass makes changing CSS <strong>much, much</strong> easier. CoffeeScript changes Javascript syntax to make it more likable, but its still just Javascript. We probably shouldn t be adding entire steps to our process just to make things prettier and lint-free, but on the other hand - its so nice :)
