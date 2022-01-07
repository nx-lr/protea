# Trinity

```coffee
module Button
  style button
    color: palevioletred
    border: 2px solid palevioletred
    border-radius: 3px
    padding: 0.5em 1em
    font-size: 1em
    font-weight: bold

  fn make(&count: int)
    let times = match count then
      case 1 then "once"
      case 2 then "twice"
      fail "$count times"
    let msg = "Click me $times"
    markup <button $msg
      x y z
```

## Introduction

Trinity is an experimental open source programming language based on a rather peculiar idea: to build apps of the future with the power of the web. It combines concepts from mature languages like Python, ML, Ruby and Haskell, while still preserving much of the features you know and love from modern JavaScript.

```coffee
# Assignment
let number = 42
let opposite = true
let regex = `\"(\d+)\":\s*\n\s*name:\s+([\-.\w]+)` `$1: {name: $2}`

# Conditions
number = if opposite: -42 else number

# Functions
let square = |x| -> x * x

# Arrays
let list = [1 2 3 4 5]

# Maps
let math = {
  root:   Math.sqrt
  square: square
  cube:   |x| x * square x
}

# Splats:
let race = |winner, *runners|
  print winner runners

# Existence
if ?elvis: alert "I knew it!"

# Array comprehensions
let cubes = [for y in list: x y z]

# LINQ
cubes = from x in 1 to 100
  select $ math.cube x
```

---

## Design Goals

Trinity's core idea is to formulate an ideal language to build the web, with careful consideration of the existing JavaScript ecosystem at hand. JavaScript clearly is lacking in terms of both design and performance, because of how it was raised, and this could be a problem for the future of the web.

The goal of Trinity is to provide a language that is both expressive and performant, while still giving access to the features you know and love from modern JavaScript, and its growing ecosystem, without worrying about implementation or performance up ahead.

<small>

Trinity is currently a work-in-progress by a single person and the language is still in flux. The language is still in its early stages of conceptualisation and experimentation. This document mainly serves as a guide to the language's design and implementation.

Feel free to contribute to the project by submitting issues to this repository. If you're interested in contributing to the project, tag me on GitHub.

</small>

---

## Roadmap

- Jan 2022: First version of syntax complete

---

## Syntax Overview

> This document is an informal guide to the syntax of Trinity, meant as an aid for future programmers and authors of Trinity's implementations. This is not a tutorial or complete reference, but rather a guide you consult if you have some questions.
>
> This reference is structured so it can be read from top to bottom. Later sections use concepts and syntax previously introduced. Familiarity with JavaScript (or TypeScript if better) is assumed.

<small>

This language reference, like the language it describes, is a work in progress and will be improved over time (GitHub link). Contributions and corrections are welcome!

</small>

## A note on syntax

Like all programming languages, Trinity is a language in which programs are not text. That means, the real truth is not written in its textual form, but more as an abstract syntax tree (AST).

This document describes Trinity in terms of its default and (currently) only syntax: its written form as source code.

## Top-level declarations

A top-level declaration appears on the top-level or outermost scope of a file. It can be one of the following:

- A declaration, like `let x = 42`, or `struct type Optional a = None | Some a`.
- An `import` clause, like `import .base` or `import math.sqrt`.

### Declarations

Declarations are defined with a single keyword, such as `class`, `fn` or `let`, followed by a name and a value. They can also be supplied with optional modifiers, such as `pub` or `mut` which modify the declaration.

#### Variables

A variable declaration (or "variable binding") consists of the `let` keyword, a binding expression, and a definition, as well as an optional type signature. All definitions are immutable by default.

For example:

```coffee
let x = 42
let y: int = 42
let timesTwo: |nat| nat = |x| x * 2
```

`let` can be supplied with a modifier, such as `mut`, which marks the declaration as mutable.

The colon in the above example is a type signature. The signature `|nat| nat` means that the function `timesTwo` takes a natural number and returns a natural number.

The `=` sign splits the definition into a left-hand side, which is/are the term(s) being defined, and the right-hand side, which is the definition of the term(s).

#### Functions

A function declaration is typically of the form `fn f(a: ta, b: tb...): t` where:

- `f` is the name of the function being defined
- `a`, `b`... are the parameters of the function
- `ta`, `tb` are the types of the parameters
- `t` is the return type of the function.

What follows can be a block, or an assignment expression similar to a declaration. The block is the body of the function, and the assignment expression is the return value of the function.

The names of the parameters and function are bound as local variables in the expression on the right-hand side (also known as the body of the function). When the function is called, the parameter names are bound to any arguments passed in the call.

If the function is called with too many arguments, the excess arguments are ignored. If the function is called with too few arguments or no arguments, the missing arguments are bound to `void`.

The expression or block comprising the right-hand side can refer to the name given to the definition. In that case, it’s a recursive definition. For example:

```coffee
fn sumUpTo(n: nat): nat =
  if n < 2: n
  else n + sumUpTo $ drop n 1
