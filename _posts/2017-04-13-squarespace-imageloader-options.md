---
layout: post
title: Squarespace ImageLoader options
published: true
tags:
- Code
- JS
- squarespace
---

Writing custom code on top of Squarespace can be pretty tricky - depending on
a series of work-arounds and thinking through the minimal (but helpful at times)
documentation.

One of the niceties of Squarespace is that images are loaded at a size roughly
appropriate for the display size.  This is done on the fly, and they are
available in these sizes:

```
original, 1500w, 1000w, 750w, 500w, 300w, 100w
```

You can specify which one you want with a query parameter (`?format=300w`), but
Squarespace also provides a handy library called `ImageLoader` ([documentation](https://developers.squarespace.com/imageloader/))
for picking an appropriate size.

Unsurprisingly, the few paragraphs that the Squarespace documentation provides don't cover all
of the options available to you - but I've dug into the minified JS code to
pull out a list of options that may be helpful.

These options are passed via an object as the second argument to `ImageLoader.load`,
per esemptio:

``` js
ImageLoader.load(element, {option: 'value'});
```

---

`mode`
  - Purpose:  How to size the image for its container (`parentNode` must exist)
  - Default: `null`
  - Value:
    - `"fit"`: fit inside frame
    - `"fill"`: fill frame
    - `null`: no layout change

`load`
  - Purpose: Whether or not to load the image
  - Default: `true`
  - Value:
    - `true`: load the image when run
    - `false`: don't load the image, don't load dimensions (unclear why you'd use this lol)
    - `"viewport"`: load and return the property value which you can use to construct a URL

`dimensions`
  - Purpose: Set the dimensions directly (especially useful for working with a background image)
  - Default: image dimensions
  - Value: an object containing `width` and `height` properties

---

Finally, I'll provide a convenient snippet for grabbing the URL for an image sized
to a particular dimension & (optional) fill mode.  I use jQuery here just for quick
readability on the first line - obviously not required:

``` js
var fakeImage = $('<img>').attr('data-src', src)[0];
var size = ImageLoader.load(fakeImage, {
  load: 'viewport',
  dimensions: {
    width: w,
    height: h
  },
  mode: 'fill'
});

var url = src + '?format=' + size;
```

Good luck, hope this is helpful!
