# SagaScript: A Great Alternative to JavaScript

SagaScript is a type-safe, multi-paradigm programming language that combines modern, successful concepts from other languages, while still preserving the original design of JavaScript: to be used on the frontend and backend; and to build fast, scalable and maintainable cross-platform applications with ease.

```swift
// Code
export module Fibonacci {
  public recursive function fibonacci(let n: Int): Int {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// Styling
style App as body {
  color: ${|props|
    props.theme == `purple ? `purple : `white};
}

// JSX support
element HelloMessage implements React.Component {
  property yourName: string
  return <div #greeting>
    <h1 color=navyBlue>Hello $yourName</h1>
  </div>;
}

// Schemas
model BlogPost {
  id       : Int @id @default(this.autoIncrement())
  title    : String
  content  : String?
  published: Boolean | String @default(false)
  author   : User? @relation(fields: [authorId], references: [id])
  authorId : Int?
}

// Queries
query MdxBlogPost(title: String) {
  mdx(`title == title) {
    `id: String
    `title: String
  }
}
```

---

## Overview

SagaScript is a language for building fullstack cross-platform apps and libraries for the modern and future web. SagaScript looks like JS, acts like JS, and compiles to the highest quality of clean, readable and performant JS, directly runnable in browsers and Node.

**Feature list:**

- Human-understandable error messages
- Blazing-fast compiler that outputs readable JS
- Syntax inspired by modern languages, while still keeping its JavaScript style
- First-class syntactic support for:
  - Components
  - Styling
  - Schemas
  - Queries
  - Testing
- First-class JSX, CSS and GraphQL support
- Strong and robust type system
- A mix of declarative and imperative approaches
- Compilation to JavaScript or native code
- Comprehensive standard library
- Support for JS, TS and other JS frameworks

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond. SagaScript is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

---

# SagaScript's Reference

This document serves as a guide to SagaScript's syntax and reference, and would be a big help for you if you already know some JavaScript and TypeScript. This reference is structured in a way that can be read from top to bottom, and later concepts will be easily found and recognized.

SagaScript is inspired by many modern languages, such as Scala, Kotlin, Go, ReScript, Rust, C# and some other modern languages, while still maintaining a familiar syntax and design to JavaScript, Flow and TypeScript.

## Hello World!

```swift
// Backend
function main(): void {
  console.log('Hello World!')
}

// Frontend
element App {
  <div>
    <h1>Hello, world!</h1>
  </div>
}
```

## Installation and Project Structure

A SagaScript project is a directory that contains the following directories:

- `app/`: frontend code
- `src/`: backend code
- `lib/`: libraries
- `test/`: testing codes
- `types/`: type definitions
- `main.ptm`: main file (or name it something else)
- `package.yml`: SagaScript's config file (very similar)

### New Project

```
cd ~/path/to/new-project
npm install @SagaScript-lang/core
npm run build
node dist/src/Demo.pt.mjs
```

The `npm run build` command compiles all your code into JavaScript and uses Node to execute it. During development you would run `npm run watch` instead to watch your files and recompile them when they change.

### Integrate Into an Existing JS Project

Run the same command as above, but this time you can save it as a devDependency in your `package.json` file.

```
npm install @SagaScript-lang/core --save-dev
npm run build
node dist/src/demo.pt.mjs
```

Then create a SagaScript configuration at the root, then you can configure convenience scripts to run your files:

```json
{
  "name": "your-project-name",
  "scripts": {
    "pta:build": "pta compile /*",
    "pta:start": "pta run init"
  },
  "SagaScript": {
    "sources": [{ "dir": "src/**" }],
    "packageSpecs": [
      {
        "module": "es6",
        "inSource": true,
        "includeLibs": true,
        "options": { "prettify": true }
      }
    ],
    "suffix": ".pt.mjs",
    "dependencies": { "three": "^0.0.1" }
  }
}
```

### File extensions

SagaScript source code uses one of three different file extensions:

- `.sga` for **module files**
- `.sgs` for **script files**
- `.sgi` for **interface files**

The starting point for a SagaScript project is a `main.pt` file, which is the entry point for your application. The `main.pt` file is a module file that contains a `function main()` declaration. It is required when starting a project.

Script files do not need to have a `main()` declaration, and can run other scripts, and import other modules. Script files are compiled to JavaScript and run in Node.JS.

Interface files are used to define interfaces for your application. They are compiled to either TypeScript or Flow type declaration files, which supplement the compiled JavaScript. A module file can have a corresponding interface file.

### Concepts

#### Comments

Block comments `/*` and `//*` can be nested. `///` and `/**` are used for documentation purposes.

```swift
// This is a single line comment.
/*
  This is a multiline comment.
  /* It can be nested. */
*/

/// This is a single line documentation comment.
/**
  This is a multiline documentation comment
  /* It can be nested. */
*/
```

#### Semicolons and commas

Semicolons and commas in SagaScript are optional and you can use newlines to separate expressions or statements. The general rule is that semicolons and commas are inserted if the token on the next line can begin a statement or expression.

```swift
function main() { println("hello") }
```

### Identifiers

There are two types of identifiers in SagaScript: regular identifiers and operators.

Regular identifiers begin with a letter or underscore, followed by any number of letters, numbers, underscores or combining marks and separated by dashes.

```swift
let regex = /\b[\pL\pPc][\pL\pM\pNd\pPc\pPd]*\b/
```

Operators consist of any combination of Unicode punctuation or symbol characters excluding the semicolon, comma, quotes, backtick and opening/closing brackets.

```swift
/[\pP\pS--[,;'"`(){}\[\]]]+/
```

#### Identifier comparison

Two identifiers are considered equal if the following condition result returns true:

```swift
method String.identEquals(b: string): boolean =
  this.asIdent() == b.asIdent()

