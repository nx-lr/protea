# Trinity

> A new language for building cross-platform apps and libraries.

Trinity is a project that aims to provide a simple, powerful and easy-to-use language, toolchain, framework and library for building cross-platform apps and libraries. It will be portable enough to compile to JavaScript, WebAssembly and native code, while hybridizing modern compile-time and runtime features from other languages.

```coffee
elem TodoItem {
  prop color = style {color: 333}
  prop label_ = ''
  prop done = false

  proc onClick { done = true }

  style base {
    align-items: center
    display: flex
  } label_ {
    font-weight: bold
    color: $color
    flex: 1
    if done {
      text-decoration: line-through
    }
  }

  return {
    <div *base>
      <span *label_>$label_</span>
      <Icon.Checkmark/>
      <Icon.Trash/>
    </div>
  }
}
```

---

## Introduction

Trinity is a programming language designed for developing both client and server-side applications with a singular codebase that works across all platforms, without having to worry about the underlying APIs.

The goal of Trinity is to provide a small set of developer tools---language, compiler, framework, runtime and libraries---that are used together to build, develop and test applications. Trinity is, after all, a language that focuses on simplicity, flexibility and performance.

Trinity draws pieces of influence from:

- **TypeScript** for its robust type system and type checking, being the primary influence for Trinity;
- **Rust** for its speedy and friendly compiler, and its ability to compile to WebAssembly and native code.
- **Ruby** and **Python** for its short keywords, dynamic programming model and the little quirks that make them shine
- **Haskell** and **OCaml** for its evaluation order and style
- **Scala** and **Kotlin** for its classes, interfaces and traits
- **React**, **Vue** and **Svelte** for its extended HTML-like syntax to build and express complex components and views
- **Styled Components** and **SCSS** to add dynamic styling while keeping everything in sync with the underlying CSS
- **GraphQL** and **SQL** for its query language and data modelling features

<small>

#### Disclaimer:

Trinity is currently still in its conceptual and experimental stage, as the creator is experimenting on the language's grammar. This document mainly serves as a guide to the its design, and will touch a bit on the implementation.

</small>

---

# Trinity's language guide

This document is an informal guide to the language's design, structured in a way that you can read from anywhere and still understand. It describes Trinity in terms of its default and (currently) only syntax: its written form as source code.

This is not a complete reference or a tutorial, but rather something you consult if you have any questions about the language. We will introduce bits and pieces of the core Trinity language and its syntax as we go.

## Hello World!

```coffee
// Backend
mod App {
  proc main: void {
    print "Hello, world!"
  }
}

// Frontend
elem App {
  // Automatic returns
  <div>
    <h1>Hello, world!</h1>
  </div>
}
```

## Statements

### Curly brackets

Like C#, Java, Scala, Kotlin, Rust, Go and JavaScript, Trinity is a free-form, curly-bracket language. This means code is grouped by curly brackets, statements are separated by semicolons, and expressions are separated by commas.

Trinity makes every one of these things optional. This means that you can use a mix of indentation and curly brackets in varying degrees to make your code more readable.

Parentheses are also optional in function calls, but they are used to group expressions.

```coffee
print sys.inspect object == print(sys.inspect, object)
fn(x + 3) x - 3 == fn(x + 3, x) - 3

// Call named arguments with slashes
print(x, name, /sep = "\n")
print x name /sep "\n"
```

### Comments

Comments are the same as in JavaScript, though they are usually ignored. Documentation comments are not ignored, but are gathered by the compiler to produce a documentation tree to allow future developers using your software to easily find documentation, even at the convenience of their own editor.

```coffee
// This is a single line comment.
/*
  This is a multiline comment.
  /* It can be nested. */
*/

/// This is a single line documentation comment.
/**
  This is a multiline documentation comment
  /* It can be nested. */
*/
```

### Variables

Mutable variables are declared with the `var` keyword and immutable variables with the `val` keyword.

All variables are block-scoped and are accessible from the entire scope they are declared in, but not outside. Once you declare a variable in one place, you cannot use it in another.

You cannot override declared variables.

```coffee
val x = 42
val y: int = 42

var y1 = y // mutable
y1 += 1
y1 = 3
```

#### Scoping

The last line of a code block is automatically returned. If you want the block to return early, you can use the `return` keyword.

```coffee
val x = do {
  val part1 = \Hello
  val part2 = \World
  "$part1 $part2"
}
```

