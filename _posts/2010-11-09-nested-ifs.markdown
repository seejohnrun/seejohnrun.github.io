---
layout: post
title: Nested IFs
published: true
all_set: true
tags:
- Code
- conventions
- ruby
- Thoughts
---

Today I'm going to rant a little bit about people going crazy with nested IF
statements. Ruby programmers, you are especially guilty (and proud to be). Its
not uncommon at all to see:

``` ruby
if condition1
  if condition2
    do_something
  end
end
```

When in any other language, everyone would prefer:

``` ruby
if condition1 && condition2
  do_something
end
```

You can definitely make an argument that its easy to change this logic later,
but I'd be against any argument that says the readability is higher here. Given
that there are no ELSE statements, the two boolean are logically tied to each
other. That's exactly why we have the `&&` operator.

---

### Bonus Rant!

``` ruby
def func
  if condition1
    do_something
    do_something_else
  end
end
```

I know everyone likes avoiding the `return` keyword, but wrapping an entire
method's body in an IF cries out to be this:

``` ruby
def func
  return nil unless condition1
  do_something
  do_something_else
end
```
