const http = require("http");
let fs = require('fs');
const {PythonShell} =require('python-shell');


function nocache(module) {require("fs").watchFile(require("path").resolve(module), () => {delete require.cache[require.resolve(module)]})};
nocache("./tweets.json");
var dataFile = require("./tweets.json");
var metrics = require("./metrics.json");


const PORT = process.env.PORT || 5000;
let text, markup = ``;

const server = http.createServer(async (req, res) => {

    if(req.url ==="/index"){
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
        };
        PythonShell.run('tema1.py', options, function (err, result){
            if (err) throw err;
            // result is the number of the hashtag and the hashtag itself
            console.log('result: ', result.toString());
      });
    }
    
    else if (req.url === "/api/tweets" && req.method === "GET") {
        dataFile = require("./tweets.json");
        sending = dataFile
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(sending));
    }

    else if (req.url === "/metrics" && req.method === "GET"){
        res.writeHead(200, { "Content-Type": "application/json" });
        metricData = metrics;
        res.end(JSON.stringify(metricData));
    }
    else if (req.url === "/api" && req.method === "GET") {
        dataFile = require("./tweets.json");
        res.writeHead(200, { "Content-Type": "application/json" });
        for (let i=0; i < dataFile.data.length; i++){
            res.write(dataFile.data[i].tweet);
        }
        res.end();
    }
    
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});