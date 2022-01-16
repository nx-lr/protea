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

Trinity is a programming language intended for both backend and frontend web development, with a focus on malleability, conciseness, flexibility and performance. It combines multiple paradigms and ideas from multiple languages, all while compiling to JavaScript and WebAssembly to deliver performant, type-safe and highly-optimized code.

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
# Dictionaries
let math = {
  sqrt: Math.sqrt
  square: square
  cube: |x| x * square x }
# Splats:
let race = |winner, *runners| print winner runners
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

If there is one motivating idea behind Trinity, is that the technology for creating software should be as simple as possible, using as few tools and libraries as possible, and without a steep learning curve. So we decided that given the prevalence of web-based technology and languages, we should focus on the one and only language that is most suited to the task at hand: JavaScript.

Adding new features to a project should be easy, without us having to go through the pains of deciding which technology and stack to use. Needless complexity and difficulties, fragmented builds and projects, all of that should be stripped away, leaving only the exhilarating creative essence of programming that made all of us want to learn about in the first place.

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

Trinity is a language inspired by Ruby, Haskell and OCaml, and integrates concepts from languages like Rust, Scala, Go and Kotlin, as well as HAML and Stylus.

### A note on syntax

Like all programming languages, Trinity is a language in which programs are not text. That means, the real truth is not written in its textual form, but more as an abstract syntax tree (AST).

This document describes Trinity in terms of its default and (currently) only syntax: its written form as source code.

## Statements

### Indentation

Like Scala 3, YAML and Haskell, Trinity is a "hybrid" language in which you can use curly brackets and indentation to structure and organize your code. though indentation is used only for the purpose of readability.

```coffee
rec fn List.has(item: any): bool
  match this
    case [] { false }
    case [a, *rest] { a == item && rest.has item }
```

Though you can also use `then` or a right-spaced colon if a code block is expected after a statement (such as `if` or `while`).

```coffee
rec fn List.has(item: any): bool
  match this
    case []: false
    case [a, *rest]: a == item && rest.has item
```

### Expressions and statements

Use semicolons to separate multiple statements on the same line, and commas to separate expressions in brackets. You can pass arguments to functions Haskell style - parentheses here have nothing to do with function calls.

This kind of evaluation strategy for expressions is Applicative Order Call-by-Value. See Function application for details.

```coffee
print sys.inspect object == print(sys.inspect, object)
func (x + 3) x - 3 == func(x + 3, x) - 3
```

You can call functions with named arguments by using the `/` syntax. Named arguments have no order in functions, so you can call them in any order.

```coffee
print(x, name, /sep = "\n")
print x name /sep "\n"
```

### Comments

Comments start with the `#` character followed by a space. The space is compulsory. All following text up to the end of the line is considered a comment. They can be on their own line or follow after a statement.

```coffee
# This is a single line comment.
(*
  This is a multiline comment.
  (* It can be nested. *)
*)
```

Documentation comments `#:` and `#+ +#` are special forms of comments that are used to document your code. They are used to generate documentation, and support JSDoc and Markdown formatting.

The compiler command `trin doc` automatically extracts the API documentation and generates a website to present it.

```coffee
#: This is a single line comment.
(:
  This is a multiline comment.
  (: It can be nested. :)
:)
```

### Variables

Declaring a variable is done with the `let` keyword. You don't need the `let` keyword at all.

```coffee
let x = 42
let y: int = 42

# Definitions can be overridden
let y = ref 1 # mutable
mut let y = 1 # same thing
y += 2
y := 3
```

Variables are block-scoped. Declarations are scoped through code blocks, one such example is `do`. Also take note that in code blocks, the last line is implicitly returned.

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
double = |x: int|: int = x * 2
double = fn(x: int): int = x * 2

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
  ret = ref ident[`[^\pL\d]` ``]
  ret := ret[`\b.*(?!\pL)`] + ret[`\pLl.*\b`].lower!
  ret

fn cmpIdent(a: str, b: str): bool =
  normalize a == normalize b

WILDFire == WILD_Fire == WILD-Fire
WILDFIRE____ == WILDFIRE
wildFire == wildfire == wild_fire == wild-fire
```

## Data types

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
{1, 2, 3}: set<int> # set
{a: 1, b: 2}: dict<str, int> # dictionary
```

### Constants

Trinity has four constants: `null` and `void` which are both equivalent to `null` and `undefined` in JavaScript, respectively. `true` and `false` are also equivalent to `true` and `false` in JavaScript.

```coffee
null == void # both are aliases for each other
true != false

true: bool
null: null
void: void
```

### Numeric types

Trinity distinguishes between integers and floats as separate value types. Integers are 64-bit signed integers, while floats are 64-bit IEEE 754 floating point numbers.

