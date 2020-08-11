import { createReadStream, createWriteStream } from "fs";
import csv from "csvtojson";
const { pipeline } = require("stream");

const csvFilePath = "./csv/nodejs-hw1-ex1.csv";
const outputFilePath = "./output.txt";
const readable = createReadStream(csvFilePath);
const writable = createWriteStream(outputFilePath);
const onError = (error) => console.log(error);

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