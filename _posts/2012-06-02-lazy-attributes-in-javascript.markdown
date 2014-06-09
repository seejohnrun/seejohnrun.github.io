---
layout: post
title: Lazy Attributes in JavaScript
all_set: true
tags:
- Code
- javascript
- nodejs
status: publish
published: true
---

A while back, I released a tiny library called
[laze](https://github.com/seejohnrun/laze) for making the use of lazy attributes
easy in JavaScript.

I thought I'd do a post to provide some more context of how laze fits into my
workflow in a [node.js](http://nodejs.org/) project.  There are definitely some
terrible things you can do with this library, but hopefully this post will
outline the intended use and convince you to try it out.

Imagine I want to create a new server, and then start listening on a given port.
I start out with some really tightly coupled code:

``` js
Server.prototype = {
  start: function () {
    var host = this.config.host || '127.0.0.1';
    var port = this.config.port || 8080;
    var server = http.createServer();
    server.on('request', this.handleRequest.bind(this));
    server.listen(port, host);
  }
};
```

This code works well, but in my opinion it just does way too much.  In here, we have logic for:

* Handling how to pull the host and port out of our config - and what to do if they're not set
* Creating a new server
* Binding our server to another function for requests
*	Starting the server listening on the given host and port

Imagine we want to start splitting this function up a bit.  We'll start with pulling the host/port configuration out.

``` js
Server.prototype = {
  getHost: function () {
    return this.config.host || '127.0.0.1';
  },
  getPort: function () {
    return this.config.port || 8080;
  },
  start: function () {
    var server = http.createServer();
    server.on('request', this.handleRequest.bind(this));
    server.listen(this.getPort(), this.getHost());
  }
};
```

So this works pretty well actually - but if somewhere else in this object we'd
like to have access to the host and port, we're re-running the logic inside of
`getHost` and `getPort`.  Not a big deal for these quick functions, but
something that did a bit more would make that approach just wasteful.

So we could proceed in one of two ways:

### Call getHost and getPort from the constructor

``` js
var Server = function () {
  this.host = this.getHost();
  this.port = this.getPort();
};
```

If we call the two methods from the constructor, we can have properties set that
contain the proper host and port.  This is nice - but crowding our constructor
with calls to methods that aren't needed _unless_ start gets called.  You can
see that if these were time-intensive tasks - we'd end up wasting time for
methods that may not be called at all.

### Call getHost and getPort from `start`

``` js
Server.prototype.start = function () {
  this.host = this.getHost();
  this.port = this.getPort();
  var server = http.createServer();
  server.on('request', this.handleRequest.bind(this));
  server.listen(this.port, this.host);
};
```

This approach is good - its made our start function a bit more complicated but
the separation is correct.  The one remaining problem with this approach is that
if another method wants to access `host` or `port` before `start` has been
called - they'll both be undefined.

### Another Option: Lazy Attributes

Laze uses `defineProperty` to give us another option.  We can define properties
that won't be set until they are used.  Then we get the best of all worlds.  The
host or port can be called at any time and have the proper values.  And - once
they're called one time, they'll hold onto their value for the next time without
recomputing it.  Let's take a look at the code:

``` js
Server.prototype = {
  start: function () {
    var server = http.createServer();
    server.on('request', this.handleRequest.bind(this));
    server.listen(this.port, this.host);
  }
};

laze.defineAll(Server.prototype, {
  port: function () {
    return this.config.port || 8080;
  },
  host: function () {
    return this.config.host || '127.0.0.1';
  }
});
```

If you want to - you could take this whole thing another step, and make the
creation of the server lazy too.

``` js
Server.prototype = {
  this.server.listen(this.port, this.host);
};

laze.defineAll(Server.prototype, {
  port: function () {
    return this.config.port || 8080;
  },
  host: function () {
    return this.config.host || '127.0.0.1';
  },
  server: function () {
    var server = http.createServer();
    server.on('request', this.handleRequest.bind(this));
    return server;
  }
});
```

I hope this post gave a good overview of using lazy attributes in JavaScript
with laze - if you're interested in reading how it works check out the
[code](https://github.com/seejohnrun/laze/blob/master/lib/laze.js)
(which is pretty simple), or go straight to the github page.

You can also install laze via npm:

``` bash
npm install laze
```
