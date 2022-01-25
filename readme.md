# Protea

```dart
elem TodoItem {
  prop color = style { color: '#333' }
  prop label_ = ''
  prop done = false

  proc onClick { done = true }

  style base {
    alignItems: center
    display: flex
  } label_ {
    fontWeight: bold
    color: $color !important
    flex: 1
    if (done)
      textDecoration: lineThrough
  }

  return <div>
    <span>$label_</span>
    <Icons.Checkmark/>
    <Icons.Trash/>
  </div>
}
```

---

## Introduction

Protea is a type-safe and multi-paradigm programming language designed to be used in building cross-platform client- and server-side applications, with a focus on performance and simplicity. It was born out of the overall frustration of the JavaScript ecosystem and language, while still embracing the "JS everywhere" paradigm.

Protra comes with a lightning-fast compiler that outputs a highly optimized and performant JavaScript code, while keeping a syntax that looks like it, while avoiding many of the mistakes from languages past. and the ecosystem within your reach. You can also use Protea to build your own custom components, give them styling and functionality and use them in your applications.

Because some people want JavaScript to be better, and this is an attempt to make it so.

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond. Protea is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

This document mainly serves as a guide to the its design and semantics, and will touch a bit on the implementation.

---

# Protea's Reference

This document is a semi-formal guide to the Protea language meant for both implementation authors and users. It is meant for implementation authors, and those who want to contribute and help me improve Protea. Again, this is not a complete reference or a tutorial, but rather something you consult if you have any questions about the language. We will introduce bits and pieces of the core Protea language and its syntax as we go.

## Hello World!

```dart
// Backend
proc main: void {
  print "Hello, world!"
}

// Frontend
elem App {
  <div>
    <h1>Hello, world!</h1>
  </div>
}
```

### Source code representation

Protea source code is encoded in UTF-8 which is the same default encoding as other languages.

Protea modules use the extension `.pro`. The module name is the file name without the extension, and is implicitly wrapped in a `module` declaration. Modules can be imported to and exported from other modules.

A script file contains the extension `.prs`. Including scripts would also run the script in the same scope as the script it is run from, similar to C header files.

## Lexical elements

### Comments

Comments are the same as in JavaScript, though they are inserted to the compiler once they are finished.

Documentation comments are not ignored, but are gathered by the compiler to produce a documentation tree to allow devs to find docs, and with the help of extensions to do so even more easily.

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

### Tokens

A newline or end of file may trigger the insertion of a comma or semicolon. While breaking the input into tokens, the next token is the longest sequence of characters that form a valid token.

### Identifiers

Identifiers name program entities like variables and types. An identifier begins with a sequence of one or more letters `L`, digits `Nd`, marks `M`, underscores `Pc` and dashes `Pd`, with the following restrictions:

- begins with a letter or underscore
- does not end with one or more trailing dashes.

```dart
identifier = `\b[\pPc\pL][\d\pL\pM\pPc\pPd]*\b`
```

Non-lowercase letters are considered uppercase.

### Identifier equality

Two identifiers are considered equal if the following function returns true:

```dart
func cmpIdent(a: str, b: str): bool =
  normalize a == normalize b

func normalize(ident: str): str {
  var { start, end } = ident.match(`\b
    (?!\d) // no leading digits
      (?'start'[\pPc\pL][\d\pL\pM\pPc\pPd--\pLl]*)?
      (?'end'[\d\pL\pM\pPc\pPd]*)
    \b // no trailing dashes
  `)
  return (start + end.lower).sub(`[^\pL\d]` ``)
}
```

Non-alphanumeric characters (marks, underscores and dashes) are thrown away. The first uppercase letters are compared as they are, while the rest of the identifier is compared irrespective of case.

```dart
"WILDFire" == "WILD_Fire" == "WILD-Fire"
"WILDFIRE____" == "WILDFIRE"
"wildFire" == "wildfire" == "wild_fire" == "wild-fire"
```

This rather bizarre way of identifier comparison is called **partial** case-insensitivity, and allows programmers to use their own conventions, even a mixture, without having to remember the exact spelling of an identifier.

The exception with respect to the first non-lowercase characters allows common code like `var foo: Foo == FOO` to be parsed unambiguously.

Note that this rule does not apply to keywords, which are all written in all-lowercase.

### Keywords

The following names are reserved words. These keywords are divided into five groups:

```dart
in of as is new
to til thru by del
unset ref and or xor not

var val func func proc type
class data enum mod
iter macro inter obj
trait style elem prop

go defer do from where with
if elif else then def
for each loop while
try throw catch after
match case fail
use show hide route

goto pass
break next redo retry
return yield await label

debug assert check

// Special variables
true false null nan void infin
it this that self args ctor proto
```

- visibility `pub` `priv` `prot` `final` `over` `immut` `mut` `glo` `loc` `stat` `intern` `extern` `imply` `exply` `post` `get` `set` `del`
- declaration modifiers: `seal` `abst` `impure` `pure` `early` `late` `covar` `contra` `async` `sync` `stat` `dyn` `lazy` `eager` `bound` `free` `uniq` `struct`
- functional modifiers: `rec` `oper` `curry` `inline` `prefix` `suffix` `infix` `left` `right` `binary` `unary`

Some of these modifiers are for future use.

Because of how identifiers are compared, you can use any number of trailing underscores to "strop" a keyword to turn it into an identifier. Keywords also become identifiers when part of a qualified name, such as `x.for.then` or `y::loop`, as well as within literals (with some exceptions).

