---
layout: post
title: Mac OS Kernel Panic
tags:
- kernel
- macos
- panic
- Tools
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  dsq_thread_id: '569525807'
---
I have a laptop running snow leopard, and lately I ve been seeing a lot of kernel panics. After some digging, I found Chrome to be the issue, as it wasn t closing processes and ended up having too many open at once.

If you ever have a kernel panic, the logs can be really helpful. Finding them is a bit unconventional, due to Mac OS s  make everything non-standard  approach.

They are in:

<code>ls /Library/Logs/DiagnosticReports/</code>

And labeled with the date they happened. Hope this helps someone!
