# Trinity

> The language of the future.

**Trinity** is an open source, fully featured and agile language that enables developers, designers and testers to build, test and deploy their projects with less code, no matter the platform or runtime. It provides avenues to access huge ecosystems of libraries and runtimes, without the need for any installation.

Out of the box, it provides a robust program verifier and type checker that flags any errors to you so you can catch bugs early, and comes with a unified and comprehensive API and core libraries for making everyday or specialised tasks easier.

```dart
import Math.[Point, Random]

// Main function
async proc main {
  print("Compute π using the Monte Carlo algorithm")
  await for val estimate in computePi().take(100):
    print("π \x2245 $estimate")
}

// Iterator functions (function* in JavaScript)
async iter computePi(&batch: 1^5): Stream[Float] {
  var total = 0, count = 0
  loop {
    val points = generateRandom().take(batch)
    val inside = from val p in points
                 where p.isInsideCirc()
    total += batch
    count += inside.len
    val ratio = count / total
    yield ratio * 4
  }
}

sync iter generateRandom(*seed: []Int): Point {
  val random = Random(seed)
  loop:
    yield Point(random.nextFloat(), random.nextFloat())
}
```

### Roadmap

> Update: I have a [Trello](https://trello.com/b/A3NDX7qY/trinity-programming-language) now!

- **Grammar** (see [`grammar.yaml`](https://github.com/NoxVentura/TrinityLang/blob/main/grammar.yaml))
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

## Overview

Trinity is ap rogramming language designed wit
Trinity is a programming language designed with web, mobile, desktop and systems in mind. It is strongly typed, compiled, garbage-collected and has explicit support for multiple paradigms, including object-oriented, functional, concurrent and reflective programming.

Trinity takes on its influences from [Go][go], [Kotlin][kotlin], [Rust][rust], [Scala][scala], [ReScript][rescript], [TypeScript][typescript], [C#][csharp], [Flix][flix], [Gosu][gosu] and [Fantom][fantom] (_not the malware_). With these influences, Trinity advocates for writing readable and expressive code, and enabling you to do in Trinity what you could in other languages.

[wtfjs]: https://github.com/denysdovhan/wtfjs/
[go]: https://golang.org/
[kotlin]: https://kotlinlang.org/
[rust]: https://www.rust-lang.org/
[rescript]: https://rescript-lang.org/
[scala]: https://www.scala-lang.org/
[swift]: https://swift.org/
[typescript]: https://www.typescriptlang.org/
[fantom]: https://fantom.org/
[csharp]: https://docs.microsoft.com/en-us/dotnet/csharp/
[flix]: https://flix.dev/
[gosu]: https://gosu-lang.github.io/

## Origins

Trinity was created in 2020 as a way to write software, apps and games, to run on the web, desktop, mobile and server with a singular language. It grew through tinkering with regular expressions and testing them with themes and writing documentation about them. The name Trinity as there are three aspects to the language: frontend, middle-end and backend.

The mission is to create a language that is portable to (lower)-level runtimes such as Deno, JS, WebAssembly, JVM, .NET, LLVM, Swift and Python, abstracting away these runtimes and UI components into a powerful API. And since this is a completely new language in the works, to enable the analysis and translation of existing code and programs in different languages to Trinity through machine learning.

### Philosophies:

- **General guidelines**: A programming language should follow a set of strict guidelines and principles, fully backed by reasons. By outlining these principles, as Trinity grows , I hope to keep myself honest and to communicate the kind of language it aspires to be.

  - **One language**: Trinity is forever one language. The compiler will not have extra flags or plugins that change how it behaves (even for language supersets like TypeScript or Groovy). We want to avoid fragmentation so to avoid programs written in different "dialects" of the language.
  - **Fail fast, fail hard**: To aid development and debugging, and to prevent _potential harmful behaviour_, Trinity aborts execution when it encounters an unrecoverable error, or in the presence of concurrency, if a process fails. This ensures that whatever is going on outside gets notified so they can take action.
  - **Useful error messages and stack traces**: Like Rust, Elixir and Python, Trinity aims to have understandable and human readable error messages. They should describe _what_ went wrong, _why_ it went wrong, _where_ it went wrong and _how_ it went wrong, and to suggest what to do about it.
  - **No warnings, only errors**: Trinity's compiler never emits warnings, only errors that abort compilation. Warnings in other languages can be suppressed. Sometimes they can be harmless but could cause adverse side effects. In Trinity, any code that seems suspicious or wrong to the compiler should be downright rejected.
  - **Documentation and unit tests**: Trinity supports useful annotations including comments, and unit test syntax, the latter inspired by Dafny. Such integrations will deeply benefit developers, and any newcomers who are learning how to use software and libraries.

- **Simplicity**: We should not confuse getting things right with making things easy. But we should try to achieve both. By removing or suppressing syntax salt, we can let other things take advantage. This in turn can improve overall developer productivity.

  - **Keyword-based**: Short keywords such as `proto`, `elem` and `def` makes it easy to visually identify the overall structure of code. All keywords are between two and six letters long, are short enough to reason about, and are written entirely in lowercase.
  - **Uniform function calls**: Trinity supports uniform function calls, where function calls `f(x, y)` can be represented in an object-oriented way, as `x.f(y)`. This is a purely syntactic mechanism and does not influence the semantics of a call.
  - **Declaration vs expression**: Trinity is functional, so everything is either an expression or declaration. Control flow statements while being statements in other languages are expressions in Trinity. Control flow statements such as `break`, `skip` and `throw` are really program calls.
  - **Naming conventions**: Trinity employs partial case-insensitivity which enables developers to use varying conventions without the need for others to know the exact spelling of an identifier. types, modules, constants and classes use uppercase, while functions, parameters, methods and variables are lowercase.
  - **Consistent syntax**: Trinity aims to have consistent and predictable syntax. For example, the syntax for string interpolations, `${}` or `$` are used in regular expressions and JSX. The syntax for types also mirror that of expressions: function application `f(a, b)`; type application `F[a, b]`.
  - **Spacing and evaluation order**: Spacing means the difference - in line with coding conventions, all operators need to be spaced out depending on how they are evaluated, and helps the parser infer on which types to perform operations on. It also gives you the ability to mold the language into whatever you desire.

- **Multi-paradigm**: Trinity supports functional, imperative, concurrent and reflective programming, the last to an extent. And the many constructs of Trinity makes it easy to separate each paradigm from one another.

  - **Nothing before `main`**: In Trinity, `main` is the entry point of a program. No (user-defined) code is ever executed before `main`. This makes it easy to reason about startup behavior.
  - **Share memory by communicating**: Trinity follows Go's paradigm of shared memory by communication. Processes should only share immutable messages (and data structures). This significantly reduces the risk of race conditions.
  - **Dead code elimination**: Trinity requires all code to be available at compile-time. This enables a range of compilation techniques, such as program analysis, code optimisation, and tree shaking.
  - **Private by default**: In Trinity, declarations are hidden by default (i.e. private) and cannot be accessed from outside of their namespace (or sub-namespaces). It is important that programmers make a conscious choice about when to make a declaration visible.
  - **Declare before use**: In Trinity things must be defined before they can be used. Declarations make it easy to assign blame; we assume declarations to be correct and check every use against its declaration. Also, unused declarations are flagged at compile time.
  - **No unnecessary declarations**: We believe that a programming language should reduce the volume of declarations it requires. Declarations may be useful and are sometimes necessary, but Trinity aims to minimize its internal dependence on them.

- **The little things**: The beauty of a new language is that it gives you a clean slate to fix all the little things that aggravate you.

  - **Default parameters and types**: functions can have default arguments; no need to write more boilerplate code for even convenience functions
  - **Explicit type conversion**: Use `as` to convert between types, and `is` for type checking. In Flix, a value of one type is never implicitly coerced or converted into a value of another type. For example,
  - **Type annotations**: Type annotations are necessary in the sense that they make it easier to read and clear up potential ambiguity. Any expression or declaration as well as their parameters can be annotated with types, and they are thrown away at runtime.
  - **Numeric precision**: Trinity only has `Nat`, `Int` and `Float` as the default numeric types. This would eliminate a lot of complexity associated with precision or integer overflow problems such as file lengths, Unicode characters, hash codes or very large lists or strings.

## Table of Contents

This document provides everything you need to know about Trinity, from the syntax, operations and features of the language, to its core libraries and modules. This is not meant to be a tutorial or reference, but rather an aid for existing developers coming from other languages who want to learn more about how the language works and have questions to ask.

This reference is a work in progress and will be improved over time. See the GitHub repository at https://github.com/NoxVentura/TrinityLang. Contributions and corrections are welcome.

A lot of my work on Trinity is still experimental and ongoing, so I am sharing this repository so I could get all of my ideas together and perhaps invite some of you to contribute your own. Once I get done with it, we can begin work on the compiler.

### A little disclaimer

Trinity is a language in which programs are not text. That is, the source of truth for a program is not its textual representation as source code, but its structured representation as an abstract syntax tree (AST).

This document describes Trinity in terms of its default (and currently, only) textual rendering into source code.

Trinity only encodes text in UTF-8; other encodings are not supported. Any of the standard line termination sequences can be used, depending on the platform: `\r`, `\n` or `\r\n`.

Trinity has only three file types: module (`*.3n`), script (`*.3s`), config (`*.3c`) and markup (`*.3m`).

Module files are the most commonly used as they can be imported and exported through packages. The entry point of a Trinity module is defined in the `main` function.

```dart
/// @file main.3n
fun main(*args: []Str): Void { /*...*/ }
```

The type annotations or the spread `*args` declaration can be left out, so it can be `fun main {}` instead.

Script files do not have a `main` function, but they can import other modules and files.

Trinity markup is a special branch of Trinity whose syntax is derived from JSX, HTML and Stylus which enable you to build UIs, style them and add functionality. HTML snippets can be interlaced in Trinity module files and passed on as objects.

```dart
import Native.{Text, View, StyleSheet, Button, Audio}

export pub elem App: View {
  field sound: Audio {
    async del proc unload: Void =
      if !?self:
        print("Unloading sound") && self = void
    async new proc load: Void {
      print("Loading sound")
      self = await import "./assets/Hello.mp3"
      self.play()
    }
  }

  return <View style=$styles.container>
    <Button title="Play Sound" onPress=sound.load()/>
  </View>
}
```

## Syntax

### Some Guidelines

#### Syntax

Trinity is a curly-brace language similar to JavaScript, Rust, Scala and Kotlin, which means that code blocks and closures are delimited using curly brackets.

Semicolons are completely optional though they can be used to terminate multiple statements on the same line. This makes it easier to

#### Comments

Comments start anywhere outside a "string" literal with two slashes, and runs until the end of the line. If the next line only of a comment piece with no other tokens between it and the preceding one, it does not start a new comment.

```dart
const x = 10 // This is a single comment over multiple lines.
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

`/+ +/` allow nesting.

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

### Top-level declarations

A top-level declaration can appear at the top level or outermost scope of a Unison file. It can be one of the following forms:

- A declaration, like `let x = 42`, or `type Option[a] = None | Some[a]`.
- An `import`, `export` or `using` clause.

A variable binding begins with `var`, `val`, `let`, or `const`. `var` and `let` declare an mutable variable binding, whereas `val` and `const` declare a mutable variable binding. All bindings are [block-scoped](https://medium.com/@allansendagi/block-scope-in-javascript-8fd2f909e848).

A variable binding looks like this:

```dart
var x = 42
let x: Int = 42
```

`let` and `const` bindings can be redeclared, even on the same scoped.

```dart
var x = 42
let x: Int = 42
```

Multiple variables can be assigned, similar to Python:

```dart
val x, y = 0, 0
```

Or unpacked from an iterable, list (array), set or map:

```dart
(x, y): (Int, Int) = (42, 42)
[x, y]: [Int, Int] = [42, 42]
{x, y}: {[Str]: Int} = {x: 42, y: 42}
{x, y}: {}Int = {42, 10}
```

### Keywords

The following are all the keywords of the language. Keywords are grouped into five different sections:

- expression keywords, which are keywords used as operators
- declaration keywords, which declare program entities such as variables, classes and functions,
- modifier keywords which modify such declarations,
- general keywords which command and control program flow and execution.
- pre-defined, or dynamic constants and variables.

As for modifier keywords, they are parsed as keywords before a declaration as they modify them. `pub var x = 1` declares a public variable.

<!--  -->

    in of as is new to til thru by del unset

    var val let const decl def fun type sin
    class enum mod pack struct inter space
    proc proto macro given style elem field
    ext pred data trait lemma iter sub prop

    pub priv prot inline final mut immut ghost
    seal abs intern extern imply exply global local
    sync async stat dyn lazy eager strong weak
    vol unsafe unfix bound free opaque trans
    rec gen oper get set post put rem new del patch early late joint contra
    prefix suffix infix primary unary left right

    if un elif elun else then
    for each loop while until when
    with do from
    try throw catch fix
    switch match case fail
    tandem unison series spawn kill lock
    break skip redo retry return await label yield goto pass
    import export using
    debug assert where

    true false null void nan infin
    it this that super self target
    params ctor proto pro

### Identifiers

Trinity defines Unicode letters, combining diacritical or punctuation marks, and decimal digits as identifier characters. A sequence of those would form an identifier, provided they do not start with a combining diacritical mark or a decimal digit.

Tags and attributes used for JSX tags can include dashes, but must not end with any amount of trailing dashes.

#### Naming conventions

Naming conventions follow Java or JavaScript. There are four types of identifiers which Trinity recognizes and highlights accordingly:

- `SHOUT_CASE`, used for constants,
- `PascalCase` used for classes, modules, namespaces, and types.
- `camelCase` or `snake_case` used for variables, parameters, functions and methods.
- `_leading` underscores for special methods and keywords.

#### Identifier Comparison

Variables are compared using their first character, then comparing further characters case-insensitively and ignoring all delimiters. This makes it easier for developers to use varying conventions without having to worry about the variables' exact spelling.

```dart
proc cmpIdent(a: Str, b: Str): Bool =>
  a[0] == b[0] &&
  a.sub(`[^\pL\d]+`g, "").lower() == b.sub(`[^\pL\d]+`g, "").lower()
```

All keywords are written with all lowercase characters. To strop keywords, add one or more trailing underscores. Keywords also lose their meaing when they are part of a qualified name, not including its source (the leading parts of oa).

```dart
type Type = {
  def: Func,
}

val object_ = new Type({def: |x| x = 10})
assert object_ is Type
assert object_.def == 9

var var_ = 42
val val_ = 8
assert var_ + let_ == 50

val assert_ = true
assert assert_
```

### Booleans, Null and Void

`Null` and `void` are one and the same.

```dart
null; void
assert null == void
assert null == void
```

A boolean data type can only have two values: `true` or `false`. Booleans are mainly used for control flow, and there are a lot of operators that return boolean values.

```dart
true; false
```

All values default to an empty value, which means they yield `false` when converted into booleans. All other values, including non-primitive objects, yield true.

Boolean values also come as a result of comparisons, or other logical operations.

```dart
val isGreater = 4 > 1 // true
```

### Numbers

Trinity supports integers and floating-point numbers. Floats compile to regular JavaScript `number`s, [IEEE-754 double-precision floating-point][double] while integers compile to `bigint` (arbitrary-precision integers). Floats are typically distinguished between integers with a dot.

[double]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format

```dart
val integer: Int = 123
val floating: Float = 12.345
```

[double]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format

Numbers are case-insensitive including its type suffix, and can contain leading zeroes and underscores for readability. Integer and floating-point literals can be written in base 2, 4, 6, 8, 10, 12 or 16:

| Base | Name        | Prefix    | Digits                       |
| ---- | ----------- | --------- | ---------------------------- |
| 2    | Binary      | `0b`      | `0` and `1`                  |
| 4    | Quaternary  | `0q`      | `0` to `3`                   |
| 6    | Senary      | `0s`      | `0` to `5`                   |
| 8    | Octal       | `0o`      | `0` to `7`                   |
| 10   | Decimal     | no prefix | `0` to `9`                   |
| 12   | Duodecimal  | `0z`      | `0` to `9`, then `a` and `b` |
| 16   | Hexadecimal | `0x`      | `0` to `9` then `a` to `f`   |

```dart
val base2 = 0b101010111100000100100011
val base4 = 0q320210213202
val base6 = 0s125423
val base8 = 0o52740443
val base10 = 0011256099
val base12 = 0z10a37b547ab97
val base16 = 0xabcdef123
```

Floating-point numbers can allow different kinds of delimiters and separators,

Repeating fractional blocks are separated with a tilde `~`, so `0.3~33` or simply `0.~3` is equal to `0.33333333333333...`. Fractional literals separate their numerator and denominator with a slash `/`.

```dart
0.3~33 == 0.~3 == 1/3
```

Exponents are relative to the base, but are written in base 10. Therefore `1 * 16^10` is equal to `0x1^10`. If you want a custom base, use the notation `coefficient*base^power`, where the power is signed.

```dart
1 * 16^10 == 0x1^10
```

Precision is delimited using `=n` where `n` is the number of places after the "decimal" point. `!` counts significant figures rather than mantisa digits, while `-` or `+` toggles whether to always round up or down as opposed to automatically.

```dart
10=10
```

The last component of a numeric literal is called a _type suffix_. The colon denoting the type suffix cannot be left out.

By extending from the class `Numeric.Format`, arbitrary base values can be used. By default, all digits are decimal, though any alphanumeric character can be used.

Arbitrary bases can be used, beginning with `nb` where `n` is a positive integer greater than 1. The digits are usually decimal, though any alphanumeric can be used when suffixed with a type.

```dart
class Base17 < Numeric.Format {
  swap field digits: Str | []Char = '0123456789abcdefg'
  swap field under: Bool = false
}

const number = 17b1894398:Base17
assert number == 17b1_89__43_98:Base17 == 36268794
```

### Strings

Strings function the same way as in JavaScript, and are delimited by matching quotes. Only double-quoted strings contain escape sequences which all begin with a backslash. Single-quoted strings are raw, which means that escape sequences are not transformed.

```dart
var s1 = 'Single quotes work well for string literals.'
var s2 = "Double quotes work just as well."
```

Single-quoted raw strings the escape sequences for double-quoted strings mentioned above are not escaped. To escape a single quote, double it.

```dart
var daughterOfTheVoid = 'Kai''Sa'
```

Double quoted string literals can contain the following escape sequences, and can contain the following escape sequences:

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

Trinity also supports escapes in even bases up to 16, excluding 14.

| Escape Sequence      | Meaning                                        |
| -------------------- | ---------------------------------------------- |
| `\b` (beside 0 or 1) | _Base 2_ - from `0` to `100001111111111111111` |
| `\q`                 | _Base 4_ - from `0` to `10033333333`           |
| `\s` (beside 0 to 5) | _Base 6_ - from `0` to `35513531`              |
| `\o`                 | _Base 8_ - from `0` to `4177777`               |
| `\d` or `\`          | _Base 10_ - from `0` to `1114111`              |
| `\z`                 | _Base 12_ - from `0` to `4588A7`               |
| `\x`                 | _Base 16_ - from `0` to `10FFFF`               |
| `\u`                 | UTF-8, 16 or 32 code units only                |
| `\j`                 | Named Unicode characters and LaTeX expressions |

The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

In single quoted strings, to escape single quotes, double them.

```dart
var s3 = 'It''s easy to escape the string delimiter.'
var s4 = "It's even easier to use the other delimiter."
```

In double-quoted strings, an ending backslash joins the next line _without spaces_.

```dart
assert "hello \
        world" == "hello world"
```

#### Block strings

String literals can also be delimited by at least three single or double quotes, provided they end with _at least_ that many quotes of the same type.

The rules for single- and double-quoted strings also apply.

```dart
'''
  "stringified string"
'''
""" "stringified string""""
```

produces:

    "stringified string"

All newlines and whitespace before the first non-line character and after the last non-line character are discarded.

All indentation is determined based on the first line of text (the first non-whitespace character). All indentation after that column is preserved while those before it are discarded.

Newlines are normalized to `\n`.

```dart
'''
"stringified
  string"
''' ==
"""
  "stringified
    string"
"""
```

Any string that does not obey this rule is a compile-time error.

```dart
"""
  "stringified
string"
"""
```

#### Backslash strings

Strings can also be delimited using an initial backslash. Strings cannot contain any sequence of `\s`, `\n` `,`, `;`, `'`, `"`, `` ` ``, `<`, `>`, `$`, `(`, `)`, `{`, `}`, `[`, `]`, `/>`, `::`, `!:`, `?:`, `.`, `!.`, and `?.`.

```dart
\word
func(\word, \word)
func\word
[\word]
{prop: \word}
```

Backslash block strings also begin with a backslash followed by either `|` or `>`, both functioning like block strings. `\|` behaves like the single quote and `\>` the double quote.

Block strings also begin with a backslash followed by either `|` or `>`, both functioning like `|` block strings. `\|` behaves like the single quote and `\>` the double quote.

Like YAML, backslash block strings can also be appended with a "chomping indicator" `+` or `-` to preserve or remove the line feed, or fold the line past how many spaces.

```dart
\|
  this is my very very "very" long-ass string.
  Love, Trinity.
\>
  this is my very very "very" long-\
  ass string.\nLove, Trinity.
```

Trinity comes with several avenues to make manipulating, formatting and serializing strings easier.

#### String Interpolation

All forms of string literals, with exception to inline backslash strings, can enable embedding of arbitrary expressions. Embedded expressions are prefixed with the dollar and surrounded by curly brackets.

If the expression is an identifier or qualified name, then the brackets can be left out. Use the `\$` escape sequence if you wish to express the dollar sign itself.

```dart
"x is $x, in hex $x.toHex, and x+8 is ${x + 8}"
```

is syntax sugar for:

```dart
"x is " + x + ", in hex " + x.toHex + ", and x+8 is " + (x + 8)
```

The hash sign takes several arguments, as placeholders, passed to the `format` method. Arguments can either be named, numbered or keyed.

```dart
'#0%s is #1 meters tall'.format('James', 1.9)
// "James is 1.9 meters tall"
```

#### Format Directives

Trinity provides an extensive string formatting mini-language for converting, transforming, transl(iter)ating and serialising strings. Its syntax derives from Command Prompt.

They are composed of the following parts:

- A command: `%command` denoted by a percentage sign
- An optional range of switches, each denoted by a slash `/switch`,
- Their optional values, separated by a colon: `/sw:value`.

```dart
const prices = { bread: 4.50 }
'I like bread. It costs $prices.bread%f/cur:SGD.'
// "I like bread. It costs $4.50."
```

#### Macro Strings

Macro strings are used to embed domain-specific languages directly into Trinity, and are functionally the same as tagged template literals. The construct `name"string"` or `name("string")`, denotes a macro call with a string as its own argument.

A macro function is defined with the keyword `macro` rather than `fun`. The first argument of a `macro` contains a list of intermediate strings, the second being the interpolated values or placeholders, and the third being the formatting metadata.

```dart
macro template(strings, keys) = |*values| {
  let dict = values[-1] ?? {}
  let values = from let key in keys
    select if key is Int: values[key]
    else: dict[key]
  values = values as List
  return strings.intercalate(keys).join('')
}

let t1Closure = template"${0}${1}${0}!"
assert t1Closure("Y", "A") == "YAY!"
let t2Closure = template"${0} ${"foo"}!"
assert t2Closure("Hello", {foo: "World"}) == "Hello World!"
```

### Regular expressions

Regular expressions function like strings, except delimited using backticks `` ` `` as opposed to quotes. Regular expressions allow free spacing and embedded comments. Escaping rules apply though between `()` and `[]` the backtick itself need not be escaped.

Escaping rules apply, though in between brackets the backtick need not be escaped. Interpolation and formatting also applies but the interpolated result is usually escaped so to prevent generating invalid regular expressions.

Trinity uses the [Oniguruma](https://github.com/kkos/oniguruma) regular expression flavor by default, the same regex engine that powers Ruby and PHP7. But it adds its own extensions and will be (re)implemented in Trinity.

```dart
`\b{wb}(fee|fie|foe|fum)\b{wb}`x
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] `]`x
`
  \/\* // Match the opening delimiter.
  .*?  // Match a minimal number of characters.
  \*\/ // Match the closing delimiter.
`
```

Multi-quoted and block regular expressions are also supported.

````dart
```(?/
  <<= | >>= | #= | \*\*=
  | \+= | -= | /= | \@=
  | \*= | %= | ~= | \^= | \&= | \|=
  | =(?!=)
)```

\< x
  (?:[a-zA-Z_]|(?:\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}))*(?=:)
````

If there are two adjacent regular expression literals on one side, then the one on the right is the substitution (template) string for the regular expression on the left.

```dart
val str = 'James Bond'
val newStr = str =< `(\w+)\W+(\w+)` `$2, $1` // 'Bond, James'
val newStr = str =< `(\w+)\W+(\w+)` `My name is $2, $0!`
// 'My name is Bond, James Bond'
```

## Collections

Trinity comes with four different collection literals: lists `[]`, sets `{}`, maps `{:}`. All collection literals are immutable, and a `Mut` prefix makes them mutable.

### Lists

Lists are indexed collections of values, are surrounded by square brackets and each element is separated by commas.

The type signature of a list is `List[Value]` or `{}Value`.

```dart
var x: []Int = [10, 20, 30]
var y = [\a, \b, \c] // is []Str
```

The type of the list uses the postfix curly bracket notation, where you can explicitly specify the type of the list.

```dart
var z = [10, '20', '30']{Str|Int} // with type casting operator
```

If the type is omitted, then type inference is used to determine the type of the items. The type of the items is determined by taking the union type of all the elements of the list. For example:

```dart
assert [1, 2, 3] is []Nat &&
  [1, null, 3] is []?Nat &&
  [1., 2., 3.] is []Float &&
  [1, -2, 3] is []Int &&
  [1, "2", 3] is [](Nat | Str) &&
  [1, 2, 3]{Num} is []Num &&
  [[10, 20], [30]] is [][]Int
```

Often the compiler will infer a list to have a non-nullable type. If the list might store `null` or `void` values, then you will need to explicitly cast it.

```dart
[1, 2, 3] // cannot store null
[1, 2, 3, null]{?Nat} // can store null
```

The empty list is denoted using the special syntax `[]`. Often you will specify a type - for example `[]{Str}` is an empty list of strings. If a type is not specified, then the empty list evaluates to a `[]{Any}`.

### Sets

Sets are ordered collections of unique, distinct elements, and are surrounded by curly brackets, with each element is separated by commas.

The type signature of a set is `Set[Key]` or `{}Key`.

```dart
var x: {}Int = {10, 20, 30}
var y = {\a, \b, \c} // is []Str
var z = {10, '20', '30']{Str|Int}
```

If the type is omitted, then type inference is used to determine the type of the items. The type of the items is determined by taking the union type of all the elements of the list. For example:

```dart
assert {1, '2', 3, :4} is {}(Int|Str|Sym)
```

The empty set is denoted using the special syntax `{}`. If the type is not specified, the set is automatically `{}{Any}`.

### Maps

Maps are keyed collections of unique elements, surrounded by curly brackets like sets. Each key is unique and is assigned to a non-distinct value, separated by a colon. Pairs are separated by commas, just like lists and sets.

```dart
var x: {Int : Str} = {1: 'one', 2: 'two'}
var y = {3: 'three', 4: 'four'} // is []Str
var z = {10, '20', '30']{Str : Int}
```

The type signature of a map is `Map[Key, Value]` or `{Key : Value}`. Note the colon is spaced out on both sides. `{Key: Value}` is a map with the string value `Key` which can hold the type `Value`.

The type of keys are determined by their first character:

- If a key is a constant value, say `true`, `false`, `null`, `void`, `infin` or `nan`, it will be parsed as its value.
- If a key begins with a number it is implicitly a number.
- If a key begins with a letter or a non-punctuation symbol character, and the key does not contain spaces, the key is considered a string.

The empty map is denoted using the special syntax `{:}` so not to be confused with the empty set syntax. If there is no explicit type, it is inferred to be `{Any : Any}`.

Note that maps may not be typed with a nullable key. If you are using type inference, you might need to explicitly type a map which will store null:

```dart
{1: 'one', 2: 'two'} // cannot store null
{1: 'one', 2: 'two'}{Int : ?Str} // now it can
```

### Symbols

A symbol represents a unique name inside the entire source code. Symbols are interpreted at compile time and cannot be created dynamically.

The only way to create a symbol is by using a symbol literal, denoted by a colon (`:`) followed by an unquoted string beginning with a word character, and follows the same rules as an unquoted string.

The identifier may optionally be enclosed in single or double quotes.

```dart
:unquoted_symbol
:"quoted symbol"
:"a" // identical to :a
:あ
```

A quoted identifier can contain any Unicode character including white-spaces and can same escape sequences as a string literal, including interpolation. Use interpolation to create dynamic keys.

```dart
:question?
:exclamation!
```

## Expressions

Trinity's expression syntax is very similar to C, PHP, Java, Elixir, Haskell and others. Trinity has built-in operators:

- Primary: `x.y`, `x!.y`, `x?.y`, `x::y`, `x!:y`, `x?:y`, `x.=y`, `x!.=y`, `x?.=y`, `x::=y`, `x!:=y`, `x?:=y`, `x...y`, `x..<y`, `x>..y`, `x>.<y`, `unset`, `del`
- Postfix: `x!`, `x?`
- Prefix: `!x`, `#x`, `$x`, `%x`, `&x`, `*x`, `~x`
- Infix operators:
  - Multiplicative: `*`, `**`, `***`, `/`, `#`, `%`, `%%`,
  - Additive: `+`, `-`, `++`, `--`
  - Minmax: `*>`, `<*`
  - Bitwise and: `&`
  - Bitwise xor: `^`
  - Bitwise or: `|`
  - Bitwise shift: `<<`, `>>`
  - Range: `to`, `til`, `thru`, `by`
  - Relational: `<`, `>`, `<=`, `>=`, `<=>`, `==`, `!=`, `===`, `!==`,
  - Membership: `<:`, `<!`, `:<`, `!<`, `~=`, `~!`, `=~`, `!~`, `in`, `!in`, `of`, `!of`
  - Implication/right-arrow: `->`, `-->`, `=>`, `==>`, `~>`, `~~>`
  - Channel/backward implication: `<==`, `<-`, `<--`, `<~`, `<~~`
  - Bothward implication: `<~>`, `<==>`, `<->`
  - Regex operators: `<>`, `=<`
  - Type-related: `is`, `is!`, `as`, `as?`, `as!`
  - Logical and: `&&`
  - Logical xor: `^^`
  - Logical or: `||`
  - Function: `</>`, `<:>`, `<$>`, `<+>`, `<*>`
  - Application: `|>`, `||>`, `|||>`, `+>`, `$>`
  - Reverse application: `<|`, `<||`, `<|||`, `<+`, `<$`
  - Coalescing: `??`, `!!`, `?:`, `!:`
  - Ternary: `x ? y : z`, `x ! y : z`, `x $ y : z`
  - Assignment: `=`, `:=`, `+=`, `-=`, etc.

#### Shortcut operators

Trinity is a pure object-oriented language in that everything is an object you can call methods on, even value types such as `Bool` and `Int`.

```dart
x.+(y) => x + y
x.!() => !x
x.!(,) => x!
```

## Control Statements

### Introduction: expression-oriented programming

As a brief note about programming in general, when every expression you write returns a value, that style is referred to as expression-oriented programming, or EOP. The examples above are all expressions.

Conversely, lines of code that don't return values are called statements, and they are used for their side-effects. For example, these lines of code don’t return values, so they are used for their side effects:

```dart
if a == b: doSomething()
print("Hello")
```

### Basic closures

Bindings can be scoped through the do-block: `do {}`.

```dart
let message = do {
  let part1 = "hello"
  let part2 = "world"
  part1 ++ " " ++ part2
}
// `part1` and `part2` not accessible here!
```

The value of the last line of a scope is implicitly returned.

`if`, `while` and functions all use the same block scoping mechanism.

```dart
if displayGreeting {
  let message = "Enjoying the docs so far?"
  print(message)
}
// `message` not accessible here!
```

Instead of a block, whenever there's a single statement, use the colon `:` instead of an opening curly brace.

```dart
let message = do: 3 + 4
```

But not both (opening curly brace is a set literal):

```dart
let message = do: { 3 + 4 }
assert message is Set
```

### Conditionals

A basic `if` statement looks like this:

```dart
if a == b: doSomething()
```

Or like this:

```dart
if a == b:
  doSomething()
```

or even like this:

```dart
if a == b {
  doSomething()
}
```

An if-else expression without the final `else` branch implicitly gives `()` (aka the unit type).

```dart
if showMenu { displayMenu() }
// is equivalent to
if showMenu { displayMenu() } else { null }
```

The if/else construct looks like this:

```dart
if a == b {
  doSomething()
} else {
  doSomethingElse()
}
```

The complete Trinity `if`/`else if`/`else` expression looks like this:

```dart
if test1 {
  doX()
} elif test2 { // not "else if"
  doY()
} else {
  doZ()
}
```

Replacing `if` with `un` and `elif` with `elun` for the opposite effect (`un` is short for `unless`).

```dart
un test1 { // unless; if not
  doX()
} elun test2 { // unless; if not
  doY()
} else {
  doZ()
}
```

A great thing about the Trinity conditional is that it always returns. You can ignore the result as we did in the previous examples, but a more common approach, especially in functional programming.

You can assign the result to a variable:

```dart
val minValue = if a < b: a else: b
```

This is cool for several reasons, including the fact that it means that Scala doesn’t require a special "ternary" operator. Wait, we still provide that for you.

```dart
val minValue = a < b ? a : b
val maxValue = a > b ! a : b
```

#### Alternative Conditional Branch

Trinity's alternative "if" branch takes a set of test-expression pairs, evaluating them one at a time from top to bottom. If a test returns true, its expression is evaluated and does not evaluate any of the other tests or expressions.

```dart
if {
  case n < 0: "negative"
  case n > 0: "positive"
  case: "zero" // also: "else: 0"
}
```

### While Loops

While loops execute its body code block while its condition is true.

```dart
while i < 10 {
  text += "The number is $i"
  i += 1;
}
```

`loop-while` is a variant of `while`. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

```dart
loop {
  text += "The number is $i"
  i += 1
} while i < 10;
```

Until loops execute their bodies until the statements become false. Because it makes sense to add `until`. Thanks, Ruby.

```dart
until i == 10 {
  text += "The number is $i"
  i += 1
}

loop {
  text += "The number is $i"
  i += 1
} until i == 10

loop: text += "The number is $i" && i += 1 until i == 10
```

Loop block runs indefinitely.

```dart
loop:
  print("hello world forever!")

let i = 1;
loop {
  print("`i` is now $i")
  if i > 100: break
  i *= 2
}
assert i == 128;
```

### Control flow statements

`break` breaks out of the loop altogether (same for `return`).

```dart
loop {
  if new Random() > 0.3 {
    break && return 1;
  } else {
    log("Still running")
  }
}
```

### Control flow statements

Trinity has three keywords relating to loops:

- stop and exit a loop or an enumeration using the `break` keyword
- jump to the next iteration or step using the `next` keyword
- repeat the current iteration or step using the `redo` keyword

```dart
label x: loop {
  if new Random() > 0.3: break x
  elif new Random() > 0.5: next x
  elif new Random() > 0.7: redo x
  else: log("Still running")
}
```

All are system calls so they can be interlaced with expressions.
