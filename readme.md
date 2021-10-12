# Trinity

> One language, three aspects.

Trinity is an optionally typed, compiled, multi-paradigm and multi-faceted programming language implemented in JavaScript, enabling one to build reliable and fast-performing software for web, desktop and mobile; for the frontend, API and backend.

The language is very similar to Go, Swift, Kotlin or Scala, tied with a unified, comprehensive and clean API with minimal abstractions. These powerful features and APIs are supported out of the box, providing (almost) everything you need to develop modern applications that don't crash, quicker and safer.

```dart
contra var x = 10
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

The Trinity language derives from a combination of Scala and Swift inspired syntax, plus ML and Node/JavaScript inspired semantics. This is a reference manual for the Go programming language. This document provides an overview of the syntax, operations, and semantics in the Trinity language with an emphasis on the distinctive or unusual features in the language. as well as a comprehensive guide to the modules in Trinity's Standard Library.

### Notation

The language constructs are explained using an Extended Backus Naur Form (EBNF), with some extensions inspired by regular expressions.

- `;` - delimit productions
- `=` - assign productions
- `()` - grouping
- `!` - negates lookaround
- `<` - lookbehind: expects a match on left in order to be valid
- `>` - lookahead: expects a match on right in order to be valid
- `<!` - negative lookbehind and `!>` lookahead
- `*` - repetition: zero or many
- `+` - repetition: one or many
- `?` - optional: zero or one
- `|` - alternation: return longest match
- `/` - alternation: try operands in given order, from left to right
- `-` - subtracts a class or range from another i
- `&` - takes the intersection of two classes or ranges
- `+` - takes the union of two classes or ranges
- `~` - negates a character class or range
- `+` - takes the symmetric difference of two classes or ranges
- `a %+ b` - equivalent to `a (b a)*`
- `a %* b` - equivalent to `(a (b a)*)?`
- `a...z` - character range (inclusive)
- `a..<z` - character range (exclusive)
- ` `` ` - character class or regular expression
- `''` or `""` - verbatim strings
- `@` - makes a production case-insensitive
- `#` - wildcard: matches all production rules above based on the wildcard, creating new productions for all matches.

```dart
base12 = '...'
base14 = '...'
x# = base#

// therefore:
x12 => base12
x14 => base14
```

```dart
block = "{" statements "}";
clause = ( ("then" | "=>") statement | block);
ifStatement =
  ("if" | "lest") statement clause
  (("elif" | "elest") statement clause)*
  "else" statement;
```

Other parts of Trinity, like scoping rules or runtime semantics, are described informally.

### Tokens and whitespace

The characters used in Trinity fall into four groups:

- White space characters
- Alphanumerics: letters, digits, combining punctuation and underscores
- Operator characters (other printable characters excluding below)
- Punctuation: `` (){}[],;\'"` ``

Each token consists of a sequence of consecutive characters from just one of those groups, excluding whitespace. Whitespace is ignored except they separate tokens.

A sequence of alphanumeric characters, with no additional non-alphanumeric characters, is a single token. White-space must be used to separate two such tokens in a program. The same thing goes for operators.

### Source code representation

Source code is Unicode text encoded in UTF-8. Other encodings are not supported. Any of the standard platform line termination sequences can be used. All of these forms can be used equally, regardless of the platform.

### Comments

Comments start anywhere outside a string or character literal with two slashes. A comment piece starts with # and runs until the end of the line. The end of line characters belong to the piece.

If the next line only consists of a comment piece with no other tokens between it and the preceding one, it does not start a new comment:

```dart
1 // This is a single comment over multiple lines.
// The scanner merges these two pieces.
// The comment continues here.
```

Documentation comments are comments that start with three slashes `///` rather than two. Documentation comments are tokens; they are only allowed at certain places in the input file as they belong to the syntax tree!

```dart
1 /// This is a documentation comment
```

Trinity supports two types of multi-line comments beginning with `/*` and ending in `*/`.

```dart
/*  Comment here.
    Multiple lines
    are not a problem. */
```

`/*` comments do not support nesting. `/+` does however.

```dart
/+
/+ Multiline comment in already commented out code. +/
+/
```

Multiline documentation comments also exist and support nesting too. They begin with two asterisks or plus signs (`/**` `/++`) instead of one, and end in only one of each type.

```dart
/** this is a multi-line documentation comment */
/++ and this is its nested cousin +/
```

