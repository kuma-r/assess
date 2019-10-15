const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const async=require('async');
const waterfall = require('async-waterfall');

app.use(express.json());


var movies={"Horror":[{"number":1,"name":"annabelle"}],"Romantic":[{"number":1,"name":"The fault in our stars"}],"Thrillers":[{"number":1,"name":"Joker"}]};

app.get('/',(req,res)=>res.send(`Welcome to online movie streaming`));

app.get('/api/genres',(req,res)=>{
    res.send(movies);
});

app.get('/api/genres/:category',(req,res)=>{
    res.send(movies[req.params.category]);
});

app.post('/api/genres/:category',(req,res)=>{
    let new1={number: movies[req.params.category].length +1,name: req.body.name};
    (movies[req.params.category]).push(new1);
    res.send(movies);
});

app.put('/api/genres/:category/:id',(req,res)=>{
    movies[req.params.category][req.params.id].name=req.body.name;
    res.send(movies);
});

app.delete('/api/genres/:category/:id',(req,res)=>{
    delete movies[req.params.category][req.params.id];
    res.send(movies);
});


function waitd(){
    console.log("hii");
    setTimeout(()=>console.log("waiting"),3000);
}


// app.get('/api/all',(req,res)=>{
//     async function asyncCall(){
//         await waitd();
//         res.send(movies.Romantic)
// };
// asyncCall();
// })


app.get('/api/all',(req,res)=>{
    var result=[];
    waterfall([
        function task1(callback) {
            callback(null,movies.Horror); 
        },
        function task2(res1,callback) {
            callback(null,movies.Romantic); 
            result.push(res1);
        },
        function task3(res2,callback) {
            result.push(res2);
            callback(null,movies.Thrillers);  
        }
    ],
        function (err,final){
            result.push(final);
            res.send(result);
        })
    
});
    






app.listen(3000,()=>console.log,()=>console.log('server started'));






























// let accounts=[{
//     "id":1,
//     "username":"kumar",
//     "role":"student",
// }];
// app.get('/accounts/:id',(request,response)=>{
//     const accountId=Number(request.params.id)
//     const getAccount=accounts.find((account)=>account.id===accountId);
//     if(!getAccount) return response.status(500).send('Account not found')
//     else{
//         response.json("getAccount");
//     }  
// });