#### Type annotations

When you create a new variable or function, you can explicitly specify its type. This is useful for type-checking, and for making your code more readable.

```coffee
var x: int = 42
var y: str = "Hello"
var z: bool = true
```

You can also use type inference to infer the type of a variable, however use it in moderation if you want your code to be less verbose.

```coffee
var johnDoe: Person = Person("John", "Doe")
```

### Identifiers

### Identifiers

Identifiers in Trinity can be any string of letters, decimal digits, marks, underscores and dashes, with the following restrictions:

- begins with a letter
- does not end with one or more trailing dashes.

Any Unicode character with class `Pc`, `Pd`, and `M` is considered a 'underscore', 'dash' and 'mark' respectively. That means, an identifier is any string of said characters that match the regular expression below:

```coffee
val regex = `\b[\pL\pPc][\d\pL\pM\pPc\pPd]*\b`
```

Two identifiers are considered equal if the following method returns true:

```coffee
fun cmpIdent(a: str, b: str): bool = normalize a == normalize b

fun normalize(ident: str): str {
  var ret = ident[`[^\pL\d]` ``]
  ret = ret[`\b.*(?!\pL)`] + ret[`\pLl.*\b`].lower!
  return ret
}
```

That means only the first non-lowercase letters are compared, and all non-alphanumeric characters are ignored. The rest of the identifier is are compared in a case-sensitive manner. Other letters are compared case-insensitively within the ASCII range and underscores are ignored.

```coffee
"WILDFire" == "WILD_Fire" == "WILD-Fire"
"WILDFIRE____" == "WILDFIRE"
"wildFire" == "wildfire" == "wild_fire" == "wild-fire"
```

This rather unorthodox way to do identifier comparisons is called **partial case-insensitivity** and has some advantages over the conventional case sensitivity.

It allows programmers to use their own preferred spelling style without having to remember the exact spelling of an identifier.

The exception with respect to the first few letters allows common code like `var foo: Foo == FOO` to be parsed unambiguously.

Note that this rule does not apply to keywords, which are all written in all-lowercase.

### Keywords

Keywords are special tokens in Trinity and are not allowed as variable names. They are used to denote special constructs, such as functions, classes, and control structures, and are distinguished from identifiers.

Some keywords are unused, such as `mark` and `defer`; they are reserved for future developments of the language. The following is a list of all keywords in Trinity:

```coffee
in of as is new
to til thru by del
unset ref and or xor not
var val fun func proc type
class data enum mod
iter macro inter obj
trait style elem prop mark
go defer do from where with
if elif else then def
for each loop while
try throw catch after
match case fail goto pass
break next redo retry
return yield await label
use show hide route
debug assert check

// Special variables
true false null nan void infin
it this that self args ctor proto
```

Because of how identifiers are compared, you can use any number of trailing underscores to escape a keyword to turn it into an identifier.

```coffee
var var_ = "Hello Stropping"

type Obj = {
  type_: int
}

val object_ = Obj(type_: 9)
assert object_ is Obj
assert object_.type == 9

var var_ = 42
val let_ = 8
assert var_ + let_ == 50

const assert_ = true
assert assert_
```

Keywords become identifiers when part of a qualified name, such as `x.for` or `y::loop`.

## Data types

Trinity comes with many common data types, such as strings, numbers, booleans and regular expressions. These are all defined in the `core` library.

```coffee
void: void // void
null: null // null
1: int // 64-bit integer
1.0: float // 64-bit integer
true: bool // boolean
:sym: sym // symbol
"hello": str // string
`hello`: regex // regular expression

/* Data structures */
[1, 2, 3]: list<int> // list
[1, 2, 3]: [int, int, int] // tuple
{1, 2, 3}: set<int> // set
{a: 1, b: 2}: dict<str, int> // dictionary
```

## Built-in data types

Trinity comes with literals for many familiar and new primitive types such as `str`, `int`, `float`, `bool`, `list`, `set`, `map` and more, such as `fn`, `sym` and `regex`.

### Null

The `null` type is used to represent the absence of a value, similar in other languages. It only has a single value:

```coffee
null
```

You can also use `void`, they are conceptually identical.

### Booleans

`bool` has only two possible values: true and false. They are constructed using the following literals:

```coffee
true
false
```

### Integers and Floats

There are four integer types: `int`, `nat` which are signed/unsigned 64-bit integers, and their arbitrary-precision `big` counterparts.

