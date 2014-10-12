---
layout: post
title: Symbol#to_proc can be Tricky
published: true
all_set: true
tags:
- Code
- ruby
---

In Ruby, when you have a block that calls a method on an object with no
arguments, you can replace the block syntax with a more convenient, shorter
syntax provided by `Symbol#to_proc`:

``` ruby
# This
['these', 'are', 'words'].map { |word| word.reverse } # ['eseht', 'era', 'sdrow']

# Will produce the same result as this
['these', 'are', 'words'].map(&:reverse) # ['eseht', 'era', 'sdrow']
```

You can generally treat these the same, but since the call passes through
`Symbol#to_proc`, there are some differences to watch out for.  Today I'll show
an example of a fun one.  Imagine you have a class like this:

``` ruby
class Something

  def test1
    [Something.new, Something.new].each { |thing| thing.method_to_use }
  end

  def test2
    [Something.new, Something.new].each(&:method_to_use)
  end

  protected

  def method_to_use
    puts 'used!'
  end

end
```

These should be identical, but `Something.new.test1` will work perfectly fine,
while `Something.new.test2` will raise a `NoMethodError`!  The reason for the
error is that although `method_to_use` being protected is fine from the block in
`#test1`, passing through `Symbol#to_proc` in `#test2` changes the context of the
call.  Since `Symbol` doesn't have access to protected methods on `Something`,
you get an error.

We can prove this to ourselves by running the same test against `Symbol`, like
so:

``` ruby
class Symbol

  def test1
    [:one, :two].each { |s| s.method_to_use }
  end

  def test2
    [:one, :two].each(&:method_to_use)
  end

  protected

  def method_to_use
    puts 'used!'
  end

end
```

No errors from `(:sym).test1` or `(:sym).test2` :)

---

Another fun thing to look at here, which is pretty confusing is the values for
`caller` in `method_to_use`.

In `#test1`, here's `caller` (as you'd expect):

``` ruby
["do.rb:3:in `block in test1'", "do.rb:3:in `each'",
 "do.rb:3:in `test1'", "do.rb:15:in `<main>'"]
```

But `caller` in `#test2` tells a different story (one devoid of `Symbol#to_proc`):

``` ruby
["do.rb:6:in `each'", "do.rb:6:in `test2'", "do.rb:16:in `<main>'"]
```

And that's a preview for a follow-up post!
