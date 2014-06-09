---
layout: post
title: Ruby Backtick
published: true
all_set: true
tags:
- Code
- overloading
- ruby
---

One of my favorite things about Ruby is how it handles operator overloading.
For example, to overload `+` on a class, you can just define a specially-named
method:

``` ruby
class John
  def +(other)
    puts "so you want to add #{other} to me, eh?"
  end
end
```

And accessing it looks something like:

``` ruby
John.new + 1
```

Another case of these that I think is fun, but that we don't think of as a
method too often, is the backtick operator.  You can redefine backtick just like
anything else:

``` ruby
def `(str)
  puts str
end
```

which will print anything contained in backticks instead of executing it:

``` ruby
`hello world!`
```

__BONUS FACT:__ Did you know the proper name for backtick is the
[grave accent](http://en.wikipedia.org/wiki/Grave_accent)?
