const fs = require("fs");
const csv = require("csvtojson");

const csvFilePath = "./csv/nodejs-hw1-ex1.csv";
const outputFilePath = "./output.txt";
const readable = fs.createReadStream(csvFilePath);
const writable = fs.createWriteStream(outputFilePath);
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
