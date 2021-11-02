# Saga

> Your dream programming language.

Saga is a multi-platform general-purpose programming language containing everything you need for building, testing and deploying applications, systems and libraries across the entire tech stack. Combining object-oriented and functional programming in one concise, high-level language, allowing you to write simple, fast and quality type safe code while leveraging huge ecosystems of libraries.

```dart
using React

style GlobalStyle {
  style $body {
    color: ${|{theme}| theme == "purple"
      ? "purple"
      : "white"}
  }
}

const Section = style section {
  margin: 3rem auto;
  max-width: 600px;
}

export main elem Layout({ children }) {
  <React.Fragment>
    <GlobalStyle theme="purple" />
    $children
  </React.Fragment>
}
```

### Overview

JavaScript is undoubtedly the most popular programming language in the world, with a large ecosystem, and most of all, a great community. And with Node.JS allowing full-stack applications to be developed with a single programming language, has in turn contributed to its success. But at the same time, we all know the language itself is drowned in many imperfections, and has many complicated or weird quirks that can sometimes throw us off. It's quite apparent that the language was drafted in ten days, yet it still became the technology that impacts every person on the planet. It's a language that's evolving, constantly adapting to suit the needs of its developers.

The ecosystem is equally as frightening. Overly bloated projects and too many choices on which framework and built tool to use. Yet, people still brave the pain and develop awesome applications in it, pushing it to its limits. Also, JS does not perform as well compared to rival languages and the domains they serve in. While it is normally used as an alternative, JS is not designed to be used to develop apps that could fit those workloads. That's why JS is not used as a tool to build machine learning systems or full blown 3D games than their equivalents in C++/C#, Rust or Python.

### About the Project

Saga (formerly Trinity) aims to serve the same domains as JavaScript, but exceeds JavaScript in terms of execution and compilation speed, and memory management, so to deliver significant performance that rivals that of other languages like Java and C#. With that, Saga aims to provide a great developer experience while allowing to write safe, readable and maintainable code.

It has a syntax that is similar to JavaScript and other curly-brace languages such as Rust, Go, Swift and Kotlin, fully embraces the functional and object-oriented paradigms, is fully extensible, and contains a lot of powerful language constructs, some specific to frontend and backend development (and everything in between).

Saga started out as a side project in June 2021 and has since grown from there. Here's the full list of features I aim for Saga to cover:

- familiar JS-like syntax
- built-in JSX, CSS-in-JS and GraphQL
- JSDoc documentation support
- language-integrated query (LINQ)
- DSL strings
- keyword-based syntax
- concurrency, asynchrony and error-handling constructs
- pattern matching
- type annotations and aliases
- uniform function call syntax
- (im)mutable data structures
- Perl-compatible regular expressions
- string formatting
- Unicode named characters
- algebraic data types
- advanced type inference
- JIT and AOT compilation
- extensible numbers and operators
- portable runtime
- multiple targets: JS, C#, Python, JVM and LLVM/Swift
- opaque types and type aliases
- full tail call elimination
- human friendly errors
- a Rust compiler
- a core standard library
- an interactive REPL
- comprehensive editor support

## An Introduction

Script files contain a shebang at the beginning of the file. They can use modules, but also act as script files.

A typical Saga project would contain this file structure:

```
my-app/
|- lib/ -> all installed modules
|- src/ -> backend codes
|- app/ -> frontend codes
|- .gitignore
|- index.saga
|- package.json
|- README.saga
|- modules.saga
```

The entry point of a program is defined in the `main` function. `args` is a specific variable used to define the program arguments.

```dart
func main(*args: []str): void { /* code here */ }
```

### Syntax

```dart
// Saga is a curly bracket language
switch (x) {
  case true: f("t")
  case false: g("f")
};

// Semicolons are optional
var a = 1; var b = 2

// Commas too
var list = [
  1
  2
  3
]

// Special cases when a line is joined
x + y
+ z +
a

x + y + z + a
```

### Comments

Comments with a plus sign can be nested.

```dart
// line comment
/* block comment */
/+ nested comment +/
/// line documentation comment
/** block documentation comment */
/++ nested documentation comment +/
```

