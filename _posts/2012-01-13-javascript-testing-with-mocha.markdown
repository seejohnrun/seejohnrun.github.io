---
layout: post
title: Javascript Testing with Mocha
tags:
- chaijs
- Code
- jasmine
- javascript
- mocha
- nodejs
- shouldjs
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '538189575'
---
I do a lot of work with <a href="http://nodejs.org/">node.js</a>, and since the beginning I wrote my tests with <a href="http://pivotal.github.com/jasmine/">Jasmine</a>. Testing synchronous code has been extremely painless, like:

{% highlight js %}
it('should test something', function() {
  expect(1).toEqual(1);
});
{% endhighlight %}

Most of my node code is written with callbacks, and I started to notice that using Jasmine, my async tests got pretty wild. A quick run-through will help explain how Jasmine is used, and why it works the way it does.

Testing asynchronous code is rough because you'd like to test expectations after some thing completes. Knowing when it completed is not directly possible in Javascript, so first attempts to test asynchronous Javascript led to relying heavily on timeouts:

{% highlight js %}
var hitThatCallback = function(callback) {
  setTimeout(function() {
    callback('thing');
  }, 1000);
};

it('should test something', function() {
  hitThatCallback(function(thing) {
    expect(thing).toBe('funny');
  });
  waits(500);
});
{% endhighlight %}

This approach lasted for a bit (and can still be used in Jasmine), but as programmers it just didn't feel right   there just had to be a better way. The next step Jasmine took to keep track of those callbacks involved two methods called <code>runs</code> and <code>waitsFor</code>, which share functional scope with each other. Here's how you would write the above test using them:

{% highlight js %}
it('should test something', function() {
  runs(function() {
    var $this = this;
    hitThatCallback(function(thing) {
      $this.done = true;
      $this.value = thing;
    });
  });
  waitsFor(function() {
    return $this.done;
  });
  runs(function() {
    expect($this.value).toBe('funny');
  });
});
{% endhighlight %}

If you don't think that's out of control, you can use your imagination to see how it looks with multiple asynchronous calls after one another, but it definitely works exactly as we'd hope.

<a href="http://visionmedia.github.com/mocha/">Mocha</a> is another framework, and mine of choice recently. It takes a different approach to testing async:

{% highlight js %}
it('should test something', function(done) {
  hitThatCallback(function(thing) {
    thing.should.equal('funny');
    done();
  });
});
{% endhighlight %}

By passing a function (<code>done</code>) into the test, you can track the end of the callback. If it hasn't come back <code>done</code> or failed an assertion in a certain time (default 2000 ms), the test fails.

This definitely feels much more natural, and the same mechanism is available in<code>beforeEach</code>, <code>afterEach</code>, etc.

Mocha supports a lot of different reporter styles, several paradigms including suites (TDD) and describe/it (BDD) styles, and has a pluggable assertion system (so you can use <a href="https://github.com/visionmedia/should.js">should.js</a>, <a href="http://chaijs.com/">chaijs</a>, etc).

Overall, definitely a big improvement to the clarity of my test suites. Hope you like it too!
