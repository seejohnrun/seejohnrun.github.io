---
layout: post
title: Love (Keyphrase Extractor)
published: true
all_set: true
tags:
- Code
- java
- keyphrase
- Tools
---

I ve been doing a lot of research lately in an area that of great interest t
me.. that is Automated Keyphrase extraction. There are many different methods
commonly employed: TFxIDF, n-gram, thesaurus based, etc. Each of these is their
own entire field and topic of discussion, but what I m introducing today is a
library I ve been working on for combining as many of these methods as you d
like to form a custom keyphrase extraction solution. Its called _Love_, and
it will be seeing its first public code release in the next few weeks. Check
out some sample use, to whet your appetite between now and the release.

``` java
//set up love
Love love = new Love();
love.addData("The quick brown fox jumped over the lazy dog");
love.addData("I love foxes and jumping on dogs");

//extract data
List<Phrase> phrases = love.getPhrases();

//sort phrases by count
Collections.sort(phrases);

//do things with the results
for (Phrase phrase : phrases) {
  System.out.println(phrase.getStemForm());
}
```

This stuff is in heavy use on one of Zinkk's parsing engines already, and
will be seeing some nice enhancements in the coming weeks. The NLP (Natural
Language Processing) implications of this library have increased our
processing speed and end results dramatically.
