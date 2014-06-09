---
layout: post
title: Twitter User Streams are Awesome
tags:
- Thoughts
- Tools
- twitter
- user streams
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '351226115'
---
Over at <a href="http://patch.com/">Patch</a>, we have a lot of publications (towns that we're in) - more than 800 currently. Each town has an editor, and each editor sends out tweets about the stories and events in the town. We grab the tweets as they go out, and display them on the top of our pages <a href="http://southorange.patch.com/">ex: South Orange Patch</a>.

When we didn't have a lot of towns, we used Twitter's REST interface and continuously went through each each town to find tweets that happened since the last tweet we saw. This worked for a while - but eventually, we ran up against rate limiting restrictions. We got our worker machine that was handling twitter whitelisted (which they no longer do), and kept going on our merry way.

Further down the line, our tweets got more and more behind the time that they were actually happening, so we needed to come up with some other strategy. The first thing we came to was the new <a href="http://dev.twitter.com/pages/streaming_api">Twitter Stream</a> documentation. We set up a service that <code>follow</code> ed all of our accounts, and got tweets as they happened. The ugly part is that whenever we set up a new town, we need to stop the service and restart it - and while its restarting we could miss something. So the plan was to set up multiple stream services running at the same time, and then when we add a new editor - roll them one at a time.

I thought about it for a while, and the day before it was supposed to go into production I ended up pulling it. I had a cool idea for how to solve the problem all in one shot. The idea revolves around <a href="http://dev.twitter.com/pages/user_streams">Twitter User Streams</a> which are meant to feel all activity a client would need to know about a user. All of the tweets, updates on who they're following or unfollowing, etc.

We set up an account, followed all of our accounts with it, and then turned on the stream. Now we had a stream that had all of the tweets coming in, from every account we cared about. Every time that a site is added or changes its twitter handle, we just <em>follow</em> or <em>unfollow</em> that user with this account. It works beautifully, and it'll go into production next week.

<hr />

Next time you have a solution that's less than ideal - don't be afraid to throw it away for something better when you think of it, even if the original took some time to come to. This is <strong>development</strong>. :)
