# Protea

Protea is a type-safe, multi-paradigm programming language with a familiar syntax for building cross-platform full-stack applications and libraries with a single programming language. It is created out of the frustration of JavaScript with many developers, while still embracing many of its best features.

```swift
// Code
module Fibonacci {
  public func fibonacci(const n: int): int {
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
export default elem App with React.Component {
  return <div>
    <h1>Hello, world!</h1>
    <p>This is a React component.</p>
  </div>;
}

// GraphQL Schemas
type BlogPost {
  id: ID!
  title: String!
  content: String!
}

// GraphQL queries
query MdxBlogPost(title: str) {
  proc mdx(`title == title) {
    `id: string
    `title: string
  }
}
```

---

## Overview

Protea's _raison d'être_ is to replace JavaScript with a simple-in-concept, robustly-typed and multi-paradigm language while still serving its domains.

provide a type-safe, multi-paradigm programming language with a familiar syntax for building cross-platform full-stack applications and libraries with a single programming language. It is created out of the frustration of JavaScript with many developers, while still embracing many of its best features.

### I'll take your entire stack

- A programming language that is easy to learn, with a familiar syntax and features inspired by popular languages
- Style components with CSS them, build UIs with JSX, and bind them with data and code
- Modules, namespacing and routing for code splitting and distribution
- Define and manipulate data with schemas, queries and transformations, inspired by SQL and GraphQL
- Complete support for reactive, event-driven, asynchronous or concurrent programming

### Productive development

- Use the Protea REPL to explore the language and its features
- Make changes to your source code iteratively, using hot-reload to see the effects in real-time
- Write code with a flexible yet robust type system, with rich code analysis and powerful tooling
- Do profiling, test-driven development and code verification with a built-in testing framework

### Fast on every platform (help needed!)

- JIT-compilation to native machine code for the fastest possible performance
- Run your apps on the web with the power of JavaScript and WebAssembly
- Run backend code to support your app, while giving you access to many popular libraries across different platforms.

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond. Protea is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

---

# Protea's Reference

This document serves as a guide to Protea's syntax and reference, and would probably be a big help for you if you already know some JavaScript and TypeScript. This reference is structured in a way that can be read from top to bottom,

## Hello World!

```swift
// Backend
proc main(): void {
  print("Hello, world!")
}

