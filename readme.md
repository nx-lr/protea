# Protea

> A new language for building cross-platform apps and libraries.

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
    color: $color
    flex: 1
    if done {
      textDecoration: lineThrough
    }
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

Protea is a strongly-typed language still in the making. It is intended for cross-platform client and server development with a focus on simplicity and performance. It unifies functional, object-oriented, concurrent, and event-driven programming paradigms in a single language. It comes with a lightning fast compiler toolchain that scales to any codebase size.

Its syntax builds on top of Flow and contains influences from Rust, Scala, Kotlin, OCaml and Go. Also, you can use Protea as a glue language to connect to other languages through the WebAssembly API, while giving its performance benefits.

Protea is designed to interoperate seamlessly with existing JavaScript and TypeScript projects. Protea can call JavaScript methods, create JavaScript objects, inherit from JavaScript classes and implement TypeScript interfaces. None of these would require glue code.

<small>

#### Disclaimer:

Protea is currently still in its conceptual and experimental stage, as the creator is experimenting on the language's grammar. This document mainly serves as a guide to the its design, and will touch a bit on the implementation.

</small>

---

# Protea's Reference

This document is an informal guide the Protea's language structured in a way that you can read from anywhere and still understand. It is meant for implementation authors, and those who want to contribute and help me improve Protea. This is not meant to be a tutorial or introductory guide to the language, but rather something you would consult if you have questions about the language and its concepts.

This is not a complete reference or a tutorial, but rather something you consult if you have any questions about the language. I will introduce bits and pieces of the core Protea language and its syntax as I go.

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

Protea source code is encoded in UTF-8. The text is not canonicalized, so a single accented code point is distinct from the same character constructed by combining an accent and a letter; those are treated as two code points. Each code point is distinct; upper and lower case characters are distinct.

### Characters

To construct tokens, characters are distinguished according to the following classes (Unicode general category given in parentheses):

- **Whitespace characters** (`Z`), which includes `\n`, `\s`, `\r`, `\t` and `\v`.
- **Letters** in the general category (`L`).
- **Underscores** in the category (`Pc`).
- **Digits** in the category (`Nd`).
- **Parentheses**: `(`, `)`, `[`, `]`, `{`, `}`
- **Delimiters**: `,`, `;`, `:`, `'`, `"`, `\`
- **Operator characters**. These consist of all printable ASCII characters `\u0020` - `\u007F` which are in none of the sets above, as well as any other punctuation (`P`) and symbol (`S`) characters.

## Lexical elements

### Comments

Comments serve as program documentation. There are four forms of each, two of which are deleted by the compiler:

- Line comments start with `//` and a space, and stop at the end of the line.
- General comments start with the `/*` and a space, and stop with the first subsequent character sequence `*/`.

A comment cannot start inside a string literal but can appear inside of another comment. A general comment without a newline acts like a space, and any other comment thereof acts like a newline.

### Tokens

Tokens form the vocabulary of the Protea language. There are five classes: **identifiers**, **keywords**, **operators**, **punctuation** and **literals**. Whitespace, formed from spaces, tabs, carriage returns and newlines are ignored except they separate tokens that would otherwise combine into one.

A newline or end of file may trigger the insertion of a comma or semicolon. While breaking the input into tokens, the next token is the longest sequence of characters that form a valid token.

### Identifiers

Identifiers name program entities like variables and types. An identifier begins with a sequence of one or more letters, digits, marks, underscores and dashes, with the following restrictions:

- begins with a letter
- does not end with one or more trailing dashes.

```dart
identifier = `\b[\pL\pPc][\d\pL\pM\pPc\pPd]*\b`
```

### Identifier equality

Two identifiers are considered equal if the following function returns true:

```dart
func cmpIdent(a: str, b: str): bool =
  normalize a == normalize b

func normalize(ident: str): str {
  var { start, end } = ident.match(`
    \b
    (?!\d) // discard leading digits
      (?'start'[\pPc\pL][\d\pL\pM\pPc\pPd--\pLl]*)?
      (?'end'[\d\pL\pM\pPc\pPd]*)
    \b // discard trailing dashes
  `)
  return (start + end.lower).sub(`[^\pL\d]` ``)
}
```

That means the first non-lowercase letters are compared as they are, while the rest of the identifier is compared irrespective of case. Additionally, non-alphanumeric characters (marks, underscores and dashes) are thrown away before comparison.

```dart
"WILDFire" == "WILD_Fire" == "WILD-Fire"
"WILDFIRE____" == "WILDFIRE"
"wildFire" == "wildfire" == "wild_fire" == "wild-fire"
```

This rather bizarre way of identifier comparison is called **partial** case-insensitivity, and allows programmers to use their own conventions, even a mixture, without having to remember the exact spelling of an identifier.

The exception with respect to the first non-lowercase characters allows common code like `var foo: Foo == FOO` to be parsed unambiguously.

Note that this rule does not apply to keywords, which are all written in all-lowercase.

### Keywords

The following names are reserved words instead of being members of the syntactic class id of lexical identifiers.

```
in      of      as     is     new     to
til     thru    by     del    unset   ref
and     or      xor    not

var     val     func   proc    type   class
data    enum    iter   macro   inter  object
module  trait   elem   prop

do      from    where  with   if      elif
else    for     while  loop   match   case
fail    try     catch  after  then    with
use     show    hide   route  from    where

pass    goto    break  next   redo    retry
return  yield   await  label  throw   def
go      defer   ref

debug   assert  check
```

These are not reserved words, but are used as special variables in the Protea language.

