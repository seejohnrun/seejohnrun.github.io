---
layout: post
title: Grep Default Options
tags:
- ack
- grep
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '587822381'
---
Like all of you, I use <code>grep</code> a lot to search through files. Actually, most of the time I use <a href="http://betterthangrep.com/">ack</a> instead. It provides some really friendly defaults for searching for occurrences recursively, and I think its interface is for the most part more natural to work with.

When I do use <code>grep</code>, I want it to behave a lot like <code>ack</code> (without the default filters). By that, I mean that I want it to highlight the occurrences, I want line numbers, and I don't care case-sensitivity. So I use something like:

{% highlight bash %}
$ grep -Rin --color=auto &quot;search_thing&quot; dir1 dir2 .. dirN
{% endhighlight %}

That's a lot of typing. Luckily, <code>grep</code> supports an environment variable called<code>GREP_OPTIONS</code>. Stick something like this in your <code>bash_profile</code>:
<div>
<pre><code>export GREP_OPTIONS='--color=auto -R -i -n' </code></pre>
</div>
And then you can use grep like:

{% highlight bash %}
$ grep &quot;search_thing&quot; dir1 dir2 .. dirN
{% endhighlight %}

for your default behavior. Because I don't like the default red color of the highlight, I also throw in:
<div>
<pre><code>export GREP_COLOR='0;93' </code></pre>
</div>
to change it to yellow. Enjoy!
