# Protea

Protea is a versatile, cross-platform and multi-paradigm programming language that seeks to enhance JavaScript with a better sense of belonging in the community, while preserving much of its original vision; all with a cleaner syntax, powerful tools and libraries, faster performance and compilation, and a more intuitive approach to development.

Protea's main motive is just like Rust: empowering everyone to build reliable and efficient software, with the power of JavaScript and WebAssembly at its side. It has a fast compiler toolchain that is blazingly fast and outputs performance-optimized code, and boasts a unique combination of language-integrated features inspired by the best of the web.

```coffee
module Button =
  style button
    color: palevioletred
    border: 2px solid palevioletred
    border-radius: 3px
    padding: 0.5em 1em
    font-size: 1em
    font-weight: bold
    cursor: pointer
    &:hover
      color: white
      background: palevioletred
    &:active
      color: palevioletred
      background: white
    &:focus
      outline: none

  func make(&count: int) =
    let times = match count then
      case 1 then "once"
      case 2 then "twice"
      fail "$count times"
    let msg = "Click me $times"
    mark <button $msg
```

## Overview

We all know JavaScript has very tricky parts, some of which can turn our jobs into nightmares, but still, people continue to improve and expand JavaScript into new horizons. We're now in the era where JavaScript is used in almost every industry, and it's time to make it more accessible to everyone.

New languages and compilers for existing languages have been developed and created, attempting to hide away the fundamental problems of JavaScript, but it's still hard to debug or learn from and use, thereby making it harder to maintain and integrate even in a large JavaScript project.

## Why Protea?

Protea is a new programming language that seeks to remove many of the warts of JavaScript, while preserving its fundamental nature, tied in with a robust type system, a fast compiler/runtime and a powerful combination of features and tools to make it easier to build, maintain and integrate into JavaScript projects.

Protea is inspired not only from TypeScript, but also from Kotlin, Rust, Go, OCaml and Elixir, with concepts from Scala and Haskell. All this is done in an effort to enhance JavaScript's brevity and readability.

```coffee
# Assignment:
let number   = 42
let opposite = true
let regex = `"(\d+)":\s*\n\s*name:\s+([-.\w]+)$` `$1: {name: $2}`

# Conditions:
let number = if opposite then -42 else number

# Functions:
func square(x) = x * x
let square = |x| x * x

# Arrays:
let list = [1 2 3 4 5]

# Maps:
let math = {
  root:   Math.sqrt
  square: square
  cube:   |x| x * square x
}

# Splats:
let race = |winner, *runners|
  print winner runners

# Existence:
if ?elvis then alert "I knew it!"

# Array comprehensions:
let cubes = [for y in list then math.cube num]

# LINQ:
let cubes = from x in 1 to 100
  select Math.cube(x);
```

---

## Syntax Overview

> This reference is structured so it can be read from top to bottom. Later sections use concepts and syntax previously introduced. Familiarity with JavaScript (or TypeScript if better) is assumed.

### Syntax

#### Comments

Comments start with the `#` character followed by a space. All following text up to the end of the line is considered a comment. They can be on their own line or follow after a statement.

```coffee
# This is a single line comment.
#=
  This is a multiline comment.
  #= It can be nested. =#
=#
```

Documentation comments `#:` and `#+ +#` are special forms of comments that are used to document your code. They are used to generate documentation, and support JSDoc and Markdown formatting.

The compiler command `pta doc` automatically extracts the API documentation and generates a website to present it.

```coffee
#: This is a single line comment.
#+
  This is a multiline comment.
  #+ It can be nested. +#
+#
```

#### Indentation

Protea is a hybrid-form language, meaning you can use curly braces _and_ indentation to structure and organize your code.

```coffee
rec func List.has(item: any): bool
  match this
    case []
      false
    case [a, *rest]
      a == item && rest.has item
```

though you can also write it like this:

```coffee
rec func List.has(item: any): bool {
  match this {
    case [] {
      false }
    case [a, *rest] {
      a == item && rest.has item } }
```

or a combination of both:

```coffee
rec func List.has(item: any): bool
  match this
    case [] { false }
    case [a, *rest] { a == item && rest.has item }
```

