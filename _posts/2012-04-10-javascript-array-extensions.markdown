---
layout: post
title: JavaScript Array extensions
published: true
all_set: true
tags:
- array
- Code
- javascript
---

To continue along the line of the JavaScript Array extensions
(see [my last post]({% post_url 2012-04-06-mapping-an-array-in-javascript %})
on map and forEach introduced in ECMAScript 5), today I'm going to
cover Array#some and Array#every.  These are two functions for returning
booleans based on Arrays, under certain conditions.

If you're into Ruby, #every is the same as #all?, and #some is the same as #any?

`Array#every` will return true if every iteration of an array returns true (with
shortcutting on the first false element):

``` js
var numbers = [1, 2, 3];
numbers.every(function (number) {
  return number > 2;
}); // false
```

`Array#some` will return true if any iteration of an array returns true (with
shortcutting on the first true element):

``` js
var numbers = [1, 2, 3];
numbers.some(function (number) {
  return number > 2;
}); // true
```
