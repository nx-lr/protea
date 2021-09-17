## Language Ideas

> This reference is structured so that it can be read from top to bottom. Later sections use ideas and syntax previously introduced. Familiarity with JavaScript and Python are assumed.

> The file extension for SagaScript is `.sa` or `.sagascript`.

SagaScript uses significant whitespace to delimit blocks of code. Semicolons `;`, even commas `,` are not needed to terminate or separate expressions, ending the line would do just as well. Curly braces `{}` to surround blocks of code are entirely optional, though it is preferred you use indentation.

You can omit the parentheses and commas when invoking a function. The implicit call wraps until the next infix operator or until a closing bracket, end of line or semicolon.

```coffee
x y z == x(y(z))
x! y z == x()(y, z)
w.x y z == w.x(y, z)
v.w x.y.z a  == v.w(x.y.z(a))
v.w(x.y z) == v.w(x.y(z))
(v.w x) y, z = v.w(x)(y z)
```

Line comments begin with `#` or `#:` and continue up to the end of the line. Block comments begin with either `#{` or `#[]` and end in `}#` or `]#`. Note that `#:` and `#{}#` are considered tokens in the language, and are used to generate documentation.

Special comments such as `#!`, `#=` and `#?` are used to tell the compiler what and where to compile, and what modules to require. Some are reserved for software tooling, such as identifying issues or important things.

```coffee
#: @author John Doe <johndoe@example.com>

#! usr/bin/env wasm
#= x = 2
#? TODO fix grammar highlighting for some parts
```

Inline comments begin with `#(` and end in `)`.and can be inserted wherever needs be

### Assignment

Every variable should be declared before you can use them. This lets you and the compiler know which variables should be overshadowed and which ones can be reassigned, to prevent variable or reference-related errors from occurring.

All variables are block-scoped. This makes sure that the values do not leak out into the parent scope. Declarations can be scoped with `do` blocks or any control flow statement.

```coffee
do:
  let x = 10 # creates a local variable named x
print x #! RefError: variable `x` is not defined
```

The value of the last line of a scope is implicitly returned.

```coffee
val greet = do:
  let message = "Enjoying the docs so far?"
  message
greet #= 'Enjoying the docs so far?'
```

There are four ways to declare variables: `var`, `val`, `let` and `const`. `val` and `const` declarations are "immutable", aka "cannot change", and to optimize compilation performance, we recommend you use `val` and `const` rather than their immutable counterparts.

```coffee
var x = 5   # mutable, re-declarable
val x = 5   # immutable, re-declarable
let x = 5   # mutable, not re-declarable
const x = 5 # immutable, not re-declarable
```

"Re-declarable" means that on the same scope" reusing the same let binding name overshadows the previous bindings with the same name. So you can write this too:

```coffee
let x = 10
let x = 10 #! RefError: x already declared

do:
  let x = 5
x #= 10

do:
  x = 2
x #= 2
```

### Everything is an expression

Almost everything is an expression, which means you can do things like:

```coffee
let x = if 2 + 2 == 4: 10 else: 0
x #= 10
```

Things such as loops, switch statements, and even try/catch statements are all expressions.

If you want to simply declare a variable and not initialize it, you can.

```coffee
var x
```

### Literals

#### Booleans, Void, Nil

Aliases as in CoffeeScript.

```coffee
true == yes == on
false == no == off
```

Nil, none and null are synonyms. Void and undef are too.

```coffee
nil == none == null
void == undef
```

#### Numbers

SagaScript has support for integer and floating-point literals, in multiple bases: 2, 4, 6, 8, 10, 12 and 16. All floating-point numbers are distinguished by a dot, or the modifiers `r`, `p` and/or `s` in any combination.

```coffee
val base04 = 0b100 #= 4
val base04 = 0q100 #= 16
val base06 = 0s100 #= 36
val base08 = 0o100 #= 64
var base10 =   100 #= 100
var base12 = 0z100 #= 144
var base16 = 0x100 #= 256
```

