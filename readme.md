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
style App < body {
  color: ${|props|
    props.theme == `purple ? `purple : `white};
}

// JSX support
element HelloMessage implements React.Component {
  field yourName: String
  return <div #greeting>
    <h1 color=navy>Hello $yourName</h1>
  </div>;
}

// Schemas
model BlogPost {
  id       : Int @id @default(this.autoIncrement());
  title    : String;
  content  : String?;
  published: Boolean | String @default(false);
  author   : User? @relation(fields: [authorId], references: [id]);
  authorId : Int;
}

// Queries
query MdxBlogPost(title: String) {
  mdx(`title == title) {
    `id: String;
    `title: String;
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

```swift
// This is a line comment
/// This is also a line comment, but for documentation.

/* This is a block comment. */
/** This is a documentation block. */

/** Block comments allow /* nesting. */
    Note the **spacing** between the comment opener and
    the first character. */

/**
  * This is also accepted, but keep in mind that lines do
    not need to begin with an asterisk.
  */

/* Variables begin with letters and underscores.
   Further characters include combining marks, digits and dashes.
   A variable does not end in trailing dashes. */

let ez:  = 1.10 // Constant. Can't be reassigned.
var sivir = "I always take my toll, " // Variable.

var x = {}
x.prop = {}

/* An operator consists of one or more symbol and punctuation.
   Operatos should not include `,;(){}[]`.

   These operators are built-in and cannot be reassigned:
   . :: ?. ?: !. !: .= ::= ?.= ?:= !.= !:= ?? !! |> ||> |||>
   +> -> ~> <| <|| <||| <+ <- <~ @ # <: >: && || ^^ and prefix `!`

   These result in a syntax error: prefix `|`, `<` and `/`
*/
infix operator function [‰](a: String, b: String) {
  a.sub(b, '')
}
let permil = function (a, b) { a.sub(b, '') }

/* A literal identifier is a string prefixed with @. */
let :"hello world" = "hello world!"

/* 'let' is immutable and hoisted, but can be redeclared. The binding you
   refer to is the closest binding upward. */
let result = 0
let result = result + 2
let result = result + 2

/* 'val' bindings are also immutable, however they cannot be redeclared.
   They are only assigned constant expressions, like enum members. */
val result = 4

/* Saga's compiler is smart to infer types and would make sure
   they stay the same throughout its lifetime. Annotate with 'any'
   to make it dynamic. */
var name: String = 'Bob' // explicit annotation
var name = 'Bob' // implicit inference

/* Saga's compiler is smart to infer types and would make sure
   they stay the same throughout its lifetime. Annotate with 'any'
   to make it dynamic. */
var (
  greeting = 'hello' // `str`
  score = 10 // `int`
  newScore = 10 + score // `int`
)

/* Create indented blocks with the 'do' keyword. Do-blocks return
   their last statement. */
var message = do {
  var part1 = "hello", part2 = "world"
  part1 ++ " " ++ part2
}

/* Variables are scoped by curly brackets and can't be accessed from
   outside. */
var displayGreeting
if (displayGreeting = true) {
  var message = 'Enjoying the docs so far?'
  console.log(message)
}

/* Destructuring assignment can be performed on:
... tuples or arrays */
let pair = [1, "Hello"]
let [one, hello] = pair
console.log(hello) // 'Hello'

/* ... records or objects */
let alice = {name: 'Alice', age: 42, job: 'Programmer'}
let {name, *details} = alice
console.log(details) // { age: 42, job: 'Programmer' }

/* ... or even on function arguments: */
let sum = |*args: Number[]|: Number = args.reduce(|x, y| x + y, 0)
let numberArray = [1, 2, 3]
let runningTotal = sum(*numberArray) // 6
```

### Built-In Types

```swift
// 8 primitive types
let null: Null = null
let bool: Boolean = false
let num: Int = 0
let float: Float = 1.0
let str: String = ''
let func: Function<(), Void> = | | {}
let regex: RegExp = / /
let symbol: Symbol = :''

// Data structures
let array: Array = []
var tuple: Tuple = #[] // immutable array
let set: Set = {}
let set: FrozenSet = {}
let map: Map = #{}
var record: Record = #{}
var seq: Sequence = ()
var fSeq: FrozenSeq = #()

/// CONSTANTS
true false
null undefined
infinity nan

/// NUMBERS
/* Leading zeroes and underscores are ignored.
Numbers are cast into this order: int > frac > real > complex */
1 // decimal integer
0x1 // hexadecimal
0o1 // octal
0b1 // binary

0.1 0x1f.0 3.0 // decimal 'real'
0x0.3p100 0o1.3p40 0b0.0p40 // p is exponent

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
""""""""x""""""""

// verbatim string
var message = r"No escapes needed!"

// interpolation
var message = s"Value of E = $Math.E"

// formatting
var [a, b] = [10, 20], c = a + b
var message = sf"Sum of $a%str and $b%str is $c%str"
message = "Sum of " + a.str() + " and " + b.str() + " is " + c.str()
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
let regex = /^1?$|^(11+?)\1+?$/g
let isPrime = />
  (?<element> \g<starttag> \g<content>* \g<endtag> ){0}
  (?<starttag> < \g<name> \s* > ){0}
  (?<name> [a-zA-Z_:]+ ){0}
  (?<content> [^<&]+ (\g<element> | [^<&]+)* ){0}
  (?<endtag> </ \k<name+1> >){0}
  \g<element>
</

/// FUNCTIONS
function add(a, b) = a + b
function add(a, b): Number { a + b }

// Anonymous functions
add = |a: Number, b: Number|: Number { a + b }
// _ is default to "params" object by default
let add: <T: Number>(a: T, b: T) T = | | _0 + _1

/// SYMBOLS (JavaScript interop only)
let symbol = :'$'
let symbol = :symbol

/// DATA STRUCTURES
// Commas optional when each property is listed on its own line
let array = [1, 2, 3]
let list = #[1, 2, 3]
let set = {1, 2, 3}
let frozenSet = {1, 2, 3}
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
x.y x::y // Ordinary property access
x?.y x?:y // Optional chaining
x!.y x!:y // Optional unwrapping
x.=y x::=y x?.=y x?:=y x!.=y x!:=y // Access-assignment

// Difference between :: and .
class Example {
  property Version = 1.0
  static method Hello(who = `world) =
    s"Hello, $who!"
}

