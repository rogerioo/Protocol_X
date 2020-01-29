let input = [
  "0xC6 0x57 0x54 0x95 0x5E 0x9E 0x6B 0xC6 0x55 0x17 0x55 0x52 0x9E 0x21",
  "0xC6 0x56 0xD7 0x55 0x29 0x5C 0x6B 0xC6 0xA7 0x95 0x5A 0x56 0x9E 0x21",
  "0xC6 0x5D 0x55 0x55 0xCD 0x6A 0x6B 0xC6 0x52 0x55 0xA5 0x2E 0x9E 0x21",
  "0xC6 0x55 0x5F 0x47 0xCD 0xFE 0x6B 0xC6 0x7A 0x9D 0xD7 0x3D 0xF4 0x6B 0xC6 0x72 0x5F 0xE7 0x49 0xF3 0x21",
  "0xC6 0xA7 0x15 0xC5 0x2D 0x6A 0x21"
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

function decodeMessage(encondeMessage, cypher) {
  let binary = [];

  encondeMessage = encondeMessage
    .split(" ")
    .map(element => parseInt(element, 16));

  for (let i = 0; i < encondeMessage.length; i++) {
    let aux = "";

    if (encondeMessage[i] === 0xc6) {
      i++;

      while (encondeMessage[i] != 0x6b && encondeMessage[i] != 0x21) {
        let convert = encondeMessage[i].toString(2);

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
      let position = cypher.indexOf(binary[i].substring(j, j + 5)).toString(2);
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

  console.log(message);
  return message;
}

function alterMessage(message) {
  let aux = "";

  for (let i = 0; i < message.length; i++) {
    aux += i & 1 ? message[i].toLowerCase() : message[i].toUpperCase();
  }

  message = message
    .replace(message, aux)
    .replace(/ /g, "_")
    .split("")
    .reverse()
    .join("");

  return message;
}

function encodeMessage(message, cypher) {
  while (message.length & 3) message += "_";

  console.log(message);

  let binary = "";

  for (const char of message) {
    let aux = char.charCodeAt(0).toString(2);

    binary += "00000000".substring(aux.length) + aux;
  }

  let aux = "",
    j = 0;

  while (j < binary.length) {
    aux += cypher[parseInt(binary.substring(j, j + 4), 2)];
    j += 4;
  }

  binary = binary.replace(binary, aux);
  console.log(binary);

  let hexadecimal = [];
  j = 0;
  console.log(binary);
  while (j < binary.length) {
    hexadecimal.push(parseInt(binary.substring(j, j + 8), 2));
    j += 8;
  }

  console.log(hexadecimal);

  hexadecimal = hexadecimal.map(element => element ^ 0x07);

  for (let i = 0; i < hexadecimal.length; i += 7) {
    hexadecimal.splice(i, 0, 0xc6);
    hexadecimal.splice(i + 6, 0, i + 7 < hexadecimal.length ? 0x6b : 0x21);
  }

  message = hexadecimal
    .map(
      element =>
        (element < 16 ? "0x0" : "0x") + element.toString(16).toUpperCase()
    )
    .join(" ");

  return message;
}

console.log(
  encodeMessage(alterMessage(decodeMessage(input[3], tableX)), tableX)
);
