---
layout: post
title: Ruby: Breware Return in Blocks
published: true
tags:
- Ruby
- Code
---

Blocks are obviously very common in Ruby, and sometimes we use them to surround
a certain piece of logic.  A good example is `transaction` in ActiveRecord:

``` ruby
Season.transaction do
  update_attributes! name: 'fall'
  trees.update_all leaf_count: 0
end
```

Very nice to look at!  A transaction is opened, then the block is run, then
when the block completes, the transaction is closed.

One thing I wanted to point out that library developers need to watch out for is
how the block interacts with `return`, which could potentially lead to
undesiarable behavior. Imagine you had a `reconfigure` method like this, which
breaks a connection while it reconfigures and then restarts when done:

``` ruby
# definition of block method
def reconfigure
  disconnect
  yield configuration # reconfigure
  reconnect
end
```

Dandy, but imagine it was used like this by a developer:

``` ruby
def start
  reconfigure do |c|
    c.user_name = 'seejohnrun'
    return if c.valid?

    # do something to make this valid
  end
end
```

The problem is that due to the way that the `reconfigure` function is written,
the `return` will actually prevent the rest of `reconfigure` from running, and
`reconnect` will never be called as the developer expected.

The way to fix this and keep it consistent, is with `ensure`, like so:

``` ruby
# definition of block method
def reconfigure
  disconnect
  yield configuration # reconfigure
ensure
  reconnect
end
```

Just something to keep in mind!

---

Back to the original `transaction` example for reference, check out the
implementation of `within_new_transaction` (used by `transaction`):
http://apidock.com/rails/v4.0.2/ActiveRecord/ConnectionAdapters/DatabaseStatements/within_new_transaction
