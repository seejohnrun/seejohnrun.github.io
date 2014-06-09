---
layout: post
title: 'Conventions: Ternary Operator'
published: true
all_set: true
tags:
- Code
- java
- ternary
---

I see code fairly often that has what I consider to be some simple, crucial
mistakes. There is one in particular that really digs to the center of me and
almost brings me to tears. That is, of course, the ternary operator (of
course?). Some things I've seen:

``` java
String temp = null;
if (drink.equals("coffee")) {
  temp = "awake";
}
else {
  temp = "asleep";
}
```

When I'd _much_ prefer to see:

``` java
String temp = (drink.equals("coffee")) ? "awake" : "asleep";
```

The ternary operator is there for a reason, and that reason is that it brings
this common operation down to a single, extremely readable and concise line. Its
simplicity is beautiful and it really has some great uses. __So please use it.__

While we re on the topic however, to the other extreme  I ve seen a lot of this,
which is also quite disheartening:

``` java
boolean awake = false;
if (drink.equals("coffee")) {
  awake = true;
}
else {
  awake = false;
}
```

After they learn a bit, certain people think they ll be clever and shorten that line to:

``` java
boolean awake = (drink.equals("coffee")) ? true : false;
```

Which of course makes me want to pull the hair from my head, knowing that they
ve essentially redesigned the concept of a boolean using the ternary operator.
The _correct_ code is:

``` java
boolean awake = drink.equals("coffee");
```

The lesson is to always use the tools available to you. This applies to
libraries, and even more so to structures built into language syntax. We become
better programmers when we write code that we can come back to and read without
getting caught up on things such as endless, unnecessary if/else indentation
structures.
