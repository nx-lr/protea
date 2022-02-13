# SagaScript | A Great Alternative to JS

## The real language for serious web-based development

SagaScript is a syntactic extension to JavaScript, bringing a lot of new compile-time and runtime features we as devs have come to expect from modern languages.

```swift
import { Runtime as arr } from 'saga'

// Code
export module Math {
  public recursive function fibonacci(let n: int) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// Styling
style App < body {
  color: ${|props|
    props.theme == `purple ? `purple : `white}
}

// JSX support
element HelloMessage extends React.Component {
  field yourName: string
  return <div #greeting>
    <h1 color=navy>Hello $yourName</h1>
  </div>
}

// Schemas
enum Role { USER, ADMIN, SUPER_ADMIN }

model User {
  id: int .id .default(autoincrement())
  createdAt: DateTime .default(now())
  email: string .unique
  name: string?
  role: Role .default(Role.USER)
  posts: Post[]
}

// Queries
query MdxBlogPost(_title: string) {
  mdx(title == _title) {
    id: string
    title: string
  }
}

export * as Module to './Module'
```

---

## Overview

- SagaScript is a language for building fullstack cross-platform apps and libraries for the modern and future web. SagaScript looks like JS, acts like JS, and compiles to the highest quality of clean, readable and performant JS, directly runnable in browsers and Node.

**Feature list:**

- Human-understandable error messages
- Blazing-fast compiler that outputs readable JS
- Syntax inspired by modern languages, while still keeping its JavaScript style
- First-class syntactic support for components, styling, schemas, queries and testing
- First-class JSX, CSS, Prisma and GraphQL support (albeit modified)
- Strong and robust type system
- A mix of declarative and imperative approaches
- Compilation to JavaScript or native code
- Comprehensive standard library
- Support for JS, TS and other JS frameworks

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond (though not at the moment as I am busy with school). SagaScript is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

---

# SagaScript's Reference

```swift
// line comment
/// doc line comment
/* This is a block comment. */
/** This is a documentation block. */

/* Identifiers match the following regex: */
const ident = /\b[\pL\pPc][\pL\pM\pNd\pPc\pPd]+\b/

function cmpIdent(a: string, b: string): bool =
  convertIdent(a) == convertIdent(b)

function convertIdent(id: string): string {
  const ident = id.normalize(:nfd).replace(/[^\pL\d]/g, p'')
  const { begin, end } = />\b
    (?!\d) // ignore leading digits
      (?<begin>[\pPc\pL][\d\p{L:l}\pM\pPc\pPd]*)?
      (?<end>[\d\pL\pM\pPc\pPd]*)
    \b // ignore trailing dashes
  </.exec(ident)
  return begin + end.foldCase()
}

var x = {}
x.prop = {}

