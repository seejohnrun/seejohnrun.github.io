---
layout: post
title: ! 'Quick Tip: Testing Multipart Uploads with RSpec'
published: true
all_set: true
tags:
- Code
- rspec
- ruby
- spec
---

I couldn't find this practically anywhere, so I thought I'd write a quick post
on how to test multi-part uploads with RSpec.  The problem is that if you try to
write something like:

``` ruby
post :photo, :file => File.open(path)
```

You'll actually be sending the string "<File:...>" down as a request
parameter.  What you actually want is a bit more obscure, but works perfectly:

``` ruby
post :photo, :file => Rack::Test::UploadedFile.new(path, mime_type) # text/jpg
```
