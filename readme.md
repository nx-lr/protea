# ![Protea](https://github.com/NoxVentura/ProteaLang/raw/main/banner.png)

Protea is a multi-purpose programming language that serves as a drop-in replacement to JavaScript, and the traditional way of writing JavaScript full stack applications on multiple platforms. It fully supports object-oriented and functional programming, and allows you to write simple, fast and quality code while leveraging on the best of the JavaScript (and Python) ecosystems.

```dart
module Button-B {
  style button {
    color: palevioletred
    font-size: 1em
    margin: 1em
    padding: 0.25em 1em
    border: 2px solid palevioletred
    border-radius: 3px
  }

  pub compo make(&count: int) {
    var times = match count {
      case 1: "once"
      case 2: "twice"
      case 3: "$n%d times"
    }
    var msg = "Click me $times%s"
    <button>$msg</button>
  }
}
```

### Overview

Protea is both a programming language and a framework targeting the JavaScript ecosystem, optimized for developing applications and libraries using only a single programming language. It is heavily inspired by Scala, Rust, Go, Python, ReasonML and the React framework.

### Syntax Overview

Protea is heavily inspired by Scala on many regards, including pattern matching, classes, traits, variables and operators. Protea has many short keywords, such as `dyn`, `pub`, `priv` and `impl`, many of them inspired from Rust.

```dart
data Vec(x: float, y: float) {
  infix func + (that: Vec) = Vec(x + that.x, y + that.y)
}

val vector1 = Vec(1.0, 1.0)
val vector2 = Vec(2.0, 2.0)
val vector3 = vector1 + vector2
vector3.x // 3.0
vector3.y // 3.0
```

The influence from Go can be seen in the syntax for variable declarations, most language constructs that are free of syntax noise like semicolons and parentheses, and statements like `go` and `defer`. Protea uses the `[]Item` syntax for list types.

```dart
func fibonacci(n: int): []int {
  var (a, b) = (1, 1)
  for var i in 1 to n { (a, b) = (b, a + b) }
  return list
}

func fibonacci(n: int): int = match n {
  case is 0 | 1: 1
  case n: fibonacci(n - 1) + fibonacci(n - 2)
}
```

Protea still maintains a general syntax that still somewhat resembles JavaScript, and has inherited most of the features such as JavaScript, adapted for the language. Protea also has support for SCSS, JSDoc, JSX and limited support for GraphQL.

```dart
val element = <div>
  <h1>Hello!</h1>
  <h2>Good to see you here.</h2>
</div>

var TomatoButton = style Button {
  color: tomato
  border-color: tomato
  border: 30px
}

data HeroNameAndFriends(episode: Episode) {
  hero(episode) {
    name
    friends {
      name
    }
  }
}
```

Protea also contains some smaller influences from other languages like Ruby, with symbol literals, Python's array slicing and splash asterisk, and YAML single quoted raw strings.

### Help me choose a language name!

- Dictionary words
  - **Solace**, i.e. comfort, peace
  - **Zenith** or **Nadir**
  - **Zephyr**
  - **Protean** or **Proteus**
- Personal names
  - **Evalyn** or **Evalin**
- Flora or Fauna
  - **Protea**
  - **Lotus**

### Features (non-exhaustive, more to come)

- familiar syntax (for the most part)
- JSDoc support
- JSX and embedded CSS support
- GraphQL schemas
- language-integrated query (LINQ)
- tagged template literals
- keyword-based syntax
- concurrency/asynchrony support and error-handling
- pattern matching
- type annotations and aliases
- uniform function call syntax
- immutable-by-default data structures
- block regular expressions
- extensible numeric literals
- string formatting
- Unicode named characters
- algebraic data types
- advanced type inference
- Node.JS runtime
- multiple targets: JS, C#, Python, JVM and LLVM/Swift
- opaque types and type aliases

### Compiler features (for future use)

- full tail call elimination
- human friendly errors
- what compiler should I use to build Protea?
- a core standard library
- an interactive REPL
- comprehensive editor support

## Hello World

```dart
func main = print('Hello World!')
```

Save this snippet into a file named `hello.pta`. Now run `pta run hello.pta` (you can leave out the `.pta` file format if you like). Congratulations - you just wrote and executed your first V program!

You can compile a program without execution with `pta comp hello.pta`. See `pta help` for all supported commands.

From the example above, you can see that functions are declared with the `func` keyword. The return type is specified after the function name. In this case `main` doesn't return anything, so you can leave out the return type.

As in many other languages (such as C, Go, and Rust), `main` is the entry point of your program.

`print` is one of the few built-in functions. It prints the value passed to it to standard output.

`fn main` declaration can be skipped in one-file programs. This is useful when writing small programs, "scripts", or just learning the language. For brevity, `fn main` will be skipped in this entire document.

This means that a "hello world" program in Protea is as simple as

```dart
print('Hello World!')
```

### The Basics

Your Protea codebase would contain this file structure:

```
hello-world/
|- lib/ -> all installed modules
|- src/ -> backend codes
|- app/ -> frontend codes
|- node_modules/ -> required in a JavaScript project
|- .gitignore
|- main.pta
|- package.json -> required in a JavaScript project
|- README.pta
|- module.pta
```

