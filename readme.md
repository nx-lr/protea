# Trinity

> One language, three aspects.

Trinity is a portable, multi-paradigm and multi-faceted programming language I created that aims to run on the JavaScript and Node.JS runtimes. It features a familiar JavaScript-like syntax, static (and dynamic) typing, a robust standard library and a unique combination of powerful features for imperative, declarative and meta-programming.

```dart
x: valof y = 10
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

Trinity is a statically typed compiled programming language designed to build reliable software for the frontend, backend and middle-end; for the web, desktop and mobile. It's very similar to Rust, Go and Swift, and also influenced by Flix, TypeScript, ReScript, Fantom, Kotlin and Scala.

Trinity gives the developer a lot of power, all with an easy syntax, and a clean, consistent and comprehensive API. The language promotes writing simple and clear code with minimal abstraction. Anything you can do in other languages, you can do in Trinity.

[wtfjs]: https://github.com/denysdovhan/wtfjs/

## Trinity's Origins

Trinity started out as a simple concept to bridge the gap between Python and JavaScript in a hybrid language, though sharing most of the concepts from modern JavaScript. Now over almost a year of iteration and tinkering the language had poured in tons of influence from other languages like Scala and Kotlin.

This project is currently in the works and would be my largest project to date. I will be posting a Trello on my development of Trinity very soon, and I'm looking forward for anyone out there to contribute; fork this repo, and pull your changes to this repository: https://github.com/nxltm/trinity-lang.

## Standard Library

<table><tr><td width=33.333% valign=top>

#### [Introduction](./Introduction.md)

</td></tr></table>

## Table of Contents

<table><tr><td width=25% valign=top>

#### [Introduction](./Introduction.md)

- [Overview](#./)
- [Installation](#)
- [The Basics](#)
  - [Variables](#)
  - [Syntax](#)
  - [Comments](#)
  - [Keywords](#)

#### [Data Types](#)

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

#### [Control Flow](#)

- [Basic Block](#)
- [Conditionals](#)
- [Loops and Ranges](#)
- [Switch](#)
- [Pattern Matching](#)
- [Error Handling](#)
- [Query Expressions](#)

</td><td width=25% valign=top>

#### [Functions](#)

- [Functions](#)
- [Closures](#)
- [Inline and Named Functions](#)
- [Anonymous and Higher-Order Functions](#)
- [Currying](#)
- [Recursion](#)
- [Function Piping](#)
- [Generators](#)
- [String Macros](#)

#### [Classes](#)

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

#### [Types](#)

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

#### [Concurrency and Asynchrony](#)

- [Channels](#)
- [Series and Parallel Blocks](#)
- [Async-Await](#)
- [Callbacks and Futures](#)

#### [Modules](#)

- [The Module System](#)
- [Imports and Exports](#)
- [Python and JS Modules](#)
- [Calling Python and Node.JS Code](#)
- [Managing and Publishing Packages](#)

#### [Advanced Topics](#)

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

#### [Tools](#)

- [Nifty, Trinity's Formatter](#)

#### [Standard Library](#)

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
- [Domain-Specific Language Extensions](#)

#### [Appendices and References](#)

- [Keywords and Modifiers](#)
- [Operators & Precedence](#)
- [Regex Language](#)
- [Format Language](#)
- [J-Expression Language](#)
- [CLI Reference](#)

</td></tr></table>

## A Tour

Trinity is a relatively new programming language which allows users to write easy-to-read high-performance code. After skimming through the documentation, chances are you're getting started with coding in Trinity.

This is a work-in-progress: if you spot any errors and/or you have an idea how to make this tutorial better, please report it as an issue on GitHub at [this repository](https://github.com/nxltm/trinity-lang).

### Overview

This tutorial introduces you informally to the concepts and features in Trinity, as well as a comprehensive guide to the modules in Trinity's Standard Library.

The first step is to install Rust. We'll download Trinity through NPM: `npm i -g @trinity-lang/core`. That way, you'll have access to all of Trinity's APIs and standard libraries.

### Hello World!

But before we begin, let's start with a tradition. Let's print "Hello World!" into the console.

```dart
def main => print 'Hello World!'
```

Save this snippet into a file. Open your terminal in VS Code and run it.

```sh
trin r hello-world.trin
```

You can leave out the `r` or the file extension.

```sh
trin hello-world
```

Or we can print the output JavaScript code, which we'll do it right away here.

```ts
function main(args: string[] = process.argv) {
  console.log("Hello World!");
}
```

There is a possibility that you would also want to compile but not run your said code. Use `trin c` instead. To see all commands available, type `trin h` in the terminal, `h` being "help".

Whichever way you chose to run your program, you should see

```
Hello World!
```

in your terminal.

**_You have successfully run your first Trinity program!_**

---

Now, an explanation.

Functions are declared with the `def` keyword (alternatively, you can use `fn`, they're the same). The return type is specified after the function name.

In this case `main` doesn't return anything, so there is no return type. Also keep in mind, `=>` opens a block if it is followed by a single statement.

As in many other languages, `main` is the entry point of your program. You all know what `print` does.

The `main()` function declaration can be skipped in one file programs. This is useful when writing small programs, "scripts", or just learning the language. For brevity, `main` will be skipped in this tutorial.

This means that a "hello world" program in Trinity is as simple as

```dart
print 'Hello World!'
```

### Syntax

As you may know, Trinity uses a curly-bracket syntax, sharing similarities with other languages like TypeScript, Scala, Kotlin, Go and Rust among others. You would use curly brackets to delimit things like if-statements, or even functions and classes.

```dart
class Person(val firstName: Str, val lastName: Str) {
  def printFullName => print "$firstName $lastName"
}
```

#### Semicolons and Commas

You would not need to use semicolons to terminate expressions, or commas to separate expressions when the next expression is on the following line. Lines are joined if the first token of the next line is a keyword or infix operator.

```dart
print 'Hello World!'

