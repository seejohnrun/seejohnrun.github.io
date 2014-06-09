---
layout: post
title: rake + rspec + gemcutter
published: true
all_set: true
tags:
- Code
- ruby
- rubygems
---

Today I'm going to talk about how I release new versions of <a
href="http://github.com/seejohnrun/ice_cube">ice_cube</a>. I've set up a rake
task called `release`, which makes sure that all of my tests pass before
deploying tagging and pushing to RubyGems. I got the basis of the idea from a
<a href="http://yehudakatz.com/2010/04/02/using-gemspecs-as-intended/">yehuda katz blog post</a>.

``` ruby
require 'spec/rake/spectask'
require 'lib/ice_cube/version'

task :build => :test do
  system "gem build ice_cube.gemspec"
end

task :release => :build do
  # tag and push
  system "git tag v#{IceCube::VERSION}"
  system "git push origin --tags"
  # push the gem
  system "gem push ice_cube-#{IceCube::VERSION}.gem"
end

Spec::Rake::SpecTask.new(:test) do |t|
  t.spec_files = FileList['spec/**/*_spec.rb']
  t.fail_on_error = true # be explicit
end
```

Then you can just update the version.rb file:

``` ruby
module IceCube VERSION = "0.3.9" end
```

and type:

``` bash
$ rake release
```

_Voila!_ Using this simple release method (thanks to rake and rspec), will make
sure you don't accidentally push broken versions ever (again).
