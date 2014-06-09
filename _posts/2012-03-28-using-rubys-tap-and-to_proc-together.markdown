---
layout: post
title: ! 'Using Ruby''s #tap and #to_proc Together'
published: true
all_set: true
tags:
- Code
- ruby
- tap
- to_proc
---

A while back I wrote an article on
[Ruby's #tap method]({% post_url 2012-01-02-ruby-tap-that %}), and a few places
I've been using it and been seeing it used.  One use that I mentioned in
passing, I wanted to bring back up - because I've found its become something I
do nearly every day.

That is, the combination of Object#tap and Symbol#to_proc.

### What is `Symbol#to_proc?`

Symbol#to_proc is a shorthand for writing a full proc, so instead of:

``` ruby
names = ['john', 'kate']
names.map { |n| n.reverse }
```

You can write the much nicer:

``` ruby
names = ['john', 'kate']
names.map(&:reverse)
```

### Okay, but what is #tap again?

Tap can be written as:

``` ruby
class Object
  def tap(&:block)
    yield self
    self
  end
end
```

So we can tap into any method chain easily, for things like:

``` ruby
[1, 2, 3].reverse
[1, 2, 3].tap { |a| puts a.inspect }.reverse # no change in behavior
```

### How does it all tie together?

A lot of times in Ruby, we have these "bang" form of methods, and they sometimes
perform operations in-place or raise exception in non-happy paths.  Let's look
at an example:

`Array#uniq` will always return `self`, so we can chain operations like:

``` ruby
arr.uniq.reverse
```

`Array#uniq!` on the other hand, returns `nil` if there is nothing to be
removed.  So in order to write the same using the in-place version, we end up
with:

``` ruby
arr.uniq!
arr.reverse
```

Two lines!  Sure, I can squash them into one with a semi-colon, but with
`Symbol#to_proc` and `Object#tap` we can have it all:

``` ruby
arr.tap(&:uniq!).reverse
```

The example is pretty simplified, but I'm sure you see how awesome this is.
I use it with `ActiveResource::Base#save!` a lot too.  Hope you like it!
