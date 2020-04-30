const fs = require('fs')
const path = require('path')
const csvToJson = require('convert-csv-to-json')
const config = require('./config')

if (!fs.existsSync(config.outputDirectory)) {
  fs.mkdirSync(config.outputDirectory)
}

fs.readdir(config.inputDirectory, (err, fileNames) => {
  if (err) {
    console.log(err)
    return
  }

  var csvFiles = fileNames.filter(fileName => {
    return path.extname(fileName).toLowerCase() === ".csv"
  })

  csvFiles.forEach(csvFile => {
    const inputFile = path.join(config.inputDirectory, csvFile)
    const outputFile = path.join(config.outputDirectory, `${path.parse(csvFile).name}.json`)
    csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(inputFile, outputFile)
  })
})
