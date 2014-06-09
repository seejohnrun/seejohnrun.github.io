---
layout: post
title: Natural Language Processing in JavaScript
tags:
- Code
- javascript
- nlp
- nodejs
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '622524248'
  _yoast_wpseo_linkdex: '0'
---
If you're doing anything with natural language processing in Node.js, <a href="https://github.com/NaturalNode/natural">natural</a> is a great library that has some common algorithms all in one place.  They have everything from distance algorithms to phonetic-similarity algorithms like Soundex &amp; Metaphone.

I just added a <a href="http://en.wikipedia.org/wiki/Dice's_coefficient">Dice's Coefficient</a> implementation today, and its really easy to use:

{% highlight js %}
var natural = require('natural');
console.log(natural.DiceCoefficient('thing', 'thing')); // 1.0
console.log(natural.DiceCoefficient('not', 'the same')); // 0.0
console.log(natural.DiceCoefficient('night', 'nacht')); // 0.25
{% endhighlight %}
