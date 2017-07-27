const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')

var todos = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.get('/', (req, res) => {
  res.render('list', { todos: todos })
})

app.post('/', (req, res) => {
  todos.push(req.body.todo)
  res.redirect('/')
})

app.listen(3000, (req, res) => {
  console.log('Listening on dat 3k.')
})