### Variables

All variable bindings are block scoped.

```dart
var x = 42 // mutable
val y: Int = 42 // immutable
x = 10 // works
y = 11 // error
let x = 42 // mutable
const y: Int = 42 // immutable

x := 1 // shorthand for `var x = 1`

val message = do {
  val part1 = "hello"
  val part2 = "world"
  part1 ++ " " ++ part2
}
// `part1` and `part2` not accessible

// Declaring and assigning
val x, y, z
x = y = z = 1

val x = 1, y = 2

// Unpacking assignment
val [x, y] = [1, 2]
print(x, y) // 1, 2
```

### Keywords

Expression keywords:

```
in of as is new to til thru by del unset
```

Declaration keywords:

```
var val let const decl def func type object
class enum module pack struct inter space pragma
proc proto macro given style elem field
ext pred data trait lemma iter sub prop
```

Control keywords:

```
if un elif elun else then
for each loop while until when
with do from ref
try throw catch final
switch match case fail
race some every done spawn kill lock
break next redo retry return await label yield goto pass
import export using
debug assert where
```

These are contextual keywords used to modify declarations:

```
pub priv prot inline final mut immut ghost early late joint contra
seal abs intern extern imply exply global local
async sync stat dyn lazy eager strong weak swap
vol unsafe unfix bound free opaque trans
rec gen oper get set post put rem new del patch
prefix suffix infix binary unary left right
```

### Identifiers

An identifier can contain any sequence of letters, digits, marks,underscores, and dashes, provided it starts with a letter or underscore, and does not end in any number of dashes.

```js
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

Identifiers are compared using an approach known as partial case-insensitivity.

```dart
func cmpIdent(a: str, b: str): bool {
  let a1
  if (a1 = a.sub(`\P{Alnum}`g, '')) ~= `\p{Upper}+`:
    a1 == b.sub(`\P{Alnum}`g, '')
  else:
    a[0] == b[0] -> (
      a[1:].sub(`\P{Alnum}`g, '').lower() ==
      b[1:].sub(`\P{Alnum}`g, '').lower()
    )
}
```

To "strop" keywords, append a trailing underscore.

```dart
type Type = { def_: Func }
var var_ = 42, val_ = 8
const assert_ = var_ + val_ == 50
assert assert_
```

All identifiers are normalized using the above function.

### Numbers

Null and void (JS `undefined`):

```dart
assert null !== void
assert null == void
```

Null and void are their own types.

Boolean values (type `bool`):

```dart
true
false
```

Three numeric data types: `Nat`, `Int` and `Float`, all are 64-bit.

```dart
var int: Int = 123
var nat: Nat = 123:u
var float: Float = 123.0

/* Different radixes */
val base2 = 0b10
val base4 = 0q123
val base6 = 0s12345
val base8 = 0o1234567
val base10 = 0123456789
val base12 = 0z0123456789ab
val base16 = 0x0123456789abcdef

/* For floats only: */
0.3 // Basic literal (3/10)
3/10 // Fraction
0.~3 // Repeating digits
1^10 // Exponent
1^-10 // Signed exponent
0.1*16^+10 // Scientific notation
1=10 // Round to 10 decimal places
1=+10 // Round up 10 d.p
1=-10 // Round down 10 d.p
1=!10 // Round to 10 significant figures
1=!+10 // Round up to 10 s.f
1=!-10 // Round down to 10 s.f

// Parts of a float: all optional
/* fraction => repeating => exponent => rounding => suffix */
/* denominator => exponent => rounding => suffix */

// Type suffix: with colon
assert 1:u is Nat

// Multi-base literals
val base100 = 100b0_99_99
assert base100 == 9999

// With custom digits
const base17Digits = '0123456789abcdefg'
val base17 = 17b0123456789abcdefg%num/digits:(base17Digits)
```

### Strings

```dart
'all single quoted strings are verbatim'
'this \ backslash also does not need to be escaped'
'same for the " double quote'
'to express one single quote, use '' two of them'