You can also use `then` or a right-spaced colon if a code block is expected after a statement (such as `if` or `while`).

```coffee
rec func List.has(item: any): bool
  match this
    case []: false
    case [a, *rest]: a == item && rest.has item
```

#### Identifiers

Variables are compared case-insensitively except the first non-lowercase character. This means you can use varying conventions in your program without having to worry about name collisions or case conventions.

An identifier can contain any sequence of letters, digits, marks,underscores, and dashes, provided it starts with a letter or underscore, and does not end in any number of dashes.

```ts
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

Identifiers are compared using an approach known as partial case-insensitivity.

```coffee
func normalize(a: str): str = match a
  case a.sub(`[^\d\pL]`g, '') ~= `\p{Upper}+`
    a.sub(`[^\d\pL]`g, '').upper!
  fail
    a[0] + a[1:].sub(`[^\d\pL]`g, '').lower!

func cmpIdent(a: str, b: str): bool =
  normalize a == normalize b
```

#### Semicolons

Like most other modern languages, semicolons are optional. Ending the line would do just fine. (although they can be used to fit multiple statements onto a single line).

#### Parentheses

You can pass arguments to functions Haskell style - parentheses here have nothing to do with function calls.

```coffee
print sys.inspect obj
print(sys.inspect, obj)

fn (x + 3) x - 3
fn(x + 3, x) - 3
```

You can call functions with named arguments by using the `/` syntax. Named arguments have no order in functions, so you can call them in any order.

```coffee
print(x, name, &sep = "\n")
print x name /sep "\n"
```

### Variables

Protea has two ways to declare variables - `var` to declare a mutable variable and `val` to declare an immutable one.

Declarations are scoped through code blocks, one such example is `do`. Also take note that in code blocks, the last line is implicitly returned.

```coffee
let message = do
  let part1 = "hello"
  let part2 = "world"
  part1 ++ " " ++ part2
# `part1` and `part2` not accessible here!
```

All language constructs such as control flow statements and functions also rely on this mechanism too.

```coffee
if displayGreeting
  var message = "Enjoying the docs so far?"
  print message
# `message` not accessible here!
```

`:=` updates variables outside scopes, and destructively modifies any data structure or class.

### Keywords

Keywords are all lowercase and are special tokens in Protea. They are used to denote special constructs, such as functions, classes, and control structures, and are distinguished from identifiers.

Because of how identifiers are compared, you can use any number of leading underscores to escape a keyword to turn it into an identifier.

```coffee
assert _assert = null
```

The following are considered keywords:

    in of as is new
    to til thru by del
    unset ref and or xor not
    var let func proc type
    class data enum module
    iter macro struct object
    trait style elem prop mark
    go defer do from where with
    if elif else then def decl
    for each loop while
    try throw catch after
    match case goto pass
    break next redo retry
    return yield await label
    import export route
    debug assert check

Keywords become identifiers when part of a qualified name, such as `x.for` or `y::loop`.

## Data types

Protea comes with literals for many familiar and new primitive types such as `str`, `int`, `float`, `bool`, `list`, `set`, `map` and more, such as `func`, `sym` and `regex`.

### Null

The `null` type is used to represent the absence of a value, similar in other languages. It only has a single value:

```coffee
null
```

You can also use `void`, they are conceptually identical.

### Booleans

`bool` has only two possible values: true and false. They are constructed using the following literals:

```coffee
true  # A Bool that is true
false # A Bool that is false
```

### Integers

There are four integer types: `int`, `nat` which are signed/unsigned 64-bit integers, and their arbitrary-precision `big` counterparts.

An integer literal is a sequence of digits and underscores, optionally followed by a type suffix. All numbers are case-insensitive except their suffixes which are ordinary identifiers.

```coffee
1 # int
1u # nat
1n # bigint
1nu 1un # bignat

