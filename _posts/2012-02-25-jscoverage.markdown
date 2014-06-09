---
layout: post
title: JS Coverage
tags:
- Code
- coverage
- javascript
- jscoverage
- nodejs
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  _wp_old_slug: js-coverage
  dsq_thread_id: '589030417'
---
A coverage tool is something that I ve always wanted for my Node.js development. I certainly don't depend on one, but I like when a coverage tool can point out things I ve obviously missed tests for.

Tools like this are tough in Javascript, because our tracing ability is limited. Yesterday, though   two new test runners were added for mocha, my <a href="http://seejohncode.com/2012/01/13/javascript-testing-with-mocha">favorite JS testing framework</a>. They are <code>js-cov</code> and <code>html-cov</code>. They work really well, and you should definitely give them a look.

Wanting to know how they worked, I dug a bit deeper, and quickly found that they depend on output for <a href="http://siliconforks.com/jscoverage/">jscoverage</a> to work. What <code>jscoverage</code> does, is create an instrumented copy of your code, by breaking it up and inserting lines to track counters of what was touched during execution, and how many times. Imagine we had this simple code (file:example.js):

{% highlight js %}
for (var i = 0; i < 10; i++) {
  console.log('hello world');
}
{% endhighlight %}

Running <code>jscoverage lib lib-coverage</code> will produce something like:

{% highlight js %}
// ...
_$jscoverage['example.js'][1]++;
for (var i = 0; (i < 10); (i++)) {
  _$jscoverage['example.js'][2]++;
  console.log("hello world");
}
{% endhighlight %}

So this is code that still works, but when run, will record which lines were touched. Then the mocha runner just runs the tests, parses the output and puts it in a pretty format. Really cool, useful stuff!

<em>Pro tip</em>: <code>jscoverage</code> also highlights code by default and I found that it was messing up mocha s output. You can turn it off with <code>jscoverage --no-highlight</code>.
