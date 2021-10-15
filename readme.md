# Trinity

Trinity is an open source programming language that integrates object-oriented and functional programming, enabling developers and teams to fully develop, test and deploy their projects with less code on both the frontend and backend, no matter the platform.
Trinity provides easy access to huge ecosystems of libraries, without the need to manage complex dependencies.

Trinity also comes with a robust program verifier and type checker that watches over your shoulder and flags any errors to you so you can catch bugs early, all tied with a unified and comprehensive standard library for everyday or highly specialized computing tasks (in the future).

```dart
import Process

// Reads a file and prints out the word count.
class WordCount(*args) {
  if args.size() != 1 {
    print('Usage: WordCount <file>');
    exit(&code = -1);
  }

  var wordCounts: {[Str]: Int = 0} = {:};
  var file = Path(args[0]).toFile();
  var raw = file.read();
                .lines().map(.trim())
                .words().map(.trim().lower());

  for let word in words { wordCounts[word] += 1; }
  for let key, value in wordCounts.keys().sort() {
    print"$key: $value";
  }
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
         1. Booleans
         2. Numbers
         3. Strings
         4. Collections
         5. Regex
         6. Markup
         7. Custom objects
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

For the most part, Trinity derives many features from Go, with major influences from Ruby, Scala, Kotlin, Swift, Fantom and Flix. Trinity supports Oniguruma, Stylus and JSX syntax too, though with several adaptations and enhancements to its existing features.

This document provides an overview of the syntax, operations, and semantics in the Trinity language, as well as a comprehensive guide to the modules in Trinity's Standard Library. Other parts of Trinity, like scoping rules or runtime semantics, are described informally.

### Tokens and whitespace

The characters used in Trinity fall into four groups:

- White space characters
- Alphanumerics: letters, digits, combining punctuation and underscores
- Operator characters (other printable characters excluding below)
- Punctuation: `` (){}[],;\'"` ``

Each token consists of a sequence of consecutive characters from just one of those groups, excluding whitespace. Whitespace is ignored except they separate tokens.

A sequence of alphanumeric characters, with no additional non-alphanumeric characters, is a single token. White-space must be used to separate two such tokens in a program. The same thing goes for operators.

### Source code representation

Trinity only encodes text in UTF-8; other encodings are not supported.

### Comments

Comments start anywhere outside a string or character literal with two slashes, and runs until the end of the line. The end of line characters belong to the piece.

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

#### Keywords

The following regular expression denotes all the keywords of the language, including those used for declarations, such as `var`.

Keywords are grouped into three:

- expression keywords, which are keywords used as operators;
- declaration keywords, which declare program entities such as variables, classes and functions,
- modifier keywords which modify such declarations,
- general keywords which command and control program flow and execution.
- pre-defined, or dynamic constants and variables.

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

    true false null void nan infin
    it this that super self target
    params ctor prot pro

#### Identifiers

