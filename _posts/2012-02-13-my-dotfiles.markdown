---
layout: post
title: My dotfiles
tags:
- bash
- Code
- dotfiles
- github
- ps1
- Tools
- vim
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '574558325'
  _yoast_wpseo_metadesc: ''
  _yoast_wpseo_title: ''
  _yoast_wpseo_focuskw: ''
  _yoast_wpseo_metakeywords: ''
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
---
Everyone has their own perfect setup, their perfect <code>PS1</code> prompt, their perfect color schemes and vim plugins.

Its a pain to configure that setup everywhere. That's why I store my dotfiles on <a href="https://github.com/seejohnrun/dotfiles">github</a>. It takes a bit to set up, but once you have it - it is super convenient.

A lot of people are versioning their entire <code>/home/:user</code> directory, but that seems like way overkill, and a complete misuse of public repositories. What I do is clone that repository into <code>~/.dotfiles</code>, and then use symlinks to bring the shared copies into<code>~</code>. I symlink every file or directory that I want my special copy of onto that machine:

{% highlight bash %}
$ ln -s ~/.dotfiles/.vimrc ~/.vimrc
$ ln -s ~/.dotfiles/.vim ~/.vim
$ ...
{% endhighlight %}

I use these across machines, so when I do things like apply patches to ~/.vim files or change my PS1, I can just run a <code>git pull</code> to update it everywhere.

It d also be really easy to write up a few scripts that just run through the symlinks I typically like on MacOS, Linux, etc. I haven't gone that far, but <code>-f</code> would allow you to write the symlinks regardless of whether they exist so you could make updates painless.

This also makes it really easy to share with people that like parts of my setup, and vice versa. That's all!
