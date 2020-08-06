import { createReadStream, createWriteStream } from "fs";
import csv from "csvtojson";

const csvFilePath = "./csv/nodejs-hw1-ex1.csv";
const outputFilePath = "./output.txt";
const readable = createReadStream(csvFilePath);
const writable = createWriteStream(outputFilePath);
const onError = (error) => console.log(error);

readable
  .on("error", onError)
  .pipe(
    csv()
      .preFileLine((line, lineNumber) => {
        let lineContent = lineNumber ? line : line.toLowerCase();
        return lineContent;
      })
      .subscribe((jsonObj) => {
        return new Promise((resolve, reject) => {
          delete jsonObj.amount;
          resolve();
        });
      })
  )
  .on("error", onError)
  .pipe(writable)
  .on("error", onError);
