---
layout: post
status: publish
published: true
title: Custom RSpec Contexts
all_set: true
author: john
date: '2013-11-10 15:18:58 -0500'
date_gmt: '2013-11-10 20:18:58 -0500'
---

Sometimes it can be useful to have custom RSpec contexts.  In a recent project,
a library which matches Strings to pick up dates mentioned in the string,
I really wanted to write tests like:

``` ruby
thoughts_on Date.today do
  think 'Tomorrow at noon', Date.tomorrow
  think 'Today is the best', Date.today
  # ... a bunch more of the same
end
```

.. no writing the same `if`'s over and over again

Furthermore, I wanted to do it in a reusable way, so that I wouldn't need to
be defining methods inside of these blocks.  I wanted the tests to just get
across the data that was needed (in this case, the date in question, and the
before & after state for a transformation)

What I ended up learning, is that in RSpec, `context` and `describe` return
their evaluation objects.  So, I were a `Module` and a `def` from what I wanted:

``` ruby
module ThoughtMethods
  attr_accessor :pickup_parser
  def think(phrase, reference)
    parser = pickup_parser
    it "should see #{phrase} as #{reference}" do
      parser.locate(phrase).should == reference
    end
  end
end

def thoughts_on(today, &block)
  example_class = describe "on #{today}"
  example_class.extend ThoughtMethods
  example_class.pickup_parser = Pickup::Parser.new(today)
  example_class.class_eval &block
end
```

It's nice because you still get all of the same output & separation, with none
of the awkward fluff.
