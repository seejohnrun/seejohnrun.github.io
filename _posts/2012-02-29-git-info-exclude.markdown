---
layout: post
title: git/info/exclude
tags:
- git
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _wp_old_slug: git-infoexclude
  dsq_thread_id: '594432111'
---
If you re using <code>git</code>, you re sure to know about <code>.gitignore</code> files. They re used for ignoring certain files (or patterns) from git versioning.

This is really useful if you want to ignore byproducts of your code that shouldn't be checked in. Common candidates are <code>build/</code> or <code>dist/</code> directories   but its also very common to see things like <code>coverage/</code> or <code>*.gem</code> in this list.

There is another type of file you'll commonly want to ignore though, and these files tend to be environment-specific. Some examples are:
<ul>
	<li><code>vim</code> swap files, <code>*.swo</code> and <code>*.swp</code></li>
	<li><code>emacs</code> swap files <code>~*</code> or <code>.#*</code></li>
	<li>files like <code>nbproject.xml</code> for Netbeans, or equivelant for other environments</li>
</ul>
We don't want these in <code>.gitignore</code>, since they are not specific to development with this <em>project</em>, but rather with your specific environment. They shouldn't crowd up<code>.gitignore</code> for people that don't have those byproducts in their environment.

Luckily, there's another file - <code>.git/info/exclude</code> for these types of patterns / files. It works very similarly, but doesn't get checked in. Use it for any byproducts your environment leaves behind that have nothing to do with your project or its build process.
