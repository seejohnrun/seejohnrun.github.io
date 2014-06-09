---
layout: post
title: Open Source at Patch
published: true
all_set: true
tags:
- ice_cube
- open source
- patch
- Thoughts
---

Back in August, I flew down to Austin to speak at the <a href="http://www.lonestarrubyconf.com/">Lone Star Ruby Conference</a> about a Ruby library I wrote for handling recurring dates (you can find my slides at the bottom of <a href="http://seejohnrun.github.com/ice_cube">this page</a>).

Imagine you have a date rule like  The second and last fridays of every month . This is going to make some really messy slow code. You shouldn t have to solve this problem. In IceCube, the code would look like:

``` ruby
rule = Rule.monthly.day_of_week(:friday => [2, -1])
```

People are using this for all kinds of cool projects, from event calendars to prescription scheduling systems. The project is at a point now where I m regularly getting pull requests from people for new features that they want to add, and its really exciting to make something and have it be so successful - despite its terrible name, and the fact that its free :)

This whole project started because of how open my employer, <a href="http://patch.com/">Patch.com</a> is about open sourcing things that aren t  trade secrets . Seeing how well it went keeps me looking for things that we can do to help the development community. More companies should work like this. Its a great recruiting tool, costs you nothing, and helps you find issues that may otherwise cost you a bunch of money when the software breaks later on.

Some notable projects (a small subset) from the Patch idea factory:

<ul>
	<li><a href="https://github.com/outoftime/sunspot">sunspot</a> - <em>Solr-powered search</em></li>
	<li><a href="https://github.com/aub/record_filter">record_filter</a> - <em>ActiveRecord query API</em></li>
	<li><a href="https://github.com/oggy/template_streaming">template_streaming</a> - <em>Progressive Rendering for Templates</em></li>
	<li><a href="https://github.com/oggy/looksee">looksee</a> - <em>Examine lookup path of any Ruby object</em></li>
	<li><a href="https://github.com/seejohnrun/ice_cube">ice_cube</a> - <em>Date recurrence in Ruby</em></li>
	<li><a href="https://github.com/adamh/html_namespacing">html_namespacing</a> - <em>Automatically namespace HTML</em></li>
	<li><a href="https://github.com/outoftime/eager_record">eager_record</a> - <em>For preloading associations</em></li>
	<li><a href="https://github.com/outoftime/clickistrano">clickistrano</a> - <em>Simple sinatra app for one-click deploys</em></li>
	<li><a href="https://github.com/outoftime/rake_server">rake_server</a> - <em>Client/server for running rake tasks</em></li>
	<li><a href="https://github.com/seejohnrun/easy_translate">easy_translate</a> - <em>Google Translate API gem</em></li>
	<li><a href="https://github.com/outoftime/noaa">noaa</a> - <em>National Weather Service gem</em></li>
</ul>
