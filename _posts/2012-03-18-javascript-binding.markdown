---
layout: post
title: JavaScript Binding
tags:
- binding
- Code
- javascript
status: publish
type: post
published: true
meta:
  dsq_thread_id: '615816859'
  _syntaxhighlighter_encoded: '1'
  _edit_last: '1'
  _yoast_wpseo_linkdex: '0'
---
Its important to always remember that methods are just functions that are default-bound to a certain context:

{% highlight js %}
var Person = function (name) {
 this.name = name;
};

Person.prototype = {
 getName: function () {
 return this.name;
 }
};
{% endhighlight %}

So each has its own default version of `getName`:

{% highlight js %}
var kate = new Person('kate');
kate.getName(); // kate

var john = new Person('john');
john.getName(); // john
{% endhighlight %}

Which doesn't really matter so much:

{% highlight js %}
kate.getName.bind(john)(); // john
{% endhighlight %}
