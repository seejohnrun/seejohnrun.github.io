---
layout: post
title: Quick Local Short URLs
published: true
all_set: true
tags:
- Code
- ruby
- short urls
---

On patch.com, we generate short_urls for our editors to use on services like
Twitter. The benefit of generating the short URL internally is three-fold:

* We get to maintain the Patch branding
* We don't have to rely on an external shortening service
* We can be in control of how our links are created

The last one is really fun, because it means that we can cleverly name our
short_urls in a way that they don't need to make an extra request to the
database for lookup. So, instead of a user requesting http://patch.com/bE582,
and us looking up in a table what page that references, we can created a short
URL like: http://patch.com/L-dbrB and serve the user Listing 281923.

Its really simple, as is the code to support it:

<script src='https://gist.github.com/824374.js'></script>

---

__UPDATE__: I've released this process as a gem called `quick_short`, you can
install it with `gem install quick_short` or view the code on
[the GitHub page](https://github.com/seejohnrun/quick_short).
