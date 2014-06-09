---
layout: post
published: true
title: Ruby - local variables are undefined
author: john
all_set: true
date: '2013-11-10 09:30:32 -0500'
date_gmt: '2013-11-10 14:30:32 -0500'
categories:
- Code
---

I've blogged about this in the past, but I'm bringing it back here because I
think it's fascinating:

``` ruby
coolvar = 42 if false
coolvar # nil
```

I had seen someone bring up an interesting point, that this seemed natural
to them.  It was because they had read the above statement as:

``` ruby
temp = 42 if false
coolvar = temp
```

and then it would only make sense that `coolvar` have a value.  That doesn't
jive with me though, and it shouldn't jive with you.  That would mess up
precedence, treating `if`, more like the precedence of `rescue`.

Just to demonstrate that isn't the case, let's go for another example:

``` ruby
if false
  coolvar
end
coolvar # NameError
```

Uh-oh!!! Now we're in trouble, you say.  We just parsed some code that included
a variable and even after parsing it, the variable was still undefined.  The
precedence is clear here, and the behavior isn't happening.

Thing is - it's all about Ruby trying to figure out what `coolvar` is.  In
fact, let's go even further - __in Ruby, all undefined local variables are nil__.
When you type `coolvar`, Ruby just can't tell if `coolvar` is a method or a
local variable.  So you get a `NameError`.  If you do something that
demonstrates to Ruby that it's a local variable - then when it gets parsed,
you can access it and it's value will be `nil`.  Check it out:

``` ruby
if false
  coolvar = 'yup'
end
coolvar # nil
```

Hope this helps clear up things!