In [The Unicode Standard 14.0](https://www.unicode.org/versions/Unicode14.0.0/UnicodeStandard-14.0.pdf), **Table 4-4** defines a set of character categories for all Unicode characters.

Trinity treats the entire Unicode `L` super-category as Unicode letters, `M` as combining marks, `Pc` as "underscores", `Pd` as dashes and `Nd` as digits.

An identifier is any sequence of letters, digits, underscores and diacritics, but do not start with diacritics or combining marks. JSX tags can include dashes, but must not end with any amount of trailing dashes.

Naming conventions follow Java or JavaScript. There are four types of identifiers which Trinity recognizes and highlights accordingly:

- `SHOUT_CASE`, used for constants,
- `PascalCase` used for classes, modules, namespaces, and types.
- `camelCase` or `snake_case` used for variables, parameters, functions and methods.
- `_leading` underscores for special methods and keywords.

Variables are compared using their first character, then comparing further characters case-insensitively and ignoring all delimiters. This makes it easier for developers to use varying conventions without having to worry about the variables' exact spelling.

```dart
proc cmpIdent(a: Str, b: Str): Bool =>
  a[0] == b[0] &&
  a.sub(`[^\pL\d]+`g, "").lower() == b.sub(`[^\pL\d]+`g, "").lower();
```

The above rule does not apply to keywords, as all keywords are all-lowercase. Because of this rule, to strop keywords, add one or more trailing underscores.

Keywords lose meaning and become ordinary identifiers when they are part of the inner members of a qualified name, such as a function or method.

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
'''"stringified string"'''
""" "stringified string""""
```

produces:

    "stringified string"

Indentation in block strings begin with the indentation of the first line, right after the opening quote(s). All indentation is preserved or stripped based ons ieh

```dart
'''"stringified string"'''
""" "stringified string""""
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

Block strings also begin with a backslash followed by either `|` or `>`, both functioning like `|` block strings. `\|` behaves like the single quote and `\>` the double quote.

They can also be appended with a "chomping indicator" `+` or `-` to preserve or remove the line feed and trailing blank lines.

```dart
\|
  this is my very very "very" long-ass string.
  Love, Trinity.
\>
  this is my very very \"very\" long-\
  ass string.\nLove, Trinity.
```

Trinity comes with several avenues to make manipulating, formatting and serializing strings easier.

#### String Interpolation

All forms of string literals, with exception to inline backslash strings, can enable arbitrary expressions to be embedded. Embedded expressions are prefixed using the dollar sign and surrounded with curly brackets.

If the expression is an identifier or qualified name, then the brackets can be left out. Use the `\$` escape sequence if you wish to express the dollar sign itself.

```dart
"x is $x, in hex $x.toHex, and x+8 is ${x + 8}"
```

is syntax sugar for:

```dart
"x is " + x + ", in hex " + x.toHex + ", and x+8 is " + (x + 8)
```

You can specify a reusable format string this way:

```dart
'#0%s is #1 meters tall'._format('James', 1.9)
// "James is 1.9 meters tall"
```

The grammar for this is similar to ih

```dart
qualifiedName = !>>Keyword (identifier ^+ separator;)
separator = ["." "!." "?." "::" "!:" "?:"];
interpolateVariable = "$" qualifiedName;
interpolateExpression = "\${" expression "}";
```

#### Macro Strings

Terminal symbols in the grammar: `Macro(Block)?((Single|Double)Quote|Backslash)StringLit`.

Macro strings are used to embed domain-specific languages directly into Trinity, and are functionally the same as JS tagged template literals.

The construct `qualifiedName"string"` denotes a macro call, with a string literal as its only argument. Macro string literals are especially convenient for embedding DSLs directly into Trinity (for example, SQL), then parsing them and doing things with them.

A macro function is defined with the keyword `macro` rather than `fun`, `sub` or `proc`. Macros are functions with up to three arguments. The first argument of a tagged function contains a list of intermediate strings, the second are related to the interpolated values themselves, and the third the formatted result.

```dart
macro template(strings, keys) = |*values| {
  let dict = values[-1] ?? {}
  let values = (from let key in keys
    select if key is Int => values[key]
    else => dict[key]) as List
  strings.intercalate(keys).join('')
}

let t1Closure = template"${0}${1}${0}!"
assert t1Closure("Y", "A") == "YAY!"
let t2Closure = template"${0} ${"foo"}!"
assert t2Closure("Hello", {foo: "World"}) == "Hello World!"
```

```dart
wordChar = `\w` = [letter delim mark digit]
whitespace = `\s` = `\pZ`; quotes = ["\"" "'" "`"];
brackets = ["{" "}" "[" "]" "(" ")" "<" ">"];

formatSwitchPlain = "/" formatSwitchName;
formatSwitchName = formatDirectiveName = jsxTagName;
formatSwitchAttrib = formatSwitchPlain ":" formatValue;
formatValue = (word | "\\" anyChar) ^*
              (![whitespace quotes brackets "\\" "/"] | "\\" anyChar)
              !>>[whitespace "/"];

formatDirective = "%" formatDirectiveName;
formatSwitch = formatSwitchPlain | formatSwitchName;
```

#### Format Directives

Trinity provides a format specifier and mini-language for manipulating and transforming strings, inspired partially by C-shell syntax, such as `taskkill /f /im`. They look like this: `%f/sci/pow:32`.

The first identifier is a command denoted with a type, denoted with `%f` like C, followed by a range of switches/attributes/named arguments `/sw` with their optional values `:value`.

```dart
const prices = { bread: 4.50 }
'I like bread. It costs $prices.bread%f/cur:SGD/loc:en-SG.'
// "I like bread. It costs $4.50."
```

### Regular expressions

Regular expressions function much like strings, except that they are delimited using backticks as opposed to single or double quotes. Escape rules apply, though in between `()` or `[]`, the backtick itself need not be escaped.

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
```\/\* // Match the opening delimiter.
.\*? // Match a minimal number of characters.
\*\/ // Match the closing delimiter.
```
````

If there are two regular expressions side by side, then the one on the right is the replacement string attributed to the pattern on the left.

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
| `\0` onward | Numeric backreference (0-indexed)               |
| `$...%...`  | Interpolation with `sprintf` syntax             |

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
base12Prefix = i"0z"; base12Digits = i[digit "a" "b"];
base16Prefix = i"0x"; base16Digits = i[digit "a"..."f"];

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
| 7                | `<:` `:>` `:<` `>:` `<!` `!>` `!<` `>!` `::` `..` `:::` `...` `..<` `>.<` `>..`                   | `.` `:`         | `BinaryOper7`   |
| 6                | `==` `!=` `===` `!==` `~>` `<~` `~~>` `<~~` `<==` `==>` `->` `-->` `<-` `<--` `<~>` `<==>` `<-->` | `=` `!` `>` `<` | `BinaryOper6`   |
| 5                | `&` `^` `\|` `>>` `<<` `>>>` `<<<` `<=>` `<->`                                                    | `?`             | `BinaryOper5`   |
| 4                | `??` `!!` `?:` `!:` `$:` `&` `\|` `^` `~&` `~\|` `~^`                                             | `~`             | `BinaryOper4`   |
| 3                | `&&` `\|\|` `^^` `&~` `\|~` `^~`                                                                  | `#`             | `BinaryOper3`   |
| 2                | `<+` `+>` `<\|` `\|>` `<\|\|` `\|\|>` `<\|\|\|` `\|\|\|>`                                         | `?`             | `BinaryOper2`   |
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
