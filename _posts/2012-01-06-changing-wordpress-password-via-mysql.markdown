---
layout: post
title: Changing Wordpress Password via MySQL
tags:
- database
- mysql
- password
- quick tips
- wordpress
status: publish
type: post
published: true
meta:
  skip_rss_flag: 'true'
  _syntaxhighlighter_encoded: '1'
  _edit_last: '1'
  _yoast_wpseo_linkdex: '41'
  _yoast_wpseo_focuskw: changing wordpress password
  _yoast_wpseo_title: Changing Wordpress Password via Database
  _yoast_wpseo_metadesc: Changing your wordpress password via the Database if you
    don't have access to the web reset functionality is easy
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
  dsq_thread_id: '1011876720'
---
Changing your Wordpress password is easy, but if you have `mail()` turned off, you can't send yourself a new password.

If you have access to the database, it's pretty easy to reset still because the passwords are just stored as MD5 passwords.

Connect to your database and issue something like:

{% highlight sql %}
update wp_users set user_pass = MD5('new_password') where user_login = 'your_username';
{% endhighlight %}
