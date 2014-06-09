---
layout: post
title: SocketIO is Boss
tags:
- Code
- javascript
- nodejs
- socketio
- web sockets
- xmlsocket
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  _wp_old_slug: socketio-is-boss
  dsq_thread_id: '596805147'
  _yoast_wpseo_linkdex: '0'
---
It is time for the next installment of  ___ is boss . This time, I want to mention how  boss  <a href="http://socket.io/">SocketIO</a> is.

There are a few different ways that we typically go about handling real-time (or near real-time) communication between a web browser and server. Depending on how modern the browser is, or what the application demands, some choices are:
<ul>
	<li><a href="http://en.wikipedia.org/wiki/WebSocket">WebSockets</a> - A bidirectional protocol for communicating over a single TCP socket.</li>
	<li>(Long) Polling - the traditional way to accomplish this type of communication, in which the client continually checks the server for updates.</li>
	<li>Flash <a href="http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/XMLSocket.html">XMLSocket</a> - Can communicate with JavaScript to provide WebSocket-like functionality through Flash.</li>
</ul>
Even where they re supported   problems like unexpected disconnects can make working with them really tricky. Also, having to implement all of them just shouldn t be something you have to worry about. SocketIO aims to abstract all of that (and more - like the ability to do broadcasts easily) away into a beautiful library.

It works <em>extremely</em> well, and makes this type of communication really fun and easy. A client that absorbs data coming from the server is as quick as:

{% highlight js %}
var socket = io.connect('http://localhost');
socket.on('update', function (data) {
  console.log(data);
});
{% endhighlight %}
