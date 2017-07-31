const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')
const expressSession = require('express-session')

app.use(expressSession({ secret: 'fooberry', resave: false, saveUninitialized: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.get('/', (req, res) => {
  const todosOpen = req.session.todosOpen || []
  const todosClosed = req.session.todosClosed || []
  res.render('list', { todosOpen, todosClosed })
})

app.post('/add', (req, res) => {
  const todosOpen = req.session.todosOpen || []
  const todosClosed = req.session.todosClosed || []

  req.session.todosOpen = todosOpen

  todosOpen.push(req.body.todos)

  console.log('OPEN: ' + todosOpen)

  res.redirect('/')
})

app.post('/completed', (req, res) => {
  const todosOpen = req.session.todosOpen || []
  const todosClosed = req.session.todosClosed || []

  var i = todosOpen.indexOf(req.body.marked)
  if (i != -1) {
    todosOpen.splice(i, 1)
    todosClosed.push(req.body.marked)
  }
  console.log('CLOSED: ' + todosClosed)
  req.session.todosClosed = todosClosed
  res.redirect('/')
})

app.listen(3000, (req, res) => {
  console.log('Listening ft. Andre 3000')
})
