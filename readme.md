# Trinity

> A new language for building cross-platform apps and libraries.

Trinity is a general purpose language designed with building applications and libraries using a declarative approach. It is strongly typed, and has explicit support for functional, object-oriented, concurrent, and event-driven programming.

The grammar contains native language features for both client and server-side development using the existing NodeJS ecosystem.

Its syntax resembles Kotlin and Go, but with elements from React JSX, SCSS, GraphQL, OCaml, and Haskell.

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

Trinity is an alternative programming language to replace JavaScript, but without the warts, with a great type system, and with a syntax that is familiar to many other languages.

The goal of Trinity is to provide a small set of developer tools---language, compilers, framework, runtime and libraries---that are used together to build, develop and test applications. Trinity is, after all, a language that focuses on simplicity, flexibility and performance.

Trinity draws pieces of influence from:

- **TypeScript** for its robust type system and type checking, being the primary influence for Trinity;
- **Rust** for its speedy and friendly compiler, and its ability to compile to WebAssembly and native code.
- **Ruby** and **Python** for its short keywords, dynamic programming model and the little quirks that make them shine
- **Haskell** and **OCaml** for its evaluation order and style
- **Scala** and **Kotlin** for its classes, interfaces and traits
- **React**, **Vue** and **Svelte** for its extended HTML-like syntax to build and express complex components and views
- **Styled Components** and **SCSS** to add dynamic styling while keeping everything in sync with the underlying CSS
- **GraphQL** and **SQL** for its query language and data modelling features

<small>

#### Disclaimer:

Trinity is currently still in its conceptual and experimental stage, as the creator is experimenting on the language's grammar. This document mainly serves as a guide to the its design, and will touch a bit on the implementation.

</small>

---

# Trinity's Reference

This document This document is an informal guide to the language's design, structured in a way that you can read from anywhere and still understand.

This is not a complete reference or a tutorial, but rather something you consult if you have any questions about the language. We will introduce bits and pieces of the core Trinity language and its syntax as we go.

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

### Notation

Trinity's syntax is specified using a hybrid of Extended Backus-Naur form and regular expressions.

`camelCase` production names are used to identify lexical tokens. Non-terminals are in `PascalCase`. Lexical tokens are enclosed in single `''` or double quotes `""`, single characters are delimited with a backslash.

### Source code representation

Trinity source code is encoded in UTF-8. The text is not canonicalized, so a single accented code point is distinct from from the same character constructed by combining an accent and a letter; those are treated as two code points.

Each code point is distinct; upper and lower case characters are distinct.

### Characters

Unicode has defined a set of character categories that are used to classify Unicode characters.

- `\p` followed by one or two letters: a Unicode shorthand character class; `\pL` denotes a Unicode letter
- `\d`: a decimal digit character, i.e. `0` to `9`.
- `\h`: a hexadecimal character (case-insensitive)
- `\s`: a whitespace character

### Letters, digits and operators

All characters in the Combining Punctuation category are considered letters.

