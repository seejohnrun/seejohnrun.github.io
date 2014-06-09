---
layout: post
title: UUIDs and Rails find_in_batches
tags:
- Code
- rails
- ruby
- uuid
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '416957679'
---
<a href="http://en.wikipedia.org/wiki/Universally_unique_identifier">UUIDs</a> (Universally unique identifiers) are really neat as IDs, and they allow you to have the ID of a model before it is even saved and guarantee that it won t be fail insertion due to the ID being taken already. They re also a full class type in <a href="http://www.postgresql.org/docs/8.3/static/datatype-uuid.html">PostgreSQL</a> which is even more badass because it will handle the storage part, meaning you don t have the drag on performance that would come along if you had just placed the UUID in a varchar (or equivelent).

When you try to use UUIDs with Rails, things fall apart with
`#find_in_batches` because its implementation abuses value comparisons
to get a performance benefit when paging through results (<a
href="http://apidock.com/rails/ActiveRecord/Batches/find_in_batches">source</a>).
We started using UUIDs on a few models, so I wrote a new version of
`#find_in_batches` that can work with either type of ID (but does not support the <code>:start</code> option).

This also fixes `#find_each` because `#find_each` uses `#find_in_batches` under the covers.

I figured it d be useful to someone eventually, so here s the code:

---

in `lib/clean_find_in_batches.rb`

{% highlight ruby %}
module CleanFindInBatches

  def self.included(base)
    base.class_eval do
      alias :old_find_in_batches :find_in_batches
      alias :find_in_batches :replacement_find_in_batches
    end
  end

  # Override due to implementation of regular find_in_batches
  # conflicting using UUIDs
  def replacement_find_in_batches(options = {}, &block)
    relation = self
    return old_find_in_batches(options, &block) if relation.primary_key.is_a?(Arel::Attributes::Integer)
    # Throw errors like the real thing
    if (finder_options = options.except(:batch_size)).present?
      raise "You can't specify an order, it's forced to be #{batch_order}" if options[:order].present?
      raise "You can't specify a limit, it's forced to be the batch_size" if options[:limit].present?
      raise 'You can\'t specify start, it\'s forced to be 0 because the ID is a string' if options.delete(:start)
      relation = apply_finder_options(finder_options)
    end
    # Compute the batch size
    batch_size = options.delete(:batch_size) || 1000
    offset = 0
    # Get the relation and keep going over it until there's nothing left
    relation = relation.except(:order).order(batch_order).limit(batch_size)
    while (results = relation.offset(offset).limit(batch_size).all).any?
      block.call results
      offset += batch_size
    end
    nil
  end

end
{% endhighlight %}

and in `config/initializers/clean_find_in_batches.rb`

{% highlight ruby %}
ActiveRecord::Batches.send(:include, CleanFindInBatches)
{% endhighlight %}
