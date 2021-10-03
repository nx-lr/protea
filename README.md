# Trinity

> One language, three aspects.

Trinity is a portable, multi-paradigm and multi-faceted programming language I created that aims to run on the JavaScript and Node.JS runtimes, and also on the . It features a familiar JavaScript-like syntax, static (and dynamic) typing, a robust standard library and a unique combination of powerful features for imperative, declarative and meta-programming.

```dart
def convertBase(str, fromBase, toBase) {
  val DIGITS =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/"

  val add = |x, y, base| => {
    var z = []
    val n = Math.max(len x, len y)
    var carry = 0
    var i = 0
    while i < n ?: carry {
      val xi = i < len x ? x[i] : 0
      val yi = i < len y ? y[i] : 0
      val zi = carry + xi + yi
      z.push(zi % base)
      carry = Math.floor(zi / base)
      i += 1
    }
    z
  }

  val multiplyByNumber = |num, x, base| => {
    if num < 0 => return null
    if num == 0 => return []
    var result = []
    var power = x
    label x: loop {
      num & 1 !: (result = add(result, power, base))
      num = num >> 1
      if num == 0 => break x
      power = add(power, power, base)
    }
    result
  }

  val parseToDigitsArray = |str, base| => {
    val digits = str.split ""
    var arr = []
    for var i in len digits till 0 {
      val n = DIGITS.indexOf digits[i]
      if n == -1 => return null
      arr.push n
    }
    arr
  }

  val digits = parseToDigitsArray(str, fromBase)
  if digits == null => return null

  var outArray = []
  var power = [1]
  for var i in 0 til len digits {
    digits[i] !: (
      outArray = add(
        outArray,
        multiplyByNumber(digits[i], power, toBase),
        toBase
      )
    )
    power = multiplyByNumber(fromBase, power, toBase)
  }

  var out = ""
  for var i in len outArray till 0 =>
    out += DIGITS[outArray[i]]

  out
}
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

## Table of Contents

<table><tr><td width=25% valign=top>

#### [Introduction](./Introduction.md)

- [Overview](#./)
- [Installation](#)
- [The Basics](#)
  - [Variables](#)
  - [Annotations](#)
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
class Person(val firstName: String, val lastName: String) {
  def printFullName() { print "$firstName $lastName" }
}
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

#### Keywords

The following regular expression denotes all the keywords of the language, including those used for declarations, such as `var`. Some keywords such as `repeat until` or `else if` are considered a single keyword.

```txt
in of as is out new infer unset
typeof nameof sizeof
keyof valueof pairof instof
len del to til till thru by

var val let dim const def fn fun func
class enum mod pkg inter struct obj rec
frag nspace data trait proto proc macro type given
raw style comp elem decl ext impl sub

if lest elif elest else then
for each loop while until from
do redo try retry throw catch finally
switch case default match when otherwise
parallel series spawn destroy fixed lock
break continue return await label yield goto
import export impose expose using
debug check assert
```

#### Identifiers

Identifiers, which name program entities like variables or functions, always begin with a letter or underscore. The rest of the characters may also include digits and combining marks.

Naming conventions follow Java or JavaScript. There are four types of identifiers which Trinity recognizes and highlight accordingly:

- `SHOUT_SNAKE_CASE`, used for declaring constants,
- `PascalCase` used for declaring classes, modules and types,
- `camelCase` or `snake_case` used for variables, functions, methods, etc.
- `_leading` or `trailing_` underscores used to escape keywords.

Because of something called partial case insensitivity, variables are compared using their first character, leaving everything else to be compared case-insensitively and without diacritics or delimiters. This makes it easier to identify variables across different conventions without having to know the exact spelling of an identifier.

```dart
proc sameIdentifier(a, b: string): bool = a[0] == b[0] &&
    a.replace("_", "").toLowerAscii == b.replace("_", "").toLowerAscii
```

You would not need to use semicolons to terminate expressions, or commas to separate expressions when the next expression is on the following line. Lines are joined if the first token of the next line is a keyword or infix operator.

```dart
print 'Hello World!'

[1
2
3] == [1, 2, 3]

