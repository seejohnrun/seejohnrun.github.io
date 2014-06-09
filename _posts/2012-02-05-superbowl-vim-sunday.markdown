---
layout: post
title: Superbowl Vim Sunday
tags:
- colorcolumn
- Tools
- vim
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '565443577'
---
Its Super Bowl Sunday! I'm having a few friends over to watch the Giants win the game. Before the party starts, I'd like to share my favorite part of my <code>.vimrc</code> file:
<div>
<pre>au BufWinEnter * let w:m2=matchadd('ErrorMsg', '\%80v.\+', -1)
au BufWinEnter let w:m2=matchadd('ErrorMsg', '\s\+$', -1)</pre>
</div>
What this line does is highlight trailing whitespace and highlight any characters that cross the 80 character mark.

I do like <a href="http://choorucode.wordpress.com/2011/07/29/vim-set-color-of-colorcolumn/">colorcolumn</a> in vim 7.3, but I still do prefer these over it still.

Keeps me in line, and definitely forces these things to stay out of any code I touch.
