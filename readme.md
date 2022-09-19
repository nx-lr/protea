# Protea | The Next Stage of JavaScript

### Introduction

Protea is a language and framework to build modern applications with web technology. It's aimed at fixing JavaScript's pitfalls and shortcomings while, while still providing the same experience as coding in JavaScript or whatever framework you use.

### History

JavaScript... is weird.

Today, it's the world's most popular programming language. Almost every single smart device has at least one JavaScript interpreter that runs it and is in active use. Because JavaScript is, after all, the language of the world wide web.

JavaScript started its life as a simple scripting language for browsers. At the time, it was expected to be used for embedding short snippets of code, more than a dozen lines at maximum. Over the years, JavaScript became more popular, and web developers started using it to bring life to their web pages...or otherwise, for me, just experimenting with it.

Now, our browsers are running applications that span hundreds of thousands of lines of code; while browser developers optimized their engines and developers built libraries and APIs to extend its power. While this process took long, the web has seen an evolution from simple, static pages to complex and rich applications of all kinds.

And **_outside_** the browser, JavaScript now runs on servers, all thanks to Node.JS, making it an attractive choice for cross-platform application development, giving rise to _JavaScript-only_ technology stacks.

So just because we have a language that was _initially_ designed for quick uses now has grown into a full-fledged language to write applications with millions upon millions of lines. Every language has its [quirks](https://github.com/denysdovhan/wtfjs/), some of which could trip us off and make us laugh.

> Yes, as a side gig, I built a [**compiler**](https://github.com/nxltm/VoidScript) to transform any piece of text into garbled JavaScript, completely devoid of any letters or numbers.

While software complexity grows, so does JavaScript's _ecosystem_ and even the _language_ itself.

There have been [dramatic additions to the language](https://github.com/tc39/proposals), and the emergence of "language supersets" like [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/), or transpilers like the late [CoffeeScript](https://coffeescript.org/) that try to make JavaScript more. Meanwhile, NPM is a hotbed of interlinked dependencies to which programs would crash if one package fails.

Yet, after more than two decades since its inception, it has a large ecosystem with hundreds of thousands of libraries and, this is the most important part, a great community. No longer a testament to why the language was designed in ten days in the first place.

And as Jeff Atwood, co-founder of Stack Overflow stated, **"Any application that can be written in JavaScript, will eventually be written in JavaScript."**

### History

The idea of making my own programming language started way back when I was in my college years. At first, I learnt Python at school and built a word generator for my fictional language, as I was obsessed with them when I was still in school. 

I thought of turning this concept into a mobile app in the future, so I painstakingly mapped the functions I wrote into JavaScript, multiple times, but failed. In the end, school took over and I lost interest, only coming back to it during the September term break.

That was when I didn't choose JavaScript again, but a very similar language: CoffeeScript, to try and 





The idea of making my own programing language started way back when I was still studying in polytechnic. After learning both Python and JavaScript during my first year, I decided to start a hobby project during the holidays, by developing a pseudo-translator for an unnamed fictional language, which I coded using Python. And when I thought of turning this into a mobile app in the future, I had to go through the pains of translating the functions I had written in JavaScript.

Eventually, I had no choice but to manually search for functions from Stack Overflow in my code, as I didn't learn of NPM just yet. So I spent days and weeks re-creating how my program worked for several times in a row, and I eventually gave up on it a few months into the year.

And that's when, after studying both languages, and TypeScript and Java way back, I decided to combine the concepts I knew into what would become the first draft of my own programming languages. I delved deep into the internet to gather language ideas and concepts I didn't hear of from school, and decided to incorporate them into my own.

I went on a journey to discover, learn and try out other programming languages and pick the best from them, melding these concepts into a language which I can call my own. That was when I discovered many different languages like Rust, Scala, Kotlin, Swift and ReScript on one end, and Ruby, Lua, Elixir, Nim, CoffeeScript/LiveScript, Julia, OCaml, Haskell, Elm/PureScript and more. Ultimately that led me to wonder: what was this language going to compile to? Was it C-like or Python-like? Object-oriented or functional?

The first language I came across on was CoffeeScript and tried it out. From what I heard at the time, it had an indentation-based syntax somewhat similar to Python, though with some influences from Haskell and Ruby (two programming languages I knew about but still haven't tried), but I had been programming in Python for a while.

I wanted to engineer a language that melded the best of three different programming styles: functional, object-oriented and imperative. I delved into days of research and reading documentation on many programming languages, whether they used whitespace or not. Eventually, over many months of experimenting, I drafted out my first documentation in February 2021, and after a few failed attempts and many, _many_ name changes.

Eventually I arrived at a syntax similar to JavaScript, but with many features and syntax sugar from the languages I chanced upon. In July that same year I took many hours trying to come up with a grammar to get a feel of how editing a script in my language would feel like. The language is planned to be implemented in JavaScript and parsed through Babel, which would generate all the neat polyfills for use in coding projects.

### Features

- **SEAMLESS INTEROP**

Protea runs on the browser, so JavaScript, TypeScript and Protea stacks can be fully mixed for totally seamless integration. Protea classes are ultimately JavaScript classes. You can create JavaScript objects, call their methods and inherit from JavaScript classes transparently from Protea. Similarly, JavaScript code can reference Protea classes and objects.

```js
val double = |x| = x * 2,
  increment = |x| = x + 1
var answer = 5 |> double |> double |> increment |> double
print(answer) // 42
val question: string = answer switch {
  case 42: 'life, the universe, everything'
  case _: sf'$answer%d is not the answer'
}
function primes(~max: number): number[] {
  var isPrime = (for (0 till max) true) as Array
  for (val p in 2 till Math.sqrt(max) by 2)
    for (val q in 2 * p till n by p)
      isPrime[i] = false
  return (2 till max).filter(isPrime[_])
}
print(primes(~max = 40));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]
```

**STATIC TYPING, DYNAMIC FEEL**

The Protea compiler is smart about static types. Most of the time, you need not tell it the types of your variables. Instead, its powerful type inference will figure them out for you.

```js
let score = 10;
let add = |a, b| = a + b;
let myFloat: float = float(1 + 10);

let myInt = 5
let myInt: int = 5
let myInt = (5: int) + (4: int)
let add = |x: int, y: int|: int = x + y
let drawCircle = |~radius as r: int|: circleType {}

type scoreType = int;
let x: scoreType = 10;

type coordinates<a> = [a, a, a];
let a: coordinates<int> = [10, 20, 20];
let b: coordinates<float> = [10.5, 20.5, 20.5];
type Student = { taughtBy: Teacher };
type Teacher = { students: Array<Student> };

type IntegersAbove2<x: int> = x (where x > 2)
```

**FAST AND FASTER**

Protea has a very small selection of data types: numbers, strings, booleans, regular expressions, functions, options, lists, sets and maps. Protea's standard library encourages, even promotes immutability; all of its data structures do not modify themselves, but return new ones, keeping the changes throughout the data.

```js
var zero = 0;
var _93 = 93;
var largeNumber = 12 ** 1040;
var googol = 0z40XE0; // Duodecimal literals!
var maximumByte = bool("FF", 16);
var fiftyFiveGoogol = int("<55>0", googol);
var isPrime = />
  ^ 1? $ |
  ^ (?<prime> 1 1+?) \g<prime>+? $
</;
```

**TRAITS**

Combine the flexibility of TypeScript-style interfaces with the power of classes. Think principled multiple-inheritance. In Scala, multiple traits can be mixed into a class to combine their interface and their behavior.

```js
abstract class Spacecraft {
  function engage(): Unit
}

trait CommandoBridge extends Spacecraft {
  function engage(): Unit = {
    for (var _ in 1 to 3)
      speedUp()
  }
  function speedUp(): Unit
}

trait PulseEngine extends Spacecraft {
  const maxPulse: Int
  var currentPulse: Int = 0
  function speedUp(): Unit = {
    if (currentPulse < maxPulse)
      currentPulse += 1
  }
}

class StarCruiser extends [
  Spacecraft
] implements [
  CommandoBridge, PulseEngine
] {
  const maxPulse = 200
}
```

**EVERYTHING IS AN EXPRESSION**

Control-flow structures such as `if`, `for`, `switch` and `match`, have been highly revised and improved. Now, they are considered expressions.

```js
let message = if (isMorning) "Good morning!" else "Hello!"
for (let x in 1 to 3) console.log(x)

while (true) {
  const x = Math.random()
  if (x > 0.3) break(x) // breaks the loop and returns its value
}
```

**PATTERN MATCHING**

While `switch` in other languages can allow for multiple cases and type-safe equality checks in place of implicit fallthrough, the `switch` construct has been made more powerful than in other languages and can be used to match and destructure expressions.

```js
type status = Vacations<int> | Sabbatical<int> | Sick | Present
type reportCard = {passing: bool, gpa: float}
type person =
  | Teacher<{ name: string, age: int }>
  | Student<{ name: string, status, reportCard }>;
let person1 = new Teacher({name: "Jane", age: 35});

let message = switch (person1) {
  case Teacher<{name: "Mary" | "Joe"})>:
    "Hey, still going to the party on Saturday?";
  case Teacher<{let name}>: "Hello $name."
  case Student<{let name, reportCard: {passing: true, let gpa}}>:
    "Congrats $name, nice GPA of $gpa you got there!";
  case Student<{
    reportCard: {gpa: 0.0},
    status: (Vacations | Sabbatical)<{let daysLeft}>
  }>: "Come back in $daysLeft days!";
  case Student<{status: Sick}>: "How are you feeling?";
  case Student<{let name}>: "Good luck next semester $name!";
};
```

## Overview

- Protea is a language for building fullstack cross-platform apps and libraries for the modern and future web. Protea looks like JS, acts like JS, and compiles to the highest quality of clean, readable and performant JS, directly runnable in browsers and Node.

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

### Design goals

- Easy readability
- Concise and readable code
- Small, but expandable grammar

---

If you have any questions, comments or suggestions for the language, please feel free to open an issue on GitHub and I will promptly respond (though not at the moment as I am busy with school). Protea is currently still in its conceptual and experimental stage, as I am still experimenting on the language's grammar.

---

# Protea's Reference

```swift
if ()
```