x := 1; x = 10 // this code is valid
```

## Variables

In JavaScript you would declare new variables like this:

```js
var s = "hello"; // mutable
let i = 42; // mutable
const p = new Person("Joel Fleischman"); // immutable
```

By contrast, Trinity has two types of variables:

- `val` creates an immutable variable (like `const` in JavaScript)
- `var` creates a mutable variable (like `let`)

This is what variable declaration looks like in Trinity:

```dart
val s = "hello" // immutable
var i = 42 // mutable
val p = new Person("Joel Fleischman")
```

You don't need to explicitly specify the types of each variable, the compiler is smart enough to infer them for you:

```dart
val s = 'Hello World!' // s is a `str`
```

You can also explicitly declare the variable type if you think it makes your code easier to read.

```dart
val s: str = "hello"
var i: int = 42
```

As a practical matter it can help to explicitly show the type when you're working with third-party libraries, especially if you don't use the library often, or if their method names don't make the type clear.

Reassigning a `val` would throw an error:

```dart
val a = \a
a = \b; //! Error: reassignment to constant a
```

Conversely, you _can_ reassign a `var`:

```dart
var a = \a
a = \b
```

A new `var` or `val` in a closure declares a new variable temporarily in that closure, _shadowing_ it.

```dart
var a = 1
do {
  var a = 2
  print a //= 2
}
print a //= 1
```

### Let and Dim

The keywords `dim` and `let` behave like `var` and `val` respectively, but you can redefine fields in the same block.

```dart
dim a = \a
dim a = \b // a is now \a
let a = \c // a is now \c
```

Trinity supports the same primitive literals as most other languages, including those from higher-level scripting languages:

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
{1: "one", 2: "two"} // map
:symbol // symbol
: Type // type
: Slot[Literal] // slot
set [x]; [x] as set // set
do |x, y| x + y // function
```

There is no need to surround `()` with a map literal unless iheihw vsi erhith wih

Blocks are literal too, are they?

```dart
do {}
def() {}
class {}
```

#### Identifiers

Identifiers begin with a letter `L`, or combining punctuation `Pc`, which includes underscores. Later characters can include any digit `Nd` or combining marks `M` in addition to said characters.

```dart
дpдgдпdф(lдs, lцcёs);
```

Two or more identifiers placed in a row

#### Operators

There are

#### Numbers

This would only be a textual overview of the Saga programming language, as the grammar is having a hiatus at this point.

### Syntax

- **To-Do:**

  - Add support to the first set of embedded languages:
    - YAML
    - Stylus/SASS
    - HAML, Pug or Slim
    - JavaScript, Ruby, CoffeeScript and Python
  - Use Oniguruma to figure out how to validate arbitrary-radix numeric literals and highlight them.
  - Rework query syntax, which is inspired by SQL.
    - Query syntax begins with `from`.
    - Ends in a `select` or `fold` statement.
  - Add standard library stuff (the bulk of this grammar)
    - (https://github.com/nxltm/cspell-dicts)
      - JS, TS, R, C#, Go, PHP, Perl, Scala, Flix, Java, Kotlin, Rust, Python, Swift, Ruby, Elixir, Haskell
      - CSS, HTML, SVG and LaTeX
      - Selected third-party libraries above
      - R, Matlab, C, C++, SQL, Bash, PowerShell and Command Prompt
    - [Awesome JS](https://github.com/sorrycc/awesome-javascript)
    - [Awesome Node](https://github.com/sindresorhus/awesome-nodejs)
    - [Awesome Python](https://github.com/vinta/awesome-python)

<!--  -->

- Numeric literals follow this template:
  - An optional base prefix starting with `0`, `2` or higher.
  - 0 is reserved for even bases 2, 4, 6, 8, 10, 12 or 16.
- Add YAML unquoted string literals
  - `\|`: raw string `\>`: escaped string `\<`: regular expression `\`: unquoted string

<!--  -->

- **Bugs:**
  - Fix list/set/item highlighting in function calls
  - In backslash string literals, `\:` only the last `:` should not be parsed in type annotations such as `(3 + 4): int` or object keys such as `int:`
- **Doing:**
- **Done:**
  - Revamp string, number, symbol and regex literals
  - Sometimes some function
  - Rework regex syntax (brackets):
  - Different types of groups and character sets are highlighted in different colors as most of them begin the same way. e.g `(?:)` - non-capturing is different from `(?!)` - negative look-ahead. Quantifiers are highlighted differently than quantifier modifiers. Different types of groups and character sets are highlighted in different colors as most of them begin the same way.
  - <!-- TODO: Work on this -->
