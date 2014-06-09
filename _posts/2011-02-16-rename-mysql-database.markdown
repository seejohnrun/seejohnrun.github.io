---
layout: post
title: Renaming a MySQL Database
all_set: true
published: true
tags:
- Code
- database
- mysql
- rename
- ruby
---

For integrity reasons, MySQL no longer has a `RENAME DATABASE`
command. I ran into an issue in my development environment recently where I
needed to rename a database. It wasn't particularly complex, but was a massive
amount of data (~20G). Reading around a bit, a lot of people recommend dumping
your data out using `mysqldump` and then re-importing into a new
database. That can be really slow on large databases, but if you're using InnoDB
you have another option. `RENAME TABLE` allows you to specify
database names, so you can do things like:

``` sql
rename table old_db.table to new_db.table;
```

and the table and all of its content will move (without a slow copy).

---

Given you don't have a bunch of extra triggers and things set up, this Ruby snippet will move everything for you:

``` ruby
require 'rubygems'
require 'active_record'

OLD_DB = 'old_db_name'
NEW_DB = 'new_db_name'

ActiveRecord::Base.establish_connection(:adapter => 'mysql2', :database => OLD_DB)
ActiveRecord::Base.connection.tables.each do |table|
  ActiveRecord::Base.connection.execute "RENAME TABLE #{OLD_DB}.#{table} TO #{NEW_DB}.#{table};"
end
```
