# Trinity

> The programming language for the future.

![banner](./banner.png)

**Trinity** is an open source, fully featured and agile language that enables developers, designers and testers to build, test and deploy their projects with less code, no matter the platform or runtime. It provides avenues to access huge ecosystems of libraries and runtimes, without the need for any installation.

Out of the box, it provides a robust program verifier and type checker that flags any errors to you so you can catch bugs early, and comes with a unified and comprehensive API and core libraries for making everyday or specialised tasks easier.

```dart
import Math.[Point, Random]

// Main function
async proc main {
  print("Compute π using the Monte Carlo algorithm")
  await for val estimate in computePi().take(100):
    print("π ~= $estimate")
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

Trinity is a programming language designed with web, mobile, desktop and systems in mind. It is strongly typed, compiled, garbage-collected and has explicit support for multiple paradigms, including object-oriented, functional, concurrent and reflective programming.

Trinity takes on its influences from [Go][go], [Kotlin][kotlin], [Rust][rust], [Scala][scala], [ReScript][rescript], [TypeScript][typescript], [C#][csharp], [Flix][flix] and [Gosu][gosu]. With these influences, Trinity advocates for writing readable and expressive code, and enabling you to do in Trinity what you could in other languages.

[wtfjs]: https://github.com/denysdovhan/wtfjs/
[go]: https://golang.org/
[kotlin]: https://kotlinlang.org/
[rust]: https://www.rust-lang.org/
[rescript]: https://rescript-lang.org/
[scala]: https://www.scala-lang.org/
[swift]: https://swift.org/
[typescript]: https://www.typescriptlang.org/
[csharp]: https://docs.microsoft.com/en-us/dotnet/csharp/
[flix]: https://flix.dev/
[gosu]: https://gosu-lang.github.io/

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

The following section serves as a summary to the regular expression syntax of Trinity, as well as some of the more unique features that Nova has over other regex flavors.

#### Basic Syntax Elements

| Syntax      | Description                                     |
| ----------- | ----------------------------------------------- |
| `\`         | Escape (disable) a metacharacter                |
| `\|`        | Alternation                                     |
| `/`         | Alternation: try out matches in the given order |
| `(...)`     | Capturing group                                 |
| `[...]`     | Character class (can be nested)                 |
| `${...}`    | Embedded expression                             |
| `{,}`       | Quantifier token (LHS 0, RHS &infin;)           |
| `"..."`     | Raw quoted literal                              |
| `'...'`     | Quoted literal                                  |
| `\0` onward | Numeric back-reference (0-indexed)              |
| `$...%...`  | String interpolation syntax                     |
| `#...`      | String anchor syntax                            |

#### Characters

Most of these characters also appear the same way as in string literals.

| Syntax                         | Description and Use                     |
| ------------------------------ | --------------------------------------- |
| `\a`                           | \*Alert/bell character (inside `[]`)    |
| `\b`                           | \*Backspace character (inside `[]`)     |
| `\e`                           | Escape character (Unicode `U+`)         |
| `\f`                           | Form feed (Unicode `U+`)                |
| `\n`                           | New line (Unicode `U+`)                 |
| `\r`                           | Carriage return (Unicode `U+`)          |
| `\t`                           | Horizontal tab (Unicode `U+`)           |
| `\v`                           | Vertical tab (Unicode `U+`)             |
| `\cA`...`\cZ`<br>`\ca`...`\cz` | Control character from `U+01` to `U+1A` |

The following can only be used inside square brackets.

