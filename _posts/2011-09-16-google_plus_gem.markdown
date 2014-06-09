---
layout: post
title: Google+ API for Ruby
tags:
- Code
- google_plus
- ruby
published: true
all_set: true
---

When <a href="https://plus.google.com/">Google+</a> first came out, without an API, I decided it was funny to make a ruby gem called  google_plus  that worked like this:

``` ruby
GooglePlus.has_api? # false
```

Yesterday Google <a href="http://googleplusplatform.blogspot.com/2011/09/getting-started-on-google-api.html">announced</a> the first version of their API, and someone assigned me a ticket on github saying that <code>#has_api?</code> was returning the wrong value, so I fixed it and now there's a real implementation there.

* Install with: `gem install google_plus`
* Read about it [here](https://github.com/seejohnrun/google_plus)
