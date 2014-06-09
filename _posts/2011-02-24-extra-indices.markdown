---
layout: post
title: Detecting Extra Indices in Your Database
tags:
- Code
- database
- indices
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '351227396'
---
Having superfluous indices can slow down insertion time in your database. Here's a quick script to point out indices that are duplicates or subsets so you can decide if you want them.

``` ruby
require 'rubygems'
require 'active_record'

# Look through each table and look for indexes that are subsets
# of each other.

ActiveRecord::Base.establish_connection(:database => 'app_development', :adapter => 'mysql')
ActiveRecord::Base.connection.tables.each do |table|
  # go through each index
  indexes = ActiveRecord::Base.connection.indexes(table)
  # look through all the indexes and look for subsets
  indexes.each do |index|
    indexes.each do |iindex|
      next if index.name == iindex.name # skip ourself
      if index.columns.slice(0, iindex.columns.count) == iindex.columns
        puts "\e[031m`#{table}`.#{iindex.name}\e[0m is a left subset of \e[032m`#{table}`.#{index.name}\e[0m !!!"
      end
    end
  end
end
```