#### Keywords

The following regular expression denotes all the keywords of the language, including those used for declarations, such as `var`.

Keywords are grouped into three:

- expression keywords, which are keywords used as operators;
- declaration keywords, which declare program entities such as variables, classes and functions,
- modifier keywords which modify such declarations,
- general keywords which command and control program flow and execution.

<!--  -->

    in of as is new to til thru by unset

    var val let const decl def fun type
    class enum mod pack struct inter space
    proc proto macro given style elem field
    ext pred data trait lemma iter sub

    if un elif elun else then
    for each loop while until when
    with do from
    try throw catch fix
    switch match case fail
    unite queue spawn kill lock
    break skip redo retry return await label yield goto pass
    import export using
    desc debug check assert assume

#### Identifiers

In [The Unicode Standard 14.0](https://www.unicode.org/versions/Unicode14.0.0/UnicodeStandard-14.0.pdf), **Table 4-4** defines a set of character categories for all Unicode characters.

Trinity treats the entire Unicode `L` super-category as Unicode letters, `M` as combining marks, `Pc` as "underscores", `Pd` as dashes and `Nd` as digits.

```dart
letter = `\pL`; mark = `\pM`; delim = `\pPc`;
digit = `\pNd` = `\d` = "0"..."9";
lower = `\pLl`; upper = letter - lower; dash = `\pPd`;

identifier = [letter delim] [letter delim mark digit]*;
jsxTagName = [letter delim] [letter delim mark digit dash]* dash;
```

JSX tags can also include dashes, but must not end with dashes. The `!` notation ensures that.

Naming conventions follow Java or JavaScript. There are four types of identifiers which Trinity recognizes and highlights accordingly:

- `SHOUT_CASE`, used for constants,
- `PascalCase` used for classes, modules, namespaces, and types.
- `camelCase` or `snake_case` used for variables, parameters, functions and methods.
- `_leading` underscores for special methods and keywords.

```dart
shoutCase  = upper [upper digit mark delim]*;
snakeCase  = delim [letter digit mark delim]*;
pascalCase = (upper [lower digit mark delim]*)+;
camelCase  = [letter delim] [letter delim mark digit]*;

identifier = shoutCase / snakeCase / pascalCase / camelCase;
```

Variables are compared using their first character, then comparing further characters case-insensitively and ignoring all delimiters. This makes it easier for developers to use varying conventions without having to worry about the variables' exact spelling.

```dart
proc cmpIdent(a: Str, b: Str): Bool => a[0] == b[0] &&
  a.sub(`[^\pL\d]+`g, "").lower() == b.sub(`[^\pL\d]+`g, "").lower();
```

The above rule does not apply to keywords, as all keywords are all-lowercase. Because of this rule, to strop keywords, add one or more trailing underscores.

Keywords lose meaning and become ordinary identifiers when they are part of a qualified name, meaning preceded by any of `.`, `?.`, `!.`, `~.`, `::`, `?:`, `!:`, `.=`, `?.=`, `!.=`, `~.=`, `::=`, `?:=`, and `!:=`.

```dart
type Type = {
  method: Func;
};

const object_ = new Type({method: |x| x = 1});
assert object_ is Type;
assert object_.method == 9;

var var_ = 42;
const let_ = 8;
assert var_ + let_ == 50;

val assert_ = true;
assert assert_;
```

### Strings

#### Double-quoted (Escaped) Strings

Terminal symbol in the grammar: `EscStrLit`. Escaped string literals are delimited using matching double quotes, and can contain the following escape sequences:

| Escape Sequence      | Meaning                                                                      |
| -------------------- | ---------------------------------------------------------------------------- |
| `\p`                 | platform specific newline<br> CRLF (`\x9\xA`) on Windows, LF on Unix (`\x9`) |
| `\r`                 | carriage return (`\x9`)                                                      |
| `\n`                 | line feed (or newline) (`\xA`)                                               |
| `\f`                 | form feed (`\xC`)                                                            |
| `\t`                 | horizontal tabulator (`\x9`)                                                 |
| `\v`                 | vertical tabulator (`\xB`)                                                   |
| `\a`                 | alert (`\x7`)                                                                |
| `\b`                 | backspace (`\x8`)                                                            |
| `\e`                 | escape (`\xB`)                                                               |
| `\s`                 | space (`\x20`)                                                               |
| `\b` (beside 0 or 1) | _Base 2_ - from `0` to `100001111111111111111`                               |
| `\q`                 | _Base 4_ - from `0` to `10033333333`                                         |
| `\s` (beside 0 to 5) | _Base 6_ - from `0` to `35513531`                                            |
| `\o`                 | _Base 8_ - from `0` to `4177777`                                             |
| `\d` or `\`          | _Base 10_ - from `0` to `1114111`                                            |
| `\z`                 | _Base 12_ - from `0` to `4588A7`                                             |
| `\x`                 | _Base 16_ - from `0` to `10FFFF`                                             |
| `\u`                 | UTF-8, 16 or 32 code units only                                              |
| `\j`                 | Named Unicode characters (more later)                                        |

Trinity also supports escapes in many bases. The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}";
"\d{72 69 76 76 69}" == "\72\69\76\76\79";
```

#### Single-quoted (raw) strings

Terminal symbol in the grammar: `RawStrLit`. Single-quoted raw strings the escape sequences for double-quoted strings mentioned above are not escaped. To escape a single quote, double it.

```dart
var daughterOfTheVoid = 'Kai''Sa';
```

#### Multi-line strings

Terminal symbol in the grammar: `MultiRawStrLit` and `MultiEscStrLit`.

String literals can also be delimited by at least three single or double quotes `""" ... """`, provided they end with at least that many quotes of the same character. The above rules for single- and double-quoted strings also apply.

```dart
"""" "stringified string"""""
```

produces:

```txt
"stringified string"
```

#### Macro Strings

Terminal symbols in the grammar: `Macro(Multi)?(Raw|Esc)StrLit`.

The construct `identifier"string literal"` (without whitespace between the identifier and the opening quotation mark) is an example of a macro string. It is a shortcut for the construct `identifier("string literal")`, so it denotes a `macro` call with a raw string literal as its only argument.

Macro string literals are especially convenient for embedding DSLs directly into Trinity (for example, SQL).

### Numbers

Numbers are of a single type, and have the following form as shown below. If a number contains only an integer part, it is considered an integer.

Type suffixes can also be used to cast numeric literals to the appropriate type; alternatively, the type can be inferred from the surrounding context: `var x: i16 = 1` and `var x = 1:i16` are one and the same.

```dart
customBasePrefix = ("2"..."9" | "1"..."9" digit+) @"b";
customBaseDigits = `[:alnum]`;
base2Prefix = @"0b";  base2Digits = "0" | "1";
base4Prefix = @"0q";  base4Digits = "0"..."3";
base6Prefix = @"0s";  base6Digits = "0"..."5";
base8Prefix = @"0o";  base8Digits = "0"..."7";
base10Prefix = "";    base10Digits = digit = "0"..."9";
base12Prefix = @"0z"; base12Digits = digit | @"a" | @"b";
base16Prefix = @"0x"; base16Digits = digit | @"a"...@"f";

#IntegerPart = #Digits ("_"+ #Digits)*;
#FractionPart = "." #Digits ("_"+ #Digits)*;
#RepeatingPart = "*" #Digits ("_"+ #Digits)*;
#DenominatorPart = "/" #Digits ("_"+ #Digits)*;

decimal = "0" | "1"..."9" digit+;
ExponentPart = ("*" decimal)? "^" ["+" "-"]? decimal;
RoundingPart = "=" ["+" "-" "~"]? decimal;
TypeSuffix = ":" identifier;

#NumericLit = #Prefix
            ( #IntegerPart #DenominatorPart? |
              #IntegerPart #FractionPart? #RepeatingPart? |
              #IntegerPart? #FractionPart #RepeatingPart? )
              ExponentPart?
              RoundingPart?
              TypeSuffix?;
```

Any other pseudo-identifier that starts with a digit are not matched and are considered a syntax error.

### Operators

Trinity allows user defined operators. An operator is any punctuation `P` or symbol `S` character, except `` ()[]{}'"`,; ``. These keywords are also operators: `in of as is new to til thru by unset del`.

`.=`, `:`, `=`, `:=`, `? :`, `! :` and `$ :` are not available as general operators; they are used for other notational purposes. `=>` is a special case, as it is syntactic sugar for `then` and introduces a block.

### Other tokens

The following strings denote other tokens:

```
' " ` #( ( ) #{ { } #[ [ ] , ; : =>
```
