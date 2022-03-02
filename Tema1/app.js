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
    //set the request route
    if(req.url ==="/index"){
        let options = {
            mode: 'text',
            pythonOptions: ['-u'], // get print results in real-time
        };
        PythonShell.run('tema1.py', options, function (err, result){
            if (err) throw err;
            // result is an array consisting of messages collected
            //during execution of script.
            console.log('result: ', result.toString());
            // res.send(result.toString())
      });
    }
    
    // If no route present
    else if (req.url === "/api/tweets" && req.method === "GET") {
        // get the todos.
        dataFile = require("./tweets.json");
        // console.log(dataFile.data[0].tweet);
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
        console.log(dataFile.data[0].tweet);
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        for (let i=0; i < dataFile.data.length; i++){
            res.write(dataFile.data[i].tweet);
        }
        //end the response
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