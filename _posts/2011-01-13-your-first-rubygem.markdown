---
layout: post
title: Your First RubyGem
tags:
- Code
- ruby
- rubygems
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '351413803'
---
RubyGems has made it so easy to release open source software these days. This is just a quick write-up on how to push up your first gem.

Imagine we wrote a really cool Module for reversing text:

{% highlight ruby %}
Module Reverser
  def self.reverse(str)
    str.reverse
  end
end
{% endhighlight %}

and we wanted to release this as a gem. Start off with a basic directory structure:

{% highlight bash %}
$ mkdir -p lib/reverser # for your code
$ mkdir -p spec/examples # for your tests
{% endhighlight %}

For this simple gem, we drop our module code into <code>./reverser.rb</code>. If we had other modules or class definitions, they would be loaded (or autoloaded) from reverser.rb and stored in <code>./lib/reverser</code>

The next thing we'll need is a gemspec. A gemspec is just a ruby file that gives gemcutter details about your gem. Name this file <code>reverser.gemspec</code>, and put it in your project's root directory alongside <code>lib</code>. The contents should look something like:

{% highlight ruby %}
require 'lib/reverser/version'
spec = Gem::Specification.new do |s|
  s.name = 'reverser' # the name of your library
  s.author = 'John Crepezzi' # your name
  s.add_development_dependency('rspec') # development dependency
  s.add_dependency # dependency
  s.description = 'reverser is an example library for reversing strings'
  s.email = 'john@crepezzi.com' # your email address
  s.files = Dir['lib/**/*.rb']
  s.homepage = 'http://seejohnrun.github.com/reverser/'
  s.platform = Gem::Platform::RUBY
  s.require_paths = ['lib']
  s.summary = 'example library for reversing strings'
  s.test_files = Dir.glob('spec/*.rb')
  s.version = Reverser::VERSION
  s.rubyforge_project = 'reverser' # what rubygems will call this gem
end
{% endhighlight %}

<em>Note, this is just a ruby file. You can do anything you need to in here, rather than wasting time using <a href="http://github.com/technicalpickles/jeweler">Jeweler</a> or <a href="http://github.com/seattlerb/hoe">Hoe</a></em>

You can see the full option set for the gemspec file <a href="http://docs.rubygems.org/read/chapter/20">in the reference</a>. At the top of my gemspec you probably noticed I required another file, where I keep the version string. Create this file in <code>lib/reverser/version.rb</code>:

{% highlight ruby %}
module Reverser
  VERSION = '0.0.1'
end
{% endhighlight %}

Now you're at a point where you can build the gem: <code>gem build reverser.gemspec</code>. That will produce <code>reverser-0.0.1.gem</code> and if you want to test out your new creation, you can install it with <code>gem install reverser-0.0.1.gem</code>.

Now the matter of pushing it to RubyGems, a simple <code>gem push reverser-0.0.1.gem</code>will do the trick.

<hr />

Of course you're writing a bunch of tests along the way, so I definitely recommend reading
[an article I wrote about Rakefiles]({% post_url 2010-06-17-rake-rspec-gemcutter %})
and how I use them to automate the whole process and make
sure my tests always get run and my tags always get created in git.

Check out my <a href="https://github.com/seejohnrun">GitHub projects</a> for more examples, and get that gem out!
