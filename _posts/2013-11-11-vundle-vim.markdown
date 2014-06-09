---
layout: post
published: true
title: Vundle for Vim
author: john
all_set: true
date: '2013-11-11 09:57:57 -0500'
date_gmt: '2013-11-11 14:57:57 -0500'
categories:
- Tools
---

I've spent years customizing my `vim` configuration.  My original configuration
came from my friend [Mat Brown](https://twitter.com/0utoftime), and from there
I started making changes.  A while back, I started sharing my
[dotfiles](https://github.com/seejohnrun/dotfiles) on GitHub for ZSH, __vim__,
tmux and irssi.

One underlying annoyance was that every time I added a new vim extension,
my `vim` directory would get even more wooly, even more out of control.  I'd
just be dumping files into these directories, and hoping everything kept
working &mdash; luckily, it always did :)

Recently, I'm really into `vundle`, and every file in my vim
configuration (except for `~/.vimrc`) has since gone away.  Vundle handles all
of it.

Vundle is essentially a package manager for vim, which allows you to pull in
vim files from git locations.  It keeps installation easy, and updates painless.
You just specify things like:

``` ruby
Bundle 'ZoomWin' # https://github.com/vim-scripts/ZoomWin
Bundle 'vim-ruby/vim-ruby' # https://github.com/vim-ruby/vim-ruby
Bundle 'https://github.com/some/full-location'
```

and then you can `:BundleInstall` to get going.  Definitely check it out if
this is (& has been) a problem for you:

[vundle on github](https://github.com/gmarik/vundle)