```

If there is no function name `f` in the expression, it is considered an anonymous function.

### Type definitions

A user-defined data type is introduced with the `type` keyword. The `=` sign splits the definition into a left-hand side and a right-hand side, much like term definitions.

```coffee
type intPair = int * int
type intTriple = int * int * int
```

### Class definitions

### Enum definitions

### Structure definitions

### Module definitions

### Import clauses

### Markup definitions

###

### Style definitions

### Operator definitions

Operator identifiers are valid names for Trinity definitions, but the syntax for defining them is slightly different. For example, we could define a binary operator `**`:

```coffee
infix fn ** (x, y) = Float.pow x y
```

Or we could define it using infix notation:

```coffee
x ** y = Float.pow x y
```

If we want to give the operator a qualified name, we put the operator inside the parentheses:

```coffee
ns.(**) $ x y = Float.pow x y
```

Or if defining it infix:

```coffee
x ns.(**) y = Float.pow x y
```

## Structure

### Indentation

Like Scala 3, YAML and Haskell, Trinity is a "hybrid" language in which you can use curly brackets and indentation to structure and organize your code. though indentation is used only for the purpose of readability.

```coffee
rec fn List.has(item: any): bool
  match this
    case [] { false }
    case [a, *rest] { a == item && rest.has item }
```

Though you can also use `then` or a right-spaced colon if a code block is expected after a statement (such as `if` or `while`).

```coffee
rec fn List.has(item: any): bool
  match this
    case []: false
    case [a, *rest]: a == item && rest.has item
```

### Semicolons

In other languages, inserting semicolons to separate statements is required. In JavaScript, this is not necessary, but it is completely buggy.

Trinity is a newline-sensitive language. This means that statements are usually not separated by semicolons. The compiler will automatically insert semicolons at the end of the line unless the line ends with an operator (or the next line begins with one).

### Commas

The rules for parsing commas are the same as semicolons, except they are used to separate expressions, not necessarily statements.

### Parentheses

You can pass arguments to functions Haskell style - parentheses here have nothing to do with function calls.

```coffee
print sys.inspect obj
print(sys.inspect, obj)

func (x + 3) x - 3
func(x + 3, x) - 3
```

You can call functions with named arguments by using the `/` syntax. Named arguments have no order in functions, so you can call them in any order.

```coffee
print(x, name, &sep = "\n")
print x name /sep "\n"
```

### Keywords

Keywords are all lowercase and are special tokens in Trinity. They are used to denote special constructs, such as functions, classes, and control structures, and are distinguished from identifiers.

Because of how identifiers are compared, you can use any number of leading underscores to escape a keyword to turn it into an identifier.

```coffee
assert _assert = null
```

The following are considered keywords:

    in of as is new
    to til thru by del
    unset ref and or xor not
    let fn proc type
    class data enum module
    iter macro struct object
    trait style elem prop markup
    go defer do from where with
    if elif else then def
    for each loop while
    try throw catch after
    match case goto pass fail
    break next redo retry
    return yield await label
    use show hide route
    debug assert check

Keywords become identifiers when part of a qualified name, such as `x.for` or `y::loop`.

### Identifiers

We define an "underscore" as a Unicode combining punctuation character. This includes the Unicode character `_`.

An identifier can contain any sequences of Unicode letters, decimal digits, combining marks, underscores, and dashes, provided it starts with a letter or an underscore, and does not end in any number of dashes.

```ts
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

