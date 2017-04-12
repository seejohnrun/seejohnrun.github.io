---
layout: post
title: Rails find_by_* bug
published: true
tags:
- Code
- Ruby
- sql
---

Rails provides a lot of methods to make our lives easier.  Possibly one of the
most love/hate relationships (at least for programmers that have touched any
other language than Ruby) is with `ActiveRecord::Base#find_by_*`.

These dynamic finders are essentially a shorthand for something like:
`where(email: email_address).first` that are defined based on the columns that
exist in your database.  If you're using `ActiveRecord`, you get these for free.

And methods like this make your life much easier.  For example, when using these
methods you probably don't have to think much about issues like SQL
injection (although always have that thought in your mind).  You'll be
automatically using a prepared statement which means even in the case of something
like this:

``` ruby
params = {:email => "' OR 1='1"} # maybe the most classic
User.find_by_email(params[:email])
```

you'll be covered.

On the downside, along with the niceties that Rails provides, it also provides
a lot of abstractions automatically that you may not know exist or may not know
are coming into play.

By default, `params` for example can be sent as `JSON`.  You might think that's
a whatever situation but that means that I can pass other structures to an
endpoint where most Rails developers will assume that params contains a flat
Hash of strings.  Consider instead of:

`curl -XPOST -d'{"value": "hello"}' -H'Content-Type: application/json' url`

I wrote:

`curl -XPOST -d'{"value": 1}' -H'Content-Type: application/json' url`

Now I've successfully passed an `Integer` instead of a `String`. Eek!
Most of the time this results in confusing `NoMethodError`s which are
pretty harmless, but imagine that I did this instead:

`curl -XPOST -d'{"value": []}' -H'Content-Type: application/json' url`

Now I've passed an array somewhere the application is expecting a string.
In the case of a bare call to a dynamic finder, __what happens?__

``` ruby
User.find_by_email(['john1', 'john2'])

# SELECT  "users".* FROM "users" WHERE "users"."email" IN ('john1', 'john2') LIMIT 1
```

Uh oh!  Also on the surface seems pretty benign - __BUT__, I can (without being affected
by normal rate limits) perform:

* Denial of service against the application database, or
* Scan large swaths of emails in a single operation. Consider contrived
  example: `User.find_by_email_and_password(params[:email], params[:password])`
  which will return the first user with the password in the given email set

You may be saying: "I use `strong_parameters`!"  While good (keep it up!), most developers
are using `strong_parameters` where protecting fields that will be used to update
a model, and not sanitizing fields in controller actions.  Most rails apps
include things like `Model.find_by_id(params[:id])` which does _not_ run through
`strong_parameters`.

Okay, one more:

`curl -XPOST -d'{"value": {"other": 1}}' -H'Content-Type: application/json' url`

The same dynamic finder run against the above will take a `Hash` in when the application
is expecting a `String`.  What does rails do in that case? You might be surprised!

```
SQLite3::SQLException: no such column: email.other:
SELECT  "users".* FROM "users" WHERE "email"."other" = '1' LIMIT 1
```

Now we've done it.  While we haven't broken out of the prepared statement world
and can't perform a real injection here - this should be pretty concerning
for two edge cases.

* A table with a column named the same as the table (pluralized model name):
  - `params = {users: {any_column: 'any_value'} }; User.find_by_users(params)`
* A table with a column named the same as a join:
  - `params = {other: {any_column: 'any_value'}}; User.joins(:other).where(params)`

My point isn't as much that these _would_ happen, as that this is something you
wouldn't expect or know about.  It relies on the fact that Rails is being cutesy
with multi-use methods.

This last issue has actually been brought up on the `rubyonrails-security` Google group
before as an advisory, but it was stated that:

> Unfortunately it is not possible to implement a reliable fix for this risk without breaking applications which rely on related functionality to build their queries.  Future releases of Rails will be able to address this, however that functionality will need to be built in the open and have a long beta period to flush out unanticipated edge cases.

I'd love to look more into why that's the case - but assuming it is, everyone
should know that these issues are present even in modern Rails.  So how do we avoid them?

The most straightforward protection you can offer yourself is to ensure that your params are of
the type that you expect them to be.  For the most part, that means `to_s` as they come in.

``` ruby
User.find_by_email(params[:email].to_s)
```

In conclusion, we get a lot from Rails and frameworks of this type (and I'm really,
really thankful for that as I've pretty much built my career on these things),
but sometimes abstractions that are too overloaded can be unintentionally dangerous.

Watch out for these issues, know what's happening underneath you, and good luck out there!