method String.asIdent(): string {
  let ident = id
    // decompose into Unicode NFD
    .normalize(:nfd)
    // remove dashes, underscores and marks
    .replace(/[^\pL\pNd]/, '')

  let { begin, end } = /
    // ignore leading digits
    (?!\pNd)
      // match uppercase
      (?<begin> [\pL\pPc] [\pL\pM\pNd\pPc\pPd--\pLl]*)?
      // then lowercase
      (?<end> [\pL\pM\pNd\pPc\pPd]*)
    // ignore trailing dashes
    \b
  /.exec(ident)

  // leave beginning as-is and
  // case-fold remainder to lowercase
  return (begin + end.lowerCase())
}

a.identEquals(b)
```

That means only the first non-lowercase letters are compared as they are manner. Other letters are compared case-insensitively and non-alphanumeric characters are ignored.

You can use your own preferred spelling style, so you won't need to remember the exact spelling of a method, constant or variable.

```swift
FOOBAR != Foo_Bar != foo_bar
FOOBar == FOO_Bar == FOO-Bar
__FOO__BAR__ == FOO__BAR__ == FOOBAR
FooBar == Foo_bar == Foobar == Foo-bar
fooBar == foobar == foo_bar == foo-bar
église == eglise
```

- Text is Unicode-normalized canonically.
- Non-alphanumeric characters are discarded
- names are case-folded to lowercase except the first few non-lowercase characters

Note that this comparison does not apply to keywords, which are all written in all-lowercase.

### Keywords

A lot of the keywords in SagaScript are very familiar, such as `if`, `for`, `while`, `try`, but also some new ones like `redo` and `retry`.

Keywords are written entirely in lowercase. Because of this, you can use workarounds to turn them into identifiers: `if` can be written as `if_`, `iF` or `i_f`. They are also ignored when part of a qualified name, such as `x.for`, as well as within literals such as style blocks, interfaces and JSX (with some exceptions).

Refer to the Appendix for the list of keywords.

```swift
var _var = "Hello Stropping"
type obj = { type: int }
let _object_ = new obj(~type = 9)
assert _object_ is obj
assert _object_.type == 9
var _var = 42; let let_ = 8
assert _var + let_ == 50
var assert_ = true
assert assert_
```

### Bindings

Use `let` and `var` to declare mutable variables, and `const` or `val` to declare immutable variables. Note that SagaScript's `var` behaves and compiles to `let`. The `val` keyword is a synonym for `const`.

```swift
const greeting = "hello!"
const score = 10
const newScore = 10 + score
```

All bindings are scoped to the nearest enclosing block, never outside. They are also bound to any arguments passed to the enclosing function, including the binding itself.

The value of the last line of a block is implicitly returned.

```swift
const message = {
  const part1 = "hello"
  const part2 = "world"
  part1 ++ " " ++ part2
}
// `part1` and `part2` not accessible here!
```

All the code blocks and functions use the same block scoping mechanism.

```swift
if (displayGreeting) {
  let message = "Enjoying the docs so far?"
  print(message)
}

