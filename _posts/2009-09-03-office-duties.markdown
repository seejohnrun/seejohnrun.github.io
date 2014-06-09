---
layout: post
title: Office Duties
all_set: true
published: true
tags:
- Code
- php
---

By far my favorite part of programming is little scripts that perform functions
that save people time. This convenient PHP script allows for rotation of office
duties on a regular basis. Its quick and dirty, but it does its job well. It
even works with any number of people/duties, they don't need to be one for one.

we start out with the data:

``` php
<?php // data
$people = array('JB', 'Kenny', 'Dan', 'Tar', 'JC');
$duties = array('Trash', 'Dishes', 'Backroom', 'Vacuum', 'Bathroom');
$timezone = 'America/New_York';
```

then, in order to rotate the duties on a weekly basis, we get a rotationary
number. This number is based on the week of the year, which PHP makes it pretty
easy to get.

``` php
<?php // get a rotationary number
date_default_timezone_set($timezone);
$rot = (date('W') % count($people));
```

Shifting these arrays based on the rotational number get us most of the way to what we need:

``` php
<?php
// shift the duties array
for ($i = 0; $i &lt; $rot; $i++) {
  $duties[count($duties) - 1] = array_shift($duties);
}
for ($i = 0; $i &lt; $rot; $i++) {
  $people[count($people) - 1] = array_shift($people);
}
```

We assign the duties into a nice array that associates people with the duties they have to perform:

``` php
<?php
$i = $rot;
// the same person shouldn't always get two duties
foreach ($duties as $duty) {
  $work[$people[$i]][] = $duty; //give person duty
  $i = ++$i % count($people); //pick what person gets the next duty
}
```

and then sort by names to make the list easier to read:

``` php
<?php
ksort($work);
```

The display code is extremely straightforward. I customized mine a bit more, but to give you the general idea:

``` html
<html>
  <head>
    <title>office duties</title>
  </head>
  <body>
    <h2>office duties</h2>
    <?php foreach ($work as $person=>$duties): ?>
      <strong><?php echo $person; ?></strong>:
      <?php echo implode($duties, ', '); ?>
      <br/>
    <?php endforeach; ?>
    <hr>
    <em>Dates rotate each Monday</em>
  </body>
</html>
```
