---
layout: post
title: Using Static Context in CodeIgniter Models
tags:
- Code
- codeigniter
- model
- php
- static
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '352010395'
  _yoast_wpseo_focuskw: ''
  _yoast_wpseo_linkdex: '0'
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_metadesc: ''
  _yoast_wpseo_title: ''
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
---
I wrote a post a few days ago about a new change in CodeIgniter Reactor, which allows people to <a href="http://seejohncode.com/2011/02/12/codeigniter-model-instances">clean up their models</a>. Today I m going to go a bit further and talk about how we can use static context to really make our models awesome. Lets look at the same example as in the last post, but implemented a little differently:

``` php
<?php
class User extends CI_Model {
  private static $db;
  function __construct() {
    parent::__construct();
    self::$db = &amp;get_instance()->db;
  }
  static function get_by_email_address($email) {
    return self::$db->where('email', $email)->get('users')->result('User');
  }
  function comments() {
    $this->load->model('comment');
    return $this->db->where('user_id', $this->id)->get('comments')->result('Comment');
  }
}
```

``` php
<?php
class Comment extends CI_Model {
  function __construct() {
    parent::__construct();
  }
}
```

It's really nice because now the methods that should be static, are kept totally separate from the instance methods. This makes everything super clean, and we're able to abuse CodeIgniter's creation of a single instance (created via <code>$this->load</code>) to get the equivelant of a static initializer block (to do things like setting the value of the convenience <code>self::$db</code> variable). Check out how its used:

``` php
<?php
$this->load->model('user');
$user = User::get_by_email_address('john.crepezzi@gmail.com');
// print all of the comments by the user
echo &quot;<h2>Comments by $user->name</h2>&quot;;
foreach ($user->comments() as $comment) {
  echo &quot;<p>$comment->body</p>&quot;;
}
```

Writing models like this will make your experience working with CI ActiveRecord really positive, and keeping the seperation will make your mind happy and your IDE happy.
