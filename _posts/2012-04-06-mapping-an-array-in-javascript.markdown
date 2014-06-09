---
layout: post
title: Mapping an Array in JavaScript
published: true
all_set: true
tags:
- array
- Code
- javascript
---

Another useful feature of ECMAScipt 5 is its Array extensions.  I see a lot of
people including
[underscore.js](http://documentcloud.github.com/underscore/) in their
Node projects just to have access to `_.map` and `_.each`.  I love underscore, but
in V8 and ECMAScript 5 browsers, you already have these methods (and more)!

Array#each used to be a for loop:

``` js
var number;
for (var i = 0; i < numbers.length; i++) {
  number = numbers[i];
  // do something
}
```

now we have forEach:

``` js
numbers.forEach(function (number) {
  // do something
});
```

And map used to be pretty ugly:

``` js
var newNumbers = Array.new(numbers.length);
var number;
for (var i = 0; i < numbers.length; i++) {
  number = numbers[i];
  newNumbers[i] = someOperation(number);
}
```

But not anymore:

``` js
var newNumbers = numbers.map(function (number) {
  return someOperation(number);
});
```
