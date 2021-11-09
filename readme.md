# Saga

> It's like JavaScript, but harder, better, faster and stronger.

Saga is a multi-platform general-purpose programming language containing everything you need for building, testing and deploying applications, systems and libraries across the entire tech stack. Combining object-oriented and functional programming in one concise, high-level language, allowing you to write simple, fast and quality type safe code while leveraging huge ecosystems of libraries.

```dart
module Button {
  @React pub elem make(%count: int) {
    let times = switch count {
      case 1: "once"
      case 2: "twice"
      case 3: "$n%d times"
    }
    let msg = "Click me $times%s"
    <button>$msg</button>
  }
}
```

### Overview

JavaScript is undoubtedly the most popular language in the world. It's got a large ecosystem, and even better, a great community. And with the Node.JS allowing full-stack apps to be developed in a single programming language further paved the way to its overall success. And today, it's a language that's evolving, constantly adapting to suit the needs of its users. Eventually, _any application that can be written in JavaScript will be written in JavaScript_ (Atwood's Law).

But the language is drowned in many imperfections, foot-guns and gotchas, and has many complicated parts that most of the time could throw us off. The ecosystem is also as frightening, with project folders gigabytes in size even for a simple, small application. And perhaps, a new framework gets released ever so often. While JS is normally used as an alternative than their native counterparts, it's not designed to be used as a "workhorse" language that could solve every single conceivable problem.

Still, time and time again, developers keep pushing on JavaScript to its limits. While JavaScript could be used to write such an application, you won't see machine learning or data analytics systems or even full blown 3D games built only with JavaScript, rather they would rather stick to the old way and develop with various lower-level languages to bring about the performance they desire.

### About the Project

Saga aims to be a language with a syntax very familiar to JavaScript and React developers, including those who use tools such as Gatsby, Next.JS or Styled Components.

Saga is a compiler and a framework combined and has features specific to client and server-side app development: built-in styles, markup, schemas, routing and queries.

It is designed to express common programming patterns in a concise, elegant and type-safe way, integrating features from different object-oriented and functional languages.

### Features

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
- block regular expressions
- extensible numeric literals
- string formatting
- Unicode named characters
- algebraic data types
- advanced type inference
- JIT and AOT compilation
- portable runtime
- multiple targets: JS, C#, Python, JVM and LLVM/Swift
- opaque types and type aliases
- full tail call elimination
- human friendly errors
- a Rust compiler
- a core standard library
- an interactive REPL
- comprehensive editor support

## Overview

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

Like JavaScript, Saga is a curly-brace language. Code blocks are delimited usually with curly braces.

Semicolons are completely optional though they can be used to separate multiple statements on the same line. The same rules apply to commas in function arguments or collection literals.

If a line ends in an **infix operator**, such as `!in` or `&&`, or otherwise explicitly with `\`, the resultant line is joined. If the next line also begins with an infix operator, it is joined to the previous line.

```dart
x in  // joined
y

x // joined
in y
```

### Comments

Saga supports C-style comments. Comments `/+` and `/++` can be nested.

```dart
// line comment
/* block comment */
/+ nested comment +/
/// line documentation comment
/** block documentation comment */
/++ nested documentation comment +/
```

### Variables

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

Operator keywords are operators used to

```
in of as is new to til thru by del unset ref
```

Declaration keywords, which are keywords used to declare program entities such as variables, functions, methods and properties.

```
var val let const decl def func type object
class enum module pack struct inter space pragma
proc proto macro given style elem field
ext pred data trait lemma iter sub prop
```

Control keywords are keywords used to create control flow statements such as conditionals, loops and error-handling statements.

```
if lest elif elest else then
for each loop while until when
with do from ref
try throw catch final
settle race some every done
spawn kill accept reject
break next redo retry return await label yield goto pass
import export using
debug assert where
```

Contextual keywords only are parsed as keywords when they appear before a declaration keyword.

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

### Booleans, Null and Void

The `Null` type is used to represent the absence of a value, similar to `null` in other languages. It only has a single value:

```dart
null
```

Threenity also has `void`, for compatibility purposes. `void` is equal to `null`, but compiles to JavaScript `undefined`. You should use `void` in place of `null`.

Booleans have only two possible values: `true` and `false`. They are constructed using the following literals:

```dart
true
false
```

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
1=10 // Rounding to 10 decimal places
1=+10 // Round up 10 decimal places
1=-10 // Round down 10 decimal places
1=!10 // Round to 10 significant figures
1=!+10 // Round up to 10 significant figures
1=!-10 // Round down to 10 significant figures
```