18446744073709551616 # bigint
18_446_744_073_709_551_616u # bigint
```

Underscores can be used to make numbers more readable.

We also provide some more literals for numbers in different bases, from binary to hexadecimal (skipping over base 14.)

```coffee
decimal = 11256099
hex = 0xABC123
octal = 0o52740443
binary = 0b101010111100000100100011
quaternary = 0q122303 # base 4
senary = 0s32403235 # base 6
duodecimal = 0zB23430A19 # base 12
```

### Rationals

There are four rational types: `float` which is a IEEE binary64 type, and `rat`, which is a pair of one signed and one unsigned integer. Both have their arbitrary-precision `big` counterparts.

Floating point numbers are inherently rational.

The `f` suffix is used to denote a float, and `r` is used to denote a rational. You would need to fo

Repeating digits use the form `x.yrz` where `x` is the integer part, `y` is the decimal part and `z` is the repeating part.

```coffee
1r / 30r = 0.0r3r
```

Rational literals can also use a improper fraction of the form form `xny`, `n` meaning numerator. In this form, the `r` can be dropped.

```coffee
1r / 30r = 0n3
```

Exponent parts use `ex` (or `px` (`p` for power) in the case of hexadecimal) where `x` is the exponent with an optional sign.

An optional base `y` can be supplied in which case it is repeated: `exey`, `pxey` or any combination thereof.

```coffee
1e+40
0x1p+40
```

Literals can also be truncated (`t`) to a given precision. `tx` or `tdx` counts of fractional places (digits after the point in whatever base). `tsx` counts the number of significant digits instead.

```coffee
1t10
0x1ts40
```

All that can be followed by an optional type suffix which can be any identifier.

### Strings

A string literal is enclosed using either single or double quotes. Double quotes support escape sequences, while single quotes do not. Strings are already multiline by default.

To escape a single quote, double it.

```coffee
let marioSays = 'It''sa me, Mario!'

let greeting = "Hello world!"
let multilineGreeting = "Hello
  world!"

assert "hello\nworld" == multilineGreeting
```

Strings can be delimited using multiple quotes of the same type, as long as they begin with at least three quotes. The string ends with the furthest set of quotes, if the strings ends with more than the number of opening quotes.

In multi-quoted strings, all starting/ending whitespace before the first/last non-whitespace character is removed. All indentation is stripped based on the first line.

```coffee
let greeting = """
"
Hello World!
"
"""
```

Most of the escape sequences in JavaScript and other languages are also supported in Protea.

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

A backslash followed by as many decimal digits denotes a code point written in decimal.

```coffee
"\33" # => "A"
"\83" # => "S"
"\10" # => "\n"
"\0"  # null char
```

Escapes with other bases are also allowed:

```coffee
decimal = "\11256099"
hex = "\xABC123"
octal = "\o52740443"
binary = "\b101010111100000100100011"
quaternary = "\q122303" # base 4
senary = "\s32403235" # base 6
duodecimal = "\zB23430A19" # base 12
```

The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

Double quoted literals also allow you to embed LaTeX expressions (because why not?).

```dart
// LaTeX expressions:
"\j{
  \documentclass{article}
  \title{Cartesian closed categories and the price of eggs}
  \author{Jane Doe}
  \date{September 1994}
  \begin{document}
    \maketitle Hello world!
  \end{}
}"
```

Any other character following a backslash is interpreted as the character itself.

In single quotes, meta-characters such as `'`, `$`, `%` and `#` are doubled in order to be escaped (literal). In double quotes, you can use the backslash to escape them.

### Interpolation

Both types of strings support interpolation with `${}`, which is a way to embed variables. The braces can be omitted if the expression is only:

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `[][1]`
- a function call: `func()`
- and any combination of the like

By default, all embedded expressions are converted to strings by passing it through the `str` method and concatenating the resulting string. You can override this behaviour by using the construct `ident'string'` instead.

```coffee
let greeting = "Hello $name!"
```

### Formatting directives

Format directives are used to format a value into a string using a built-in `format` method.

Each directive begins with a percent sign and an identifier, followed by a set of flags prefixed with slashes `/flag`, and an optional value after the colon `/flag:value`.

```coffee
"Hello ${"world"}"
"Hello ${"world"}%str/upper" # => "Hello WORLD"
```

### Template strings

You can create template strings by using the `#` character to mark placeholders in a string. The arguments can be named, as in `#name`, or positional, as in `#0` or `#-1` (negative indices count from the last).

