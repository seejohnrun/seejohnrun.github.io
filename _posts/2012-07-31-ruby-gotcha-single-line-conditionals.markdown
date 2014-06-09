---
layout: post
title: 'Ruby Gotcha: single line conditionals'
published: true
all_set: true
tags: code gotcha ruby
---

I've touched on this gotcha briefly in the past
when [discussing the Wat video]({% post_url 2012-02-03-ruby-wat %}), but I
thought a few examples of when single-line conditionals can bite you would
be fun.

In Ruby, we can write a conditional containing a single expression that
normally takes up three lines:

``` ruby
unless condition
  something
end
```

on a single line to save space:

``` ruby
something unless condition
```

And that is all well and good - these two are pretty much the same.  But
they're not identical in practice. There are a few weird things about to
come up.

Our first example will be using `defined?` to conditionally print
a variable

``` ruby
if defined?(var1)
  puts var1 # never runs
end

var1 # NameError: undefined local variable
```

So that works just as we'd expect. The conditional never runs because
`defined?(var1)` returns `nil`. After the conditional, access the
undefined `var1` gives us a `NameError` because (appropriately) its not
defined. Let's modify that a little bit and put an assignment inside of the
conditional.

``` ruby
if defined?(var2)
  var2 = 5 # never runs
end

var2 # nil
defined?(var2) # "local-variable"
```

So that might look a bit odd.  We never ran the conditional, so `var2` never
gets set - that makes sense.  But after the block, `var2` doesn't throw a
`NameError` when accessed anymore. This is because the Ruby parser makes room
and defines `var2` when it sees it on the lefthand side of an expression (even
though its inside of a conditional that doesn't run).

Let's write the same on one line though:

``` ruby
var3 = 5 if defined?(var3)

var3 # 5
```

Even more interesting - an undefined variable written this way will become
defined and assigned when run.  The first thing that happens is that the parser
comes along and defines `var3` which it sees on the lefthand side
of a conditional.  _Then_ `defined?` runs, which this time evaluates
to `"local-variable"`, causing the conditional to pass, and `5` to be assigned
to `var3`.  In cases like this, the single-line conditional will produce an
entirely different result than block conditionals.
