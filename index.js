const express = require('express')
const bodyParser = require('body-parser')

const studentsRoute = require('./routes/students/students.route')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.use('/students', studentsRoute)

app.listen(port, () => {
  console.log(`api listening on port ${port}`)
})
