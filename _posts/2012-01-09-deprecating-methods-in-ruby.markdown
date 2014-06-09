---
layout: post
title: Deprecating Methods in Ruby
tags:
- alias_method
- Code
- deprecating
- mixin
- ruby
status: publish
type: post
published: true
meta:
  _edit_last: '1'
  _syntaxhighlighter_encoded: '1'
  dsq_thread_id: '533235600'
---
Over time, as your libraries evolve, you ll want to deprecate methods. Generally, the deprecations you ll make will fit into one of three categories:
<ol>
	<li>Changing the name of a method to be more descriptive</li>
	<li>Change how a certain process works to be more clear, normally as part of a shift in how people will <em>use</em> your library</li>
	<li>Removing functionality</li>
</ol>
Ruby makes adding deprecation painless, by use of <a href="http://en.wikipedia.org/wiki/Mixin">Mixins</a> and <a href="http://www.leonardoborges.com/writings/2008/08/07/why-i-like-ruby-1-alias_method/">alias_method</a>.

I was deprecating some methods (mostly type #1) on a library of mine yesterday, and I thought it d be interesting to share my strategy:

First I created this module:

``` ruby
module Deprecated

  # Define a deprecated alias for a method
  # @param [Symbol] name - name of method to define
  # @param [Symbol] replacement - name of method to (alias)
  def deprecated_alias(name, replacement)
    # Create a wrapped version
    define_method(name) do |*args, &amp;block|
      warn "IceCube: ##{name} deprecated (please use ##{replacement})"
      send replacement, *args, &amp;block
    end
  end

  # Deprecate a defined method
  # @param [Symbol] name - name of deprecated method
  # @param [Symbol] replacement - name of the desired replacement
  def deprecated(name, replacement = nil)
    # Replace old method
    old_name = :"#{name}_without_deprecation"
    alias_method old_name, name
    # And replace it with a wrapped version
    define_method(name) do |*args, &amp;block|
      if replacement
        warn "IceCube: ##{name} deprecated (please use ##{replacement})"
      else
        warn "IceCube: ##{name} deprecated"
      end
      send old_name, *args, &amp;block
    end
  end

end
```

## And to show how it would be used:

### Changing the name of a method to be more descriptive:

``` ruby
class SomeClass

  extend Deprecated

  def new_method_name
  end

  # Call #new_method_name when calling #old_method_name
  deprecated_alias :old_method_name, :new_method_name

end
```

### Changing how a method is used:

``` ruby
class SomeClass

  extend Deprecated

  def new_method
  end

  # Call #old_method_name still but put out a warning when using it
  deprecated :old_method_name, :new_method

end
```

### Removing a method:

``` ruby
class SomeClass

  extend Deprecated

  def removed_method
  end

  # note that #removed_method is deprecated
  deprecated :removed_method

end
```

---

You ll definitely want to add more information via a third argument (like <code>advice=</code>) to say when the method will be removed and suggest alternatives, but that s the general idea. Use it as an easy way to deprecated and change methods without outright removing them, or mucking up their implementation with a bunch of <code>warn</code> calls.
