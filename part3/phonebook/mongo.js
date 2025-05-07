const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mattadamoux:${password}@cluster0.u3sqg.mongodb.net/phonebookApp?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('password is only arg')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        
        mongoose.connection.close()
    })
}

console.log(process.argv.length)

if (process.argv.length === 5) {
    const name = process.argv[3]
    console.log(name)

    const number = process.argv[4]
    console.log(number)

    const person = new Person({
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`Added ${name} number ${number} to the phonebook`)
        mongoose.connection.close()
    })
}

