# Trinity

> One language, three aspects.

Trinity is a typed, multi-paradigm and multi-faceted programming language, and can be used to safely build and test complex software, apps and libraries for web, desktop and mobile; or for the frontend, API and backend. Trinity will be entirely implemented and integrated with JavaScript and the web ecosystem.

The language is very similar to Go, Swift, Kotlin or Scala, tied with a unified, comprehensive and clean API with minimal abstractions, supported out of the box.

```dart
class Node {
  ghost var list: Seq[Int]
  ghost var repr: Set[Node]
  var head: Int
  var next: ?Node

  pred valid where read (this, repr) {
    this in repr &&
    1 <= #list && list[0] == head &&
    (next == null ==> #list == 1) &&
    (next != null ==>
      next in repr &&
      next.repr <= repr &&
      this !in next.repr &&
      next.valid() &&
      next.list == list[1 : #list])
  }

  stat def cons(x: int, tail: ?Node) return n: Node where
    check !?tail || tail.valid()
    and n.valid()
    and (if !?tail { n.list == [x] }
        else { n.list == [x] + tail.list }) {
    var n = new Node
    n.head, n.next = x, tail
    if !?tail {
      n.list = [x]
      n.repr = {n}
    } else {
      n.list = [x] + tail.list
      n.repr = {n} + tail.repr
    }
  }
}

proc search(ll: ?Node) return r: Int where
  need !?ll || ll.valid()
  check !?ll ==> r == 0
  and ?ll ==>
    0 <= r && r <= #ll.list &&
    (r < #ll.list ==> ll.list[r] == 0 &&
    0 !in ll.list[: r]) &&
    (r == #ll.list ==> 0 !in ll.list) {
  if !?ll { r = 0 } else {
    var jj, i = ll, 0
    while ?jj && jj.head != 0 where
      same ?jj ==> jj.valid() &&
        i + #jj.list == #ll.list &&
        ll.list[i :] == jj.list
      and !?jj ==> i == #ll.list
      and 0 !in ll.list[: i]
      till #ll.list - i {
      jj.=next
      i += 1
    }
    r = i
  }
}

proc main {
  var list: ?Node = null
  for let x in [0, 5, 0, 8] { list.=cons(x, list) }
  var r = search(list)
  print"Search returns $r\n"
  assert r == 1
}
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

## Table of Contents

1. About this document
   1. Introducing Trinity
   2. About this document
   3. Backus-Naur form
   4. Definitions
2. Lexical analysis
   1. Encoding
   2. Definitions
      1. Input
      2. Tokens and whitespace
      3. Character Classes
      4. Comments
   3. Syntax
      1. Semicolons
      2. Commas
      3. Curly brackets
      4. Parentheses
   4. Comments
      1. Line comments
      2. Simple block comments
      3. Nested block comments
   5. Identifiers
      1. Identifier types
         1. Camel-case
         2. Pascal-case
         3. Capital/snake-case
         4. Leading underscores
      2. Identifier equality
      3. Stropping
   6. Keywords
3. Syntax
   1. Structure
   2. Precedence
   3. Associativity
   4. Order of evaluation
   5. Full grammar **TODO**
4. Literals
   1. Null and Void
   2. Booleans
   3. Numbers
      1. Integers
      2. Floats and decimals
      3. Exponential notation
      4. Repeating digits
      5. Fractions
      6. Rounding
      7. Arbitrary-base numbers
   4. Strings
      1. Raw (single-quoted) strings
      2. Escaped (escaped) strings
      3. Backslash strings
      4. String interpolation
      5. String formatting
         1. Directives **TODO**
      6. Locale strings
   5. Regular expressions
      1. Basic syntax elements
      2. Characters
      3. Classes
      4. Sets
      5. Unicode
      6. POSIX
      7. Anchors
      8. Assertions
      9. Quantifiers
      10. Groups
      11. Back-references
      12. Flags
      13. Embedded code
      14. Template strings
   6. Collections
      1. Lists
      2. Sets
      3. Maps
   7. Buffers
   8. Symbols
   9. Operators
   10. JSX Markup
   11. Styles
   12. Lambdas
   13. Punctuation
5. Clauses and statements
   1. Closures
      1. Do clause
   2. Control flow
      1. Return statement
      2. Yield statement
      3. Break statement
      4. Skip statement
      5. Label statement
      6. Goto statement
      7. Redo statement
      8. Retry statement
      9. Await statement
      10. Pass statement
      11. Throw statement
   3. Conditions
      1. If/Un clause
      2. Elif/elun clause
      3. Else clause
      4. When clause in loops
   4. Loops
      1. For/each clause
      2. While/until clause
      3. Loop clause
      4. Loop-while/until clause
   5. Switch
      1. Case/when clause
      2. Fail/else clause
   6. Match
      1. Basic expressions
      2. Guard conditions
      3. Matching on:
         1. Literals
         2. Strings
         3. Regular expressions
         4. Collections
         5. Objects
         6. Functions
         7. Symbols
         8. Types
   7. Concurrency
      1. Unite clause
      2. Queue clause
      3. Spawn and kill clause
   8. Error handling
      1. Try clause
      2. Catch clause
      3. Fix clause
      4. Catch-match/switch
      5. With clause
      6. Defer clause
   9. Query expressions
      1. Select clause
      2. Where clause
      3. Sort clause
      4. Limit clause
      5. Group clause
      6. Join clause
      7. Reduce clause
   10. Program verification
       1. Debug statement
       2. Check statement
       3. Assert statement
       4. Assume statement
   11. Module statement
       1. Import statement
       2. Export statement
       3. Using statement
6. Declarations
   1. Variables
   2. Types
   3. Functions and closures
   4. Classes
   5. Enumerations
   6. Modules and packages
   7. Namespaces
   8. Singleton objects
   9. Structures and interfaces
   10. Protocols and traits
   11. Datatypes and fields
   12. Iterators
   13. Constraints
   14. Styles and components
   15. Predicates

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
- `?` - repetition: zero or one
- `|` - alternation: return longest match
- `/` - alternation: try operands in given order, from left to right
- `-` - subtracts a class or range from another
- `&` - takes the intersection of two classes or ranges
- `+` - takes the union of two classes or ranges
- `~` - negates a character class or range
- `+` - takes the symmetric difference of two classes or ranges
- `a %+ b` - equivalent to `a (b a)*`
- `a %* b` - equivalent to `(a (b a)*)?`
- `a...z` - inclusive character range
- `a..<z` - character range exclusive
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
clause = (("then" | "=>") statement | block);
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

### Source code reproesentation

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

Keywords lose meaning and become ordinary identifiers when they are part of the inner members of a qualified name, such as a function or method.

```dart
type Type = {
  def: Func;
};

