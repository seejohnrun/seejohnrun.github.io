---
layout: post
title: Google Translate and Freemium
tags:
- easy_translate
- freemium
- google
- Thoughts
- translate
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '525184613'
---
For about two years, I ve maintained a Ruby library called <a href="https://github.com/seejohnrun/easy_translate">EasyTranslate</a> for working with the Google Translate API. Google Translate has been (like other Google APIs) free to use withing a certain range.

Recently, they ve deprecated (read: completely turned off) access to v1, due to  substantial economic burden caused by extensive abuse . That's really a shame. The larger shame is that there is <em>no</em> free usage tier for v2 of the API. Even to santiy check my API client (that I don't even use anymore), I need to pay.

This reminds me of <a href="http://www.tylernichols.com/web-development/i-am-done-with-the-freemium-business-model">an article</a> I read yesterday on HackerNews (and linked by <a href="http://codefury.net/">Kenny Katzgrau</a>) about how one developer is fed up with freemium as a model due to lack of conversion from free to paying customers. I don't really agree with that article for a few reasons:
<ul>
	<li>The timeframe of his freemium strategy was too short to build the devoted user base that freemium depends upon</li>
	<li>The product he was working with is (however well done it may be) not something that users will build loyalty to, but rather a seasonal site of a sort that most people would reasonably expect to find for free</li>
	<li>If you expect a high number of people to pay, just charge for the service and accept the lower virality along with making the bar of entry higher. I d argue if he hadn't had a freemium model in place at all, his overally hit count and paying customer count would have been even lower.</li>
</ul>
But the article does frame a discussion for deeper problems with freemium <em>APIs</em> like Google s. Automated abuse can quickly ruin a great service, but I have to think there must be a middle ground between non-keyed API access (as before), and no free-usage tier. What do you think?

---

__NOTE:__ Last night I largely reorganized and re-spec ed
`easy_translate` to work solely off of the examples in the API docs.  Its released now as
<a href="https://rubygems.org/gems/easy_translate/versions/0.3.0">v0.3.0</a>.
