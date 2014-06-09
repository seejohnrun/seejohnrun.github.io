---
layout: post
title: Projects Yearning for Work
tags:
- github
- open source
- sourceforge
- Thoughts
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '554423595'
---
Last week, when trying to pick a few new projects to play with, I was reminded of a feature <a href="http://sourceforge.net/">sourceforge.net</a> has. Their <a href="http://sourceforge.net/people/">help wanted</a> board is a list of non-commercial projects that want/need help.

I started to think that something like this should exist for <a href="https://github.com/">github</a>, to help small projects get contributors   people who otherwise may not even know their project existed.

So I started coding on a thing I was calling <em>githelp</em>, which would build similar functionality using github oauth to provide some basic details about the projects alongside the postings.

My mind started running wild about whether or not this data already existed somewhere   or whether it could be automated to some extent.

<hr />

I started playing with <a href="https://github.com/search">GitHub search</a>, and came to searching for the file path  TODO.md .

<a href="https://github.com/search?type=Code&amp;language=&amp;q=path%3ATODO.md&amp;repo=&amp;langOverride=&amp;x=0&amp;y=0&amp;start_value=1">try it out!</a>

Once you have the list of files, you can go through the repositories and get their language or other properties. Adding a few other file names, and a search index, you could get a pretty neat list of projects that are looking to implement new features. I agree that these aren't necessarily projects that want more contributors, but its definitely a good place to start.

In the next few days, I'll be releasing a small tool to automate this process. What do you all think? Any other ideas?
