# Protea

Protea is a multi-platform, multi-paradigm and multi-purpose programming language intended to enhance JavaScript with a better vision and a better experience. It has a fast compiler toolchain that is blazingly fast and outputs performance-optimized code, and boasts a unique combination of language-integrated features inspired by the best of the web.

```dart
module Button
  style button = {
    color: paleVioletRed
    font-size: 1em
    margin: 1em
    padding: 0.25em 1em
    border: 2px solid paleVioletRed
    border-radius: 3px }

  fun make(&count: int): React.Component
    val times = match count
      case 1: "once"
      case 2: "twice"
      def "$count times"
    val msg = "Click me $times"
    <button>$msg</button>
```

Protea is a multi-purpose programming language, runtime and framework for building cross-platform apps, software and games while unifying the syntax and semantics of modern languages. The language is easy to use and adopt, and comes with many coveted features and supports many paradigms.

## Overview

JavaScript is the most popular language in the world. But we all know it has very tricky parts which can sometimes turn our job into a nightmare. Building scalable, performant, functional cross-platform software has been the goal of JavaScript for a long time, and people still kept on pushing to improve and expand JavaScript and its ecosystem.

We're in the age where JavaScript is used for purposes other than web development (all thanks to Node.JS), but this won't take away many of its "warts" that still desperately need to be addressed. Compilers for existing languages are still being developed, and new languages are being created, but practically, it could be hard to debug, learn from and use, thereby making it harder to maintain and integrate even in a large JavaScript project.

## Why Protea?

Protea is inspired by JavaScript, first and foremost, but with a syntax inspired by Elixir, Go, OCaml and Rust with a touch of features from Scala and Haskell. It adds syntactic sugar inspired by Ruby, Python and Haskell in an effort to enhance JavaScript's brevity and readability.

```dart
// Assignment:
val number   = 42
val opposite = true

// Conditions:
val number = if opposite: -42 else number

// Functions:
fun square(x) = x * x
val square = |x| x * x

// Arrays:
val list = [1, 2, 3, 4, 5]

// Objects:
val math = {
  root:   Math.sqrt
  square: square
  cube:   |x| x * square x
}

// Splats:
val race = |winner, *runners|
  print winner, runners

// Existence:
if ?elvis: alert "I knew it!"

// Array comprehensions:
val cubes = [for num in list: math.cube num]
```

---

## Syntax Overview

> This reference is structured so it can be read from top to bottom. Later sections use concepts and syntax previously introduced. Familiarity with JavaScript (or TypeScript if better) is assumed.

First, the basics: Protea uses significant whitespace to delimit blocks of code, which you would see frequently throughout this documentation. The following is a simple example of a Protea program:

```dart
rec fun List.has(item: any): bool =
  match this
    case []
      false
    case [a, *rest]
      a == item && rest.has(item)

rec fun List.has(item: any): bool {
  match this {
    case [] {
      false }
    case [a, *rest] {
      a == item && rest.has(item) } }
```

Comments are delimited much like JavaScript: `//` for line comments and `/* */` for block comments. The latter can be nested. `///` and `/** */` are special forms of comments used to document code (and support JSDoc and Markdown).

You do not need to use semicolons `;` to terminate expressions, ending the line would do just as well (although they can be used to fit multiple statements onto a single line).

You do not need to use parentheses to invoke a function if you're passing a single argument to a function, such as a variable, literal or equivalent parenthesized expression. A chain of identifiers is equivalent to a nested function call.

```dart
print sys.inspect obj object
print(sys.inspect(obj))
```

Also, you can call functions with named arguments with the `/` operator. If a value is not specified, it is implicitly `null`.

```dart
robocopy /j /tee /log.p 'c:\robolog.txt' /ETA /BYTES '//server1/share' '//server2/share'
```

Variables are compared case-insensitively except the first non-lowercase character. This means you can use varying conventions in your program without having to worry about name collisions or case conventions.

### Variables

Protea has two ways to declare variables:

- `val`: A variable that cannot be assigned to.
- `var`: A variable that can be reassigned to.

Declarations are scoped through code blocks.

```dart
val message = do
  val part1 = "hello"
  val part2 = "world"
  part1 ++ " " ++ part2
// `part1` and `part2` not accessible here!
```

`:=` modifies variables outside scopes, and destructively modifies any data structure or class.

