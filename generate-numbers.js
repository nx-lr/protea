const V = require("voca");
const _ = require("lodash");
const yaml = require("js-yaml");

const R = String.raw;
const data = [
  {
    prefix: "(?:[2-9]|[1-9]\\d+)b",
    name: "arbitrary-radix",
    digits: R`\d`,
  },
  {prefix: "0b", name: "binary", digits: "[01]"},
  {prefix: "0q", name: "quaternary", digits: "[0-3]"},
  {prefix: "0s", name: "senary", digits: "[0-5]"},
  {prefix: "0o", name: "octal", digits: "[0-7]"},
  {prefix: "0z", name: "duodecimal", digits: R`[\dab]`},
  {prefix: "0x", name: "hexadecimal", digits: R`\h`},
  {prefix: "", name: "decimal", digits: R`\d`},
  {prefix: R`\d+(?=\w+)`, name: "illegal", digits: R`\w`},
];

const prefixes = data
  .map(({prefix, name, digits}) => {
    const NAME = name == "illegal" ? "invalid.illegal.numeric.pta" : `constant.numeric.${name}.pta`;

    let decimalOrFraction = {
      match: R/*re*/ `(?ix)\s*\b
(${prefix})#radix
(?:${digits}+(?:\p{Pc}*${digits}+)*)#int/numer
(?:
(\.)(?:${digits}+(?:\p{Pc}*${digits}+)*)?(?:#frac
(s)(?:${digits}+(?:\p{Pc}*${digits}+)*))?|#rep
(n)(?:${digits}+(?:\p{Pc}*${digits}+)*)#denom
)?
((?:(p)(?:0|[1-9]\d*))?(p)[+-]?(?:0|[1-9]\d*))?#exp
((t[ds]?)[+-]?(?:0|[1-9]\d*))?#sf
(_?[\p{Pc}\p{L}][\w\p{Pd}]*(?::[\p{Pc}\p{L}][\w\p{Pd}]*)*)?#type
\b\s*
`,
      captures: {
        0: {name: NAME},
        1: {name: "storage.type.numeric.pta"},
        2: {name: "punctuation.separator.period.pta"},
        3: {name: "punctuation.separator.repeating.pta"},
        4: {name: "punctuation.separator.fraction.pta"},
        5: {name: "constant.numeric.other.exponent.pta"},
        6: {name: "punctuation.separator.radix.pta"},
        7: {name: "punctuation.separator.exponent.pta"},
        8: {name: "constant.numeric.other.precision.pta"},
        9: {name: "punctuation.separator.precision.pta"},
        10: {name: "storage.type.numeric.pta"},
      },
    };

    let leadingDecimal = {
      match: R/*re*/ `(?ix)\s*\b
(${prefix})#radix
(?:${digits}+(?:\p{Pc}*${digits}+)*)?#int/numer
(?:
(\.)(?:${digits}+(?:\p{Pc}*${digits}+)*)?(?:#frac
(s)(?:${digits}+(?:\p{Pc}*${digits}+)*))?#rep
()#denom
)
((?:(p)(?:0|[1-9]\d*))?(p)[+-]?(?:0|[1-9]\d*))?#exp
((t[ds]?)[+-]?(?:0|[1-9]\d*))?#sf
(_?[\p{Pc}\p{L}][\w\p{Pd}]*(?::[\p{Pc}\p{L}][\w\p{Pd}]*)*)?#type
\b\s*
`,
      captures: {
        0: {name: NAME},
        1: {name: "storage.type.numeric.pta"},
        2: {name: "punctuation.separator.period.pta"},
        3: {name: "punctuation.separator.repeating.pta"},
        4: {name: "punctuation.separator.fraction.pta"},
        5: {name: "constant.numeric.other.exponent.pta"},
        6: {name: "punctuation.separator.radix.pta"},
        7: {name: "punctuation.separator.exponent.pta"},
        8: {name: "constant.numeric.other.precision.pta"},
        9: {name: "punctuation.separator.precision.pta"},
        10: {name: "storage.type.numeric.pta"},
      },
    };

    return [decimalOrFraction, leadingDecimal];
  })
  .flat(1);

console.log(
  yaml
    .dump(prefixes)
    .replace(/\\`/g, "`")
    .replace(/'(\d+)':\s*\n\s+\bname\b:\s+(.+)/g, "$1: {name: $2}")
    .replace(/\bpatterns\b:\s+-\s+(.+)/g, "patterns: [$1]")
    .replace(/'(\d+)'/g, "$1")
);
