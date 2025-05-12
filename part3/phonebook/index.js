require('dotenv').config()
const express = require('express')
const Person = require('./models/person')

const app = express()

const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

//TO-DO: extra credit - configure morgan so that it also shows the data sent in HTTP POST requests

/*let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]*/

app.get('/info', (request, response) => {
    const time = new Date()

    Person.find({}).then(people => {
        response.send(
            `<p>Phonebook has info for ${people.length} people.</p>
            <p>${time}</p>`
        )
    })

})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
   Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
   })
   .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
   Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))

   
    /* const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()*/
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const id = Math.floor(Math.random() * (Math.floor(10000) - Math.ceil(5) + 1) + Math.ceil(5))

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    /*if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: `${body.name} already added to phonebook`
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    console.log(person)

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    console.log(name, number)

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                console.log('person not found')
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})