```coffee
(* integers *)
42 # decimal
-0x42 # hexadecimal
0o52 # octal
0b101010 # binary

(* floats *)
# decimal point
42.0; -0.42; 42.; -.42;
# with exponents
0.42e2; 0.42e-2; 0.42e+2
# hexadecimal, octal and binary
0x0.13p2; 0o0.13p-2; 0b0.1p+2

# Numbers can contain underscores
# or leading zeroes
42_000.0; 042
nan; infin # special floating point constants
```

Trinity also comes with other numeric types, such as rational and complex numbers, and even their arbitrarily-sized counterparts.

```coffee
18446744073709551616n: bigint
1r / 3r: rat int int
1 + 2i: comp int int
```

### Strings

Strings are written inside single or double quotes, which can span multiple lines. They can contain any character, including newlines, tabs, and escape sequences, irrespective of indentation.

The difference between single quoted and double quoted strings is that single quoted strings do not need escaping.

```coffee
mut x: str = "Hello World!" # escaped string
mut y: str = 'Hello World!' # verbatim string

# all forms of strings can contain newlines
x = "Hello
World!"
y = 'Hello
World!'
```

Strings can be delimited using multiple quotes of the same type, as long as they begin with at least three quotes. The string ends with the furthest set of quotes, if the strings ends with more than the number of opening quotes.

In multi-quoted strings, all starting/ending whitespace before the first/last non-whitespace character is removed. All indentation is stripped based on the first line.

```coffee
let greeting = """
"
Hello World!
"
"""
```

Most escape sequences from other languages are allowed within double quotes, including:

```coffee
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
```

Numeric escape sequences are also allowed, in which Unicode character code points can be encoded in decimal, binary, octal or hexadecimal. The same escapes with curly brackets can allow you to put in Unicode character sequences separated by spaces, semicolons or commas.

```coffee
# decimal, hexadecimal, binary and octal
# characters can be escaped
"\x0"; "\x1F"; "\x10FFFF"; "\uFF"
"\65535"; "\d65535"
"\o377"
"\b11111111"

# Multiple characters can also be placed
# within curly brackets
"\u{1F680 1F681 1F682}"
```

Using `\j{}` notation, you can express Unicode character sequences using a notation inspired by regular expressions.

```coffee
"\j{\emoji:smile}" # => 😀
"\j{\frac{\sum{i=1}^{n}\left(\frac{1}{i}\right)}{n}}"
```

#### Interpolation

Both types of strings support interpolation with `${}`, which is a way to embed variables. The braces can be omitted if the expression is only:

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `[][1]`
- a function call: `fn()`
- a numeric literal: `42` or `0x10`
- and any combination of the like

By default, all embedded expressions are converted to strings by passing it through the `str` method and concatenating the resulting string. You can override this behaviour by using the construct `ident'string'` instead.

```coffee
person = { age: 23, name: "John" }

# Simple interpolation
greeting = "Hello $name!"
# Accessing properties
greeting = "Hello $person.name. "
  "You are $person['age'] years old."
# Type assertions
greeting = "Hello $person.name. "
  "You are $person{int}['age'] years old."
# Calling functions and methods
greeting = "Hello $name.upper(/locale='en')"
greeting = "Hello $upper(name)"
greeting = "Hello ${name.upper!}!"
```

#### Formatting

Strings are formatted by a use of directives, which are a set of transformation methods chained together to produce a result. Each directive begins with a percent sign, and then a series of flags separated by pipe characters, and an optional value after the colon.

```coffee
"Hello $name%type!"
"Hello $name%switch1:value1|switch2:value2"
"Hello $name%switch1:value1|switch2:value2"

# Some examples
"Hello ${'world'}"
"Hello ${'world'}%upper" # => "Hello WORLD"
"${1234567890}%sep:{','}" # => "1,234,567,890"
"Percentage correct answers: ${correct / total}%dp:2|unit:{'%'}"
```

#### Template strings

You can create template strings by using the `#` character to mark placeholder arguments in a string. The result is a function, which can be called with the arguments to be embedded, which returns said string.

```coffee
let greeting = "Hello #0!"
greeting "World" # => "Hello World!"

"Hello #name"; "Hello #/name" # named argument
"Hello #{name=1}" # `name` with a default
"Hello #{x:int}" # `x` with a type
"Hello #name" # named argument
"Hello #1" # positional argument
"Hello #{1 = 1}" # positional argument
"Hello #{-1:int}" # typed argument
"Hello #?name" # optional argument
"Hello #*name" # spread argument
"Hello #*?name" # optional spread argument
```

#### Backslash strings

Strings can be written with a preceding backslash instead of quotes. Backslash strings can't contain `, ; ] ) }` or whitespace.

```coffee
\word
func \word, \word
func(word)
[\word]
{prop: \word}
```

### Accessing and modifying strings

Retrieve a value from the string by using subscript syntax, passing the index of the value you want to retrieve within postfix square brackets. You can also use negative indices to access characters from the end of the string.

The range of integers you want to retrieve is always `-l < 0 <= l` where `l` is the length of the string.

