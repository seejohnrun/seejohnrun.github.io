---
layout: post
title: ! 'Short Tip: Rescuing a Method in Ruby'
published: true
all_set: true
tags:
- Code
- ruby
---

Ruby has some nice sugar around rescuing from errors that may be thrown from a
method.  A lot of times, I see code like this:

``` ruby
def some_method
  begin
    danger_danger
    true # good return
  rescue Error
    false # error return
  end
end
```

But you can make it a bit nicer to do the same with:

``` ruby
def some_method
  danger_danger
  true # good response
rescue Error
  false # error response
end
```
