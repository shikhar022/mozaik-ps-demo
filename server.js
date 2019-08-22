require('dotenv').load({ silent: true })

const path = require('path')
const Mozaik = require('@mozaik/server').default
const express = require('express')
const fs = require('fs')
const app = express()

let configFile = process.argv[2] || 'conf/config.yml'
console.log(`> using config file: '${configFile}'\n`)

Mozaik.configureFromFile(path.join(__dirname, configFile))
    .then(config => {
        require('./src/register_apis')(Mozaik, configFile, config)
        Mozaik.start()
    })
    .catch(err => {
        console.error(err)
    })


app.get('/rest/employees', function (req, res) {
  var filename = path.join(__dirname, 'public/employees.json')
  var contents = fs.readFileSync(filename, 'utf8')
  res.send(contents)
})

app.get('/rest/departments', function (req, res) {
  var filename = path.join(__dirname, 'public/departments.json')
  var contents = fs.readFileSync(filename, 'utf8')
  res.send(contents)
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('Express app listening on port 8081!')
})
