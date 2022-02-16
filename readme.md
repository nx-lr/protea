# SagaScript | A Great Alternative to JS

## The real language for serious web-based development

SagaScript is a syntactic extension to JavaScript, bringing a lot of new compile-time and runtime features we as devs have come to expect from modern languages.

```swift
// Infinitely yield prime numbers
iterator primesFrom({start}): number =
  switch (start) {
    case _ < 2:
      return;

    case _ <= 7:
      for (let x in [2, 3, 5, 7])
        if (x > start)
          yield x;

    default:
      const sieve = {[a::b]: true};
      const ps = primesFrom(2);
      ps.next();
      let p = ps.next(),
          pp = p * p,
          c = pSq,
          s = 6,
          m = 9;

      while (pp < start) {
        s = 2 * p;
        m = p + s * ceil(start - p) / s;
        while (m in sieve) m += s;
        sieve[m] = s;
        p = ps.next();
        pp = p * p;
      }

      if (start > c) c = start;
      if (c % 2 == 0) c += 1;

      for (; true; c += 2) {
        s = sieve[c];
        if (s) {
          delete sieve[c];      // c composite
        } else if (c < pp) {
          yield c;              // c prime
          continue;
        } else {                // c == p^2
          s = 2 * p;
          p = ps.next().value;
          pp = p * p;
        }
        m = c + s;
        while (m in sieve) m += s;
        sieve[m] = s;
      }
  }
```

---

## Overview

- SagaScript is a language for building fullstack cross-platform apps and libraries for the modern and future web. SagaScript looks like JS, acts like JS, and compiles to the highest quality of clean, readable and performant JS, directly runnable in browsers and Node.

**Feature list:**

- Human-understandable error messages
- Blazing-fast compiler that outputs readable JS
- Syntax inspired by modern languages, while still keeping its JavaScript style
- First-class syntactic support for components, styling, schemas, queries and testing
- First-class JSX, CSS, Prisma and GraphQL support (albeit modified)
- Strong and robust type system
- A mix of declarative and imperative approaches
- Compilation to JavaScript or native code
- Comprehensive standard library
- Support for JS, TS and other JS frameworks

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond (though not at the moment as I am busy with school). SagaScript is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

---

# SagaScript's Reference

```swift
let x = arr
const {x: y} = obj
val [x: y] = arr
```