for (let i = 0; i < 1000; i += 1) {
  let message = "This is a loop"
  print(message)
}
```

All bindings are private by default; they can be made public by using the `public` or `export` keyword.

```swift
module A {
  public let a = 3
  let b = 4
}
```

### Data Types

SagaScript comes with a number of built-in data types, including numbers, strings, booleans, but also maps, sets, arrays, tuples, functions and regular expressions.

```swift
val int: Integer = 4
var float: Float = 4.5
val string: String = "hello"
val bool: Boolean = true
val regex: RegExp = /\b\c(\w*\i)?\b/
val map: Map = { foo: "bar" }
val set: Set = { :foo, "bar" }
val array: Array = [1, 2, 3]
val tuple: Tuple = (1, 2, 3)
val func: Function = |x: int, y: int| { x + y }
```

There are two basic types of numeric literals: integers and floats. They can be extended with the help of type suffixes or operations with other numeric types: unsigned, imaginary, rational and complex numbers, and even arbitrary-precision `big` numbers.

Numeric literals are case-insensitive.

#### Integers

For readability, underscore characters `_` may appear between digits. Leading zeroes may also appear at the beginning of said literal or after the prefix of multi-base literals.

```swift
1 // int
1u // nat
1i // int
1un // bigint

18446744073709551616 // bigint
18_446_744_073_709_551_616 // bigint

decimal = 11256099
hex = 0x0123456789ABCDEF
octal = 0o52740443
binary = 0b101010111100000100100011
```

#### Floating points

A binary, octal or hexadecimal floating literal is structured the same way as a decimal one except that the exponent scales the mantissa by powers of 2, and is prefixed with `0b`, `0o` or `0x` respectively.

Underscores may appear between digits in the mantissa. Leading zeroes may also appear at the beginning of the mantissa.

```swift
1.0  // float
1.0f // float
1f   // float
1r   // rat

1j     // imag
1 + 1j // comp

decimal = 11256099.012e+14
hex = 0xABC1234.012p-40
octal = 0o52740443.012p-40
binary = 0b10101011110.0000100100011p-40
```

#### Suffixes

Several suffixes can be used in conjunction with one another, as shown in the previous example with floats.

- `n` for unsigned
- `l` for arbitrary-precision (i.e long)
- `i` for imaginary numbers
- `r` for rational numbers
- `f` for floating point literals

### Strings

A string literal consists of a character sequence enclosed in either single or double quotes. By default, strings are escaped with a backslash. All escapes except triple-digit octal sequences are supported.

```swift
val string1 = "A string primitive";
val string2 = 'Also a string primitive';
```

Normally these escapes are interpreted as the character itself, and would evaluate to the same value, just without the backslash.

String literals can also be delimited by at least three single or double quotes, provided they end with _at least_ that many quotes of the same type. The rules for single- and double-quoted strings also apply.

Some transformations are applied to string literals of this type:

- all beginning and ending newlines and whitespace are discarded
- newlines are normalized to `\n` and carriage returns discarded
- all beginning indentation is based on the column of the opening quote, discarding whitespace as needed.

```swift
val greeting =
assert '"
Hello World
"' == greeting
```

### Escapes

Escape sequences are used to represent characters that would otherwise have a syntax error. Like a lot of languages, all escapes begin with a backslash. The first character of an escape sequence is the escape character, and the second character is the character to be escaped.

Certain single-letter escapes represent non-printable, control characters:

```
\a    U+0007  alert or bell
\b    U+0008  backspace
\e    U+000B  escape
\f    U+000C  form feed
\n    U+000A  line feed or newline
\p            platform-dependent newline
\r    U+000D  carriage return
\s    U+0020  space
\t    U+0009  horizontal tab
\v    U+000B  vertical tab
\c[A-Za-z]    control character
```

A backslash-newline joins the next line to the current line, skipping any indentation.

The escapes `\b`, `\d`, `\o`, `\u` and `\x`, allow you to encode Unicode code points as integers in a double-quoted string. The value of the literal is the value represented by the digits in the corresponding base. Any escape that also exceeds the upper limit of 0x10FFFF (decimal 1114111) will give a compile time error.

```
\b[01]+         binary
\d[0-9]+        decimal
\o[0-7]+        octal
\u[0-9A-Fa-f]+  hexadecimal (UTF-16)
\x[0-9A-Fa-f]+  hexadecimal (UTF-8)
\N($id&*[:.])   unicode name where $id is an identifier
```

Code points in the ranges `80-FF` for `\x` and `D800-DFFF` for `\u` which are used to represent multi-byte characters or surrogate pairs respectively; they hence would be invalid if they appear on their own or form an invalid byte/character sequence.

```swift
"日本語"
'日本語'
"\u65e5\u672c\u8a9e"
"\u0065e5\u0672c\u8a9e"
"\x{E6,97,A5 E6,9C,AC E8,AA,9E}"
```

The same escape characters when followed immediately by curly brackets are used to encode code points or byte sequences without reusing and repeating the same syntax again. You can use commas, semicolons or spaces to separate the numbers, and each running sequence is checked for validity.

```swift
decimal = "\112569"
hex = "\xABC12"
octal = "\o52740"
binary = "\b10101011110000010010"

// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 79 65535}" == "\72\69\76\76\79"
```

The escape `\N` is used to represent a Unicode character sequences using a special notation reminiscent of LaTeX notation. The first argument can either be a name or its script, followed by the `:letter_name` or `.letter_form`. For instance `\NA` would equal capital A, and `\NAlpha` would equal the Greek capital letter `Α` (alpha).

```swift
// => "\u{1F60A}"
"\u{1F600}" // => "😀"
"\NPeseta" // "₧"
"\Nemoji:smile" || "\N{emoji:smile}" // => 😀
"\Nflag:SG" // => 🇸🇬
"\Nkr{an nyeong ha se yo}" // 안녕하세요
```

### Prefixes

String literals can have one or more of four unique prefixes immediately before the opening quote, in any order and combination. The `f` flag requires either the `s` and `p` flags to be enabled, while `s` and `p` cannot exist together.

| Prefix | Sigil | Description |
| --- | --- | --- |
| `r` |  | Disables backslash escaping, thereby making the string verbatim |
| `s` | `$` | Enables interpolation of variables and expressions |
| `f` | `%` | Enables formatting |
| `p` | `#` | Enables interpolation of template arguments |

These flags trigger embedding of code in the string literal, through the use of sigil prefixing. If the `r` flag is enabled, an alternative escaping method is used, which is achieved by doubling the sigil if it forms a valid embedded expression on its own.

#### Interpolation

Strings can be interpolated with variables and expressions, using the `$` sigil. The most general form of interpolation encloses a block in between `${` and `}`, i.e. `${block}`.

The simpler form consists of a `$`-sign without having to write curly braces around the expression. A subset of these expressions are supported, as shown below. Between the brackets, expressions and block statements are allowed.

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `x[ ]`
- a function call: `fn()`
- a type casting operation: `<int>`
- a type assertion: `name{int}`
- and any combination of the like

```swift
val greeting = s"Hello $name!"
val greeting = s"Hello $name.upper()!"
val greeting = s"Hello ${name.upper()}!"
```

The expanded expression is type-checked as with all other expressions, and can be explicitly specified using either postfix curly or angle brackets immediately after the expression or before the closing bracket.

### Templating

Templating is a mechanism for embedding expressions in strings, and is used to interpolate template arguments, and **return a function** as opposed to evaluating them directly. The `p` sigil prefix is used to enable this feature.

The simplest form of templating is a single variable name or numeric literal referring to the position or name of the template argument in the list of arguments, this time Those can be marked as optional or required, by prefixing it with `?` or `!`.

Defaults and aliases can be applied within `#{}`.

```swift
p"You're #{adjective=`pretty}, #{endearment='my love'}."(
  adjective=`hot, endearment=`cupcake
)

