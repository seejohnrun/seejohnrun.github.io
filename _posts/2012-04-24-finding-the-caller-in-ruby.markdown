---
layout: post
title: Finding the Caller in Ruby
published: true
all_set: true
tags:
- Code
- ruby
---

In Ruby, it can be really useful to know, in the flow of execution, the call
stack within a certain method.  For that we have `Kernel#caller`.

`#caller` returns an Array representing the current call stack, where each
element is a String like `"file:line in 'name'"`.  Here's an example:

``` ruby
def actually_do_it
  caller.join(&quot;\n&quot;)
end

def do_it
  actually_do_it
end

puts do_it
```

which will output:

```
ex.rb:8:in `do_it'
ex.rb:11:in `<main>'
```
