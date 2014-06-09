---
layout: post
title: Path Dependencies with Bundler
published: true
all_set: true
tags:
- bundler
- gem
- ruby
- Tools
---

I'm a big fan of splitting up applications into separate pieces whenever
possible.  This is especially convenient in Ruby with tools like bundler &
rubygems to make modularization a breeze.

Often when I turn something into a gem, I want to work on my application and its
dependency at the same time.  For that reason, bundler let's you declare
dependencies by path, instead of rebuilding:

If a normally line in your Gemfile looks like:

``` ruby
gem 'autodoc'
```

you can specify a path as an argument to `gem` like:

``` ruby
gem 'autodoc', :path => '/Users/john/Development/autodoc'
```