```coffee
'hello'[0]   # => 'h'
'hello'[1]   # => 'e'
'hello'[2]   # => 'l'
'hello'[3]   # => 'l'
'hello'[4]   # => 'o'
'hello'[5]   # => ''
'hello'[-1]  # => 'o'
'hello'[-2]  # => 'l'
'hello'[-3]  # => 'l'
'hello'[-4]  # => 'e'
'hello'[-5]  # => 'h'
'hello'[-6]  # => ''
```

You can slice from the beginning or end of the string, using a notation `start,end,step`. All elements are optional, and default to `0,l,1` where `l` is the length of the string.

```coffee
x = "Hello"
x[0]      # 1st character
x[1]      # 2nd character
x[-1]     # last character
x[-2]     # 2nd-to-last character
x[1,]     # all except the 1st
x[,-1]    # all except the last
x[1,-1]   # all except the last
x[-2,1]   # all except the last 2
x[,]      # copy the entire string
x[,0]     # empty string
x[,,-1]   # reverse the string
x[,,2]    # skip over every 2nd character
x[,,3]    # skip over every 3rd character
```

### Regular expressions

Similar to block strings and comments, Trinity supports block regular expressions, denoted by backticks: `` ` ``---these are extended regexes that ignore whitespace, newlines, and can contain comments and interpolation.

They go a long way towards making complex regular expressions readable.

```coffee
# match a url with parameters
`^(http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$`

` (?i)
  ^ 0b[01]+    |              # binary
  ^ 0o[0-7]+   |              # octal
  ^ 0x[\da-f]+ |              # hex
  ^ \d*\.?\d+ (?:e[+-]?\d+)?  # decimal
`i
```

The delimiter `` ` `` must be escaped inside the top level of regular expressions.

#### Lists

Lists are written with square brackets, and whose elements are separated by newlines. They can contain any type of value. They can be nested, and can be empty.

```coffee
val list = ['hello', 'world', 'how are you']
```

The type of a list is written in full as `list<type>`, `list type` or `[]type`.

```coffee
let list1: []int = [10, 20, 30]
let list2 = ['a', 'b', 'c'] # is []str
[] # an empty list
```

## Top-level declarations

A top-level declaration appears on the top-level or outermost scope of a file. It can be one of the following:

- A declaration, like `let x = 42`, or `struct type Optional a = None | Some a`.
- A `use` clause, like `use base` or `use math.sqrt`.

### Declarations

Declarations define program entities like variables or functions.

Each declaration can be preceded with a number of _modifier_ keywords which can be placed to the left of said keyword, which change or control the behavior of the declaration.

`=` is the declaration operator and is used to separate the name from its definition, as opposed to `=` which is assignment.

```coffee
let x = 1
mut let x = 1
```

All declarations are immutable, private and block-scoped by default. To make them public or visible, use the `pub` or `show` keyword; to make them mutable, use the `mut` keyword.

```coffee
let x = do
  let part1 = 'Hello'
  let part2 = 'World!'
  part1 + part2
# part1 and part2 are not accessible outside this block
```

## Hello World!

```coffee
print 'Hello World!'
# or
fn main = print 'Hello World!'
```

`fn main` can be skipped in single-file projects.

### Functions

Function declarations begin with the `fn` keyword, followed by the name of the function, followed by a list of parameters inside the brackets, and an expression after `=`. The parameters are separated by commas.

The expression comprising the right-hand side can refer to the name given to the definition in the left-hand side. In that case, it’s a recursive definition. For example:

```coffee
rec fn List.has(item: any): bool =
  match this:
    case [] { false }
    case [a, *rest] { a == item && rest.has item }
```

### Operators

Operators are defined with the `oper fn` compound keyword and one of three keywords: `prefix`, `infix` and `suffix`. This modifier determines how the operator is parsed. The `infix` keyword is the default.

```coffee
infix oper fn + = |x, y|: int = x + y
prefix oper fn - = |x|: int = -x
suffix oper fn + = |x|: int = x + 1
```

### Types

A user-defined data type is introduced with the type keyword. The left hand side declares a new type constructor with that name, followed by names for any type arguments. The right hand side is its definition.

```coffee
# sum types
type Optional x = None + Some x

# product types
type Pair x = x * x
type Triple x = x * x * x

# set types
type Union x = x | x
type Intersection x = x & x
type SymmetricDifference x = x ^ x
type Difference x = x - x

# nullable/optional types
type Nullable x = ?a
type Optional x = ?a

# tuple types
type Tuple x y = (x, y)

# list types
type List x = []x
# set types
type Set x = :{}x
# hash types
type Hash x y = {x : y}

# record types
type Rec x y = {x : y}
type RecOnly x y = {x : y}

# function types
type Fn a b = a -> b
type Fn2 a b c = a -> b -> c

# type operations on objects
type TypeOf a = type a
type ValuesOf a = val a
type KeysOf a = key a
type AttributeOf a b = a attr b
type MethodOf a b = a attr b & a is fn
```
