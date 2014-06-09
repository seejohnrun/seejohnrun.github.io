---
layout: post
title: CodeIgniter Model Instances
published: true
all_set: true
tags:
- Code
- codeigniter
- php
---

Hey ya'll! Today I'm going to talk about a seemingly minor change I made to DB_result in
[CodeIgniter Reactor](http://codeigniter.com/news/codeigniter_2.0.0_released/).
This change will allow people to use their Models more intuitivel.

Imagine the really common case where we have a User with many comments.
Before, we d write code like this:

``` php
<?php
class User extends CI_Model {
    function __construct() {
        parent::__construct();
    }
    function get_by_email($email) {
        return $this->db->where('email', $email)->get('users')->row(0);
    }
}
```

``` php
<?php
class Comment extends CI_Model {
    function __construct() {
        parent::__construct();
    }
    function get_by_user_id($user_id) {
        return $this->db->where('user_id', $user_id)->get('comments')->result();
    }
}
```

And then we use it:

``` php
<?php
$this->load->model('comment');
$this->load->model('user');
// get the user and their fancy comments
$user = $this->user->get_by_email('john.crepezzi@gmail.com');
$comments = $this->comment->get_by_user_id($user->id);
```

In this short example it doesn't look too terrible, but one thing that's
particularly not nice about it is that your controller (or view) needed to know
that to get comments for a users, it needed to pass the  id  attribute from the
user.

Now you'll be able to write it like this instead:

``` php
<?php
class User extends CI_Model {
    function __construct() {
        parent::__construct();
    }
    function get_by_email($email) {
        return $this->db->where('email', $email)->get('users')->row(0, 'User');
    }
    function comments() {
        $this->load->model('comment');
        return $this->comment->get_by_user_id($user->id);
    }
}
```

``` php
<?php
class Comment extends CI_Model {
    function __construct() {
        parent::__construct();
    }
    function get_by_user_id($user_id) {
        return $this->db->where('user_id', $user_id)->get('comments')->result('Comment');
    }
}
```

And then using it is super cool and clean:

``` php
<?php
$this->load->model('user');
// get the user and their fancy comments
$user = $this->user->get_by_email('john.crepezzi@gmail.com');
$user->comments();
```

The idea is just that instead of instantiating stdClass objects - we can
instantiate objects of any type in the `result()` or `row()` call. Give it a shot!
