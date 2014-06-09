---
layout: post
title: ! 'vim: supertab'
tags:
- supertab
- Tools
- vim
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '608835709'
---
This week's vim plugin is one I use every day (and an old one), so much that I often forget its a plugin, and think of it as part of vim. Its called <a href="https://github.com/ervandew/supertab">supertab</a>.

supertab binds the tab key in insert mode to autocompletion. Candidates for autocompletion come from all of the open buffers, so if you re working with a class in one file, and want to refer to a method name or constant, you can start typing and then use TAB to avoid typing. Its also really useful for just quickly shrinking down method or variable typing.

If there's only one autocompletion available, it will complete immediately, and if there are multiple, it will bring up a menu you can <code>&lt;tab&gt;</code> and <code>&lt;S-tab&gt;</code> through.