```coffee
var greeting = "Hello #0!"
greeting "World" # => "Hello World!"
```

You can also spread arguments into the string by using the `*` operator, and mark them as optional by using the `?` operator.

### Backslash strings

Strings can be written with a preceding backslash instead of quotes. Backslash strings can't contain `, ; ] ) }` or whitespace.

```coffee
\word
fn \word, \word
fn(word)
[\word]
{prop: \word}
```

### Symbols

A symbol represents a unique name inside the entire source code.

Symbols are interpreted at compile time and cannot be created dynamically. The only way to create a Symbol is by using a symbol literal, denoted by a colon (`:`) followed by an identifier. The identifier may optionally be enclosed in quotes.

```coffee
:unquoted_symbol
:"quoted symbol"
:"a" # identical to :a
:あ
```

A quoted identifier can contain any unicode character including white spaces and accepts the same escape sequences as a string literal, yet no interpolation.

For an unquoted identifier the same naming rules as regular identifiers apply. The values can also include keywords.

```coffee
:identifier :name
```

### Regexes

A regular expression is typically created with a regex literal using extended Oniguruma/PCRE syntax. It consists of a string of UTF-8 characters enclosed in forward slashes (backticks):

````coffee
`\b{wb}(fee|fie|foe|fum)\b{wb}`x
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] `]`x
`
# Match a 20th or 21st century date in yyyy-mm-dd format
(19|20)\d\d                # year (group 1)
[- /.]                     # separator
(0[1-9]|1[012])            # month (group 2)
[- /.]                     # separator
(0[1-9]|[12][0-9]|3[01])   # day (group 3)
`

# Multi-quoted regex
```(?:[a-zA-Z_]|(?:\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}))*(?=:)```
````

Interpolation and formatting also applies but the interpolated result is usually escaped so to prevent generating invalid regular expressions.

#### Basic Syntax Elements

| Syntax            | Description                           |
| ----------------- | ------------------------------------- |
| `\`               | Escape (disable) a metacharacter      |
| `\|`              | Alternation                           |
| `&`               | Join operator                         |
| `(...)`           | Capturing group                       |
| `[...]`           | Character class (can be nested)       |
| `[^...]` `[!...]` | Character class (can be nested)       |
| `[...]`           | Character class (can be nested)       |
| `{,}`             | Quantifier token (LHS 0, RHS &infin;) |
| `"..."`           | Raw quoted literal                    |
| `'...'`           | Quoted literal                        |
| `\0` onward       | Numeric back-reference (0-indexed)    |
| `%...`            | String formatting                     |
| `#...`, `#{}`     | String anchor                         |
| `${...}`          | String interpolation                  |

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

| Syntax | Inverse | Description |
| --- | --- | --- |
| `.` | None | Hexadecimal code point (1-8 digits) |
| `\w` | `\W` | Word character `\pL\pM\pPc\pNd` |
| `\d` | `\D` | Digit character `\pNd` |
| `\s` | `\S` | Space character `\pZ` |
| `\h` | `\H` | Hexadecimal digit character `[\da-fA-F]` |
| `\u` | `\U` | Uppercase letter `[A-Z]` |
| `\l` | `\L` | Lowercase letter `[a-z]` |
| `\q` | `\Q` | Punctuation and symbols `[\pP\pS]` |
| `\f` | `\F` | Form feed `[\f]` |
| `\t` | `\T` | Horizontal tab `[\t]` |
| `\v` | `\V` | Form feed `[\v]` |
| `\n` | `\N` | Newline `[\n]` |
| `\o` | `\O` | Null character `[^]` |
| `\R` |  | General line break (CR + LF, etc); outside `[]`] |
| `\c` | `\C` | First character of identifier; `[\pL\pPc]` by default |
| `\i` | `\I` | Subsequent characters of identifier `[\pL\pPc\pM\pNd]` by default |
| `\x` | `\X` | Extended grapheme cluster |

##### Unicode Properties

Properties are case-insensitive. Logical operators `&&`, `||`, `^^` and `!`, can be interspersed to express compound queries.

