# Isogram

> Feels like JavaScript, better than JavaScript.

Isogram is an open-source, robustly typed language that compiles to efficient and human-readable JavaScript, enabling you to avoid type-related bugs as your applications grow in complexity. It comes with a huge standard library and a unique combination of features that no other language offers.

```coffee
/// Generates a custom Fibonacci sequence
/// with an arbitrary set of integers
export module Button {
  @React.Component
  export function make(&number: int): React.HTML = {
    let times: string = switch number {
      case 1 -> "once"
      case 2 -> "twice"
      case n -> "$n times"
    };
    let msg: string = "Click me $times";
    <button> {msg as React.string} </button>;
  };
};
```

```js
var React = require("react");

function Playground$Button(Props) {
  var count = Props.count;
  var times =
    count !== 1 ? (count !== 2 ? String(count) + " times" : "twice") : "once";
  var msg = "Click me " + times;
  return React.createElement("button", undefined, msg);
}

var Button = {
  make: Playground$Button,
};

exports.Button = Button;
```

## Introduction

JavaScript is the world's most popular programming language, by force. It's in every device with a browser, running on backends and now on mobile and IoT. It's constantly growing and evolving, being used for all kinds of things, and we're so used to pushing it to its limits.

But many people hate on JavaScript for its fundamentally flawed design, and the ecosystem that surrounds it. Bloated projects, type coercion and more. Many new languages and trans-compilers have been built to try and solve these fundamental problems, but introduce some new problems, such as cryptic stack traces or undebuggable output. This is especially important while learning, where users might want to understand how the code's compiled, and to audit for bugs.

[wtfjs]: https://github.com/denysdovhan/wtfjs/

Many new languages, frameworks and transpilers have been introduced in order to solve some of the more fundamental problems of JavaScript but they too introduce some complexity, some in terms of the generated code, some in terms of dependencies and installations.

### Isogram's Origins

Isogram started out as a holiday project in tinkering with language grammars and writing documentation about them. The name was randomly chosen from the infamous Universal Analytics snippet:

```js
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-123123123", "auto");
ga("send", "pageview");
```

I blended different parts of my favorite languages (TypeScript, Python, Rust, Go, Scala, Bash, Haskell, Perl, Ruby and OCaml) to form a new language that balanced functional programming with an object-oriented and imperative style.

## Language Principles

Isogram will have a large standard library inspired by those languages, covering many domains all the way from primitive operations in **/Core** to advanced such as:

---

This document is currently in the works and is my largest project to date. Some things are going to change. I will be posting a Trello on Isogram very, very soon, for all of you to see.

Feel free to open or contribute to the project on this GitHub repository: http://github.com/nxltm/isogram/.

### Version Name Lists

- 1.0 Don QuickSorte
- 2.0 Lord of Recursion
- 3.0 Pride and Processing
- 4.0 Frankenstack
- 5.0 Moby Docker
- 6.0 Gulliver's Transpiler
- 7.0 Parameters Lost
- 8.0 Rimraf and Peace

### Version 1.0

- Grammar (rework)
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

### Architecture

- JavaScript with Babel: compiler and standard library
  - Lodash: Core libraries

<!-- TODO: List more libraries here as modules for Isogram's standard library -->

## Guidelines and Principles

The development of a programming language should follow a set of principles, each with their own rationale behind them. Many of these ideas and principles come from languages that have inspired Isogram, including TypeScript, Python, Ruby, Elixir, Nim, Rust, Scala, Haskell, and OCaml.

- Significant whitespace.
- Everything is an expression.
- Pure and impure should be distinguished.
- Types are also expressions.
- Small, but extremely comprehensive.
- One language. No fragmentation.
- Short and sweet keywords.
- No undeclared or unwanted variables.
- No repetitive boilerplate.
- No implicit coercions.
- No warnings, just errors.
- Human-readable errors.
- No implicit global state.
- Everything is private by default.
- Exhaustive pattern matches.
- Closed world assumption

### Libraries

Isogram has a core library of modules completely implemented in JavaScript that contains a wide variety of types, each with tons of functionality and algorithms that work with them. These modules cover primitive data types and structures, documents and files, APIs, sites and more.

Isogram has a core library implemented in JavaScript that contains types, data structures, and tons of functions/algorithms that work with them.

## Language Ideas

## Updates (Grammar)

- **Features**
  - Pure object-oriented programming
  - Pure functional programming
  - Extensible classes
  - Modular standard library
  - Everything is an expression
  - Everything is an object
  - Every expression is a value
  - Every function is a value
  - Static typing
  - Type inference
  - Algebraic data types
  - Pattern matching
  - JavaScript API
  - Opaque types/type aliases
  - Redundancy checks
  - WebAssembly compilation (near future)
  - Python-inspired, keyword-based syntax
  - Custom numeric literals
  - Custom operators
  - Extended string/list slicing
  - Query expressions
  - Lazy data structures
  - Asynchrony and concurrency
  - Unquoted/raw strings
  - PCRE-compliant regular expressions
  - Pure and impure functions
  - Type constraints and combinators
  - Template string
  - Immutable data structures
  - Private & immutable by default
  - First-class concurrency
  - Extensible type classes & records
  - Higher-kinded types
  - Type inference
  - Human friendly errors (near future)
  - Interactive mode (near future)
  - Full tail call elimination
  - Tree-shaking (near future)

<!--  -->

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

#### Syntax

- Saga is a whitespace-sensitive language, which means that whitespace has a significant effect on the meaning of your code.
- Use indentation to delimit blocks of code. You can also use curly braces for compactness if you so wish to (inspired by YAML)
- Semicolons (to separate statements) or commas (to delimit values, properties or arguments) are not compulsory - rather, you would use newlines or appropriate indentation.

#### Variables

- Variables must begin with a letter (`L` or `Nl`) or the underscore character `_`. Further characters can include digits and combining marks.
- Only the underscore character is considered a "letter". `#`, `\`, `;`, `,` and all opening or closing brackets (Unicode categories `Ps` or `Pe`) are considered punctuation.
- Revamped function or method call syntax. Two or more identifiers in a row, such as `f x y z`, are now parsed as `f(x(y(z)))`. Like JavaScript, function calls are still evaluated first.
- Clauses end with `:`, `->`, `then`, `begin` or `do`.

#### Numbers

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
