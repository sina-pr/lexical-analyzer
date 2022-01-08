const keywords = [
  'if',
  'else',
  'int',
  'string',
  'void',
  'return',
  'class',
  'var',
  'List',
  'foreach',
  'while',
  'try',
  'finally',
  'public',
  'static',
  'get',
  'set',
];

const operators = ['+', '-', '*', '/', '='];

const delimiter = ['(', ')', '{', '}', '<', '>', ';', '.', ':', ','];

function isKeyword(character) {
  for (let i = 0; i < keywords.length; i++) {
    if (character === keywords[i]) {
      return true;
    }
  }
  return false;
}

function isDelimiter(character) {
  for (let i = 0; i < delimiter.length; i++) {
    if (character === delimiter[i]) {
      return true;
    }
  }
  return false;
}

function isOperator(character) {
  for (let i = 0; i < operators.length; i++) {
    if (character === operators[i]) {
      return true;
    }
  }
  return false;
}

let row = 1;
let col = 1;
let temp = [];
let result = [];

function getCharacter(word, next, _index) {
  temp.push(word);

  if (temp.join('') === '\n') {
    row++;
    col = 1;
    temp = [];
    return null;
  }
  if (isOperator(next) || isDelimiter(next)) {
    let character = temp.join('');
    temp = [];
    return character;
  } else if (isOperator(word) || isDelimiter(word)) {
    let character = temp.join('');
    temp = [];
    return character;
  } else if (word === ' ') {
    temp.pop();
    let newCharacter = temp.join('');
    temp = [];
    return newCharacter;
  } else return null;
}

export default function scanCodeQuery(code) {
  result = [];
  row = 1;
  col = 1;
  for (let i = 0; i < code.length; i++) {
    let character = getCharacter(code[i], code[i + 1], i);
    if (character && character !== ' ') {
      if (isKeyword(character)) {
        result.push({
          id: i + 'KEYWORD',
          type: 'Keyword',
          value: character,
          col: col - character.length,
          row: row,
        });
      } else if (isOperator(character)) {
        result.push({
          id: i + 'OPERATOR',
          type: 'Operator',
          value: character,
          col: col - character.length,
          row: row,
        });
      } else if (isDelimiter(character)) {
        result.push({
          id: i + 'DELIMITER',
          type: 'Delimiter',
          value: character,
          col: col - character.length,
          row: row,
        });
      } else {
        result.push({
          id: i + 'IDENTIFIER',
          type: 'Identifier',
          value: character,
          col: col - character.length,
          row: row,
        });
      }
    }

    col++;
  }
  return result;
}
// code example ....
// public class funcexer3
// {
//     public static int Sum(int num1, int num2)
//     {
//         int total;
//         total = num1 + num2;
//         return total;
//     }
//     public static void Main()
//     {
//       int n1= Convert.ToInt32(Console.ReadLine());
//       Console.Write("Enter");
//       int n2= Convert.ToInt32(Console.ReadLine());
//       Console.WriteLine(Sum(n1,n2) );
//     }
// }