[1
2
3] == [1, 2, 3]

x := 1; x = 10 // this code is valid
```

#### Comments

Line comments start with `//` and go until the end of the line. Comments beginning with `/+` or `/++` can be nested.

```dart
// line comment
/// JSDoc comment
/* block comment */
/+ nested block comment /+ +/ +/
/** JSDoc comment */
/++ nested JSDoc comment /++ +/ +/
```

Special, reserved line comments include documentation, to-do and compiler comments, which are recognized by several aspects of the compiler.

```dart
//= assertion comment
//+ testing comment
//! fixme/todo comment
//* compiler comment
```

#### Identifiers

Identifiers, which name program entities like variables or functions, always begin with a letter or underscore (Unicode `Pc`). The rest of the characters may also include digits (`Nd`) and combining marks (`M`).

Naming conventions follow Java or JavaScript. There are four types of identifiers which Trinity recognizes and highlights accordingly:

- `SHOUT_SNAKE_CASE`, used for constants,
- `PascalCase` used for classes, modules and types,
- `camelCase` or `snake_case` used for variables, functions and methods.
- `_leading`/`trailing_` underscores for special methods and keywords.

Variables are compared using their first character, then comparing further characters case-insensitively, ignoring all delimiters.
This makes it easier to identify identifier without having to know its exact spelling.

```dart
def cmpIdent(a: Str, b: Str): Bool =>
  a[0] == b[0] &&
  a.sub(`[^\pL\d]+`g, '').lower() = b.sub(`[^\pL\d]+`g, '').lower()
```

#### Keywords

The following regular expression denotes all the keywords of the language, including those used for declarations, such as `var`. Some keywords such as `repeat until` or `else if` are considered a single keyword.

```txt
in of as is out new infer unset
typeof nameof sizeof
keyof valueof pairof instof
len del to til till thru by

var val let set get def fn fun func
class enum module package inter struct object record
frag space data trait proto proc macro type given
raw style compo element decl ext impl sub

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

Trinity has four types of variables, all of which are block-scoped; the immutable `val` and `set`, and the mutable `var` and `let`. `let` and `set` definitions can be overridden in the same scope.

```dart
val _val = "hello"
set _val = 'hello'
var _val = 42
let _val = 'hello'
```

As for `set` and `let`, the binding you refer to is whatever's the closest upward.

Reassigning a `val`/`set` would throw an error:

```dart
val a = \a
set a = a // a == \a
a = \b; //! Error: a const variable can only be set once.
```

Conversely, you _can_ reassign a `var`/`let`:

```dart
var a = \a
let a = a // a == \a
a = \b
```

You don't need to explicitly specify the types of each variable, the compiler is smart enough to infer them for you:

```dart
val s = 'Hello World!' // s is a `str`
```

You can also explicitly declare the variable type if you think it makes your code easier to read. All types are declared in `PascalCase`, as each type is an instance of a class.

```dart
val s: Str = "hello"
var i: Int = 42
val c: RpgChar = new RpgChar("Riven Konte")
```

As a practical matter it can help to explicitly show the type when you're working with third-party libraries, especially if you don't use the library often, or if their method names don't make the type clear.

A new `var` or `val` in a closure declares a new variable temporarily in that closure, _shadowing_ it.

```dart
val a = 1
do {
  val a = 2
  print a //= 2
}
print a //= 1
```

The keywords `set` and `let` behave like `var` and `val` respectively, but you can redefine `set` and `let` fields in the same block, overshadowing them. So you can write this too:

```dart
set a = \a
set a = \b // a is now \a
let a = \c // a is now \c
```

Use `:=` instead to set a property on an object or data structure as opposed to a variable.

```dart
let ct = #{} // A mutable map
ct.foo := 42 // ct == {foo: 42}
```

The binding you refer to is whatever's the closest upward.

Uninitialized variables that have a nullable type (`?x`) have an initial value of `null` and are explicitly stated. Even variables with numeric types are initially null, because numbers, like everything else, are objects.

```dart
var lineCount: ?Int
assert lineCount == null
```

The assert statement in production code is generally ignored, but would throw an error during development if its condition is not satisfied.

You must initialize the values of non-nullable variables before you use them:

```dart
var lineCount: Int = 0
```

You don't have to initialize a local variable where it's declared, but you do need to assign it a value before it's used.

```dart
let ct
for x in 1 to 10 then ct = x
print ct
```

Top-level and class variables are lazily initialized; the initialization code runs the first time the variable is used.

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

`Null` is a single value used to represent the absence of a value.
Same for `void`. `null` is equal to void by value, but not by reference. `void` compiles to JS `undefined`, `null` compiles to its JS counterpart.

```dart
null == void //= true
```

### Booleans

A boolean (type `bool`) can only have two values: `true` or `false`. Booleans are mainly used for control flow, and there are a lot of operators that return boolean values.

```dart
true
false
```

### Numbers

Trinity supports both integers, signed and unsigned, as well as floating-point numbers in various sizes (default being 64 bits). Unsigned integers have the `:u` or `:U` suffix (note the colon) while floating point numbers have a decimal point.

All numeric literals are case-insensitive and unlike a lot of other languages, numbers can include underscores or leading zeroes.

```dart
val myInt: Int = 123 // or +123
val myNat: Nat = 123:U
val myFloat: Float = 1.0
```

Numbers can also be suffixed with a suitable type, after the colon `:`, and it would be cast to the appropriate type. The type suffix itself is case-insensitive.

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

Exponents are delimited with a caret `^` and are relative to the base, which means that `1^10` is equal to `1 * 10 ** 10`.

```dart
assert 0x1^10 == 1 * (16 ** 10)
```

Repeating digits are specified with the `*` sign, followed by the number of digits after the decimal point with `=`.

Floats can also be created from special 'fractional' literals, meaning the numerator goes on the left and the denominator on the right, with the numerator taking on the prefix. Both the numerator and denominator should be integers; `4.1/4` is invalid.

```dart
assert 1.*3 == 4/4
```

Any numeric literal containing `/`, `*`, `=` or `.` in any combination is considered a floating point.

We also provide a multi-base numeric literal, where the digits themselves are separated with underscores.

```dart
assert 0xdead_beef == 16b13_14_10_13__11_14_14_15
```

### Strings

Strings are delimited by matching single or double quotes, and can span multiple lines. Double quoted strings can have escape sequences precede by a backslash, while single quoted strings are _"raw"_, meaning any escapes are not parsed.

```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
var s3 = 'It''s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

