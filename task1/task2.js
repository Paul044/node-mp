const fs = require("fs");
const csv = require("csvtojson");
const { pipeline } = require("stream");

const csvFilePath = "./csv/nodejs-hw1-ex1.csv";
const outputFilePath = "./output.txt";
const readable = fs.createReadStream(csvFilePath);
const writable = fs.createWriteStream(outputFilePath);
const onError = (error) => error && console.log("Error::", error);

pipeline(
  readable,
  csv({
    colParser: {
      amount: () => undefined,
    },
  })
    .preFileLine((line, lineNumber) => {
      let lineContent = lineNumber ? line : line.toLowerCase();
      return lineContent;
    }),
  writable,
  onError
);
