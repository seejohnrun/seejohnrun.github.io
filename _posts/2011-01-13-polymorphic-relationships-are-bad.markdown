---
layout: post
title: Polymorphic Relationships are Bad
published: true
tags:
- Code
- polymorphic
- sql
---

Its really easy for us to get caught in bad practices. One that I find
particularly distressing is rampant use of polymorphic associations (yes,
rails). They provide a magical ability to add mixins to any model and not have
to change anything at the data layer. A typical database table for tracking
changes in ActiveRecord models would look like:

``` sql
create table audits (
  id int(11) primary key auto_increment,
  auditable_type varchar(255),
  auditable_id int(11),
  changes text,
  created_at datetime
);
```

Using two join columns would allow any other table to have audits and track its changes.
There are a few problems with this.

* Its really inefficient to query a join on two columns, especially when one is a varchar
* You break normal form, and sacrifice database consistency
* Since all of the changes are in JSON format in the `changes`  field, there's no efficient way to query them so you lose the ability to ask questions (performantly) like  how many times did the average user change their email address in the past year.

I released a gem recently called
[track_history](https://github.com/seejohnrun/track_history).
It tackles this problem by creating a `*_histories` table for each model you
want to audit and `*_before` and `*_after` fields for each field you need to track.
It also only stores what it needs to store to record changes, instead of making
massive copies of entire records every time.

It does a lot of cool things like defining models for your history objects
automatically on startup, and giving you really easy methods to work with and
query the history of any job. Go check it out, and I hope it inspires you to
consider other places in your app where polymorphics are slowing you down.

The point is, we can still have the _magic_ and development speed, but let s
stop being so lazy with how we structure and query our data layer.
