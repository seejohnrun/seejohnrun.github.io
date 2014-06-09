---
layout: post
published: true
all_set: true
title: CodeIgniter Form Validation RegEx
tags:
- Code
- codeigniter
- form
- php
- validation
---

I've been using the
[CodeIgniter form_validation library](http://codeigniter.com/user_guide/libraries/form_validation.html)
not to be confused with
[this older](http://codeigniter.com/user_guide/libraries/validation.html) (link broken) one.

There are some great additions in this new library that make the syntax of form
validation not clutter your controllers. The one thing I wanted that the library
didn't come with, was a way to easily test regular expressions against fields
without cluttering the controller, or ruining my internationalization features.

Ideally, what we're aiming for is:

``` php
<?php
$register[] = array(
  'field' => 'username',
  'label' => 'Username',
  'rules' => 'required|validate[username]'
);
```

The hope is that we don't need to write anything extra in our controller, and we
can use this from anywhere. I started with a function, that I thought did pretty
well:

``` php
<?php
function _validate($value, $type) {
  $this->load->config('validation_regex');
  $this->form_validation->set_message('matches', '%s gotsta match %s');
  // validation succeeded
  if (preg_match($this->config->item('regex_' . $type), $value)) {
    return true;
  }
  // validation failed
  $this->load->language('invalid');
  $this->form_validation->set_message('_validate', $this->lang->line('invalid_' . $type));
  return false;
}
```

This was great, it allows easy configuration, and all you need is a line in your $config:

``` php
<?php
$config['regex_username'] = '/^[a-zA-Z0-9]{6,15}$/';
```

and a line in your `$lang`:

``` php
<?php
$lang['invalid_username'] = "Username must be alpha-numeric, between 6-15 characters";
```

The last step was to move this function a central location so that I could use
it in multiple controllers, and not have to use the `callback_`
functionality (thus repeating code).

I ended up extending the form\_validation library, like so (`application/libraries/MY_Form_validation.php`):

``` php
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Form_validation extends CI_Form_validation {
  function validate($value, $type) {
    $CI = &get_instance();
    $CI->load->config('validation_regex');
    $CI->form_validation->set_message('matches', '%s gotsta match %s');
    // validation succeeded
    if (preg_match($CI->config->item('regex_' . $type), $value)) {
      return true;
    }
    //validation failed
    $CI->load->language('invalid');
    $CI->form_validation->set_message('validate', $CI->lang->line('invalid_' . $type));
    return false;
  }
}
```
