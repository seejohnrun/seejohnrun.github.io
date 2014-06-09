---
layout: post
title: ! 'Vim: ZoomWindow'
tags:
- Tools
- vim
- zoomwindow
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '539595013'
---
Today I wanted to mention a simple vim plugin I've been using and loving. Its called<a href="http://www.vim.org/scripts/script.php?script_id=508">ZoomWindow</a> and here's how it works:

Imagine you have a set of windows split open, with a few files that are related to each other, and you re occasionally referencing details in others, but primarily working only in one of the windows. A large part of your vim real estate is taken by these things you re when only referencing them. Tabs are a decent approach to alleviate the problem, but prevent you from easily seeing things side by side, and clutter up your tab space.

<em>ZoomWindow</em> allow you to hit <code>&lt;c-w&gt;o</code> when in a window to make that window take over your entire session. Hitting <code>&lt;c-w&gt;o</code> again brings you back to the splits exactly as you left them.

The plugin is packaged as a <a href="http://www.vim.org/scripts/script.php?script_id=1502">vimball</a> and can be found at <a href="http://www.vim.org/scripts/script.php?script_id=508">vim.org</a>. Enjoy!