x \y z // Infix operator
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
typeof x /* runtime type checking */
sizeof x /* size of object */
length x /* length of object */
nameof x /* name of object */
void x /* converts things into null */
delete x.prop /* delete property from object */

\int \Object.keys x /* unary function calls */

/// ARITHMETIC OPERATORS
x ** y /* _exp_: exponent */

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
x ?? y /* _coal_:nullish coalescing */
x !? y /* _ncoal_: non-null coalescing */
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
= .= :=
+= -= *= /= %=
++= --= **= ~/= %%=
&= |= ^= &&= ||= ^^=
<<= >>= >>>= <<<=
??= !?= ?:= !:=
*>= <*= <|= |>= <+= +>=

/// CONTROL FLOW
throw new ZeroDivisionError()
await::all x
return x
yield x
yield x
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
  "negative"
} else if (x == 0) {
  "zero"
} else {
  "positive"
}

if (x < 0) -x else x
unless (x >= 0) -x else x

// `in` loops through values , including sequences
// `of` loops through keys
for (let x in xs) if (x > 0): return x * x
for (let x in xs; let y in ys) println(x + y)

while (x >= 0) { x = f(x) }
repeat { x += 10 } while (x >= 0)
repeat {
  print(r'Please don''t try this!')
  break
}

switch (value) {
  case Some(value): doSomething(value)
  case value is int: doSomething(value)
  case Some(value) if value > 10: doSomething(value)
  case let [a, b, *rest]: doSomething(rest)
  case ({foo: let value}): doSomething(value)
  case let /(?<value>foo)/: doSomething(value)
  case |x = value| x % 2 == 0: doSomething(value)
	case "Hello": handleHello()
  default: doSomething()
}

try {
  body
} catch switch (let ex: Exception) {
  case ex is IOException: handle()
  default: handle()
}

var xs = (from let #[x, y] in [1 to 200].entries()
  where x < 100 // filter
  join let n in 1 to 100 onto n == x // join
  order by |x, y| x - y // sort
  group by |x| x % 2 = 0 // group
  select x) // map

/// CONTROL TRANSFER STATEMENTS
break
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
let add = |x: Number, y: Number|: Number = x + y
// This is a function type don't use this in your code!
let add: |x: Number, y: Number| Number = |x, y| x + y

// Call functions with parentheses and comma-separated arguments:
add(1, 2)

let addTwo = |x| x + 2 // Leave out the parens if there is 1 arg
let doNothing = () => () // Write parens if there is no arg

