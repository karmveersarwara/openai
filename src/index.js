
const express= require("express");
// const cors=require("cors");
const app=express();

const OPENAI_API_KEY='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';
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,  
});
const openai = new OpenAIApi(configuration);

// app.route('/chat', methods=['POST']);
app.use(function (req, res, next) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// app.use(app.router);
// app.use(express.logger());
// app.use(express.bodyParser());
// app.use(cors());

app.use(express.json());
app.get('/ping',(req,res)=>{
        res.json({
            massage:'pong',
        })
})

app.post('/chat',(req,res)=>{
    // const question='what is ai';
    const question=req.body.question; 
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      }).then(response=>{
        return response.data.choices;
        }).then((response)=>{ 
        return response[0].text;
        }).then((answer)=>{
            res.json({
            answer:answer.split("\n").filter(value=>value).map(value=>value.trim()),
            question:question,
            });
        });
    
})
app.listen(8000,()=>{ console.log("server is start on 8000 ");})


    // res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    // 'Access-Control-Allow-Origin': '*' 
   
// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8000);




// const express = require("express");
// const OPENAI_API_KEY = "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";
// const { Configuration, OpenAIApi } = require("openai");
// const cors = require("cors");
// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const app = express();
// app.use(cors());
// // app.use(function (req, res, next) {
// //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// //     res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type, Accept');
// //     res.setHeader('Access-Control-Allow-Credentials', true);
// //     next();
// // });
// app.use(express.json());

// app.get("/ping", (req, res) => {
//   res.json({
//     message: "pong",
//   });
// });
// app.post("/chat", (req, res) => {
//   const question = 'what is ai';
//   // const question = req.body.question;

//   openai
//     .createCompletion({
//       model: "text-davinci-003",
//       prompt: question,
//       max_tokens: 4000,
//       temperature: 0,
//     })
//     .then((response) => {
//       console.log({ response });
//       return response?.data?.choices?.[0]?.text;
//     })
//     .then((answer) => {
//       console.log({ answer });
//       const array = answer
//         ?.split("\n")
//         .filter((value) => value)
//         .map((value) => value.trim());

//       return array;
//     })
//     .then((answer) => {
//       res.json({
//         answer: answer,
//         propt: question,
//       });
//     });
//   console.log({ question });
// });

// app.listen(8000, () => {
//   console.log("Server is listening on port 8000");
// });
