---
layout: post
title: Io Namespacing
tags:
- Code
- io
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
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '647928916'
  _yoast_wpseo_linkdex: '0'
---
Namespacing in Io is just like building any other object, but the loader doesn't make it entirely easy to split multiple objects under a namespace into separate files.

In a library I'm writing I wanted something like this, so I created an object called Library, which looks like

```
Library := Object clone do(

  loadPath := nil
  setLoadPath := method(path,
    loadPath = path
    self
  )

  forward := method(
    name := call message name
    path := Path with(loadPath, name .. ".io") asSymbol
    if(File with(path) exists,
      Lobby doFile(path),
      resend
    )
  )

)
```

Then you can have parts of a namespace auto-load by setting them up with the loader:
`HTTP := Library clone setLoadPath("lib/iou/http")`
Io is pretty amazing, having a really good time with the projects I'm working on still.