Variables are compared case-insensitively until the first non-lowercase character. All underscores and dashes are ignored. This means you can use varying conventions in your program without having to worry about name collisions or case conventions.

```coffee
fn normalize(ident: str): str =
  ret = ident[`[^\pNd\pL]` ``]
  ret[`\b.*(?!\pL)`] + ret[`\pLl.*\b`].lower!

fn cmpIdent(a: str, b: str): bool =
  normalize a == normalize b
```

### Comments

Comments start with the `#` character followed by a space. The space is compulsory. All following text up to the end of the line is considered a comment. They can be on their own line or follow after a statement.

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

## Expressions

### Variables

Trinity has two ways to declare variables - `var` to declare a mutable variable and `val` to declare an immutable one.

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
  let message = "Enjoying the docs so far?"
  print message
# `message` not accessible here!
```

`:=` updates variables outside scopes, and destructively modifies any data structure or class.

## Built-in data types

Trinity comes with literals for many familiar and new primitive types such as `str`, `int`, `float`, `bool`, `list`, `set`, `map` and more, such as `fn`, `sym` and `regex`.

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

### Integers and Floats

There are four integer types: `int`, `nat` which are signed/unsigned 64-bit integers, and their arbitrary-precision `big` counterparts.

An integer literal is a sequence of digits and underscores, optionally followed by a type suffix. All numbers are case-insensitive except their suffixes which are ordinary identifiers.

```coffee
1 # int
1 # int
1u # nat
1u # int
1u # int
1u # int

18446744073709551616 # bigint
18_446_744_073_709_551_616 # bigint
```

Underscores and leading zeroes can be used to make numbers more readable, and both are ignored. The following are all equivalent:

Binary, octal and hexadecimal literals are also supported.

```coffee
decimal = 11256099
hex = 0xABC123
octal = 0o52740443
binary = 0b101010111100000100100011
```

### Rationals

There are four rational types: `float` which is a IEEE binary64 type, and `rat`, which is a pair of one signed and one unsigned integer. Both have their arbitrary-precision `big` counterparts. Rationals have a compulsory `r` suffix while floats do not.

Floating point numbers are inherently rational.

A floating point literal is an optional + or - sign, followed by a sequence of numbers or underscores, followed by a dot, followed by numbers or underscores, followed by an optional exponent suffix, followed by an optional type suffix. If no suffix is present, the literal's type is Float64.

```coffee
1.0   # float
1.0f # float
1f   # float
1r   # rat

1.0n   # bigfloat
1.0fn # bigfloat
1fn   # bigrat
1rn   # bigrat
```

Binary, hexadecimal and octal floats are also supported, though you would use the `p` suffix for exponents, and the base is 2, rather than 10.

```coffee
decimal = 11256099e+14
hex = 0xABC123p-40
octal = 0o52740443p-40
binary = 0b101010111100000100100011p-40
```

### Strings

A string literal is enclosed using either single or double quotes. Double quotes support escape sequences, while single quotes do not. Strings can span multiple lines by default.

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

Most of the escape sequences in JavaScript and other languages are also supported in Trinity.

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
```

The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```coffee
# "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

Any other character following a backslash is interpreted as the character itself.

Double quoted literals allow you to insert multiple multilingual, math, symbol or other Unicode characters as LaTeX-style expressions without having to type them yourself.

```coffee
"\j{\emoji:smile}" # => 😀
"\j{\frac{\sum{i=1}^{n}\left(\frac{1}{i}\right)}{n}}"
```

In single quotes, meta-characters such as `'`, `$`, `%` and `#` are doubled in order to be escaped (literal). In double quotes, you can use the backslash to escape them.