Integer literals without a type suffix are automatically cast into the supported range, by default. Integers can be fast cast There is no limit for the length of integer literals apart from what can be stored in available memory.

Numeric literals are case-insensitive, and can contain leading 0s or underscores. A prefix cannot be immediately followed by an underscore, and a numeric literal cannot end in an underscore.

```coffee
7     2147483647                        0o177    0b100110111
3     79228162514264337593543950336     0o377    0xdeadbeef
      100,000,000,000                   0b11,10__01,01
```

In floating-point literals, repeating digits are delimited with `r`, `p` controls the exponent and `s` controls the precision after the decimal point, in that order.

```coffee
0x0./3^+2=6 == ((1 / 16 + 1 / 40) * 2 ** 16).fix 6
```

Numbers can be automatically followed by a type suffix, such as `i32`, `f64` or any of the like. Un-suffixed literals are by default `i32` for integers, and `f64` for floats.

```coffee
123                              # type i32
123:i32                          # type i32
123:u32                          # type u32
123:u32                          # type u32
let a: u64 = 123                 # type u64
0xff                             # type i32
0xff:u8                          # type u8
0o70                             # type i32
0o70:i16                         # type i16
0b1111_1111_1001_0000            # type i32
0b1111_1111_1001_0000:i64        # type i64
9007199254740991                 # type i64
9007199254740991:u               # type u64
0b0_1                            # type i32
0:u                              # type u32
```

Examples of invalid integer literals:

```coffee
#! leading or trailing underscores after numeric parts
0_
0_.1

#! undefined is not defined
0undefined

#! uses numbers of the wrong base
123AFB43
0b0102
0o0581

#! integers too big for their type (they overflow)
128i8
256u8

#! prefixed-base literals must have at least one digit
0b_
0b_____________________
```

Arbitrary-radix literals start with the base first, then a combination of alphanumeric characters, then `Þ` and `þ`, or by decimal digits separated by commas.

```coffee
0z1.*3 == 40 ** 3
```

### Defining functions

Defining functions is very lightweight in SagaScript.

```coffee
=> # empty function
x = x => y #
```

As you see, function definitions are considerably shorter! You may also have noticed that we have omitted `return`. In SagaScript, almost everything is an expression and the last statement is automatically returned.

You can still use `return` to force returns if you want. Alternatively, mark the function with a `/` to suppress automatic returns.

#### Semicolons

| JavaScript         | SagaScript  |
| ------------------ | ----------- |
| Enforced by linter | None needed |

#### Comments

| JavaScript                 | SagaScript        |
| -------------------------- | ----------------- |
| `// line comment`          | `# line`          |
| `/* block comment */`      | `#[ block ]#`     |
| `/** doc block comment */` | `#{ doc-block }#` |
|                            | `#: doc-line`     |
|                            | `#! shebang`      |
|                            | `#? bugfix`       |
|                            | `#( inline )`     |
|                            | `#_ playground`   |

#### Variables

| JavaScript          | SagaScript |
| ------------------- | ---------- |
| `const x = 5`       | Same       |
| `var x = 5`         | Same       |
| `let x = 5; x += 1` | Same       |

In addition, `val` behaves like `const` but can be redeclared like `var`.

#### Data Types

Like JavaScript and Python, there is no `char` type.

| Type | Default Value | Description | JavaScript equivalent (class) |
| --- | --- | --- | --- |
| `nil` | `nil` | The constant `nil` | `undefined` |
| `bool` | `false` | A boolean value | `Boolean` |
| `int` | `0` | 32-bit integer | `Number` |
| `float` | `0.` | 64-bit floating point | `Number` |
| `str` | `''` `""` | String | `String` |
| `regex` | ` `` ` | Regular expression | `RegExp` |
| `func` | `=>` | Function | `Function` |
| `seq` | `()` | Generator sequence | `Generator` |
| `bits` | `bits''` | Bit stream | `Buffer` |
| `list` | `[]` | Ordered list | `Array` |
| `set` | `set[]` | Set | `Set` |
| `map` | `{}` | Hash map or dictionary | `Object`, `Map` |

