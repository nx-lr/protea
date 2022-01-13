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
let race = |winner, *x| print x::y runners
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

Trinity is a programming language that compiles to JavaScript, while offering a rich set of compile- and run-time features and a syntax reminiscent of both functional and object-oriented/procedural languages like like Ruby, Haskell and OCaml.

It is intended to be compiled and used from within JavaScript projects on its side to deliver the best possible performance without having to install anything (other than Node, of course).

Trinity's compiler, package manager and core libraries will be implemented directly in JavaScript, and runs on top of any JavaScript backend. You still have access to your favorite libraries and packages, and you can use Trinity with any JavaScript runtime and projects.

<small>

#### Disclaimer:

Trinity is currently still in its early stages of conceptualisation and experimentation. This document mainly serves as a guide to the language's design, and will touch shortly on the implementation.

</small>

---

# Trinity's language guide

This document is an informal guide to the design of Trinity, structured in a way that you can read from anywhere within the document. It is not meant to be a complete reference or a tutorial, but rather a guide to the language's design.

Trinity is mostly inspired by Ruby, Haskell and OCaml, and contains a lot of similarities from both of them. Other influences include Rust, Scala, Go, LiveScript and Kotlin. Style, markup blocks and mappings are directly inspired by SASS, Markdown, YAML and HAML.

## Hello World!

```coffee
print 'Hello World!'
# or
fn main = print 'Hello World!'
```

`fn main` can be skipped in single-file projects.

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

### Comments

Comments support JSDoc and Markdown.

```coffee
# line comment
(* block comment *)

#: doc comment
(: docblock comment :)
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

### Keywords and identifiers

Keywords are all lowercase and are special tokens in Trinity. They are used to denote special constructs, such as functions, classes, and control structures, and are distinguished from identifiers.

Because of how identifiers are compared, you can use any number of leading underscores to escape a keyword to turn it into an identifier.

```coffee
assert _assert = null
```

The following are considered keywords:

    in of as is new
    to til thru by del
    unset ref and or xor not
    let fn proc type
    class data enum mod
    iter macro inter obj
    trait style elem prop mark
    go defer do from where with
    if elif else then def
    for each loop while
    try throw catch after
    match case goto pass fail
    break next redo retry
    return yield await label
    use show hide route
    debug assert check

Keywords become identifiers when part of a qualified name, such as `x.for` or `y::loop`.

### Identifiers

An identifier is a sequence of letters, digits, dashes, combining marks and underscores, starting with a letter.

```coffee
let regex = `\b[\pL\pPc][\d\pL\pM\pPc\pPd]*\b`
```

Variables are compared case-insensitively until the first non-lowercase character. All underscores and dashes are ignored. This means you can use varying conventions in your program without having to worry about name collisions or case conventions.

```coffee
fn normalize(ident: str): str =
  let ret := ref ident[`[^\pL\d]` ``]
  ret = ret[`\b.*(?!\pL)`] + ret[`\pLl.*\b`].lower!
  ret

fn cmpIdent(a: str, b: str): bool =
  normalize a == normalize b

WILDFire == WILD_Fire == WILD-Fire
WILDFIRE____ == WILDFIRE
wildFire == wildfire == wild_fire == wild-fire
```

### Data types

Trinity comes with many common data types, such as strings, numbers, booleans and regular expressions. These are all defined in the `core` library.

```coffee
void: void # void
null: null # null
1: int # 64-bit integer
1.0: float # 64-bit integer
true: bool # boolean
:sym: sym # symbol
"hello": str # string
`hello`: regex # regular expression
```

Trinity also comes with a handful of data structures for grouping towards data values. Note, tuples and lists are interchangeable, sets and maps are similar in which sets have their keys and values mapped to one another, thus are written the same way as lists.

```coffee
[1, 2, 3]: list<int> # list
[1, 2, 3]: [int, int, int] # tuple

{a: 1, b: 2}: dict<str, int> # dictionary
{1, 2, 3}: set<int> # set
fn x: int = x: () -> int # symbol
```

#### Constants

Trinity has four constants: `null` and `void` which are both equivalent to `null` and `undefined` in JavaScript, respectively. `true` and `false` are also equivalent to `true` and `false` in JavaScript.

```coffee
null == void # both are aliases for each other
true != false

true: bool
null: null
void: void
```

#### Numeric types

Trinity distinguishes between integers and floats as separate value types. Integers are 64-bit signed integers, while floats are 64-bit IEEE 754 floating point numbers.

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
nan; infin # special floating point constants
```

Trinity also comes with other numeric types, such as rational, complex, and arbitrarily-sized numbers prefixed with `big`.

```coffee
18446744073709551616n # bigint
1r / 3r # rational
1 + 2i # complex
```

#### Strings

Strings are written inside single or double quotes, which can span multiple lines. They can contain any character, including newlines, tabs, and escape sequences.

They can be interpolated with `#{}` and can be concatenated with `+`.

```coffee
let x: str = "Hello World!" # escaped string
let y: str = 'Hello World!' # verbatim string

# all forms of strings can contain newlines
let x = "Hello
World!"
let y = 'Hello
World!'

(* String escapes *)
# only applicable to double quotes
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

(* Interpolation *)
# By default all values are converted
# into strings and concatenated into
# the output
"Hello $name!"
"Hello $person.name, you are $person.age years old!"
"Hello $person.upper(), you are $age[person] years old!"

# A post

(* String formatting *)
# a sequence of switches with optional values
# that are used for transforming values into
# other strings before including them in the output
"Hello $name%type!"
"Hello $name%switch1:value1|switch2:value2"
"Hello $name%switch1:value1|switch2:value2"

# some examples:
let name = "World"
"Hello $name%upper!" # Hello WORLD!

(* placeholders (same as in function calls) *)
"Hello #name" # named argument
"Hello #{name=1}" # `name` with a default
"Hello #{x: int}" # `x` with a type
"Hello #1" # positional argument
"Hello #{1 = 1}" # positional argument
"Hello #{-1: int}" # typed argument

(* accessing strings *)
x = "Hello"
# if any values is omitted, the values default to [0,0,1]
x[0] # first character
x[1] # second character
x[-1] # last character
x[-2] # second-to-last character
x[1,] # all characters except the first
x[,-1] # all characters except the last
x[1,-1] # all characters except the last
x[-2,1] # all characters except the last two
x[,,-1] # reverse order
x[,,] # entire string
x[,0] # empty string
x[,,2] # skip over every second character
x[,,3] # skip over every third character
```

#### Lists

```coffee
[] # empty list
[1, 2, 3] # list
[1, 2, 3,] # trailing comma
[[1, 2, 3]] # nested list

#[] # mutable list
[1, 2, 3]{int} # list with types

(* list types *)
[1, 2, 3]
```
