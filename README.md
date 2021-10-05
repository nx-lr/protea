# Trinity

> One language, three aspects.

Trinity is a portable, multi-paradigm and multi-faceted programming language I created that aims to run on the JavaScript and Node.JS runtimes. It features a familiar JavaScript-like syntax, static (and dynamic) typing, a robust standard library and a unique combination of powerful features for imperative, declarative and meta-programming.

```dart

```

### Roadmap

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
  - [Translating Python/JS to Saga](#)
  - [Translating Saga to Python](#)
- [Documentation](#)

</td><td width=25% valign=top>

#### [Tools](#)

- [Nifty, Saga's Formatter](#)

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

This tutorial introduces you informally to the concepts and features in Saga, as well as a comprehensive guide to the modules in Saga's Standard Library.

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

There is a possibility that you would also want to compile but not run your said code. Use c instead.

```sh
trin c hello-world.saga
```

To see all commands available, type `trin h` in the terminal, `h` being "help".

If you're using Visual Studio Code with the _Code Runner_ extension, all you have to do is navigate to the top right hand side of your window and click on the "play" button. A command would appear in your window.

Whichever way you chose to run your program, you should see

```
Hello World!
```

in your terminal.

**_You have successfully run your first Trinity program!_**

---

Okay, now let's see what happened.

Functions are declared with the `fn` keyword. The return type is specified after the function name.

In this case `main` doesn't return anything, so there is no return type. Also keep in mind, `=>` opens a block if it is followed by a single statement.

As in many other languages, `main` is the entry point of your program. You all know what `print` does.

`fn main` declaration can be skipped in one file programs. This is useful when writing small programs, "scripts", or just learning the language. For brevity, `fn main` will be skipped in this tutorial.

This means that a "hello world" program in Trinity is as simple as

```dart
print 'Hello World!'
```

### Syntax

As you may know, Trinity uses a curly-bracket syntax much like other languages like JavaScript, PHP, C# and Java. You would use curly brackets to delimit things like if-statements, or even functions and classes.

```dart
class Person(val firstName: Str, val lastName: Str) {
  def printFullName() { print "$firstName $lastName" }
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
def cmpIdent(a: Str, b: Str): Bool =
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

The binding you refer to is whatever's the closest upward.

Uninitialized variables that have a nullable type have an initial value of `null`. Even variables with numeric types are initially null, because numbers—like everything else in Dart—are objects.

```dart
var lineCount: Int
assert lineCount == null
```

Note: Production code ignores the `assert` statement. During development, on the other hand, `assert condition` throws an exception if condition is false. For details, see Assert.

If you enable null safety, then you must initialize the values of non-nullable variables before you use them:

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
let add = |x: Int, y: Int|: Int = x + y
let drawCircle = |&radius = r: Int|: Circle = /* code here */
```

You can refer to a type by a different name. They'll be equivalent:

```dart
type Second = Int
let totalTime: Second = 10
```

Types can accept parameters, akin to generics in other languages. The parameters' names are defined in square brackets. The use-case of a parameterized type is to kill duplications. Before:

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

#### Recursive Types

A type can reference itself within itself using `re`:

```dart
rec type Person = {
  name: Str
  friends: List[Person]
}
```

Types can also be mutually recursive.

```dart
rec type Student = {taughtBy: Teacher}
rec type Teacher = {students: List[Student]}
```

### Type Operators

You can make new types by combining or manipulating existing ones. The table below lists the type operators of the language.

| Operator                   | Example     | Returns                                                                   |
| -------------------------- | ----------- | ------------------------------------------------------------------------- |
| `+` (sum)                  | `a + b`     | The sum type of `a` and `b`                                               |
| `*` (product)              | `a * b`     | The product type of `a` and `b`                                           |
| `-` (difference)           | `a - b`     | An object which has the keys of `a`, but _not_ `b`                        |
| `&` (intersection)         | `a & b`     | An object which has the keys of `a` _and_ b                               |
| `\|` (union)               | `a \| b`    | An object which has the keys of `a` _or_ `b`                              |
| `^` (symmetric difference) | `a ^ b`     | An object which has the keys of `a` _or_ `b` _but not both_               |
| `~` (complement)           | `~a`        | Any type that is _not_ `a`                                                |
| `?` (nullable)             | `?a`        | The union of `null` with `a`                                              |
| `!` (result)               | `!a`        | The return type of function `a`                                           |
| `$` (parameters)           | `$a`        | A tuple of the parameters of function `a`                                 |
| `typeof`                   | `typeof a`  | Returns the base type(s) of `a`                                           |
| `keyof`                    | `keyof a`   | A tuple of all the key types of the object `a`                            |
| `valueof`                  | `valueof a` | A tuple of all the value types of the object `a`                          |
| `pairof`                   | `pairof a`  | Equivalent to `[keyof a, valueof a]`                                      |
| `infer`                    | `infer a`   | Validates that type `a` exists, otherwise short-circuits                  |
| `as`                       | `a as b`    | Casts `a` to the type `b`                                                 |
| `is`                       | `infer a`   | Ensures that the type `a` is the same as the type `b` provided `b` exists |
| `ext` (extends)            | `a ext b`   | Ensures that the type `a` extends the type `b`                            |
| `impl` (implements)        | `a impl b`  | Ensures that the type `a` implements the type `b`                         |

## Data Types

Trinity supports the same primitive literals as most other languages, including those from higher-level scripting languages such as lists, sets, maps and strings. For example, `'string'` is a string literal, and `true` is a boolean literal.

- Numbers (`Int`, `Float`)
- Strings (`Str`)
- Booleans (`Bool`)
- Lists (`List`)
- Sets (`Set`)
- Maps (`Map`)
- Runes (`Rune`)
- Symbols (`Symbol`)
- Types (`Type`) and slots (`Slot`)
- The value null (`Null`)

Several classes also have literals:

- Duration (`Duration`)
- Date and time (`DateTime`)
- Regular expression (`RegExp`)
- Function (`Func`)
- Mutable lists, sets, and maps (`MutList`, `MutSet`, `MutMap`)

Because every variable in Trinity refers to an object (an instance of a class) you can use constructors to initialize variables. All of the types have their own constructors. For example, you can use the `Map()` constructor to create a map.

Some other types also have special roles in the Saga language:

- `Mixed`: The superset of all value classes, except `Null`.
- `Object`: The negation of `Mixed`.
- `Any`: The top class; the superset of all classes including `Null`.
- `Never`: Indicates that an expression can never successfully finish evaluating. The bottom type.
- `Void`: Indicates that a value is never used. Used in place of `Null` to indicate a function or method never returns.
- `Future` and `Stream`: Used in asynchrony support.
- `Iterable`: Used in `for-in` loops and in synchronous generator functions.
- `Pure` or `Impure`: Indicates a function is pure or impure, meaning it has or does not have any [side effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>).

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
: Type.Slot // slot
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

Trinity supports both integers, signed and unsigned, as well as floating-point numbers in various sizes (default being 64 bits). Floating-points are distinguished from integers by a decimal point. Unsigned integers are distinguished with the `:u` suffix.

All numeric literals are case-insensitive and unlike a lot of other languages, numbers can include underscores or leading zeroes.

```dart
val myInt: Int = 123
val myNat: Nat = 123:u
val myFloat: Float = 0x.1
```

Different radix literals can be created using prefixes `0b` (base 2), `0q` (base 4), `0s` (base 6), `0o` (base 8), `0z` (base 12) and `0x` (base 16).

```dart
val base2 = 0b101010111100000100100011
val base4 = 0q320210213202
val base6 = 0s125423
val base8 = 0o52740443
val base10 = 0011256099
val base12 = 0z10a37b547ab97
val base16 = 0xabcdef123
```

Again, unlike other languages, exponents are delimited with a caret `^` and are relative to the base, which means that `1^10` is equal to `1 * 10 ** 10`.

```dart
assert 0x1^10 == 1 * (16 ** 10)
```

Repeating digits are specified with the `*` sign, followed by the number of digits after the decimal point with `=`.

Floats also can be made in a compact way with an improper "fractional" style, meaning the numerator goes on the left and the denominator on the right, with the numerator taking on the prefix.

```dart
assert 1.*3 == 4/3
```

Numbers can also be suffixed with a suitable type, after the colon `:`, and it would be cast to the appropriate type.

```dart
assert 4.0:F32 is F32
```

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

The first non-whitespace character of each line should be aligned to the first line of text in the string, or else it is a compile time error.

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

Both examples compile into `"line1\n line2\n line3"`. Note that spacing to the right of the leading line is maintained, but spacing to the left is stripped off in the string literal.

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
x: |
    line 1
      line 2
      line 3
```

```dart
let string1 = \|
  line1
    line2
    line3
let string2 = \|
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

Positional and keyword arguments can be arbitrarily combined:

```dart
'The story of #0, #1, and #other.'.format(
  'Bill'
  'Manfred'
  other = 'Georg'
) //= The story of Bill, Manfred, and Georg.
```

This could also be done by passing the table as keyword arguments with the ‘\*\*’ notation.

```dart
table = {Alex: 1974,
         Diana: 2390,
         Scott: 4903}
" Alex: #Alex%d \nDiana: #Diana%d \nScott: #Scott%d".format(%table)
```

#### Regular expressions

There are

#### Numbers

This would only be a textual overview of the Saga programming language, as the grammar is having a hiatus at this point.

### Syntax
