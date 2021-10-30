# Trinity

> The new way to build advanced applications.

Trinity will be a powerful multi-platform and multi-paradigm programming language designed for developers to build, test and deploy software and libraries for and on all levels of the tech stack.

```dart
elem Button {
  style button {
    background: midnightblue
    border: 2px solid midnightblue
    color: white
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

### Overview

JavaScript is undoubtedly the most used programming language in the world, with all sorts of devices running it. However there are many things that would frustrate us as developers: weak typing, overly bloated projects and decision fatigue. Yet, people still develop awesome applications in it.

Trinity aims to serve the same domains as JavaScript, but with a slightly cleaner syntax, and with features specific to frontend and backend development. It is a compiler and a framework combined (i.e. a domain-specific language) to provide great developer experience while allowing to write safe, readable and maintainable code.

### About the Project

Trinity was born as a side project in July this year. I took features from my favorite languages. I sifted through documentation, wrote some of my own, and implemented many of my own features by hacking regexes. Over the months, I extended Trinity with its own dialect of CSS, HTML, SQL and GraphQL all within the same language.

I wanted the language to serve the same domains as JavaScript, yet still allowing developers to apply their own language patterns and paradigms throughout their codebase. Trinity also comes with other useful but important features such as string formatting, advanced regular expressions, types, and program validation features. As of now, Threenity does not have a specification as this project is still ongoing.

## An Introduction

Trinity has only two file types: module `.3n` or script `.3s` files. A typical Trinity project would contain this file structure:

```
my-app/
|- lib/ -- all installed modules
|- src/ -- backend codes
|- app/ -- frontend codes
| |- index.3n -- main file (default)
├─ .gitignore
|- package.3n
├─ package.json
├─ README.md
```

Modules form the core of every Trinity application. Modules can be accessed, installed, loaded, imported and exported to and from other modules. You can put anything into a module file, such as styles, components, constants, types, functions and classes.

The entry point of a module, or a project, is the `main` process. All code runs from `main`.

```dart
proc main {}
```

The `main` process can accept arguments:

```dart
proc main(*args: []Str): Void { /* code here */ }
```

Script files do not have a main function, similar to other languages. They can import and use modules, and can call and open other script files.

## Syntax

### The Basics

#### Syntax

Like JavaScript, Trinity is a curly-bracket language. Almost everything is delimited with curly brackets.

```dart
style keyframe(my-move) {
  @from {background: red} @to {background: blue}
}
```

Semicolons are completely optional though they can be used to separate multiple statements on the same line. The same rule applies to commas in function calls or collections.

```dart
def make(count: Int) {
  val times = switch count {
    case 1: "once"
    case 2: "twice"
    case 3: "thrice"
    case n: "$n times"
  }
  val msg = "Click me " ++ times
  return <button>$msg</button>
}
```

If a line ends in an infix operator, meaning an operator separated with spaces on either end, the resultant line is joined. If the next line also begins in one, it is joined to the previous.

```dart
x + // joined
y

x // joined
+ y
```

#### Comments

Threenity supports C-style comments. Comments with a plus sign can be nested.

```dart
// line comment
/* block comment */
/+ nested comment +/
/// line comment
/** block comment */
/++ nested comment +/
```

#### Variables

A variable declaration can begin with `var` or `val` (`let` or `const` also can too). All bindings are block scoped, which means they are accessible only within the block they are defined in.

```dart
var x = 42 // mutable variable
val y: Int = 42 // immutable variable
x = 10; y = 11 // throws

do {
  val x = 1 // 1
  print(x)
}

print(x) // 10
```

You can declare multiple variables without having to repeat the `var` or `val` keyword. Each variable is separated with a comma.

```dart
val x, y, z
x = y = z = 1 // chained assignment
```

You can also unpack them from regular expressions or collections.

```dart
let [x, y] = [1, 2]
print(x, y) // 1, 2
```

### Keywords

Keywords are grouped into four categories: operators, declarations, modifiers and control keywords. Some of these keywords are reserved for future use and should never be used as ordinary identifiers at all.

Modifiers only come before declarations. They can be used as regular identifiers everywhere else.

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

An identifier in Trinity is any sequence of letters, digits, combining marks, underscores and dashes, provided they start with a letter or underscore, and does not end with a dash.

The regular expression is:

```js
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

Trinity recognises four different naming conventions: `_leading_underscores`, `ALL_UPPERCASE`, `FirstCharacterUpperCase`, and `first_character_lower_case`.

VAriables are compared using their first character, then comparing further characters case-insensitively and completely ignoring any non-alphanumeric characters.

