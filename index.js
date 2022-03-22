const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const mogran = require('morgan')
const app = express()

app.use(express.json())
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)

app.use(express.static('build'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (request, response) => {
  response.send(
    `<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date(
      Date.now()
    ).toTimeString()}</pog></div>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter((person) => person.id != id)

  response.send('success').status(200)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id == id)
  response.json(person)
})

app.post('/api/persons', (request, response) => {
  const data = request.body
  const id = Math.floor(Math.random() * 100000)
  const person = persons.find((person) => person.name == data.name)

  if (!data.name || !data.number) {
    response.json({ error: 'Please include both name and number' })
  } else if (persons.find((person) => person.name === data.name)) {
    response.json({ error: 'Your name must be unique' })
  } else {
    persons.push({ ...data, id })
    response.json({ ...data, id }).status(201)
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