/*
An operator consists of one or more symbol and punctuation.
Operators should not include `,;(){}[]`.

These operators are built-in and cannot be reassigned:
`. :: ?. ?: !. !: .= ::= ?.= ?:= !.= !:= ?? !! |> ||> |||>`
`+> -> ~> <| <|| <||| <+ <- <~ @ # <: >: && || ^^` and prefix `!`

These result in a syntax error: prefix `|`, `<` and `/`
*/
const operator = /[\pS\pP--\pPc,;'"`({\[)}\]]+/
infix operator function [‰](a: string, b: string) {
  a.sub(b, '')
}

val id = 'id'
id = 'id1' // Error: `id` is immutable
var id = 'id' // `id` definition overridden
const result = id.replace(/id/g, '')
result = 'id1' // Error: `result` is immutable
let result = id.replace(/id/g, '') // invalid, result already declared

// Type annotations
var name: String = 'Bob' // explicit annotation
var name = 'Bob' // implicit inference

var greeting = 'hello', // `str`
  score = 10, // `int`
  newScore = 10 + score // `int`

var message = do {
  var part1 = "hello", part2 = "world"
  part1 ++ " " ++ part2
}

var displayGreeting
if (displayGreeting = true) {
  var message = 'Enjoying the docs so far?'
  console.log(message)
  message
}

// Destructuring
match (x) {
  case {x: {y: 1} as x}: console.log(x.y === 1)
}

let pair = [1, "Hello"]
let [one, hello] = pair
hello // 'Hello'

let alice = {name: 'Alice', age: 42, job: 'Programmer'}
let {name, *details} = alice
details // { age: 42, job: 'Programmer' }

const {x: {y} as x} = {x: {y: 1}}
x // is {y: 1}
y // is 1

let sum = |*args: number[]|: number = args.reduce(|x, y| x + y, 0)
let numberArray = [1, 2, 3]
let runningTotal = sum(*numberArray) // 6

function foo({y} as x, [z] as zed = [1]) {
  // x is {y: ...}
  // y is x.y
  // z is runs an initializer if arguments[0][1] is undefined
}
```

### Built-In Types

```swift
// 8 primitive types
let null_: null = null
let undef: undefined = undefined
let bool: boolean = false
let int: int = 0 // BigInt primitive type
let float: float = 1.0
let string: string = ''
let symbol: symbol = :''

// Data structures
let array: Array = []
let tuple: Tuple = #[] // immutable array
let set_: Set = {}
let fSet: FrozenSet = #{}
let map: Map = {}
let record: Record = #{}
let seq: Sequence = ()
let fSeq: FrozenSeq = #()
let regex: RegExp = /()/
let func: () => void = function () {}
let lambda: () => void = | | {}
let object_: Object = object {}
let class_: Class = class {}
let enum_: Enum = enum {}
let interface_: Interface = interface {}

/// CONSTANTS
true; false
null; undefined
infinity; nan

/// NUMBERS
/* Leading zeroes and underscores are ignored.
Numbers are cast into this order: int > frac > real > complex */
1 // decimal integer
0x1 // hexadecimal
0o1 // octal
0b1 // binary

0.1; 0x1f.0; 3.0 // decimal 'real'
0x0.3p100; 0o1.3p40; 0b0.0p40 // p is exponent

infinity
nan // not a number

/// STRINGS
/* Strings are */

/// Strings are multiline
"hello
world"

'Hello world' // single-quoted string
"Hello World!" // double-quoted string
`Hello // 'identifier' string
chalk(s"{blue 'hello world!'}") // Tagged template literal (ES6)

// Multi-quoted strings
"""x"""
// Strings end until the last remaining multi-quote
"""""""x"""""""""

// verbatim string
var message = r"No escapes needed!"

// interpolation
var message = s"Value of E = $Math.E"

// formatting
var [a, b] = [10, 20], c = a + b
var message = sf"Sum of $a%string and $b%string is $c%string"
message = "Sum of " + a.string() + " and " + b.string() + " is " + c.string()
// above says "Sum of 10 and 20 is 30"

// escape sequences
'\'' // single quote
'\"' // double quote
'\`' // backtick
'\\' // literal backslash
'\a' // alert
'\b' // backspace
'\e' // escape
'\f' // form feed
'\n' // newline
'\r' // carriage return
'\t' // tab
'\v' // vertical tab
'\p' // platform-specific newline
'\s' // space
'\ca\ma' // control character
'\b0101011011' // explicit bytes
'\300' // Character with decimal value 300
'\o300' // Character with octal value 300 (U+00C0)
'\x30' // ASCII character U+30
'\u40AC' // 16-bit Unicode character U+40AC
'\u{10FFFF}' // non-BMP Unicode character U+10FFFF
'\u{0 1 2 3 4}' // multiple Unicode characters

'\u{10ffff}' == '\u{10FFFF}' == '\u10ffff' == '\x10ffff'

/// REGULAR EXPRESSIONS
/* Saga's regular expressions are based on the Oniguruma
   regular expression flavor, with many further extensions. */
let isPrime = |x| /^1?$|^(11+?)\1+$/.test(`1*x)
let html-tag = />
  (\d\d?)              // day
    (?:\s+|[-\/])
  (\w+)                // month
    (?:\s+|[-\/])
  (\d+)                // year
  (?:
        (?:\s+|:)      // separator before clock
    (\d\d?):(\d\d)     // hour:min
    (?::(\d\d))?       // optional seconds
  )?                   // optional clock
        \s*
  ([-+]?\d{2,4}|(?![APap][Mm]\b)[A-Za-z]+)? // timezone
        \s*
  (?:\(\w+\))?         // ASCII representation of timezone in parens.
        \s*$