An integer literal is a sequence of digits and underscores, optionally followed by a type suffix. All numbers are case-insensitive except their suffixes which are ordinary identifiers.

```coffee
1 // int
1 // int
1u // nat
1u // int
1u // int
1u // int

18446744073709551616 // bigint
18_446_744_073_709_551_616 // bigint
```

Underscores and leading zeroes can be used to make numbers more readable, and both are ignored. The following are all equivalent:

Binary, octal and hexadecimal literals are also supported.

```coffee
decimal = 11256099
hex = 0xABC123
octal = 0o52740443
binary = 0b101010111100000100100011
```

### Rationals

A floating point literal begins like an integer literal, then followed by a dot, followed by more numbers or underscores, followed by an optional exponent suffix, followed by an optional type suffix.

Binary, hexadecimal and octal floats are also supported, though you would use the `p` suffix for exponents, and the base is 2, rather than 10.

```coffee
decimal = 11256099.012e+14
hex = 0xABC1234.012p-40
octal = 0o52740443.012p-40
binary = 0b10101011110.0000100100011p-40
```

Floating point numbers are inherently rational.

There are four rational types: `float` which is a IEEE binary64 type, and `rat`, which is a pair of one signed and one unsigned integer. Both have their arbitrary-precision `big` counterparts. Rationals have a compulsory `r` suffix while floats do not.

```coffee
1.0  // float
1.0f // float
1f   // float
1r   // rat

1.0n  // bigfloat
1.0fn // bigfloat
1fn   // bigrat
1rn   // bigrat
```

### Strings

A string literal is enclosed using either single or double quotes. Double quotes support escape sequences, while single quotes do not. Strings can span multiple lines by default.

To escape a single quote, double it.

```coffee
val marioSays = 'It''sa me, Mario!'

val greeting = "Hello world!"
val multilineGreeting = "Hello
  world!"

assert "hello\nworld" == multilineGreeting
```

A trailing backslash in a double quoted string joins the next line, ignoring all indentation.

```coffee
assert "Hello \
  world!" == "Hello world!"
```

Strings can be delimited using multiple quotes of the same type, as long as they begin with at least three quotes. The string ends with the furthest set of quotes, if the strings ends with more than the number of opening quotes.

In multi-quoted strings, all starting/ending whitespace before the first/last non-whitespace character is removed. All indentation is stripped based on the first line.

```coffee
val greeting = """
"
Hello World!
"
"""
```

Most of the escape sequences in JavaScript and other languages are also supported in Trinity. Any other character following a backslash is interpreted as the character itself.

| Escape Sequence | Meaning                                        |
| --------------- | ---------------------------------------------- |
| `\p`            | platform specific newline (`\r\n`, `\n`, `\r`) |
| `\r`            | carriage return (`\x9`)                        |
| `\n`            | line feed (or newline) (`\xA`)                 |
| `\f`            | form feed (`\xC`)                              |
| `\t`            | horizontal tabulator (`\x9`)                   |
| `\v`            | vertical tabulator (`\xB`)                     |
| `\a`            | alert (`\x7`)                                  |
| `\b`            | backspace (`\x8`)                              |
| `\e`            | escape (`\xB`)                                 |
| `\s`            | space (`\x20`)                                 |

A backslash followed by as many decimal digits denotes a code point written in decimal.

```coffee
"\33" // => "A"
"\83" // => "S"
"\10" // => "\n"
"\0"  // null char
```

Escapes with other bases are also allowed.

```coffee
decimal = "\11256099"
hex = "\xABC123"
octal = "\o52740443"
binary = "\b101010111100000100100011"
```

The same `\b`, `\d`, `\o` and `\x` escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces.

```coffee
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

Double quoted literals allow you to insert multiple multilingual, math, symbol or other Unicode characters as LaTeX-style expressions without having to type them yourself. Only `\j` requires curly brackets.

```coffee
"\j{\emoji:smile}" # => 😀
"\j{\frac{\sum{i=1}^{n}\left(\frac{1}{i}\right)}{n}}"
```

In single quotes, meta-characters such as `'`, `$`, `%` and `#` are doubled in order to be escaped (literal). In double quotes, you can use the backslash to escape them.

### Interpolation

Both types of strings support interpolation with `${}`, which is a way to embed variables. The braces can be omitted if the expression is any combination of the following:

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `[][1]`
- a function call: `fn()`
- and any combination of the like

