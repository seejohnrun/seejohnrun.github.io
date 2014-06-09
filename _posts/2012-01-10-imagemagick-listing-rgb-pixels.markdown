---
layout: post
title: ! 'ImageMagick: Listing RGB Pixels'
tags:
- Code
- imagemagick
- rgb
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '534601472'
---
I ve been doing a decent amount of work with images and image manipulation recently at Newco. I ve never worked much in images before, but over the past eight or so months, I ve gotten my fair share of ImageMagick work in.

Something I discovered today, which absolutely blew my mind is some unexpected output formats supported by <code>convert</code>, the most important for this post being <code>txt:-</code>.

A lot of times, its very useful to get the pixel results of an operation as rgb values, and that's exactly what <code>txt:-</code> does.

Consider this operation:

{% highlight bash %}
$ cat cat.jpg | convert - -resize 4x4^ -extent 4x4+0+0 -gravity center -
{% endhighlight %}

This will take a picture of a pretty cat and resize it (in an equivelant matter to RMagick's <code>resize_to_fill</code> - which you can compare to how flickr.com displays photos) to 4x4 pixels.

That's all well and great, and we can use libraries like <code>RMagick</code> or perl's <code>Magick</code> to iterate through the pixels and perform other operations. <code>txt:-</code> lets us be more direct and work with what we want:

{% highlight bash %}
$ cat cat.jpg | convert - -resize 4x4^ -extent 4x4+0+0 -gravity center txt:-
{% endhighlight %}

```
# ImageMagick pixel enumeration: 4,4,255,rgb
0,0: (238,229,226) #EEE5E2 rgb(238,229,226)
1,0: (216,206,203) #D8CECB rgb(216,206,203)
2,0: (151,140,132) #978C84 rgb(151,140,132)
3,0: (213,202,198) #D5CAC6 rgb(213,202,198)
0,1: (239,228,226) #EFE4E2 rgb(239,228,226)
1,1: (218,207,204) #DACFCC rgb(218,207,204)
2,1: (130,121,111) #82796F rgb(130,121,111)
3,1: (212,201,197) #D4C9C5 rgb(212,201,197)
0,2: (229,219,217) #E5DBD9 rgb(229,219,217)
1,2: (190,182,179) #BEB6B3 rgb(190,182,179)
2,2: (135,129,119) #878177 rgb(135,129,119)
3,2: (195,187,182) #C3BBB6 rgb(195,187,182)
0,3: (232,232,226) #E8E8E2 rgb(232,232,226)
1,3: (177,175,169) #B1AFA9 rgb(177,175,169)
2,3: (117,111,102) #756F66 rgb(117,111,102)
3,3: (195,193,185) #C3C1B9 rgb(195,193,185)
```

Easy to read, easy to parse, no dependencies. Beautiful. You can even easily do conversions to other color depths with <code>-depth 16</code> as part of your <code>convert</code>!
