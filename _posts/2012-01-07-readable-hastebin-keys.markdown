---
layout: post
title: Readable Hastebin Keys
tags:
- hastebin
- Thoughts
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '530688003'
---
Today I made a change to <a href="http://hastebin.com/">hastebin</a> that is really minor, but at the same time I think pretty fun. Before, the keys were comprised of a 10 character long random alphanumeric string. Commonly using hastebin between two machines, a few people noted that it would be neat if hastebin supported something similar to <code>pwgen</code> for more readable keys.

Now, you can set  phonetic  mode on (details in <a href="https://github.com/seejohnrun/haste-server">README</a>), and get keys that are comprised of alternating consonant and vowels, rather than being completely random. The effect, as simple as it is to implement   definitely increases the readability of the keys (although shrinking the keyspace).

You can check out the change on <a href="http://hastebin.com/">hastebin.com</a>   hope you like it!