"here we can use predefined escape sequences like \t \n \b"
"or generic escape sequences \x0b \u0041 \U00000041"
"the double quote \" needs to be escaped"
"just like the \\ backslash"
"the single quote ' and other characters can be escaped,
but they are completely optional"
" more quotes because why not"""""
```

Double quoted predefined escapes are:

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

// Multi-base escapes
"\b100001111111111111111"
"\q10033333333"
"\s35513531"
"\o4177777"
"\d1114111" // or "\1114111"
"\z4588A7"
"\x10FFFF" // or "\u10fffff"

// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 69}" == "\72\69\76\76\79"

// LaTeX expressions:
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

Multi-quoted strings are defined with three or more quotes of the same type and end in the same opening sequence.

```dart
// All non-spacing characters are discarded
// between the text and the quotes
'''We're fine'''
""""We're fine""""

// Strings can end in more than the opening number of quotes
"""x""""

// Indentation is preserved or discarded
// based on the first line of text
'''
"stringified
  string"
''' ==
"""
  "stringified
    string"
"""

// Escaping rules apply as before
'''
  no escapes needed!
'''
"""
  \\escape\ with\ me
"""
```

### String interpolation

`$`, `#` or `%` begins an interpolation expression, placeholder or formatting directive. This applies to all strings and regular expressions.

Use a backslash to escape them in double quoted strings or regular expressions, i.e. `\$`, `\#` or `\%`. Meanwhile, double them in single quoted strings.

```dart
"simple $variable"
"$object_.property or $deeply.nested[property]"
"$type_{casting}"
"$function() or $method.call(with_, args)"
"${expression} if all else fails"
"keywords $then are not stropped"
```

### String formatting

The syntax for string formatting derives from Command Prompt.

```dart
// A formatting directive example
"%type/switch/switch:'value'/switch:(expression)"

// Types of values
"%x/x:#10ffff numeric (positive only)"
"%x/color:blue CSS property"
"%x/x:other variable"
"%x/x:'' string"
"%x/x:`` regex"
"%x/x:("") expression"
"%x/x:[] array"
"%x/x:{} object"

// To-do: conversion between Python f-strings and this
```

### String placeholder variables

Use the special format method.

```dart
"#named"
"#%keyed"
"#?optional"
"#0 positive (zero-indexed"
"#-1 negative (from end)"
"#*spread (from an object)"

// Usage
"#1%s".format(0, "hello world") // => 'hello world'
"#&int%i/b:16/p:'0x'".format({int: 42}) // => '0x2A'
"#name%i/b:16/p:'0x'".format(name = 42) // => '0x2A'
```

### Regular expressions

Regular expressions function like strings in every regard.

The Oniguruma flavor is used. Here's a summary:

```dart
`
/** Meta-characters and basic syntax elements */
\ /* Escape */
| /* Alternate/ordered choice */
() /* Capturing group */
[] /* Character class (can be nested) */
[^] [!] /* Negated char-class */
[:] /* POSIX or Unicode query */
$a ${} /* Interpolation */
#a #{} /* Placeholders */
{,} /* Quantifier */
"" '' /* Quoting */
\g<1> \g'1' \g"1" /* Subroutine */
\1 \k<1> \k'1' \k"1" /* Back-reference */

/** Characters, along with their negated forms in uppercase */
\w \W /* Word character */ [\pL\pM\pPc\pNd]
\s \S /* Whitespace */ [\t\n\v\f\r] \pZ
\d \D /* Decimal digit */ [0-9] \pNd
\h \H /* Hexadecimal digit */ [\da-f]
\u \U /* Uppercase letter */ [A-Z] \pLu
\l \L /* Lowercase letter */ [a-z] \pLl
\q \Q /* Combining marks */ \pM
\p \P /* Punctuation */ \pP
\j \J /* Numeric character */ \pN
\c \C /* Leading identifier char */ [\pL\pPc]
\i \I /* Trailing identifier char */ [\w\pPd]
\R /* Platform-specific line feed */ \r&\n
\X /* Unicode text segment */
\O /* Any character */

/** Escapes, along with their negated forms */
\a ([\A]) /* Alert character */
[\b] ([\B]) /* Backspace character */
\e (\E) /* Escape character */
\f (\F) /* Form feed */
\n (\N) /* Newline */
\r ([\R]) /* Carriage return */
\t (\T) /* Horizontal tab */
\v (\V) /* Vertical tab */
\cA (\CA) /* Control character (from \x01 to \x1a */
[\mA] ([\MA]) /* Meta-control character */

/** Quantifiers */
? /* Zero or one times */
+ /* One or many times */
* /* Zero or many times */
{5} /* Exactly 5 times */
{5,} /* At least 5 times */
{,5} /* Up to 5 times */
{3,5} /* Between 3 and 5 times */
{,} /* 0 or many times */

/* Modifiers */
? /* Reluctant: returns shortest possible match */
+ /* Possessive: no backtracking */
* /* Greedy: returns longest possible match */

/* Join shorthands */
a&b /* => */ (a|b|ab)
a&?b/* => */  a(ba)?
a&+b /* => */ a(ba)+
a&*b /* => */ (a(ba)*)?

/** Groups */
() /* Numbered capturing group */
(?:) /* Non-capturing group */
(?<x>) (?'x') (?"x") /* Named capturing group */
(?<|x>) /* Balancing group */
(?<x|x>) /* Balancing pair */
(?=) /* Positive look-ahead */
(?!) /* Negative look-ahead */
(?<=) /* Positive look-behind */
(?<!) /* Negative look-behind */
(?>) /* Atomic group (no backtracking) */
(?()) /* Conditional branching */
(?|) /* ...with alternatives */
(?/) /* Shortest match */
(?/=) /* Longest match */
(?*) /* Embedded code */
(?{}) (?{}[tag]) /* Call-out (embedded code) */
(?y) /* Enable mode */
(?-y) /* Disable mode */
(?~) (?~||) (?~|) /* Absent expression (see Oniguruma docs) */
(?#...) /* Comment */
(?&1) /* Numbered group */
(?&-1) (?&+1) /* Relative back-reference */
(?&name) /* Named back-reference */

/** Anchors & Assertions */
^ /* Start of line */
$ /* Ending of line */
\A /* Start of string */
\z /* End of string */
\Z /* Not end of string */
\b /* Word boundary */
\B /* Not word boundary */
\m /* Line boundary */
\M /* Not line boundary */
\y /* Text segment boundary */
\Y /* Not text segment boundary */
\G /* Match boundary */
\K /* Keep text out of the match */

/** Pre-defined character classes */
\p{alpha} /* letters */
\p{alnum} /* alphanumerics */
\p{ascii} /* ASCII characters */
\p{blank} /* non-spacing characters */
\p{cntrl} /* control characters */
\p{dash} /* dash punctuation */
\p{delim} /* combining punctuation */
\p{digit} /* decimal digits */
\p{graph} /* visible character */
\p{lower} /* lowercase letters */
\p{mark} /* diacritical marks */
\p{number} /* Unicode numbers */
\p{print} /* printable */
\p{priv} /* private use */
\p{punct} /* all punctuation */
\p{space} /* spacing characters */
\p{symbol} /* symbol characters */
\p{title} /* title-case letters */
\p{upper} /* uppercase letters */
\p{word} /* word characters */
\p{xdigit} /* hexadecimal digits */

/** Character classes */
[x||x] /* Union (lowest precedence) */
[x^^x] /* Symmetric difference */
[x&&x] /* Intersection */
[x~~x] /* Difference */
[x-y] /* Range (highest precedence) */

/** Unicode properties */
\p{in Block} \p{!in Block} /* Block */
\p{is Script} \p{!is Script} /* Script or boolean property */
\p{Script} /* Shorthand property */

/* Properties are checked in the order:
`General_Category`, `Script`, `Block`, binary property */

/* Logical operators `&&` `||` `^^` `!` also work */
\p{p=v} \p{p==v} /* Property equals value */
\p{p!=v} \P{p=v} /* Does not equal */
\p{p^=v} /* Begins with but does not equal */
\p{p$=v} /* Ends with but does not equal */
\p{p*=v} /* Contains but does not equal */
\p{p|=v} /* Begins with or equals */
\p{p&=v} /* Ends with or equals */
\p{p~=v} /* Contains or equals */
`
```