| Syntax | Description |
| --- | --- |
| `\p{prop=value}`<br>`\p{prop==value}` | `prop` equals `value` |
| `\p{prop!=value}`<br>`\P{prop=value}` | `prop` does not equal `value` |
| `\p{prop^=value}` | `prop` begins with but does not equal `value` |
| `\p{prop$=value}` | `prop` ends with but does not equal `value` |
| `\p{prop*=value}` | `prop` contains but does not equal `value` |
| `\p{prop\|=value}` | `prop` begins with or equals to `value` |
| `\p{prop~=value}` | `prop` ends with or equals to `value` |
| `\p{prop&=value}` | `prop` contains or equals to `value` |
| `\p{in BasicLatin}`<br>`\P{!in BasicLatin}` | Block property |
| `\p{is Latin}`<br>`\p{script==Latin}` | Script or binary property |
| `\p{value}` | Short form\* |
| `\p{Cc}` | Unicode character categories^ |

\*Properties are checked in the order: `General_Category`, `Script`, `Block`, binary property:

- `Latin` &rarr; (`Script==Latin`).
- `BasicLatin` &rarr; (`Block==BasicLatin`).
- `Alphabetic` &rarr; (`Alphabetic==Yes`).

##### POSIX Classes

Alternatively, `\p{}` notation can be used instead of `[:]`.

| Syntax | ASCII | Unicode (`/u` flag) | Description |
| --- | --- | --- | --- |
| `[:alnum]` | `[a-zA-Z0-9]` | `[\pL\pNl}\pNd]` | Alphanumeric characters |
| `[:alpha]` | `[a-zA-Z]` | `[\pL\pNl]` | Alphabetic characters |
| `[:ascii]` | `[\x00-\x7F]` | `[\x00-\xFF]` | ASCII characters |
| `[:blank]` | `[\x20\t]` | `[\pZs\t]` | Space and tab |
| `[:cntrl]` | `[\x00-\x1F\x7F]` | `\pCc` | Control characters |
| `[:digit]` | `[0-9]` | `\pNd` | Digits |
| `[:graph]` | `[\x21-\x7E]` | `[^\pZ\pC]` | Visible characters (anything except spaces and controls) |
| `[:lower]` | `[a-z]` | `\pLl` | Lowercase letters |
| `[:number]` | `[0-9]` | `\pN` | Numeric characters |
| `[:print]` | `[\x20-\x7E] ` | `\PC` | Printable characters (anything except controls) |
| `[:punct]` | `[!"\#$%&'()\*+,\-./:;<=>?@\[\\\]^\_'{\|}~]` | `\pP` | Punctuation (and symbols). |
| `[:space]` | `[\x20\t\r\n\v\f]` | `[\pZ\t\r\n\v\f]` | Spacing characters |
| `[:symbol]` | `[\pS&&[:ascii]]` | `\pS` | Symbols |
| `[:upper]` | `[A-Z]` | `\pLu` | Uppercase letters |
| `[:word]` | `[A-Za-z0-9_]` | `[\pL\pNl\pNd\pPc]` | Word characters |
| `[:xdigit]` | `[A-Fa-f0-9] ` | `[A-Fa-f0-9]` | Hexadecimal digits |

#### Character Sets

A set `[...]` can include nested sets. The operators below are listed in increasing precedence, meaning they are evaluated first.

| Syntax | Description |
| --- | --- |
| `^...`, `~...`, `!...` | Negated (complement) character class |
| `x-y` | Range (from x to y) |
| `\|\|` | Union (`x \|\| y` &rarr; "x or y") |
| `&&` | Intersection (`x && y` &rarr; "x and y" ) |
| `^^` | Symmetric difference (`x ^^ y` &rarr; "x and y, but not both") |
| `--` | Difference (`x ~~ y` &rarr; "x but not y") |

#### Anchors

| Syntax | Inverse | Description                                  |
| ------ | ------- | -------------------------------------------- |
| `^`    | None    | Beginning of the string/line                 |
| `$`    | None    | End of the string/line                       |
| `\b`   | `\B`    | Word boundary                                |
| `\a`   | `\A`    | Beginning of the string/line                 |
| `\z`   | `\Z`    | End of the string/before new line            |
| `\G`   |         | Where the current search attempt begins/ends |
| `\K`   |         | Keep start/end position of the result string |
| `\m`   | `\M`    | Line boundary                                |
| `\y`   | `\Y`    | Text segment boundary                        |

