---
layout: post
title: ! 'Ruby - #tap that!'
tags:
- Code
- ruby
- tap
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '524379595'
---
Today I wanted to talk about <code>#tap</code>, an addition to Ruby in versions &gt;= 1.9, and how I ve been using and seeing it used lately.
<h2 id="what_is_">What is <code>#tap</code>?</h2>
The feature is <a href="https://github.com/ruby/ruby/blob/trunk/object.c">coded</a> like so:

{% highlight c %}
VALUE rb_obj_tap(VALUE obj)
{
  rb_yield(obj);
  return obj;
}
{% endhighlight %}

So, in Ruby:

{% highlight ruby %}
class Object
  def tap
    yield self
    self
  end
end
{% endhighlight %}
<h2 id="what_is__for">What is <code>#tap</code> for?</h2>
So that looks pretty simple, it just allows you do do something with an object inside of a block, and always have that block return the object itself. <code>#tap</code> was created for  tapping  into method chains, so code like this:

{% highlight ruby %}
def something
  result = operation
  do_something_with result
  result # return
end
{% endhighlight %}

can be turned into (without modifying the contract of <code>do_something_with</code>):

{% highlight ruby %}
def something
  operation.tap do |op|
    do_something_with op
  end
end
{% endhighlight %}
<h2 id="where_has_it_gone_wrong">Where has it gone wrong?</h2>
Some early blog posts talking about tap focused on its use for inserting calls to <code>puts</code>into code without modifying behavior:

{% highlight ruby %}
arr.reverse # BEFORE

arr.tap { |a| puts a }.reverse # AFTER
{% endhighlight %}

This isn't a great use, not only because it involves debugging your code solely by means of output (instead of a <code>debugger</code>), but also because <code>#tap</code> is so much cooler an idea than just a mechanism for inserting temporary code.
<h2 id="why_i_like_it">Why I like it:</h2>
In additional to the tapping behavior described in the first section, here are some other uses I m seeing / using:

<strong>Assigning a property to an object</strong>

Especially useful when assigning a single attribute

{% highlight ruby %}
# TRADITIONAL
object = SomeClass.new
object.key = 'value'
object

# TAPPED
object = SomeClass.new.tap do |obj|
  obj.key = 'value'
end

# CONDENSED
obj = SomeClass.new.tap { |obj| obj.key = 'value' }
{% endhighlight %}

<strong>Ignoring method return</strong>

Useful when wanting to call a single method on an object and keep working with the object afterwards:

{% highlight ruby %}
# TRADITIONAL
object = Model.new
object.save!
object

# TAPPED
object = Model.new.tap do |model|
  model.save!
end

# CONDENSED
object = Model.new.tap(&:save!)
{% endhighlight %}

<strong>Using in-place operations chained </strong>

A lot of times, we expand logic in order to use in-place methods like <code>reverse!</code>, but look:

{% highlight ruby %}
# TRADITIONAL
arr = [1, 2, 3]
arr.reverse!
arr

# TAPPED CONDENSED
[1, 2, 3].tap(&:reverse!)
{% endhighlight %}
<h1 id="conclusion">Conclusion:</h1>
Just like anything else, don't overuse <code>#tap</code> just for kicks. Its tempting to tap everything, but it definitely can make code less readable if used inappropriately. That being said, its a great addition to a Rubyist s sugar toolkit. Give it a shot!
