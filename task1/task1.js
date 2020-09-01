function reverseString(str) {
  return str.split("").reverse().join("");
}

process.stdin.on("data", (chunk) => {
  const input = chunk.toString();
  const str = input.slice(0, input.length - 1);
  reverseString(str);
  console.log(reverseString(str));
});
