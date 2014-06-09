---
layout: post
title: ! 'Ruby: Bar bar equal'
tags:
- Code
- gotcha
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '559799229'
---
A common sight in Ruby code is <code>||=</code>:

<strong>What's that you say?</strong>

<code>||=</code> is used for conditional assignment:

{% highlight ruby %}
a = nil
a ||= 25 # Set a since it was nil
a ||= 24 # Don't set a since it is 25
{% endhighlight %}

One caveat is that the implementation of <code>||=</code> is conditional on whether a is <em>either</em><code>nil</code> or <code>false</code>, so 

{% highlight ruby %}
a = nil
a ||= false # set to false
a ||= true # set to true
{% endhighlight %}

If it helps to think of it this way, the closest easy approximation would be <code>a || a = 24</code>.

<hr />

Another far less used, but pretty cool one is `&&=`, as you can imagine, its the reverse. It will assign only if there is a non-<code>nil</code>, non-<code>false</code> value present:

{% highlight ruby %}
a = 24
a &&= nil # a becomes nil
a &&= 25 # a stays as nil
{% endhighlight %}
