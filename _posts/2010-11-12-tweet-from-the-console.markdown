---
layout: post
title: Tweet from the Console
published: true
all_set: true
tags:
- ruby
- Tools
- twitter
---

I (like many of you) spend most of my day in the console, and I wanted an easy
way to be able to tweet about what I'm doing without opening a separate client.
This used to be really simple when Twitter allowed Basic HTTP authentication but
with their <a href="http://dev.twitter.com/pages/oauth_faq">switch to OAuth</a>,
using cURL is a bit less straightforward. I created a gem called
<a href="http://github.com/seejohnrun/console_tweet">console_tweet</a>.

To install it, just use:

``` bash
# Install the application
$ gem install console_tweet
# Set up your OAuth credentials
$ twitter setup
```

Once you have it installed, you can tweet any time with:

``` bash
$ twitter tweet &quot;hello world!&quot;
```

Or pipe input directly in:

``` bash
$ fortune | twitter tweet
```
