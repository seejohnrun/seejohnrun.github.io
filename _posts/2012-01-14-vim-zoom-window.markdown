---
layout: post
title: ! 'Vim: ZoomWindow'
published: true
all_set: true
tags:
- Tools
- vim
- zoomwindow
---

Today I wanted to mention a simple vim plugin I've been using and loving. Its
called
[ZoomWindow](http://www.vim.org/scripts/script.php?script_id=508) and
here's how it works:

Imagine you have a set of windows split open, with a few files that are related
to each other, and you're occasionally referencing details in others, but
primarily working only in one of the windows. A large part of your vim real
estate is taken by these things you're when only referencing them. Tabs are a
decent approach to alleviate the problem, but prevent you from easily seeing
things side by side, and clutter up your tab space.

_ZoomWindow_ allow you to hit `<c-w> o` when in a window to make that
window take over your entire session. Hitting `<c-w> o` again brings you back to
the splits exactly as you left them.

The plugin is packaged as a
[vimball](http://www.vim.org/scripts/script.php?script_id=1502)
and can be found at
[vim.org](http://www.vim.org/scripts/script.php?script_id=508). Enjoy!
