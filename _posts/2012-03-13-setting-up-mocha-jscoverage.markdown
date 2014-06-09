---
layout: post
title: Setting up Mocha & JSCoverage
tags:
- Code
- javascript
- jscoverage
- mocha
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '610046131'
  _yoast_wpseo_linkdex: '0'
---
Since publishing my article on <a title="Javascript Testing with Mocha" href="/2012/01/13/javascript-testing-with-mocha/">Javascript Testing with Mocha</a> and follow-up on using <a title="JS Coverage" href="/2012/02/25/jscoverage/">JSCoverage</a>, I've had some people asking questions about how to get it all set up.  I'm going to go through a brief guide on how to take a project with tests in Mocha, and get coverage running on it.

Here's a motivational sample of the output we'll be getting to:

[![Enlarge]({{ site.url }}/static/jscoverage-sshot-small.png)]({{ site.url }}/static/jscoverage-sshot.png)

<h2>Step 1: Installing JSCoverage and Mocha</h2>
If you're on a machine with <a href="http://mxcl.github.com/homebrew/">Homebrew</a> installed, getting this set up will be as easy as:
<pre>$ brew install jscoverage</pre>
There's also an apt package for you lucky linux folks:
<pre>$ sudo apt-get install jscoverage</pre>
If you don't have either of these, you'll be building it yourself.  Which is really easy too:
<pre>wget http://siliconforks.com/jscoverage/download/jscoverage-0.5.tar.bz2
tar xvfj jscoverage-0.5.tar.bz2
cd jscoverage-0.5
./configure
make
make install</pre>
It will be installed into /usr/local and you should be all set.  Give `jscoverage` a shot and you should see its default output.

There is an <a href="https://github.com/visionmedia/node-jscoverage">npm package</a> by the creator of mocha, but I haven't given it a go yet.

You'll need a global version of mocha installed for the Makefile at the end, and for that you can roll with:
<pre>$ npm install -g mocha</pre>
<h2>Step 2: Loading JSCoverage in Tests</h2>
Now that we have jscoverage installed, we need to call into it from our tests.  Because of the way JSCoverage has to work, we first generate a folder equivalent to our `lib` folder but jscoverag'ed:
<pre>$ jscoverage lib lib-cov</pre>
On newer version of jscoverage, the library also can do highlight - but since that will mess up the test output, we'll want to turn it off.  To run jscoverage without highlighting we go instead for:
<pre>jscoverage --no-highlight lib lib-cov</pre>
Once we have this, our tests are still loading the copy in `lib`.  We need to go into each of our tests files, and if a certain environment variable is present, use `lib-cov` instead.  I like to do this by defining a variable at the top of my test and then basing other loads off of that:

``` js
var libpath = process.env['YOUR_LIBRARY_NAME_COV'] ? '../lib-cov' : '../lib';
var something = require(libpath + '/something');
var other = require(libpath + '/other');
```

The name of the environment variable should be something unique.  The reason for a unique name is that if you using something like "COV" as the environment variable name, you'll end up also loading jscoverage'ed versions of other libraries you have as dependencies, and they'll cloud up your coverage reports.

Now we can run the tests with:
<pre>YOUR_LIBRARY_NAME_COV=1 mocha -R html-cov &gt; coverage.html</pre>
And the coverage.html file will contain our coverage report
<h2>Step 3: Using a Makefile</h2>
All of this typing will get annoying pretty fast, and for that I use a Makefile.  Here's what it should look like:

```
test:
 npm test

coverage:
 jscoverage --no-highlight lib lib-cov
 YOUR_LIBRARY_NAME_COV=1 mocha -R html-cov &gt; coverage.html
 rm -rf lib-cov

.PHONY: test
```

With this in place, running `make` or `make test` will run your tests, and running `make coverage` will generate your coverage report!
<h2>A Few Notes</h2>
I'd advise adding `coverage.html` and `lib-cov` to your `.gitignore` file, so that they don't get versioned.

Also - "html-cov" will not show you test failures, so make sure you run `make test` before pushing out new versions of anything.
<h2><span style="color: #333399;">Example</span></h2>
<span style="color: #333399;">For an example of all of this in action, check out <a href="https://github.com/seejohnrun/htmlcov-example"><span style="color: #333399;">seejohnrun/htmlcov-example</span></a> on GitHub!</span>

&nbsp;
