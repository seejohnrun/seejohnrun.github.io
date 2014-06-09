---
layout: post
title: CodeIgniter / PHP Custom GUID Generation
all_set: true
published: true
tags:
- Code
- codeigniter
- guid
- php
---

Today I was working with CodeIgniter, and found myself wanting to make GUID
(Globally Unique Identifiers) for a certain database table upon insert. I wanted
to make the length configurable on the fly and not use any extra DB
functionality. I also wanted to ensure that there would never be a collision as
long as there were still available keys in the namespace.

I came up with the following code:

``` php
<?php
function newTopic() {
  $original = $this->db->db_debug;
  $this->db->db_debug = false;
  do {
    //create it
    $tgid = randomString(config_item('topic_key_length'));
    $this->db->set('tgid', $tgid);
    $this->db->set('date_added', 'NOW()', false);
    $this->db->set('removed', 0);
  } while (!$this->db->insert('topics'));
  $this->db->db_debug = $original;
  return $this->db->insert_id();
}
```

Which works great! The only part of this that is a little bit of a hack is the
db_debug toggling, which turns off code igniter db errors for a second so that I
can avoid duplicate key errors.

Enjoy!!!
