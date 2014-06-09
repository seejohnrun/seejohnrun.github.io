---
layout: post
title: Fun With JavaScript Constructors (Part 1)
tags:
- Code
- constructors
- javascript
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '603307559'
  _yoast_wpseo_linkdex: '0'
---
Let's have some fun with JavaScript! First, we ll define a <code>Person</code>:

{% highlight js %}
var Person = function () { };
Person.prototype = {
  isPerson: function () {
    return true;
  }
};
{% endhighlight %}

Then we ll create a <code>NotPerson</code>, who is definitely not a person, but is a special function:

{% highlight js %}
var NotPerson = function () {
  return new Person();
};

NotPerson.prototype = {
  isPerson: function () {
    return false;
  }
};
{% endhighlight %}

And now:

{% highlight js %}
new Person().isPerson(); // true
new NotPerson().isPerson(); // also true
{% endhighlight %}

And:

{% highlight js %}
new NotPerson() instanceof Person; // true
new NotPerson() instanceof NotPerson; // false
{% endhighlight %}

Fun stuff! When you create a new object in JavaScript with <code>new</code>, an <code>Object</code> is created to act as <code>this</code>. Normally, the <code>this</code> instance is returned to the caller (with a prototype attached), but you can return something else and the called will receive it instead.

You can use this to pass back cached instances of an object, or proxy other objects.
