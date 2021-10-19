# Trinity

> The language of the future.

**Trinity** is an open source, featured and agile language that enables developers, designers and testers to build, test and deploy their projects with less code, no matter the platform or runtime. It provides avenues to access huge ecosystems of libraries and runtimes, without the need for any installation.

Out of the box, it provides a robust program verifier and type checker that flags any errors to you so you can catch bugs early, and comes with a unified and comprehensive API and core libraries for making everyday or specialised tasks easier.

```dart
import Math.[Point, Random];

// Main function
async proc main {
  print("Compute π using the Monte Carlo algorithm");
  await for val estimate in computePi().take(100):
    print("π \x2245 $estimate");
}

// Iterator functions (function* in JavaScript)
async iter computePi(%batch: 1^5): Stream[Float] {
  var total = 0, count = 0;
  loop {
    val points = generateRandom().take(batch);
    val inside = from val p in points
                 where p.isInsideCirc();

    total += batch;
    count += inside.len;
    val ratio = count / total;

    yield ratio * 4;
  }
}

sync iter generateRandom(*seed: []Int): Point {
  val random = Random(seed);
  loop:
    yield Point(random.nextFloat(), random.nextFloat());
}
```

### Roadmap

> Update: I have a [Trello](https://trello.com/b/A3NDX7qY/trinity-programming-language) now!

- **Grammar** (see [`grammar.yaml`](https://github.com/TehFynlNyt/TrinityLang/blob/main/grammar.yaml))
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

This reference is a work in progress and will be improved over time. See the GitHub repository at https://github.com/TehFynlNyt/TrinityLang. Contributions and corrections are welcome.

A lot of my work on Trinity is still experimental and ongoing, so I am sharing this repository so I could get all of my ideas together and perhaps invite some of you to contribute your own. Once I get done with it, we can begin work on the compiler.

### A little disclaimer

Trinity is a language in which programs are not text. That is, the source of truth for a program is not its textual representation as source code, but its structured representation as an abstract syntax tree (AST).

This document describes Trinity in terms of its default (and currently, only) textual rendering into source code.

Trinity only encodes text in UTF-8; other encodings are not supported. Any of the standard line termination sequences can be used, depending on the platform: `\r`, `\n` or `\r\n`.

Trinity has only three file types: module (`*.trin`), script (`*.tris`), config (`*.tco`) and markup (`*.tml`).

Module files are the most commonly used as they can be imported and exported through packages. The entry point of a Trinity module is defined in the `main` function.

```dart
/// @file .trin
fun main(*args: []Str): Void { /*...*/ }
```

The type annotations or the spread `*args` declaration can be left out, so it can be `fun main {}` instead.

Script files do not have a `main` function, but they can import other modules and files.

Trinity markup is a special branch of Trinity whose syntax is derived from JSX, HTML and Stylus which enable you to build UIs, style them and add functionality. HTML snippets can be interlaced in Trinity module files and passed on as objects.

```dart
import Native.{Text, View, StyleSheet, Button, Audio};

export pub elem App: View {
  field sound: Audio {
    async del proc unload: Void =
      if !?self:
        print("Unloading sound") && self = void;
    async new proc load: Void {
      print("Loading sound");
      self = await import "./assets/Hello.mp3";
      self.play();
    }
  }

  return <View style=$styles.container>
    <Button title="Play Sound" onPress=sound.load()/>
  </View>;
}
```

## Syntax

### Some Guidelines

#### Syntax

Trinity is a curly-brace language similar to JavaScript, Rust, Scala and Kotlin, which means that code blocks and closures are delimited using curly brackets.

#### Comments

Comments start anywhere outside a "string" literal with two slashes, and runs until the end of the line. If the next line only of a comment piece with no other tokens between it and the preceding one, it does not start a new comment.

```dart
const x = 10; // This is a single comment over multiple lines.
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

A variable binding begins with `var`, `val`, `let`, or `const`. `var` and `let` declare an mutable variable binding, whereas `val` and `const` declare a mutable variable binding.

A variable binding looks like this:

```dart
var x = 42;
let x: Int = 42;
```

Multiple variables can be assigned, similar to Python:

```dart
val x, y = 0, 0;
```

Or unpacked from an iterable, list (array), set or map:

```dart
(x, y): (Int, Int) = (42, 42);
[x, y]: [Int, Int] = [42, 42];
{x, y}: {[Str]: Int} = {x: 42, y: 42};
{x, y}: {}Int = {42, 10};
```

### Keywords

The following are all the keywords of the language. Keywords are grouped into five different sections:

- expression keywords, which are keywords used as operators;
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
  a.sub(`[^\pL\d]+`g, "").lower() == b.sub(`[^\pL\d]+`g, "").lower();
```

All keywords are written with all lowercase characters. To strop keywords, add one or more trailing underscores. Keywords also lose their meaing when they are part of a qualified name, not including its source (the leading parts of oa).

```dart
type Type = {
  def: Func,
};

val object_ = new Type({def: |x| x = 10});
assert object_ is Type;
assert object_.def == 9;

var var_ = 42;
val val_ = 8;
assert var_ + let_ == 50;

val assert_ = true;
assert assert_;
```

### Booleans, Null and Void

`Null` and `void` are one and the same.

```dart
null; void;
assert null == void
assert null == void
```

A boolean data type can only have two values: `true` or `false`. Booleans are mainly used for control flow, and there are a lot of operators that return boolean values.

```dart
true; false;
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
val integer: Int = 123;
val floating: Float = 12.345;
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
val base2 = 0b101010111100000100100011;
val base4 = 0q320210213202;
val base6 = 0s125423;
val base8 = 0o52740443;
val base10 = 0011256099;
val base12 = 0z10a37b547ab97;
val base16 = 0xabcdef123;
```

Floating-point numbers can allow different kinds of delimiters and separators,

Repeating fractional blocks are separated with a tilde `~`, so `0.3~33` or simply `0.~3` is equal to `0.33333333333333...`. Fractional literals separate their numerator and denominator with a slash `/`.

```dart
0.3~33 == 0.~3 == 1/3
```

Exponents are relative to the base, but are written in base 10. Therefore `1 * 16^10` is equal to `0x1^10`. If you want a custom base, use the notation `coefficient*base^power`, where the power is signed.

```dart
1 * 16^10  == 0x1^10
```

Precision is delimited using `=n` where `n` is the number of places after the "decimal" point. `!` counts significant figures rather than mantisa digits, while `-` or `+` toggles whether to always round up or down as opposed to automatically.

```dart
10=10
```

The last component of a numeric literal is called a _type suffix_. The colon denoting the type suffix cannot be left out.

By extending from the class Numeric.Format, arbitrary base values can be used. By default, all digits are decimal, though any alphanumeric character can be used.

Arbitrary bases can be used, beginning with `nb` where `n` is a positive integer greater than 1. The digits are usually decimal, though any alphanumeric can be used when suffixed with a type.

```dart
class Base17 < Numeric.Format {
  swap field digits: Str | []Char = '0123456789abcdefg';
  swap field under: Bool = false;
}

const number = 17b1894398:Base17;
assert number == 17b1_89__43_98:Base17 == 36268794;
```

### Strings

Strings function the same way as in JavaScript, and are delimited by matching quotes. Only double-quoted strings contain escape sequences which all begin with a backslash. Single-quoted strings are raw, which means that escape sequences are not transformed.

```dart
var s1 = 'Single quotes work well for string literals.';
var s2 = "Double quotes work just as well.";
```

Single-quoted raw strings the escape sequences for double-quoted strings mentioned above are not escaped. To escape a single quote, double it.

```dart
var daughterOfTheVoid = 'Kai''Sa';
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
| `\j`                 | Named Unicode characters (more later)          |

The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}";
"\d{72 69 76 76 69}" == "\72\69\76\76\79";
```

In single quoted strings, to escape single quotes, double them.

```dart
var s3 = 'It''s easy to escape the string delimiter.';
var s4 = "It's even easier to use the other delimiter.";
```

In double-quoted strings, an ending backslash joins the next line _without spaces_.

```dart
assert "hello \
        world" == "hello world";
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

Strings can also be delimited using an initial backslash, and do not contain `()[]{}<>.,:;`, so those cannot be included at all in the string. However, you can escape them.

Strings cannot begin in `|`, `>`, `<` or `-`.

```dart
\word
func(\word, \word)
func\word
[\word]
{prop: \word}
```

Block strings begin with a backslash followed by either `|` or `>`, both functioning like block strings. `\|` behaves like the single quote and `\>` the double quote.

Block strings also begin with a backslash followed by either `|` or `>`, both functioning like `|` block strings. `\|` behaves like the single quote and `\>` the double quote.

They can also be appended with a "chomping indicator" `+` or `-` to preserve or remove the line feed, or fold the line past how many spaces.

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

#### Macro Strings

Macro strings are used to embed domain-specific languages directly into Trinity, and are functionally the same as JS tagged template literals.

The construct `qualifiedName"string"` denotes a macro call, with a string literal as its only argument. Macro string literals are especially convenient for embedding DSLs directly into Trinity (for example, SQL), then parsing them and doing things with them.

A macro function is defined with the keyword `macro` rather than `fun`, `sub` or `proc`. Macros are functions with up to three arguments. The first argument of a tagged function contains a list of intermediate strings, the second are related to the interpolated values themselves, and the third the formatted result.

```dart
macro template(strings, keys) = |*values| {
  let dict = values[-1] ?? {};
  let values = (from let key in keys
    select if key is Int => values[key]
    else => dict[key]) as List
  return strings.intercalate(keys).join('')
}

let t1Closure = template"${0}${1}${0}!"
assert t1Closure("Y", "A") == "YAY!"
let t2Closure = template"${0} ${"foo"}!"
assert t2Closure("Hello", {foo: "World"}) == "Hello World!"
```

#### Format Directives

Trinity also provides an extensive format specifier mini-language for transforming, converting serializing and translating strings, taking its inspiration from Command Prompt.

They look like this: `%float/sci/pow:32/sf:3`. A command immediately after the percent sign, followed by an optional range of switches `/sw` and their optional values `:val`.

```dart
const prices = { bread: 4.50 }
'I like bread. It costs $prices.bread%f/cur:SGD.'
// "I like bread. It costs $4.50."
```
