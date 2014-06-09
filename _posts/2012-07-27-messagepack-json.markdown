---
layout: post
title: 'MessagePack & JSON'
tags: code json messagepack msgpack
all_set: true
published: true
---

Yesterday I had lunch with [Paul Dix](http://www.pauldix.net/), and he
mentioned a serialization library called [MessagePack](http://msgpack.org/)
that could serialize and deserialize data the same as JSON, but with a much
smaller footprint in to the way that it encodes it data.  So I started
digging in..

JSON stores data in sets of enclosing braces that are extremely readable,
but not really optimal computer to read.  MessagePack gets its optimizations
by putting all of the data needed to know the size of a data structure at the
front of it.

So JSON thinks like:

	[ # square brace - i'm about to read an array
		"one", # read until the end ";, then saw a comma - there must be more elements
		"two"  # read until the end ";, no comma
	] # square brance - i'm done reading an array

And MessagePack thinks like:

	\x92 # a dictionary is coming with 2 elements
	\xA3 # the first element is a string with 3 letters
	one  # 3-letter string
	\xA3 # the second element is a string with 3 letters
	two  # 3-letter string

So that's really cool - and there are implementation for a lot of languages.
But I couldn't stop.  How much smaller does MessagePack makes things
practically - and how much faster is it?

### Length

I figured I'd compare a few common structures with the two libraries and see
how things came out.  I was also very interested to see how each library's
output compressed with gzip.

So I started off with a Facebook profile - Its a large Dictionary/Array mix
of data with generous amounts of integers and strings mixed in.  A great test
subject for a common case.

	== Full facebook profile ====
	MessagePack length: 1990* (973  compressed - 49%)
	JSON length:        2441  (955* compressed - 39%)

So on *this* data, although MessagePack is smaller, it didn't compress by the
same amount and thus the JSON compressed version was smaller.  This is
extremely interesting, but not entirely surprising if you think about the
amount of information that's repeated over and over in JSON (specifically
common patterns like "},{" which MessagePack doesn't have.  That against the
fact that MessagePack has an large number of identifiers that mean "Array"
because the identifier mixes in information about the length of the structure.

A friends list from Facebook would be an interesting subject too - since its
a large array of 2-element arrays.

	== Facebook friends list ====
	MessagePack length: 21848* (9482  compressed - 43%)
	JSON length:        27653  (9149* compressed - 33%)

As predicted, MessagePack does a better job compressing data like
this - because its identifier for Array also contains the length of the array
about to come.  JSON is still smaller compressed here - but let's push this
further.  Let's throw a structure at each that is a 100-element array
of 100 7-letter words.

	== 100 groups of 100 7-letter words ====
	MessagePack length: 80303* (49152* compressed - 61%)
	JSON length:        100201 (51726  compressed - 52%)

MessagePack compressed just as we thought - and now has edged out JSON.
Let's do the same with arrays of 7-digit numbers (just for fun)

	== 100 groups of 100 7-digit numbers ====
	MessagePack length: 50303* (36585* compressed - %73)
	JSON length:        80201  (36898  compressed - %46)

### Speed

For me, speed is where I'm really excited about what MessagePack could be
capable of.  So I started comparing the performance of
the [Ruby MessagePack library](http://rubygems.org/gems/msgpack) (written as
a C extension) to [yajl-ruby](https://github.com/brianmario/yajl-ruby/) (also
with C bindings to YAJL).

On the same Facebook profile as above, I benchmarked encoding and decoding
over 100,000 runs each.

	== Encoding ====
	user system total real
	json 6.360000 0.120000 6.480000 ( 6.468930)
	msg 4.480000 0.010000 4.490000 ( 4.481516) ***

	== Decoding ====
	user system total real
	json 15.040000 0.270000 15.310000 ( 15.290871)
	msg 13.180000 1.530000 14.710000 ( 37.719052) ***

### Conclusion

I will absolutely be using MessagePack when storing data either uncompressed,
or with large amount of repeated structure sizes.  It obviously won't work for
anywhere you'd like the data to be human-readable, but is an amazingly
brilliant idea with great execution.

Check it out!

The code used to generate these
numbers [can be found in this Gist](https://gist.github.com/3188573).