#### Interpolation

Both types of strings support interpolation with `${}`, which is a way to embed variables. The braces can be omitted if the expression is only:

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `[][1]`
- a function call: `fn()`
- and any combination of the like

By default, all embedded expressions are converted to strings by passing it through the `str` method and concatenating the resulting string. You can override this behaviour by using the construct `ident'string'` instead.

```coffee
let greeting = "Hello $name!"
```

#### Formatting directives

Format directives are used to transform a value into a string using the built-in `format` method. Each directive begins with a percent sign, and then a series of flags separated by pipe characters, and an optional value after the colon.

```coffee
"Hello ${"world"}"
"Hello ${"world"}%upper" # => "Hello WORLD"
"${1234567890}%sep:','" # => "1,234,567,890"
"Percentage correct answers: ${correct / total}%dp:2|unit:'%'"
```

### Template strings

You can create template strings by using the `#` character to mark placeholders in a string. The arguments can be named, as in `#name`, or positional, as in `#0` or `#-1` (negative indices count from the last).

```coffee
let greeting = "Hello #0!"
greeting "World" # => "Hello World!"
```

You can also spread arguments into the string by using the `*` operator, and mark them as optional by using the `?` operator.

#### Backslash strings

Strings can be written with a preceding backslash instead of quotes. Backslash strings can't contain `, ; ] ) }` or whitespace.

```coffee
\word
func \word, \word
func(word)
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

### Regular expressions

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

#### Replacement strings

If there are two adjacent regular expression literals on one side, then the one on the right is the substitution (template) string for the regular expression on the left.

```coffee
let str = 'James Bond'
let newStr = str.sub(`(\w+)\W+(\w+)` `$2, $1`) # 'Bond, James'
let newStr = str.sub(`(\w+)\W+(\w+)` `My name is $2, $0!`)
# 'My name is Bond, James Bond'
```

| Syntax | Meaning |
| --- | --- |
| `$&`, `$0` | Inserts entire match |
| `$1-` | Inserts the portion of the string that precedes the matched substring. |
| `$+` | After matched substring |
| `$1` `$+1` `$-1` | Numbered capture group (negative counts from back) |
| `$<>` | Named capture group |

### Lists

A list stores values in an ordered list, _usually_ of the same type. The same value can appear in a list multiple times at different positions. List contents are usually delimited by commas or newlines, and are surrounded by angle brackets `[]`.

```coffee
let list = ['hello', 'world', 'how are you']
```

The type of a list is written in full as `list[type]`, where `type` is the type of values the list is allowed to store. You can also write the type of a list in shorthand form as `[]type`.

Although the two forms are functionally identical, the shorthand form is preferred and is used throughout this guide when referring to the type of a list.

```coffee
let list1: []int = [10, 20, 30]
let list2 = ['a', 'b', 'c'] # is []str
[] # an empty list
```

An explicit type can be specified by immediately following the closing angle with a type encased in curly brackets, without a space.

This overwrites the inferred type and can be used for example to create a list that holds only some types initially but can accept other types later.

```coffee
let z = [10, '20', '30']{str | int} # with type casting operator
```

The compiler will infer a list to have a non-nullable type. If the list might store `null` values, then you will need to explicitly cast it.

```coffee
[1, 2, 3] # cannot store null
[1, 2, 3, null]{?int} # can store null
```

The empty list is denoted using the special syntax `[]`. Often you will specify a type - for example `[]{Str}` is an empty list of strings. If a type is not specified, then the empty list is an `[]{Any}`.

A multidimensional list can have many prefix `[]` in them.

```coffee
let a: [][]int = [[0, 2, 0], [0, 0, 0]]
```

You can prefix a hash sign (`#`) to a list or map literal to turn it into a mutable list or map.