#### Strings

| JavaScript                      | SagaScript                           |
| ------------------------------- | ------------------------------------ |
| `"Hello world!"`                | Same                                 |
| `'Hello world!'`                | Same                                 |
| `"hello " + "world"`            | `hello" + "world"`                   |
| `'hello'.repeat(3)`             | `hello" * 3`                         |
| `` `hello ${message}` ``        | `` `hello $message` ``               |
| `\u03B1` inside `"`             | `\h{alpha}`                          |
| `${msg.toUpperCase()}`          | `$msg:su`                            |
| `'hello'[1]`                    | Same                                 |
| `'hello'['hello'.length - 1]`   | `'hello'[-1]`                        |
| `'hello'.slice(3, 4)`           | `'hello'[3:4]`                       |
| `/x/.test('next')`              | `'x' in 'next'`<br>`(/x/) in 'next'` |
| `'hello'.replace('l', 'r')`     | `` 'hello' =< `l`r` ``               |
| `[...hello].length`             | `len 'hello'`                        |
| `'hello'.length`                | `size 'hello'`                       |
| `` chalk`{blue hello world}` `` | Same                                 |

#### Booleans

| JavaScript | SagaScript |
| --- | --- |
| `null`, `undefined` | `nil`, `null`, `none`, `()` |
| `true`, `false` | same; plus `yes`/`on`, `no`/`off` |
| `!`, `&&`, `\|\|` | same, plus `not`, `and`, `or` |
| `!x != !y` | `x ^^ y` , `x xor y` |
| `x && y` (short-circuit) | `x !: y` |
| `x \|\| y` (short-circuit) | `x ?: y` |
| `a ?? b` | Same |
| `a == null ? a : b` | `a !! b` |
| `===`, `!==` | `===`, `!==` (Referential)<br>`==`, `!=` (Structural) |
| `==`, `!=` | `=~`, `!~` |
| `<`, `>`, `<=`, `>=` | Same, but no type coercion |
| `a < b ? -1 : a > b ? 1 : 0`<br>`a.localeCompare(b)` (strings) | `a <=> b` |

#### Numbers

| JavaScript                        | SagaScript        |
| --------------------------------- | ----------------- |
| `1`, `0x10`, `0o40`, `0b10_10`    | Same              |
| `1e40`                            | Same              |
| `13.1875`                         | Same              |
| No complex number support         | `1j`              |
| `144`, `36`                       | `0z100`, `0s100`  |
| `Infinity`, `NaN`                 | `inf`, `nan`      |
| No fraction support               | `1 / 3r`, `0.r3`  |
| `+`, `-`, `*`, `/`, `%`           | Same              |
| `1 / 4 \| 0`                      | `1 ~/ 4`          |
| `((1 % 4) + 4) % 4`               | `1 %% 4`          |
| `Math.max(3, 4); Math.min(3, 4)`  | `3 *> 4; 3 <* 4`; |
| `&`, `\|`, `^`, `~`               | same              |
| `>>`, `<<`, `>>>`                 | same; no `>>>`    |
| `x++; x--; ++x; --x`              | `x += 1; x -= 1;` |
| `1 >>> -20`                       | `1 <<< 20`        |
| `[...Array(100).keys()]`          | `..100`           |
| `[...Array(102).keys()].slice(1)` | `1..=100`         |

#### Lists, Sets and Maps

SagaScript's JavaScript runtime uses Immutable.JS for its internal data structures.

```coffee
x.=push arr
```

| JavaScript                         | SagaScript                 |
| ---------------------------------- | -------------------------- |
| `[1, 2, 3]`                        | Same                       |
| `[1, 2, 3].concat([4])`            | `[1, 2, 3] + 4`            |
| `Array(3).fill([1, 2, 3]).flat(1)` | `[1, 2, 3] * 3`            |
| `[1, 2, 3].filter(x => x === 1)`   | `[1, 2, 3] .filter (== 1)` |
| `arr.includes(ele)`                | `ele in arr`               |
| `!arr.includes(ele)`               | `ele !in arr`              |
| `var [x, y] = [1, 2]`              | Same                       |
| `[...x, ...y]`                     | `[*x, *y]`                 |
| `[...x, ...y]`                     | `[*x, *y]`                 |

| JavaScript                                    | SagaScript          |
| --------------------------------------------- | ------------------- |
| `new Set([1, 2, 3])`                          | `{1, 2, 3}`         |
| `new Set('hello')`                            | `{*'hello'}`        |
| `new Set('hello').has('h')`                   | `'h' in {*'hello'}` |
| Intersection<br>Union<br>Symmetric difference | `&`<br>`\|`<br>`^`  |
| Superset, subset                              | `>=`, `<=`          |
| Strict superset, subset                       | `>`, `<`            |

| JavaScript | SagaScript |
| --- | --- |
| `{}` | `{:}` (mandatory colon) |
| `{a: 1, b: 2, c: 3}` | Same |
| `map?.prop; map?.method()` | Same |
| `map.prop = 10` | `map.prop set 10` or `.= 10` returns new map; otherwise same |
| `'prop' in map` | `'prop' of map` |
| `!('prop' in map)` | `'prop' !of map` |
| `delete map.prop` | `del map.prop` returns new map |
| `map.prop` | `map!.prop` would throw if it does not exist |
| `{...details, prop, let: 2}` | `{*details, :prop, let: 2}` |
| `{...details, let: 2}` | `details \| {let: 2}` |
| `Object.keys({})` | `keyof {}` (Same for values and entries) |
| `map.y = 40; map.x()` | `map.y = 40; ~.x()` |

#### Functions

```coffee
fn => 1       # anonymous function (fn keyword optional)
x => 1        # function with one parameter
(x, y) => 1   # function with two parameters

