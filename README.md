# Sombra

> Feels like JavaScript, better than JavaScript.

Sombra is an in-progress programming language that aims to compile to both JavaScript and WebAssembly in a language with a syntax that feels like JavaScript. It's got a great type system, a huge standard library and a unique combination of powerful features that support object-oriented, imperative, and functional programming.

```coffee
use React, Framer.Motion

public element Item(&content) {
  const [isOpen, setIsOpen] = useState(false);
  return <motion:div layout>{isOpen !: content}</motion:div>;
}

public element List(&items) {
  return <motion:ul> &uni; \j{aacute}
    {for let ({content}) in items -> <Item $content/>}
  </motion:ul>;
}
```

```html
<script>
  import X from X;
</script>
&amp;
```

## The Language

JavaScript is the world's most popular programming language, but many people still hate it for its problems which we still have to deal with today. JavaScript usage has changed drastically, and the language ever continues to evolve, but it struggles to deliver the capabilities required for the complex applications that are being developed these days.

Many new languages, frameworks and transpilers of existing languages, such as ReScript and TypeScript fill in the gaps that exist in JavaScript, so to help web developers build complex web applications that can be transpiled into JavaScript and run in the browser. Sombra is one of them.

[wtfjs]: https://github.com/denysdovhan/wtfjs/

## Sombra's Origins

In March 2020, I had a hobby project, a conlang generator, which I written in Python that utilized libraries like NumPy and NLTK that I wanted to port into JavaScript and integrate into a website. So I went with the naïve approach of transcribing my code from Python to JavaScript by hand.

I was constantly too annoyed over the little things such as missing or ambiguous semicolons, commas or even misplaced brackets, most of which [my formatter](https://prettier.io/) would handle for me. But the real pain in the ass were errors containing `undefined` or `null` (because I never knew TypeScript existed), let alone the unknown type coercion.

The real evil part for me was having a general lack of a standard library or anything of the like. This meant having to implement them myself, mainly through Stack Overflow and NPM. My JS projects are gigabytes in size when the JavaScript applications I'm developing were all simple, and I had say a thousand dependencies just for an Angular or Ionic application. Shucks.

---

I actually went through several iterations for my desired programming language, centered around either curly braces or significant whitespace. I also chose names for each of them, some after random dictionary words, others from mythology and game characters. Some include Nova, Nyx, Perplex, Saga or Sombra.

The language Sombra started out as a dialect of TypeScript with hints of Python, Ruby and OCaml thrown in. The language has since undergone many additions from more than a dozen languages, including some "derivative" languages like Elixir, Scala, Kotlin, Flix and even some old ones like C# or PHP.

The name Sombra comes from an Overwatch (even though I've never played the game) hacker character of the same name. _Sombra_ is Spanish for "shadow".

This project is currently in the works and would be my largest project to date. I will be posting a Trello on my development of Sombra very soon, and I'm looking forward for anyone out there to contribute: http://github.com/nxltm/sombra-lang/.

### Roadmap

- **Grammar** (see [`grammar.yaml`]())
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

### Architecture

- JavaScript with Babel: compiler and standard library
  - Lodash: Core libraries

<!-- TODO: List more libraries here as modules for Sombra's standard library -->

## Guidelines and Principles

The development of a programming language should follow a set of principles, each with their own rationale behind them. Many of these ideas and principles come from languages that have inspired Sombra.

- Significant whitespace
- Everything is an expression
- Pure and impure should be distinguished
- Types are also expressions
- Small but comprehensive
- One language, one version
- No undeclared or unwanted variables
- No repetitive boilerplate
- No implicit coercions
- No warnings, just errors
- Human-readable errors
- No implicit global state
- Everything is private by default
- Exhaustive pattern matches
- Closed world assumption

### Libraries

Sombra has a core library of modules completely implemented in JavaScript that contains a wide variety of types, each with tons of functionality and algorithms that work with them. These modules cover primitive data types and structures, documents and files, APIs, sites and more.

## Language Ideas

#### Syntax

Sombra is a curly-brace language, like JavaScript. It may look vaguely similar to JavaScript, but it is clearly inspired by other curly-bracket languages, like Swift, Scala, Kotlin, Go and Rust.

```coffee
func l: list[int] {
  let l1 = 1 :: 2 :: 3 :: null
  let l2 = 4 :: 5 :: 6 :: null
  l1 ::: l2
}

func len(l: {x: y, z: 1}): int = switch l {
  case null -> 0
  case _ :: xs -> 1 + len xs
}
```

You would not need to use semicolons to terminate statements, or commas to separate statements when the next statement is on the following line. Lines are joined if the first token of the next l is a keyword or infix operator.

```coffee
[1
2
3] == [1, 2, 3] //= true
```

#### Comments

Line comments start with `//` and go until the end of the line. Special comments include documentation, to-do/fix-me, pre-processor comments and more, which are recognized by the compiler.

```coffee
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

```coffee
`
  \s*(?<!(?:(?<!\.)\.|[?!:]:)=?|->)\b(
  in|of|as|is|new|infer|unset
  |typeof|nameof|sizeof|pairof|keyof|valueof
  |length|delete|to|til|thru|at|by
  |n?and|x?n?or|not|parallel|series|spawn|discard
  |func?|function|proc|process|macro
  |let|var|val|const|declare
  |class|given|constraint|enum|relation|lattice
  |project|attribute|protocol|member|extend|fragment|interface|struct
  |module|package|namespace|object|record|label
  |raw|data|query|schema|style|component|element|trait|friend|alias|type
  |if|else\s*(?:if|unless)?|els?if|ell?ess|unless|guard
  |for|each|repeat\s*\b\s*(?:while|until)?|while|until|repeat|do|redo
  |switch|case|fail|default|match|when|pass|fallthru
  |try|retry|throw|raise|catch|rescue|finally
  |with|ref|defer|refer|show|hide|enter|exit
  |then|begin|end|debug|check|assert
  |break|continue|halt|skip|fixed|lock
  |(?:return|give|await|yield|throw|raise)s?
  |import|export|show|hide|open|close
  |from|where|join|equals?|[io]nto|order
  |take|drop|fold|scan|select|group|use|using
  )\b\s*
`
```

#### Identifiers

Identifiers begin with a letter `L`, or combining punctuation `Pc`, which includes underscores. Later characters can include any digit `Nd` or combining marks `M` in addition to said characters.

```coffee
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
