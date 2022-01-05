# Protea

Protea is a versatile, cross-platform and multi-paradigm programming language that seeks to enhance JavaScript with a better sense of belonging in the community, while preserving much of its original vision; all with a cleaner syntax, powerful tools and libraries, faster performance and compilation, and a more intuitive approach to development.

Protea's main motive is just like Rust: empowering everyone to build reliable and efficient software, with the power of JavaScript and WebAssembly at its side. It has a fast compiler toolchain that is blazingly fast and outputs performance-optimized code, and boasts a unique combination of language-integrated features inspired by the best of the web.

```dart
module Button =
  style button
    color: palevioletred
    border: 2px solid palevioletred
    border-radius: 3px
    padding: 0.5em 1em
    font-size: 1em
    font-weight: bold
    cursor: pointer
    &:hover
      color: white
      background: palevioletred
    &:active
      color: palevioletred
      background: white
    &:focus
      outline: none

  fun make(&count: int) =
    let times = match count then
      case 1 then "once"
      case 2 then "twice"
      fail "$count times"
    let msg = "Click me $times"
    mark $a b c
```

## Overview

We all know JavaScript has very tricky parts, some of which can turn our jobs into nightmares, but still, people continue to improve and expand JavaScript into new horizons. We're now in the era where JavaScript is used in almost every industry, and it's time to make it more accessible to everyone.

New languages and compilers for existing languages have been developed and created, attempting to hide away the fundamental problems of JavaScript, but it's still hard to debug or learn from and use, thereby making it harder to maintain and integrate even in a large JavaScript project.

## Why Protea?

Protea is a new programming language that seeks to remove many of the warts of JavaScript, while preserving its fundamental nature, tied in with a robust type system, a fast compiler/runtime and a powerful combination of features and tools to make it easier to build, maintain and integrate into JavaScript projects.

Protea is inspired not only from TypeScript, but also from Kotlin, Rust, Go, OCaml and Elixir, with concepts from Scala and Haskell. All this is done in an effort to enhance JavaScript's brevity and readability.

```dart
# Assignment:
let number   = 42
let opposite = true
let regex = `"(\d+)":\s*\n\s*name:\s+([-.\w]+)$` `$1: {name: $2}`

# Conditions:
let number = if opposite then -42 else number

# Functions:
fun square(x) = x * x
let square = |x| x * x

# Arrays:
let list = [1 2 3 4 5]

# Maps:
let math = {
  root:   Math.sqrt
  square: square
  cube:   |x| x * square x
}

# Splats:
let race = |winner, *runners|
  print winner runners

# Existence:
if ?elvis then alert "I knew it!"

# Array comprehensions:
let cubes = [for y in list then math.cube num]

# LINQ:
let cubes = from x in 1 to 100
  select Math.cube(x);
```

---

## Syntax Overview

> This reference is structured so it can be read from top to bottom. Later sections use concepts and syntax previously introduced. Familiarity with JavaScript (or TypeScript if better) is assumed.

### Syntax

#### Comments

Comments start with the `#` character followed by a space. All following text up to the end of the line is considered a comment. They can be on their own line or follow after a statement.

```dart
# This is a single line comment.
#=
  This is a multiline comment.
  #= It can be nested. =#
=#
```

Documentation comments `#:` and `#+ +#` are special forms of comments that are used to document your code. They are used to generate documentation, and support JSDoc and Markdown formatting.

The compiler command `pta doc` automatically extracts the API documentation and generates a website to present it.

```dart
#: This is a single line comment.
#+
  This is a multiline comment.
  #+ It can be nested. +#
+#
```

#### Indentation

Protea is a hybrid-form language, meaning you can use curly braces _and_ indentation to structure and organize your code.

```dart
rec fun List.has(item: any): bool
  match this
    case []
      false
    case [a, *rest]
      a == item && rest.has item
```

though you can also write it like this:

```dart
rec fun List.has(item: any): bool {
  match this {
    case [] {
      false }
    case [a, *rest] {
      a == item && rest.has item } }
```

or a combination of both:

```dart
rec fun List.has(item: any): bool
  match this
    case [] { false }
    case [a, *rest] { a == item && rest.has item }
```