fp"Hey #name, there is a 0x#errNo%hex error!"(
  name=`John, errNo=0xb12349
)
```

### Formatting

Formatting transforms the interpolated expressions before inserting it into the string, and is composed of a sequence of directives (i.e. methods) to be performed on said value, thus "formatting" the expression.

The first directive is prefixed with the `%` sigil, followed by the name of the method to be applied. The method name can be followed by a literal or a set of arguments encased in a tuple. Further methods are chained together by a pipe `|`.

```swift
sf"Hello ${"world"}"
sf"Hello ${"world"}%upper" // => "Hello WORLD"
sf"${1234567890}%sep:(',')|sep:(id + 1)" // => "1,234,567,890"

sf"Percentage correct answers: ${2/3}%deci:2|unit:('%')"
s"Percentage correct answers: ${(2/3).deci(2).unit('%')}"
```

### Backtick strings

Protea offers another way to represent unquoted (partially quoted) strings much more efficiently. It is used to represent identifiers as strings more efficiently (thus being easier to type) without having to quote them.

The string ends as soon as the first non-word character is encountered, however you can also escape those characters by preceding it with a backslash---including spaces and newlines.

```swift
`hello
`world
`hello\ world == 'hello world'
```

### Types

Types are what makes SagaScript a strongly typed language. They are used to define the type of a binding, and are used to check the type of an expression.

SagaScript for the most part would infer a type of a binding from its syntax. For example, the following code would infer the type of `score` to be `int`, and `add` to be `int -> int`.

```swift
let score = 10
let add = |x, y| {x + y}
```

But you can also optionally write down the type, or to be more formal, annotate your value:

```swift
let score: int = 10
```

If the type annotation for `score` doesn't correspond to our inferred type for it, we'll show you an error during compilation time. We won't silently assume your type annotation is correct, unlike many other languages.

You can also wrap any expression in parentheses and annotate it:

```swift
let myInt = 5
let myInt: int = 5
let myInt = (5: int) + (4: int)
let add = |x: int, y: int|: int {x + y}
let drawCircle = |~radius as r: int|: Circle {}
```

Note: in the last line, `~radius as r: int` is a labeled argument. More on this in the function page.

#### Aliasing

You can refer to a type by a different name. They'll be equivalent:

```swift
type Score = int
let x: Score = 10
```

#### Generics

Types can accept arguments which are used to define the type of a binding.

```swift
type Coords<a> = (a, a, a)
let a: Coords<int> = (10, 20, 20)
let b: Coords<float> = (10.5, 20.5, 20.5)
```

Note that the above codes are just contrived examples for illustration purposes. Since the types are inferred, you could have just written:

```swift
let friend = (10, 20, 20)
```

The type system infers that it's a `(int, int, int)`. Nothing else needed to be written down.

Type arguments appear in many places. For example, the following code defines a type `List<T>` which is a list of values of type `T`.

```swift
// inferred as List<string>
let greetings = ["hello", "world", "how are you"]
```

Types can receive many arguments, and be composable.

```swift
// inferred as List<string>
type result<a, b> = Ok<a> | Error<b>

type MyPayload = {data: string}

type MyPayloadResults<ErrorType> = Array<Result<MyPayload, ErrorType>>

let payloadResults: MyPayloadResults<string> = [
  Ok({data: "hi"}),
  Ok({data: "bye"}),
  Error("Something wrong happened!")
]
```

#### Recursion

Types can reference themselves, and can be mutually recursive:

```swift
type JSON = (
  string | int | float | bool | null | Array | Object | JSON
)

recursive type Student = {taughtBy: Teacher}
recursive type Teacher = {students: Array<Student>}
```

#### Shorthands

Use a `!` on an object to mark all fields in the object as required, and `?` to mark as all optional. You can also mark individual types in an object. For example, the following code defines a type `Person` which is a person with a required name and gender, and an optional occupation.

> A `data` declaration is the same as an interface in a lot of languages.

```swift
interface Person {
  name: !string // required
  gender: `male + `female
  age: int // required
  occupation: ?string
}
```

The Person For example, the following code defines a type `Maybe<T>` which is either a `T` or `null`. `null` itself is either `null` or `void` which are the same as each other.

```swift
type Maybe<T> = T + null + void
type Maybe<T> = ?T // a shorthand
```

Use `+` to combine types that would otherwise be incompatible (this is only used for primitive types or for types that are not themselves generic).

```swift
type IntOrString = int + string
```

Or use set operations on objects:

```swift
type A = {a: int, b: int, c: int}
type B = {c: int, d: int, e: int}

type C = B | A // {a: int, b: int, c: int, d: int, e: int}
type D = B & A // {c: int}
type E = A ^ B // {a: int, b: int, d: int, e: int}
type F = A - B // {a: int, b: int}
```

`~` negates a type. This is useful when you want to define a type that is not the same as another type.

```swift
type Not<string> = ~string
```

Use `key` and `value` to get all the keys and values of an object as a tuple. Use `pairs` to get them both.

```swift
interface Person {
  name: !string // required
  gender: `male + `female
  age: int // required
  occupation: ?string
}

type C = B | A
```

## Primitives

_Quick overview: [Primitives](overview.md#built-in-types)_

These are the built in types that can be used to represent information and build more complex types.

### Strings

_Quick overview: [Strings](overview.md#strings)_

Create a string using double quotes:

```reason
let s = "Hello World!";
```

Concatenate strings using the `++` operator:

```reason
let s = "Hello " ++ "World!";
```

More String functions can be found in standard libraries:

- Native: [`module String`](https://reasonml.github.io/api/String.html)
- BuckleScript: [`module Js.String`](https://bucklescript.github.io/bucklescript/api/Js.String.html)

```reason
let s = String.trim("  extra whitespace\n");
/* "extra whitespace" */

let s = String.concat("\n", ["line 1", "line 2"]);
/* "Line 1\nLine 2" */

let s = String.sub("Hello World!", 6, 5);
/* "World" */
```

### Char

Create a char using single quotes:

```reason
let c = 'a';
```

Access the char at an index using `string.[index]`:

```reason
let c = "Hello".[1];
/* 'e' */
```

Convert char to string:

```reason
let s = String.make(1, 'c');
/* "c" */

let charArray = [| 'H', 'e', 'l', 'l', 'o' |];
let s = String.init(5, i => charArray[i]);
/* "Hello" */
```

## Integer

_Quick overview: [Numbers](overview.md#numbers)_

Integers are whole numbers. Their bit-size depends on the platform.

```reason
let x = 23;
let x = -23;
```

Standard operations include `+`, `-`, `*`, `/`, `mod`:

```reason
let x = 23 + 1 - 7 * 2 / 5;
let x = 13 mod 2;
```

### Integer literals

Different radix literals can be created using prefixes `0x`, `0o`, `0b`:

```reason
let decimal = 11256099;
let hex = 0xABC123;
let octal = 0o52740443;
let binary = 0b101010111100000100100011;
```

Literals can be broken up using the `_` character which will be ignored:

```reason
let trillion = 1_000_000_000_000;
```

### Bitwise operations

Use infix functions: `land`, `lor`, `lxor`, `lnot`, `lsl`, `lsr`, `asr` from [`module Pervasives`](<https://reasonml.github.io/api/Pervasives.html#VAL(land)>)

```reason
let x = 0b1010 lor 0b1100;
/* 0b1110, 14 */
```

Many bit tricks can be found here: [bithacks](http://graphics.stanford.edu/~seander/bithacks.html)

```reason
let isPowerOfTwo = x => {
  x !== 0 && x land (x - 1) === 0
};
```

## Float

_Quick overview: [Numbers](overview.md#numbers)_

Floats are 64-bit numbers that may have a decimal. They follow the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754).

```reason
let x = 23.0;
let x = 23.;
let x = -23.0;
```

Standard operations include `+.`, `-.`, `*.`, `/.`, `**`:

```reason
let x = 3.0 +. 1.0 -. 7.0 *. 2.0 /. 5.0;

/* Exponentiation */
let x = 2.0 ** 3.0;
```

## Boolean

_Quick overview: [Boolean](overview.md#boolean-values-and-logical-operations)_

Reason supports a normal set of boolean and logical operations:

- Boolean operations: `!`, `&&`, <code>&#124;&#124;</code>
- Comparison: `>`, `<`, `>=`, `<=`
- Reference equality: `===`, `!==`
- Structural equality: `==`, `!=`

```reason
let x = true;
let y = !true;
let z = x && y || false;
```