```dart
;x y z
var var_ = "Hello Stropping"
type Obj = { type_: int }
val object_ = Obj(type_: 9)
assert object_ is Obj
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

Any token can begin an expression except:

- a closing bracket
- a command flag `/x` and its shorthand form `//x`
- a format clause `%x`
- an infix operator
- the keywords `then` `elif` `else` `catch` `after`

Newlines are enabled in:

- all of a Trinity source file, except for nested regions where newlines are disabled, and
- the interval between pairs of brackets.

...and disabled in:

- Control structures
- Declaration keywords
- Import statements and the nearest closing delimiter or end of line.
- Control transfer statements and the nearest closing delimiter or end of line.

...except for nested regions where newlines are enabled.

To allow complex statements or expressions to occupy a single line when the file is minified, a semicolon or comma can be omitted before a closing bracket.

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

1j // imag
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

A string literal consists of a character sequence enclosed in single or double quotes. The underlying implementation denotes how the string should be encoded, usually UTF-16. There are two forms - verbatim (raw) and interpreted (escaped) string literals. The verbatim form is enclosed in single quotes while the interpreted form is enclosed in double.

```dart
val marioSays = '"It''sa me, Mario!"'

val greeting = "Hello world!"
val multilineGreeting = "Hello
  world!"

assert "hello\nworld" == multilineGreeting
```

String literals can also be delimited by at least three single or double quotes, provided they end with _at least_ that many quotes of the same type. The rules for single- and double-quoted strings also apply.

Some transformations are applied to string literals of this type:

- all beginning and ending newlines and whitespace are discarded
- newlines are normalized to `\n` and carriage returns discarded
- all beginning indentation is based on the column of the opening quote, discarding whitespace as needed.

```dart
val greeting = """
"
Hello World!
""""
```

### Escapes

Escape sequences are used to represent characters that would otherwise have a syntax error. Like a lot of languages, all escapes begin with a backslash. The first character of an escape sequence is the escape character, and the second character is the character to be escaped.

Certain single-letter escapes represent special values:

```
\a    U+0007  alert or bell
\b    U+0008  backspace
\e    U+000b  escape
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

The escapes `\b`, `\d`, `\o`, `\u` and `\x`, allow you to encode Unicode code points as integers in a double-quoted string. The value of the literal is the value represented by the digits in the corresponding base.

```
\b[01]+         binary
\d[0-9]+        decimal
\o[0-7]+        octal
\u[0-9A-Fa-f]+  hexadecimal (UTF-16)
\x[0-9A-Fa-f]+  hexadecimal (UTF-8)
\N($id&*[:.])   unicode name
```

Code points in the ranges `80-FF` for `\x` and `D800-DFFF` for `\u` which are used to represent multi-byte characters or surrogate pairs respectively and hence would be invalid if they appear on their own or form an invalid byte/character sequence. Any sequence of characters that is not a valid UTF-8/16 sequence or exceeds the upper limit of 0x10FFFF (decimal 1114111) will give a compile time error.

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

The escape `\N` is used to represent a Unicode character sequence as named (namespaced) characters, for instance `\NA` would equal capital A, and `\NAlpha` would equal the Greek capital letter `Α` (alpha).

Named character sequences can begin with an optional script and a namespace name, separated by a colon. The script is optional if the character is a control or symbol character, or a character in th eLatin script.

```dart
// => "\u{1F60A}"
"\u{1F600}" // => "😀"
"\Nsmile.y.z" // => 😀
"\Nflag{'SG'}" // => 🇸🇬
```

All other non-control and non-ASCII-alphanumeric characters are allowed to be escaped: their value is the same as the character itself without the leading backslash. For example, `\\` evaluates to `\`, `\"` evaluates to `"`.

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

### Template Strings

Protea has a built-in support for template strings, which function very similarly to Python's `str.format`. They are similar to interpolated strings, but they allow you to pass function arguments and embed them directly into the output which you can then call later. The syntax is similar to string interpolation, but the beginning sigil is the hash sign `#` rather than the dollar `$`.

You can create template strings by using the `#` character to mark placeholders in a string. The arguments can be named, as in `#name`, or positional, as in `#0` or `#-1` (negative indices count from the last). Use `!` to mark as required, and `?` to mark as optional. `*` is used to spread the arguments into a list, and `**` into a map.

```dart
val greeting = "Hello #0..0!"
greeting "World" // => "Hello World!"

$tempArg = `'#' ($tempArgSimple | $tempArgBracket)`

$posInt = `[+-]? \d+`
$defaultValue = `$expression`
$tempArgSimple = `$argSigil? $requiredSigil? $identifier`
$requiredSigil = `'!' | '?'`
$argSigil = `'/' | '%' | '&' | '*'`
$posArg = `
  $argSigil?
  $requiredSigil?
  $posInt (
    ('..' | '...' | '..<' | '>..' | '>.<') $posInt
    ('..' $posInt)?
  )?
`

$tempArgBracket = `"{" (
  $tempArgSimple
  ('as' $tempArgsSimple)*
  $typeAnnotation?
  $defaultValue?
) &* [,;] "}"`
```

### Symbols

Symbol objects represent names and some strings inside the Protea interpreter. They are generated using the `:name` and `:"string"` literal syntax, beginning by a colon, or by the various `sym` methods. The same symbol object will be created for a given name or string for the duration of a program's execution, regardless of the context or meaning of that name. Thus if `Fred` is a constant in one context, a method in another, and a class in a third, the symbol `:Fred` will be the same object in all three contexts.

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
