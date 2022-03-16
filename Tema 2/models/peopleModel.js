let people = require('../data2.json')

const {v4 : uuidv4} = require('uuid')

const {writeDataToFile} = require('../utils')

function findAll(){
    return new Promise((resolve, reject) => {
        resolve(people)
    })
}

function findById(id){
    return new Promise((resolve, reject) => {
        const person = people.find((p) => p.rank === id) //for each person, the p.rank is the same as the id
        resolve(person)
    })
}

function lastId(){
    const lastId = people.length
    console.log(people.length)
    return lastId
}

function create(person){
    return new Promise((resolve, reject) => {
        const newPerson = {rank: uuidv4(), ...person}
        people.push(newPerson)  
        writeDataToFile('./data2.json', people)
        resolve(newPerson)
    })
}

function update(id, person){
    return new Promise((resolve, reject) => {
        const index = people.findIndex((p) => p.rank === id) 
        people[index] = {rank: id, ...person}

        writeDataToFile('./data2.json', people)
        resolve(people[index])
    })
}

function remove(id){
    return new Promise((resolve, reject) => {

        people = people.filter((p) => p.rank !== id)
        writeDataToFile('./data2.json', people)
        resolve()
    })
}

function findByCountry(countryOfCitizenship){
    return new Promise((resolve, reject) => {
        const persons = people.find((p) => p.countryOfCitizenship === countryOfCitizenship) //for each person, the p.rank is the same as the id
        resolve(persons)
    })
}

function findByAgeInterval(age1, age2){
    return new Promise((resolve, reject) => {
        const persons = people.filter((p) => p.age > age1 && p.age < age2) //for each person, the p.rank is the same as the id
        resolve(persons)
    })
}



module.exports = {
    findAll, 
    findById, 
    lastId, 
    create,
    update,
    remove,
    findByCountry,
    findByAgeInterval
}