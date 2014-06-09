---
layout: post
published: true
title: Dependency Injection in JavaScript Tests
all_set: true
tags: code javascript testing tools
---

When you're writing tests in Node, its often useful to be able to stub out
modules which are included by the object you're attempting to test.
Unfortunately due to the way that the module system is structured, its not
straightforward to do this in a single test (as opposed to globally).

There are a few solution for this dependency injection problem around, namely
[node-sandboxed-module](https://github.com/felixge/node-sandboxed-module) and
[injectr](https://github.com/nathanmacinnes/injectr).  These modules use node's
[vm module](http://nodejs.org/api/vm.html) to create a new context that they run
the test inside of, and in that context they use the mock instead of the
original when calling `require`.  This is a nice solution, but unfortunately by
bringing the code into a new context, you also break code analysis tools like
Mocha's [html-cov]({% post_url 2012-03-13-setting-up-mocha-jscoverage %}).

A few days ago, [Matt Morgan](http://mlmorg.com/) released a module called
[mockit](https://github.com/mlmorg/mockit), which approaches the problem
instead by temporarily replacing `require` when requiring the dependency the
test needs (as opposed to trying to replace it for the duration of the test).

Imagine you had a `Downloader` class, and you wanted to use it in your tests,
but have it so that when `Downloader` called `require('http');`, it got a mock
instead of node's http class.  You could do that with one call to mockit:

``` javascript
var Downloader = mockit('../lib/downloader', {
  http: mockHttp
});
```

I think this is a really nice solution to this problem - totally unobtrusive
and uses node's existing `require` functionality when no mock exists. Check it
out!