You can also use `then` or a right-spaced colon if a code block is expected after a statement (such as `if` or `while`).

```dart
rec fun List.has(item: any): bool
  match this
    case []: false
    case [a, *rest]: a == item && rest.has item
```

#### Identifiers

Variables are compared case-insensitively except the first non-lowercase character. This means you can use varying conventions in your program without having to worry about name collisions or case conventions.

An identifier can contain any sequence of letters, digits, marks,underscores, and dashes, provided it starts with a letter or underscore, and does not end in any number of dashes.

```ts
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

Identifiers are compared using an approach known as partial case-insensitivity.

```dart
fun normalize(a: str): str = match a
  case a.sub(`[^\d\pL]`g, '') ~= `\p{Upper}+`
    a.sub(`[^\d\pL]`g, '').upper!
  fail
    a[0] + a[1:].sub(`[^\d\pL]`g, '').lower!

fun cmpIdent(a: str, b: str): bool =
  normalize a == normalize b
```

#### Semicolons

Like most other modern languages, semicolons are optional. Ending the line would do just fine. (although they can be used to fit multiple statements onto a single line).

#### Parentheses

You can pass arguments to functions Haskell style - parentheses here have nothing to do with function calls.

```dart
print sys.inspect obj
print(sys.inspect, obj)

fn (x + 3) x - 3
fn(x + 3, x) - 3
```

You can call functions with named arguments by using the `/` syntax. Named arguments have no order in functions, so you can call them in any order.

```dart
print(x, name, /sep "\n")
print x name /sep "\n"
```

### Variables

Protea has two ways to declare variables - `var` to declare a mutable variable and `val` to declare an immutable one.

Declarations are scoped through code blocks, one such example is `do`. Also take note that in code blocks, the last line is implicitly returned.

```dart
let message = do
  let part1 = "hello"
  let part2 = "world"
  part1 ++ " " ++ part2
# `part1` and `part2` not accessible here!
```

All language constructs such as control flow statements and functions also rely on this mechanism too.

```dart
if displayGreeting
  var message = "Enjoying the docs so far?"
  print message
# `message` not accessible here!
```

`:=` updates variables outside scopes, and destructively modifies any data structure or class.

### Keywords

Keywords are all lowercase and are special tokens in Protea. They are used to denote special constructs, such as functions, classes, and control structures, and are distinguished from identifiers.

Because of how identifiers are compared, you can use any number of leading underscores to escape a keyword to turn it into an identifier.

```dart
assert _assert = null
```

The following are considered keywords:

    in of as is new
    to til thru by del
    unset ref and or xor not
    var let func proc type
    class data enum module
    iter macro struct object
    trait style elem prop mark
    go defer do from where with
    if elif else then def decl
    for each loop while
    try throw catch after
    match case goto pass
    break next redo retry
    return yield await label
    import export route
    debug assert check

Keywords become identifiers when part of a qualified name, such as `x.for` or `y::loop`.

## Data types

Crystal provides several literals for creating values of some basic types.

### Null

The `null` type is used to represent the absence of a value, similar in other languages. It only has a single value:

```dart
null
```

You can also use `void`, they are conceptually identical.

### Booleans

`bool` has only two possible values: true and false. They are constructed using the following literals:

```dart
true  # A Bool that is true
false # A Bool that is false
```

### Integers

There are four integer types: `int`, `nat` which are signed/unsigned 64-bit integers, and their arbitrary-precision `big` counterparts.

An integer literal is a sequence of digits and underscores, optionally followed by a type suffix. All numbers are case-insensitive except their suffixes which are ordinary identifiers.

```dart
1 # int
1u # nat
1n # bigint
1nu 1un # bignat