By default, all embedded expressions are converted to strings by passing it through the `str` method and concatenating the resulting string. You can override this behaviour by using the construct `ident'string'` instead.

```coffee
val greeting = "Hello $name!"
val greeting = "Hello ${name}!"
val greeting = "Hello $name.toUpperCase()!"
```

#### Formatting directives

Format directives are used to transform a value into a string using the built-in `format` method. Each directive begins with a percent sign, and then a series of flags separated by pipe characters, and an optional value after the colon.

```coffee
"Hello ${"world"}"
"Hello ${"world"}%upper" // => "Hello WORLD"
"$1234567890%sep:{','}|sep:{id + 1}" // => "1,234,567,890"
"Percentage correct answers: \
  ${correct / total}%dp:2|unit:('%')"
```

### Template strings

You can create template strings by using the `#` character to mark placeholders in a string. The arguments can be named, as in `#name`, or positional, as in `#0` or `#-1` (negative indices count from the last).

```coffee
val greeting = "Hello #0!"
greeting "World" // => "Hello World!"
```

You can also spread arguments into the string by using the `*` operator, and mark them as optional by using the `?` operator.

#### Backslash strings

Strings can be written with a preceding backslash instead of quotes. Backslash strings can't contain punctuation or symbol characters, nor whitespace, those have to be escaped as well.

```coffee
\this\ is\ awesome
[\look\ ma\,\\no\ quotes\!]
{prop: \word}
```

#### Accessing and modifying strings

Retrieve a value from the string by using subscript syntax, passing the index of the value you want to retrieve within postfix square brackets. You can also use negative indices to access characters from the end of the string.

The range of integers you want to retrieve is always `-l < 0 <= l` where `l` is the length of the string.

```coffee
'hello'[0]   // => 'h'
'hello'[1]   // => 'e'
'hello'[2]   // => 'l'
'hello'[3]   // => 'l'
'hello'[4]   // => 'o'
'hello'[5]   // => ''
'hello'[-1]  // => 'o'
'hello'[-2]  // => 'l'
'hello'[-3]  // => 'l'
'hello'[-4]  // => 'e'
'hello'[-5]  // => 'h'
'hello'[-6]  // => ''
```

You can slice from the beginning or end of the string, using a notation `start,end,step`. All elements are optional, and default to `0,l,1` where `l` is the length of the string.

```coffee
x = "Hello"
x[0]      // 1st character
x[1]      // 2nd character
x[-1]     // last character
x[-2]     // 2nd-to-last character
x[1,]     // all except the 1st
x[,-1]    // all except the last
x[1,-1]   // all except the last
x[-2,1]   // all except the last 2
x[,]      // copy the entire string
x[,0]     // empty string
x[,,-1]   // reverse the string
x[,,2]    // skip over every 2nd character
x[,,3]    // skip over every 3rd character
```

### Regular expressions

Similar to block strings and comments, Trinity supports block regular expressions, denoted by backticks: `` ` ``---these are extended regexes that ignore whitespace, newlines, and can contain comments and interpolation.

They go a long way towards making complex regular expressions readable.

```coffee
`^(http|ftp|https)://([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$`
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] `]`

// match a hexadecimal integer
`
  \b
    (0x)          // prefix
    \h [\h_]*     // integer part
    (\.)?         // decimal point
    [\h_]*        // fractional part
    (?:           // exponent part
      (p)         // delimiter
      ([+-])?     // sign
      ([\d_]+)    // mantissa
    )?            // type suffix
    ([\p{Pc}\p{L}][\w\p{Pd}]*)?
  \b
`xi
```

Protea uses the [Oniguruma](https://github.com/kkos/oniguruma/blob/master/doc/RE) regular expression flavor by default, the same regex engine that powers Ruby and PHP7, with a few key extensions that make your regexes more concisene and less repetitive.

The delimiter `` ` `` must be escaped inside the top level of regular expressions. Interpolation and formatting also applies but the interpolated result is usually escaped so to prevent generating invalid regular expressions.

#### Basic Syntax

```coffee
`\`` // escape a meta-character
`|` // alternation
`&` // join operator
`()` // group
`[]` // character class
`{,}` // repetition
`[^]` // negated character class
`''` // quotation
`""` // double quotation
`.` // wildcard
`\1` // numeric back-reference
`\k<name>` // named back-reference
`\g<name>` // subroutine

