# Protea

```dart
// A simple todo-list project with styling
// Taken from https://selom.medium.com/todo-app-with-react-js-part-2-styled-components-de7bebdc8bb5
use React

style FormInput as input {
  width: 235px
  outline: none
  fontSize: 13px
  paddingTop: 7px
  paddingBottom: 7px
  paddingLeft: 10px
}

elem TodoForm = <form>
  <FormInput placeholder="Enter new to-do item"/>
</form>

style List {
  listStyle: none
  overflow: hidden
  width: 100%
  marginBottom: 10px
}

style Label as label {
  float: left
  cursor: pointer
}

style Button as button {
  float: right
  background: tomato
  color: #FFF
  borderRadius: 3px
  border: 2px solid tomato
  padding: 3px 10px
  outline: none
  cursor: pointer
}

elem TodoItem(
  req val title: str,
  req val id: str
) = <List>
  <Label for=$id>
    <input checkbox #$id/>
    <span>$title</span>
  </Label>
  <Button button icon=trash>
    Delete
  </Button>
</List>

style Container as div {
  width: 250px
  margin: 10px auto
  fontFamily: [arial, helvetica, sans-serif]
  fontSize: 13px
}

elem App = <Container>
  <TodoForm/>
  <TodoList/>
</Container>

React.render(App, doc.getId(:app))
```

---

## Introduction

Protea is a type-safe, multi-paradigm programming language with a familiar syntax for building cross-platform full-stack applications and libraries with a single programming language. It is created out of the frustration of JavaScript with many developers, while still embracing many of its best features.

### Optimized for the entire stack

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

This document mainly serves as a guide to the its design and semantics, and will touch a bit on the implementation.

---

# Protea's Reference

This document is a guide to Protea's syntax and features. If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond. Protea is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar. This document mainly serves as a guide to the its design and semantics, and will touch a bit on the implementation.

## Hello World!

```dart
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

- Identifiers, for example `foo`, `foo.bar`, and `+`.
- Blocks and statements, for example: `x = 42` and `match ((x, y)) { case ((1, "hi")) 42 }`
- Literals, for example: `1`, `"hello"`, `[1, 2, 3]`.
- Comments, for example `// this is a comment`.
- Punctuation, for example `\`, `[`, `]` and `;`.

### Punctuation

#### Comments

There are four kinds of comments in Protea: line comments, block comments, doc comments and multiline doc comments. The first two are ignored by the compiler and the last two are used by the compiler to generate documentation.

Every line in documentation comments do not need to start with an asterisk, they would be automatically inserted by the compiler when compiling to JavaScript.

```dart
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

In other languages, inserting semicolons to separate statements is required. In JavaScript, this is not necessary, but it is buggy and sometimes inconsistent.

