---
layout: post
title: Pretty Damn Fancy - Java PDF Cracker
published: true
all_set: true
tags:
- Code
- cracker
- java
- pdf
---

I had to open a PDF, so I spent the morning working on a basic PDF password
cracker written in Java. I haven't encapsulated it in a command line tool yet
(and I m not sure __I__ ever will), but it came out pretty neat.

It started out simple enough:

``` java
boolean attempt(String password) throws IOException {
  try {
    //attempt to open the reader stream
    PdfReader reader = new PdfReader(this.filename, password.getBytes());
    reader.close();
    return true;
  } catch (BadPasswordException e) {
    return false;
  }
}
```

After I had the password, I couldn't resist the urge to implement:

``` java
boolean attempt(String password);
String crackViaWordlistFiles(Collection wordlistFiles);
String crackViaWordlistFile(String wordlistFile);
String crackViaWordlist(Collection words);
String crackViaBruteForce(String alphabet, int length);
String crackViaBruteForce(String alphabet, int lower_length, int upper_length);
```

The coolest of which, was the code for generating the brute force permutations
of `@length`.

Hopefully someone finds a use for this, and if not, finds a use for my brute
force algorithm. Thanks!

---

__Update:__ This project has been moved to
[GitHub](https://github.com/seejohnrun/Pretty-Damn-Fancy), expanded, and unit
tested.
