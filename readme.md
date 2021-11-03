# Saga

> Your dream programming language.

Saga is a multi-platform general-purpose programming language containing everything you need for building, testing and deploying applications, systems and libraries across the entire tech stack. Combining object-oriented and functional programming in one concise, high-level language, allowing you to write simple, fast and quality type safe code while leveraging huge ecosystems of libraries.

```dart
module Button {
  @React pub elem make(%count: int) {
    let times = switch count {
      case 1: "once"
      case 2: "twice"
      case 3: "$n%d times"
    }
    let msg = "Click me $times%s"
    <button>$msg</button>
  }
}
```

### Overview

JavaScript is undoubtedly the most popular language in the world. It's got a large ecosystem, and even better, a great community. And with the Node.JS allowing full-stack apps to be developed in a single programming language further paved the way to its overall success. And today, it's a language that's evolving, constantly adapting to suit the needs of its users. Eventually, _any application that can be written in JavaScript will be written in JavaScript_ (Atwood's Law).

But the language is drowned in many imperfections, foot-guns and gotchas, and has many complicated parts that most of the time could throw us off. The ecosystem is also as frightening, with project folders gigabytes in size even for a simple, small application. And perhaps, a new framework gets released ever so often. While JS is normally used as an alternative than their native counterparts, it's not designed to be used as a "workhorse" language that could solve every single conceivable problem.

![](https://external-preview.redd.it/ABNCwO_-ZehpLMGLU_tihhjCLjxBPe9IZt6trcaxC9A.jpg?auto=webp&s=bf0235f0213845ca15b5df474e912cfcb3471d64)

Still, time and time again, developers keep pushing on JavaScript to its limits. While JavaScript could be used to write such an application, you won't see machine learning or data analytics systems or even full blown 3D games built only with JavaScript, rather they would rather stick to the old way and develop with various lower-level languages to bring about the performance they desire.

### About the Project

Saga aims to be a language with a syntax very familiar to JavaScript and React developers, including those who use tools such as Gatsby, Next.JS or Styled Components. Saga is a compiler and a framework combined and has features specific to client and server-side app development: built-in styles, markup, schemas, routing and queries. It is designed to express common programming patterns in a concise, elegant and type-safe way, integrating features from different object-oriented and functional languages.

### Features

- familiar JS-like syntax
- built-in JSX, CSS-in-JS and GraphQL
- JSDoc documentation support
- language-integrated query (LINQ)
- DSL strings
- keyword-based syntax
- concurrency, asynchrony and error-handling constructs
- pattern matching
- type annotations and aliases
- uniform function call syntax
- (im)mutable data structures
- block regular expressions
- extensible numeric literals
- string formatting
- Unicode named characters
- algebraic data types
- advanced type inference
- JIT and AOT compilation
- portable runtime
- multiple targets: JS, C#, Python, JVM and LLVM/Swift
- opaque types and type aliases
- full tail call elimination
- human friendly errors
- a Rust compiler
- a core standard library
- an interactive REPL
- comprehensive editor support

## Overview

### Semicolons

Not needed!

### Comments

```js
// line comment
/* block comment */
/** JSDoc comment */
```

```dart
// line comment
/* block comment */
/+ /+ nested +/ comment +/

/// JSDoc comment
/** JSDoc comment */
/++ JSDoc comment +/
```

### Variables

```js
const x = 1;
var x = 1;

let x = 5;
x = x + 1;
```

```dart
val x = 1 // or val x = 1
var x = 1

var x = 5; x += 1 // or x := x += 1
```

### Strings

```js
"Kai'Sa";
'Kai\'Sa';

"C:\\Windows\\Media";

"Multi-line\n\
string";

`hello ${message}`;
// No string formatting
```

```dart
"Kai'Sa" // Escaped string
'Kai''Sa' // Verbatim string

"C:\\Windows\\Media"
'C:\Windows\Media'

"""Multiline
string"""

"hello $message"
"${32}%d items"
```

### Numbers

```js
[1, 1n, 1.0, 0b100, 0o1000, 0x19];
parseInt("103", 4);
parseInt("105", 6);
parseInt("107", 12);

1 + 2;
2 - 3;
3 * 3;
4 / 10;
Math.floor(4 / 10);
4 ** 10;
Math.floor(4 ** 10);
4 % 1;
((4 % 1) + 1) % 1;
4 & 1;
4 | 1;
4 ^ 1;
4 << 1;
4 >> 1;
Math.min(1, 3);
Math.max(1, 3);

1 < 3;
1 < 2 && 2 < 3;
1 < 2 ? -1 : 1 > 2 ? 1 : 0;
```

Saga has a distinction between integers and floating point numbers.

```dart
[1, 1:n, 1.0, 0b100, 0o1000, 0x19]
0q103
0s105
0z107

1 + 2
2 - 3
3 * 3
4 / 10
4 ~/ 10
4 ** 10
4 *** 10
4 % 1
4 %% 1
4 & 1
4 | 1
4 ^ 1
4 << 1
4 >> 1
// No >>>
1 <* 3
1 *> 3

1 < 3 // also >, <=, >=
1 < 2 < 3
1 <=> 2
```

### Constants & boolean operations

```js
true;
false;
null;
undefined;
Infinity;
NaN;

!!a && !!b;
!!a || !!b;
!!a != !!b;

a == b;
a === b;
```

```dart
true
false
null
void
infin
nan

a && b
a || b
a ^^ b
!b

a == b // no type coercion
a === b
```
