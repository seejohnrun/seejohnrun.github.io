---
layout: post
published: true
title: 'Did you know: Ruby Splat'
author: john
all_set: true
date: '2013-06-13 10:49:40 -0400'
date_gmt: '2013-06-13 14:49:40 -0400'
categories:
- Code
tags:
- ruby
---

A lot of times, when I'm not using a particular variable in a given subclass
implementation (a dangerous pattern), I give the variable an underscore name to
remind future-John:

``` ruby
def thing(_arg1, _arg2)
  # implementation
end
```

If there are several I'm not using, I throw a splat in, and swallow all of them:

``` ruby
def thing(*_args)
  # implementation
end
```

__BUT__, for better or for worse, Ruby splat parameters don't need names:

``` ruby
def thing(*)
  # implementation
end
```