(* applies also to string literals *)
`$n ${}` // interpolation
`#name #{}` // placeholder argument
`%n` // Formatting

`^` // beginning of line
`$` // end of line
`\b` // word boundary
`\B` // non-word boundary
`\A` // beginning of string
`\Z` // end of string
`\z` // end of string
`\G` // end of last match
`\K` // keep last match

`*` // zero or more
`+` // one or more
`?` // zero or one
`{2}` // exactly 2
`{2,}` // 2 or more
`{2,3}` // 2 to 3

`**` // greedy
`*?` // lazy
`*+` // eager
```

#### Escapes

```coffee
// control characters: same as in string literals
`[
  \a \b \e \f \n \r \t \v
  \ca \cz \ma \mz
]`

// do note `\a` and `\b` mean something else outside []

// multi-escapes
`[\x00-\xFF] [\u0000-\uFFFF]` // hexadecimal
`[\0-\65535]` // decimal
`[\b0-\b1111111111111111]` // binary
`[\o0-\o177777]` // octal
```

#### Character classes

```coffee
`\s \S` // whitespace
`\d \D` // digit
`\w \W` // word
`\h \H` // hex digit
`\u \U` // uppercase
`\l \L` // lowercase
`\q \Q` // punctuation and symbols
`\j \J` // special characters
`\O` // any character
`\X` // any character

`\t \r \n \f \v` // control characters
`\T \N \F \V` // control characters

`\c \C` // first character of identifier
`\i \I` // remaining characters of identifier
`\x \X` // extended grapheme cluster
`\p \P` // grapheme cluster
`\R` // platform-independent newline

`\s` // whitespace
`\S` // non-whitespace
`\d` // digit
`\D` // non-digit
`\w` // word character
`\W` // non-word character
`\h` // horizontal whitespace
`\H` // non-horizontal whitespace
`\v` // vertical whitespace
`\V` // non-vertical whitespace

`\p{name}` // Unicode property
`\P{name}` // Negated Unicode property
`\X` // hexadecimal digit
`\cX` // control character
`\CX` // control character
`\N{name}` // Unicode character name
```

### Lists

Lists are written with square brackets, and whose elements are separated by newlines. They can contain any type of value. They can be nested, and can be empty.

```coffee
val list = ['hello', 'world', 'how are you']
```

The type of a list is written in full as `list<type>`, `list type` or `[]type`.

```coffee
val list1: []int = [10, 20, 30]
val list2 = ['a', 'b', 'c'] // is []str
[] // an empty list
```

## Top-level declarations

A top-level declaration appears on the top-level or outermost scope of a file. It can be one of the following:

- A declaration, like `val x = 42`, or `struct type Optional a = None | Some a`.
- A `use` clause, like `use base` or `use math.sqrt`.

### Declarations

Declarations define program entities like variables or functions.

Each declaration can be preceded with a number of _modifier_ keywords which can be placed to the left of said keyword, which change or control the behavior of the declaration.

`=` is the declaration operator and is used to separate the name from its definition, as opposed to `=` which is assignment.

```coffee
val x = 1
mut val x = 1
```

All declarations are immutable, private and block-scoped by default. To make them public or visible, use the `pub` or `show` keyword; to make them mutable, use the `mut` keyword.

```coffee
val x = do
  val part1 = 'Hello'
  val part2 = 'World!'
  part1 + part2
// part1 and part2 are not accessible outside this block
```

## Hello World!

```coffee
print 'Hello World!'
// or
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
// sum types
type Optional x = None + Some x

// product types
type Pair x = x * x
type Triple x = x * x * x

// set types
type Union x = x | x
type Intersection x = x & x
type SymmetricDifference x = x ^ x
type Difference x = x - x

// nullable/optional types
type Nullable x = ?a
type Optional x = ?a

// tuple types
type Tuple x y = (x, y)

// list types
type List x = []x
// set types
type Set x = :{}x
// hash types
type Hash x y = {x : y}

// record types
type Rec x y = {x : y}
type RecOnly x y = {x : y}

// function types
type Fn a b = a -> b
type Fn2 a b c = a -> b -> c

// type operations on objects
type TypeOf a = type a
type ValuesOf a = val a
type KeysOf a = key a
type AttributeOf a b = a attr b
type MethodOf a b = a attr b & a is fn
```