// Frontend
elem App {
  <div>
    <h1>Hello, world!</h1>
  </div>
}
```

### Source code representation

Protea source code uses one of three different file extensions: `.pta`, `.pts` and `.pti`. `.pta` files are used to define modules and `.pti` files to define interfaces (which, by the way, can also be mixed with the source code). `.pts` files are used to create scripts, which do not need to run through a `main` or startup function.

The `.pta` extension is also used by the Parrot compiler.

## Lexical elements

This section describes the syntax and informal semantics of Protea expressions. The following is a list of the most important lexical elements:

- names, for example `foo`, `foo.bar`, and `+`.
- Blocks and statements, for example: `x = 42` and `match((x, y)){case((1, "hi"))42}`
- Literals, for example: `1`, `"hello"`, `[1, 2, 3]`.
- Comments, for example `// this is a comment`.
- Punctuation, for example `\`, `[`, `]` and `;`.

### Punctuation

#### Comments

Comments `/*` and `/**` can be nested inside other comments. Comments beginning with `///` and `/**` compile to JSDoc and support Markdown.

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

Rules regarding semicolons and commas are a bit convoluted in JavaScript and may work in mysterious ways. In Protea, both semicolons and commas are optional, but they are required in some cases especially when separating expressions.

The general rule is that semicolons and commas are inserted if the token on the next line can begin an expression, which is any token excluding a closing bracket, infix operator and the keywords `then`, `elsif`, `else`, `catch` and `finally`.

The rules for parsing commas are the same as semicolons, except they are used to separate expressions, not necessarily statements.

### Identifiers

Protea identifiers come in two flavors: regular identifiers and operators.

- Identifiers begin with a letter then followed by any number of diacritical marks, letters, numbers, underscores, and hyphens. Trailing hyphens are not allowed.
- Operators consist entirely of the characters `!#$%&()*+-./:<=>?@^_|~` and any other symbol and punctuation character. For example, `+`, `_`, `<>`, and `>>=` are valid operators.

Non-lowercase letters are considered uppercase.

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
func cmpIdent(a: string, b: string): boolean =
  transformIdent(a) == transformIdent(b)

func transformIdent(id: string): string {
  const ident = id.normalize(:nfd).replace(/[^\pL\d]/, '')
  const { begin, end } = /\b
    (?!\d) // ignore leading digits
      (?<begin>[\pPc\pL][\d\p{L:l}\pM\pPc\pPd]*)?
      (?<end>[\d\pL\pM\pPc\pPd]*)
    \b // ignore trailing dashes
  /.exec(ident)
  return (begin + end.foldCase)
}
```

Note that this comparison does not apply to keywords, which are all written in all-lowercase.

### Keywords

Because of how names are compared, you can use any number of non-alphanumerics to "strop" a keyword to turn it into an identifier.

Keywords also become names when part of a qualified name, such as `x.for.then` or `y::loop`, as well as within literals such as style blocks, interfaces and JSX (with some exceptions).

```swift
var var_ = "Hello Stropping"
type obj = { type: int }
val object_ = new obj(~type = 9)
assert object_ is obj
assert object_.type == 9
var var_ = 42; val val_ = 8
assert var_ + val_ == 50
var assert_ = true
assert assert_
```

### Scoping

Variables are scoped to the nearest enclosing block, shadowing it wherever possible. As soon as a variable is declared, it is visible everywhere in the enclosing block but not outside. There is no hoisting, so you cannot use a variable before it is declared.

This is different from JavaScript and the `var` keyword where variables are visible everywhere in the enclosing function.

```swift
const x = do {
  const y = 42
  print(y) // 42
  y
}
print(y) // error: y is not defined
```

## Literals

### Numbers

There are two basic types of numeric literals: integers and floats. They can be extended with the help of type suffixes or operations with other numeric types: unsigned, imaginary, rational and complex numbers, and even arbitrary-precision `big` numbers.

Numeric literals are case-insensitive.

#### Integers

For readability, underscore characters `_` may appear between digits. Leading zeroes may also appear at the beginning of said literal or after the prefix of multi-base literals.

```swift
1 // int
1n // nat
1i // int
1ln // bigint

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
val greeting = s"Hello $name.upper(){str}!"
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

`

### Symbols

Symbols represent pre-defined identifiers and strings, and compile to strings at runtime. The `:` sigil prefix is used to create a symbol. They are used to represent identifiers, and can be used as keys in maps and other collections.

They are generated using the `:identifier` or `:"string"` literal syntax, beginning with a colon, or by through methods that return symbols.

Interpolation, formatting and template strings can use symbols as placeholders in which they are explicitly converted into strings.

On the other hand, symbols cannot be used to create calculated identifiers since they are pre-compiled. For this reason, symbols are not allowed in interpolation, formatting or templating, but are explicitly converted from strings.

```swift
val obj = #{}

obj.a = 'a'
obj[:b] = 'b'
obj::c = 'c'

for (val i of obj) print(i) // logs :a, :b, "c"
```

### Regular Expressions

Protea's regular expressions are delimited using backticks rather than single or double quotes. The syntax resembles JavaScript's, but with many extensions inspired by other regex flavors, including Python, Ruby and Perl.

Spacing is always ignored and comments can be inserted however you see fit. You can even 'quote' inside regular expressions by inserting strings literally inside the regex, and all spacing will be kept as is between the quotes. Interpolation and formatting also applies but the interpolated result is usually 'quoted' so to prevent generating invalid regular expressions.

```swift

```