/// NAMED ARGUMENTS
// Arguments can be named using the '#' prefix.
let makeCircle = |#x: Number, #y: Number, #radius: Number|: void = ()
// Use = to call functions with named arguments.
// Their order does not matter.
makeCircle(#radius = 10, #x = 1, #y = 100)

// For functions that use other functions as arguments,
// the same arrow notation applies:
let increment = x => x + 1
let myArray = [1, 2, 3].map increment
let myArray = [1, 2, 3].map { # + 1 } // Curly-bracket notation rocks!

// Functions can be partially called.
// Arrow functions are not curried by default.
let add = x => y => x + y
let addFive = add(5)(#)
let eleven = addFive 6
let twelve = addFive 7

// Use # to skip arguments that are not the first:
let divide = a => b => a / b
let halve = divide()(#)
let five = halve 10

// Mark an argument with ? to make it optional.
// All functions have at least one positional argument
// with an implicit "null" added as the first.
let addOne: (null, #value?: 0) => int = (#value?: int?): int => match value
  when ?value: value + 1
  when null: 1

// Default values can be specified with '='
let makeCircle = (#x = 0, #y = 0, #radius = 10) => ()
/* Position (0, 0) with radius 10 */
makeCircle()
/* Position (10, 0) with radius 2 */
makeCircle(#x = 10, #radius = 2)

// Supplying named optional parameters
let f = (#data? = 10) => ()
let f = (#data?: num = 10): num => ()
let [a, b] = [100, none]
f(#data = a) // called as f(#data = a)
f(#data = b) // called as f()

// Referencing previous arguments
let add = (a, #b, #c = a + 1, #d = b + 2) => a + b + c + d
add(1, #b = 1) /* 6 */
add(1, #b = 1, #c = 10) /* 14 */

// Variadic functions:
let product = (...a: num[]): num => a.reduce((*), 0)
product(1, 2, 3, 4) /* 10 */

// Function piping
var exclaim = (message: str, rep: int = 1): str => message |> s'${#.upper() * rep}!!'

// Function composition
var quadruple = double +> double
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
type x = 40
// make sure the object contains only these properties
type x = { x: String, y: Number }
interface <T>X {
  [index: Int]: Any
  length: Int
  age: Int
  name: readonly String
  value: T
}

// 'typeof'/'nameof' operator
var greeting = 'hello world'
type greeting = typeof Greeting
type greeting = nameof Greeting

var alice: Person = { name: 'Alice', age: 100 }

// ENUMERATIONS
enum <Int>Direction {
  Up = 1, Down, Left, Right
}

enum <String>Direction {
  Up = "UP"
  Down = "DOWN"
  Left = "LEFT"
  Right = "RIGHT"
}

// Any constant expressions can be used as enum members
// and can reference previously declared members
enum <String|Number|Boolean>FileAccess {
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
class C<R extends Number>(public var x: R) {
  assert x > 0, "positive please"
  property x = x ?? 4

  /** These modifiers modify only methods */
  get method // getter method
  set method // setter method
  async method // asynchronous method

  /** These modifiers controls visibility or access inside,
  outside classes or even derived classes. */
  public method // visible anywhere - inside, outside and derived classes
  private method // visible only to this class
  protected method // visible only to this class and any derived classes

  /** This modifier marks an attibute as immutable or mutable
  usually for other classes which modify themselves. */
  readonly property x = 4
  property x = 5 //

  /** Dynamic properties allow the variable to be modified with
  whatever types it needs to be */
  dynamic property x = 5

  /** This modifier can only be used inside a class */
  override property x = 5 // overrides a property

  /** These modifiers can be used both inside the classes to mark
  any or all properties of a class on an object */
  static const // prevents initialization of a property/class (used with `new`)
  virtual class // marks property/class to be overridden by derived classes
  sealed class // prevents overriding of this property/class
  abstract class // enforces overriding of this property/class

   // Decorators call functions on methods.
  method [decorator]methodName() {}
}

// Derived params
class C(x: R) extends D(x): pass
// Objects are singleton and cannot be overridden
object O extends D: pass

// Traits are classes weithout parameters
trait Iterator<A>:
  hasNext(): bool =
  next(): A =

class IntIterator(@to: int) extends Iterator<int>:
  private var current = 0
  override function hasNext(): bool = current < @to
  override function next(): int =
    if hasNext()
      let t = current; current += 1; t;
    else 0

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
  property X = x
  property Y = y
  let X { get method; set method }
  let Y { get method; set method }
  override method toString() = "($X, $Y)"
}
```
