# Trinity

```coffee
mod Button
  elem make(/count: int)
    style button
      color: white
      font-size: 20px
      font-weight: bold
      background-color: white
    let times = match count with
      case 1: "once"
      case 2: "twice"
      fail "$count times"
    let msg = "Click me $times"
    mark <button $msg
```

## Introduction

Trinity is a programming language in the making, with three goals: simplicity, flexibility and performance. It combines the best of functional, object-oriented and imperative programming paradigms, for the web, desktop and mobile, while compiling to JavaScript and WebAssembly.

```coffee
# Assignment
mut let number = 42
let opposite = true
let regex = `\"(\d+)\":\s*\n\s*name:\s+([\-.\w]+)` `$1: {name: $2}`
# Conditions
number = if opposite then -42 else number
# Functions
let square = |x|: int = x * x
# Lists
let list = [1, 2, 3, 4, 5]
# Hashes
let math = {
  sqrt: Math.sqrt
  square: square
  cube: |x| x * square x }
# Splats:
let race = |winner, *x| print winner runners
# Existence
if ?elvis: alert "I knew it!"
# Array comprehensions
let cubes = [for y in list do x y]
# LINQ
mut let cubes = from x in 1 to 100
  select $ math.cube x
```

---

## Design Goals

If there is one motivating idea behind Trinity, is that technology for creating software should be as simple as possible, using as few tools as possible.

Needless complexity and difficulties, fragmented builds and projects, all of that should be stripped away, leaving only the exhilarating creative essence of programming that made all of us want to learn about in the first place.

Or at the very least, if this can't be done, let's build something that can, on top of what's already there.

## Introduction

Trinity is a programming language that compiles to JavaScript, offering both an alternative syntax to JavaScript while also adding both compile-time and run-time features and optimizations to JavaScript. The language is clean, familiar and easy to reason about. It's meant to be a functional-first language, with improvements to both imperative and object-oriented syntax.

It is intended to be compiled and used from within JavaScript projects, augmented by the power of JavaScript (and, if possible, WebAssembly) on its side to deliver the best possible performance without having to install anything (other than Node, of course).

Trinity consists of not only a language, but also a compiler and library (i.e. a framework) that is implemented in JavaScript and compiles to JavaScript. Trinity's features are powered by its core libraries, some using the same APIs as JavaScript.

<small>

#### Disclaimer:

Trinity is currently still in its early stages of conceptualisation and experimentation. This document mainly serves as a guide to the language's design, and will touch shortly on the implementation.

</small>

---

# Trinity's language guide

This document is an informal guide to the design of Trinity, structured in a way that you can read from anywhere within the document. It is not meant to be a complete reference or a tutorial, but rather a guide to the language's design.

Trinity is mostly inspired by Ruby, Haskell and OCaml, and contains a lot of similarities from both of them. Other influences include Rust, Scala, Go, LiveScript and Kotlin. Style, markup blocks and mappings are directly inspired by SASS, Markdown, YAML and HAML.

## Statements

### Indentation

Use indentation or curly braces to indicate code blocks.

```coffee
rec fn List.has(item: any): bool
  match this
    case [] { false }
    case [a, *rest] { a == item && rest.has item }
```

Though you can also use a "closing keyword" such as `do`, `then` or `with`, or a right-spaced colon if a block is expected after a statement (such as `if` or `while`).

```coffee
rec fn List.has(item: any): bool
  match this with
    case [] then false
    case [a, *rest] then a == item && rest.has item
```

### Expressions and statements

Use semicolons to separate multiple statements on the same line, and commas to separate expressions in brackets.

The last statement on a line is not required to have a semicolon, and so do the last expressions in brackets.

```coffee
print sys.inspect object
print(sys.inspect, object)
```

### Hello World!

```coffee
print 'Hello World!'
# or
fn main = print 'Hello World!'
```

`fn main` can be skipped in single-file projects.

### Comments

Comments support JSDoc and Markdown.

```coffee
# line comment
(* block comment *)

#: doc comment
(** docblock comment *)
```

### Variables

```coffee
let x = 42
let y: int = 42

# Definitions can be overridden
let y = ref 1 # mutable
mut let y = 1
y += 2
y := 3
```

Variables are block-scoped.

```coffee
let x = do
  let part1 = \Hello
  let part2 = \World
  "$part1 $part2"
# `part1` and `part2` are not accessible outside this block
```

### Functions

```coffee
# Anonymous function
let double = |x: int|: int = x * 2
let double = fn(x: int): int = x * 2

# Named function declaration
fn double(x: int): int = x * 2
```

### Data types

```coffee
void: void # void
null: null # null
1: int # 64-bit integer
1.0: float # 64-bit integer
true: bool # boolean
:sym: sym # symbol
"hello": str # string
`hello`: regex # regular expression
[1, 2, 3]: list<int> # list
{a: 1, b: 2}: dict<str, int> # dictionary
(1, 2, 3): tuple<int> # tuple
fn x: int = x: () -> int # symbol
```

#### Constants

```coffee
null == void # both are similar
true != false
```

#### Numeric types

```coffee
(* integers *)
42
-0x42
0o52
0b101010

(* floats *)
42.0
-0.42
0.42e2
0.42e-2 0.42e+2
0x0.13p2
0o0.13p-2
0b0.1p+2

# Numbers can contain underscores
# or leading zeroes
42_000.0; 042

nan, infin # special floating point constants

18446744073709551616n # bigint
1r / 3r # rational
```

#### Strings

```coffee
let x: str = "Hello World!" # escaped string
let y: str = 'Hello World!' # verbatim string

# all forms of strings can contain newlines
let x: str = "Hello
World!"
let y: str = 'Hello
World!'

# escapes
"\n" # newline
"\r" # carriage return
"\t" # tab
"\b" # backspace
"\f" # form feed
"\v" # vertical tab
"\a" # alert
"\e" # escape
"\s" # space
"\p" # platform dependent newline
"\l" # line continuation
"\x{}" / "\u{}" # unicode escape
"\b{}" # binary escape
"\o{}" # octal escape
"\d{}" # decimal escape
"\0" # null

# all characters can be escaped, including
# spaces, backslashes and quotes
"\ " "\\" "\""

# decimal, hexadecimal, binary and octal
# characters can be escaped
"\x0" "\x1F" "\x10FFFF" "\uFF"
"\65535" "\d65535"
"\o377"
"\b11111111"

# Multiple characters can also be placed
# within curly brackets
"\u{1F680 1F681 1F682}"

(* interpolation *)
"Hello $name!"
"Hello $x.name."
"Hello $x[1].name"
"Hello $x(y, z, a)[1]{int}.name!"
"Hello ${name}!"
```
