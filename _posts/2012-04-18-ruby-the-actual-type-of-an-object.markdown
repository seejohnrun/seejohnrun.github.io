---
layout: post
published: true
all_set: true
title: ! 'Ruby: The Actual Type of an Object'
tags:
- Code
- ruby
---

Today's post was inspired by my friend [Mat Brown](https://github.com/outoftime).

So, in Ruby it's quite possible to hide the class of an object, and make it
pretend to be something else.  Sometimes this can be useful - for example if you
don't want to extend a core object, but want people to be able to work with an
object as if you had.  A core example of this is how Rails *used* to treat
`ActiveSupport::TimeWithZone`.  You can take the concept pretty far:

``` ruby
class String
  def class
    Fixnum
  end
end
```

So, the class is

``` ruby
"hello".class # Fixnum
```

Then we get smart with Ruby:

``` ruby
"hello".is_a?(Fixnum) # false
```

but the library implementers keep up with us:

``` ruby
class String
  def is_a?(clazz)
    clazz == Fixnum
  end
end

"hello".is_a?(Fixnum) # true, gahhhh
```

Again and again, every time we think we've figured out the real class - we get
stumped.

Luckily, there are a few ways that are normally not (and shouldn't be)
overridden:

``` ruby
Fixnum === "hello" # false

# which you can mess up with
class Class
  def ===(obj)
  if obj.is_a?(String) && self == Fixnum
    true
  elsif String === obj
    false
  else
    super
  end
end

Fixnum === "hello" # true
String === "hello" # false
```

And .. for the most fun, we can bind Object's base implementation of `#class`
against an object and call it:

``` ruby
Object.instance_method(:class).bind("hello").call # String
```

And wouldn't you know it:

``` ruby
class Object
  def class
    if self.is_a?(String)
      Fixnum
    else
      super
    end
  end
end

Object.instance_method(:class).bind("hello").call # Fixnum
```
