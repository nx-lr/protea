# [Threenity](https://github.com/noxventura/Threenity-language)

> The programming language for the future.

![banner](./Threenity-banner.svg)

Threenity will be a powerful, multi-platform, multi-paradigm language designed for developers to build, test and deploy software on all three levels of the tech stack, from the frontend to the backend.

```dart
elem Button {
  style button {
    background: transparent
    border-radius: 3px
    border: 2px solid midnightblue
    color: midnightblue
    margin: 0 1em
    padding: 0.25em 1em
  }

  @React def make(count: Int) {
    val times = switch count {
      case 1: "once"
      case 2: "twice"
      case 3: "thrice"
      case n: "$n times"
    }
    val msg = "Click me " ++ times
    return <button>$msg</button>
  }
}
```

### Roadmap

> Update: I have a [Trello](https://trello.com/b/A3NDX7qY/Threenity-programming-language) now!

- **Grammar** (see [`grammar.yaml`](https://github.com/NoxVentura/Threenity-Language/blob/main/grammar.yaml))
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

## Overview

JavaScript is undoubtedly the most popular programming language in the world (second being Python). Almost every device with a browser runs JavaScript, plus it's being ran on servers and on mobile devices. But sometimes the little things in JavaScript could trip us sometimes.

Its weak typing, where operations and processes that would otherwise be impossible in other languages, would pass silently in JavaScript. This is the source of many errors and pitfalls that would introduce unwanted problems later on, and s this has been the subject of either intense criticism and mockery on the Internet.

Then there's the ecosystem. Projects get bloated with hundreds, if not thousands of NPM packages need to be installed in order to work and run smoothly, resulting in tons of dead code, unwanted program complexity and laggy build times.

Many new languages, frameworks and transpilers of existing languages have cropped up over the years, in an attempt to abstract away most of the APIs that otherwise would be a mess to handle with in plain HTML/CSS/JS.

Still, people kept on pushing for new ideas and developing tools for them, incorporating themselves into the language and its ecosystem. The language is growing and evolving with new features, but this would not (yet) change the way we fundamentally think about JavaScript.

## About the Project

Threenity started out as a side project in 2021 as a little dialect of JavaScript aimed at frontend, middle-end and backend development. I took features from a variety of curly-bracket languages, including Scala, Kotlin, Rust and Go, and intermixing it with syntax from Ruby and Python.

Inspired by React, Elm and Mint I decided to extend the language by adding markup, styling, queries and schemas from HTML, CSS, SQL and GraphQL, respectively. That means, components and styles can be freely exchanged, schemas can be exported and used elsewhere, while query expressions can manipulate, verify and send incoming data.

```dart
style body {
  font-family: [SF Pro Text, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif];
  padding: 20px 20px 60px
  max-width: 680px
  margin: 0 auto
}
```

Meanwhile, static type checking, program verification and useful error messages make it easy to catch or remediate errors and suppress potential harmful behaviour.

---

This reference is a work in progress and will be improved over time. See the GitHub repository at https://github.com/NoxVentura/Threenity-Language. Contributions and corrections are welcome.

A lot of my work on Threenity is still experimental and ongoing, so I am sharing this repository so I could get all of my ideas together and perhaps invite some of you to contribute your own. Once I get done with it, we can begin work on the compiler.

### A little disclaimer

As of now, Threenity does not have a language spec. This document will describe Threenity in terms of its textual rendering into source code.

Threenity will be implemented in JavaScript.

#### Text encoding

Threenity only encodes text in UTF-8; other encodings are not supported. Any of the standard line termination sequences can be used, depending on the platform: `\r`, `\n` or `\r\n`.

#### File types

Threenity has only three file types: module (`*.3n`), script (`*.3s`).

The entry point of a Threenity module is defined in the `main` function. This makes it easy to reason about startup behavior.

Module files are the default. This allows easy importing, exporting and accessing other modules. You can put anything into them, such as stylesheets, web components, constants, types and functions.

```dart
/// @file index.3n (default module file)
func main(*args: []Str): Void { /*...*/ }
```

The type annotations or the spread `*args` declaration can be left out, so it can be `func main {}` instead.

Script files do not have a `main` function, just like script files. Script files can import module files, and can run other script files externally.

```dart
print("Hello", params(1))
exit(42)
```

## Syntax

### Some Guidelines

#### Syntax

Like JavaScript, Threenity is a curly-brace language. Code blocks are delimited usually with curly braces.

Semicolons are completely optional though they can be used to separate multiple statements on the same line. The same rules apply to commas in function arguments or collection literals.

If a line ends in an **infix operator**, such as `!in` or `&&`, or otherwise explicitly with `\`, the resultant line is joined. If the next line also begins with an infix operator, it is joined to the previous line.

```dart
x +  // joined
y

x // joined
+ y
```

#### Comments

Threenity supports C-style comments. Comments `/+` and `/++` can be nested.

```dart
// line comment
/* block comment */
/+ nested comment +/
/// line comment
/** block comment */
/++ nested comment +/
```

### Variable bindings

A variable binding, or otherwise a declaration, begin with any one of `var`, `val`, `let` or `const`. All bindings are "scoped" to the block in which they are defined in, and all inner blocks.

```dart
var x = 42
val y: Int = 42
y = 10
```

`let` and `const` bindings can be redeclared, even on the same scope.

```dart
let x = 1
let x = 2 // x is now 2
```

### Assigning multiple variables

There are many ways to assign variables:

```dart
let x, y, z = 1, a = 2
x = 1; y = 2
```

You can also unpack them from regular expressions or data structures:

```dart
let `(?'x'.+)` = 'a' // x == 'a'
let (x, y) = (1, 2) // seq
let [x, y] = [1, 2] // list
let {x, y} = {x: 1, y: 2} // map
let {x, y} = {1, 2} // set
```

### Keywords

The following are all the keywords of the language. Keywords are grouped into four different categories: operators, declarations, modifiers, and control keywords. Some of these keywords, such as `lemma`, `pragma` and all, are reserved for future use and should not be used in this regard.

As for modifiers, they are parsed as keywords before a declaration as they modify them. `pub var x = 1` declares a public variable.

<!--  -->

    in of as is new to til thru by del unset

    var val let const decl def func type object
    class enum module pack struct inter space pragma
    proc proto macro given style elem field
    ext pred data trait lemma iter sub prop

    pub priv prot inline final mut immut ghost early late joint contra
    seal abs intern extern imply exply global local
    async sync stat dyn lazy eager strong weak swap
    vol unsafe unfix bound free opaque trans
    rec gen oper get set post put rem new del patch
    prefix suffix infix binary unary left right

    if un elif elun else then
    for each loop while until when
    with do from
    try throw catch final
    switch match case fail
    race some every done spawn kill lock
    break next redo retry return await label yield goto pass
    import export using
    debug assert where

### Identifiers

Threenity defines an identifier as any sequence of letters, digits, combining marks, underscores (Unicode `Pc`) and dashes (Unicode `Pd`), provided that it starts with a letter or underscore, and does not end in any number of trailing dashes.

The regular expression is:

```js
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

#### Naming conventions

Threenity recognizes four different kinds of naming conventions:

- Leading underscores: `__dirname` or `__main__`
- All-uppercase: `PACKED-DECIMAL` or `T_SL`
- First character uppercase: `IOStream`, `Get-Variable` or `UnityEngine`
- First character lowercase: `split`, `bit-or` or `toString`.

#### Identifier Comparison

Variables are compared using their first character, then comparing further characters case-insensitively and ignoring all non-alphanumeric characters.

This approach, called "partial case insensitivity", makes it easier for developers to use varying conventions without having to worry about the variables' exact spelling.

```dart
func transform(x) =
  x.sub(`\p{Alnum}`g, '').lower()
func cmpIdent(a: Str, b: Str): Bool =
  a[0] == b[0] && transform(a[1:]) == transform(b[1:])
```

All keywords are written in all lowercase. To strop them, add one or more trailing underscores.

Keywords also lose their meaning when they are part of a qualified name, such as a key, property or method.

```dart
type Type = {
  def: Func
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

## Data Types

Threenity has several data types you would expect from a programming language: booleans, numbers, strings, null, collections, regular expressions, functions, among others. All data types are immutable, unless explicitly told otherwise.

### Booleans, Null and Void

The `Null` type is used to represent the absence of a value, similar to `null` in other languages. It only has a single value:

```dart
null
```

Threenity also has `void`, for compatibility purposes. `void` is equal to `null`, but compiles to JavaScript `undefined`. You should use `void` in place of `null`.

### Bool

Bool has only two possible values: `true` and `false`. They are constructed using the following literals:

```dart
true
false
```

When cast into booleans, anything that suggests something is empty, such as 0, the empty string, list, set, etc is `false`. All others yield`true`.

### Numbers

Threenity supports three numeric data types, `Nat`, `Int` and `Float`, all 64-bit. This avoids a lot of complexity associated with numeric precision such as file lengths, Unicode strings or very large lists.

```dart
val integer: Int = 123
val floating: Float = 0x12.345
```

As for signs, the prefix `+` and `-` are not part of the literal.

Numbers are case insensitive. They can contain leading zeroes or underscores for easy readability. Literals can be written in base 2, 4, 6, 8, 10, 12 or 16:

```dart
val base2 = 0b10
val base4 = 0q123
val base6 = 0s12345
val base8 = 0o1234567
val base10 = 0123456789
val base12 = 0z0123456789ab
val base16 = 0x0123456789abcdef
```

Floating-point numbers can allow different kinds of delimiters and separators.

```dart
0.3 // Basic literal (3/10)
3/10 // Fraction
0.~3 // Repeating digits
1^10 // Exponent
1^-10 // Signed exponent
0.1*16^+10 // Scientific notation
1=10 // Rounding
1=+10 // Round up
1=-10 // Round down
1=!10 // Significant figures
```

A floating literal consists of the following:

- A floating-point literal with an integer part, followed by a dot `.`, then an optional fractional  part;
- An optional `~` to indicate repeating digits;
- A base suffix, consisting of `*` and a signed decimal integer;
- An exponent suffix, beginning with `^` and a decimal integer with an optional sign;
- A rounding or precision suffix, which consists of the following:
  - An equal sign;
  - An optional `!` to indicate whether to count digits before the decimal point as part of the final rounding;
  - An optional `+` or `-` to always round up or down respectively, leaving it out to round automatically;
  - A base 10 positive integer.

Multi-base digits can use either alphanumerics or digits. The digits are specified with a formatting modifier, `%`.

```dart

```

Here are some examples of valid numeric literals:

```dart
1    0b10    00010    65_536    1.0    1.01_3    0x0.1    0s0.1^10    0z1/3    0.~3    1*16^10    1=16    0.1=+16    0x0.1~3*16^10=+16:Int    10000b10_100__1000_40     16bca_fe__ba_be      1:f32
```

And invalid numeric literals:

```dart
0b2    1e10    0x1f40g   40s10*10^16 // wrong digits
0&10    0!10 // invalid symbols
1_10_    _1_10    1._10_  // misplaced underscores
```

A type suffix is used after both integers and floats to specify the resultant type of the numeric literal in question, in order to explicitly specify its type.

```dart
assert 1:u is Nat
```

### Strings

A string represents an immutable sequence of UTF-8 characters.

A string is typically created with a string literal enclosing UTF-8 characters either in single (`'`) or double quotes (`"`):

```dart
"hello world"
```

Strings are delimited by matching quotes. Just like in YAML, only double quoted strings can contain escape sequences. Single quoted strings are _raw_, which means that they do not interpret any escape sequences.

```dart
var s1 = 'Single quotes work well for string literals.'
var s2 = "Double quotes work just as well."
```

To escape a single quote, double it.

```dart
var voidDaughter = 'Kai''Sa'
```

In double-quoted strings, an ending backslash joins the next line _without spaces_.

```dart
assert "hello \
        world" == "hello world"
```

Double quoted string literals can contain the following escape sequences, and all of them are case-insensitive:

```dart
"\p" // platform specific newline
"\r" // carriage return
"\n" // newline
"\f" // form feed
"\t" // horizontal tab
"\v" // vertical tab
"\a" // alert (bell)
"\b" // backspace
"\e" // escape
"\s" // space

"\cA" // control character from A (#U+01) to Z (#U+1A)
```

Threenity also supports escapes in even bases up to 16, excluding 14.

```dart
"\b100001111111111111111"
"\q10033333333"
"\s35513531"
"\o4177777"
"\d1114111" // or "\1114111"
"\z4588A7"
"\x10FFFF" // or "\u10fffff"
"\j{\x{x}}" // LaTeX expressions
```

The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces. Only `\j` requires curly brackets.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

#### Block strings

String literals can also be delimited with at least three single or double quotes in a row, provided they end with at least that many quotes.

Escaping rules for single- and double-quoted strings also apply.

```dart
'''
  "stringified string"
'''
""" "stringified string""""
```

produces:

    "stringified string"

All Unicode spacing characters before the first and the last non-spacing characters are discarded.

All indentation is determined based on the column of the first line of text, discarding any whitespace before that column.

Newlines are normalized to `\p` depending on the platform.

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

### String Manipulation

Threenity comes with several string manipulation tactics to make manipulating, formatting and serialising strings easier.

#### String Interpolation

All forms of strings, can enable embedding of expressions. Expressions are prefixed with the dollar and surrounded by curly brackets.

If the expression is an identifier or qualified name, then the brackets can be left out. Use the `\$` escape sequence if you wish to express the dollar sign itself.

```dart
"x is $x, in hex $x.toHex, and x+8 is ${x + 8}"
```

is syntax sugar for:

```dart
"x is " ++ x ++ ", in hex " ++ x.toHex ++ ", and x+8 is " ++ (x + 8)
```

The hash sign takes several arguments, as placeholders, passed to the `format` method, should you want to use it as a template string.

```dart
'#0%s is #1 meters tall'.format('James', 1.9)
// "James is 1.9 meters tall"
```

#### Format Directives

Threenity has an extensive string formatting mini-language for converting, transforming, transliterating and serialising objects in strings, with a syntax derived from Command Prompt.

They are composed of the following parts:

- A command: `%command` denoted by a percentage sign
- An optional range of switches, each denoted by a slash `/switch`,
- Their optional values, separated by a colon: `/sw:value`.

```dart
const Everest = {height: 8848}
"Mount Everest is $Everest.height%f/unit:'m'/long tall."
// "Mount Everest is 8,848 meters tall."
```

#### Macro Strings

Macro strings embed domain-specific constructions. Macro calls use the construction `name'string'`, i.e. a prefixed string literal, or a function call with its own argument.

A macro function is defined with the keyword `macro`, and typically have four arguments which can be combined in any order: the passed `%values`, placeholder `%arguments`, formatting `%metadata` and intermediate `%strings`.

```dart
macro template(
  &strings: []Str, %values; &keys: []Any
): Str = |&values|: Str {
  val dict = values[-1] ?? {}
  val values = (for val key in keys:
    if key is Int: values[key]
    else: dict[key]).toList()
  return strings.weave(keys).join('')
}

val t1Closure = template"${0}${1}${0}!"
assert t1Closure("Y", "A") == "YAY!"
val t2Closure = template"${0} ${"foo"}!"
assert t2Closure("Hello", {foo: "World"}) == "Hello World!"
```

### Regular expressions

Threenity's regular expressions are delimited using backticks like Go. Free spacing, quoting and comments make it very easy to understand and work with regular expressions.

Threenity uses the [Oniguruma](https://github.com/kkos/oniguruma) regular expression flavor by default, the same regex engine that powers Ruby and PHP7, adding its own extensions.

```dart
`(?1 %)
(?2
  (?<ident> \b \c\i* \b)
  (
    (?<switch>
      / \g<ident> |
      / \g<ident> : (?<val>
        (?<bracket> // Brackets (recursive)
          \( (?:[^'"`(){}\[\]]+ | \g<string> | \g<bracket>)*\) |
          \[ (?:[^'"`(){}\[\]]+ | \g<string> | \g<bracket>)*\] |
          \{ (?:[^'"`(){}\[\]]+ | \g<string> | \g<bracket>)*\}
        ) |
        (?<string> // Strings
          (?<multi> "'"{3,} | "\""{3,} | "`"{3,}) .* \g<multi>
          (?<double> ["`]) [^\\.]* \g<double> |
          (?<single> '"') (?: [^'] | '"'{2})* \g<single>
        ) |
        // Compound identifier
        ([?!]?\. | [?!:]:)? \c \i* \b
      )
    )
  )*
)`n
```

Interpolation and formatting also applies but the interpolated result is usually escaped so to prevent generating invalid regular expressions.

#### Replacement strings

If there are two adjacent regular expression literals on one side, then the one on the right is the substitution (template) string for the regular expression on the left.

```dart
val str = 'James Bond'
val newStr = str.sub(`(\w+)\W+(\w+)` `$2, $1`) // 'Bond, James'
val newStr = str.sub(`(\w+)\W+(\w+)` `My name is $2, $0!`)
// 'My name is Bond, James Bond'
```

```dart
`((()))` `
$& $0   ${/* Entire match */}
$-      ${/* Before matched substring */}
$+      ${/* After matched substring */}
$1      ${/* Numbered capture group */}
$+1     ${/* Relative group */}
$<name> ${/* Named capture group */}
`
```

[oniguruma]: https://github.com/kkos/oniguruma

The following section serves as a summary to the regular expression syntax of Threenity, as well as some of the more unique features that Threenity has over other regex flavors.

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

## Collections

Threenity comes with two different collection literals: lists `[]`, and maps `{:}`. All collection literals are immutable.

A `Mut` prefix on its type or a hash `#` right before the literal makes them mutable, and allows you to mutate them directly.

### Lists

Lists are indexed collections of values, are surrounded by square brackets and each element is separated by commas.

The type signature of a list is `List[Value]` or `[]T`, where `T` is the type of all the elements in the list.

```dart
var x: []Int = [10, 20, 30]
var y = ['a', 'b', 'c'] // is []Str

[] // an empty list
```

An explicit type can be specified by immediately following the closing angle with a type encased in curly brackets, without a space.

This overwrites the inferred type and can be used for example to create an array that holds only some types initially but can accept other types later.

```dart
var z = [10, '20', '30']{Str|Int} // with type casting operator
```

Often the compiler will infer a list to have a non-nullable type. If the list might store `null` values, then you will need to explicitly cast it.

```dart
[1, 2, 3] // cannot store null
[1, 2, 3, null]{?Nat} // can store null
```

The empty list is denoted using the special syntax `[]`. Often you will specify a type - for example `[]{Str}` is an empty list of strings. If a type is not specified, then the empty list is an `[]{Any}`.

Lists are converted into maps using this approach:

### Maps

Maps are collections of key-value pairs, with each pair separated with a colon between the key and the value. Each pair is separated with a comma.

```dart
var x: {Int : Str} = {1: 'one', 2: 'two'}
var y = {3: 'three', 4: 'four'} // is []Str
var z = {10, '20', '30'}{Str : Int}
```

The type signature of a map is `Map[Key, Value]` or literally as `{Key : Value}`, with the colon spaced out on both sides.

If the key is not a special identifier, and is placed directly before the colon without spacing, it will be parsed as a string, with no need for quoting. Any other value is parsed as an expression.

```dart
x = { int: 1, 2: 2 }
x.(:int)
```

Note that maps may not be typed with a nullable key. If you are using type inference, you might need to explicitly type a map which will store null:

```dart
{1: 'one', 2: 'two'} // cannot store null
{1: 'one', 2: 'two'}{Int : ?Str} // now it can
```

The empty map is denoted using the special syntax `{}`. Often you will specify a type - for example `{}{Str}` is an empty map of strings. If a type is not specified, then the empty map evaluates to `{}{Any}`.

If a key and value are the same, then they may not be repeated.

```dart

{1, 2, int} == {1: 1, 2: 2, int: int}
```

### Sets

A set is a special type of map in which the keys map to their own values.

## Expressions

Threenity's expression syntax is very similar to C, PHP, Java, Elixir, Haskell and others. Threenity has built-in operators:

### Operators

The tables below define all of Threenity's operators, and you can define your own.

### Custom Operators

In Threenity, operators are methods. Any method with a single parameter can be used as an infix operator. For example, `+` can be called with dot-notation:

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
val a = 1
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

Binary operators include interfix and infix operators. Interfix operators are evaluated first, from left to right.

```dart
def []?.[] (a: Any, b: Any): Any = ?a ? void : a[b]
val a = {1: {c: 'd'}}
assert a?.b?.c == void
assert a?.1?.c == 'd'
```

#### Suffix Operators

Suffix operators are evaluated from left to right, have a single argument and are composed of only one character. They bind strongly and are evaluated after binary operators.

```dart
def []+ (a: Num): Num = a + 1
def []- (a: Num): Num = a - 1
val a = 1
assert a++ == (a+)+ == 3
assert a-- == (a-)- == -1
```

#### Prefix Operators

Prefix operators function the same way as suffix operators except they are evaluated from right to left. They are evaluated after suffix operators.

```dart
def -[] (a: Num): Num = a.neg()
val a = 1000
assert --a == -(-a) == a
```

#### Unary Operators

A unary modifier defines both suffix and prefix operators as valid operations on its only argument.

```dart
def ![]! (x: Bool): Bool = !x
val x = true
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
val message = do {
  val part1 = "hello"
  val part2 = "world"
  part1 ++ " " ++ part2
}
// `part1` and `part2` not accessible here!
```

The value of the last line of a scope is implicitly returned.

`if`, `while` and functions all use the same block scoping mechanism.

```dart
if displayGreeting {
  val message = "Enjoying the docs so far?"
  print(message)
}
// `message` not accessible here!
```

Instead of a block, whenever there's a single statement, use the colon `:` instead of an opening curly brace.

```dart
val message = do: 3 + 4
```

But not both (opening curly brace is a set literal):

```dart
val message = do: { 3 + 4 }
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

The complete Threenity `if`/`else if`/`else` expression looks like this:

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

A great thing about the Threenity conditional is that it always returns. You can ignore the result as we did in the previous examples, but a more common approach, especially in functional programming.

You can assign the result to a variable:

```dart
val minValue = if a < b: a else: b
```

Anyway, Threenity has two ternary conditional operators, which are just syntax sugar for the above if you're not keen on using `if`. That last one, is syntax sugar for `un`...`else`.

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

val i = 1
loop {
  print("i is now $i")
  if i > 100: break
  i *= 2
}
assert i == 128
```

#### Loop keywords

Threenity has three keywords relating to loops:

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

#### Patterns

Primitive values are checked for equality.

```dart
switch (x: ?(Bool|Float)) {
  case true: 'true'
  case false: 'false'
  case null: 'null'
  case infin: 'infin'
  case nan: 'nan'
}
```

Variables can be created from patterns. In the previous examples, the `_` variable acted as a catch-all. You could instead create a variable without a leading underscore to use it later in the block.

```dart
switch f() {
  case 0: "zero"
  case 1: "one"
  case k: "another number " ++ string_of_int(k)
}
```

Note that if a variable with the same name already exists in the scope of the switch, then it will be shadowed by the variable declared in the pattern inside the code after the:. The original variable is not used in the pattern. Variables in patterns are declarations of new variables, not references to existing ones.

```dart
val k = 60;
val x = 3;

val y = switch x {
  case 0: "zero"
  case 1: "one"
  case k: "another number " ++ string_of_int(k)
}
```

Patterns can also include variants and data held by variant tags. For example, matching against an optional type:

```dart
val x: ?Int = Some(3)
val value = switch x {
  case null: 0
  case ?v: v
}
```

Patterns can include other data structures, like lists, sets, maps, and any nested combination of those structures.

```dart
type R = {x: int, y: int}
type T = A[[Str, Int]] | B[R] | C[#[]Int] | D[[]R]
val x = D([{x: 2, y: 1.2}]);

switch x : T {
  case A(['hi', num]): num
  case B({x, y: 1.2}): x
  case C(x): X
  case C(#[2, 3, x]): x
  case D([]): 2
  case D([{x: x1, _}, {x: x2, _}, *_]): x1 + x2
  case: 42
}
```

`as` can be used to assign part of a pattern to a variable. This is convenient if you need to match on a certain value, but need to reference something that encompasses that value.

```dart
switch x {
  case v as A[['hi', num]]: f(v)
  case r as B[{x: _, y: 1.2}]: g(r)
  case D([r as {x: _, y: 1.2}, *_]): g(r)
  case: 42
}
```

Pass a tuple/list if you want to match multiple inputs.

```dart
switch [k1, k2] {
  case [1, "a"]: 0
  case [_, "b"]: 1
  case: 3
}
```

A single block of code can be run for multiple patterns by listing them together. Type expressions, beginning with a spaced out `:`, can also be used to list multiple possibilities.

```dart
val items: []Int = [1, 2, 3, 4]

switch (items) {
  case [1, 2], [3, 4]: "is [1, 2] or [3, 4]"
  case [1, 2, 3, 4]: "is [1, 2, 3, 4]"
  case [5, : 6 | 7, *_]: "starts with 5, then has 6 or 7"
  case: ""
}
```

Matching on strings, regular expressions and functions allow you to extract those data from them.

```dart
val sample: Str = '10-a'
switch sample {
  case '${x: Int}-dir': exec(x)
  case `(?<x>\d+)-dir`: exec(x)
  case x if x ~= `^\d+-dir$`: exec(x)
}
```

Patterns can also be used outside of switch statements to "unpack" data whenever variables are declared.

```dart
val data_ = [1, ["red", true]];
val [a, c: [b, _]] = data_;
/* a is 1, b is "red", c is ("red", true) */

val f = |p| x + y + p.x + p.y;
```

`if` or `un` can add extra conditions to patterns. The condition must be satisfied in order to execute the pattern's code, otherwise the pattern is skipped.

```dart
val p = {x: 2, y: 2}
val z = 3
val k = switch p {
  case ({x, y: 0}) if x == z: 0
  case ({x, y: 0}) if f(x): 1
  case ({x: 2, y}) if y < 10: 2
  case ({x: 2, y}) if y < 2: 3 /* never executed, but no warning */
  case _: 4
}
/* k is 2 */
```

---

### References

[wtfjs]: https://github.com/denysdovhan/wtfjs/
[go]: https://golang.org/
[kotlin]: https://kotlinlang.org/
[rust]: https://www.rust-lang.org/
[rescript]: https://rescript-lang.org/
[scala]: https://www.scala-lang.org/
[swift]: https://swift.org/
[typescript]: https://www.typescriptlang.org/
[flix]: https://flix.dev/
[reasonml]: https://reasonml.github.io/
[mint]: https://mint-lang.com/
[fantom]: https://fantom.org/
[dart]: https://dart.dev/
[react]: https://reactjs.org/
