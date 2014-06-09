---
layout: post
title: ! 'Arduino: Combination Lock Opener'
published: true
all_set: true
tags:
- arduino
- Thoughts
---

So I've started in on my first Arduino project - an automatic combination lock
opener.  It'll automatically turn and guess the combination for a Master lock.
It'll have a screen to display its current combination attempt, and
will spin the dial itself.  I thought for a while about it, and I think I have
some really neat ideas to make it more interesting:

* An optimization can be made by taking advantage of the lock's imperfect
  positioning, and instead of trying every number, trying every other number first.
* Based on where 1 spin ends, you can make the next move you choose to make start close to the end position of your last move.
* The last turn, you can spin the lock and continually attempt opening, without re-trying the combinations.

So, my hopes are that with these optimizations, I can go from:

* 1st dial - 40 possibilities
* 2nd dial - 40 possibilities
* 3rd dial - 40 possibilities
* 40 * 40 * 40 = 64000 combinations

To:

* 1st dial - 20 possibilities
* 2nd dial - 20 possibilities
* 3rd dial - spinning as I go
* 20 * 20 * 1 = 400 combinations

I'll post here updates as I have them, and hopefully soon we'll have a cool
combination lock unlocker.
