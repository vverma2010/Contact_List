const express = require('express');
const path = require('path');
const port = 8001;


const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware 1
// app.use(function(req,res,next){
// console.log('middleware1 is called');
// next();
// });


// //middleware 2
// app.use(function(req,res,next){
//     console.log('middleware2 is called');
//     next();
//     });


// var contactList = [
//     // {
//     //     name: "Vaibhav", phone: '11111111'
//     // },

//     // {
//     //     name: "Vicky", phone:'214568709'
//     // },

//     // {
//     //     name: "Vansh", phone:'0987564321'
//     // }
// ]




app.get('/',function(req, res){
    // console.log(__dirname);  //used to check current directory name
    // console.log(req);
// res.send('<h1>Cool, its running ! or is it ??</h1>')

    Contact.find({},function(err,contact){

if(err){

    console.log('Error in fetching contacts from db');
    return;

    }
    return res.render('home' , {title : 'My Contact List',contact_list : contact



    });

});
});



app.get('/practice', function(req,res){
    return res.render('practice', {title : "Let's play with ejs "});
});


app.post('/create-contact', function(req,res){
//    console.log(req.body);
//    console.log(req.body.name);
//    console.log(req.body.phone);
    
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    
    // });
    
    Contact.create({

        name: req.body.name,
        phone: req.body.phone


    },function(err,newContact){

        if(err){
            console.log('error in creating a contact !!');
            return;
        }

        console.log('******************', newContact);
        return res.redirect('back');
    });
    
});
    // for deleting a contact
app.get('/delete-contact',function(req,res){

    // get the id from query in the url
    console.log(req.query);
    // get the query from url

    let id = req.query.id;
    // find the contact in the DB using id and delete

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('error in deleting the contact');
            return;
        }
        return res.redirect('back');


    });

    
});

app.listen(port, function(err){
    if(err)
    {
        console.log('Error in running the server', err);
    }
    console.log('Yup !! My express server is running on port:',port);
});