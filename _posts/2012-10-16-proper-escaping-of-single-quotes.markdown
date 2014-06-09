---
layout: post
published: true
title: Proper Escaping of Single-quotes
all_set: true
tags: bash code ruby shell zsh
---

If you've ever tried building up a command programatically, you may have run
into some issues around proper quoting of arguments.

To solve most problems, you can just throw everything inside of a set single
quotes. The shell won't touch anything inside and you'll be all good.

``` bash
$ echo "$hello world"; # " world" # or something worse
$ echo '$hello world' # "$hello world"
```

Then the one remaining question is what to do if you want to include a single
quote? Your first inclination may be to escape it with a backslash:

``` bash
$ echo '$hello \' world' # incomplete
```

But that's not how it works :( The way you actually have to go about this is
to stop the single-quote pair, escape a single quote, and then start it back up.
Here it is:

``` bash
$ echo '$hello '\'' world' # "hello ' world"
```

---

As a bonus, if you try to do this substitution in Ruby, you may try
something like:

``` ruby
var = 'hello \' world'
var.gsub('\'', '\'\\\'\'') # "hello ' world' world"
```

Wat!? That's not what you wanted! Read that documentation!  Let's try again

``` ruby
var.gsub('\'') { '\'\\\'\'' } # "hello '\\'' world"
```

There we go! Make it a little prettier even:

``` ruby
var.gsub("'") { %q{'\'} }
```