</

/// FUNCTIONS
function add(a, b) = a + b
function add(a, b): number { a + b }

// Anonymous functions
add = |a: number, b: number|: number { a + b }
// _ is default to "params" object by default
let add: <T: number>(a: T, b: T) => T = |x, y = 1|: number = x + y

/// SYMBOLS (JavaScript interop only)
let symbol = :'$'
let symbol = :symbol

/// DATA STRUCTURES
// Commas optional when each property is listed on its own line
let array = [1, 2, 3]
let list = #[1, 2, 3]
let set = {1, 2, 3}
let frozenSet = #{1, 2, 3}
let map = {a: 1, b: 2, c: 3}
let record = #{a: 1, b: 2, c: 3}
let sequence = (1, 2, 3)
let sequence = #(1, 2, 3) // alternative syntax

// This would compile to:
let sequence = function* () {
  for (var x = 1; x <= 3; x++) yield x
}

/* A trailing comma is required for sequences */
() // null/unit literal
(,) // empty sequence
(1) // not a sequence: a singleton value
(1,) // sequence with one element
(1, 2) // argument list with two elements
(1, 2,) // sequence with two elements
(1 to infinity) // infinite list
1 to infinity /* infinite list
  (for, from, to and til expressions produce sequences) */
```

### Operators

```swift
/// Built-in operators
x() // Function call
x[y] // Array index
x.y // Object property
x.y() // Method call
x::y // Scope resolution
new List // Constructor call

// Property access operators
x.y; x::y // Ordinary property access
x?.y; x?:y // Optional chaining
x!.y; x!:y // Optional unwrapping
x.=y; x::=y; x?.=y; x?:=y; x!.=y; x!:=y // Access-assignment