```coffee
let a: #[]#[]#[]int = mutlist [[[0] * 2] * 3] * 2
a[0][1][1] = 2
print(a) # [[[0, 0], [0, 2], [0, 0]], [[0, 0], [0, 0], [0, 0]]]
```

#### Indexing Lists

Retrieve a value from the list by using subscript syntax, passing the index of the value you want to retrieve within square brackets immediately after the name of the list:

```coffee
firstItem = shoppingList[0]
# firstItem is equal to "Eggs"
```

The first item in the list has an index of 0, not 1. The second is 1, not 2, and so on. Lists in Nyx are always zero-indexed.

You can use subscript syntax to change an existing value at a given index, provided the list is mutable:

```coffee
shoppingList[0] = 'Six eggs'
# the first item in the list is now equal to "Six eggs" rather than "Eggs"
```

When you use subscript syntax, you can specify any integer, including negative numbers. Indices can also count backward --- the index of the last element is `-1`, the second last `-2`, and so on. This works beyond &pm;`len(list)`.

So given a list of length `5`,

| Subscript | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Resultant Index | 3 | 4 | 0 | 1 | 2 | 3 | 4 | 0 | 1 | 2 | 3 | 4 | 0 | 1 | 2 |

The result would always evaluate to **modulo** the length of the list (`a[k] == a[k %% len(a)]`). Using an invalid type will return `void`.

You can also use subscript syntax to change a range of values at once, discarding any element once the end of the spliced list is reached, and reallocating deleted and empty entries.

The following example replaces `"Chocolate Spread"`, `"Cheese"`, and `"Butter"` with `"Bananas"`, `"Apples"` and `"Bananas"`.

```coffee
shoppingList[4:6] = ['Bananas', 'Apples']
# shoppingList now contains 7 items
```

#### List comprehensions

List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition.

```coffee
let a = [for x in 'abracadabra': if x !in 'abc': x]
a == ['r', 'd', 'r']
```

For example, assume we want to create a list of squares, like:

```coffee
let squares = #[] # mutable list is prefixed with a hash
for x in 1 to 1: squares.push(x ** 2)
squares == [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Note that this creates (or overwrites) a variable named x that still exists after the loop completes. We can calculate the list of squares without any side effects using:

```coffee
let squares = list(0 til 10).map(** 2)
```

or, equivalently:

```coffee
let squares = [for x in 0 til 10: x**2]
```

A list comprehension consists of a `for` expression encased between the literal and the expression in question. The result would be a new list resulting from evaluating the expression in the context of the clauses inside it.

For example, this comprehension combines the elements of two lists if they are not equal:

```coffee
[for x in [1, 2, 3], y in [3, 1, 4]: if x != y: (x, y)]
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

which is equivalent to:

```coffee
let combs = #[]
for x in [1, 2, 3], y in [3, 1, 4]
  if x != y
    combs.append((x, y))

[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

If the expression is a tuple (e.g. the (x, y) in the previous example), it must be parenthesized.

```coffee
let vec = [-4, -2, 0, 2, 4]
# create a new list with the values doubled
[for x in vec: x * 2] # [-8, -4, 0, 4, 8]
# filter the list to exclude negative numbers
[for x in vec: if x >= 0: x] # [0, 2, 4]
# apply a function to all the elements
[for x in vec: abs] # [4, 2, 0, 2, 4]
# flatten a list using a list-comp with two 'for'
vec = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[for x in vec: for num in x: num] # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

List comprehensions can contain complex expressions and nested functions:

```coffee
[for i in 1 til 6: str $ round $ Math::Pi, i]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

## Sets

Trinity also includes a data type for sets. A set is an unordered collection with no duplicate elements. Basic uses include membership testing and eliminating duplicate entries.

Set objects also support mathematical operations like union `|`, intersection `&`, difference `-`, and symmetric difference `^`. Curly braces or the `set()` function can be used to create sets.

The type of a set is `set[type]` or `{}set`.

Note: to create an empty set you have to use `set()`, not `{}`; the latter creates an empty map, a data structure that we discuss in the next section.

Here is a brief demonstration:

```coffee
let basket: {}str = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
basket == {'orange', 'banana', 'pear', 'apple'}
'orange' in basket # fast membership testing
'crabgrass' !in basket

