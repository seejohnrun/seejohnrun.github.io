---
layout: post
title: TweetStream4J - Twitter Streaming in Java
published: true
all_set: true
tags:
- Code
- java
- streaming
- twitter
---

I spent some time a few days back on the initial release of
[TweetStream4J](https://github.com/seejohnrun/tweetStream4J).
It is a Java library to interact with the new
[Twitter Streaming API](http://apiwiki.twitter.com/Streaming-API-Documentation) (v1).
Admittedly the initial release is one day old and a bit rough around the edges but still very useful.

I just wanna show here on the blog the example usage in order to persuade people
to pick it up, or develop similarly built libraries in other languages.

My implementation revolves around an interface called TwitterStream Handler:

``` java
public interface TwitterStreamHandler {
  // incoming tweet
  public void addTweet(STweet t);
  // incoming deletion request
  public void addLimit(STweet l);
  // incoming limit
  public void addDeletion(SDeletion d);
}
```

The handler is set to handle individual tweet, deletion, and limit request from
twitter, and the objects they take as parameters are sent directly from the
Streaming API, so a simple implmenetation of `addTweet(STweet t)` might look like:

``` java
@Override void addTweet(STweet t) {
  System.out.println(t.getText() + " (by " + t.getUser().getScreenName() + ")");
}
```

Once you have a useful handler, its time to put it to work. To use the `sample`
method is as easy as:

``` java
TwitterStreamConfiguraion tws = new TwitterStreamConfiguration("username", "xx");
TwitterStream ts = TweetRiver.sample(tws, handler);
(new Thread(ts)).start();
```

and the streaming will begin. If you d rather track keywords or users as
specified by the Twitter API site, you can use the  filter  method.

``` java
TwitterStreamConfiguration tws = new TwitterStreamConfiguration("username", "xx");
// build a list of strings to track
Collection<String> tracks = new ArrayList<String>();
tracks.add("obama");
tracks.add("bush");
// start streaming
TwitterStream ts = TweetRiver.filter(tws, handler, null, tracks);
(new Thread(ts)).start();
```

The implementation covers the higher-level methods like retweet and firehose
inaccessible to normal users, and has a full JavaDoc  so try it out and maybe
contribute some code.

_(BSD License)_