| Syntax               | Description and Use                            |
| -------------------- | ---------------------------------------------- |
| `\b` (beside 0 or 1) | _Base 2_ - from `0` to `100001111111111111111` |
| `\q`                 | _Base 4_ - from `0` to `10033333333`           |
| `\s` (beside 0 to 5) | _Base 6_ - from `0` to `35513531`              |
| `\o`                 | _Base 8_ - from `0` to `4177777`               |
| `\d` or `\`          | _Base 10_ - from `0` to `1114111`              |
| `\z`                 | _Base 12_ - from `0` to `4588A7`               |
| `\x`                 | _Base 16_ - from `0` to `10FFFF`               |

#### Character Sequences

Character sequences in regular expressions are the same as in their string counterparts, with exception to `\b{}` outside `[]`.

#### Character Classes and Sequences

| Syntax | Inverse | Description                                                       |
| ------ | ------- | ----------------------------------------------------------------- |
| `.`    | None    | Hexadecimal code point (1-8 digits)                               |
| `\w`   | `\W`    | Word character `[\d]`                                             |
| `\d`   | `\D`    | Digit character `[0-9]`                                           |
| `\s`   | `\S`    | Space character `[\t\n\v\f\r\20]`                                 |
| `\h`   | `\H`    | Hexadecimal digit character `[\da-fA-F]`                          |
| `\u`   | `\U`    | Uppercase letter `[A-Z]`                                          |
| `\l`   | `\L`    | Lowercase letter `[a-z]`                                          |
| `\f`   | `\F`    | Form feed `[\f]`                                                  |
| `\t`   | `\T`    | Horizontal tab `[\t]`                                             |
| `\v`   | `\V`    | Form feed `[\v]`                                                  |
| `\n`   | `\N`    | Newline `[\n]`                                                    |
|        | `\O`    | Any character `[^]`                                               |
| `\R`   |         | General line break (CR + LF, etc)                                 |
| `\c`   | `\C`    | First character of identifier; `[\pL\pPc]` by default             |
| `\i`   | `\I`    | Subsequent characters of identifier `[\pL\pPc\pM\pNd]` by default |
| `\x`   | `\X`    | Extended grapheme cluster                                         |

##### Unicode Properties

Properties are case-insensitive. Logical operators `&&`, `||`, `^^` and `!`, can be interspersed to express compound queries.

| Syntax                                      | Description                                   |
| ------------------------------------------- | --------------------------------------------- |
| `\p{prop=value}`<br>`\p{prop==value}`       | `prop` equals `value`                         |
| `\p{prop!=value}`<br>`\P{prop=value}`       | `prop` does not equal `value`                 |
| `\p{prop^=value}`                           | `prop` begins with but does not equal `value` |
| `\p{prop$=value}`                           | `prop` ends with but does not equal `value`   |
| `\p{prop*=value}`                           | `prop` contains but does not equal `value`    |
| `\p{prop\|=value}`                          | `prop` begins with or equals to `value`       |
| `\p{prop~=value}`                           | `prop` ends with or equals to `value`         |
| `\p{prop&=value}`                           | `prop` contains or equals to `value`          |
| `\p{in BasicLatin}`<br>`\P{!in BasicLatin}` | Block property                                |
| `\p{is Latin}`<br>`\p{script==Latin}`       | Script or binary property                     |
| `\p{value}`                                 | Short form\*                                  |
| `\p{Cc}`                                    | Unicode character categories^                 |

\*Properties are checked in the order: `General_Category`, `Script`, `Block`, binary property:

- `Latin` &rarr; (`Script==Latin`).
- `BasicLatin` &rarr; (`Block==BasicLatin`).
- `Alphabetic` &rarr; (`Alphabetic==Yes`).

##### POSIX Classes

Alternatively, `\p{}` notation can be used instead of `[:]`.

| Syntax      | ASCII                                        | Unicode (`/u` flag) | Description                                              |
| ----------- | -------------------------------------------- | ------------------- | -------------------------------------------------------- |
| `[:alnum]`  | `[a-zA-Z0-9]`                                | `[\pL\pNl}\pNd]`    | Alphanumeric characters                                  |
| `[:alpha]`  | `[a-zA-Z]`                                   | `[\pL\pNl]`         | Alphabetic characters                                    |
| `[:ascii]`  | `[\x00-\x7F]`                                | `[\x00-\xFF]`       | ASCII characters                                         |
| `[:blank]`  | `[\x20\t]`                                   | `[\pZs\t]`          | Space and tab                                            |
| `[:cntrl]`  | `[\x00-\x1F\x7F]`                            | `\pCc`              | Control characters                                       |
| `[:digit]`  | `[0-9]`                                      | `\pNd`              | Digits                                                   |
| `[:graph]`  | `[\x21-\x7E]`                                | `[^\pZ\pC]`         | Visible characters (anything except spaces and controls) |
| `[:lower]`  | `[a-z]`                                      | `\pLl`              | Lowercase letters                                        |
| `[:number]` | `[0-9]`                                      | `\pN`               | Numeric characters                                       |
| `[:print]`  | `[\x20-\x7E] `                               | `\PC`               | Printable characters (anything except controls)          |
| `[:punct]`  | `[!"\#$%&'()\*+,\-./:;<=>?@\[\\\]^\_'{\|}~]` | `\pP`               | Punctuation (and symbols).                               |
| `[:space]`  | `[\pS\t\r\n\v\f]`                            | `[\pZ\t\r\n\v\f]`   | Spacing characters                                       |
| `[:symbol]` | `[\pS&&[:ascii]]`                            | `\pS`               | Symbols                                                  |
| `[:upper]`  | `[A-Z]`                                      | `\pLu`              | Uppercase letters                                        |
| `[:word]`   | `[A-Za-z0-9_]`                               | `[\pL\pNl\pNd\pPc]` | Word characters                                          |
| `[:xdigit]` | `[A-Fa-f0-9] `                               | `[A-Fa-f0-9]`       | Hexadecimal digits                                       |

#### Character Sets

A set `[...]` can include nested sets. The operators below are listed in increasing precedence, meaning they are evaluated first.

| Syntax                 | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `^...`, `~...`, `!...` | Negated (complement) character class                           |
| `x-y`                  | Range (from x to y)                                            |
| `\|\|`                 | Union (`x \|\| y` &rArr; "x or y")                             |
| `&&`                   | Intersection (`x && y` &rArr; "x and y" )                      |
| `^^`                   | Symmetric difference (`x ^^ y` &rArr; "x and y, but not both") |
| `--`                   | Difference (`x ~~ y` &rArr; "x but not y")                     |

#### Anchors

| Syntax | Inverse | Description                                  |
| ------ | ------- | -------------------------------------------- |
| `^`    | None    | Beginning of the string/line                 |
| `$`    | None    | End of the string/line                       |
| `\b`   | `\B`    | Word boundary                                |
| `\a`   | `\A`    | Beginning of the string/line                 |
| `\z`   | `\Z`    | End of the string/before new line            |
|        | `\G`    | Where the current search attempt begins/ends |
|        | `\K`    | Keep start/end position of the result string |
| `\m`   | `\M`    | Line boundary                                |
| `\y`   | `\Y`    | Text segment boundary                        |

#### Quantifiers

| Syntax           | Reluctant `?` (returns shortest match) | Possessive `+` (returns nothing) | Greedy `*` (returns longest match) | Description                             |
| ---------------- | -------------------------------------- | -------------------------------- | ---------------------------------- | --------------------------------------- |
| `?`              | `??`                                   | `?+`                             | `?*`                               | 1 or 0 times                            |
| `+`              | `+?`                                   | `++`                             | `+*`                               | 1 or more times                         |
| `*`, `{,}`, `{}` | `*?`, `{,}?`, `{}?`                    | `*+`, `{,}+`, `{}+`              | `**`, `{,}*`, `{}*`                | 0 or more times                         |
| `{n,m}`          | `{n,m}?`                               | `{n,m}+`                         | `{n,m}*`                           | At least `n` but no more than `m` times |
| `{n,}`           | `{n,}?`                                | `{n,}+`                          | `{n,}*`                            | At least `n` times                      |
| `{,m}`           | `{,m}?`                                | `{,m}+`                          | `{,m}*`                            | Up to `m` times                         |
| `{n}`            | `{n}?`                                 | `{n}+`                           | `{n}*`                             | Exactly `n` times                       |

#### Groups

`(?'')`, `(?"")` notation can also be used.

| Syntax                      | Description                       |
| --------------------------- | --------------------------------- |
| `(?#...)`                   | Comment                           |
| `(?x-y:...)`<br>`(?x-y)...` | Mode modifier                     |
| `(?:...)`                   | Non-capturing (passive) group     |
| `(...)`                     | Capturing group (numbered from 1) |
| `(?<name>...)`              | Named capturing group             |
| `(?<-x>...)`                | Balancing group                   |
| `(?<x-x>...)`               | Balancing group pair              |
| `(?=...)`                   | Positive lookahead                |
| `(?!...)`                   | Negative lookahead                |
| `(?<=...)`                  | Positive lookbehind               |
| `(?<!...)`                  | Negative lookbehind               |
| `(?>...)`                   | Atomic group (no backtracking)    |
| `(?~...)`                   | Sub-expression                    |
| `(?()\|...\|...)`           | Conditional branching             |
| `(?~\|...\|...)`            | Absent expression                 |
| `(?~\|...)`                 | Absent repeater                   |
| `(?~...)`                   | Absent stopper                    |
| `(?~\|)`                    | Range clear                       |

#### Backreferences and Calls

`\k''`, `\k""` can also be used.

| Syntax     | Description                                               |
| ---------- | --------------------------------------------------------- |
| `\1`       | Specific numbered backreference                           |
| `\k<1>`    | Specific numbered backreference                           |
| `\k<-1>`   | Relative numbered backreference (`+` ahead, `-` behind)   |
| `\k<name>` | Specific named backreference                              |
| `\g<1>`    | Specific numbered subroutine call                         |
| `\g<-1>`   | Relative numbered subroutine call (`+` ahead, `-` behind) |
| `\g<name>` | Specific named subroutine call                            |

#### Flags

These flags go after the regex literal. `f`, `m`, `u`, `e` and `x` are enabled by default.

| Flag | Description                                                                  |
| ---- | ---------------------------------------------------------------------------- |
| `a`  | Astral mode - `\p` supports the past the BMP                                 |
| `c`  | Case-sensitive mode.                                                         |
| `d`  | Treat only `\n` as a line break                                              |
| `e`  | Safe mode - escape all interpolations                                        |
| `f`  | First match only                                                             |
| `g`  | Global. Enabled by default                                                   |
| `i`  | Case-insensitive mode                                                        |
| `j`  | Switches definitions of `()` and `(?:)`                                      |
| `k`  | Allows duplicate named groups                                                |
| `l`  | Last match only                                                              |
| `m`  | Multiline - `^`/`$` match at every line                                      |
| `n`  | Named capturing groups only - all unnamed groups become non-capturing        |
| `o`  | Unsafe mode - coerces interpolations into strings                            |
| `p`  | `^` and `$` match at the start/end of line                                   |
| `q`  | Quote all metacharacters                                                     |
| `s`  | "Dot-all" - `.` matches all characters                                       |
| `t`  | Strict spacing mode                                                          |
| `u`  | Unicode mode - POSIX class definitions also expanded                         |
| `w`  | `^` and `$` match at the start/end of string, `.` does not match line breaks |
| `x`  | Free-spacing mode                                                            |
| `y`  | Sticky mode - search begins from specified index on LHS of regex             |

#### Replacement String

This syntax applies to the second regex literal onward in regex operations such as substitution and transliteration.

| Syntax    | Meaning                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `$$`      | Inserts a literal "$".                                                                                                    |
| `$0`      | Inserts the entire matched substring into the output.                                                                     |
| `$-`      | Inserts the portion of the string that precedes the matched substring.                                                    |
| `$+`      | Inserts the portion of the string that follows the matched substring.                                                     |
| `$n`      | Where `n` is a positive integer, inserts the `n`th submatch string. If `n` is an invalid group, it is inserted literally. |
| `$<name>` | Where name is a capturing group name. If the group is invalid, it is inserted literally.                                  |

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
  [1, "2", 3] is [](Nat|Str) &&
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
var z = {10, '20', '30'}{Str : Int}
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

### Operators

The tables below define all of Trinity's operators, and you can define your own.

#### General operators

| Operator | Type    | Meaning                         |
| -------- | ------- | ------------------------------- |
| `!`      | Unary   | Assert that not null            |
| `?`      | Unary   | Exists                          |
| `.`      | Binary  | Basic access                    |
| `::`     | Binary  | Dynamic access                  |
| `!.`     | Binary  | Assertive access                |
| `!:`     | Binary  | Assertive dynamic access        |
| `?.`     | Binary  | Optional access                 |
| `?:`     | Binary  | Optional dynamic assign         |
| `.=`     | Binary  | Access-assignment               |
| `::=`    | Binary  | Dynamic access-assign           |
| `!.=`    | Binary  | Assertive access-assign         |
| `!:=`    | Binary  | Assertive dynamic access-assign |
| `?.=`    | Binary  | Optional access-assign          |
| `?:=`    | Binary  | Optional dynamic access-assign  |
| `??`     | Infix   | Basic access                    |
| `!!`     | Infix   | Dynamic access                  |
| `?:`     | Infix   | Assertive access                |
| `!:`     | Infix   | Assertive dynamic access        |
| `? :`    | Ternary | Conditional                     |
| `! :`    | Ternary | Inverse conditional             |
| `$ :`    | Ternary | Infix function call             |

#### Numeric operators

| Operator     | Type   | Meaning                          |
| ------------ | ------ | -------------------------------- |
| `+`          | Prefix | Numeric casting                  |
| `+`          | Suffix | Successor                        |
| `+`          | Infix  | Add                              |
| `-`          | Prefix | Negation                         |
| `-`          | Suffix | Previous number                  |
| `-`          | Infix  | Subtract                         |
| `*`          | Infix  | Multiply                         |
| `**`, `@*`   | Infix  | Exponent                         |
| `***`, `@**` | Infix  | Exponent with integer rounding   |
| `/`          | Infix  | Divide                           |
| `#`          | Infix  | Divide with integer rounding     |
| `%`          | Infix  | Remainder (Python, R)            |
| `%%`         | Infix  | Unsigned remainder (C, Java, JS) |
| `~`          | Prefix | Bitwise not                      |
| `&`          | Infix  | Bitwise and                      |
| `\|`         | Infix  | Bitwise or                       |
| `^`          | Infix  | Bitwise exclusive or             |
| `<<`         | Infix  | Bitwise signed left shift        |
| `>>`         | Infix  | Bitwise signed right shift       |
| `<<<`        | Infix  | Bitwise unsigned left shift      |
| `>>>`        | Infix  | Bitwise unsigned right shift     |
| `<`          | Infix  | Lesser than                      |
| `<=`         | Infix  | Lesser than or equal to          |
| `>`          | Infix  | Greater than                     |
| `>=`         | Infix  | Greater than or equal to         |
| `==`         | Infix  | Equal to                         |
| `!=`, `<>`   | Infix  | Not equal to                     |
| `<=>`        | Infix  | Three-way comparison             |
| `*>`         | Infix  | Minimum                          |
| `<*`         | Infix  | Maximum                          |

#### String operators

| Operator | Type  | Meaning           |
| -------- | ----- | ----------------- |
| `+`      | Infix | Concatenation     |
| `-`      | Unary | Reversal          |
| `~=`     | Infix | Matching          |
| `~!`     | Infix | Negative matching |
| `*`      | Infix | Repetition        |
| `/`      | Infix | Splitting         |
| `#`      | Unary | Length            |

#### Logical operators

| Operator | Type  | Meaning              |
| -------- | ----- | -------------------- |
| `&&`     | Infix | Logical and          |
| `\|\|`   | Infix | Logical or           |
| `^^`     | Infix | Logical exclusive or |
| `!`      | Unary | Logical not          |
| `~>`     | Infix | Imply                |
| `<~`     | Infix | Backwards imply      |
| `<~>`    | Infix | Bothward imply       |

#### Function operators

| Operator  | Type  | Meaning                    |
| --------- | ----- | -------------------------- |
| `+>`      | Infix | Composition                |
| `\|>`     | Infix | Pipeline                   |
| `\|\|>`   | Infix | Iterable pipeline          |
| `\|\|\|>` | Infix | Async pipeline             |
| `<+`      | Infix | Backward composition       |
| `<\|`     | Infix | Backward pipeline          |
| `<\|\|`   | Infix | Backward iterable pipeline |
| `<\|\|\|` | Infix | Backward async piping      |

#### Collection operators

| Operator | Type  | Meaning                 |
| -------- | ----- | ----------------------- |
| `+`      | Infix | Push or unshift         |
| `++`     | Infix | Concatenate             |
| `-`      | Unary | Pop or shift            |
| `<:`     | Infix | Value in collection     |
| `<!`     | Infix | Value not in collection |
| `:<`     | Infix | Value in collection     |
| `!<`     | Infix | Value not in collection |
| `*`      | Infix | Repeat (only for lists) |
| `/`      | Infix | Group by                |
| `#`      | Unary | Length or cardinality   |
| `%`      | Infix | Sort by                 |
| `&`      | Infix | Intersection            |
| `\|`     | Infix | Union                   |
| `^`      | Infix | Symmetric difference    |
| `<->`    | Infix | Filter                  |
| `</>`    | Infix | Reject                  |
| `<*>`    | Infix | Map                     |
| `<+>`    | Infix | Sort                    |
| `<$>`    | Infix | Group                   |
| `</`     | Infix | Fold left               |
| `/>`     | Infix | Fold right              |
| `<$`     | Infix | Scan left               |
| `$>`     | Infix | Scan right              |
| `<%`     | Infix | Take left               |
| `%>`     | Infix | Take right              |
| `<#`     | Infix | Drop left               |
| `#>`     | Infix | Drop right              |

### Custom Operators

In Trinity, operators are methods. Any method with a single parameter can be used as an infix operator. For example, `+` can be called with dot-notation:

```dart
10.+(1)
```

However, it's easier to read as an infix operator:

```dart
10 + 1
```

Infix operators are spaced out on both sides. This makes it clear it is an infix operator and not any other.

#### Defining and using operators

You can use any legal identifier as an operator. This includes a name like `add` or a symbol(s) like `+`.

```dart
ext Vec(x: Float, y: Float) {
  def + (this, that: Vec) = new Vec(this.x + that.x, this.y + that.y)
}

val vec1 = new Vec(1.0, 1.0)
val vec2 = new Vec(2.0, 2.0)

val vec3 = vec1 + vec2
vec3.x // 3.0
vec3.y // 3.0
```

The class `Vec` has a method `+` which we used to add `vec1` and `vec2`. Using parentheses, you can build up complex expressions with readable syntax. Here is the definition of class MyBool which includes methods and and or:

```dart
ext MyBool(x: Bool) {
  def && (): MyBool = if x: that else: this
  def || (): MyBool = if x: this else: that
  def !(): MyBool = new MyBool(!x)
}
```

It is now possible to use `and` and `or` as infix operators:

```dart
// def declares a method even outside classes
def !(x: MyBool) = !x
def ^^ (x: MyBool, y: MyBool) = x || y && !(x && y)
```

This helps to make the definition of `xor` more readable.

### Associativity

Binary operators whose first character is `@` are right-associative, all other binary operators are left-associative.

```dart
def @/ (x, y: Float): Float = result = x / y
// a right-associative division operator
print(12 @/ 4 @/ 8) // 24.0 (4 / 8 = 0.5, then 12 / 0.5 = 24.0)
print(12  / 4  / 8) // 0.375 (12 / 4 = 3.0, then 3 / 8 = 0.375)
```

A spaced out `?`, `!` and `$` is a ternary expression and has the lowest precedence. The rightmost part is separated with a colon `:`. `$` is the same as infix method calls on identifiers.

```dart
x.xor(a) == x $ xor : a
```

#### Precedence

If the operator ends with `=` and its first character is none of `<`, `>`, `!`, `=`, it is an assignment operator which has the second-lowest precedence.

```dart
def + (x: Num, y: Num): Num = x + y
def - (x: Num, y: Num): Num = x - y
let a = 1
a += 1; a == 2
a -= 1; a == 1
```

If the operator begins with `<`, `>`, `!` or `=` then it is a relational operator and they can be chained.

```dart
import Sys.Comparable

def <=> (x: Comparable, y: Comparable): Bool = x.cmp(y)
def < (x, y): Bool = x <=> y in [-1]
def <= (x, y): Bool = x <=> y in [-1, 0]
def > (x, y): Bool = x <=> y in [1]
def >= (x, y): Bool = x <=> y in [0, 1]
def == (x, y): Bool = x <=> y in [0]
def <> (x, y): Bool = x <=> y in [-1, 1]

assert (1 <> 2 <> 3) == (1 <> 2 && 2 <> 3)
```

When an expression uses multiple operators, the operators are evaluated based on the priority of the first character:

```txt
(characters not shown below)
* / % #
+ -
: ~
= ! < >
&
^
|
?
arrow operators
$
assignment operators
ternary operators ? :, ! :, and $ :
```

This applies to functions you define. For example, the following expression:

```dart
a + b ^? c ?^ d $ less : a ==> b | c
```

Is equivalent to

```dart
((a + b) ^? (c ?^ d)) $ less : ((a ==> b) | c)
```

`?^` has the highest precedence because it starts with the character `?`. `+` has the second highest precedence, followed by `==>,` `^?`, `|`, and less.

Operators ending in either `->`, `~>` or `=>`, or starting with `<-`, `<~` or `<=` are called arrow-like, and have a higher precedence than ternary operators.

```dart
((a + b) ^? (c ?^ d)) $ less : ((a ==> b) | c)
```

#### Binary Operators

Binary operators such as `x.+(a)` and `x?.y` are parsed first and are evaluated from left to right. They are composed of one or more characters and are not spaced out beside any literal or expansion.

```dart
def?.(a: Any, b: Any): Any = ?a ? void : a[b]
let a = {1: {c: \d}}
assert a?.b?.c == void
assert a?.1?.c == \d
```

#### Suffix Operators

Suffix operators are evaluated from left to right, have a single argument and are composed of only one character. They bind strongly and are evaluated after binary operators.

```dart
def+ (a: Num): Num = a + 1
def- (a: Num): Num = a - 1
let a = 1
assert a++ == (a+)+ == 3
assert a-- == (a-)- == -1
```

#### Prefix Operators

Prefix operators function the same way as suffix operators except they are evaluated from right to left. They are evaluated after suffix operators.

```dart
def -(a: Num): Num = a.neg()
let a = 1000
assert --a == -(-a) == a
```

#### Unary Operators

A unary modifier defines both suffix and prefix operators as valid operations on its only argument.

```dart
def! !(x: Bool): Bool = !x
let x = true
assert !x! == !(x!) == true
assert x! == !x == false
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

Anyway, Trinity has two ternary conditional operators, which are just syntax sugar for the above if you're not keen on using `if`. That last one, is syntax sugar for `un`...`else`.

```dart
val minValue = a < b ? a : b
val maxValue = a > b ! a : b
```

### While Loops

While loops execute its body code block while its condition is true.

```dart
while i < 10 {
  text += "The number is $i"
  i += 1
}
```

`loop-while` is a variant of `while`. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

```dart
loop {
  text += "The number is $i"
  i += 1
} while i < 10
```

Until loops execute their bodies until their statements become false.

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

let i = 1
loop {
  print("i is now $i")
  if i > 100: break
  i *= 2
}
assert i == 128
```

#### Loop keywords

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

### For-loops

In its most simple use, a `for` or `each` loop can be used to iterate over the elements in a collection. For example, given a list of integers:

```dart
val numbers = [1, 2, 3]
```

you can loop over them and print out their values like this:

```dart
for val n in numbers: print(n)
```

A second variable is assigned to their indices (i.e keys):

```dart
for val number, index in numbers: print(n, x)
```

You can loop over the keys of a map (or any other keyed collection) with `of` rather than `in`.

```dart
val list = [4, 5, 6]
for val i in list:
  print(i) // "0", "1", "2",
for val i of list:
  print(i) // "4", "5", "6"
for val n of numbers: print(n)
```

### Switch or match

Pattern matching provides a way to conditionally execute code when the shape of some data matches a particular pattern. It is similar to `switch`-`case` statements in other languages, but it can be more expressive and includes some extra safeguards.

A `match` expression looks like below. You can also use `switch` rather than `match`; they are one and the same.

```dart
match expression {
  case case1: value1
  case case2: value2
  case case3: value3
  case: defaultValue
}
```

A `match` or `switch` expression is valid if:

- the condition should be any type
- branches must be of the same type as the condition
- the values of all branches must be the same type

You can match on literal values, or data structures such as tuples, eih other data structures, like tuples, records, lists, arrays, and any nested combination of those structures.

```dart
match value {
  // Catch alls
  case: doSomethingElse()
  fail: doSomethingElse()
  // Basic case
  case value: exec(value)
  // Guard conditions
  case some(value) if value > 10: exec(value)
  // Literals and optional bindings
  case as "run" | "stop": exec(x)
  case let x as "run" | "stop": exec(x)
  // Types and optional bindings
  case is Int | Str: exec(x)
  case let x as Int | Str: exec(x)
  // Functions or predicates
  case |x| x > 10: exec(x)
  // Type strings
  case '${x: Int when < 10}-dir': exec(x)
  // Regular expressions
  case let x in `^(?<alias>\w+&*\.) // alias
    @ // at sign
    (?<domain>\w+&*\.)  // domain name
    \.(?<suffix>\w+)$`: exec(alias, domain, suffix)
  // Lists
  case [first, second, *tail]: exec(&first, &second, &tail)
  // Sets
  case ({first, second, *rest}): exec(&first, &second, &rest)
  // Maps
  case ({x, y: y = 'y'}): exec(x, y)
}
```