18446744073709551616 # bigint
18_446_744_073_709_551_616u # bigint
```

Underscores can be used to make numbers more readable.

We also provide some more literals for numbers in different bases, from binary to hexadecimal (skipping over base 14.)

```dart
decimal = 11256099
hex = 0xABC123
octal = 0o52740443
binary = 0b101010111100000100100011
quaternary = 0q122303 # base 4
senary = 0s32403235 # base 6
duodecimal = 0zB23430A19 # base 12
```

### Rationals

There are four rational types: `float` which is a IEEE binary64 type, and `rat`, which is a pair of one signed and one unsigned integer. Both have their arbitrary-precision `big` counterparts.

Floating point numbers are inherently rational.

The `f` suffix is used to denote a float, and `r` is used to denote a rational. You would need to fo

Repeating digits use the form `x.yrz` where `x` is the integer part, `y` is the decimal part and `z` is the repeating part.

```dart
1r / 30r = 0.0r3r
```

Rational literals can also use a improper fraction of the form form `xny`, `n` meaning numerator. In this form, the `r` can be dropped.

```dart
1r / 30r = 0n3
```

Exponent parts use `ex` (or `px` (`p` for power) in the case of hexadecimal) where `x` is the exponent with an optional sign.

An optional base `y` can be supplied in which case it is repeated: `exey`, `pxey` or any combination thereof.

```dart
1e+40
0x1p+40
```

Literals can also be **`t`runcated** to a given precision. `tx` or `tdx` counts of fractional places (digits after the point in whatever base). `tsx` counts the number of significant digits instead.

```dart
1t10
0x1ts40
```

All that can be followed by an optional type suffix which can be any identifier.

### Strings

A string literal is enclosed using either single or double quotes. Double quotes support escape sequences, while single quotes do not. Strings are already multiline by default.

To escape a single quote, double it.

```dart
let marioSays = 'It''sa me, Mario!'

let greeting = "Hello world!"
let multilineGreeting = "Hello
  world!"

assert "hello\nworld" == multilineGreeting
```

Strings can be delimited using multiple quotes of the same type, as long as they begin with at least three quotes. The string ends with the furthest set of quotes, if the strings ends with more than the number of opening quotes.

In multi-quoted strings, all starting/ending whitespace before the first/last non-whitespace character is removed. All indentation is stripped based on the first line.

```dart
let greeting = """
"
Hello World!
"
"""
```

A backslash denotes a special character inside a double-quoted string, which can either be a named escape sequence or a numerical representation of a Unicode code point.

```dart
"\b" "\f" "\n" "\r" "\t" "\v"
"\e" # escape
"\s" # space
"\l" # newline (platform specific)
"\0" # "\d0"
"\255" == "\xff" # "\xff"
"\65535" == "\uffff"
"\1114111" == "\u10ffff"
"\b100000000000000000000"
"\o1000000"
"\x{21 20 22 20 23}" # "A B C"
```

Any other character following a backslash is interpreted as the character itself.

A backslash followed by at most seven digits denotes a code point written in decimal.

```dart
"\33" # => "A"
"\83" # => "S"
"\10" # => "\n"
"\0"  # null char
```

Escapes with other bases are also allowed:

```dart
decimal = "\11256099"
hex = "\xABC123"
octal = "\o52740443"
binary = "\b101010111100000100100011"
quaternary = "\q122303" # base 4
senary = "\s32403235" # base 6
duodecimal = "\zB23430A19" # base 12
```

One curly brace can contain multiple unicode characters each separated by a whitespace.

```dart
"\u{48 45 4C 4C 4F}" # => "HELLO"
```

### Interpolation

Strings support interpolation with `${}`, which is a way to embed variables. The braces can be omitted if the expression is only:

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `[][1]`
- a function call: `func()`
- and any combination of the like

By default, all embedded expressions are converted to strings by passing it through the `str` method and concatenating the resulting string. You can override this behaviour by using the construct `ident'string'` instead.

```dart
let greeting = "Hello $name!"
```

### Formatting directives

### Template strings

You can create template strings by using the `#` character to mark placeholders in a string. The arguments can be named, as in `#name`, or positional, as in `#0` or `#-1` (negative indices count from the last).

```dart
var greeting = "Hello #0!"
greeting "World" # => "Hello World!"
```

You can also spread arguments into the string by using the `*` operator, and mark them as optional by using the `?` operator.

In single quotes, meta-characters such as `'`, `$`, `%` and `#` are

Also, you can call functions with named arguments with the `/` operator. If a value is not specified, it is implicitly `null`.

```dart
sys.robocopy /j /tee /log_p 'c:\robolog.txt' /eta /bytes '//server1/share' '//server2/share'
```

<!--
Some text needs to be changed as they are copy-pasted from other sources.
-->