The fractional, repeating, exponent, rounding and type-suffix part appear in that specific order, though are all optional.

Multi-base digits can use either alphanumerics or digits. The digits are specified with a formatting modifier, `%`.

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

Strings are created using single or double quotes.

```dart
'all single quoted strings are verbatim'
'this \ backslash also does not need to be escaped'
'same for the " double quote'
'to express one single quote, use '' two of them'

"here we can use predefined escape sequences like \t \n \b"
"or generic escape sequences \x0b \u0041 \U000041"
"the double quote \" needs to be escaped"
"just like the \\ backslash"
"the single quote ' and other characters can be escaped,
but they are completely optional"
" more quotes because why not"""""
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

// Multi-base escapes
"\b100001111111111111111"
"\q10033333333"
"\s35513531"
"\o4177777"
"\d1114111" // or "\1114111"
"\z4588A7"
"\x10FFFF" // or "\u10fffff"

// Multi code-point escapes
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

### String interpolation (`$`)

All forms of strings can allow interpolation. Expressions are always prefixed with the dollar sign and may be surrounded with curly brackets.

If the expression is an identifier or qualified name, a nested property or a function or method call, then the brackets can be left out. Use the `\$` escape sequence if you wish to express the dollar sign itself.

```dart
"simple $variable"
"$object_.property or $deeply.nested[property]"
"$type_{casting}"
"$a.'string'.property"
"$function() or $method.call(with_, args)"
"${expression} if all else fails"
"keywords $then are not stropped"

'$1' '$%' // don't need escaping
'$$a' == "\$a"
```

### String formatting

Saga comes built-in with a string formatting mini-language for converting, serializing and transforming objects inside strings, with a clearer to read syntax. They are composed of the following parts:

- A type: `%type` denoted by a percentage sign
- An optional range of switches, each denoted by a slash `/switch`,
- Their optional values, separated by a colon: `/sw:value`.

```dart
"%type/switch/switch:'value'/switch:(expression)"

// Types of values
"%x/x:#10ffff numeric (positive only)"
"%x/color:blue CSS property"
"%x/x:other variable"
"%x/x:'' string"
"%x/x:`` regex"
"%x/x:() expression"
"%x/x:[] array"
"%x/x:{} dictionary"

'%1' '%$' // don't need escaping when next to a symbol or number
'%a' == "\%a"

const Everest = {height: 8848}
"Mount Everest is $Everest.height%f/unit:'m'/long tall."
// "Mount Everest is 8,848 meters tall."
```

### String placeholder variables

String placeholders are used to create template strings from named, keyed or positional arguments. They produce strings from their arguments by calling its `format` method with the specified arguments.

```dart
"#named" "#?optional"
"#&keyed" "#%optional"
"#0 positive (zero-indexed)"
"#-1 negative (from end)"
"#*spread (from an object)"

'#@' '#*' // don't need escaping when next to a number
'%a' == "\%a"

// Usage
"#1%s".format(0, "hello world") // => 'hello world'
"#&int%i/b:16/p:'0x'".format({int: 42}) // => '0x2A'
"#name%i/b:16/p:'0x'".format(name = 42) // => '0x2A'
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

### Regular expressions

Regular expressions function like strings, except delimited using backticks. In an effort to make them more readable, Saga's regexes allow for free spacing and embedded comments.

Saga uses the [Oniguruma](https://github.com/kkos/oniguruma/blob/master/doc/RE) regular expression flavor by default, the same regex engine that powers Ruby and PHP7, though with a few extensions.

````dart
`\b{wb}(fee|fie|foe|fum)\b{wb}`x
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] `]`x
`
  \/\* // Match the opening delimiter.
  .*?  // Match a minimal number of characters.
  \*\/ // Match the closing delimiter.
`

