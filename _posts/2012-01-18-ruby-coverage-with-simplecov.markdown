---
layout: post
title: Ruby Coverage with SimpleCov
tags:
- Code
- coverage
- rcov
- ruby
- simplecov
- spork
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '544752816'
---
I find it really useful to use a coverage tool when writing code. I don't depend on it, but I do like to see what percentage of lines are covered, so I can at least catch any glaring misses.

In Ruby 1.8, we had <a href="https://github.com/relevance/rcov">rcov</a>, which was (and is) a really great tool. In Ruby 1.9, I've been depending on <a href="https://github.com/colszowka/simplecov">SimpleCov</a>. I really enjoy their reporter interface, and the usage is very similar to rcov. In your <code>spec_helper</code>, before you include the thing you're testing, just start up SimpleCov. I prefer to write it like:

{% highlight ruby %}
begin
  require 'simplecov'
  SimpleCov.start
rescue LoadError
  puts 'Coverage disabled, enable by installing simplecov'
end

require 'your_library' # your library
require 'config/environment.rb' # rails?
{% endhighlight %}

Some features I really like:
<ul>
	<li>Filtering is super easy</li>
	<li>Grouping is a powerful way to segment files like models, controllers, into their own groups.</li>
	<li>Merging results over time so that when you run a subset, you can merge them into the overall set from other subsets (so you don't end up with that weird situation where things look uncovered because they're covered in specs you're not currently running).</li>
</ul>

<hr />

Most times, I want to be able to see coverage for one test really clearly. For the past few weeks, I've been using something like this to accomplish it in my Rails projects:

{% highlight ruby %}
filter = if ENV['COV'] == '*'
  lambda do |source|
    source.filename.start_with? File.join(Rails.root, 'spec/')
  end
else
  paths = ENV['COV'].split(',').map do |rel|
    File.join(Rails.root, rel)
  end
  lambda do |source|
    !paths.include?(source.filename)
  end
end

# Apply
SimpleCov.start do
  add_filter(&filter)
end
{% endhighlight %}

That way, when starting <code>rspec</code> (or <a href="https://github.com/sporkrb/spork">spork</a>, which I <em>highly</em> recommend), I can say what files I want to see coverage for. Another way to accomplish this which may suite you better is to create groups for things specified in COV.

If you're not currently using SimpleCov, try it out!