fn x(y) = 1       # named function
fn x(&y: 1) = 1      # named parameter
fn x(&?y) = 1     # optional parameter
fn x(*y) = 1      # variable arguments
fn x(y = 1) = 1   # default parameter
fn x(y: int): int = 1 # with type annotations
```

#### Compound Expressions

Everything is an expression!

```coffee
var integer = alias int | byte | short | nint | long
var result = if a then 'hello' else 'bye'
var file = match
  when x is int -> 1
  else -> 0
```

| JavaScript | SagaScript |
| --- | --- |
| `a ? b : c` | Same |
| `if ()` | Same (no brackets needed) |
| `if (!expr)` | `unless expr` |
| `else if` | `elif` |
| `for (var i = 1; i <= 10; i++)` | `for (var i in 1 .. 10)` |
| `for (var i = 1; i < 10; i++)` | `for (var i in 1 ..= 10)` |
| `for (var i of map)`<br>`for (var i in map)` | `in` and `of` are swapped |
| `switch` | Same, explicit fallthrough + go-to |
| `try` | Same |
| `throw`, `catch` | `raise`, `rescue` |
| `break`, `continue` | `halt`, `skip` |
| _(deprecated)_ | `with fs.readFile() as (let file) {}` |
| `while (true) {}` | `repeat {}` |
| `while (x < 10) { x++ } ` | Same |
| `while (x != 10) { x++ }` | `until x == 10 { x += 1 }` |
| `do { x++ } while (x < 10) ` | `repeat while x < 10 { x += 1 } ` |
| `do { x++ } while (x != 10) ` | `repeat until x == 10 { x += 1 } ` | 
