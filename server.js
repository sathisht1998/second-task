const express = require('express');
const cors = require('cors');
const finalData = require('./index');

const app = express();
const port = 1222;

app.use(cors)
app.get('/',(req,res) =>{
    res.json(finalData)
})

app.listen(1222,()=>{
    console.log('server is running');
})