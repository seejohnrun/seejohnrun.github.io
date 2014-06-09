---
layout: post
title: launchd with lunchy
tags:
- homebrew
- launchctl
- launchd
- lunchy
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '611186416'
  _yoast_wpseo_linkdex: '0'
---
If you use a mac, then you should be using <a href="http://mxcl.github.com/homebrew/">Homebrew</a> to manage your packages. If you use Homebrew, you ll notice that a lot of the services that you install will be controlled via <a href="http://en.wikipedia.org/wiki/Launchd">launchd</a>, which is a Mac OS framework for managing (starting / stopping) services.

What they recommend is to put load these scripts with something like <code>launchctl load</code>, which will keep the service up, and restart it each time your machine restarts.

That s kind of annoying, since most of the time you don't need Postgres, mongodb, and Redis running in the background while you check your email.

You can use <code>launchctl</code> directly to stop and start <code>launchd</code> services, but its kind of annoying, since you need to specify the full path of the <code>plist</code> file you want to control. I prefer to use a little Ruby gem called <a href="http://rubygems.org/gems/lunchy">lunchy</a> on my machines.

Its a nice wrapper around <code>launchctl</code> and the basic usage is:
<ul>
	<li><code>lunchy status</code> will show you what services are running</li>
	<li><code>lunchy [stop/start] &lt;name&gt;</code> will start and stop a service by name</li>
</ul>
The cool part about <code>lunchy [stop/start]</code> is that you don't need to specify the full path, but can just specify a substring of the path. If only one is found, it will work with that service. So, instead of:

{% highlight bash %}
$ launchctl load /Users/jcrepezzi/Library/LaunchAgents/org.postgresql.postgres.plist
{% endhighlight %}

You can use:

{% highlight bash %}
$ lunchy start postgres
{% endhighlight %}

Also, when using <code>lunchy</code>, I prefer to never run the <code>launchctl -w load</code> (which will make things restart on system load) anything, but only do the <code>cp</code> of the Homebrew instructions. If you ve already got things set to <code>-w</code>, you can set them back with<code>launchctl -w unload</code> on each plist in <code>~/Library/LaunchAgents</code>.
