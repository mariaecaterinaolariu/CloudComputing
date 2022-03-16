const People = require('../models/peopleModel')
const { getPostData } = require('../utils')

// Gets all the information about the top 100 forbes listed people
// route: GET /api/top100
async function getPeople(req, res){
    try{
        const people = await People.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(people))
        res.end()
    }
    catch(error){
        console.log(error)
    }
}

// Gets all the information about only one person
// route: GET /api/top100/:id. -> note the need to put .
async function getPerson(req, res, id){
    try{
        const person = await People.findById(id)

        if(!person){
        res.writeHead(404, {'Content-Type': 'application/json'}) //bad request
        res.write(JSON.stringify('Person not found'))
        res.end()
        
        }
        else{
        res.writeHead(200, {'Content-Type': 'application/json'}) 
        res.write(JSON.stringify(person))
        res.end()
        }
    }
    catch(error){
        console.log(error)
    }
}

// Create a random person to add to the now top100 + new person
// route: POST /api/top100
async function createPerson(req, res){
    try{

        const body = await getPostData(req)
        const {name, age, countryOfCitizenship, philantropyScore} = JSON.parse(body)
        
        const person = {
            name,
            age,
            countryOfCitizenship,
            philantropyScore
        }

        const newPerson = await People.create(person)

        res.writeHead(201, { 'Content-Type': 'application/json'}) //201 - created
        return res.end(JSON.stringify(newPerson))

    }
    catch(error){
        console.log(error)
    }
}

// Update data of a person 
// route: PUT /api/top100/:id. -> note again the .
async function updatePerson(req, res, id){
    try{
        const person = await People.findById(id)

        if(!person){
            res.writeHead(404, {'Content-Type': 'application/json'}) //bad request
            res.write(JSON.stringify('Person not found'))
            res.end()
        }
        else{
            const body = await getPostData(req)
            const {name, age, countryOfCitizenship, philantropyScore} = JSON.parse(body)
            
            const personU = {
                name: name || person.name ,
                age: age || person.age, //(age will be either the age we get from getPostData or the existing age of the person found first)
                countryOfCitizenship: countryOfCitizenship|| person.countryOfCitizenship,
                philantropyScore: philantropyScore ||person.philantropyScore
            }

            const updatedPerson = await People.update(id, personU)

            res.writeHead(200, { 'Content-Type': 'application/json'})
            return res.end(JSON.stringify(updatedPerson))

        }
    }
    catch(error){
        console.log(error)
    }
}


// Delete a person from the list
// route: DELETE /api/top100/:id. -> note the need to put . for id -.(1,100)
async function deletePerson(req, res, id){
    try{
        const person = await People.findById(id)

        if(!person){
        res.writeHead(404, {'Content-Type': 'application/json'}) //bad request
        res.write(JSON.stringify('Person not found'))
        res.end()
        
        }
        else{
        
        await People.remove(id)

        res.writeHead(200, {'Content-Type': 'application/json'}) 
        res.write(JSON.stringify({"message": ` Person of rank ${id} had been removed`}))
        res.end()
        }
    }
    catch(error){
        console.log(error)
    }
}

// Gets all the information about some people based on the given countr..
// route: GET /api/top100country/....
async function getSomePeopleCountry(req, res, countryOfCitizenship){
    try{
        const people = await People.findByCountry(countryOfCitizenship)

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(people))
        res.end()
    }
    catch(error){
        console.log(error)
    }
}


// Gets all the information about some people between ages given..
// route: GET /api/top100age/....
async function getSomePeopleAge(req, res, age1, age2){
    try{
        const people = await People.findByAgeInterval(age1,age2)

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(people))
        res.end()
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    getPeople, 
    getPerson,
    createPerson,
    updatePerson,
    deletePerson,
    getSomePeopleCountry,
    getSomePeopleAge
}