#### Quantifiers

| Syntax | Reluctant `?` (returns shortest match) | Possessive `+` (returns nothing) | Greedy `*` (returns longest match) | Description |
| --- | --- | --- | --- | --- |
| `?` | `??` | `?+` | `?*` | 1 or 0 times |
| `+` | `+?` | `++` | `+*` | 1 or more times |
| `*`, `{,}`, `{}` | `*?`, `{,}?`, `{}?` | `*+`, `{,}+`, `{}+` | `**`, `{,}*`, `{}*` | 0 or more times |
| `{n,m}` | `{n,m}?` | `{n,m}+` | `{n,m}*` | At least `n` but no more than `m` times |
| `{n,}` | `{n,}?` | `{n,}+` | `{n,}*` | At least `n` times |
| `{,m}` | `{,m}?` | `{,m}+` | `{,m}*` | Up to `m` times |
| `{n}` | `{n}?` | `{n}+` | `{n}*` | Exactly `n` times |

#### Groups

`(?'')`, `(?"")` notation can also be used.

| Syntax                      | Description                            |
| --------------------------- | -------------------------------------- |
| `()`                        | Numbered capturing group               |
| `(?:)`                      | Non-capturing group                    |
| `(?\<x>)` `(?'x')` `(?"x")` | Named capturing group                  |
| `(?<\|x>)`                  | Balancing group                        |
| `(?<x\|x>)`                 | Balancing pair                         |
| `(?=)`                      | Positive look-ahead                    |
| `(?!)`                      | Negative look-ahead                    |
| `(?<=)`                     | Positive look-behind                   |
| `(?<!)`                     | Negative look-behind                   |
| `(?>)`                      | Atomic group (no backtracking)         |
| `(?())`                     | Conditional branching                  |
| `(?\|)`                     | ...with alternatives                   |
| `(?/)`                      | Shortest match                         |
| `(?/=)`                     | Longest match                          |
| `(?*)`                      | Embedded code                          |
| `(?{})` `(?{}[tag])`        | Call-out (embedded code)               |
| `(?y)`                      | Enable mode                            |
| `(?-y)`                     | Disable mode                           |
| `(?~)` `(?~\|\|)` `(?~\|)`  | Absent expression (see Oniguruma docs) |
| `(?#...)`                   | Comment                                |
| `(?&1)`                     | Numbered group                         |
| `(?&-1)`                    | (?&+1) Relative back-reference         |
| `(?&name)`                  | Named back-reference                   |

### Replacement strings

If there are two adjacent regular expression literals on one side, then the one on the right is the substitution (template) string for the regular expression on the left.

```dart
val str = 'James Bond'
val newStr = str.sub(`(\w+)\W+(\w+)` `$2, $1`) // 'Bond, James'
val newStr = str.sub(`(\w+)\W+(\w+)` `My name is $2, $0!`)
// 'My name is Bond, James Bond'
```

| Syntax | Meaning |
| --- | --- |
| `$&`, `$0` | Inserts entire match |
| `$1-` | Inserts the portion of the string that precedes the matched substring. |
| `$+` | After matched substring |
| `$1` `$+1` `$-1` | Numbered capture group (negative counts from back) |
| `$<>` | Named capture group |

### Lists

Lists are created by using square brackets `[]`. Each element can also be separated by commas, spaces or newlines.

Inside curly brackets, elements can be any expression as long as the preceding expression is not callable.

```coffee
[1, person.age, 'French Fries']
[1 2 3 true void \word 'hello there']
```

Implicit lists created with curly brackets. The elements are prefixed with a dash, as in YAML. The elements may be separated by commas, spaces or newlines like in a list literal.

```coffee
let my-list = {
  - 32 + 1
  - person.height
  - 'beautiful'
}

one-item = {
  - 'hello'
}
```

<!--
Some text needs to be changed as they are copy-pasted from other sources.
-->