// Multi-quoted regex
```(?:[a-zA-Z_]|(?:\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}))*(?=:)```
````

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
`` `
$& $0   ${/* Entire match */}
$-      ${/* Before matched substring */}
$+      ${/* After matched substring */}
$1      ${/* Numbered capture group */}
$+1     ${/* Relative group */}
$<name> ${/* Named capture group */}
`
```

### Collections

Saga comes with two basic literals: list and map. Both collections are homogenous and immutable.

- Lists are ordered collections of literals.
- Maps are collections of key-value pairs where each item is mapped to a distinct key.

Sets are map literals with the values repeated.

```dart
var list1: []int = [10, 20, 30]
var list2 = ['a', 'b', 'c'] // is []str
[] // an empty list

val map1: {str : int} = {one: 1, two: 2, three: 3}
val map2 = {1: 2, 2: 4, 3: 6, 4: 8} // inferred as {int : int}
{} // an empty map
```

An explicit type can be specified by immediately following the closing angle with a type encased in curly brackets, without a space.

This overwrites the inferred type and can be used for example to create an array that holds only some types initially but can accept other types later.

```dart
var z = [10, '20', '30']{Str | Int} // with type casting operator
```

Often the compiler will infer a list to have a non-nullable type. If the list might store `null` values, then you will need to explicitly cast it.

```dart
[1, 2, 3] // cannot store null
[1, 2, 3, null]{?Nat} // can store null
```

The empty list is denoted using the special syntax `[]`. Often you will specify a type - for example `[]{Str}` is an empty list of strings. If a type is not specified, then the empty list is an `[]{Any}`.

If a key is a valid identifier, even if it is a keyword, and is placed right before the colon, then it need not be quoted. The same goes for types. Any other value is parsed as an expression. Unquoted identifiers are subject to normalisation.

```dart
x = {int: 1, 2.2: 2, '3': 3, x * 2 + 4: 4}
assert x.int == 1
assert x.2.2 == 1
assert x.'3' == 3
assert x[x * 2 + 4] = 1
```

Map literals with single elements are allowed, with the keys and the values repeated.

```dart
assert ({1: 1, 2: 2}) == {1, 2}
```

## Control Statements

Saga has a range of control statements which are also expressions. They form the core of the language.

### Basic closures

Bindings can be scoped through the do-block: `do {}`. The value of the last line of a closure is immediately returned, lest specified with `return`.

```dart
let message = do {
  let part1 = "hello"
  let part2 = "world"
  part1 ++ " " ++ part2
}
// `part1` and `part2` not accessible here!
```

`if`, `while`, and all code blocks use this same mechanism.

```dart
if displayGreeting {
  let message = "Enjoying the docs so far?"
  print(message)
}
// `message` not accessible here!
```

Instead of a block, whenever there's a single statement, you can use a colon `:` instead of an opening curly brace, provided the colon is separated by a space only on its right.

```dart
let message = do: 3 + 4
let message = do : 3 + 4 // type annotation
```

But not both (opening curly brace is a map literal).

```dart
let message = do: { 3 + 4 }
assert message is map
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

Replacing `if` with `lest` and `elif` with `elest` for the opposite effect, meaning they would execute if their predicates return false.

