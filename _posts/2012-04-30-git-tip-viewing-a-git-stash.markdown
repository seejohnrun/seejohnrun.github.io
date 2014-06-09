---
layout: post
title: ! 'Git Tip: Viewing a Git Stash'
published: true
all_set: true
tags:
- git
- Tools
---

I use `git stash` very often to set some code aside while I work temporarily in
another branch.  Sometimes, I want to peek at what I have stashed instead of
taking it out.  You can do that very easily with `git stash show`:

``` bash
$ git stash show -p  # view a diff
```
