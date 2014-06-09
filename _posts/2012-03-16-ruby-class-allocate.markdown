---
layout: post
title: Ruby's Class.allocate
tags:
- Code
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '613309888'
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_title: ''
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_metadesc: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_focuskw: ''
  _yoast_wpseo_linkdex: '0'
  _yoast_wpseo_google-plus-description: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_canonical: ''
---
Today I'm going to discuss the little-known ruby method, Class.allocate.
<h2>What is #allocate?</h2>
In these situations, so that I don't miss any details - I like to turn to Ruby's source, which as of 1.9.3 is:

{% highlight c %}
VALUE
rb_class_new_instance(int argc, VALUE *argv, VALUE klass)
{
    VALUE obj;
    obj = rb_obj_alloc(klass);
    rb_obj_call_init(obj, argc, argv);
    return obj;
}
{% endhighlight %}

Cool - that's easy enough of a translation:

{% highlight ruby %}
class Class
  def new(*args)
    obj = allocate
    obj.initalize(*args)
    obj
  end
end
{% endhighlight %}

So #new is just an allocation followed by a call to initialize.  Ruby exposes the allocate method to us decoupled from #initialize!!  If you're an Objective-C developer, you may be saying "haha, us too!", and you'd be totally right:
<pre>[[Something alloc] init];</pre>
is commonly used instead of:
<pre>[Something new];</pre>
<h2>That's great, why do I want it?</h2>
One of the reasons that Objective-C programmers prefer [[Something alloc] init] is that it makes calling custom initializers much easier.  So instead of always calling init, you may want to initWithConnection.  We can use it very similarly in Ruby (and ActiveRecord does just that internally).

Imagine we have a "Data" class that is used for just storing some data:

{% highlight ruby %}
class Data
  def initialize
    @data = {}
  end
end
{% endhighlight %}

And then some day we want to be able to initialize an instance of Data already populated.

We have a few options.  The most common is probably to add a parameter to the initializer:

{% highlight ruby %}
class Data
  def initialize(data = {})
    @data = data
  end
end
{% endhighlight %}

This works really well, but we've modified the public interface here in order to allow for this edge case.  It's easy to imagine a time 20 options down the line where our initializer gets pretty ugly.

Another option is to allow setting of data by any member:

{% highlight ruby %}
class Data
  attr_writer :data
  def initialize
    @data = {}
  end
end
{% endhighlight %}

Again - this works, but what about the fact that we're (1) exposing data to be changed at any point in a classes' life, and (2) wasting time initializing data to a value inside of #initialize that we will never use.

The way we'd accomplish this with allocate is more factory-like:

{% highlight ruby %}
class Data
  def initialize
    @data = {}
  end

  def self.initialize_stored(data)
    obj = allocate
    obj.instance_variable_set :@data, data
    obj
  end
end
{% endhighlight %}

That way, people can continue to use #new how they do, and when they want to initialize one with pre-populated data they can use #initialize_stored with no object overhead.
