# sagascript
An in-progress Pythonic programming language.
# SagaScript

> Yet another JavaScript-like language with a Pythonic syntax.

SagaScript is a modern functional, imperative and object-oriented programming language with a syntax inspired by Python, and (will) compile(s) to JavaScript and WebAssembly. SagaScript as well as powerful features and APIs out of the box, SagaScript provides everything you need to develop modern applications that don't crash, quicker and safer.

```coffee
#: Generates a custom Fibonacci sequence
#: with an arbitrary set of integers
rec gen def fib[N: int](*start: []N, term: N): N =
  if term of start:
    yield start[term - 1]
  elif term > len start:
    yield from in term - len start to term
      select x => fib start, x
      fold left (+)
  else:
    raise new Error
      "Invalid term in Fibonacci sequence"
```

```ts
import S from "@Saga/core";
import {len, range} from "@Saga/std";
import {Int} from "@Saga/types";

export default function* fib<N extends Int>(...start: N[], term: N): N {
  if (term in start) {
    yield start[term - 1];
  } else if (term > len(start)) {
    yield (range(term - len(start)).to(term) as S.Range)
      .select(x => fib(start, x))
      .foldLeft(($0, $1) => $0 + $1);
  } else {
    throw new Error("Invalid term in Fibonacci sequence");
  }
};
```

## Introduction

JavaScript is a very flexible and versatile language today, however in the beginning it was never designed that way. It has received tons of backlash by the programming community: bloated NPM projects, weak typing and countless other reasons. I can go on for hours explaining why JS is good or bad, but I've hooked up [a source][wtfjs] on GitHub instead.

[wtfjs]: https://github.com/denysdovhan/wtfjs/

It seems, by force, JS has become the most popular programming language in the world. It's in every browser, and in perhaps every backend and every IOT device in the world. And with the creation of many client-side app environments like Ionic and Electron, JS had been used to create native applications such as VS Code and Vivaldi. It's constantly evolving and constantly growing, being used for all kinds of applications.

Many new languages, frameworks and transpilers have arisen in order to hide the existing implementation of JavaScript, but some of them introduce some new problems. Tons of boilerplate code is generated and dependencies are installed, and as a result, JavaScript projects naturally bloat with tons of dead code, lots of which the project doesn't actually use.

### SagaScript's Origins

SagaScript started out as a holiday project in tinkering with language grammars and writing documentation. The language started out as TypeScript with the semantics of Python, and over the months has pulled many influences from other languages such as Ruby, Elixir, Clojure, LiveScript, Haskell, OCaml, Go, Scala, Flix, Bash and YAML.

SagaScript aims to compile to two languages: JavaScript and WebAssembly, both readable, boilerplate-free and performance-optimized. SagaScript's library will be implemented completely in JS, which means you can inter-mix SagaScript code with regular JS or TypeScript through Babel, call SagaScript code from JavaScript, and even use SagaScript's APIs from within vanilla JS.

## Language Principles

SagaScript will have a large standard library inspired by those languages, covering many domains all the way from primitive operations in **/Core** to advanced such as:

---

This document is currently in the works and is my largest project to date. Some things are going to change. I will be posting a Trello on SagaScript very, very soon, for all of you to see.

Feel free to open or contribute to the project on this GitHub repository: http://github.com/nxltm/sagascript/.

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

<!-- TODO: List more libraries here as modules for SagaScript's standard library -->

## Guidelines and Principles

The development of a programming language should follow a set of principles, each with their own rationale behind them. Many of these ideas and principles come from languages that have inspired SagaScript, including TypeScript, Python, Ruby, Elixir, Nim, Rust, Scala, Haskell, and OCaml.

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

SagaScript has a core library of modules completely implemented in JavaScript that contains a wide variety of types, each with tons of functionality and algorithms that work with them. These modules cover primitive data types and structures, documents and files, APIs, sites and more.

SagaScript has a core library implemented in JavaScript that contains types, data structures, and tons of functions/algorithms that work with them.

## Language Ideas

## Updates (Grammar)

- **Features** 
  - Full support for OOP and FP
  - Extensible classes
  - First-class functions
  - Comprehensive standard library
  - "Everything is an expression"
  - Static typing, dynamic feel
  - Algebraic data types
  - Pattern matching
  - JavaScript interop
  - WebAssembly compilation (near future)
  - Python-inspired syntax
  - Keyword-based syntax*
  - Custom numeric literals
  - Custom operators
  - Extended string/list slicing
  - Query expressions
  - Sequential types and generators 
  - Asynchrony support
  - Unquoted/raw strings
  - PCRE-compliant regular expressions*
  - Pure `func` and impure `proc`
  - Type constraints and combinators
  - Embedded language support
    - HTML, CSS, JS, JSON, YAML, TOML, HAML, Pug, Markdown, SASS, SCSS, LESS, Stylus, CoffeeScript, LiveScript
  - Immutable data structures
  - Private/immutable by default
  - First-class concurrency
  - Extensible type classes & records
  - Higher-kinded types
  - Type inference
  - Opaque types/type aliases
  - Human friendly errors (near future)
  - Interactive mode (near future)
  - Redundancy checks
  - full tail call elimination
  - Tree-shaking (near future)

- **To-Do:**
  - Add support to the first set of embedded languages:
    - YAML
    - Stylus/SASS
    - HAML, Pug or Slim
    - JavaScript, Ruby, CoffeeScript and Python
  - Use Oniguruma to figure out how to validate arbitrary-radix numeric literals and highlight them.
  - Rework query syntax, which is inspired by SQL.
    - Query syntax begins with `from`.
    - Ends in a `select` statement.
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

