---
layout: post
title: Using ENUMs with Rails
tags:
- Code
- enum
- rails
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '351169875'
---
There are a lot of times in our applications where a field in our database can only have one of a few values. The most common are:
<ol>
	<li>Something that <a href="https://github.com/rubyist/aasm">acts like a state machine</a> - often used for an object that goes through several states - like <code>pending -> under_review -> accepted</code>.</li>
	<li>The <code>type</code> column in <a href="http://code.alexreisner.com/articles/single-table-inheritance-in-rails.html">single table inheritance</a></li>
	<li>The <code>_type</code> column(s) in <a href="http://wiki.rubyonrails.org/howtos/db-relationships/polymorphic">polymorphic relationships</a></li>
</ol>
The most commontly used type for these columns is <code>varchar</code>, and a lot of projects I've seen don't even make use of <code>limit</code>s. It would be nice if we could store them in a type that didn't require so much performance and storage overhead.

Most major databases have support for enumerable types (read: <a href="http://www.postgresql.org/docs/8.3/static/functions-enum.html">PostgreSQL</a>,<a href="http://dev.mysql.com/doc/refman/5.0/en/enum.html">MySQL</a>), and at <a href="http://patch.com/">Patch</a> we've switched out a lot of our columns like the above for MySQL ENUMs. The best part from the Rails side, is that you don't have to change<em>anything</em> at all in your code to swap a varchar out for an ENUM. When we made the switch, we saw a nice boost in performance (numbers coming soon) - particularly on joins that involved those columns.

<strong>Complications</strong>
<ul>
	<li>It may make your life a bit harder if you're switching databases, but worst case you can just not run the migration in databases that don't support it.</li>
	<li>If you use ENUMs in a field, when its used to represent a new <code>type</code>, or mixed into new models - you need to modify the ENUM in a migration to contain the new value. You need to be particularly careful in your test environment, since schema.rb will load these ENUMs as strings and thus they won't fail on trying to insert a value not in the ENUM.</li>
</ul>
<div><strong>How?</strong></div>
This sample migration should give you a good idea on how to approach the move in MySQL. Note that MySQL blocks while running <code>ALTER</code> statements, so I combine multiple changes into single calls.

{% highlight ruby %}
class MoveSomeColumnsToEnum < ActiveRecord::Migration

  # a map of what you want to change
  MOVES = { :workflows => [:status, :other_status], :comments => [:commentable_type] }

  # move everything to enums with the proper DISTINCTs
  def self.up
    MOVES.each do |table, columns|
      change_list = columns.map do |column|
        result = execute "select distinct(#{column}) from #{table};"
        values = []; result.each { |r| values << r[0] }
        values.map { |v| "'#{v}'" }.join(',')
      end
      change_table table do |table|
        columns.each_with_index do |column, idx|
          table.change column, "ENUM (#{change_list[idx]})"
        end
      end
    end
  end

  # move back to strings
  def self.down
    MOVES.each do |table, columns|
      change_table table do |table|
        columns.each do |column|
          table.change column, :string
        end
      end
    end
  end

end
{% endhighlight %}
