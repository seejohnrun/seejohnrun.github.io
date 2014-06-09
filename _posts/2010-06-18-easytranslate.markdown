---
layout: post
title: EasyTranslate v0.1.1
published: true
all_set: true
tags:
- Code
- easy_translate
- ruby
---

EasyTranslate is a Ruby binding for the Google translate/detect APIs (<a href="http://code.google.com/apis/ajaxlanguage/">Documentation</a>).
Its different than other libraries that do the same for a few reasons:

* Only Ruby binding to have support for Bulk Translations
* Only Ruby binding to offer POST support for long translations
* Supports every option in the API, especially API keys and user_ip, which most Ruby bindings skip over.
* Has an extremely clean syntax

``` ruby
# woah, really?
EasyTranslate.translate('Hello, world', :to => :spanish) => "Hola, mundo"

# what about batch translation?
EasyTranslate.translate(['Hello', 'Goodbye'], :to => :spanish) => ["Hola", "Despedida"]

# what if you're even crazier?
EasyTranslate.translate(['Hello', 'Goodbye'], :to => [:es, :it]) => [['Hola', 'Despedida'], ['Ciao', 'Addio']]

# translate something into every language in Google Translate
# WITH A SINGLE CALL TO THE API
EasyTranslate.translate('hello', :to => EasyTranslate.LANGUAGES.keys)
```

The whole thing is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License), so get out
there, make something cool, and let me know how it turns out!

``` bash
$ gem install easy_translate
```

[Check it out on GitHub](https://github.com/seejohnrun/easy_translate)
