const _ = require('lodash');
const yaml = require('js-yaml');
const fs = require('fs');
const V = require('voca');
const {PowerSet, Permutation} = require('js-combinatorics');

const scope = ({quote = "'", flags = '', multi = false}) => {
  const style = quote == "'" ? 'single' : 'double';
  const multiQuote = multi ? quote.repeat(3) + '+' : quote;
  const patterns = flags.includes('r') ? [] : [{include: '#string-escapes'}];
  const escapes = [];

  const map = {
    f: ['format', {include: '#embedded-format'}, '%%'],
    p: ['template', {include: '#embedded-placeholder'}, '##'],
    r: [
      'verbatim',
      {match: escapes, name: 'constant.character.escape.protea'},
      quote.repeat(2),
    ],
    s: ['interpolated', {include: '#embedded-expression'}, '$$'],
  };

  if (flags.includes('r'))
    for (let key of flags) if (key in map) escapes.push(map[key][2]);

  map.r[1].match = escapes.map(V.escapeRegExp).join('|');

  const results = [];

  for (let key of flags) {
    if (key in map) {
      patterns.push(map[key][1]);
      results.push(map[key][0]);
    }
  }

  let desc = '';
  switch (results.length) {
    case 0:
      desc = 'plain';
    case 1:
      desc = results[0];
    default:
      desc = new Intl.ListFormat('en').format(results);
  }

  const isMulti = multi ? 'multi ' : ' ';
  `${isMulti} ${style}-quoted ${desc} string`
    .trim()
    .replace(/\s{2,}/g, match => match[0]);

  let flagCombis = [...new Permutation(flags, flags.length)]
    .sort()
    .map(x => x.join(''))
    .join('|');

  return {
    comment: `${isMulti} ${style}-quoted ${desc} string`
      .trim()
      .replace(/\s{2,}/g, match => match[0]),
    begin: `(?<!${quote}+)\\s*((?i:${flagCombis}))(${multiQuote})\\s*`,
    contentName: `string.quoted.${style}.protea`,
    end: `\\s*((\\2)(?!${quote}+))`,
    captures: {
      1: {name: 'storage.type.string.protea'},
      2: {name: 'punctuation.definition.string.protea'},
    },
    patterns,
  };
};

const combinations = [...new PowerSet('rsfp', 4)]
  .map(x => x.join(''))
  .sort((a, b) => b.length - a.length);

const map = [];
for (const flag of combinations) {
  map.push(scope({quote: "'", flags: flag, multi: true}));
  map.push(scope({quote: '"', flags: flag, multi: true}));
  map.push(scope({quote: "'", flags: flag}));
  map.push(scope({quote: '"', flags: flag}));
}

fs.writeFileSync(
  './grammar.yaml',
  yaml
    .dump(map, {lineWidth: -1})
    .replace(/(['"])(\d+)\1:\s*\n\s*name:\s+?([\w\.\-]+)/g, '$2: {name: $3}'),
  'utf8'
);

// console.log(yaml.dump(map, {lineWidth: -1}));