Every `.pta` file is a module. They can be accessed, installed, loaded, and passed around to and from other modules. You can put virtually anything into them, even other modules (they're called submodules)

The entry point of a project is the `main` function, defined in a special file called `main.pta`, at the project's root directory. All code is executed within `main`. If no `main` function is defined with `main`, it would look for any other root-directory file with a `main` and run it.

### Syntax

Like JavaScript, Protea is a curly-brace language. Code blocks are delimited ~~usually~~ all the time with curly braces.

Semicolons are completely optional though they can be used to separate multiple statements on the same line. The same rules apply to commas in function arguments or collection literals.

If a line ends in an **infix operator**, such as `!in` or `&&`, the resultant line is joined. If the next line also begins with an infix operator, it is joined to the previous line.

```dart
x in // joined
y

x // joined
in y
```

### Comments

Protea supports C-style comments. Block comments can be nested. **The leading space(s) after a comment is required**, but not the trailing spaces.

```dart
// line comment
/* /* block comment */ */
/// line documentation comment
/** block documentation comment */
```

## Functions (the basics)

Functions are a core part of any language. They perform logic and return values based on the arguments provided.

```dart
func main {
  print(add(77, 33))
  print(sub(100, 50))
}

func add(x: int, y: int): int = x + y
func sub(x: int, y: int): int = x - y
```

Again, the type comes after the argument's name.

Just like in Go and C, functions cannot be overloaded. This simplifies the code and improves maintainability and readability.

### Hoisting

Functions can be used before their declaration: `add` and `sub` are declared after `main`, but can still be called from `main`. This is true for all declarations in Protea and eliminates the need for header files or thinking about the order of files and declarations.

### Returning multiple values

Parentheses are tuple literals (very similar to lists).

```dart
func foo: (int, int) = (2, 3)
val (a, b) = foo()
print(a, b) // 2, 3
val (c, ?) = foo() // ignore values
```

### Visibility

```dart
pub func public-function {}
priv func private-function {}
```

Functions are private (not exported) by default. To allow other modules to use them, prepend `pub` or `export`. The same applies to constants and types.

Note: `pub` can only be used from a named module. For information about creating a module, see [Modules](#modules).

## Variables

A variable declaration binds values to names. In other languages they might be called a "variable binding" or "term declaration". The binding is immutable and can be referenced by code that comes after them.

```dart
val greeting = "hello!";
val score = 10;
val newScore = 10 + score;
```

Note: If you are coming from JavaScript, these bindings behave like `const`, not like `var` or `let`.

### Mutable and Immutable Variables

`val` bindings are "immutable", they cannot change after they are created.

```dart
val x = 10;
/* Error: Invalid code! */
x = x + 13;
```

### Shadowing

Declarations can be shadowed to give the appearance of updating them. This is a common pattern that should be used when it seems like a variable needs to be updated.

```dart
val x = 10;
val x = x + 10;
val x = x + 3;
/* x is 23 */
```

Block Scope Bindings can be manually scoped using `{}`.

```dart
val message = do {
  val part1 = "hello";
  val part2 = "world";
  part1 ++ " " ++ part2
};
/* `part1` and `part2` not accessible here! */
```

The last line of a block is implicitly returned.

### Mutable Bindings

A mutable variable is defined with the `var` keyword rather than `val`. This behaves very similarly to `let` in JavaScript.

```dart
var x = 42
x = 10
```

#### Assigning multiple variables

There are many ways to assign variables:

```dart
var x, y, z = 1, a = 2
x = 1; y = 2
```

You can also unpack them from regular expressions or data structures:

```dart
val `(?'x'\w+?)` = 'a-random' // x == 'a'
val (x, y) = (1, 2) // seq
val [x, y] = [1, 2] // list
val {x, y} = {x: 1, y: 2} // map
val {x, y} = {1, 2} // set (same as above)
```

### Keywords

Protea has a lot of different types of keywords, all of which are written entirely in lowercase and are between two and six letters.

Keywords used as operators:

```
in of as is new
to til thru by del
unset ref and or xor not
```

Declaration keywords, which are keywords used to declare program entities such as variables, functions, methods and properties.

```
var val func proc type
class data enum module
iter macro struct object
trait style elem prop
```

Control keywords are keywords used to create control flow statements such as conditionals, loops and error-handling statements.

```
do from where
if elif else
for each loop while
try throw catch after
match case goto pass
break next redo retry
return yield await label
import export route
debug assert
```

Contextual keywords are only parsed as keywords when they appear before a declaration keyword and occur in a row.

Visibility keywords explicitly tell the compiler which qualified name to refer to in a given scope. It would also be used to

```
# Visibility and mutability
pub priv prot after mut immut
glo loc early late covar contra
seal abst inter exter imply exply
super

# Concurrency/thread modifiers
sync async stat dyn lazy eager bound free

# Function or method modifiers
rec gen oper get set post del curry inline
prefix suffix infix binary unary left right
```

### Identifiers

An identifier can contain any sequence of letters, digits, marks,underscores, and dashes, provided it starts with a letter or underscore, and does not end in any number of dashes.

```ts
const regex = /\b[\p{Pc}\p{L}][\d\p{L}\p{M}\p{Pc}\p{Pd}]*\b/;
```

Identifiers are compared using an approach known as partial case-insensitivity.

```dart
func cmpIdent(a: str, b: str): bool {
  if do {
    val a1; (a1 = a.sub(`\P{Alnum}`g, '')) ~= `\p{Upper}+`
  }:
    a1 == b.sub(`\P{Alnum}`g, '')
  else:
    a[0] == b[0] && (
      a[1:].sub(`\P{Alnum}`g, '').lower() ==
      b[1:].sub(`\P{Alnum}`g, '').lower()
    )
}
```

To "strop" keywords, append a trailing underscore.

```dart
type Type = { def_: Func }
var var_ = 42, val_ = 8
val assert_ = var_ + val_ == 50
assert assert_
```

All identifiers are normalized using the above function.

### Booleans, Null and Void

The `null` type is used to represent the absence of a value, similar to that in other languages. It only has a single value:

```dart
null
```

Protea also has `void`, for compatibility purposes. `void` is equal to `null`, but compiles to JavaScript `undefined`. You should use `void` in place of `null`.

Booleans have only two possible values: `true` and `false`. They are constructed using the following literals:

```dart
true
false
```

### Numbers

#### Integer types

There are four signed integer types, and four unsigned integer types:

| Type           | Byte Length |              Minimum Value |                    Maximum Value |
| -------------- | ----------- | -------------------------: | -------------------------------: |
| `int8`/`i8`    | 8           |                       -128 |                              127 |
| `int16`/`i16`  | 16          |                    -32,768 |                           32,767 |
| `int32`/`i32`  | 32          |             -2,147,483,648 |                    2,147,483,647 |
| `int64`/`i64`  | 64          | -9,223,372,036,854,775,808 |        9,223,372,036,854,775,807 |
| `uint8`/`u8`   | 8           |                          0 |                              255 |
| `uint16`/`u16` | 16          |                          0 |                           65,535 |
| `uint32`/`u32` | 32          |                          0 |                    4,294,967,295 |
| `uint64`/`u64` | 64          |                          0 | 18,​446,​744,​073,​709,​551,​615 |

An integer literal consists of the form:

```ebnf
digit = "0".."9"
nonzero_digit = "1".."9"
bin_digit = "0" | "1"
qua_digit = "0".."3"
sen_digit = "0".."5"
oct_digit = "0".."7"
doz_digit = digit | "a" | "b" | "A" | "B"
hex_digit = digit | "a".."f" | "A".."F"
underscore = /* Unicode category Pc */

bin_lit = ("0"["B""b"]) (bin_digit | underscore)+
qua_lit = ("0"["Q""q"]) (qua_digit | underscore)+
sen_lit = ("0"["S""s"]) (sen_digit | underscore)+
oct_lit = ("0"["O""o"]) (oct_digit | underscore)+
doz_lit = ("0"["Z""z"]) (doz_digit | underscore)+
hex_lit = ("0"["X""x"]) (hex_digit | underscore)+
dec_lit = (dec_digit | underscore)+

type_suffix = identifier
int_lit = (bin_lit | qua_lit | sen_lit | oct_lit | doz_lit | hex_lit | dec_lit) type_suffix
```

An `int` corresponds to `int64` by default; same for a `uint` which corresponds to a `uint64`. If no suffix is present, the literal's type is the lowest between `int32`, `int64` and `uint64` in which the number fits:

```dart
1 // Int32

1_i8  // Int8
1_i16 // Int16
1_i32 // Int32
1_i64 // Int64

1_u8  // UInt8
1_u16 // UInt16
1_u32 // UInt32
1_u64 // UInt64

+10 // Int32
-20 // Int32

2147483648          // Int64
9223372036854775808 // UInt64
```

An integer literal can also be written with a base prefix, which can be any of the following bases:

```dart
val base2 = 0b10
val base4 = 0q123
val base6 = 0s12345
val base8 = 0o1234567
val base10 = 0123456789
val base12 = 0z0123456789ab
val base16 = 0x0123456789abcdef
```

There is an exception to the rule that all operators in Protea must have values of the same type on both sides. A small primitive type on one side can be automatically promoted if it fits completely into the data range of the type on the other side. These are the allowed possibilities:

```
   i8 → i16 → i32 → i64
                  ↘     ↘
                    f32 → f64 → bigfloat
                  ↗     ↗
   u8 → u16 → u32 → u64 ⬎
      ↘     ↘     ↘      bigint
   i8 → i16 → i32 → i64 ⬏
```

#### Floating point types

There are two floating point types, `float32` and `float64`, which correspond to the binary32 and binary64 types defined by IEEE.

A floating point literal is of the form:

```ebnf
power_suffix = (["p" "P"] decimal)? ["p" "P"] ["+" "-"]? decimal
rounding_suffix = ["t" "T"] ["d" "D" "s" "S"]? ["+" "-"]? decimal
type_suffix = identifier
float_suffix = power_suffix? rounding_suffix? type_suffix?
higher_float_suffix = power_suffix? rounding_suffix? ("\\" type_suffix?)

bin_run = (bin_digit | underscore)+
bin_init = ("0" ["b" "B"]) bin_run
bin_frac = "." bin_run
bin_denom = ["f" "F"] bin_run
bin_repeat = ["r" "R"] bin_run
bin_float = bin_init (bin_denom? | bin_frac? bin_repeat?) float_suffix

qua_run = (qua_digit | underscore)+
qua_init = ("0" ["q" "Q"]) qua_run
qua_frac = "." qua_run
qua_denom = ["f" "F"] qua_run
qua_repeat = ["r" "R"] qua_run
qua_float = qua_init (qua_denom? | qua_frac? qua_repeat?) float_suffix

sen_run = (sen_digit | underscore)+
sen_init = ("0" ["s" "S"]) sen_run
sen_frac = "." sen_run
sen_denom = ["f" "F"] sen_run
sen_repeat = ["r" "R"] sen_run
sen_float = sen_init (sen_denom? | sen_frac? sen_repeat?) float_suffix

oct_run = (oct_digit | underscore)+
oct_init = ("0" ["o" "O"]) oct_run
oct_frac = "." oct_run
oct_denom = ["f" "F"] oct_run
oct_repeat = ["r" "R"] oct_run
oct_float = oct_init (oct_denom? | oct_frac? oct_repeat?) float_suffix

doz_run = (doz_digit | underscore)+
doz_init = ("0" ["z" "Z"]) doz_run
doz_frac = "." doz_run
doz_denom = ["f" "F"] doz_run
doz_repeat = ["r" "R"] doz_run
doz_float = doz_init (doz_denom? | doz_frac? doz_repeat?) higher_float_suffix

hex_run = (hex_digit | underscore)+
hex_init = ("0" ["x" "X"]) hex_run
hex_frac = "." hex_run
hex_denom = ["f" "F"] hex_run
hex_repeat = ["r" "R"] hex_run
hex_float = hex_init (hex_denom? | hex_frac? hex_repeat?) higher_float_suffix

dec_run = (dec_digit | underscore)+
dec_init = dec_run
dec_frac = "." dec_run
dec_denom = ["f" "F"] dec_run
dec_repeat = ["r" "R"] dec_run
dec_float = dec_init (dec_denom? | dec_frac? dec_repeat?) float_suffix
```

```dart
0x1f\sec

1.0     // Float64
1.0f32 // Float32
1f32   // Float32

1e10   // Float64
1.5e10 // Float64
1.5e-7 // Float64

+1.3 // Float64
-0.5 // Float64
```

The underscore \_ before the suffix is optional.

Underscores can be used to make some numbers more readable:

```
1_000_000.111_111 # a lot more readable than 1000000.111111, yet functionally
```

A floating point literal is an optional + or - sign, followed by a sequence of numbers or underscores, followed by a dot, followed by numbers or underscores, followed by an optional exponent suffix, followed by an optional type suffix. If no suffix is present, the literal's type is Float64.

### Strings

Strings are created using single or double quotes. They are stored as UTF-16.

In Saga, a string is a read-only array of bytes. String data is encoded using UTF-16.

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
" more quotes because why not"""
```

Indexing a string would produce another string, i.e. a rune. Indexes correspond to Unicode characters, but you can convert the strings using the `.bytes()` method.

```v
hello := 'Hello World 👋'
hello_runes := hello.runes() // [`H`, `e`, `l`, `l`, `o`, ` `, `W`, `o`, `r`, `l`, `d`, ` `, `👋`]
```

Double quoted string literals can contain the following escape sequences, and all of them are case-insensitive. You can embed multiple code points in a single expansion.

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
"""We're fine"""

// Strings can end in more than the opening number of quotes
"""x\""""

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
"$function() or $method.call(plus, params)"
"${expression} $for everything $else"

'$1' '$%' // don't need escaping
'$$a' == "\$a"
```

### String formatting

Protea comes built-in with a string formatting mini-language for converting, serializing and transforming objects inside strings, with a clearer to read syntax. They are composed of the following parts:

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
"%x/x:{} code block"
"%x/x:({}) dictionary"

'%1' '%$' // don't need escaping when next to a symbol or number
'%a' == "\%a"

const Everest = {height: 8848}
"Mount Everest is $Everest.height%f/unit:'m'/style:'long' tall."
// "Mount Everest is 8,848 meters tall."
```

### String placeholder variables

String placeholders are used to create template strings from named, keyed or positional arguments. They produce strings from their arguments by calling its `format` method with the specified arguments.

```dart
"#named" "#?optional"
"#&keyed" "#&?optional"
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

### String methods

(TODO)

## Symbols

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

Regular expressions function like strings, except delimited using backticks. In an effort to make them more readable, Protea's regexes allow for free spacing and embedded comments.

Protea uses the [Oniguruma](https://github.com/kkos/oniguruma/blob/master/doc/RE) regular expression flavor by default, the same regex engine that powers Ruby and PHP7. This means it's a blend of features found in the most popular regular expression flavors.

````dart
`\b{wb}(fee|fie|foe|fum)\b{wb}`x
`[ ! @ " $ % ^ & * () = ? <> ' : {} \[ \] `]`x
`
// Match a 20th or 21st century date in yyyy-mm-dd format
(19|20)\d\d                // year (group 1)
[- /.]                     // separator
(0[1-9]|1[012])            // month (group 2)
[- /.]                     // separator
(0[1-9]|[12][0-9]|3[01])   // day (group 3)
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

Protea comes with two basic literals: list and map. Both collections are homogenous and immutable.

- Lists are ordered collections of literals.
- Maps are collections of key-value pairs where each item is mapped to a distinct key.

Sets are map literals with the values repeated.

```dart
var list1: []int = [10, 20, 30]
var list2 = ['a', 'b', 'c'] // is []str
[] // an empty list
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

A multidimensional list can have many prefix `[]` in them.

```dart
var a: [][]int = [[0, 2, 0], [0, 0, 0]]
```

You can prefix a hash sign (`#`) to a list or map literal to turn it into a mutable list or map.

```dart
var a: #[]#[]#[]int = #[0].rep(2).rep(3).rep(2)
a[0][1][1] = 2
print(a) // [[[0, 0], [0, 2], [0, 0]], [[0, 0], [0, 0], [0, 0]]]
```

There are further built in methods for arrays:

- `b := a.repeat(n)` concatenate `n` times the elements of `a`
- `a.insert(i, val)` insert new element `val` at index `i` and move all following elements upwards
- `a.insert(i, [3, 4, 5])` insert several elements
- `a.prepend(val)` insert value at beginning, equivalent to `a.insert(0, val)`
- `a.prepend(arr)` insert elements of array `arr` at beginning
- `a.trim(new_len)` truncate the length (if `new_length < a.len`, otherwise do nothing)
- `a.clear()` empty the array (without changing `cap`, equivalent to `a.trim(0)`)
- `a.delete_many(start, size)` removes `size` consecutive elements beginning with index `start` &ndash; triggers reallocation
- `a.delete(index)` equivalent to `a.delete_many(index, 1)`
- `v := a.first()` equivalent to `v := a[0]`
- `v := a.last()` equivalent to `v := a[a.len - 1]`
- `v := a.pop()` get last element and remove it from array
- `a.delete_last()` remove last element from array
- `b := a.reverse()` make `b` contain the elements of `a` in reversed order
- `a.reverse_in_place()` reverse the order of elements in `a`
- `a.join(joiner)` concatenate array of strings into a string using `joiner` string as a separator

### Maps

Maps are uniquely keyed collections of values. Any expression can be keyed as long as all the keys are unique. Sets are unique forms of maps in that keys and values map to one another.

```dart
val map1: {str : int} = {one: 1, two: 2, three: 3}
val map2 = {1: 2, 2: 4, 3: 6, 4: 8} // inferred as {int : int}
{} // an empty map
```

If a key is a valid identifier, even if it is a keyword, and is placed right before the colon, then it need not be quoted. The same goes for types. Any other value is parsed as an expression. Unquoted identifiers are subject to normalisation.

```dart
x = {int: 1, 2.2: 2, '3': 3, x * 2 + 4: 4}
assert x.int == 1
assert x.2.2 == 1 // better to use `x[2.2]` instead
assert x.'3' == 3
assert x[x * 2 + 4] = 1
```

Map literals with single elements are allowed, with the keys and the values repeated.

```dart
assert ({1: 1, 2: 2}) == {1, 2}
```

## Expressions & Operators

In Protea, operators are methods. Any method with a single parameter can be used as an infix operator. For example, `+` can be called with dot notation:

```dart
10.+1
```

However, it’s easier to read as an infix operator:

```dart
10 + 1
```

The data class `Vec` has a method `+` which we used to add vector1 and vector2. Using parentheses, you can build up complex expressions with readable syntax.

```dart
data Vec(x: float, y: float) {
  func + (that: Vec) = Vec(this.x + that.x, this.y + that.y)
}

val vector1 = Vec(1.0, 1.0)
val vector2 = Vec(2.0, 2.0)
val vector3 = vector1 + vector2

vector3.x // 3.0
vector3.y // 3.0
```

Operators can contain the following characters. In addition, all other Unicode punctuation and symbol characters can also be used as operators.

```dart
'
= + - * / \ < >
@ $ ~ & % | ! ? ^ . :
'
```

These keywords are also operators: `in !in of !of is is! as as! as? unset del to til thru by and or xor not !and !or !xor`.

`.`, `=`, `:`, `::`, `|>`, `||>`, `|||>`, `+>`, `<|`, `<||`, `<|||`, `<+`, `?:`, `!:`, `??`, `!!`, are not available as general operators; they are used for other notational purposes.

An infix operator can contain any sequence of `//` or `/*`, but must NOT be exactly those sequences (those are the syntax for comments).

Infix operators whose first character is `@` are right-associative.

```dart
func &/ (y: float): float = x / y
12 @/ 4 @/ 8 // 24.0
12 / 4 / 8 // 24.8
```

Prefix, suffix and infix operators are distinguished whether they have preceding, following whitespace, or both (respectively).

Suffix operators are evaluated first and from left to right, and prefix operators are evaluated next and from right to left.

Infix operators are evaluated last and are evaluated based on the given order below.

###

Operators ending in either `->`, `~>` or `=>` or starting in `<-` `<=` or `<~` are called arrow like, and have the lowest precedence of all operators.

If the operator ends with `=` and its first character is none of `<`, `>`, `!`, `=`, `~`, `?`, it is an assignment operator which has the second-lowest precedence.

Otherwise, precedence is determined by the first character.

| Precedence level | Operators                                                        | First character |
| ---------------- | ---------------------------------------------------------------- | --------------- |
| 9 (highest)      | `unset del not`                                                  | `$ ^`           |
| 8                | `* / ** # %`                                                     | `* % \ /`       |
| 7                | `+ -`                                                            | `+ - ~ \|`      |
| 6                | `& \| ^ << >>`                                                   | `&`             |
| 5                | `== <= < >= > != in !in of !of is is! as as! as? to til thru by` | `= < > !`       |
| 4                | `&& \|\| ^^ and or xor`                                          |                 |
| 3                | infix `?? !! ?: !: ::`                                           |                 |
| 2                | `@` and arrow like operator (like `->`, `=>`)                    |                 |
| 1                | assignment operator (like `+=`, `*=`)                            |                 |

Whether an operator is used as a prefix operator is also affected by preceding or following whitespace, respectively.

```dart
++x++ == +(+((x+)+))
```

Dot-like or colon-like operators are operators starting with `.`, `!.`, `?.`, `::`, `?:` or `!:`; they have the same precedence as `.`, so that `a.?b.c` is parsed as `(a.?b).c` instead of `a.?(b.c)`.

---

## Control Statements

Protea has a range of control statements which are also expressions. They form the core of the language.

### Basic closures

Bindings can be scoped through the do-block: `do {}`. The value of the last line of a closure is immediately returned, lest specified with `return`.

```dart
val message = do {
  val part1 = "hello"
  val part2 = "world"
  part1 ++ " " ++ part2
}
// `part1` and `part2` not accessible here!
```

`if`, `while`, and all code blocks use this same mechanism.

```dart
if displayGreeting {
  val message = "Enjoying the docs so far?"
  print(message)
}
// `message` not accessible here!
```

Instead of a block, whenever there's a single statement, you can use a colon `:` instead of an opening curly brace, provided the colon is separated by a space only on its right.

```dart
val message = do: 3 + 4
val message = do : 3 + 4 // type annotation
```

But not both (opening curly brace is a map literal).

```dart
val message = do: { 3 + 4 }
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

An `if`-`else` expression without the after `else` branch gives null.

```dart
if showMenu { displayMenu() }
// is equivalent to
if showMenu { displayMenu() } else { null }
```

The `if`-`else` construct looks like this:

```dart
if a == b {
  doSomething()
} else {
  doSomethingElse()
}
```

The complete `if`-`else if`-`else` expression looks like this:

```dart
if test1 {
  doX()
} elif test2 { // not "else if"
  doY()
} else {
  doZ()
}
```

A great thing about the conditional is that it always returns. You can ignore the result as we did in the previous examples, but a more common approach, especially in functional programming.

You can assign the result to a variable:

```dart
val minValue = if a < b: a else: b
```

Anyway, Protea has two ternary conditional operators, which are just syntax sugar for the above if you're not keen on using `if`. That last one, is syntax sugar for `un`...`else`.

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

`loop-while` is a variant of `while`. This loop will execute the code block once, before checking if the condition is true, then it will loop the loop as long as the condition is true.

```dart
loop {
  text += "The number is $i"
  i += 1
} while i < 10
```

Loop blocks without their while condition would run indefinitely, and you would have to manually insert a `break` statement somewhere. Loop blocks would also stop executing when a closure returns, yields or throws too.

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

Protea has three keywords relating to loops:

- stop and exit a loop or an enumeration using the `break` keyword
- jump to the next iteration or step using the `next` keyword
- redo the current iteration or step using the `redo` keyword

```dart
label x loop {
  if new Random() > 0.3: break x
  elif new Random() > 0.5: next x
  elif new Random() > 0.7: redo x
  else: print("Still running")
}
```

All are system calls so they can be interlaced with expressions.

### Match or match

With a `match` or `switch` expression you write a number of case statements that you use to match possible values.

`match`/`switch` expressions are nice because they also return values, so rather than directly printing a string as in that example, you can assign the string result to a new value:

```dart
// i is an integer
val dayName = match i {
  case 1: "Monday"
  case 2: "Tuesday"
  case 3: "Wednesday"
  case 4: "Thursday"
  case 5: "Friday"
  case 6: "Saturday"
  case 7: "Sunday"
  def: "Invalid day"
}
```

`match`/`switch` expressions allow you to handle multiple cases.

To demonstrate this, imagine that you want to evaluate "boolean equality" like PHP would: `0`, `''` or `'0'` evaluates to `false`, while everything else evaluates to `true`.

```dart
func isTrue(a: Any) = match a {
  case is 0 | '' | '0': false
  def: true
}
```

The key part of this solution is that this one case statement lets both 0 and the empty string evaluate to false:

```dart
match a { case is 0 | '' | '0': false }
```

Before we move on, here’s another example that shows many matches in each case statement:

```dart
val evenOrOdd = match i {
  case is 1 | 3 | 5 | 7 | 9: print("odd")
  case is 2 | 4 | 6 | 8 | 10: print("even")
  def: print("some other number")
}
```

Here's another example that shows how to handle multiple strings in multiple case statements:

```dart
match cmd {
  case is "start" | "go": print("starting")
  case is "stop" | "quit" | "exit": print("stopping")
  def: print("doing nothing")
}
```

#### Guard conditions

Another great thing about match expressions is that you can use `if` clauses to filter conditions.

```dart
val number = 4:u
match number {
  case i if i == 0: print('Zero')
  case i if i > 0: print("Greater than zero")
  def: print("Fell through")
}
```

#### Bindings

Indirectly accessing a variable makes it impossible to branch and use that variable without re-binding. The `as` clause for binding values to names:

```dart
val pair = [2, 2]

match pair {
  case [x, y] as z if x == y: print("$z are twins!")
  case [x, y] as z if x + y == 0: print("$z are opposites!")
  case [x, _] if x % 2 == 1: print("The first is odd.")
  def: print("Nothing special!")
}
```

Matching on strings, regular expressions and functions using interpolation would allow you to extract those data from them.

```dart
val sample: str = '10-a'
match sample {
  case '${x: int}-dir': exec(x)
  case `(?<x>\d+)-dir`: exec(x)
  case |x| ~= `^\d+-dir$`: exec(x)
}
```

### Error handling

Like a lot of other languages, Protea has a try-catch statement to val you catch and manage errors. The main difference is that Protea allows you to pattern match errors.

```dart
var text = ''
try:
  text = File('filename').open.read
catch {
  case is FileNotFoundError:
    "Could not find the file $filename"
  case is IOError:
    "Had an IOError trying to read file $filename"
}
```

Try-catch also lets you use an `after` clause which is typically used when you need to close a resource.

```dart
try {
  var file = File(path).open.read
} catch {
  case foo : FooError: handleFooError(foo)
  case bar : BarError: handleBarError(bar)
  case : Throwable: print("Got some other kind of \
    Throwable error")
} after {
  file.close()
}
```

You can also use a `with` clause similar to Python, so there is no need to write a `final` clause, or even a `catch` clauses. Those are defined with the trait `Handleable`, with the methods `_try`, `_catch` and `_after` defined.

```dart
with var file as File(path).open.read {
  file.write('hello world!')
} // after { file._final() }
```

### Concurrency and Multi-threading

Other concurrent processes are managed through processes as defined in the `Thread` module.

## Functions

Functions form the heart of Protea. Writing them is very simple:

```dart
func double(i: int): int = i * 2
```

You can use the `pure` or `impure` keywords to allow the compiler to analyse the function as said.

Functions can also be written using a special syntax that resembles Ruby, with the arguments written in between pipe characters instead:

```dart
val add = |x, y, z| x + y + z
val add = |x: int, y: int, z: int|: int = x + y + z
add(1, 2, 3) // 6
```

For longer functions, you'd surround the body with a block:

```dart
func greetMore(name) {
  val part1 = "Hello"
  part1 ++ " " ++ name
}
```

If your function has no arguments, you can write `var greetMore = | | { }`.

### Recursive Functions

By default, a function cannot be called recursively with itself. To make a function recursive, we add the `rec` modifier. Tail recursion is compiled into a fast `while` loop so they run faster.

```dart
rec func sum(list: list[int]): int = match list {
  case null: 0
  case head :: tail: head + sum(tail)
}
```

### Functions

You can define methods and functions in classes, or modify existing classes by defining a new function on that object.

```dart
rec func has(this: []any, item: any): bool = match this {
  case []: false
  case [a, *rest]: a == item ?: rest.has(item)
}

rec func List.has(item: any): bool = match this {
  case []: false
  case [a, *rest]: a == item ?: rest.has(item)
}
```

Mutually recursive functions start like a single recursive function using the `rec` keyword, and then are chained together with `and`.

```dart
rec func callSecond = |x, y, z| callFirst()
and func callFirst = | | callSecond(. x)
```

### Labeled Arguments

Multi-arguments functions, especially those whose arguments are of the same type, can be confusing to call.

```dart
func addCoordinates(x, y) {
  // use x and y here
}
addCoordinates(5, 6) // which is x, which is y?
```

You can attach labels to an argument by prefixing the name with the `&` symbol:

```dart
func addCoordinates(&x, &y) {
  // use x and y here
}
// ...
addCoordinates(&x = 5, &y = 6)
addCoordinates(&y = 6, &x = 5)
```

The `&x` part in the declaration means the function accepts an argument labeled `x` and can refer to it in the function body by the same name.

You can also refer to the arguments inside the function body by a different name for conciseness:

```dart
func addCoordinates(&x as y) {
  // use x and y here
}
```

### Optional Arguments

Labeled function arguments can be made optional during declaration. You can then omit them when calling the function.

```dart
// radius can be omitted
proc drawCircle(&color, &?radius) {
  await setColor(color)
  match radius {
    case none: startAt(1, 1)
    case some r: startAt(r, r)
  }
}
```

You can type a `func` or `proc`. The argument is wrapped in an "option" type.

```dart
proc drawCircle(
  circle: circle,
  &color: color
  &?radius: ?int = 1
): void {
  await color.set()
  match radius {
    case none: circle.startAt(1, 1)
    case some r: circle.startAt(r, r)
  }
}

var result =
  drawCircle(&color, &radius = ?payloadRadius)
```

Labeled arguments can also be provided a default value. In this case, they aren't wrapped in an option type.

```dart
func drawCircle(&radius = 1, &color) {
  setColor(color)
  startAt(radius, radius)
}
```

### Curried functions

Functions and procedures are curried, by default. To want guaranteed un-currying, prefix a dot in the function's parameter list. Its type would have a dot.

```dart
add(. x, y)
func add(. x, y) = x + y
assert echo is (. int, int) int
add(. 1, 2)
```

If you need to call a curried function without any argument, you can do this:

```dart
proc echo(a) = print(a)
echo(.)
```

### Tips & Tricks

Cheat sheet for the function syntaxes:

#### Declaration

```dart
// anonymous function
func(x, y) = 1
|x, y| = 1
// bind to a name
func x(x, y) = 1
x = func(x, y) = 1
x = |x, y| = 1

// labeled
func add(&first as x, &second as y) = x + y
add = |&first as x, &second as y| x + y
// with punning sugar
func add(&first, &second) = x + y
add = |&first, &second| = x + y

// labeled with default value
func add(&first as x = 1, &second as y = 2) = x + y
add = |&first as x = 1, &second as y = 2| x + y
// with punning
func add(&first = 1, &second = 2) = x + y
add = |&first, &second| = x + y

// optional
func add(&?first as ?x, &?second as ?y) = match x {...}
add = |&?first as ?x, &?second as ?y| = match first {...}
// with punning
func add(&?first, &?second) = match first {...}
add = |&?first, &?second| = match first {...}

/* WITH TYPES */

// anonymous function
func(x: int, y: int): int = 1
|x: int, y: int|: int, 1
// bind to a name
func x(x: int, y: int): int = 1
x = func(x: int, y: int): int = 1
x = |x: int, y: int|: int = 1

// labeled
func add(&first as x: int, &second as y): int = x + y
add = |&first as x: int, &second as y|: int, x + y
// with punning sugar
func add(&first: int, &second: int): int = x + y
add = |&first: int, &second: int|: int = x + y

// labeled with default value
func add(&first as x: int = 1, &second as y: int = 2) = x + y
add = |&first as x: int = 1, &second as y: int = 2|: int, x + y
// with punning
func add(&first: int = 1, &second: int = 2): int = x + y
add = |&first: int, &second: int|: int = x + y

// optional
func add(&?first as ?x: ?int, &?second as ?y: ?int): int = match x {...}
add = |&?first as ?x: ?int, &?second as ?y: ?int|: int = match x {...}
// with punning
func add(&?first: ?int, &?second: ?int) = match first {...}
add = |&?first: ?int, &?second: ?int| = match first {...}
```

#### Application

```dart
add(x, y)

// labeled
add(&first = 1, &second = 2)
// with punning sugar
add(&first, &second)

// application with default value. Same as normal application
add(&first = 1, &second = 2)

// explicit optional application
add(&?first = 1, &?second = 2)
// with punning
add(&?first, &?second)

/* WITH TYPES */

// labeled
add(&first: int = 1, &second: int = 2)
// with punning sugar
add(&first: int, &second: int)

// application with default value. Same as normal application
add(&first: int = 1, &second: int = 2)

// explicit optional application
add(&?first: ?int = 1, &?second: ?int = 2)
// no punning sugar when you want to type annotate
```

#### Type Signature

```dart
// first arg type, second arg type, return type
type add = (int, int) int
type add = (x: int, y: int) int
type add = (&first: int, &second: int) int
type add = (&?first: ?int, &?second: ?int) int
```

## Classes

In support of object-oriented programming, Protea has a class construct. Its syntax is much more concise than languages like Java or C.

Here's a Protea class whose constructor defines two parameters, firstName and lastName:

```dart
class Character(var firstName: str, var lastName: str)
```

Given that definition, you can create new Person instances as shown below. The `new` keyword is optional.

```dart
val p = new Character("Akali", "Tethi")
val p = Character("Akali", "Tethi")
```

Defining parameters in a class constructor automatically creates fields in the class, and in this example you can access the firstName and lastName fields like this:

```dart
print(p.firstName + " " + p.lastName) // Akali Tethi
```

As both fields are defined as var fields, they're also mutable, meaning they can be changed. This is how you change them:

```dart
p.firstName = "Orianna"
p.lastName = "Reveck"
print(p.firstName + " " + p.lastName) // Orianna Reveck
```

If you’re coming from JavaScript, this Protea code:

```dart
class Person(var firstName: str, var lastName: str)
```

is roughly the equivalent of this TypeScript code:

```ts
class Person {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, readonly lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get firstName(): string {
    return this.firstName;
  }
  set firstName(firstName: string): void {
    this.firstName = firstName;
  }

  get lastName(): string {
    return this.lastName;
  }
  set lastName(lastName: string): void {
    this.lastName = lastName;
  }
}
```

#### Class constructors

In Protea, the constructor of a class is a combination of:

- The parameters
- Statements executed in the class body
- Fields and methods assigned when the class is initialised.

This Person class demonstrates several of the things you can do inside the body of a class:

```dart
class Person(var firstName: str, var lastName: str) {
  print("the constructor begins")
  // 'public' access by default
  var age = 0
  pub var age // explicit public
  priv val HOME = System.get("user.home")

  // some methods
  sub func str: str = "$firstName $lastName is $age years old"
  proc printHome = print("HOME = $HOME")
  proc printFullName = print(this)

  printHome() && printFullName()
  print("you've reached the end of the constructor")
}
```

Here are some more examples of classes:

```dart
class Pizza(var crustSize: int, var crustType: str)

// a stock, like AAPL or GOOG
class Stock(var symbol: str, var price: bigrat)

// a network socket
class Socket(val timeout: str, val linger: str) {
  sub func str = "timeout: $timeout, linger: $linger"
}

class Address(
  var street1: str,
  var street2: str,
  var city: str,
  var state: str
)
```

### Default constructor parameters

Protea lets you supply default values for constructor parameters. For example, in previous lessons we showed that you can define a Socket class like this:

```dart
class Socket(var timeout: int, var linger: int) {
  sub func str = "timeout: $timeout, linger: $linger"
}
```

That’s nice, but you can make this class better by supplying default values for the `timeout` and `linger` parameters:

```dart
class Socket(var timeout: int = 2000, var linger: int = 3000) {
  sub func str = "timeout: $timeout, linger: $linger"
}
```

By supplying default values for the parameters, you can now create a new Socket in a variety of different ways:

```dart
new Socket()
new Socket(1000)
new Socket(4000, 6000)
```

You can use named parameters when creating a new instance of a class. For instance, given the Socket class above, you can create a new Socket like this:

```dart
val s = new Socket(&timeout = 2000, &linger = 3000)
```

This feature comes in handy from time to time, such as when all of the class constructor parameters have the same type, such as the Int parameters in this example. For example, some people find that this code:

```dart
val s = new Socket(&timeout = 2000, &linger = 3000)
```

is more readable than this code:

```dart
val s = new Socket(2000, 3000)
```

## Enumerations

Enumerations are a useful tool for creating small groups of constants, things like the days of the week, months in a year, suits in a deck of cards, etc., situations where you have a group of related, constant values.

Enums only allow primitive, constant types: `int`, `str`, `regex`, `float` and `bool`. Nothing else.

### Numeric enums

We'll first start off with numeric enums, which are probably more familiar if you’re coming from other languages. An enum can be defined using the enum keyword.

```dart
enum Direction: int { // the type is optional
  Up = 1
  Down
  Left
  Right
}
```

Above, we have a numeric enum where `Up` is initialized with `1`. All of the following members are auto-incremented from that point on. In other words, `Direction.Up` has the value `1`, `Down` has `2`, `Left` has `3`, and `Right` has `4`.

If we wanted, we could leave off the initializers entirely:

```dart
enum Direction: int {
  Up
  Down
  Left
  Right
}
```

Here, `Up` would have the value `0`, `Down` would have `1`, etc. This auto-incrementing behavior is useful for cases where we might not care about the member values themselves, but do care that each value is distinct from other values in the same enum.

Using an enum is simple: just access any member as a property off of the enum itself, and declare types using the name of the enum:

```dart
enum UserResponse {
  No = 0,
  Yes = 1,
}

func respond(
  recipient: str,
  message: UserResponse
): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);
```

Numeric enums can be mixed in computed and constant members (see below). The short story is, enums without initializers either need to be first, or have to come after numeric enums initialized with numeric constants or other constant enum members. In other words, the following isn’t allowed:

```dart
enum E {
  A = getSomeValue()
  B // Enum member must have initializer.
}
```

### String enums

String enums are a similar concept, but have some subtle runtime differences as documented below. In a string enum, each member has to be constant-initialized with a string literal, or with another string enum member.

```dart
enum Direction: str {
  Up = "UP"
  Down = "DOWN"
  Left = "LEFT"
  Right = "RIGHT"
}
```

While string enums don’t have auto-incrementing behavior, string enums have the benefit that they "serialize" well. In other words, string enums allow you to give a meaningful and readable value when your code runs, independent of the name of the enum member itself.

### Constant expressions

Each enum member has a value associated with it which can be either constant or computed. An enum member is considered constant if:

It is the first member in the enum and it has no initializer, in which case it’s assigned the value 0:

```dart
// E.X is constant:
enum E { X }
```

It does not have an initializer and the preceding enum member was a numeric constant. In this case the value of the current enum member will be the value of the preceding enum member plus one.

```dart
// All enum members in 'E1' and 'E2' are constant.
enum E1 { X, Y, Z }
enum E2 { A = 1, B, C }
```

Any constant expression can be used in the same enum, provided that that expression contain NO variables except those previously defined.

```dart
enum FileAccess {
  // constant members
  None
  Read = 1 << 1
  Write = 1 << 2
  ReadWrite = Read | Write
  // computed member
  G = len('123')
}
```

### Heterogeneous enums

Why would you do this in the first place?

```dart
enum BooleanLike {
  No = 0,
  Yes = "YES",
}
```

## Modules

### Basics

Modules are like mini-files and can include type definitions, variables, classes, functions, modules, components etc.

#### Creation

To create a module, use the `module` keyword. The module name must start with a **capital letter**. Whatever you could place in a `.res` file, you may place inside a module definition's `{}` block.

```dart
module School {
  type profession = Teacher | Director

  var person1 = Teacher
  var getProfession = |person|
    match person {
      case Teacher: "A teacher"
      case Director: "A director"
    }
}
```

A module's contents (including types!) can be accessed much like a record's, using the `.` notation. This demonstrates modules' utility for namespacing.

```dart
val anotherPerson: School.profession = School.Teacher
Js.log(School.getProfession(anotherPerson)) /* "A teacher" */
```

Nested modules work too.

```dart
module MyModule {
  module NestedModule {
    val message = "hello"
  }
}

val message = MyModule.NestedModule.message
```

### Importing a module

Constantly referring to a value/type in a module can be tedious. Instead, we can `import all` a module and refer to its contents without always prepending them with the module's name. Instead of writing:

```dart
val p = School.getProfession(School.person1)
```

We can write:

```dart
import all School
val p = getProfession(person1)
```

The content of `School` module are made visible (**not** copied into the file, but simply made visible!) in scope. `profession`, `getProfession` and `person1` will thus correctly be found.

**Use `open` this sparingly, it's convenient, but makes it hard to know where some values come from**. You should usually use `open` in a local scope:

```dart
val p = do {
  import School
  getProfession(person1)
}
/* School's content isn't visible here anymore */
```

### Use `open!` to ignore shadow warnings

There are situations where `open` will cause a warning due to existing identifiers (bindings, types) being redefined. Use `open!` to explicitly tell the compiler that this is desired behavior.

```dart
val map = (arr, value) => {
  value
}

// opening Js.Array2 would shadow our previously defined `map`
// `open!` will explicitly turn off the automatic warning
import! Js.Array2
val arr = map([1,2,3], (a) => { a + 1})
```

**Note:** Same as with `open`, don't overuse `open!` statements if not necessary. Use (sub)modules to prevent shadowing issues.

### Destructuring modules

**Since 9.0.2**

As an alternative to `open`ing a module, you can also destructure a module's functions and values into separate var bindings (similarly on how we'd destructure an object in JavaScript).

```dart
module User {
  var user1 = "Anna"
  var user2 = "Franz"
}

// Destructure by name
val {user1, user2} = module(User)

// Destructure with different alias
val {user1: anna, user2: franz} = module(User)
```

**Note:** You can't extract types with module destructuring — use a type alias instead (`type user = User.myUserType`).

### Extending modules

Using `include` in a module statically "spreads" a module's content into a new one, thus often fulfill the role of "inheritance" or "mixin".

**Note**: this is equivalent to a compiler-level copy paste. **We heavily discourage `include`**. Use it as last resort!

```dart
module BaseComponent {
  var defaultGreeting = "Hello"
  var getAudience = (~excited) => excited ? "world!" : "world"
}

module ActualComponent {
  /* the content is copied over */
  include BaseComponent
  /* overrides BaseComponent.defaultGreeting */
  var defaultGreeting = "Hey"
  var render = () => defaultGreeting ++ " " ++ getAudience(~excited=true)
}
```

**Note**: `open` and `include` are very different! The former brings a module's content into your current scope, so that you don't have to refer to a value by prefixing it with the module's name every time. The latter **copies over** the definition of a module statically, then also do an `open`.

### Every `.res` file is a module

Every Protea file is itself compiled to a module of the same name as the file name, capitalized. The file `React.res` implicitly forms a module `React`, which can be seen by other source files.

**Note**: Protea file names should, by convention, be capitalized so that their casing matches their module name. Uncapitalized file names are not invalid, but will be implicitly transformed into a capitalized module name. I.e. `file.res` will be compiled into the module `File`. To simplify and minimize the disconnect here, the convention is therefore to capitalize file names.

## Signatures

A module's type is called a "signature", and can be written explicitly. If a module is like a `.res` (implementation) file, then a module's signature is like a `.resi` (interface) file.

### Creation

To create a signature, use the `module type` keyword. The signature name must start with a **capital letter**. Whatever you could place in a `.resi` file, you may place inside a signature definition's `{}` block.

```dart
/* Picking up previous section's example */
module type EstablishmentType = {
  type profession
  var getProfession: profession => string
}
```

A signature defines the list of requirements that a module must satisfy in order for that module to match the signature. Those requirements are of the form:

- `var x: int` requires a `let` binding named `x`, of type `int`.
- `type t = someType` requires a type field `t` to be equal to `someType`.
- `type t` requires a type field `t`, but without imposing any requirements on the actual, concrete type of `t`. We'd use `t` in other entries in the signature to describe relationships, e.g. `var makePair: t => (t, t)` but we cannot, for example, assume that `t` is an `int`. This gives us great, enforced abstraction abilities.

To illustrate the various kinds of type entries, consider the above signature `EstablishmentType` which requires that a module:

- Declare a type named `profession`.
- Must include a function that takes in a value of the type `profession` and returns a string.

**Note**:

Modules of the type `EstablishmentType` can contain more fields than the signature declares, just like the module `School` in the previous section (if we choose to assign it the type `EstablishmentType`. Otherwise, `School` exposes every field). This effectively makes the `person1` field an enforced implementation detail! Outsiders can't access it, since it's not present in the signature; the signature **constrained** what others can access.

The type `EstablishmentType.profession` is **abstract**: it doesn't have a concrete type; it's saying "I don't care what the actual type is, but it's used as input to `getProfession`". This is useful to fit many modules under the same interface:

```dart
module Company: EstablishmentType = {
  type profession = CEO | Designer | Engineer | ...

  var getProfession = (person) => ...
  var person1 = ...
  var person2 = ...
}
```

It's also useful to hide the underlying type as an implementation detail others can't rely on. If you ask what the type of `Company.profession` is, instead of exposing the variant, it'll only tell you "it's `Company.profession`".

### Extending module signatures

Like modules themselves, module signatures can also be extended by other module signatures using `include`. Again, **heavily discouraged**:

```dart
module type BaseComponent = {
  var defaultGreeting: string
  var getAudience: (~excited: bool) => string
}

module type ActualComponent = {
  /* the BaseComponent signature is copied over */
  include BaseComponent
  var render: unit => string
}
```

**Note**: `BaseComponent` is a module **type**, not an actual module itself!

If you do not have a defined module type, you can extract it from an actual module using `include (module type of ActualModuleName)`. For example, we can extend the `List` module from the standard library, which does not define a module type.

```dart
module type MyList = {
  include (module type of List)
  var myListFun: list<'a> => list<'a>
}
```

### Every `.resi` file is a signature

Similar to how a `React.res` file implicitly defines a module `React`, a file `React.resi` implicitly defines a signature for `React`. If `React.resi` isn't provided, the signature of `React.res` defaults to exposing all the fields of the module. Because they don't contain implementation files, `.resi` files are used in the ecosystem to also document the public API of their corresponding modules.

```dart
/* file React.res (implementation. Compiles to module React) */
type state = int
val render = (str) => str
```

```dart sig
/* file React.resi (interface. Compiles to the signature of React.res) */
type state = int
val render: string => string
```

## Module Functions (functors)

Modules can be passed to functions! It would be the equivalent of passing a file as a first-class item. However, modules are at a different "layer" of the language than other common concepts, so we can't pass them to _regular_ functions. Instead, we pass them to special functions called "functors".

The syntax for defining and using functors is very much like the syntax for defining and using regular functions. The primary differences are:

- Functors use the `module` keyword instead of `let`.
- Functors take modules as arguments and return a module.
- Functors _require_ annotating arguments.
- Functors must start with a capital letter (just like modules/signatures).

Here's an example `MakeSet` functor, that takes in a module of the type `Comparable` and returns a new set that can contain such comparable items.

```dart prelude
module type Comparable = {
  type t
  var equal: (t, t) => bool
}

module MakeSet (Item: Comparable) => {
  // let's use a list as our naive backing data structure
  type backingType = list<Item.t>
  var empty = list{}
  var add = (currentSet: backingType, newItem: Item.t): backingType =>
    // if item exists
    if List.exists(x => Item.equal(x, newItem), currentSet) {
      currentSet // return the same (immutable) set (a list really)
    } else {
      list{
        newItem,
        ...currentSet // prepend to the set and return it
      }
    }
}
```

Functors can be applied using function application syntax. In this case, we're creating a set, whose items are pairs of integers.

```dart
module IntPair {
  type t = (int, int)
  var equal = ((x1: int, y1: int), (x2, y2)) => x1 == x2 && y1 == y2
  var create = (x, y) => (x, y)
}

/* IntPair abides by the Comparable signature required by MakeSet */
module SetOfIntPairs MakeSet(IntPair)
```

### Module functions types

Like with module types, functor types also act to constrain and hide what we may assume about functors. The syntax for functor types are consistent with those for function types, but with types capitalized to represent the signatures of modules the functor accepts as arguments and return values. In the previous example, we're exposing the backing type of a set; by giving `MakeSet` a functor signature, we can hide the underlying data structure!

```dart
module type Comparable = ...

module type MakeSetType = (Item: Comparable) => {
  type backingType
  var empty: backingType
  var add: (backingType, Item.t) => backingType
}

module MakeSet: MakeSetType = (Item: Comparable) => {
  ...
}
```

## JSX

If you're not a React developer, or don't use JSX in your day to day, then you should quickly skip over this section and pretend you didn't see anything!

JSX is one of Protea's defining features: embedded HTML. Create components, style them, pass them around, and add functionality to them. Protea's JSX looks very similar to React and ReasonML JSX, but with very notable differences.

### HTML5 Components

For the most part, HTML code have literals just like any other data structure.

```dart
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
```

You can leave out the closing tag name if you want, so you don't have to repeat yourself. This is what's known as a short tag.

```dart
<h1>This is a heading</>
<p>This is a paragraph.</>
```

Self closing tags with no content or children are always written this way.

```dart
<br/>
<input type='text'/>
```

You can use any name for your tags. Built-in HTML tags such as `strong`, `em`, `button` and `div` are already pre-defined.

### Attributes

Attributes in PROTEA-JSX work the same way as props in JSX, in that you can include any value or expression in addition to strings.

```dart
compo Hello(var toWhat: str) = <div>Hello $toWhat</div>
DOM.render<Hello toWhat="World"/>
```

You can also assign CSS properties directly to your components, and use inline styles as if they were custom properties.

```dart
<button
  name="inline styles shown here!"
  border-radius=3px
  background-color=green
  color=red
  margin=20px 40px
  padding=10px
  class="value"
>
  Button
</button>
```

There are shortcuts for `class`, `id`, `key` and `name` attributes as well:

```dart
<button
  .primary.primary-button
  #name
  *key
  &name
>
  Button
</button>

<button
  class='primary primary-button'
  id='name'
  key='key'
  name='name'
>
  Button
</button>
```

### Custom Components

You can define custom components with the `compo` keyword. Components look very similar to regular functions or classes, except return JSX which can be rendered to the DOM.

```dart
compo App {
  val greeting = 'greeting'
  val display-action = false

  <div .container>
    <h1 #greeting${x}>Hello, World</h1>
    ${display-action && <p>I am writing JSX</p>}
    <ul @for=(val emoji in emojis)>
      <li &${emoji.name}>
        <button on-click=$display-emoji-name()>
          <span
            #${emoji.name}
            role="img"
            aria-label=$emoji.name
          >
            $emoji.emoji
          </span>
        </button>
      </li>
    </ul>
  </div>
}
```

### Content

The contents inside of JSX components work the same way as double-quoted strings in Protea. You can include strings, variables and expressions, not only JSX inside there. Plus, we give you inline Markdown support.

```dart
val children = <div checked${x}=true>Hello World!</div>
<div .total.total-${obj.state}>$children</div>

<View style=$styles.container>
  <Image source=({uri: 'https://i.imgur.com/TkIrScD.png'}) style=$styles.logo/>
  <Text style=$styles.instructions>
    To share a photo from your phone with a friend, just press the `button` below!
  </Text>
</View>
```

### Punning

"Punning" refers to the syntax shorthand for when a label and a value are the same. For example, in JavaScript, instead of doing return `{name: name}`, you can do return `{name}`.

Protea's JSX supports punning. `<input checked/>` is just a shorthand for `<input checked="checked"/>`. The formatter will help you format to the punned syntax whenever possible. This is convenient in the cases where there are lots of props to pass down:

```dart
<MyComponent isLoading text onClick/>
```