```dart
func cmpIdent(a: Str, b: Str): Bool {
  let a1
  if (a1 = a.sub(`\P{Alnum}`g, '')) ~= `\p{Upper}+`:
    a1 == b.sub(`\P{Alnum}`g, '');
  else:
    a[0] == b[0] -> (
      a[1:].sub(`\P{Alnum}`g, '') ==
      b[1:].sub(`\P{Alnum}`g, '')
    );
}
```

This rather unorthodox approach is called partial insensitivity and allows devs to use any convention they like without having to worry about the exact spelling of an identifier.

All keywords are written in all-lowercase, so to strop them, add one or more trailing underscores. Keywords also are stropped when they are part of the inner members of a qualified name, such as a symbol, key, property or method.

```dart
type Type = { def: |x| Func }
var var_ = 42, val_ = 8
const assert = var_ + val_ == 50
assert assert_
```

## Data Types

Trinity has several data types: booleans, numbers, strings, collections, regular expressions, arrays, sets, maps, functions and more. All data types are constant and immutable, which means they cannot be directly changed.

### Null

Null is used to represent the absence of a value. Same for void. It is recommended that you use void instead of null, as that would compile to JavaScript's undefined.

### Bool

Bool has only two possible values: `true` and `false`. They are constructed using the following literals:

```dart
true
false
```

When cast into booleans, anything that suggests something is empty, such as `null`, `void`, the empty string, list, set, map, etc is `false`. All others yield `true`.

### Nat, Int and Float

Trinity supports three numeric data types: `Nat`, `Int` and `Float`, all of which are 64-bit. This avoids a lot of complexity associated with numeric precision such as file lengths, Unicode or large lists.

```dart
var int: Int = 123
var nat: Nat = 123:u
var float: Float = 123.0
```

As for signs, the prefix `+` or `-` is not part of the literal.

All numeric literals can contain leading 0s or underscores. They can be written in base 2, 4, 6, 8, 10, 12 or 16.

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
1=10 // Rounding to 10 decimal places
1=+10 // Round up 10 d.p
1=-10 // Round down 10 d.p
1=!10 // Round to 10 significant figures
1=!+10 // Round up to 10 s.f
1=!-10 // Round down to 10 s.f
```

The fractional, repeating, exponent, rounding and type-suffix part appear in that specific order, and are all optional.

Multi-base digits can use either alphanumerics or digits. The digits are specified with a formatting modifier, `%`.

```dart
val base17 = 17b0123456789abcdefg%num/digits:'0123456789abcdefg'
```

You can use a type suffix to cast a numeric literal into another type.

```dart
assert 1:u is Nat
```

### Strings

A string literal is enclosed between single or double quotes on both sides. Just like in YAML, double quoted strings support escape sequences (beginning with a backslash), while single quoted strings are _verbatim_ and do not interpret any escapes.

```dart
var s1 = 'Single quotes work well for string literals.'
var s2 = "Double quotes work just as well."
```

To escape a single quote in a single-quoted string, double it.

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

Trinity also supports escapes in many bases.

```dart
"\b100001111111111111111"
"\q10033333333"
"\s35513531"
"\o4177777"
"\d1114111" // or "\1114111"
"\z4588A7"
"\x10FFFF" // or "\u10fffff"
```

The same escapes with curly brackets allow you to insert many code points inside, with each character or code unit separated by spaces.

```dart
// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"
```

The special `\j{}` syntax (curly braces compulsory) allow you to insert LaTeX expressions.

```dart
"\j{
  \documentclass{article}
  \title{Cartesian closed categories and the price of eggs}
  \author{Jane Doe}
  \date{September 1994}
  \begin{document}
    \maketitle
    Hello world!
  \end{document}
}"
```

#### Block strings

Trinity supports multi-quoted string literals. Here, a string can be delimited with at least three quote characters in a row, provided they end with at least that many quotes.

All Unicode spacing characters before the first and last non-space characters are are discarded. All newlines are normalized to `\p` depending on the platform.

Indentation is determined by the number of spaces between the opening quotes and the first non-space character.

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

Escaping rules for single- and double-quoted strings also apply.

```dart
'''
  no escapes!
'''
"""
  \\escape\ with\ me
"""
```

### String interpolation

Expressions can be interpolated inside strings as they are evaluated. To do so, surround your expressions with `${}`. You can leave out the curly brackets if your expression is a simple variable, a compound identifier, or a function or method call.

```dart
"I have $apples apples"
"I have ${apples + bananas} fruits"
"I have $apples%d apples"
```