const object_ = new Type({def: |x| x = 10});
assert object_ is Type;
assert object_.def == 9;

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
""" "stringified string""""
```

produces:

```txt
"stringified string"
```

#### Macro Strings

Terminal symbols in the grammar: `Macro(Multi)?(Raw|Esc)StrLit`.

The construct `identifier"string"` is a shortcut for the construct `identifier("string")`, denoting a macro call with a string literal as its only argument. Macro string literals are especially convenient for embedding DSLs directly into Trinity (for example, SQL).

#### String Interpolation

#### Locale Strings

#### Format Directives

### Regular expressions

Regular expressions are like strings, except that they are delimited using backticks `` ` `` as opposed to single or double quotes. Typical escaping rules apply, though in between `()` or `[]`, `` ` `` can be left as is.

The following section serves as a summary to the regular expression syntax of Nova, as well as some of the more unique features that Nova has over other regex flavors.

#### Basic Syntax Elements

| Syntax      | Description                           |
| ----------- | ------------------------------------- |
| `\`         | Escape (disable) a metacharacter      |
| `\|`        | Alternation                           |
| `(...)`     | Capturing group                       |
| `[...]`     | Character class (can be nested)       |
| `${...}`    | Embedded expression                   |
| `{,}`       | Quantifier token (LHS 0, RHS &infin;) |
| `\Q...\E`   | Raw quoted literal                    |
| `\q...\e`   | Quoted literal                        |
| `\0` onward | Numeric backreference (0-indexed)     |
| `$...%...`  | Interpolation with `sprintf` syntax   |

#### Characters

Most of these characters also appear the same way as in string literals.

| Syntax                           | Description and Use                         |
| -------------------------------- | ------------------------------------------- |
| `\a`                             | \*Alert/bell character (inside `[]`)        |
| `\b`                             | \*Backspace character (inside `[]`)         |
| `\B`                             | \*Backslash (inside `[]`)                   |
| `\e`                             | Escape character (Unicode `U+`)             |
| `\f`                             | Form feed (Unicode `U+`)                    |
| `\n`                             | New line (Unicode `U+`)                     |
| `\r`                             | Carriage return (Unicode `U+`)              |
| `\t`                             | Horizontal tab (Unicode `U+`)               |
| `\v`                             | Vertical tab (Unicode `U+`)                 |
| `\cA`...`\cZ`<br>`\ca`...`\cz`   | Control character from `U+01` to `U+1A`     |
| `\x00`                           | Unicode character from `U+00` to `U+FF`     |
| `\u0000`                         | Unicode character from `U+00` to `U+FFFF`   |
| `\U00000000`                     | Unicode character from `U+00` to `U+10FFFF` |
| `\u{7HHHHHHH}`<br>`\x{7HHHHHHH}` | Unicode character (1-8 digits)              |
| `\o{17777777777}`                | Octal Unicode codepoint (1-11 digits)       |

#### Character Sequences

| Syntax                | Description                              |
| --------------------- | ---------------------------------------- |
| `\x{7F 7F ... 7F}`    | Hexadecimal code point (1-8 digits)      |
| `\o{100 100 ... 100}` | Octal code point (1-11 digits)           |
| `\j{alpha beta}`      | `j`-expansion (full documentation later) |

#### Character Classes

| Syntax     | Inverse | Description                                                       |
| ---------- | ------- | ----------------------------------------------------------------- |
| `.`        | None    | Hexadecimal code point (1-8 digits)                               |
| `\w`       | `\W`    | Word character `[\d]`                                             |
| `\d`       | `\D`    | Digit character `[0-9]`                                           |
| `\s`       | `\S`    | Space character `[\t\n\v\f\r\20]`                                 |
| `\h`       | `\H`    | Hexadecimal digit character `[\da-fA-F]`                          |
| `\u`       | `\U`    | Uppercase letter `[A-Z]`                                          |
| `\l`       | `\L`    | Lowercase letter `[a-z]`                                          |
| `\f`       | `\F`    | Form feed `[\f]`                                                  |
| `\t`       | `\T`    | Horizontal tab `[\t]`                                             |
| `\v`       | `\V`    | Form feed `[\v]`                                                  |
| `\n`       | `\N`    | Newline `[\n]`                                                    |
|            | `\O`    | Any character `[^]`                                               |
| `\R`       |         | General line break (CR + LF, etc)                                 |
| `\x`, `\X` |         | Extended grapheme cluster                                         |
| `\c`       | `\C`    | First character of identifier; `[\pL\pPc]` by default             |
| `\i`       | `\I`    | Subsequent characters of identifier `[\pL\pPc\pM\pNd]` by default |

##### Unicode Properties

Properties are case-insensitive. Logical operators such as `&&`, `||`, `^^` and `!`, as well as `==` and `!=`, unary `in` and `!in` , `is` and `!is` can work.

A short form starting with `Is` indicates a script or binary property:

- `is Latin`, &rarr; `Script=Latin`.
- `is Alphabetic`, &rarr; `Alphabetic=Yes`.

A short form starting with `In` indicates a block property:

- `InBasicLatin`, &rarr; `Block=BasicLatin` .
- `\p{in Alphabetic && is Latin}` &rarr; all Latin characters in Unicode

| Syntax                                                                | Description                      |
| --------------------------------------------------------------------- | -------------------------------- |
| `\p{property=value}`<br>`\p{property:value}`<br>`\p{property==value}` | Unicode binary property          |
| `\p{property!=value}`<br>`\P{property:value}`                         | Negated binary property          |
| `\p{in BasicLatin}`<br>`\P{!in BasicLatin}`                           | Block property                   |
| `\p{is Latin}`<br>`\p{script==Latin}`                                 | Script property (shorthand `is`) |
| `\p{value}`                                                           | Short form\*                     |
| `\p{Cc}`                                                              | Unicode character categories^    |

\*Properties are checked in the order: `General_Category`, `Script`, `Block`, binary property:

- `Latin` &rarr; (`Script=Latin`).
- `BasicLatin` &rarr; (`Block=BasicLatin`).
- `Alphabetic` &rarr; (`Alphabetic=Yes`).

##### POSIX Classes

Alternatively, `\p{}` notation can be used instead of `[::]`.

| Syntax       | ASCII                                        | Unicode (`/u` flag) | Description                                              |
| ------------ | -------------------------------------------- | ------------------- | -------------------------------------------------------- |
| `[:alnum:]`  | `[a-zA-Z0-9]`                                | `[\pL\pNl}\pNd]`    | Alphanumeric characters                                  |
| `[:alpha:]`  | `[a-zA-Z]`                                   | `[\pL\pNl]`         | Alphabetic characters                                    |
| `[:ascii:]`  | `[\x00-\x7F]`                                | `[\x00-\xFF]`       | ASCII characters                                         |
| `[:blank:]`  | `[\x20\t]`                                   | `[\pZs\t]`          | Space and tab                                            |
| `[:cntrl:]`  | `[\x00-\x1F\x7F]`                            | `\pCc`              | Control characters                                       |
| `[:digit:]`  | `[0-9]`                                      | `\pNd`              | Digits                                                   |
| `[:graph:]`  | `[\x21-\x7E]`                                | `[^\pZ\pC]`         | Visible characters (anything except spaces and controls) |
| `[:lower:]`  | `[a-z]`                                      | `\pLl`              | Lowercase letters                                        |
| `[:number:]` | `[0-9]`                                      | `\pN`               | Numeric characters                                       |
| `[:print:]`  | `[\x20-\x7E] `                               | `\PC`               | Printable characters (anything except controls)          |
| `[:punct:]`  | `[!"\#$%&'()\*+,\-./:;<=>?@\[\\\]^\_'{\|}~]` | `\pP`               | Punctuation (and symbols).                               |
| `[:space:]`  | `[ \t\r\n\v\f]`                              | `[\pZ\t\r\n\v\f]`   | Spacing characters                                       |
| `[:symbol:]` | `[\pS&&\p{ASCII}]`                           | `\pS`               | Symbols                                                  |
| `[:upper:]`  | `[A-Z]`                                      | `\pLu`              | Uppercase letters                                        |
| `[:word:]`   | `[A-Za-z0-9_]`                               | `[\pL\pNl\pNd\pPc]` | Word characters                                          |
| `[:xdigit:]` | `[A-Fa-f0-9] `                               | `[A-Fa-f0-9]`       | Hexadecimal digits                                       |

#### Character Sets

A set `[...]` can include nested sets. The operators below are listed in increasing precedence, meaning they are evaluated first.

<!-- prettier-ignore -->
| Syntax | Description |
| --- | --- |
| `^...`, `~...`, `!...`  | Negated (complement) character class |
| `x-y` | Range (from x to y) |
| `\|\|` | Union (`x \|\| y` means "x or y") |
| `&&` | Intersection (`x && y` means "x and y" ) |
| `^^` | Symmetric difference (`x ^^ y` means "x and y, but not both") |
| `--` | Difference (`x ~~ y` means "x but not y") |

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

This syntax applies to the right hand side of the regex literal in regex operations such as `=<` substitution and `</>` transliteration.

| x         | y                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$$`      | Inserts a literal "$".                                                                                                                                 |
| `$0`      | Inserts the entire matched substring into the output                                                                                                   |
| `$-`      | Inserts the portion of the string that precedes the matched substring.                                                                                 |
| `$+`      | Inserts the portion of the string that follows the matched substring.                                                                                  |
| `$n`      | Where `n` is a positive integer, inserts the `n`th parenthesized submatch string. If `n` refers to an invalid group, the result is inserted literally. |
| `$<name>` | Where name is a capturing group name. If the group is invalid, it is inserted literally.                                                               |

### Numbers

Numbers are of a single type, and have the following form as shown below. If a number contains only an integer part, it is considered an integer.

Type suffixes can also be used to cast numeric literals to the appropriate type; alternatively, the type can be inferred from the surrounding context: `var x: i16 = 1` and `var x = 1:i16` are one and the same.

```dart
numbersFrom2 = ("2"..."9" | "1"..."9" "0"..."9"+)
customBasePrefix = ("2"..."9" | "1"..."9" digit+) i"b";
customBaseDigits = `[:alnum]`;
base2Prefix = i"0b";  base2Digits = "0" | "1";
base4Prefix = i"0q";  base4Digits = "0"..."3";
base6Prefix = i"0s";  base6Digits = "0"..."5";
base8Prefix = i"0o";  base8Digits = "0"..."7";
base10Prefix = "";    base10Digits = digit = "0"..."9";
base12Prefix = i"0z"; base12Digits = digit | i"a" | i"b";
base16Prefix = i"0x"; base16Digits = digit | i"a"...i"f";

#IntegerPart = #Digits ("_"+ #Digits)*;
#FractionPart = "." #Digits ("_"+ #Digits)*;
#RepeatingPart = "*" #Digits ("_"+ #Digits)*;
#DenominatorPart = "/" #Digits ("_"+ #Digits)*;

base = "0" | "1"..."9" digit+;
ExponentPart = ("*" base)? "^" ["+" "-"]? base;
RoundingPart = "=" ["+" "-" "~"]? base;
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

Trinity allows user defined operators. An operator is any punctuation `P` or symbol `S` character, except `` ,;\'"`()[]{} ``. These keywords are also operators: `in of as is new to til thru by unset del`.

`.=`, `:`, `=`, `:=`, `? :`, `! :` and `$ :` are not available as general operators; they are used for other notational purposes. `=>` is a special case, as it is syntactic sugar for `then` and introduces a block.

### Other tokens

The following strings denote other tokens: `'` `"` `` ` `` `#(` `(` `)` `#{` `{` `}` `#[` `[` `]` `,` `;` `:` `=>`

## Syntax

This section describes the syntax for Trinity.

### Operators

Trinity allows user defined operators with a combination of two declarative keywords: one which tells the parser the arity of the operator, and the keyword `oper`. Both must be before a declaration keyword, such as `fun`, `def`, `proc` or `sub`.

```dart
infix oper fun x = 10
```

Nim allows user-definable operators. Binary operators have 11 different levels of precedence.

### Associativity

Binary operators whose first character is `@` are right-associative, all other binary operators are left-associative.

```dart
infix fun + (x, y: Float): Float = x / y
// A right-associative division operator
result = x / y
echo(12 @/ 4 @/ 8) // 24.0 (4 / 8 = 0.5, then 12 / 0.5 = 24.0)
echo(12 / 4 / 8) // 0.375 (12 / 4 = 3.0, then 3 / 8 = 0.375)
```

### Precedence

Prefix operators always bind stronger than any binary operator: `$a + b` is `($a) + b` and not `$(a + b)`.

If an Prefix operator's first character is `@` it is a sigil-like operator which binds stronger than a leading identifier: `@x.abc` is parsed as `(@x).abc` whereas `$x.abc` is parsed as `$(x.abc)`.

For binary operators that are not keywords, the precedence is determined by the following rules: Operators ending in either `->`, `~>` or `=>` are called arrow like, and have the lowest precedence of all operators.

If the operator ends with `=` and its first character is none of `<`, `>`, `!`, `=`, `~`, `?`, it is an assignment operator which has the second-lowest precedence.

Otherwise, precedence is determined by the first character.

| Precedence level | Operators                                                                                         | First Character | Terminal Symbol |
| ---------------- | ------------------------------------------------------------------------------------------------- | --------------- | --------------- |
| 10 (highest)     | `~@` `::` `:-` `-~` `~-` `.-` `@@` `$$`                                                           | `$` `@`         | `BinaryOper10`  |
| 9                | `*` `**` `***` `/` `#` `##` `%` `%%` `*>` `<*`                                                    | `%` `*` `/`     | `BinaryOper9`   |
| 8                | `+` `-` `++` `--` `=<` `<>` `</` `/>` `<$` `$>` `<$>` `<+>` `<*>` `</>`                           | `+` `-`         | `BinaryOper8`   |
| 7                | `<:` `:>` `:<` `>:` `<:<` `>:>` `<:>` `>:<` `<!` `!>` `!<` `>!` `<!<` `>!>` `<!>` `>!<`           | `.`             | `BinaryOper7`   |
| 6                | `==` `!=` `===` `!==` `~>` `<~` `~~>` `<~~` `<==` `==>` `->` `-->` `<-` `<--` `<~>` `<==>` `<-->` | `=` `!` `>` `<` | `BinaryOper6`   |
| 5                | `&` `^` `\|` `>>` `<<` `>>>` `<<<` `<=>` `<->`                                                    | `?`             | `BinaryOper5`   |
| 4                | `??` `!!` `?:` `!:` `$:` `&` `\|` `^` `~&` `~\|` `~^`                                             | `~`             | `BinaryOper4`   |
| 3                | `&&` `\|\|` `^^` `&~` `\|~` `^~`                                                                  | `#`             | `BinaryOper3`   |
| 2                | `<+` `+>` `<\|` `\|>` `<\|\|` `\|\|>` `<\|\|\|` `\|\|\|>`                                         | `?` `:`         | `BinaryOper2`   |
| 1 (lowest)       | `=` `:=` `+=` `*=` etc; other assignment operators                                                |                 | `BinaryOper1`   |
| 0                | `? :` `! :` `$ :`                                                                                 |                 | `TernaryOper`   |

Whitespace also affects operator parsing. Spacing also determines whether `(a, b)` is parsed as an argument list of a call or whether it is parsed as a tuple constructor.

| Type of operator | Whitespace               | Precedence, Associativity    | Characters |
| ---------------- | ------------------------ | ---------------------------- | ---------- |
| Primary          | None on either end       | Highest; None                | Multiple   |
| Suffix           | Trailing                 | Higher; Left to right        | Single     |
| Prefix           | Leading                  | Lower; Right to left         | Single     |
| Infix            | Spaced out on either end | Lowest; Refer to table above | Multiple   |

```dart
foo |> echo
```
