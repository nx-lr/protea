# Trinity

> One language, three aspects.

Trinity is a portable, multi-paradigm and multi-faceted programming language I created that aims to run on the JVM and modern web browsers. It features a familiar JavaScript-like syntax, static (and dynamic) typing, a robust standard library and a unique combination of powerful features for imperative, declarative and meta-programming.

```dart
// Say hello to the world!
using \react.React;
import \react-native only { StyleSheet, Text, View };

const styles = <StyleSheet #{
  .container {
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  }
}/>;

export default element App {
  def main -> (
    <View style=$styles.container>
      <Text>To share a photo from your phone with a friend,
      just press the button below!</Text>
    </View>
  );
};
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

The name Trinity is named after the Matrix character of the same name, and also means "to be three in one". True to that name, that's reflected in three\* paradigms (imperative, declarative and meta-programming), three platforms (web, desktop and mobile) and the three layers of the tech stack: frontend, API, and backend.

Similar to languages like Rust, Haxe, Scala and Fantom, Trinity's primary goal was to build a portable language targeting multiple runtimes, with a clean, consistent and comprehensive set of APIs and core libraries to abstract away the lower level runtimes. Trinity is heavily influenced by most curly-bracket languages such as Scala, Kotlin, Go, Rust and Swift.

[wtfjs]: https://github.com/denysdovhan/wtfjs/

## Trinity's Origins

Switching over to JavaScript to Python, it pained me to deal with null or type-related errors, coercion, and missing brackets. And the bare-bones nature of JavaScript meant I had to implement myself or find some obscure library on NPM to find just the exact functionality I needed, which could take hours or even days. Not quite my tempo.

Trinity started out as a simple concept to bridge the gap between Python and JavaScript by combining the features and APIs from either language. Now over almost a year of iteration and tinkering the language had poured in tons of influence, mainly from Java and JavaScript alternatives, and even some independent languages like C#, Rust and Go.

This project is currently in the works and would be my largest project to date. I spent four months working on the TextMate regular expression grammar for the language, and it's constantly being updated with new edits and features. I will be posting a Trello on my development of Trinity very soon, and I'm looking forward for anyone out there to contribute; fork this repo, and pull your changes to this repository: https://github.com/nxltm/trinity-lang.

### Elegant libraries

The Java and .NET APIs have developed over the years into a somewhat tangled mess, with Both platforms tend toward APIs using a proliferation of small classes that are over abstracted and under powered. There's too many classes to use, with even basic functionality such as parsing a file into individual lines which require hundreds of lines of code at the bare minimum.

Meanwhile, JavaScript lies on the other extreme. JS requires the developer to go and implement their functionality themselves, thereby wasting more than tens of hours trying to find the right library or function to use on Stack Overflow or even on NPM. And when installing a library on NPM, sometimes said library may drag in between hundreds to thousands of dependencies, resulting in bloated projects and tons upon tons of unreachable, dead code.

Fantom follows a very different philosophy - we believe in having very few types and classes, but each having tons of functionality to work with them. You don't need a `DateFormatter` to format a date string, when you could use the `format` method of the `Date` class to format it yourself.

You can use other modules by simply `import`ing or `open`ing them inside your project, as you wish, to allow you to work easily with the OS, file system, apps, APIs, media, protocols, servers and databases.

## A Tour

### Hello World

We start our whirlwind tour of Trinity's features, with the quintessential hello world:

```dart
class App {
  static func main(*args: []string): void -> print 'Hello World!'
}
```

Minor differences from TypeScript include:

- Class names must be written in `PascalCase`, while function/method, property and variable names are written either in `camelCase` or `snake_case`.
- Class and method protection scope are private by default.
- Use the `print` method to write to the console. Alternatives include `echo` and `puts`.
- If a clause, such as `func` or `for` are followed by a single statement, you can use `->` instead of a block.
- Statements can be terminated with a newline (you can use a semicolon too)
- You can declare `*args: []string` or access them from `Process.argv`.

## Language Ideas

Fantom supports the same primitive literals as Java or C#, plus some that are typically found in higher level scripting languages:

```dart
null; void // aliases for each other
true; false // boolean

/* INTEGERS */
nan; infinity // special float constants

16777216 // integer
1^+40 // integer with exponential part
1_10011_101 // integer, can use _ as separator
1:u // unsigned integer
1.1 // floating point
1.1:f32 // float with type suffix
1.1*3 // float with repeating digit
1.1=1 // float with significant figures

40b10_10_10 // arbitrary base

// base 2, 4, 6, 8, 12, 16
0b10; 0q10; 0s10; 0o10; 0z10; 0x10

/* STRINGS */
// empty string
'', ""

// strings can be surrounded by as many quotes
// of the same type as possible
'''block string'''
"""""
block-string
"""""

// double quoted strings allow escapes, single ones do not
// escapes are case-insensitive
"hello\nworld"
// to escape "'" in a "'"-quoted string, double it
'x''x'

// backslash unquoted strings (YAML inspired)
\ // empty string
[\this, \is, \cool]
\spaces\ must\ be\ escaped // with a backslash
\|
  block strings are so cool
\>
  this one allows escapes

// same as numeric prefixes above, but substituting initial 0 with \
"\o377\255\s1104\z194" == "\xff\xff\xff\xff"

// string interpolation / format specifiers
"$x + $y = ${x ++ y}%d"
// longhand for above
x.string! ++ " + " ++ y.string! ++ " = " ++ (x ++ y).string!

// Experimental: locale interpolation
"$<fwt::err.name>"
"$<fileNotFound='The file was not found'>"

// All versions
`regular expression
  (?i: PCRE compliant)
  // can allow comments and free spacing
`flag

\< // block regex
  ^ (?<scheme> [^:/?]+ ) :\// // aka protocol
    (?<host>   [^/?]+  )      // domain name/IP
    (?<path>   [^?]*   ) \\?? // optional path
    (?<query>  .*      )      // optional query

<div></div> // JSX
<div x=x y=10></div> // JSX
```

You would not need to use semicolons to terminate statements, or commas to separate statements when the next statement is on the following line. Lines are joined if the first token of the next l is a keyword or infix operator.

```dart
[1
2
3] == [1, 2, 3] //= true
```

#### Comments

Line comments start with `//` and go until the end of the line. Special comments include documentation, to-do/fix-me, pre-processor comments and more, which are recognized by the compiler.

```dart
/// JSDoc line comment
//= assertion comment
//+ testing comment
//! fixme/todo comment
//* pre-processing/linter comment
// line comment

/* block comment */ /+ nested block comment +/
/** JSDoc comment */ /++ nested JSDoc comment +/
```

#### Keywords

The following regular expression denotes all the keywords of the language, including those used for declarations, such as `var`. Some keywords such as `repeat until` or `else if` are considered a single keyword.

```txt
in of as is new infer unset
typeof nameof sizeof pairof keyof valueof
length delete create update to til thru at by
and nand or nor xor xnor not

def fun func proc process macro
type alias let var val const declare
class given enum project protocol procedure
fragment interface struct module package
namespace object record label raw data query
schema style component element trait

if else (else if) (else unless) elif elsif eless elless unless guard
for foreach (for each) repeat while until (repeat while) (repeat until)
do redo use using
try retry throw raise catch rescue finally
parallel series spawn discard
with ref defer refer show hide enter exit
then begin end debug check assert
break continue halt skip fixed lock
return give await yield
returns gives awaits yields throws raises
from where join equal equals into onto order
take drop fold scan select group
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
- [Nil or Undefined](#)
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
  - [Proxies and Reflectors](#)
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
