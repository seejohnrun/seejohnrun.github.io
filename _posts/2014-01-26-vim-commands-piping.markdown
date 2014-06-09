---
layout: post
published: true
title: vim commands and piping
author: john
all_set: true
date: '2014-01-26 20:03:03 -0500'
date_gmt: '2014-01-27 01:03:03 -0500'
---

You may know that you can execute commands from inside of vim, with a vim command:

```
:! ruby do.rb
```

which will execute that code, and then - upon hitting enter, return you to your workspace.

Another nice one, is you can execute the exact same command with:

```
:!!
```

I use those a lot, but I just learned you can send the current buffer via a
pipe (even if unsaved) into a command like this:

```
:w !sort
```

Pretty nifty, huh?
