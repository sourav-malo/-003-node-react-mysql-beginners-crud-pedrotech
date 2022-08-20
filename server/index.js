const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'employee_system'
})

app.post('/create', (req, res) => {
  const { name, age, position, country, wage } = req.body

  db.query(
    "INSERT INTO `employees`(`name`, `age`, `position`, `country`, `wage`) VALUES(?, ?, ?, ?, ?)",
    [name, age, position, country, wage],
    (err, result) => {
      if(err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

app.get('/employees', (req, res) => {
  db.query(
    "SELECT * FROM `employees`",
    (err, result) => {
      if(err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

app.listen(3001, () => console.log('Your server is running on port 3001'))