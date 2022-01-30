# Protea

Protea is a type-safe, multi-paradigm programming language that combines modern, successful concepts from other languages, while still preserving the original design of JavaScript: to be used on the frontend and backend; and to build fast, scalable and maintainable cross-platform applications with ease.

```swift
// Code
export module Fibonacci {
  public recursive function fibonacci(let n: int): int {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
x(x, y, z)
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
interface BlogPost {
  id: id!
  title: string!
  content: string!
}

// Queries
query MdxBlogPost(title: string) {
  mdx(`title == title) {
    `id: string
    `title: string
  }
}
```

---

## Overview

Protea is a language for building fullstack cross-platform apps and libraries for the modern and future web. Protea looks like JS, acts like JS, and compiles to the highest quality of clean, readable and performant JS, directly runnable in browsers and Node.

**Feature list:**

- Human-understandable error messages
- Blazing-fast compiler that outputs readable JS
- Familiar JavaScript-based syntax
- First-class JSX, CSS and GraphQL support
- Extensible syntax and macros
- Strong and robust type system
- A mix of declarative and imperative approaches
- Compilation to JavaScript or native code
- Comprehensive standard library
- Unified frontend and backend features
- Built-in testing and profiling syntax
- Support for JS, TS and other JS frameworks

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond. Protea is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

---

# Protea's Reference

This document serves as a guide to Protea's syntax and reference, and would be a big help for you if you already know some JavaScript and TypeScript. This reference is structured in a way that can be read from top to bottom, and later concepts will be easily found and recognized.

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

A Protea project is a directory that contains the following directories:

```txt
| app/ -- frontend codes
| dist/ -- compilation output
| env/ -- environment files (optional)
| node_modules/ -- Node modules (optional)
| src/ -- backend codes
| test/ -- testing codes
| types/ -- type definitions (optional)
| main.ptm -- main file (or name it something else)
| package.yaml -- Protea's config file (very similar)
| package.json -- JavaScript file
```

### New Project

```
cd ~/path/to/new-project
npm install @protea-lang/core
npm run build
node dist/src/Demo.pt.mjs
```

The `npm run build` command compiles all your code into JavaScript and uses Node to execute it. During development you would run `npm run watch` instead to watch your files and recompile them when they change.

### Integrate Into an Existing JS Project

Run the same command as above, but this time you can save it as a devDependency in your `package.json` file.

```
npm install @protea-lang/core --save-dev
npm run build
node dist/src/Demo.pt.mjs
```

Then create a Protea configuration at the root, then you can configure convenience scripts to run your files:

```json
{
  "name": "your-project-name",
  "scripts": {
    "pta:build": "pta compile /*",
    "pta:start": "pta run init"
  },
  "protea": {
    "sources": [{ "dir": "src/**" }],
    "packageSpecs": [
      {
        "module": "es6",
        "inSource": true,
        "includeLibs": true,
        "options": { "prettify": true }
      },
      {
        "module": "ts",
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

Protea source code uses one of three different file extensions:

- `.pt` for **module files**
- `.pts` for **script files**
- `.pti` for **interface files**

The starting point for a Protea project is a `main.pt` file, which is the entry point for your application. The `main.pt` file is a module file that contains a `function main()` declaration. It is required when starting a project.

Script files do not need to have a `main()` declaration, and can run other scripts, and import other modules. Script files are compiled to JavaScript and run in Node.JS.

Interface files are used to define interfaces for your application. They are compiled to either TypeScript or Flow type declaration files, which supplement the compiled JavaScript. A module file can have a corresponding interface file.

## Overview

This section serves as a comparison of how Protea's syntax differs from TypeScript's.

### Semicolons and commas

| JavaScript                  | Protea                |
| --------------------------- | --------------------- |
| Rules enforced by formatter | No semicolons needed! |

### Comments

Comments require at least a leading space or a newline.

| JavaScript             | Protea                   |
| ---------------------- | ------------------------ |
| `/* Comment */`        | Same                     |
| `// Line comment`      | Same                     |
| `/** JSDoc comment */` | Same                     |
| No JSDoc line comment  | `/// JSDoc line comment` |

### Semicolons and commas

| JavaScript     | Protea                        |
| -------------- | ----------------------------- |
| `const x = 5;` | Same                          |
| `var x = 5;`   | Same (`var` works like `let`) |
| `let x = 5;`   | Same                          |

### Numbers

JavaScript has no distinction between integers and floats.

| JavaScript                       | Protea     |
| -------------------------------- | ---------- |
| `1, 0.1`                         | Same       |
| `.1`                             | Same       |
| `1.`                             | Same       |
| `010, `                          | `008`      |
| `0b10`, `0x10`, `0o10`           | Same       |
| `10e-10`                         | Same       |
| `0x10*2**10`                     | `0x10p+10` |
| `+`, `-`, `*`, `/`, `%`, `**`    | Same       |
| `&`, `\|`, `^`, `~1`             | Same       |
| `<`, `>`, `<=`, `>=`, `==`, `!=` | Same       |
| `x != y`                         | `x <> y`   |
| `x < y ? -1 : x > y ? 1 : 0`     | `x <=> y`  |

### Strings

| JavaScript                     | Protea                   |
| ------------------------------ | ------------------------ |
| `"Hello world!"`               | Same                     |
| `'Hello world!'`               | Same                     |
| `"\0\b\t\r\v\n\f\'\"\\"`       | Same                     |
| `"\x00\u0000\u{10ffff}"`       | Same                     |
| `` String.raw`Hello world!` `` | `r'Hello world!'`        |
| `` `Hello ${name}!` ``         | `s'Hello $name!'`        |
| No string formatting           | `sf'Hello $name%upper!'` |
| `'x' + 'y'`                    | Same                     |

### Booleans and Constants

| JavaScript              | Protea               |
| ----------------------- | -------------------- |
| `true`, `false`, `null` | Same                 |
| `undefined`             | `void`               |
| `NaN`                   | `nan`                |
| `Infinity`              | `infinity`           |
| `this`                  | Same, `self`         |
| `!true`                 | Same                 |
| `&&`, `\|\|`            | Same                 |
| No XOR operator         | `x ^^ y`             |
| No deep equality        | `a == b`, `a != b`   |
| Same                    | `a === b`, `a !== b` |
| `a == b`, `a != b`      | `a =~ b`, `a !~ b`   |

### Regular expressions

Regular expressions use the same syntax as Ruby, Python and Perl, and use JavaScript to augment them.

| JavaScript          | Protea                 |
| ------------------- | ---------------------- |
| `/pattern/g`        | Same                   |
| No multi-line regex | `//pattern//g`         |
| No multi-line regex | `//pattern/replace//g` |

### Functions

Regular expressions use the same syntax as Ruby, Python and Perl, and use JavaScript to augment them.

| JavaScript | Protea |
| --- | --- |
| `arg => retVal` | `\|arg\| retVal` |
| `(arg): int => retVal` | `\|arg\|: int => retVal` |
| `function named(arg): int {...}` | Same |
| `const f = function(arg) {...} ` | Same |
| `add(4, add(5, 6))` | Same |
| `z(y(x))` | `x\|>y\|>z`, `z<\|y<\|x`, `(y+>z)(x)`, `(z<+y)(x)` |

## Basic concepts

#### Comments

Comments are the same as JavaScript, except that block comments can be nested within each other. Comments `/*` and `/**` can be nested inside other comments. Comments beginning with `///` and `/**` compile to JSDoc and support Markdown.

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

Semicolons and commas are a bit buggy in JS, but there are two simple rules regarding the insertion of semicolons and commas. The general rule is that semicolons and commas are inserted if the token on the next line can begin a statement or expression.

### Identifiers

Protea identifiers come in two flavors: regular identifiers and operators. Operators begin with any combination of alphanumerics, underscores, dashes, digits and marks (diacritics) provided it does not begin with a number and end in any number of dashes.

```swift
let regex = /\b[\pL\pPc][\pL\pM\pNd\pPc\pPd]*\b/
```

Operators consist of all Unicode punctuation `P` and symbol `S` characters except the comma `,`, semicolon `;`, single, double and backquote `'`, `"` and `` ` ``, and also the opening and closing brackets `(){}[]`.

```swift
/[\pP\pS--[,;'"`(){}\[\]]]+/
```

#### Identifier comparison

Protea uses a special comparison algorithm when comparing two names - this is to accomodate different naming conventions while not having to worry about the actual spelling of the names.

```swift
"FOOBAR" != "FooBar" != "Foo_bar" != "foo_bar"
"FOOBar" == "FOO_Bar" == "FOO-Bar"
"__FOO__BAR__" == "FOO__BAR__" == "FOOBAR"
"Foo_bar" == "Foobar" == "Foo-bar"
"fooBar" == "foobar" == "foo_bar" == "foo-bar"
"église" == "eglise"
```

The algorithm works as follows:

- Text is Unicode-normalized canonically.
- Non-alphanumeric characters are discarded
- names are case-folded to lowercase except the first few non-lowercase characters

```swift
function cmpIdent(a: string, b: string): boolean =
  transformIdent(a) == transformIdent(b)

function transformIdent(id: string): string {
  let ident = id.normalize(:nfd).replace(/[^\pL\d]/, '')
  let { begin, end } = /\b
    (?!\d) // ignore leading digits
      (?<begin>[\pPc\pL][\d\pL\pM\pPc\pPd--\pLl]*)?
      (?<end>[\d\pL\pM\pPc\pPd]*)
    \b // ignore trailing dashes
  /.exec(ident)
  return (begin + end.foldCase)
}
```

Note that this comparison does not apply to keywords, which are all written in all-lowercase.

### Keywords

A lot of the keywords in Protea are very familiar, such as `if`, `for`, `while`, `try`, but also some new ones like `redo` and `retry`. Because of how names are compared, you can use any number of non-alphanumerics to "strop" a keyword to turn it into an identifier: insert any number of leading and/or trailing underscores as you wish.

Keywords also become names when part of a qualified name, such as `x.for.then` or `y::loop`, as well as within literals such as style blocks, interfaces and JSX (with some exceptions).

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

Use `let` and `var` to declare mutable variables, and `let` or `val` to declare immutable variables.

```swift
let greeting = "hello!"
let score = 10
let newScore = 10 + score
```

All bindings are scoped to the nearest enclosing block, never outside. They are also bound to any arguments passed to the enclosing function, including the binding itself.

The value of the last line of a block is implicitly returned.

```swift
let message = {
  let part1 = "hello"
  let part2 = "world"
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
module A = {
  public let a = 3
  let b = 4
}
```

### Types

Types are what makes Protea a strongly typed language. They are used to define the type of a binding, and are used to check the type of an expression.

Protea for the most part would infer a type of a binding from its syntax. For example, the following code would infer the type of `score` to be `int`, and `add` to be `int -> int`.

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

type MyPayloadResults<errorType> = Array<Result<MyPayload, errorType>>

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

rec type Student = {taughtBy: Teacher}
rec type Teacher = {students: Array<Student>}
```

#### Shorthands

Use a `!` on an object to mark all fields in the object as required, and `?` to mark as all optional. You can also mark individual types in an object. For example, the following code defines a type `Person` which is a person with a required name and gender, and an optional occupation.

> A `data` declaration is the same as an interface in a lot of languages.

```swift
data Person {
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
data A {a: int, b: int, c: int}
data B {c: int, d: int, e: int}

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
