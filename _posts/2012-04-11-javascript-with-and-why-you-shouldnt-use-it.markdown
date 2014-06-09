---
layout: post
title: JavaScript "with" and Why You Shouldn't Use It
published: true
all_set: true
tags:
- Code
- javascript
---

JavaScript has an operator called `with`.  First, I'll demonstrate its usage,
and then go over why you should stay away from it.

Imagine you have a few things that you are calling on the same object:

``` js
var obj = { person: { name: 'john', age: 25 } };
if (person.obj.age &gt; 20) {
  console.log(person.obj.name);
}
```

You can rewrite this using `with` like so:

``` js
var obj = { person: { name: 'john', age: 25 } };
with(obj.person) {
  if (age &gt; 20) {
    console.log(name);
  }
}
```

So you are essentially dropped into a place where the properties of the given
object are treated like locals.  This is appealing, until you see (1) the
alternative which is much prettier, and (2) the problems with this approach.

I'd rather see this code written in the shorter form:

``` js
var obj = { person: { name: 'john', age: 25 } };
var person = obj.person;
if (person.age &gt; 20) {
  console.log(person.name);
}
```

So, not only is the code without "with" shorter and more clean in its intent, it
also prevents the ugly mind-mess involved with trying to figure out code when
people write:

``` js
var name = 'kate';
var obj = { person: { name: 'john', age: 25 } };
with(obj.person) {
  name; // this value is 'john', but is it clear when reading this line?
}
```

Maybe don't use `with`. ;)
