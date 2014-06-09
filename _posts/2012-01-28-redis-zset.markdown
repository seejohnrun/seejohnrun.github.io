---
layout: post
title: Redis ZSET
published: true
all_set: true
tags:
- Code
- redis
- zset
---

For the past 2 years I ve been all about [Redis](http://redis.io/),
and something I m continually excited about is `ZSET`.

It is a sorted set implementation built into Redis. Its super fast, flexible,
and I use it all the time, probably sometimes just because its fun.

I ll show how it works, and outline two situations I ve found it to be
especially effective.

### How is it used?

The simplest operation is to set a value for a given key. Imagine we want to
record ages in a sorted set:

```
redis 127.0.0.1:6379> ZADD "ages" 25 "john"
(integer) 1
redis 127.0.0.1:6379> ZADD "ages" 30 "joe"
(integer) 1
```

Once they re in, we can query them in order. To get the entries out, ordered
by their rank:

```
redis 127.0.0.1:6379> ZRANGE 'ages' 0 1
1) "john"
2) "joe"
```

It may be useful to see them in the reverse order (highest to lowest):

```
redis 127.0.0.1:6379> ZREVRANGE 'ages' 0 1
1) "joe"
2) "john"
```

Or to have their scores returned alongisde them:

```
redis 127.0.0.1:6379> ZREVRANGE 'ages' 0 1 WITHSCORES
1) "joe"
2) "30"
3) "john"
4) "25"
```

You can also do these ranges by score (`ZRANGEBYSCORE`), increment
members (`ZINCRBY`), remove ranges (`ZREMRANGEBYSCORE`, `ZREMRANGEBYRANK`), or
just query for scores (`ZSCORE`).

The cool part about this, is that these operations are so simple, that you can
use them as persisted copies of data structures, that can exist between multiple
services, or multiple hosts/nodes. In fact, that s exactly what projects like <a
href="https://github.com/nateware/redis-objects">redis-objects</a> exist to make
easy.

### Use: Scoring things

This is probably the first thing most people think of with the sorted set. When
something happens, we can bump up the value of a given key by a certain value
and then query for the top values (or lowest values) easily using `ZINCRBY`,
and efficiently.

### Use: Queryable Dated Entries

Another use I come into pretty often is to make the values UNIX timestamps, and
put data in the keys. With the set you can easily query for date ranges, get get
the oldest and most recent entries, and easily purge ranges of results when they
re no longer relevant (by date using <code>ZREMRANGEBYSCORE</code>, or by limit
with <code>ZREMRANGEBYRANK</code>.

### And then..

What s your favorite use of <code>ZSET</code>?

---

### Note on Documentation

One thing that s really neat about the redis documentation is that they describe
the runtime of each method right at the top. Check out the <a
href="http://redis.io/commands#sorted_set">ZSET documentation</a> for more
details!
