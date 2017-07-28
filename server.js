const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')
var todos = []
var completed = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.get('/', (req, res) => {
  res.render('list', { todos: todos, completed: completed })
})

app.post('/add', (req, res) => {
  todos.push(req.body.todo)
  res.redirect('/')
})

app.post('/completed', (req, res) => {
  var i = todos.indexOf(req.body.marked)
  if (i != -1) {
    todos.splice(i, 1)
    completed.push(req.body.marked)
  }
  res.redirect('/')
})

app.listen(3000, (req, res) => {
  console.log('Listening ft. Andre 3000')
})