All language constructs such as control also rely on this mechanism too.

```dart
if displayGreeting
  var message = "Enjoying the docs so far?"
  print message
// `message` not accessible here!
```

### Keywords

Keywords are all lowercase and are between two to six characters long. They are used to denote special meaning in Protea.

Identifiers are compared with partial case-insensitively while keywords are case-sensitive. Because of this mechanism, you can use any number of leading underscores to escape an identifier.

```dart
assert _assert = null
```

    in of as is new
    to til thru by del
    unset ref and or xor not
    var val func proc type
    class data enum module
    iter macro struct object
    trait style elem prop
    go defer do from where with
    if elif else then def decl
    for each loop while
    try throw catch after
    match case goto pass
    break next redo retry
    return yield await label
    import export route
    debug assert check

Keywords are also escaped and become identifiers when part of a qualified name, such as `x.for` or `y::loop`. They are also subject to the same case-insensitivity rules as identifiers.

### Numbers

There are two separate numeric types in Protea, unlike in JavaScript: `int` and `float`, which are 64-bit signed integers and floating-point numbers.

`nat` is also used to represent unsigned integers, but by default, `int` is used. To specify a `nat`, are distinguished from `int`s with the `u` suffix. `rat` is a rational number type, which is a pair of `int`s.

There also exist `big` versions of each numerical type: `bignat`, `bigint`, `bigfloat` and also `bigrat`, all of which are arbitrary-precision and arbitrary-sized.

#### Literals

Underscores and leading zeroes are ignored. **All numbers are case-insensitive**, except their type suffixes which are subject to normal identifier comparison.

```dart
decimal = 11256099
hex = 0xABC123
octal = 0o52740443
binary = 0b101010111100000100100011
```

We also provide three new numeric literals: quaternary (base 4) `0q`, senary (base 6) `0s` and duodecimal (base 12) `0z`.

To improve readability, you may place underscores in the middle of numeric literals such as `1_000_000`. Note that underscores can be placed anywhere within a number, not just every three digits.

Repeating digits use the form `x.yrz` where `x` is the integer part, `y` is the decimal part and `z` is the repeating part.

Rational literals use the form `xny`, `n` meaning numerator.

Exponent parts use `ex` (or `px` in the case of hexadecimal) where `x` is the exponent with an optional sign. An optional base `y` can be supplied in which case it is repeated: `exey`, `pxey` or any combination thereof.

Rational literals can also be `truncated` to a given precision. `tx` or `tdx` can be used to specify the number of fractional places. `tsx` specifies the number of significant digits instead.

All that can be followed by an optional type suffix which can be any identifier.

Numbers can be specified in hexadecimal using `0x` or `0X` prefixes.

### Strings

Strings are delimited using single or double quotes. Single quotes are reserved for raw strings, which means backslashes are not escaped. Strings are already multiline by default.

```dart
val greeting = "Hello world!"
val multilineGreeting = "Hello
  world!"
```

Strings can be delimited using multiple quotes of the same type, as long as they begin with at least three quotes. The string ends with the furthest quote if the string happens to end with more than the number of opening quotes.

In multi-quoted strings, all starting/ending whitespace before the first/last non-whitespace character is removed. All indentation is stripped based on the first line.

```dart
val greeting = """
"
Hello World!
"
"""
```

All JavaScript escape sequences in double quotes are supported, EXCEPT octal escapes. Multi-digit escape sequences, even in binary, octal and decimal are supported too.

```dart
"\b" "\f" "\n" "\r" "\t" "\v"
"\e" // escape
"\s" // space
"\l" // newline (platform specific)
"\0" // "\d0"
"\255" == "\xff" // "\xff"
"\65535" == "\uffff"
"\1114111" == "\u10ffff"
"\b100000000000000000000"
"\o1000000"
"\x{21 20 22 20 23}" // "A B C"
```

To escape a single quote, double it.

Strings support interpolation with `${}`, which is a way to embed variables. The braces can be omitted if the expression is only:

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `[][1]`
- a function call: `func()`
- and any combination of the like

By default, all embedded expressions are converted to strings via the patented `str` method. You can override this behaviour by using the construct `ident'string'` instead.

```dart
val greeting = "Hello $name!"
```

In single quotes, meta-characters such as `'`, `$`, `%` and `#` are

<!--
Some text needs to be changed as they are copy-pasted from other sources.
-->
