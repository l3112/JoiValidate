// Taking Form Things and Body Parsing
const express = require('express');
const path = require ('path');
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();


app.use('/public',express.static(path.join(__dirname,'static','Form.html')));

app.use(bodyParser.urlencoded({extended: false}));
// parse url encoded form.

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','Form.html'))
});

app.post('/',(req,res)=>{
    console.log(req.body); //make a schema, set of rules for data

    const schema = Joi.object().keys({
        //data rules
        email : Joi.string().trim().email().required(),
        password : Joi.string().min(7).max(20).required(),
    });
    Joi.validate(req.body,schema,(err,result)=>{
        if(err){
          console.log(err);
            res.send('Error!');
        }
        console.log(result);
        res.send('Success!');

   //return at 2 hr 13 minute, the error is with the validate segment
    })

    //DB work here
    res.json({success : true});
})

app.listen(3000);

