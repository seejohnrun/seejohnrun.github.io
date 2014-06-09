---
layout: post
title: Remote Pair Programming with GNU Screen
tags:
- pair
- programming
- screen
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _yoast_wpseo_focuskw: ''
  _yoast_wpseo_title: ''
  _yoast_wpseo_metadesc: ''
  _yoast_wpseo_metakeywords: ''
  _yoast_wpseo_meta-robots-noindex: '0'
  _yoast_wpseo_meta-robots-nofollow: '0'
  _yoast_wpseo_meta-robots-adv: none
  _yoast_wpseo_sitemap-include: ! '-'
  _yoast_wpseo_sitemap-prio: ! '-'
  _yoast_wpseo_canonical: ''
  _yoast_wpseo_redirect: ''
  _yoast_wpseo_opengraph-description: ''
  _yoast_wpseo_google-plus-description: ''
  dsq_thread_id: '638164235'
  _yoast_wpseo_linkdex: '0'
---
Pair programing from a distance can be hard, and up until today my best answer for that was a high-bandwidth, laggy VNC connection.

Today we tried something a bit different.  My programming partner logged into my computer over SSH and then shared a GNU screen session I was using.  It was instantaneous on both ends, even with Skype running alongside it.  More-so, we could each switch between `screen` windows independently so we could look at the things we wanted to, when we wanted to.

To get this set up, open a screen session locally and then type ^a, followed by ":multiuser on".

The other person can log in as the same user over SSH and just run `screen -x` to attach to your session.

Amazingly simple and insanely fast.

---

UPDATE: The link above has been removed - you can find it on the internet archive at <a href="http://web.archive.org/web/20110722182545/http://ryanwilliams.org/2010/Oct/09/gnu-screen-256-colours-mac-os-x">http://web.archive.org/web/20110722182545/http://ryanwilliams.org/2010/Oct/09/gnu-screen-256-colours-mac-os-x</a>
