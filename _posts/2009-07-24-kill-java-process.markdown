---
layout: post
published: true
all_set: true
title: Kill Java Process
tags:
- Code
- java
---

Lately I ve been working with a few java applications and decided I'd really
like a more convenient way of killing the processes. What I wanted was essentially:

``` bash
$ jkill {name} {signal}
```

With little help from a few blog posts, I decided on the following, which I like
quite a bit:

``` bash
#!/bin/bash
for pid in `ps -Ao pid,command | grep java | grep $1 | sed "s/^[ ]*//" | cut -d\  -f1`;
do
  ps -p$pid --no-header -f
  kill -@2 $pid
done
```