// Scope resolution vs ordinary access operator
class Example {
  field Version = 1.0
  static method Hello(who = `world) =
    s"Hello, $who!"
}

Example::Hello // "Hello world"
Example.Hello("hacker") // "Hello hacker"
Example::Version // 1.0
Example.Version // NoMethodError

x->y /* function binding operator */
x<-y /* reverse binding operator */

/// UNARY OPERATORS
/// - Unary operators consist of a single character
/// - Suffix operators are evaluated left to right
/// - Prefix operators are evaluated right to left

!!x == !(!x)
!!x!! == (!!x)

x! /* non-null assertion  */
x? /* existence check */
!x /* logical not */
~x /* bitwise not */
+x /* number conversion */
-x /* negation */
unset x /* converts things into null */
delete x.prop /* delete property from object */

int (Object.keys x) /* unary function calls */

/// ARITHMETIC OPERATORS
x ** y /* _exp_: exponent */
x *** y /* _exp_: exponent */

/* ~/ returns an integer, %% returns a positive number */
x * y/* _times_: multiplication repeat */
x / y /* _div_: division split group */
x ~/ y /* _fldiv_: floor division */
x % y /* _rem_: remainder format map */
x %% y /* _mod_: unsigned remainder */

x + y /* _add_: addition concatenation */
x - y /* _minus_: subtraction difference */

/* Maximum/minimum operators return whichever is larger or smaller */
x *> y /* _min_: maximum */
x <* y /* _max_: minimum */

/// STRING/LIST OPERATORS
'x' ++ 'y' /* _concat_: concatenate */
'x' -- 'x' /* _sub_: replace, filter */

/// BITWISE OPERATORS
x >> x /* _shr_: bitwise right shift */
x << x /* _shl_: bitwise left shift */
x >>> x /* _ushr_: unsigned bitwise right shift */
x <<< x /* _ushl_: unsigned bitwise left shift */

/// BITWISE/SET OPERATORS
x & x /* _bitand_: bitwise and; intersection */
x | x /* _bitor_: bitwise or; union */
x ^ x /* _bitxor_: bitwise xor; symmetric difference */

/// COMPARISON AND EQUALITY
/*
Two objects can be compared only when both operands are of
the same type.

Comparisons can be chained: x <= y <= z == x <= y && y <= z
You can define a custom <=> or _cmp_ function which
would return one of three different values, -1, 0 or 1.

| Operator | True if <=> is |
|----------|----------------|
|    <     |       -1       |
|    >     |       1        |
|    <=    |    -1 or 0     |
|    >=    |     0 or 1     |
|    ==    |       0        |
|    !=    |    -1 or 1     |
*/
x > y /* _great_: more than */
x < y /* _less_: less than */
x >= y /* _geq_: more than or equal to */
x <= y /* _leq_: less than or equal to */
x <=> y /* _cmp_: three-way comparison */

/// EQUALITY OPERATORS
/*
Abstract equality works the same way as strict equality,
however both objects are serialized to strings with
_str_ and compared.
*/
x == y /* _equal_: strict equality */
x != y /* _neq_: strict inequality */
x =< y /* _sim_: abstract equality */
x <> y /* _diff_: abstract inequality */

/// MEMBERSHIP/TYPE OPERATORS
in /* string/array presence */
of /* object key presence */
is /* instance of a class */
!in !of is! /* opposite of the above */
as as! as? /* type-casting */

/// LOGICAL OPERATORS
/*
Logical operators compare booleans and return booleans.
If you want JavaScript logical operators, use !: and ?:.
*/
x && y /* _and_: logical and */
x || y /* _or_: logical or */
x ^^ y /* _xor_: logical xor */

/// COALESCING OPERATORS
x ?? y /* _coal_: nullish coalescing */
x !! y /* _ncoal_: non-null coalescing */
x ?: y /* _tern_: falsy coalescing */
x !: y /* _ntern_:truthy coalescing */

/// FUNCTION OPERATORS
x \Math.imul y /* infix function call */

x |> y /* _pipe_: forward pipe */
x <| y /* _pipl_: backward pipe */
x +> y /* _cmps_: forward composition */
x <+ y /* _cmpl_: backward composition */

/// RANGE LITERALS
1 to 10 /* closed range */
1 till 10 /* end-exclusive range */
1 till 10 by 2 /* end-exclusive range with step */

/// ASSIGNMENT

// = .= :=
// += -= *= /= %=
// ++= --= **= ~/= %%=
// &= |= ^= &&= ||= ^^=
// <<= >>= >>>= <<<=
// ??= !?= ?:= !:=
// *>= <*= <|= |>= <+= +>=

/// CONTROL FLOW
throw new ZeroDivisionError()
await x
await* x
return x
yield x
yield* x
```

### Control Flow

```swift
/**
 * You can omit a block if there is only one statement following
 * the expression in the construct.
 * Loops double as comprehensions, and return sequences.
 * Other constructs return their last statements if they ran.
 */

/// IF-STATEMENTS
// We provide many ways to write conditional statements:
x ? y : z
x ! y : z

// unless is "if not"
// eless is "else unless"

if (x < 0) {
  `negative
} else if (x == 0) {
  `zero
} else {
  `positive
}

if (x < 0) -x else x
unless (x >= 0) -x else x

// `in` loops through values , including sequences
// `of` loops through keys
for (let x in xs) if (x > 0) return x * x
for (let x in xs; let y in ys) println(x + y)

while (x >= 0) { x = f(x) }
repeat { x += 10 } while (x >= 0)
until (x < 0) { x -= 10 }
repeat {
  print(r'Please don''t try this!')
  break
}

// Switch statements are like if-statements, but with multiple
// cases.
enum Month {
  JAN, FEB, MAR, APR, MAY, JUN,
  JUL, AUG, SEP, OCT, NOV, DEC
}

function numberOfDays(year, month: Month) =
  switch (value) {
    case JAN, MAR, MAY, JUL, AUG, OCT, DEC: 31
    case APR, JUN, SEP, NOV: 30
    case FEB:
      if (year % 400 == 0) 29
      else if (year % 100 == 0) 28
      else if (year % 4 == 0) 29
      else 28
  }

// Match statements allow you to match against a value
// functional-style and execute a block of code.
match (input) {
  case Map@{1: x, 2: y}:
    s"x: $x, y: $y"
  case /(?<year>\d{4})-(?<month>\d{2})/u@{groups:{year,month}}:
    s"The year is ${year}, and the month is ${month}"
  case Some@1:
    s"option succeeded with an internal value of 1"
  case Some@x:
    s"option succeeded with a non-1 value of ${x}",
  case None@{}:
    s"option failed"
}

try {
  body
} catch (let ex: Exception) {
  case ex is IOException: handle()
  default: handle()
}

var xs = from let #[x, y] in [1 to 200].entries()
  where x < 100 // filter
  join let n in 1 to 100 onto n == x // join
  order by |x, y| x - y // sort
  group by |x| x % 2 = 0 // group
  select x; // map

/// CONTROL TRANSFER STATEMENTS
break x
continue x
goto x
scope x
fallthru
yield x
yield* x
return x
```

### Functions

```swift
function namedFunction() {}
iterator sequenceFunction() {}

// Anonymous functions have their arguments in between
// pipes
let namedFunction = |x| x = 1

// Functions, like blocks, implicitly return the last statement.
let add = (x, y) => x + y

// Types can be inserted after each argument name,
// return types go after the argument list:
let add = |x: int, y: int|: int = x + y
// This is a function type don't use this in your code!
let add: |x: int, y: int| int = |x, y| x + y

// Call functions with parentheses and comma-separated arguments:
add(1, 2)

let addTwo = |x| x + 2 // Leave out the parens if there is 1 arg
let doNothing = | | () // Write parens if there is no arg

/// NAMED ARGUMENTS
// Arguments can be named using the '#' prefix.
let makeCircle = |~x: int, ~y: int, ~radius: int|: void = ()
// Use = to call functions with named arguments.
// Their order does not matter.
makeCircle(~radius = 10, ~x = 1, ~y = 100)

// For functions that use other functions as arguments,
// the same arrow notation applies:
let increment = |x| x + 1
let myArray = [1, 2, 3].map(increment)
let myArray = [1, 2, 3].map{ _ + 1 } // Curly-bracket notation rocks!

// Functions can be partially called.
// Arrow functions are not curried by default.
let add = |x| |y| x + y
let addFive = |x| add(5)(x)
let eleven = addFive 6
let twelve = addFive 7

let divide = |a| |b| a / b
let halve = |a| divide()(a)
let five = halve 10

// Mark an argument with ? to make it optional.
// All functions have at least one positional argument
// with an implicit "null" added as the first.
let addOne: |null, ?value: 0| -> int =
  |~?e: int?|: int = match (value) {
    case ?value: value + 1
    case null: 1
  }

// Default values can be specified with '='
let makeCircle = (~x = 0, ~y = 0, ~s = 10) => ()
/* Position (0, 0) with radius 10 */
makeCircle()
/* Position (10, 0) with radius 2 */
makeCircle(~x = 10, ~s = 2)

// Supplying named optional parameters
let f = |~?a = 10| = ()
let f = |~?a: int = 10|: int = x + 1
let [a, b] = [100, none]
f(~a = a) // called as f(~a = a)
f(~a = b) // called as f()

// Referencing previous arguments
let add = |a, ~b, ~c = a + 1, ~d = b + 2| = a + b + c + d
add(1, ~b = 1) /*6*/
add(1, ~b = 1, ~c = 10) /*14*/

// Variadic functions:
let product = |*a: int[]|: int = a.reduce((*), 0)
product(1, 2, 3, 4) /*10*/

// Function piping
var exclaim = |message: string, rep: int = 1|: string = message |> s'${_.upper() * rep}!!'

// Function composition
var quadruple = double +> double

// Function binding
const _mod = {
  x: 42,
  getX() {
    return this.x;
  }
}

const unboundGetX = _mod.getX;
console.log(unboundGetX())
const boundGetX = unboundGetX->_mod.getX;
console.log(boundGetX())
```

### Types

```swift
/*
Any expression or argument may include a type annotation.
In most cases, type annotations are not necessary and the
compiler will infer the types automatically. You may include
type annotations to verify your own understanding against
what the compiler infers.
*/

/// BASIC TYPES
let x = (1 + 2: Number) // type assertions
let x: Number = 1 + 2 // binding type annotation
let add = (a: Number, b: Number): Number => a + b // argument/return types

var x: Any = 40 // top type: any
var x: Never = repeat // bottom type: never
var x: Void = null // void type
var x: Number? = 10 x = null // option or nullable type
var x: Unknown x = 10 // unknown type type of x is now known as 'num'

type A = Int|Null|Undefined
type NumOrString = Num|String // Union types
type HasLength = keyof String & Array<Any> // Intersection types

// Literal types
type HttpMethods = `GET|`POST|`PUT|`DELETE|`HEAD|`OPTIONS|`PATCH|`TRACE|`CONNECT
type Dice = 1|2|3|4|5|6

// Array types
type String[]
type Array<Str>

// Read-only arrays
type ReadonlyArray = readonly Any[]

// Tuple types
type StrNumPair = [String, Number]

// For-all types
type UpTo100 = |x| as int where 0 < x < 100

// Restrain the type alias to the file it was declared in
type X = 40

// make sure the object contains only these properties
type X = { x: String, y: Number }
interface X<T> {
  [index: Int]: Any
  length: Int
  age: Int
  name: readonly String
  value: T
}

// 'typeof'/'nameof' operator
var greeting = 'hello world'
type Greeting = typeof $greeting
type Greeting = nameof $greeting

var alice: Person = { name: 'Alice', age: 100 }

// ENUMERATIONS
enum Direction<Int> {
  Up = 1, Down, Left, Right
}

enum Direction<String> {
  Up = "UP"
  Down = "DOWN"
  Left = "LEFT"
  Right = "RIGHT"
}

// Any constant expressions can be used as enum members
// and can reference previously declared members
enum FileAccess<String|Number|Boolean> {
  None // constant members
  Read = 1 << 1
  Write = 1 << 2
  ReadWrite = Read | Write
  Computed = '123'.length  // computed member
}
```

### Classes, Namespaces, Modules, Structures and Traits

```swift
class Y {} // Empty class.
class X ext Y {} // Inherited class

// Class parameters - automatic public member defined
class C(let x: R) {}

var c = new C() // instantiate a new class
var c = new C<String>() // instantiate a class with a parameter
new class {} // Anonymous class

// Constructor is in class body
class C<R <: Number>(public var x: R) {
  assert x > 0, "positive please"
  field x = x ?? 4

  /** These modifiers modify only methods */
  get method // getter method
  set method // setter method
  async method // asynchronous method

  /** These modifiers controls visibility or access inside,
  outside classes or even derived classes. */
  public method // visible anywhere - inside, outside and derived classes
  private method // visible only to this class
  protected method // visible only to this class and any derived classes

  /** This modifier marks an attribute as immutable or mutable
  usually for other classes which modify themselves. */
  readonly field x = 4
  field x = 5 //

  /** Dynamic properties allow the variable to be modified with
  whatever types it needs to be */
  dynamic field x = 5

  /** This modifier can only be used inside a class */
  override field x = 5 // overrides a property

  /** These modifiers can be used both inside the classes to mark
  any or all properties of a class on an object */
  static const // prevents initialization
  virtual class // marks to be overridden
  sealed class // prevents overriding
  abstract class // enforces overriding

  // Decorators call functions on methods.
  method [decorator]methodName() {}
}

// Derived params
class C(x: R) extends D
// Objects are singleton and cannot be overridden
object O extends D

// Traits are classes without parameters
trait Iterator<A> {
  hasNext(): bool =
  next(): A =
}

class IntIterator(to: Int) extends Iterator<Int> {
  private field current = 0
  override method hasNext(): bool = current < @to
  override method next(): int =
    if (hasNext()) { let t = current; current += 1; t; }
    else { 0 }
}

class C extends T {}
class C extends D implements T {}
class C extends T implements T, U {} // Set multiple traits with classes

// Group types, objects, classes, constants and more
// inside modules and namespaces
module School {
  export type profession = Teacher | Director
  export var person1 = new Teacher()
  export var getProfession = |person| switch {
    case is Teacher: "A teacher"
    case is Director: "A director"
  }
}

// Structural types
struct Coords(x: Float, y: Float) {
  field X = x
  field Y = y
  let X { get method; set method }
  let Y { get method; set method }
  override method toString() = "($X, $Y)"
}
```