Strings can also begin with _three or more_ quotes of the same type, provided they end with _at least_ the same number of quotes of the same type. In these types of literals, leading and trailing whitespace, as well as newlines are ignored.

```dart
assert """ "multiline string"""" == '"multiline string"'
```

Strings may span multiple lines in which case the newlines are always normalized to `\n` regardless of how newlines were encoded in the source code text.

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
assert "multiline string" == "multiline string"
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

A backslash joins the next line, ignoring any trailing whitespace and beginning indentation.

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

You can put the value of an expression inside a string by using `${expression}`. If the value refers to an identifier like `foo`, or a sequence of identifiers like `foo::bar.baz?.qux`, you can skip over the `{}`.

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
assert \\  == ' ' // the space is escaped!
```

Block strings start with either `\|` or `\>` and work very similar to their YAML counterparts. The same rules apply to block strings, but require that every line after it be indented by at least a single whitespace character, maintaining that indentation throughout.

```yaml
x: |
  line 1
    line 2
    line 3
```

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
  sideCharacter = 'Georg'
) //= The story of Alex, Diana and Scott.
```

#### Regular expressions

Trinity's regular expressions are delimited in between backticks much like Go. By default, regular expressions are free-space, global and support comments and embedded code, similar to strings.

```dart
`\b{wb}(fee|fie|foe|fum)\b{wb}`
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] ]`x

`
  /\* // Match the opening delimiter.
  .*? // Match a minimal number of characters.
  \*/ // Match the closing delimiter.
`
```

> **Note**: Stick around for a full guide on how to write and manipulate regular expressions.

Modifiers go on either side of the back-ticks; the left hand side toggles the scope of different character sets, while the right hand side toggles the overall mode of the regex.

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
assert (newStr = str =< `(\w+)\W+(\w+)``My name is $2, $0!`) ==
  'My name is Bond, James Bond'
````

Interpolation works in regex literals just as it does in strings, if you want to create dynamic regexes. By default, all interpolations are escaped after they are evaluated. Use the `e` flag to suppress this behavior.

```dart
let x = '[\da-z'
let invalidRe = `($x)`e //! Error: Invalid regex: unterminated character set
let validRe = `($x)`
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
val myMap = {a: x, b: x, 10: 2, :a: 2}
assert myMap is Map[Int | Str, Int]
```

Prefix a list, map or set literal with a `#` to make the collection mutable. Mutable collections are prefixed with `Mut` to distinguish themselves from regular collections.

```dart
val myList: MutList[Int | Str] = #[1, \2, 3, \4]
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
assert "a" == { \a\: "a" }.a
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

## Operators

## Control Flow

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
