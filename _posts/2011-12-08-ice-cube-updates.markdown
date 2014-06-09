---
layout: post
title: IceCube Updates
tags:
- Code
- ice_cube
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '498382318'
---
Over the past few days, I've wrapped up a new release of <a href="http://github.com/seejohnrun/ice_cube">IceCube</a>, and I wanted to share some of the changes and optimizations that came out of it.

One really exciting byproduct of the transition is that it allows for inline computation of occurrences for a schedule:

{% highlight ruby %}
schedule = IceCube::Schedule.new
schedule.add_recurrence_rule IceCube::Rule.weekly
schedule.each_occurrence do |time|
  puts "oh yeah boyeee - it happens on #{time}"
end
{% endhighlight %}

This is all possible because of another change.. Instead of having <code>Rule</code>s and<code>Validation</code>s as separate concepts, they've been merged into one, in addition to making things like <code>add_recurrence_rule</code> just add a <code>SingleRecurrenceRule</code>. This has simplified the code a lot, and the previously-existing spec suite fully passes.

These changes are great for the library, and I m excited to see them head into<code>master</code>. Give it a shot and see how it goes!

Some introduction slides: <a href="http://seejohncode.com/ice_cube/static/ice_cube_ruby_nyc.pdf">here</a>
