# Trinity

> The language of the future.

**Trinity** is an open source, featured and agile language that enables developers, designers and testers to build, test and deploy their projects with less code, no matter the platform or runtime. It provides avenues to access huge ecosystems of libraries and runtimes, without the need for any installation.

Out of the box, it provides a robust program verifier and type checker that flags any errors to you so you can catch bugs early, and comes with a unified and comprehensive API and core libraries for making everyday or specialised tasks easier.

```dart
import Process

// Reads a file and prints out the word count
class WordCount(*args) {
  if args.len != 1 {
    print('Usage: WordCount <file>')
    exit(-1)
  }

  var wordCounts: {[Str]: Int = 0} = {:}
  var file = fs.Path(args[0]).toFile()
  var raw = file.read()
    .lines().map(.trim())
    .words().map(.trim().lower())
  for let word in words: wordCounts[word] += 1

  for let key, value in wordCounts.sort():
    print"$key: $value"
}
```

### Roadmap

> Update: I have a [Trello](https://trello.com/b/A3NDX7qY/trinity-programming-language) now!

- **Grammar** (see [`grammar.yaml`](https://github.com/TehFynlNyt/TrinityLang/blob/main/grammar.yaml))
- Documentation (language and API)
- Language reference
- Lexer and parser
- Trans-compiler
- Tooling (VSCode, Atom and Nova)
- Theme, branding and website

## Overview

Trinity is ap rogramming language designed wit
Trinity is a programming language designed with web, mobile, desktop and systems in mind. It is strongly typed, compiled, garbage-collected and has explicit support for multiple paradigms, including object-oriented, functional, concurrent and reflective programming.

Trinity takes on its influences from [Go][go], [Kotlin][kotlin], [Rust][rust], [Scala][scala], [ReScript][rescript], [TypeScript][typescript], [C#][csharp], [Flix][flix], [Gosu][gosu] and [Fantom][fantom] (_not the malware_). With these influences, Trinity advocates for writing readable and expressive code, and enabling you to do in Trinity what you could in other languages.

[wtfjs]: https://github.com/denysdovhan/wtfjs/
[go]: https://golang.org/
[kotlin]: https://kotlinlang.org/
[rust]: https://www.rust-lang.org/
[rescript]: https://rescript-lang.org/
[scala]: https://www.scala-lang.org/
[swift]: https://swift.org/
[typescript]: https://www.typescriptlang.org/
[fantom]: https://fantom.org/
[csharp]: https://docs.microsoft.com/en-us/dotnet/csharp/
[flix]: https://flix.dev/
[gosu]: https://gosu-lang.github.io/

## Origins

Trinity was created in 2020 as a way to write software, apps and games, to run on the web, desktop, mobile and server with a singular language. It grew through tinkering with regular expressions and testing them with themes and writing documentation about them. The name Trinity as there are three aspects to the language: frontend, middle-end and backend.

The mission is to create a language that is portable to (lower)-level runtimes such as Deno, JS, WebAssembly, JVM, .NET, LLVM, Swift and Python, abstracting away these runtimes and UI components into a powerful API. And since this is a completely new language in the works, to enable the analysis and translation of existing code and programs in different languages to Trinity through machine learning.

### Philosophies:

- **General guidelines**: A programming language should follow a set of strict guidelines and principles, fully backed by reasons. By outlining these principles, as Trinity grows , I hope to keep myself honest and to communicate the kind of language it aspires to be.

  - **One language**: Trinity is forever one language. The compiler will not have extra flags or plugins that change how it behaves (even for language supersets like TypeScript or Groovy). We want to avoid fragmentation so to avoid programs written in different "dialects" of the language.
  - **Fail fast, fail hard**: To aid development and debugging, and to prevent _potential harmful behaviour_, Trinity aborts execution when it encounters an unrecoverable error, or in the presence of concurrency, if a process fails. This ensures that whatever is going on outside gets notified so they can take action.
  - **Useful error messages and stack traces**: Like Rust, Elixir and Python, Trinity aims to have understandable and human readable error messages. They should describe _what_ went wrong, _why_ it went wrong, _where_ it went wrong and _how_ it went wrong, and to suggest what to do about it.
  - **No warnings, only errors**: Trinity's compiler never emits warnings, only errors that abort compilation. Warnings in other languages can be suppressed. Sometimes they can be harmless but could cause adverse side effects. In Trinity, any code that seems suspicious or wrong to the compiler should be downright rejected.
  - **Documentation and unit tests**: Trinity supports useful annotations including comments, and unit test syntax, the latter inspired by Dafny. Such integrations will deeply benefit developers, and any newcomers who are learning how to use software and libraries.

- **Simplicity**: We should not confuse getting things right with making things easy. But we should try to achieve both. By removing or suppressing syntax salt, we can let other things take advantage. This in turn can improve overall developer productivity.

  - **Keyword-based**: Short keywords such as `proto`, `elem` and `def` makes it easy to visually identify the overall structure of code. All keywords are between two and six letters long, are short enough to reason about, and are written entirely in lowercase.
  - **Uniform function calls**: Trinity supports uniform function calls, where function calls `f(x, y)` can be represented in an object-oriented way, as `x.f(y)`. This is a purely syntactic mechanism and does not influence the semantics of a call.
  - **Declaration vs expression**: Trinity is functional, so everything is either an expression or declaration. Control flow statements while being statements in other languages are expressions in Trinity. Control flow statements such as `break`, `skip` and `throw` are really program calls.
  - **Naming conventions**: Trinity employs partial case-insensitivity which enables developers to use varying conventions without the need for others to know the exact spelling of an identifier. types, modules, constants and classes use uppercase, while functions, parameters, methods and variables are lowercase.
  - **Consistent syntax**: Trinity aims to have consistent and predictable syntax. For example, the syntax for string interpolations, `${}` or `$` are used in regular expressions and JSX. The syntax for types also mirror that of expressions: function application `f(a, b)`; type application `F[a, b]`.
  - **Spacing and evaluation order**: Spacing means the difference - in line with coding conventions, all operators need to be spaced out depending on how they are evaluated, and helps the parser infer on which types to perform operations on. It also gives you the ability to mold the language into whatever you desire.

- **Multi-paradigm**: Trinity supports functional, imperative, concurrent and reflective programming, the last to an extent. And the many constructs of Trinity makes it easy to separate each paradigm from one another.

  - **Nothing before `main`**: In Trinity, `main` is the entry point of a program. No (user-defined) code is ever executed before `main`. This makes it easy to reason about startup behavior.
  - **Share memory by communicating**: Trinity follows Go's paradigm of shared memory by communication. Processes should only share immutable messages (and data structures). This significantly reduces the risk of race conditions.
  - **Dead code elimination**: Trinity requires all code to be available at compile-time. This enables a range of compilation techniques, such as program analysis, code optimisation, and tree shaking.
  - **Private by default**: In Trinity, declarations are hidden by default (i.e. private) and cannot be accessed from outside of their namespace (or sub-namespaces). It is important that programmers make a conscious choice about when to make a declaration visible.
  - **Declare before use**: In Trinity things must be defined before they can be used. Declarations make it easy to assign blame; we assume declarations to be correct and check every use against its declaration. Also, unused declarations are flagged at compile time.
  - **No unnecessary declarations**: We believe that a programming language should reduce the volume of declarations it requires. Declarations may be useful and are sometimes necessary, but Trinity aims to minimize its internal dependence on them.

- **The little things**: The beauty of a new language is that it gives you a clean slate to fix all the little things that aggravate you.

  - **Default parameters and types**: functions can have default arguments; no need to write more boilerplate code for even convenience functions
  - **Explicit type conversion**: Use `as` to convert between types, and `is` for type checking. In Flix, a value of one type is never implicitly coerced or converted into a value of another type. For example,
  - **Type annotations**: Type annotations are necessary in the sense that they make it easier to read and clear up potential ambiguity. Any expression or declaration as well as their parameters can be annotated with types, and they are thrown away at runtime.
  - **Numeric precision**: Trinity only has `Nat`, `Int` and `Float` as the default numeric types. This would eliminate a lot of complexity associated with precision or integer overflow problems such as file lengths, Unicode characters, hash codes or very large lists or strings.

## Table of Contents

This document provides everything you need to know about Trinity, from the syntax, operations and features of the language, to its core libraries and modules. This is not meant to be a tutorial or reference, but rather an aid for existing developers coming from other languages who want to learn more about how the language works and have questions to ask.

This reference is a work in progress and will be improved over time. See the GitHub repository at https://github.com/TehFynlNyt/TrinityLang. Contributions and corrections are welcome.

A lot of my work on Trinity is still experimental and ongoing, so I am sharing this repository so I could get all of my ideas together and perhaps invite some of you to contribute your own. Once I get done with it, we can begin work on the compiler.

### A little disclaimer

Trinity is a language in which programs are not text. That is, the source of truth for a program is not its textual representation as source code, but its structured representation as an abstract syntax tree (AST).

This document describes Trinity in terms of its default (and currently, only) textual rendering into source code.

Trinity only encodes text in UTF-8; other encodings are not supported. Any of the standard line termination sequences can be used, depending on the platform: `\r`, `\n` or `\r\n`.

Trinity has only three file types: module (`*.trin`), script (`*.tris`), config (`*.tco`) and markup (`*.tml`).

Module files are the most commonly used as they can be imported and exported through packages. The entry point of a Trinity module is defined in the `main` function.

```dart
/// @file .trin
fun main(*args: []Str): Void { /*...*/ }
```

The type annotations or the spread `*args` declaration can be left out, so it can be `fun main {}` instead.

Script files do not have a `main` function, but they can import other modules and files.

Trinity markup is a special syntax of Trinity derived from Markdown, HTML and CSS which you can use to declaratively build user interfaces, snippets of which can be interlaced in Trinity module files, like embedded HTML in JavaScript.

```dart
import UI.{Image, ImagePicker, Sharing, Touchable, Text, View, Button}
import './functions'.submit
import logo from './assets/logo.png'

const styles = {
  style Container {
    flex: #fff;
    backgroundColor: #fff;
    alignItems: center;
    justifyContent: center;
  };
  style Logo {
    width: 305;
    height: 198;
    marginBottom: 20;
  };
  style Instructions {
    color: #888;
    fontSize: 18;
    marginHorizontal: 15;
    marginBottom: 10;
  };
};

export just elem App {
  prop selectedImage; set def selectedImage;

  async def openImagePicker =
    setSelectedImage(localUri = pickerResult.uri)

  async def openShareDialog {
    if !await Sharing.isAvailable():
      return <Toast length=long>
        Oops, sharing isn't available on your platform!
      </Toast>
    if (!selectedImage?):
      return <View style=.container>
        <Image
          source=${{uri: selectedImage.localUri}}
          style=$styles.thumbnail/>
        <Touchable
          onPress=$openShareDialogAsync
          style=$styles.button>
          <Text style=$styles.buttonText>
            Share this photo
          </Text>
        </Touchable>
      </View>
    return
  }

  return <View style=$styles.container>
    <Image source=${{uri: 'https://i.imgur.com/TkIrScD.png'}} style=$styles.logo/>
    <Text style=$styles.instructions>
      To share a photo from your phone with a friend, just press the button below!
    </Text>
  </View>
}
```

Trinity config files are like YAML and JSON, though they can be interspersed with arbitrary Trinity expressions. This includes

Trinity config files are like YAML and JSON, though they can be interspersed with arbitrary Trinity expressions.
