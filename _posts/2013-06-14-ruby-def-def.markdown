---
layout: post
status: publish
published: true
title: 'Ruby: def def'
all_set: true
author: john
date: '2013-06-14 08:48:00 -0400'
date_gmt: '2013-06-14 12:48:00 -0400'
tags:
- ruby
---

Sometimes some Ruby programmers that want to give me a heart attack write
code like this:

``` ruby
class Thing
  def run
    def loop_thing(i)
      puts i
    end
    10.times { loop_thing(i) }
  end
end
```

That's a really cool nested function you made there!  Only one problem before
you go &mdash; __RUBY DOESN'T HAVE NESTED FUNCTIONS__.

``` ruby
thing = Thing.new
thing.run # 0..9
thing.loop_thing(31337) # 31337, no <NameError>
```

As we see here &mdash; in addition to being able to use `define_method`, you
_can_ actually run `def` inside of a method body.

_Now, cover your eyes if you don't want to see the scary thing_

``` ruby
class Array
  def stop_the_mapping!
    def map
      raise 'But you told me to stop ;('
    end
  end
end

arr = [1, 2, 3]
arr.map { |x| x + 1 } # [2, 3, 4]
arr.stop_the_mapping!
arr.map { |x| x + 1 } # <RuntimeError>
```
