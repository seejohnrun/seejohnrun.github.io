---
layout: post
title: Ruby Hash Sugar
tags:
- Code
- hash
- ruby
- sugar
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '535667033'
---
Very commonly, we use Ruby hashes as a way to emulate keywords args. The approach goes like:

{% highlight ruby %}
# These are the same
some_method({ :key => 'value' })
some_method(:key => 'value')
{% endhighlight %}

As <a href="https://twitter.com/0utoftime">@0utoftime</a> pointed out recently, this is also possible when using Hashes inside of Arrays:

{% highlight ruby %}
# These are the same
v = [ { :key => 'value' } ]
v = [ :key => 'value' ]
{% endhighlight %}

And, stretching the use even further, mixed in Arrays:

{% highlight ruby %}
# These are the same
v = [ 1, 2, { :key => 'value' } ]
v = [ 1, 2, :key => 'value' ]
{% endhighlight %}

Similar symmetry and sugar is obviously all through the language, but I found this one particularly cool.

Of course, Array also has some tricks:

{% highlight ruby %}
# These are the same
v = [1, 2]
v = 1, 2
{% endhighlight %}

and a few forms of multi-return

{% highlight ruby %}
# These are the same
temp = a; a = b; b = temp
a, b = b, a

# This is possible
a, b = [1, 2]

# This is possible
num1, num2, hash = [1, 2, :key => 'value']
{% endhighlight %}
