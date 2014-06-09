---
layout: post
title: Scripting GNU Screen
published: true
all_set: true
tags:
- gnu
- screen
- scripting
- Tools
---

Every day when I come over to my computer, I type the same few things to get my
[GNU Screen](http://www.gnu.org/software/screen/) windows set up properly. I
give them names, and I always open them in the same order for a given project.

So I started looking into easy ways to script `screen`.

Turns out, you can actually execute any screen command against a detached
screen. The list of commands is
[pretty extensive](http://aperiodic.net/screen/commands:start) too.

So a simple script to open two named screens might be as simple as:

``` bash
$ screen title "window one" screen title "window two"
```

Or even more simply:

``` bash
$ screen -t "window one" screen -t "window two"
```

Using the commands there, in addition to some other tools based on what you want
to start up, you can put together a completely reasonable script to start up
your screen session for a project. I like the idea of rather than executing the
things you want on startup, executing them with a comment before them, and then
starting them as needed. So if you wanted a rails server, instead of running
`rails server`, you'd just run `# rails server`. Then you can just hit up when
you want to actually start the server.

To run these scripts is a little tricky, but once you know how its easy:

``` bash
$ screen -d -m -S <name> -c <script_path>
```

And then to re-attach to it:

``` bash
$ screen -r <name>
```