In Protea, semicolons and commas are inserted if the token on the next line can begin an expression, which is any token excluding a closing bracket, [infix operator](#infix-operator), and the keywords `then`, `elif`, `else`, `catch` and `after`.

The rules for parsing commas are the same as semicolons, except they are used to separate expressions, not necessarily statements.

### Identifiers

Protea identifiers come in two flavors: regular and operator identifiers.

- Regular identifiers begin with a letter then followed by any number of diacritical marks, letters, numbers, underscores, and hyphens. Trailing hyphens are not allowed.
- Operators consist entirely of the characters `!#$%&()*+-./:<=>?@^_|~` and any other symbol and punctuation character. For example, `+`, `_`, `<>`, and `>>=` are valid operators.

Non-lowercase letters are considered uppercase.

#### Identifier comparison

Protea uses an unorthodox comparison algorithm when comparing two identifiers. This is to accommodate different naming conventions without having to worry about the actual spelling of the identifiers.

The exception with respect to the first non-lowercase letters allows common code like `var foo: Foo == FOO` to be parsed unambiguously.

```dart
"FOOBAR" != "FooBar" != "Foo_bar" != "foo_bar"
"FOOBar" == "FOO_Bar" == "FOO-Bar"
"FOO__BAR__" == "FOOBAR"
"Foo_bar" == "Foobar" == "Foo-bar"
"fooBar" == "foobar" == "foo_bar" == "foo-bar"
"église" == "eglise"
```

Several transforms are performed before identifiers are compared:

- Text is Unicode-normalized canonically.
- Non-alphanumeric characters are discarded
- Identifiers are case-folded to lowercase except the first few non-lowercase characters

```dart
func cmpIdent(a: str, b: str): bool = normalize(a) == normalize(b)

func normalize(id: str): str {
  val ident = id.decompose(:nfd).replace(`[^\pL\d]` ``)
  val { begin, end } = ident.match(`\b
    (?!\d) // ignore leading digits
      (?<begin>[\pPc\pL][\d\pL\pM\pPc\pPd--\pLl]*)?
      (?<end>[\d\pL\pM\pPc\pPd]*)
    \b // ignore trailing dashes
  `)
  return (begin + end.foldCase)
}
```

Note that this comparison does not apply to keywords, which are all written in all-lowercase.

### Keywords

The following names are reserved by Protea and cannot be used as identifiers:

```dart
in of as is new to til thru by del unset ref and or xor not
var val func proc type class data enum module iter macro inter object trait style elem prop
do then def go defer with from where if elif else for each loop while try throw catch after match case fail
goto pass break next redo retry return yield await mark use show hide route
debug assert check
true false null nan void infin it this that self super args ctor proto
```

Modifier keywords go before a declaration keyword (second line of keywords above) and hence are treated as keywords in the grammar.

```dart
pub priv prot final over immut mut
global local intern extern imply exply

seal abst impure pure early late covar
contra async sync stat dyn lazy eager
bound free uniq struct

rec oper curry inline prefix suffix infix
left right binary unary
```

Some of these modifiers are for future use.

Because of how identifiers are compared, you can use any number of non-alphanumerics to "strop" a keyword to turn it into an identifier.

Keywords also become identifiers when part of a qualified name, such as `x.for.then` or `y::loop`, as well as within literals such as style blocks, interfaces and JSX (with some exceptions).

```dart
var var_ = "Hello Stropping"
type obj = {type: int}
val object_ = new obj(type_: 9)
assert object_ is obj
assert object_.type == 9
var var_ = 42; val val_ = 8
assert var_ + val_ == 50
var assert_ = true
assert assert_
```

### Terminators

Protea is a line-oriented language where expressions may be terminated with semicolons and newlines, and commas inside bracketed literals. A newline in a source text is considered a token if these criteria are met:

- The last token in the line ends an expression;
- The first token in the next line begins an expression;
- The token appears in a region where newlines are enabled.

The tokens that can terminate an expression are:

- an identifier
- a literal
- a closing bracket
- a suffix operator
- a control transfer keyword (fourth group of keywords above)

Newlines are enabled in:

- all of a Trinity source file, except for regions where newlines are disabled, and
- between pairs of brackets

...and disabled in:

- control structures
- declarations
- imports
- control transfer statements

...except for nested regions where newlines are enabled.

For brevity purposes, a semicolon or comma can be omitted before a closing bracket, so `[1, 2, 3]` is the same as `[1, 2, 3,]` and so on.

## Literals

### Numbers

Numeric literals are either integers or floating point numbers, though they can be extended to include other types such as unsigned, rational, complex and imaginary numbers, and whether or not the number is arbitrary-precision.

#### Integers

An integer literal is a sequence of digits. An optional prefix sets a non-decimal base: `0b` for binary, `0o` for octal, `0x` for hexadecimal. In hexadecimal literals, letters `a` thru `f` (or `A` thru `F`) represent values 10 thru 15.

For readability, underscore characters `_` may appear between digits. Leading zeroes may also appear at the beginning of said literal or after the prefix of multi-base literals.

```dart
1 // int
1n // nat
1i // int
1ln // int

18446744073709551616 // bigint
18_446_744_073_709_551_616 // bigint

decimal = 11256099
hex = 0x0123456789ABCDEF
octal = 0o52740443
binary = 0b101010111100000100100011
```

#### Floating points

A decimal floating point literal consists of a mantissa and an exponent. The mantissa consists of an integer and a fractional part, and both must be present. The exponent is optional, and can have an optional sign. The exponent scales the mantissa (integer and fractional part) by powers of 10.

A binary, octal or hexadecimal floating literal is structured the same way as a decimal floating point literal except that the exponent scales the mantissa by powers of 2, and is prefixed with `0b`, `0o` or `0x` respectively.

```dart
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

Several suffixes can be used in conjunction with one another, as shown above.

- `n` for unsigned
- `l` for arbitrary-precision (i.e long)
- `i` for imaginary numbers
- `r` for rational numbers
- `f` for floating point literals

### Strings

A string literal consists of a character sequence enclosed in either single or double quotes. Strings in Protea are a superset of strings in JavaScript.

```dart
val string1 = "A string primitive";
val string2 = 'Also a string primitive';
val regex1 = `This is a regex literal`;
```

String literals can have one or more of four unique prefixes immediately before the opening quote, in any order and combination:

- `r` which marks a string literal as verbatim (i.e. disables escapes)
- `s` which enables interpolation
- `f` which enables formatting
- `p` which enables parameter placeholders to be embedded inside a string

The `f` flag requires either `s` or `p` flags to be enabled.

The verbatim form is enclosed in single quotes, while the interpreted form is enclosed in double quotes. Double quoted string literals allow for interpolation and formatting, in addition to escapes.

String literals can also be delimited by at least three single or double quotes, provided they end with _at least_ that many quotes of the same type. The rules for single- and double-quoted strings also apply.

Some transformations are applied to string literals of this type:

- all beginning and ending newlines and whitespace are discarded
- newlines are normalized to `\n` and carriage returns discarded
- all beginning indentation is based on the column of the opening quote, discarding whitespace as needed.

```dart
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

```dart
"日本語"
'日本語'
"\u65e5\u672c\u8a9e"
"\u0065e5\u0672c\u8a9e"
"\x{E6,97,A5 E6,9C,AC E8,AA,9E}"
```

The same escape characters when followed immediately by curly brackets are used to encode code points or byte sequences without reusing and repeating the same syntax again. You can use commas, semicolons or spaces to separate the numbers, and each running sequence is checked for validity.

```dart
decimal = "\112569"
hex = "\xABC12"
octal = "\o52740"
binary = "\b10101011110000010010"

// "HELLO"
"\x48\x45\x4c\x4c\x4f" == "\x{48 45 4c 4c 4f}"
"\d{72 69 76 76 79 65535}" == "\72\69\76\76\79"
```

The escape `\N` is used to represent a Unicode character sequences using a special notation reminiscent of LaTeX notation. The first argument can either be a name or its script, followed by the `:letter_name` or `.letter_form`.

For instance `\NA` would equal capital A, and `\NAlpha` would equal the Greek capital letter `Α` (alpha).

Use the same format within curly brackets to return multiple Unicode characters, and pass on multiple characters and spread their properties.

```dart
// => "\u{1F60A}"
"\u{1F600}" // => "😀"
"\Nemoji:smile" // => 😀
"\Nflag:SG" // => 🇸🇬
"\Nkr{an nyeong ha se yo}" // 안녕하세요
```

All other escapes are interpreted as the character itself, and would evaluate to the same value, just without the backslash.

### Interpolation

All forms of string literals allow expressions and variables to be interpolated into strings; simply put, the expression is evaluated and its result is substituted into the string.

The most general form of interpolation encloses an expression in between `${` and `}`, i.e. `${expression}`. The expression enclosed in the braces that follow the leading `$` is a block statement.

Escaping rules apply, so either `$` or `{` can be escaped in a backslash, and `$` is doubled.

The simpler form consists of a `$`-sign without having to write curly braces around the expression. A subset of these expressions are supported, as shown below. Between the brackets, expressions and block statements are allowed.

- a single identifier: `name`
- a qualified name: `x.y.z` or `x::y::z`
- an object accessor: `x[1]`
- a function call: `fn()`
- a type casting operation: `<int>`
- a type assertion: `name{int}`
- and any combination of the like

```dart
val greeting = "Hello $name!"
val greeting = "Hello $name.upper(){str}!"
val greeting = "Hello ${name.upper()}!"
```

The expanded expression is type-checked as with all other expressions, and can be explicitly specified using either postfix curly or angle brackets. If the types are compatible, the expression is evaluated and the result is converted to the type of the placeholder. If the types are not compatible, a type error is raised.

### Formatting

Formatting transforms the string value of the interpolated expression into a string. Formatting is done by specifying a value, and a set of arguments. The format string is a sequence of characters that specifies how the interpolated expression is to be formatted. The format arguments are the methods to be performed, in order, on the interpolated expression before it is "inserted" into the string.

```dart
"Hello ${"world"}"
"Hello ${"world"}%upper" // => "Hello WORLD"
"${1234567890}%sep:(',')|sep:(id + 1)" // => "1,234,567,890"
"Percentage correct answers: ${2 / 3}%dp:2|unit:('%')"
```

### Symbols

Symbols represent names and strings available throughout a program's execution. They are generated using the `:name` or `:"string"` literal syntax. beginning with a colon, or by various methods that return symbols.

Symbols are unique identifiers that can be used to refer to the same string or name in different contexts. Thus if `Fred` is a constant in one context, a method in another, and a class in a third, the symbol `:Fred` will be the same object in all three contexts.

Protea's symbol API uses the JavaScript Symbol API as the backend. This means that symbols are not unique across contexts, and that they can be used as keys in maps. Interpolation, formatting and template strings can use symbols as placeholders, but not the other way around.

```dart
$symbolLit = `':' (?/
  $identifier | $singleMultiQuote | $singleQuote | $doubleMultiQuote | $doubleQuote
)`

$doubleMultiQuote = ` (?<open> '"'{3,}) ( $escape | .* )+ \k<open> (?! '"') `
$doubleQuote = ` '"' ( $escape | .* )+ '"' (?! "'"+) `
$singleMultiQuote = ` (?<open> "'"{3,}) ( .* )+ \k<open> (?! "'") `
$singleQuote = ` "'" ( "''" | .* )+ "'" (?! "'"+)`
```

### Regular Expressions

Protea's regular expressions are delimited using backticks ` `` ` rather than single or double quotes as with strings. The syntax resembles JavaScript's, but with many extensions inspired by other regex flavors, including Python, Ruby and Perl.

Spacing is always ignored and comments can be inserted however you see fit. You can even 'quote' inside regular expressions by inserting strings literally inside the regex, and all spacing will be kept as is between the quotes. Interpolation and formatting also applies but the interpolated result is usually 'quoted' so to prevent generating invalid regular expressions.

```dart
$regexLit = `(
  $stringLit |
  $escape |
  $group |
  $charClass
  $interpolation |
  $formatting |
  $placeholder
)`
```