- `\c`: an initial identifier character, i.e. `[\pL\pPc]`
- `\i`: a final identifier character, i.e. `[\c\d\pM]`
- `\w`: a medial identifier character `[\i\pPd]`
- `\q`: a punctuation character, i.e. `` [,;'"`\\(){}\[\]] ``
- `\o`: an operator character, which is a Unicode punctuation or symbol character that is not a punctuation mark, i.e. `` [\pP\pS--,;'"`\\(){}\[\]] ``.

## Lexical elements

### Comments

Comments serve as program documentation. There are four forms of each, two of which are deleted by the compiler:

- Line comments start with `//` and a space, and stop at the end of the line.
- General comments start with the `/*` and a space, and stop with the first subsequent character sequence `*/`.

A comment cannot start inside a string literal but can appear inside of another comment. A general comment without a newline acts like a space, and any other comment thereof acts like a newline.

### Tokens

Tokens form the vocabulary of the Trinity language. There are four classes: identifiers, keywords, operators, punctuation and literals. Whitespace, formed from spaces, tabs, carriage returns and newlines are ignored except they separate tokens that would otherwise combine into one.

A newline or end of file may trigger the insertion of a comma or semicolon. While breaking the input into tokens, the next token is the longest sequence of characters that form a valid token.

### Terminators

The formal grammar uses commas and semicolons in a number of productions. When the input is broken into tokens, a semicolon is automatically inserted into the token stream immediately after a line's final token if that token is:

- a punctuation mark
- an identifier
- a keyword
- a literal
- a suffix operator
- a closing bracket

To allow complex statements to occupy a single line, a semicolon or comma can be omitted before a closing bracket.

### Identifiers

Identifiers name program entities like variables and types. An identifier begins with a sequence of one or more letters, digits, marks, underscores and dashes, with the following restrictions:

- begins with a letter
- does not end with one or more trailing dashes.

```dart
val regex = `\b[\pL\pPc][\d\pL\pM\pPc\pPd]*\b`
```

Two identifiers are considered equal if the following function returns true:

```dart
fun cmpIdent(a: str, b: str): bool =
  normalize a == normalize b

fun normalize(ident: str): str {
  var { start, end } = ident.match(`
    (?!\d) // do not match if identifier begins in a digit
    \b
      (?'start'[\pPc\pL][\d\pL\pM\pPc\pPd--\pLl]*)?
      (?'end'[\d\pL\pM\pPc\pPd]*)
    \b // do not match trailing dashes
  `)
  return (start + end.lower).sub(`[^\pL\d]` ``)
}
```

That means the first non-lowercase letters are compared as they are, while the rest of the identifier is compared case-insensitively. Additionally, all non-alphanumeric characters (marks, underscores and dashes) are discarded before comparison.

```dart
"WILDFire" == "WILD_Fire" == "WILD-Fire"
"WILDFIRE____" == "WILDFIRE"
"wildFire" == "wildfire" == "wild_fire" == "wild-fire"
```

This unorthodox way of identifier comparison is called **partial** case-insensitivity, and allows programmers to use their own conventions without having to remember the exact spelling of an identifier.

The exception with respect to the first non-lowercase characters allows common code like `var foo: Foo == FOO` to be parsed unambiguously.

Note that this rule does not apply to keywords, which are all written in all-lowercase.

### Keywords

The following keywords are reserved and may not be used as identifiers.

```
in of as is new
to til thru by del
unset ref and or xor not
var val fun func proc type
class data enum mod
iter macro inter obj
trait style elem prop
go defer do from where with
if elif else then def
for each loop while
try throw catch after
match case fail goto pass
break next redo retry
return yield await label
use show hide route
debug assert check
```

### Operators

Operators consist entirely of the characters `!$@%^&*-=+<>.~/|:#?`. For example, `+`, `*`, `<>`, and `>>=` are valid operators.

Trinity distinguishes between three types of operators: prefix, infix and suffix. Spacing around operators is significant: prefix operators have spacing on their left and suffix operators on their right. Infix operators can be spaced out or without a space between the operands.

`.`, `=`, `:`, `::`, `|>`, `||>`, `|||>`, `+>`, `<|`, `<||`, `<|||`, `<+`, `?:`, `!:`, `??`, `!!`, are not available as general operators; they are used for other notational purposes.

An infix operator can contain `//`, `///`, `/*` or `/**`.

Infix operators whose first character is `@` are right-associative.

```dart
func &/ (y: float): float = x / y
12 @/ 4 @/ 8 // 24.0
12 / 4 / 8 // 24.8
```

Prefix, suffix and infix operators are distinguished whether they have preceding, following whitespace, or both (respectively).

Suffix operators are evaluated first and from left to right, and prefix operators are evaluated next and from right to left.

Infix operators are evaluated last and are evaluated based on the given order below.

Operators ending in either `->`, `~>` or `=>` or starting in `<-` `<=` or `<~` are called arrow like, and have the lowest precedence of all operators.

If the operator ends with `=` and its first character is none of `<`, `>`, `!`, `=`, `~`, `?`, it is an assignment operator which has the second-lowest precedence.

Otherwise, precedence is determined by the first character.

| Precedence level | Operators | First character |
| --- | --- | --- |
| 9 (highest) | `unset` `del` `not` | `$ ^` |
| 8 | `*` `/` `**` `//` `%` | `* % \ /` |
| 7 | `+` `-` | `+ - ~ \|` |
| 6 | `&` `\|` `^` `<<` `>>` | `&` |
| 5 | `==` `<=` `<` `>=` `>` `!=`<br>`in` `!in` `of` `!of` `is` `is!` `as` `as!` `as?` `to` `til` `thru` `by` | `= < > !` |
| 4 | `&&` `\|\|` `^^` `and` `or` `xor` |  |
| 3 | infix `?? !! ?: !: ::` |  |
| 2 | `@` and arrow like operator (like `->`, `=>`) |  |
| 1 | assignment operator (like `+=`, `*=`) |  |

Whether an operator is used as a prefix operator is also affected by preceding or following whitespace, respectively.

```dart
++x++ == +(+((x+)+))
```

Dot-like or colon-like operators are operators starting with `.`, `!.`, `?.`, `::`, `?:` or `!:`; they have the same precedence as `.`, so that `a.?b.c` is parsed as `(a.?b).c` instead of `a.?(b.c)`.

The above describes unqualified identifiers. An identifier can also be qualified - a qualified identifier consists of a qualifier or namespace, followed by one or more regular identifiers separated by `.` or `::`. For instance, `Collection.Set.toString` is a qualified identifier where `Collection.Set` is the qualifier and `toString` is the identifier.
