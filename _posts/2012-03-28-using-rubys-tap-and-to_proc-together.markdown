---
layout: post
title: ! 'Using Ruby''s #tap and #to_proc Together'
tags:
- Code
- ruby
- tap
- to_proc
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  _yoast_wpseo_focuskw: to_proc
  _yoast_wpseo_title: ! 'Using Ruby''s #tap and #to_proc Together for in-place Operations'
  _yoast_wpseo_metadesc: Symbol#to_proc and Object#tap can be combined to make in-place
    operations easier
  _yoast_wpseo_metakeywords: ruby tap to_proc
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
  dsq_thread_id: '626615828'
  _yoast_wpseo_linkdex: '80'
---
A while back I wrote an article on <a title="Ruby   #tap that!" href="http://www.seejohncode.com/2012/01/02/ruby-tap-that/">Ruby's #tap method</a>, and a few places I've been using it and been seeing it used.  One use that I mentioned in passing, I wanted to bring back up - because I've found its become something I do nearly every day.

That is, the combination of Object#tap and Symbol#to_proc.
<h2>What is Symbol#to_proc?</h2>
Symbol#to_proc is a shorthand for writing a full proc, so instead of:

{% highlight ruby %}
names = ['john', 'kate']
names.map { |n| n.reverse }
{% endhighlight %}

You can write the much nicer:

``` ruby
names = ['john', 'kate']
names.map(&:reverse)
```

<h2>Okay, but what is #tap again?</h2>
Tap can be written as:

``` ruby
class Object
  def tap(&:block)
    yield self
    self
  end
end
```

So we can tap into any method chain easily, for things like:

{% highlight ruby %}
[1, 2, 3].reverse
[1, 2, 3].tap { |a| puts a.inspect }.reverse # no change in behavior
{% endhighlight %}
<h2>How does it all tie together?</h2>
A lot of times in Ruby, we have these "bang" form of methods, and they sometimes perform operations in-place or raise exception in non-happy paths.  Let's look at an example

<strong>Array#uniq</strong> will always return "self", so we can chain operations like:

{% highlight ruby %}
arr.uniq.reverse
{% endhighlight %}

<strong>Array#uniq!</strong> on the other hand, returns `nil` if there is nothing to be removed.  So in order to write the same using the in-place version, we end up with:

{% highlight ruby %}
arr.uniq!
arr.reverse
{% endhighlight %}

Two lines!  Sure, I can squash them into one with a semi-colon, but with Symbol#to_proc and Object#tap we can have it all:

``` ruby
arr.tap(&:uniq!).reverse
```

The example is pretty simplified, but I'm sure you see how awesome this is.  I use it with ActiveResource::Base#save! a lot too.  Hope you like it!
