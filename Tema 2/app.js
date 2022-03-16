const http = require('http')
const querystring = require('querystring')

const {getPeople, getPerson, createPerson, updatePerson, deletePerson, getSomePeopleAge, getSomePeopleCountry } = require('./controllers/peopleController')


const server = http.createServer((req, res)=>{

    if(req.url === '/api/top100' && req.method === 'GET') {
        getPeople(req, res)
    } else if(req.url.match(/\/api\/top100\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getPerson(req, res, id)
    } else if(req.url === '/api/top100' && req.method === 'POST') {
        createPerson(req, res)
    } else if(req.url.match(/\/api\/top100\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updatePerson(req, res, id)
    } else if(req.url.match(/\/api\/top100\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deletePerson(req, res, id)
    } else if(req.url.match(/\/api\/top100country\/\w+/) && req.method === 'GET') {
        const qs = req.url.split('/')[3]
        console.log(querystring.parse(qs))
        getSomePeopleCountry(req, res, qs)
    }  else if(req.url.match(/\/api\/top100age\/\w+/) && req.method === 'GET') {
        const qs = req.url.split('/')[3]
        age1 = qs.age1
        age2 = qs.age2
        console.log(querystring.parse(qs))
        getSomePeopleAge(req, res, age1, age2)
    }  
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }

    console.log(123)
})



const  PORT = process.env.PORT || 5010

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)) 