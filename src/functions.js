let input = [
  0xc6,
  0x57,
  0x54,
  0x95,
  0x5e,
  0x9e,
  0x6b,
  0xc6,
  0x55,
  0x17,
  0x55,
  0x52,
  0x9e,
  0x21
];

const tableX = [
  "11110",
  "01001",
  "10100",
  "10101",
  "01010",
  "01011",
  "01110",
  "01111",
  "10010",
  "10011",
  "10110",
  "10111",
  "11010",
  "11011",
  "11100",
  "11101"
];

let binary = [];

for (let i = 0; i < input.length; i++) {
  let aux = "";

  if (input[i] === 198) {
    i++;

    while (input[i] != 107 && input[i] != 33) {
      let convert = input[i].toString(2);

      aux += "00000000".substring(convert.length) + convert;
      i++;
    }
  }

  if (aux.length) binary.push(aux);
}

for (let i = 0; i < binary.length; i++) {
  let aux = "";
  let j = 0;

  while (j < binary[i].length) {
    let position = tableX.indexOf(binary[i].substring(j, j + 5)).toString(2);
    j += 5;

    aux += "0000".substring(position.length) + position;
  }

  binary[i] = aux;
}

let hexadecimal = [];

for (let i = 0; i < binary.length; i++) {
  let j = 0;

  while (j < binary[i].length) {
    hexadecimal.push(parseInt(binary[i].substring(j, j + 8), 2));
    j += 8;
  }
}

let message = hexadecimal.map(element => String.fromCharCode(element));
message = message
  .toString()
  .replace(/,/g, "")
  .trim();

console.log(binary);
console.log(hexadecimal);
console.log("[" + message + "]");