let a = set('abracadabra') # Create sets from iterables
let b = set('alacazam')

a == {'a', 'r', 'b', 'c', 'd'}
a - b == {'r', 'd', 'b'}
a | b == {'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
a & b == {'a', 'c'}
a ^ b == {'r', 'd', 'b', 'm', 'z', 'l'}
```

Similarly to list comprehensions, set comprehensions are also supported:

```coffee
let a = {for x in 'abracadabra': if x !in 'abc': x}
a == {'r', 'd'}
```

## Maps

Another useful data type built into Trinity is the map. Maps are sometimes found in other languages as "hashmaps", "tables", "objects" or "associative arrays". Unlike sequences, which are indexed by a range of numbers, dictionaries are indexed by keys, which can be any value including strings, symbols, numbers, etc but **NOT any mutable object**, since those can be modified in place through various operations.

It is best to think of a map as a set of `key: value` pairs, with the requirement that the keys are unique (within one dictionary). A pair of braces creates an empty dictionary: `{}`. Placing a comma-separated list of `key: value` pairs within the braces adds initial `key: value` pairs to the dictionary; this is also the way dictionaries are serialised on output.

```coffee
let map1: {str : int} = {one: 1, two: 2, three: 3}
let map2 = {1: 2, 2: 4, 3: 6, 4: 8} # inferred as {int : int}
{} # an empty map
```

If a key is a keyword or a valid single identifier and placed right before the colon, then it is an unquoted string which is normalized to its base form. Any other expression is parsed normally.

```coffee
let x = {one: 1, 2.2: {2.2: 2}, '3': 3, 8 / 2: 4}
```

The main operations on a map are storing a value with some key and extracting the value with the key with `::` or `[]` (not `.`). You can manipulate objects using function or method calls, like `.keys()` or `.values()`.

Again, just like the keys of an object, map keys can be accessed without quotes if they are a simple identifier. Any other value can be passed without quotes if they are a single literal.

```coffee
x::one == x::'one' == x::one___
x?:(:one) == null # symbol

x::one == 1
x::2.2::2.2 == 2
x::'3' == 3
x::(8 / 2) == x[8 / 2] == 4
```

`?:` or `?.[]` is like `::`, except that instead of causing an error if a reference is nullish (`null` or `void`), the expression short-circuits with a return value of `null`. The optional accessor operator, `?:`, enables you to read the value of a property located deep within a chain of connected maps without having to check that each reference in the chain is valid.

```coffee
let adventurer = {
  name: 'Alice',
  cat: { name: 'Dinah' }
}

let dogName = adventurer::dog?:name
dogName # null
```

`!:` or `!.[]` is the non-null assertion operator which assures that the previous map is not `null` before accessing its property. This would raise a compile time exception if the map along this chain is `null`, but in runtime is treated the same as `::`.

```coffee
let catName = adventurer!:cat!:name
catName # 'Dinah'
```

### Spreading

The spread operator (prefix `*`) is a useful and convenient syntax for expanding iterable objects into function arguments, tuples, or other iterables.

```coffee
# Function arguments
fn multiply(a, b) = a * b
let numbers = [3, 5]
multiply(*numbers) == 15

# List literals
let numbers = [1, 2, 3]
let new_numbers = [0, *numbers, 4]
new_numbers == [0, 1, 2, 3, 4]

# Set literals
let a = set(*'abracadabra')
a == {'a', 'r', 'b', 'c', 'd'}

# Map literals
let test_obj = { foo: 'bar' }
{ *test_obj, foo2: 'bar2' } == {foo: 'bar', foo2: 'bar2'}
```

<!--
Some text needs to be changed as they are copy-pasted from other sources.
-->

### Regular Expression Syntax

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