- `true` and `false`
- `null`
- `self` and `this`
- `super`
- `that` and `it`
- `args`
- `ctor`
- `proto`
- identifiers beginning with `_`, including `_` itself

The second group of reserved words are reserved for defining program entities like variables and types. They can be supplied with a number of modifiers which come after the reserved words, which are listed below.

```
pub     priv    prot    final   over    immut
mut     glo     loc     stat    intern  extern
imply   exply   post    get     set     rem

seal    abst    impure  pure    early   late
covar   contra  async   sync    stat    dyn
lazy    eager   bound   free    uniq    struct

rec     oper    curry   inline  pre     suf
inf     left    right   bin     uni     post
```

Many of these modifiers are for future use and are not implemented yet.

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

- a closing delimiter
- a command flag `/x` and its shorthand form `//x`
- a format clause `%x`
- an infix operator
- the keywords `catch`, `else`, `elif`, `after` and `then`.

Newlines are enabled in:

- all of a Trinity source file, except for nested regions where newlines are disabled, and
- the interval between pairs of brackets.

Newlines are disabled in:

- The interval between these tokens: `if` `elif` `for` `each` `while` `match` `catch` `with` and the ending token `then` or `:` (while next to a valid literal), except for nested regions where newlines are enabled.
- Declaration keywords: `var` `val` `func` `proc` `type` `class` `data` `enum` `iter` `macro` `inter` `object` `module` `trait` `elem` `prop` except for nested regions where newlines are disabled.
- Import statements `use` `show` `hide` `route`, and the nearest closing delimiter or end of line, except for nested regions where newlines are enabled.
- as well as `break` `next` `redo` `goto` `label`, and the nearest closing delimiter or end of line.

To allow complex statements to occupy a single line, a semicolon or comma can be omitted before a closing bracket.

### Literals

Numeric literals are either integers or floating point numbers, though they can be extended to include other types such as unsigned, rational, complex and imaginary numbers, and whether or not the number is arbitrary-precision.

Several suffixes can be used in conjunction with one another:

- `u` for unsigned
- `l` for arbitrary-precision (i.e. 'long')
- `i` for imaginary numbers
- `r` for rational numbers
- `f` for floating point/'real' literals

#### Integers

An integer literal is a sequence of digits. An optional prefix sets a non-decimal base: `0b` for binary, `0o` for octal, `0x` for hexadecimal. In hexadecimal literals, letters `a` through `f` and `A` through `F` represent values 10 through 15.

For readability, one or more underscore characters `_` may appear after a base prefix or between successive digits; such underscores do not change the literal's value.

```dart
$intLit = `($decIntLit | $binIntLit | $octIntLit | $hexIntLit) $typeSuffix`
$decIntLit = `\d [\d_]* (?!_\b)`
$binIntLit = `0b [01] [01_]* (?!_\b)`
$octIntLit = `0o [0-7] [0-7_]* (?!_\b)`
$hexIntLit = `0x (?i [0-9a-f] [0-9a-f_]*) (?!_\b)`
$typeSuffix = `$identifier`

42
4_2
0600
0_600
0o600
0xBadFace
0xDead_Beef
0x67_7a_2f_cc_40_c6
170141183460469231731687303715884105727
170_141183_460469_231731_687303_715884_105727

_42         // an identifier, not an integer literal
0_xBadFace  // invalid: _ must separate successive digits
```

#### Floating points

A decimal floating literal consists of an integer part, a decimal point, a fractional and exponent part, all of which are optional. Either the integer or fractional part of the floating-point literal can be omitted, the exponent scales the mantissa (integer and fractional part) by 10<sup>exp</sup>.

A binary, octal or hexadecimal floating literal consists of a mantissa, an optional exponent, and an optional sign. The exponent scales the mantissa by 2<sup>exp</sup>.

For readability, an underscore character `_` may appear after a base prefix or between successive digits; such underscores do not change the literal value.

```dart
$exponent = `e [+-]? \d [\d_]*`
$binExponent = `p [+-]? \d [\d_]*`

$floatLit = `
  ( $decFloatLit | $hexFloatLit
  | $binFloatLit | $octFloatLit )
  $typeSuffix? `

$decFloatLit = `
  (\d [\d_]*)
  (\. \d [\d_]*)
  $exponent? `
$binFloatLit = `
  0b ([01] [01_]*)
  (\. ([01] [01_]*))
  $binExponent? `
$octFloatLit = `
  0o ([0-7] [0-7_]*)
  (\. ([0-7] [0-7_]*))
  $binExponent? `
$hexFloatLit = `
  0x (?i[0-9a-f] [0-9a-f_]*)
  (\. (?i[0-9a-f] [0-9a-f_]*))
  $binExponent? `

0.
72.40
072.40       // == 72.40
2.71828
1.e+0
6.67428e-11
1e6
.25
.12345e+5
1_5.         // == 15.0
0.15e+0_2    // == 15.0

0x1p-2       // == 0.25
0x2.p10      // == 2048.0
0x1.Fp+0     // == 1.9375
0x0.8p-0     // == 0.5
0x1FFFp-16   // == 0.1249847412109375
0x15e-2      // == 0x15e - 2 (integer subtraction)
0b1010.01p-2 // == 0.25
0b1010.01p-2 // == 0.25
0o0.2p-2     // == 0.25
0o0.2p-2_2   // == 0.25
0x0.8p-0     // == 0.5

0x.p1        // invalid: mantissa has no digits
1p-2         // invalid: p exponent requires hexadecimal mantissa
0x1.5e-2     // invalid: hexadecimal mantissa requires p exponent
```