```dart
lest test1 { // lest; if not
  doX()
} elest test2 { // else lest; else if not
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

### For-loops

In its most simple use, a `for` or `each` loop can be used to iterate over the elements in a collection. For example, given an array of integers:

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

### While Loops

While loops execute its body code block while its condition is true.

```dart
while i < 10 {
  text += "The number is $i"
  i += 1
}
```

`repeat-while` is a variant of `while`. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

```dart
repeat {
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

repeat {
  text += "The number is $i"
  i += 1
} until i == 10

repeat: text += "The number is $i" && i += 1 until i == 10
```

Repeat blocks run indefinitely.

```dart
repeat:
  print("hello world forever!")

let i = 1
repeat {
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

### Switch or match

With a `match` or `switch` expression you write a number of case statements that you use to match possible values.

`match`/`switch` expressions are nice because they also return values, so rather than directly printing a string as in that example, you can assign the string result to a new value:

```dart
// i is an integer
val dayName = switch i {
  case 1: "Monday"
  case 2: "Tuesday"
  case 3: "Wednesday"
  case 4: "Thursday"
  case 5: "Friday"
  case 6: "Saturday"
  case 7: "Sunday"
  fail: "Invalid day"
}
```

`match`/`switch` expressions let you handle multiple cases.

To demonstrate this, imagine that you want to evaluate "boolean equality" like PHP would: `0`, `''` or `'0'` evaluates to `false`, while everything else evaluates to `true`.

```dart
func isTrue(a: Any) = switch a {
  case is 0 | '' | '0': false
  fail: true
}
```

The key part of this solution is that this one case statement lets both 0 and the empty string evaluate to false:

```dart
switch a { case is 0 | '' | '0': false }
```

Before we move on, here’s another example that shows many matches in each case statement:

```dart
val evenOrOdd = switch i {
  case is 1 | 3 | 5 | 7 | 9: print("odd")
  case is 2 | 4 | 6 | 8 | 10: print("even")
  fail: print("some other number")
}
```

Here's another example that shows how to handle multiple strings in multiple case statements:

```dart
switch cmd {
  case is "start" | "go": print("starting")
  case is "stop" | "quit" | "exit": print("stopping")
  fail: print("doing nothing")
}
```

#### Guard conditions

Another great thing about switch expressions is that you can use `if` clauses to filter conditions.

```dart
val number = 4:u
switch number {
  case i if i == 0: print('Zero')
  case i if i > 0: print("Greater than zero")
  fail: print("Fell through")
}
```

#### Bindings

Indirectly accessing a variable makes it impossible to branch and use that variable without re-binding. The `as` clause for binding values to names:

```dart
val pair = [2, 2]

switch pair {
  case [x, y] as z if x == y: print("$z are twins!")
  case [x, y] as z if x + y == 0: print("$z are opposites!")
  case [x, _] if x % 2 == 1: print("The first is odd.")
  fail: print("Nothing special!")
}
```

Matching on strings, regular expressions and functions allow you to extract those data from them.

```dart
val sample: str = '10-a'
switch sample {
  case '${x: int}-dir': exec(x)
  case `(?<x>\d+)-dir`: exec(x)
  case x if x ~= `^\d+-dir$`: exec(x)
}
```

### Error handling

Like a lot of other languages, Saga has a try-catch statement to let you catch and manage errors. The main difference is that Saga allows you to pattern match errors.

```dart
var text = ''
try:
  text = new File('filename').open().read()
catch {
  case is FileNotFoundError:
    'Could not find the file $filename'
  case is IOError:
    "Had an IOError trying to read file $filename"
}
```

Try-catch also lets you use a "final" clause which is typically used when you need to close a resource.

```dart
try {
  var file = new File(path).open().read()
} catch {
  case foo : FooError: handleFooError(foo)
  case bar : BarError: handleBarError(bar)
  case : Throwable: print("Got some other kind of \
    Throwable error")
} final {
  file.close()
}
```

You can also use a "with" clause similar to Python, so there is no need to write a "final" clause, or even a "catch" clauses. Those are defined with the trait `Handleable`, with the methods `_try`, `_catch` and `_final` defined.

```dart
with var file as new File(path).open().read() {
  file.write('hello world!')
} // final { file._final() }
```

### Asynchrony

Saga comes with several constructs, namely `some`, `every`, `race` and `settle` when dealing with asynchronous operations. A promise can either be pending, `accept`ed or `reject`ed, depending on the operation having been completed or failed.

The `every` block would reject if any of its statements is rejected or an error is thrown. Those would be handled in the `catch` block.

```dart
every {
  accept 42
  accept await getFromDatabase()
  sleep(accept 'Success', 100, 'foo')
  reject 3
} done values {
  print(values)
} catch rejected {
  print(rejected)
}
```

The `some` block would only pass if any statement is resolved. If none are accepted, then the errors are handled in the catch block.

```dart
some {
  accept 42
  accept await getFromDatabase().throw()
  await sleep('Success', 100, 'foo')
  reject 3
} done values {
  print(values)
}
```

The `race` block would only pass as soon as any of its statements fulfils or rejects.

```dart
race {
  reject sleep(300, 'foo')
  reject sleep(100, 'foo')
  const a = 42
} done value {
  print(value) // 42
}
```

The `settle` block passes once all its statements have been completed or failed, describing the outcome of each statement as a status.

```dart
settle {
  const promise1 = 3
  const promise2 = setTimeout(reject, 100, 'foo')
  const promises = [promise1, promise2]
} done values, statuses {
  print(value) // 42
}
```

### Concurrency

Saga also contains the `spawn` and `kill` statement to spawn or stop execution of different threads.

```dart
i = 0
while i < 10 {
  spawn label x {
    print(i)
    i += 1
  }
}

kill x
```
