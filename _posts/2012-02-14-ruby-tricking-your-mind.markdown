---
layout: post
title: ! 'Ruby: Tricking Your Mind'
tags:
- Code
- gotcha
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '576442448'
---
Sometimes when programming, we trick our minds into thinking something is somethat it clearly isn t. One really good case of this is Ruby <code>||=</code>. We like to think of it as  set something if it doesn't have a value  - which is certainly not what it means (and not what it should mean).

Slow your mind down and consider this gotcha that will getcha every time:

{% highlight ruby %}
1.9.2 > a = false
=> false
1.9.2 > a ||= nil
=> nil
1.9.2 > a
=> nil
{% endhighlight %}

And its cousin:

{% highlight ruby %}
1.9.2 > a = false
=> false
1.9.2 > a || true
=> true
{% endhighlight %}

Try tracking that one down! Being explicit can be really helpful, as well as not letting your mind hold onto too many shortcuts for common patterns.
