# Trinity

> One language, three aspects.

Trinity is an optionally typed, compiled, multi-paradigm and multi-faceted programming language implemented in JavaScript, enabling one to build reliable and fast-performing software for web, desktop and mobile; for the frontend, API and backend.

The language is very similar to Go, Swift, Kotlin or Scala, tied with a unified, comprehensive and clean API with minimal abstractions. These powerful features and APIs are supported out of the box, providing (almost) everything you need to develop modern applications that don't crash, quicker and safer.

```dart

```

### Roadmap

> Update: I have a [Trello](https://trello.com/b/A3NDX7qY/trinity-programming-language) now!

- **Grammar** (see [`grammar.yaml`]())
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

## Overview

Trinity is a statically typed compiled programming language designed to build reliable software for the frontend, backend and middle-end; for the web, desktop and mobile. It's very similar to languages of the JVM such as Kotlin, Rust, Go and Swift and also influenced by Scala, Flix, TypeScript, ReScript, and Fantom.

Trinity gives the developer a lot of power, all with an easy syntax, and a clean, consistent and comprehensive API. The language promotes writing simple and clear code with minimal abstraction. Anything you can do in other languages, you can do in Trinity.

[wtfjs]: https://github.com/denysdovhan/wtfjs/

## Trinity's Origins

Trinity started out as a simple concept to bridge the gap between Python and JavaScript in a hybrid language, though sharing most of the concepts from modern JavaScript. Now over almost a year of iteration and tinkering the language had poured in tons of influence from other languages like Scala and Kotlin.

This project is currently in the works and would be my largest project to date. I will be posting a Trello on my development of Trinity very soon, and I'm looking forward for anyone out there to contribute; fork this repo, and pull your changes to this repository: https://github.com/nxltm/trinity-lang.

## Standard Library

<style>table{table-layout:fixed;width:100%;}</style>

<table><tr><td valign=top>

#### [Introduction](./Introduction.md)

</td></tr></table>

## Table of Contents

<table><tr><td width=25% valign=top>

#### Introduction

- [Overview](#./)
- [Installation](#)
- [The Basics](#)
  - [Variables](#)
  - [Syntax](#)
  - [Comments](#)
  - [Keywords](#)

#### Data Types

- [Integers and Floats](#)
- [Strings](#)
  - [Quoted Strings](#)
  - [Raw Strings](#)
  - [Slicing and Splicing](#)
- [Booleans](#)
- [Null and Void](#)
- [Collections](#)
  - [Lists/Tuples](#)
  - [Sets](#)
  - [Maps/Dictionaries](#)
  - [Sequences](#)
  - [Destructuring](#)
- [Other Data Types](#)
  - [Regular Expressions](#)
  - [Buffers](#)
  - [Functions](#)
  - [Symbols](#)

#### Control Flow

- [Basic Block](#)
- [Conditionals](#)
- [Loops and Ranges](#)
- [Switch](#)
- [Pattern Matching](#)
- [Error Handling](#)
- [Query Expressions](#)

</td><td width=25% valign=top>

#### Functions

- [Functions](#)
- [Closures](#)
- [Inline and Named Functions](#)
- [Anonymous and Higher-Order Functions](#)
- [Currying](#)
- [Recursion](#)
- [Function Piping](#)
- [Generators](#)
- [String Macros](#)

#### Classes

- [Introduction](#)
- [Constructors](#)
- [Methods and Attributes](#)
- [Access Modifiers](#)
- [Getters and Setters](#)
- [Symbols](#)
- [Traits and Fragments](#)
- [Constraints](#)
- [Objects and Records](#)
- [Advanced Modifiers](#)
- [Extensions](#)

#### Types

- [Introduction](#)
- [Any, Mixed, Void/Unit, Empty](#)
- [Optional Types](#)
- [Function Types](#)
- [Collection Types](#)
- [Type Combinatorics](#)
- [Conditional Types](#)
- [Enumerations](#)
- [Sum and Product Types](#)
- [Generics and Variants](#)
- [Type Aliases](#)
- [Infer, Key-Of, Name-Of](#)
- [Constraints (For-All)](#)

</td><td width=25% valign=top>

#### Concurrency

- [Channels](#)
- [Series and Parallel Blocks](#)
- [Async-Await](#)
- [Callbacks and Futures](#)

#### Modules

- [The Module System](#)
- [Imports and Exports](#)
- [Python and JS Modules](#)
- [Calling Python and Node.JS Code](#)
- [Managing and Publishing Packages](#)

#### Advanced Topics

- [More on Types](#)
- [Domain-Specific Extensions](#)
  - [Macros and Procedures](#)
  - [Inline and Using Modifiers](#)
  - [Operators and Overriding](#)
  - [Control Flow](#)
  - [Reflection API](#)
  - [Extending Built-Ins](#)
- [Text Processing](#)
  - [String Library](#)
  - [Regex Flavors, Compared](#)
- [Internationalization](#)
  - [Date and Time](#)
  - [Currency](#)
  - [Math](#)
- [File System](#)
  - [Reading and Writing Files](#)
  - [Languages and Markup](#)
- [Embedded Languages in Action: A React Example](#)
- [Debugging and TDD](#)
- [Conditional Compilation](#)
- [Language Interop](#)
  - [Translating Python/JS to Trinity](#)
  - [Translating Trinity to Python](#)
- [Documentation](#)

</td><td width=25% valign=top>

#### Tools

- [Nifty, Trinity's Formatter](#)

#### Standard Library

> \* Far future

- [Test-Driven Development](#)
- [File System and I/O](#)
- [Serialization](#)
- [Collections](#)
- [Text Processing](#)
- [Internationalization](#)
- [NLP and ML](#)
- [Mathematics](#)
- [Cryptography](#)
- [Science\*](#)
- [Data Analysis\*](#)
- [Reactive Programming](#)
- [Asynchronous Programming](#)
- [Functional Programming](#)
- [Object-Oriented Programming](#)
- [Markup and Styling](#)
- [Frontend and Backend](#)
- [Domain-Specific Extensions](#)

#### Appendices and References

- [Keywords and Modifiers](#)
- [Operators & Precedence](#)
- [Regex Language](#)
- [Format Language](#)
- [J-Expression Language](#)
- [CLI Reference](#)

</td></tr></table>

## A Tour

Trinity is a relatively new programming language which allows users to write easy-to-read high-performance code. This is a work-in-progress: if you spot any errors and/or you have an idea how to make this tutorial better, please report it as an issue on GitHub at [this repository](https://github.com/nxltm/trinity-lang).

### Overview

The Trinity language derives from a combination of Scala and Swift inspired syntax, plus ML and Node/JavaScript inspired semantics.

This document provides an overview of the syntax, operations, and semantics in the Bosque language with an emphasis on the distinctive or unusual features in the language. as well as a comprehensive guide to the modules in Trinity's Standard Library.

### Tokens and whitespace

The characters used in Trinity fall into four groups:

- White space characters
- Alphanumerics: letters, digits, combining punctuation and underscores
- Operator characters (other printable characters excluding below)
- Punctuation: `` (){}[],;\'"` ``

Each token consists of a sequence of consecutive characters from just one of those groups, excluding whitespace. Whitespace is ignored except they separate tokens.

A sequence of alphanumeric characters, with no additional non-alphanumeric characters, is a single token. White-space must be used to separate two such tokens in a program. The same thing goes for operators.

The parser treats operator tokens much like identifiers and use the immediately surrounding context (whitespace, alphanumerics and punctuation) to determine if the operator should be parsed as a _prefix_, _suffix_, _infix_ or _primary_. Prefix and suffix, i.e. unary operators, are parsed character by character, whereas infix and primary operators are parsed as a single token.

- Primary operators are surrounded by punctuation or alphanumerics on either end. Multiple characters are captured. The multiple pluses in `x++++x` is a single primary operator.
- Suffix operators are surrounded by any punctuation or alphanumeric on the left side, and whitespace, any closing bracket, comma or semicolon on the left side. The pluses in `(1+,1+)+` are all suffix operators.
- Prefix operators are surrounded by any punctuation or alphanumeric on the right side, and whitespace, any opening bracket, comma or semicolon on the left. The pluses in `+(+1,+1)` are all prefix operators.
- Infix operators are surrounded by whitespace on either side. The double plus in `1 ++ 1` is an infix operator.

In summary, except for required white space between alphanumeric tokens, adding white space between tokens or removing white space can never result in changing the meaning of a Dafny program. For the rest of this document, we consider Dafny programs as sequences of tokens.

### Syntax

Trinity derives most of its syntax from JavaScript, so all code blocks are delimited inside curly brackets.

```dart
class Person(val firstName: Str, val lastName: Str) {
  def printFullName() { print "$firstName $lastName" }
}
```

Semicolons can be used to separate two or more expressions ont he same line. The next line is joined to the previous if the current line ends with an infix or primary operator, or the next line begins with one.

In these two scenarios, the next line is joined to the previous.

```dart
x in arr

x in
arr //= x in arr

x
in arr //= x in arr

x
.push(i)
```

#### Comments

Trinity borrows its comments from D. Line comments start with `//` and go until the end of the line. Block comments begin with a `/*`, and end `*/`. Nested block comments begin with `/+` and end in `+/`.

```dart
// line
/* block */
/+ nested block /+ +/ +/
```

Documentation comments are special forms of comments which are all used to generate API documentation. All forms of comments have support for Markdown-based formatting.

```dart
/// JSDoc line
/** JSDoc block */
/++ JSDoc nested block /++ +/ +/
```

#### Identifiers

Identifiers can begin with a letter or "underscore". Other characters include digits and diacritics. In simpler terms:

```dart
var identifier = `[\pL\pPc][\pL\pM\pNd\pPc]*`
```

For JSX tags, identifiers can also include dashes, but an identifier should not end with a trailing dash.

```dart
var identifier = `[\pL\pPc][\pL\pM\pNd\pPc\pPd]*(?!\pPd+)`
```

Naming conventions follow Java or JavaScript. There are four types of identifiers which Trinity recognizes and highlights accordingly:

- `SHOUT_SNAKE_CASE`, used for constants,
- `PascalCase` used for classes, modules, namespaces, and types.
- `camelCase` or `snake_case` used for variables, parameters, functions and methods.
- `_leading`/`trailing_` underscores for special methods and keywords.

Variables are compared using their first character, then comparing further characters case-insensitively and ignoring all combining marks and punctuation. This makes it easier for developers to use varying conventions without having to worry about the variables' exact spelling.

```dart
def cmpIdent(a: Str, b: Str): Bool =>
  a[0] == b[0] &&
  a.sub(`[^\pL\d]+`g, '').lower() = b.sub(`[^\pL\d]+`g, '').lower()
```

#### Keywords

The following regular expression denotes all the keywords of the language, including those used for declarations, such as `var`.

Keywords are grouped into three:

- expression, or "operator" keywords such as `1 to 10` or `x in arr`;
- declaration keywords such as `var`, `def` and `elem`;
- clause keywords such as `if` and `return`.

```txt
in of as is out new infer unset
typeof nameof sizeof
keyof valueof pairof instof
len del to til till thru by

var val let set get const def fn fun func
class enum module pkg inter struct object record
frag space data trait proto proc macro type given
raw style compo elem decl ext impl sub met pred

if lest elif elest else then
for each loop while until from with
do redo try retry throw catch finally
switch case default match when otherwise
unison series spawn kill fix lock
break continue return await label yield goto
import export impose expose using
debug check assert fallthru
```

## Variables

[block scope]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block

Trinity has four types of variables, all of which are [block-scoped][block scope]. Immutable means cannot be reassigned.

```dart
val _val = 1 // immutable BUT NOT overridable
set _val = 1 // immutable and overridable
var _val = 1 // mutable BUT NOT overridable
let _val = 1 // mutable and overridable
```

The keywords `set` and `let` behave like `var` and `val` respectively, but you can redefine `set` and `let` fields in the same block, overshadowing them. So you can write this too:

```dart
set a = \a
set a = \b // a is now \a
let a = \c // a is now \c
```

You cannot shadow (override) a `var` or `val`. If you want shadowing behavior, use the keywords `let` or `set`.

```dart
val a = 1
do {
  set a = 2
  print(a) //! Error: a already declared
}
print(a) //= 1
```

You don't need to explicitly specify the types of each variable, the compiler is smart enough to infer them for you:

```dart
val s = 'Hello World!' // s is a `str`
```

You can also explicitly declare the variable type if you think it makes your code easier to read. All types are declared in `PascalCase`. If you're working with third-party libraries, you can and should use explicit type annotations.

> Type annotations are actually literals.

```dart
val s: Str = "hello"
var i: Int = 42
val c: Sym = Sym'$i' 
```

Use `:=` instead to set a property on an object or data structure as opposed to a variable.

```dart

let ct = #{} // A mutable map
ct.foo := 42 // ct == #{foo: 42}
let ct = {}
ct = ct.foo := 42 // ct == {foo: 42}
```

Uninitialized variables that have a nullable type (`?x`) have an initial value of `null` and are explicitly stated.

```dart
var lineCount: ?Int
assert lineCount == null
```

The `assert` statement in production code is generally ignored, but would throw an error during development if its condition is not satisfied.

You must initialize the values of non-nullable variables before you use them:

```dart
var lineCount: Int = 0
```

You don't have to initialize a local variable where it's declared, but you do need to assign it a value before it is then used.

```dart
let ct
for x in 1 to 10 then ct = x
print ct
```

## Data Types

Trinity supports the same primitive literals as most other languages, including those from higher-level scripting languages.

- Numbers (`Int`, `Nat`, `Float`)
- Strings (`Str`) and Runes (`Rune`)
- Booleans (`Bool`)
- Lists (`List`), Sets (`Set`) and Maps (`Map`)
- Symbols (`Symbol`)
- Types (`Type`)
- The value null (`Null`)

Several non-primitives also have literals:

- Arbitrary precision numbers: `BigInt`, `BigNat`, `BigFloat`
- Duration (`Duration`); date and time (`DateTime`)
- Regular expression (`RegExp`)
- Function (`Func`)
- Mutable lists/sets/maps (`MutList`, `MutSet`, `MutMap`)

Because everything is an object, you can use constructors to initialize variables. You can also use these built-in constructors to cast things from one type to another.

For example, you can use the `Map()` constructor to construct a map from a string.

```dart
null; void // null and undefined
true; false // boolean
16777216 // integer
1^+40 // integer with exponential part
1_10011_101 // integer, can use _ as separator
1:u // unsigned integer
0b0; 0q0; 0s0; 0o0; 0z0; 0x0 // base 2, 4, 6, 8, 12, 16
1.1:i32 // with type suffix
1.1*1 // with repeating block
1.1=1 // with significant figures
nan; infin // special float constants
"Hello\nWorld" // escaped string
'C:\Windows' // raw string
\string // backslash string
\| // raw block string
\> // escaped block string
''; ""; \ // empty string
`(?:)` // regular expression
\< // block regex
<div>Hello World!</div> // JSX
[0, 1, 2] // list
{1, 2, 3} // set
{1: "one", 2: "two", 3: "three"} // map
:symbol // symbol
: Type // type
|x, y| x + y // function
```

### Null

`Null` is a single value used to represent the absence of a value. Same for `void`. `null` is equal to `void` by value, but not by reference.

`void` compiles to JS `undefined`, `null` compiles to its JS counterpart.

```dart
null == void //= true
null === void //= false
```

You would use `null`

### Booleans

A boolean (type `bool`) can only have two values: `true` or `false`. Booleans are mainly used for control flow, and there are a lot of operators that return boolean values.

```dart
true
false
```

### Numbers

Trinity supports both integers, signed and unsigned, as well as floating-point numbers in various sizes (default being 64 bits). Unsigned integers have the `:u` or `:U` suffix (note the colon) while floating point numbers have a decimal point.

All numeric literals are case-insensitive. numbers can include underscores or leading zeroes.

```dart
val myInt: Int = 123 // or +123
val myNat: Nat = 123:U
val myFloat: Float = 1.0
```

Numbers can be suffixed with a suitable type, after the colon `:`, and it would be cast to the appropriate type. The type suffix itself is case- and style-insensitive.

```dart
assert 4.0:f32 is F32
```

Different radix literals can be created using prefixes `0b` (base 2), `0q` (base 4), `0s` (base 6), `0o` (base 8), `0z` (base 12) and `0x` (base 16).

```dart
val base2 = 0b101010111100000100100011
val base4 = 0q320210213202
val base6 = 0s125423
val base8 = 0o52740443
val base10 = 11256099
val base12 = 0z10a37b547ab97
val base16 = 0xabcdef123
```

Repeating digits are specified with the `~` sign, followed by the number of digits after the decimal point with `=`.

Floats can also be created from special 'fractional' literals, meaning the numerator goes on the left and the denominator on the right, with the numerator taking on the prefix. Both the numerator and denominator should be integers; `4.1/4` is invalid.

```dart
assert 1.*3 == 4/4
```

Exponents are delimited with a caret `^` and are relative to the base, in the form `^power` where power is a integer with an optional sign; `1^+10` or `1^10` evaluates to `1 * 16 ** 10`.

Override this behavior using `*base^power` instead, where both `base` is a positive integer in base 10.

```dart
assert 0x1^10 == 1 * (16 ** 10)
assert 0x1*10^10 == 1 * (10 ** 10)
```

Any numeric literal containing `/`, `*`, `=`, `^`, `~` or `.` in any combination is considered a floating point.

We also provide a multi-base numeric literal, where the digits themselves are separated with underscores and written in base 10.

```dart
assert 0xdead_beef == 16b13_14_10_13__11_14_14_15
```

Special float constants involve `nan` (not a number) and `infin` (infinity).

```dart
nan
infin
```

Numbers have the grammar:

```dart

```

### Strings

Strings are delimited by matching single or double quotes, and can span multiple lines. Double quoted strings can have escape sequences precede by a backslash, while single quoted strings are _"raw"_, meaning any escapes are not parsed.

```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It''s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

Multi-quoted strings begin with three or more quotes of the same type, and end with at least that amount of quotes.

Leading and trailing whitespace, as well as the newlines that precede or follow them are ignored.

The newlines are always normalized to `\n` regardless of how newlines were encoded in the source code text.

```dart
assert """ "multiline string"""" == '"multiline string"'
```

The first non-whitespace character of each line should be aligned to the first line of text in the string.

```dart
x = "
line1
  line2
  line3
"

x = """
    line 1
      line 2
      line 3
"""
```

Both examples compile into `"line1\n line2\n line3"`. Spacing to the right of the leading line is maintained but spacing to the left is stripped.

Double-quoted strings can contain the following escape sequences, as shown in the table below. All escape sequences are case-insensitive.

Escaped symbols and punctuation are interpreted without the leading backslash.

```dart
assert "multiline\nstring" == "multiline
string"
```

A trailing backslash (backslash-newline) joins the next line. This ignores the whitespace after the backslash and the initial whitespace on the next line.

```dart
assert "multiline string" == "multiline \
string"
```

| Escape Sequence | Meaning                                                                      |
| --------------- | ---------------------------------------------------------------------------- |
| `\p`            | platform specific newline<br> CRLF (`\x9\xA`) on Windows, LF on Unix (`\x9`) |
| `\r`            | carriage return (`\x9`)                                                      |
| `\n`            | line feed (or newline) (`\xA`)                                               |
| `\f`            | form feed (`\xC`)                                                            |
| `\t`            | horizontal tabulator (`\x9`)                                                 |
| `\v`            | vertical tabulator (`\xB`)                                                   |
| `\a`            | alert (`\x7`)                                                                |
| `\c`            | backspace (`\x8`)                                                            |
| `\e`            | escape (`\xB`)                                                               |
| `\l`            | space (`\x20`)                                                               |

Trinity also supports escapes in many bases. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

| Escape      | Meaning                                        |
| ----------- | ---------------------------------------------- |
| `\b`        | _Base 2_ - from `0` to `100001111111111111111` |
| `\q`        | _Base 4_ - from `0` to `10033333333`           |
| `\s`        | _Base 6_ - from `0` to `35513531`              |
| `\o`        | _Base 8_ - from `0` to `4177777`               |
| `\d` or `\` | _Base 10_ - from `0` to `1114111`              |
| `\z`        | _Base 12_ - from `0` to `4588A7`               |
| `\x`        | _Base 16_ - from `0` to `10FFFF`               |
| `\u`        | UTF-8, 16 or 32 code units only                |
| `\j`        | Named Unicode characters (more later)          |

### String Interpolation

You can put the value of an expression inside a string by using `${expression}`. If the value refers to an identifier like `foo`, or a a compound identifier like `foo::bar.baz?.qux`, you can skip over the `{}`.

To get the string corresponding to an object, Trinity calls the object's `_str()` method.

> **Note**: Methods beginning with a single underscore are special methods defined on objects.

```dart
"x is $x, in hex $foo.x._hex, and x+8 is ${x + 8}"
```

is the short form for

```dart
"x is " ++
x._str() ++
", in hex " ++
x._hex._str() ++
", and x+8 is " ++
(x + 8)._str()
```

Most of the time, use the `\$` escape sequence in double-quoted strings or `$$` in single-quoted strings if you wish to express the dollar sign itself.

#### Backslash Strings

Trinity is the only language that provides backslash strings as an alternative to quoted strings, however they come with some limitations.

Single-line backslash strings can contain any character except `.,:;(){}[]` or whitespace, and do not begin with any of `<|>`. If you want them to include any of these inside a string, escape them with a backslash as you would in double quoted strings.

```dart
assert \ == '' // A single backslash is an empty string
assert \just-a-string == 'just-a-string'
assert \just\ a\ string == 'just a string'
assert \\  == ' ' // the space is escaped
```

Block strings start with either `\|` or `\>` and work very similar to their YAML counterparts. The same rules apply to block strings, but require that every line after it be indented by at least a single whitespace character, maintaining that indentation throughout.

```dart
let string = \|
  line 1
    line 2
    line 3
```

Again, spacing to the right of the leading line is maintained, but spacing to the left is stripped off in the string literal.

#### Format Strings

Formatting placeholders begin with the hash sign `#`, and directives begin with a percentage sign `%`. Format specifiers allow greater control over how the value is formatted.

> **Note**: We will go through the Format Directive Mini-Language in a later chapter.

The following example rounds pi to three places after the decimal:

```dart
print('The value of Pi is approximately $Math.PI%3f.')
//= The value of Pi is approximately 3.142.
```

The brackets and characters within them (called format fields) are replaced with the objects passed into the `Str.format()` method. A number in the brackets can be used to refer to the position of the object passed into the `Str.format()` method.

```dart
'#0 and #1'.format('spam', 'eggs') // spam and eggs
'#1 and #0'.format('spam', 'eggs') // eggs and spam
```

If keyword arguments are used in the `Str.format()` method, their values are referred to by using the name of the argument.

```dart
'This #food is #adjective.'.format(
  food = 'spam'
  adjective = 'absolutely horrible'
) //= This spam is absolutely horrible.
```

Positional and keyword arguments can be arbitrarily combined.

```dart
'The story of #0, #1, and #sideCharacter.'.format(
  'Alex'
  'Diana'
  sideCharacter = 'Scott'
) //= The story of Alex, Diana and Scott.
```

Again, you would need to escape the `%` character if the next character is a letter.

#### Regular expressions

Trinity's regular expressions are delimited in between backticks much like Go. By default, regular expressions are free-space, global and support comments and embedded code, similar to strings.

```dart
`\b{wb}(fee|fie|foe|fum)\y{wb}`
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] ]`x

`
  \/\* // Match the opening delimiter.
  .*? // Match a minimal number of characters.
  \*\/ // Match the closing delimiter.
`
```

Modifiers go on either side of the back-ticks; the right hand side toggles the global mode of that regex, while the left hand side toggles its global character sets.

> `<>` is the match operator.

```dart
assert "TRUE" <> `true`i
assert "TRUE" <> `(?i:true)`
assert "TRUE" <> `(?i)true`
```

Regexes can also include a right hand, substitution template string, beginning with two backticks ` `` ` immediately following the pattern. Here, `=<` substitutes a string with another.

````dart
val str = 'James Bond'
assert (newStr = str =< `(\w+)\W+(\w+)```) == 'Bond, James'
assert (newStr = str =< `(\w+)\W+(\w+)``My name is $1, $2`) ==
  'My name is Bond, James Bond'
````

Interpolation works in regex literals just as it does in strings, if you want to create dynamic regexes. By default, all interpolations are escaped after they are evaluated. Use the `e` flag to suppress this behavior.

```dart
let x = '[\da-z'
let invalidRe = `($x)`e //! Error: Invalid regex: unterminated character set
let validRe = `($x)``$1 $2`
assert validRe == `(\[\\da-z)`
```

### Collections: Lists, Maps and Sets

Collections in Trinity are very similar to JavaScript, but they are immutable, meaning they have fixed fields and those fields do not change. All collections are homogeneous.

- Lists are _zero-indexed_, finite sequences of values (arrays in other languages).
- Sets are _ordered_, finite collections of unique values.
- Maps are _ordered_, finite collections of unique keys assigned to their own values (also called dictionaries).

```dart
val myList: List[Int] = [1, 2, 3, 4]
val mySet: Set[Int] = {1, 2, 3, 4}
val myMap: Map[Int, Int] = {1: 1, 2: 2, 3: 3, 4: 4}
```

The type of a list, set or map is inferred from its elements.

```dart
val myMap = {a: x, b: x, 10: 2, x: 2}
assert myMap is Map[Int | Str, Int]
```

Prefix a list, map or set literal with a `#` to make the collection mutable. Mutable collections are prefixed with `Mut` to distinguish themselves from regular collections.

```dart
val myList: MutList[Int | Str] = #[1, \2, 3, \4]
myList.push(1, 2) //= #[1, \2, 3, \4, 1, 2]
```

Not much to say about lists and sets other than their elements are separated by commas (or even newlines). However, sets unlike lists are delimited between curly brackets `{}` as opposed to square `[]` ones.

Because of this conflict with both set and map literals, empty map literals have a compulsory colon to distinguish itself from an empty set. Alternatively, we can use trailing commas, which like JavaScript are ignored.

```dart
[]; [,] // empty list
{}; {,} // empty set
{:} // empty map
```

You can query (filter) lists or sets by using angle brackets. Python-style negative array indexing and extended slicing are completely supported.

```dart
[1, 2, 3][1] // second element
[1, 2, 3][-1] // last element
[1, 2, 3][1:] // elements from index 1 to end of list
[1, 2, 3][< 3] // elements less than 3

// Strings
{x: \a}.x == {x: \a}.'x' == {x: \a}.\x == {x: \a}[\x] == {x: \a}.[\x]
{+x: a}.\+x == {'+x': a}
{\t\r: false}.\\t\r == {"\t\r": false}["\t\r"]
{1: \a}.1 == {1: \a}[1]
{true: \a}[true]

// Expressions
{(+x): a}[+x] == {[+x]: a}[+x]
```

> `< 3` is an example of a _partial expression_, which would be discussed later soon.

You can use any value or expression except strings beginning with underscores or letters, which would be parsed as an unquoted string. The same rules with unquoted strings and symbols apply for map keys.

```dart
assert "a" == { a: "a" }.a
```

You can access properties on maps and objects by using angle-bracket or dot-notation; you can do this with quoted strings, numbers, symbols, regular expressions, and even more.

```dart
x.'text-align' = 'right'
x['text-align'] = 'center'

assert x?.'font-size' // Optional chaining
x!.'font-size'! // Assertion chaining

// Use angle brackets for property expressions
x['font' ++ '-' ++ 'size'] = Web.Css.px 30
```

### Symbols

In Trinity, symbols are basically an object representation of either an identifier or operator. They begin with `:` and are otherwise the same as backslash string literals except that they begin with a colon instead of a backslash.

```dart
const aSymbol: Sym.'aSymbol' = :aSymbol
assert aSymbol = Sym'aSymbol'
```

Symbols are opaque and dynamic string names that cannot be changed and remains constant throughout compile time. It can be used for reflecting the metadata on a type, such as a library or class.

### 3ML

Trinity supports an inline version of HTML markup called _3ML_. It's slightly different than JSX, ERB, HAML and other templating languages.

You can use 3ML with any framework including React, Angular or Vue, to describe what the UI in your application should look like, and for it to communicate with the underlying middleware and backend.

It's a templating language built into Trinity, and like many of Trinity's DSLs it comes with the full power of Trinity.

```dart
<iframe
  src=https://www.w3schools.com
  title="W3Schools Free Online Web Tutorials">
</iframe>
```

### Type Annotations

You can wrap any expression in parentheses and annotate it:

```dart
let myInt = 5
let myInt: Int = 5
let myInt = (5: Int) + (4: Int)
let add(x: Int, y: Int): Int = x + y
let drawCircle = |&radius = r: Int|: Circle {}
```

You can refer to a type by a different name. They'll be equivalent:

```dart
type Second = Int
let totalTime: Second = 10
```

Types can accept parameters, akin to generics in other languages. The parameters' names are defined in square brackets. The use-case of a parameterized type is to kill duplications.

```dart
type Coords[A] = [A, A, A] // [] is a tuple literal
let a: Coords[Int] = [10, 20, 20]
let b: Coords[Float] = [10.5, 20.5, 20.5]
```

Note that the above codes are just contrived examples for illustration purposes. Since the types are inferred, you could have just written:

```dart
let buddy = [10, 20, 20]
```

The type system infers that it's a `#[Int, Int, Int]`; nothing else had to be written down.

A type can reference itself within itself using `rec`:

```dart
rec type Student = {
  name: Str
  classmates: List[Student]
}
```

Types can also be mutually recursive.

```dart
rec type Student = {taughtBy: Teacher}
rec type Teacher = {students: List[Student]}
```

> `rec` above is an example of a modifier. You can also use `rec` to mark functions and methods as recursive.

### Type Operators

You can make new types by combining or manipulating existing ones. Here's some examples:

`?` marks a type as nullable (which you've seen before).

```dart
type Nullable = Null | Void
assert null is Nullable
assert false is ?Bool !: false is Bool | Nullable
```

Use `+` to combine any type to make a new hybrid type.

```dart
type Numeric = Int + Str
assert 3 is Numeric
```

Use `*` to form a compound (tuple) type, whose members are specific instances of the same type.

```dart
var Red = Green = Blue = type Int when 0x00 <= <= 0xff
type Color = Red * Green * Blue
type Color = [Red, Green, Blue]
assert [245, 232, 134] is Color
```

A type complement `~` accepts any type except for its specified type.

```dart
type NotInt = ~Int
assert '3' is NotInt
```

Use set operations `&` (intersection), `|` (union), `^` (symmetric difference) and `-` (difference) to form new object types.

```dart
type Z = {X: Int}
type X = {Y: Int}
type Y = {Z: Int}
assert ({X: 3, Y: 4, Z: 10}) is! Z ^ Y | X
```

Some types also have special roles in the Trinity language.

- `Mixed`: The superset of all value classes, except `Null`.
- `Object`: The negation of `Mixed`.
- `Any`: The top class; the superset of all classes including `Null`.
- `Never`: Indicates that an expression can never successfully finish evaluating. The bottom type.
- `Void`: Indicates that a value is never used. Used in place of `Null` to indicate a function or method never returns.
- `Future` and `Stream`: Used in asynchrony support.
- `Iterable`: Used in `for-in` loops and in synchronous generator functions.
- `Pure` or `Impure`: Indicates a function is pure or impure, meaning it has or does not have any [side effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>).

## Operators

## Control Flow

### Closures

### Conditionals

### Loops

### Error Handling

### Concurrency

### Pattern Matching

### Queries

### Modules

### Ranges and Generators

Ranges expand to sequences of numbers in an arithmetic progression, from start to end. The `to` clause includes the end of the range, while `til` or `till` excludes it.

```dart
0 to 5 == [0, 1, 2, 3, 4, 5]
0 til 5 == [0, 1, 2, 3, 4]
```

In addition, `thru` skips the start of the range.

```dart
thru 0 to 5 == [1, 2, 3, 4, 5]
thru 0 til 5 == [1, 2, 3, 4]
```

You can also specify an additional increment/decrement parameter after the range with the `by` clause. Use `by -1` to count downward. If the range is invalid, an error is raised.

```dart
1 to 10 by 2 == [1, 3, 5, 7, 9]
```

## Appendix

### Comparison to JavaScript syntax

##### Semicolons

| JavaScript         | Saga        |
| ------------------ | ----------- |
| Enforced by linter | None needed |

##### Comments

| JavaScript                 | Saga                           |
| -------------------------- | ------------------------------ |
| `// line comment`          | `# line comment`               |
| `/* block comment */`      | `#[ block comment ]#`          |
| `/** doc block comment */` | `#{ doc block comment }#`      |
|                            | `#: doc line comment`          |
|                            | `#! shebang`                   |
|                            | `#= special comment`           |
|                            | `#( shebang )`                 |
|                            | `#_( special inline comment )` |

##### Variables

| JavaScript          | Saga                |
| ------------------- | ------------------- |
| `const x = 5`       | `val x = 5`         |
| `var x = 5`         | Same                |
| `let x = 5; x += 1` | `var x = 5; x += 1` |

##### Data Types

| Type    | Default Value    | Description            | JavaScript equivalent (class) |
| ------- | ---------------- | ---------------------- | ----------------------------- |
| `nil`   | `nil`            | The constant `nil`     | `undefined`                   |
| `bool`  | `false`          | A boolean value        | `Boolean`                     |
| `int`   | `0`              | 32-bit integer         | `Number`                      |
| `float` | `0.`             | 64-bit floating point  | `Number`                      |
| `char`  | `'\0'`           | 16-bit code unit       | `String`                      |
| `str`   | `''` `""` ` `` ` | String                 | `String`                      |
| `regex` | `/ /`            | Regular expression     | `RegExp`                      |
| `func`  | `() => ()`       | Function               | `Function`                    |
| `seq`   | `(\|\|)`         | Generator sequence     | `Generator`                   |
| `bits`  | ` bits`` `       | Bit stream             | `Buffer`                      |
| `list`  | `[\|\|]`         | Ordered list           | `Array`                       |
| `set`   | `{\|\|}`         | Set                    | `Set`                         |
| `map`   | `{\|\|}`         | Hash map or dictionary | `Object`, `Map`               |

##### Strings

| JavaScript                    | Saga                                 |
| ----------------------------- | ------------------------------------ |
| `"Hello world!"`              | Same                                 |
| `'Hello world!'`              | Same                                 |
| `"hello " + "world"`          | `hello" + "world"`                   |
| `'hello'.repeat(3)`           | `hello" * 3`                         |
| `` `hello ${message}` ``      | `` `hello $message` ``               |
| `\u03B1`                      | `\h{alpha}`                          |
| `${msg.toUpperCase()}`        | `$msg:su`                            |
| `'hello'[1]`                  | Same                                 |
| `'hello'['hello'.length - 1]` | `'hello'[-1]`                        |
| `'hello'.slice(3, 4)`         | `'hello'[3:4]`                       |
| `/x/.test('next')`            | `'x' in 'next'`<br>`(/x/) in 'next'` |
| `'hello'.replace('l', 'r')`   | `'hello' =< /l/r/`                   |
| `[...hello].length`           | `len 'hello'`                        |
| `'hello'.length`              | `size 'hello'`                       |
| chalk`{blue hello world}`     | Same                                 |

##### Booleans

| JavaScript                   | Saga                                                  |
| ---------------------------- | ----------------------------------------------------- |
| `null`, `undefined`          | `nil`                                                 |
| `true`, `false`              | Same                                                  |
| `!`, `&&`, `\|\|`            | Same                                                  |
| `!x != !y`                   | `x ^^ y`                                              |
| `x && y` (short-circuit)     | `x !: y`                                              |
| `x \|\| y` (short-circuit)   | `x ?: y`                                              |
| `a ?? b`                     | Same                                                  |
| `a == null ? a : b`          | `a !! b`                                              |
| `===`, `!==`                 | `===`, `!==` (Referential)<br>`==`, `!=` (Structural) |
| `==`, `!=`                   | `=~`, `!~`                                            |
| `<`, `>`, `<=`, `>=`         | Same, but no type coercion                            |
| `a < b ? -1 : a > b ? 1 : 0` | `a <=> b`                                             |

##### Numbers

| JavaScript                        | Saga              |
| --------------------------------- | ----------------- |
| `1`, `0x10`, `0o40`, `0b10_10`    | Same              |
| `1e40`                            | Same              |
| `13.1875`                         | Same              |
| No complex number support         | `1j`              |
| `144`, `36`                       | `0z100`, `0s100`  |
| `Infinity`, `NaN`                 | `inf`, `nan`      |
| No fraction support               | `1 / 3r`, `0.r3`  |
| `+`, `-`, `*`, `/`, `%`           | Same              |
| `1 / 4 \| 0`                      | `1 ~/ 4`          |
| `((1 % 4) + 4) % 4`               | `1 %% 4`          |
| `Math.max(3, 4); Math.min(3, 4)`  | `3 *> 4; 3 <* 4`; |
| `&`, `\|`, `^`, `~`               | same              |
| `>>`, `<<`, `>>>`                 | same; no `>>>`    |
| `x++; x--; ++x; --x`              | `x += 1; x -= 1;` |
| `1 >>> -20`                       | `1 <<< 20`        |
| `[...Array(100).keys()]`          | `..100`           |
| `[...Array(102).keys()].slice(1)` | `1..=100`         |

##### Lists, Sets and Maps

Saga's JavaScript runtime uses Immutable.JS for its internal data structures.

| JavaScript                         | Saga                     |
| ---------------------------------- | ------------------------ |
| `[1, 2, 3]`                        | Same                     |
| `[1, 2, 3].concat([4])`            | `[1, 2, 3] + 4`          |
| `Array(3).fill([1, 2, 3]).flat(1)` | `[1, 2, 3] * 3`          |
| `[1, 2, 3].filter(x => x === 1)`   | `[1, 2, 3].filter(== 1)` |
| `arr.indexOf(ele) >= 0`            | `ele in arr`             |
| `arr.indexOf(ele) < 0`             | `ele !in arr`            |
| `var [x, y] = [1, 2]`              | Same                     |
| `[...x, ...y]`                     | `[*x, *y]`               |
| `tuple()` (Python)                 | `#[]`                    |
| `(1, 2, 3)` (Python)               | `#[1, 2, 3]`             |

<!--  -->

| JavaScript                                    | Saga                |
| --------------------------------------------- | ------------------- |
| `new Set([1, 2, 3])`                          | `{1, 2, 3}`         |
| `new Set('hello')`                            | `{*'hello'}`        |
| `new Set('hello').has('h')`                   | `'h' in {*'hello'}` |
| Intersection<br>Union<br>Symmetric difference | `&`<br>`\|`<br>`^`  |
| Superset, subset                              | `>=`, `<=`          |
| Strict superset, subset                       | `>`, `<`            |

<!--  -->

| JavaScript                      | Saga                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| `{}`                            | `{:}` (mandatory colon)                                      |
| `{a: 1, b: 2, c: 3}`            | Same                                                         |
| `map?.prop; map?.method()`      | Same                                                         |
| `map.prop = 10`                 | `map.prop set 10` or `.= 10` returns new map; otherwise same |
| `'prop' in map`                 | `'prop' of map`                                              |
| `!('prop' in map)`              | `'prop' !of map`                                             |
| `delete map.prop`               | `del map.prop` returns new map                               |
| `map.prop`                      | `map!.prop` would throw if it does not exist                 |
| `{...details, prop, let: 2}`    | `{*details, :prop, let: 2}`                                  |
| `{...details, let: 2}`          | `details \| {let: 2}`                                        |
| `{a: 1, b: 2, c: 3}` (ReScript) | `#{a: 1, b: 2, c: 3}`                                        |
| `Object.keys({})`               | `{}.keys()` (Same for values and entries)                    |
| `map.y = 40; map.x()`           | `map.y = 40; ~.x()`                                          |

##### Functions

| JavaScript                                      | Saga                               |
| ----------------------------------------------- | ---------------------------------- |
| `function () { return 10 }`                     | `def () = 10`                      |
| `function named () {}`                          | `def named() {}`                   |
| `x => x + 1`                                    | Same                               |
| `x = function*(x) { yield x; return }`          | `x =>* x`                          |
| `const f = function(arg) {}`                    | `let f = arg => ()`                |
| `const f: () => void = () => {}`                | `let f = (): void => ()`           |
| `add(4, add(5, 6))`                             | Same                               |
| `function x({ name }) {}`                       | `def x(&name) ...`                 |
| `add({left: 1, right: 4})`                      | `add(&left = 1, &right = 4)`       |
| `function x(name: number): number { return 3 }` | `def x(name: num): num = 3`        |
| `function x(...args: number[]): number[] {}`    | `def x(*args: num[]): num[] = ...` |
| `Math.imul(1, 2)`                               | `1 $Math.imul$ 2`                  |
| `Math.sqrt(2)`                                  | `(Math.sqrt) 2`                    |

##### Compound Expressions

Everything is an expression!

```dart
var integer = type int | byte | short | nint | long
var result = if a then 'hello' else 'bye'
var file = match {
  when x is int => 1
  else => 0
}
```

| JavaScript                                   | Saga                                  |
| -------------------------------------------- | ------------------------------------- |
| `a ? b : c`                                  | Same                                  |
| `if ()`                                      | Same (no brackets needed)             |
| `if (!expr)`                                 | `unless expr`                         |
| `else if`                                    | `elif`                                |
| `for (var i = 1; i <= 10; i++)`              | `for (var i in 1 .. 10)`              |
| `for (var i = 1; i < 10; i++)`               | `for (var i in 1 ..= 10)`             |
| `for (var i of map)`<br>`for (var i in map)` | `in` and `of` are swapped             |
| `switch`                                     | Same, explicit fallthrough + go-to    |
| `try`                                        | Same                                  |
| `throw`, `catch`                             | `raise`, `rescue`                     |
| `break`, `continue`                          | `halt`, `skip`                        |
| _(deprecated)_                               | `with fs.readFile() as (let file) {}` |
| `while (true) {}`                            | `repeat {}`                           |
| `while (x < 10) { x++ } `                    | Same                                  |
| `while (x != 10) { x++ }`                    | `until x == 10 { x += 1 }`            |
| `do { x++ } while (x < 10) `                 | `repeat while x < 10 { x += 1 } `     |
| `do { x++ } while (x != 10) `                | `repeat until x == 10 { x += 1 } `    |

### Appendix 4A: Regular Expression Syntax

##### Basic Metacharacters

| Character                | Purpose                                 |
| ------------------------ | --------------------------------------- |
| `\x` where x is a symbol | escapes symbols                         |
| `\|`                     | alternation                             |
| `( )`                    | group                                   |
| `[ ]`                    | character class                         |
| `[^]`                    | negated character class                 |
| `{n,m}`                  | quantifier (explained in next section)  |
| `\x{p}`                  | modifies an escape                      |
| `*`                      | none or more times                      |
| `+`                      | one or more times                       |
| `?`                      | none or once                            |
| `^`                      | beginning of line                       |
| `$`                      | end of line                             |
| `.`                      | wildcard (any character except newline) |

##### Operators

| Characters | Meaning                        |
| ---------- | ------------------------------ |
| `{n}`      | Match exactly _n_ times        |
| `{n,}`     | Match at least _n_ times       |
| `{,n}`     | Match at most _n_ times        |
| `{m,n}`    | Match between _m_ to _n_ times |
| `*`        | none or more times `{0,}`      |
| `+`        | one or more times `{1,}`       |
| `?`        | none or once `{0,1}`           |

| Modifier | Examples   | Meaning                                     |
| -------- | ---------- | ------------------------------------------- |
| `?`      | `*?`       | Not greedy; returns shortest possible match |
| `+`      | `++`, `*+` | Give nothing back (does not backtrack)      |
| `*`      | `**`, `+*` | Greedy; returns longest possible match      |

| Shorthand        | Meaning  |
| ---------------- | -------- |
| `&` e.g. `a&b`   | `ab`     |
| `!` e.g. `a!b`   | `ba`     |
| `&?` e.g. `a&?b` | `a(ba)?` |
| `&+` e.g. `a&+b` | `a(ba)+` |
| `&*` e.g. `a&*b` | `a(ba)*` |
| `!?` e.g. `a!?b` | `b(ab)?` |
| `!+` e.g. `a!+b` | `b(ab)+` |
| `!*` e.g. `a!*b` | `b(ab)*` |

##### Character escapes

| Characters                | Negation | Purpose                                         |
| ------------------------- | -------- | ----------------------------------------------- |
| `\p`                      | `\P`     | platform specific newline                       |
| `\r`                      | `\R`     | carriage return                                 |
| `\n`                      | `\N`     | line feed (or newline)                          |
| `\f`                      | `\F`     | form feed                                       |
| `\t`                      | `\T`     | horizontal tabulator                            |
| `\v`                      | `\V`     | vertical tabulator                              |
| `\a`                      | `\A`     | alert (inside `[]`)                             |
| `\c`                      | `\C`     | backspace (inside `[]`)                         |
| `\e`                      | `\E`     | escape (inside `[]`)                            |
| `\s`                      | `\S`     | space (inside `[]`)                             |
| `\d`                      | `\D`     | decimal digit                                   |
| `\w`                      | `\W`     | Unicode character                               |
| `\pP`, `\pPr`, `\p{Prop}` | `\P`     | Unicode character category or property selector |
| `\c`, `\c{lang}`          | `\C`     | Leading character of identifier                 |
| `\i`, `\i{lang}`          | `\I`     | Trailing character of identifier                |
| `\l`, `\l{locale}`        | `\L`     | Lowercase letter                                |
| `\u`, `\u{locale}`        | `\U`     | Uppercase letter                                |

##### Character Classes

| Sequence | Description                      | Example      |
| -------- | -------------------------------- | ------------ |
| `[arn]`  | Character set                    | `[abc]`      |
| `[^]`    | Complement                       | `[a-z]`      |
| `-`      | Range (in decreasing precedence) | `[a-z]`      |
| `--`     | Difference                       | `[\w--\d]`   |
| `&&`     | Intersection                     | `[\w&&\D]`   |
| `^^`     | Symmetric difference             | `[\w^^\d]`   |
| `\|\|`   | Union                            | `[\S\|\|\s]` |

##### Metacharacters (escaped)

| Sequence          | Meaning                                                       |
| ----------------- | ------------------------------------------------------------- |
| `\X`              | Match Unicode extended grapheme clusters                      |
| `\1`              | Backreference, where `1` can be any positive integer          |
| `\g`              | Backreference to a specific group; or previous group if blank |
| `\g<-2>`,`\g<-2>` | Backreference to previous `2` groups                          |
| `\g<name>`        | Named backreference                                           |
| `\K`              | Do not retain text matched before `\K`                        |

##### Groups

| Sequence                | Description                            | Subroutine                                  |
| ----------------------- | -------------------------------------- | ------------------------------------------- |
| `()`                    | Numbered capturing group (`1`-indexed) | `\1`, `\2` ... (disabled if `n` is enabled) |
| `(?:)`                  | Non-capturing group                    |                                             |
| `(?#)`                  | Comment                                |                                             |
| `(?<name>)`,`(?<name>)` | Named capturing group                  | `\g<name>`, `\g'name'`, `\g"name"`          |
| `(?<x-y>)`              | Balancing group                        |                                             |
| `(?<-y>)`               | Non-capturing balancing group          |                                             |
| `(?s)`, `(?i:)`         | Mode enabler                           |                                             |
| `(?-i)`, `(?i:...)`     | Mode disabler                          |                                             |
| `(?>)`                  | Atomic group (no backtracking)         |                                             |
| `(?=)`                  | Positive lookahead                     |                                             |
| `(?!)`                  | Negative lookahead                     |                                             |
| `(?<=)`                 | Positive lookbehind                    |                                             |
| `(?<!)`                 | Negative lookbehind                    |                                             |
| `(?())`                 | Branch conditional                     |                                             |
| `(?()\|)`               | Branch with else statement             |                                             |
| `(?&1)` `(?&name)`      | Explicit named or numbered group       |                                             |
| `(?+1)`, `(?-1)`        | Relative calling                       |                                             |
| `(?0)`                  | Recursion                              |                                             |
| `(?{})`                 | Callout                                |                                             |
| `(?~)`                  | Absent stopper                         |                                             |
| `(?~\|...\|...)`        | Absent repeater                        |                                             |
| `(?~\|...)`             | Absent stopper                         |                                             |
| `(?~\|)`                | Absent stopper                         |                                             |

##### Assertions

| Sequence | Negation | Description                                                |
| -------- | -------- | ---------------------------------------------------------- |
| `\a`     | `\A`     | beginning of string                                        |
| `\b{}`   | `\B{}`   | Match at Unicode boundary of specified type                |
| `\b`     | `\B`     | beginning of word                                          |
| `\y`     | `\Y`     | end of word                                                |
| `\z`     | `\Z`     | Match only at end of string                                |
| `\G`     |          | Match at the end-of-match position (negation at the START) |
| `\K`     |          | Keep matched text (so far) out of the match                |

##### Flags and Modes

| Flag     | Mode                                               |
| -------- | -------------------------------------------------- |
| `i`      | Enable case-insensitive mode                       |
| `g`      | Enable global mode                                 |
| `m`      | Disable multiline mode                             |
| `s`      | Dot-all; `.` matches any character                 |
| `u`, `a` | Enables full Unicode support                       |
| `y`      | Sticky mode                                        |
| `n`      | Disable numbered capturing groups                  |
| `x`, `t` | Disable free spacing                               |
| `p`      | Preserve the string matched when matching repeats  |
| `c`      | Keep the current position during repeated matching |
| `e`      | Evaluate the right-hand side as an expression      |
| `r`      | Perform non-destructive substitution               |
