const express = require('express');
const path= require('path');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const { format } = require('path/posix');

// creation de l'application
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.disable('x-powered-by');

// Paramètrage des CORS pour autoriser le requêtage de toute origine
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
 
    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', '*');
    next();
 
    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

// Routes à partir desquelles il va renvoyer des données lors de la solicitation

app.post('/login', (req, res)=>{
    let profil=req.body;
    let rawdata = fs.readFileSync('./data/profils.json');
    let data = JSON.parse(rawdata);
    let profilRecherche = data.profils.find(p=>{
        return p.pseudo == profil.pseudo && p.mdp==profil.mdp;
    })
    if (profilRecherche){
        var token = jwt.sign(profil, 'currentoken');
        let object = {id:profilRecherche.id,token:token,isAdmin:profilRecherche.isAdmin};
        res.send(object);
    }
    else{
        res.send(null);
    } 
});

app.post('/shopById',(req,res)=>{
    let rawdata = fs.readFileSync('./data/usersCookies.json');
    let data = JSON.parse(rawdata);
    let listId= [];
    data.usersCookies.forEach(x=>{
        if (x.idUser==req.body.id){
            if(x){
                listId.push(x.idCookie);
            }
            
        }
    })
    let rawdata2 = fs.readFileSync('./data/cookies.json');
    let data2=JSON.parse(rawdata2);
    let listCookies=data2.cookies.filter(x=>listId.includes(x.id));
    res.send(listCookies);
});

app.post('/deleteCookie',(req,res)=>{
    let rawdata = fs.readFileSync('./data/cookies.json');
    let data = JSON.parse(rawdata);
    data.cookies = data.cookies.filter(x=>x.id!=req.body.id);
    fs.writeFile ("./data/cookies.json", JSON.stringify(data), function(err) {
        if (err){
            res.send(err);
        } 
        else{
            res.send(true);
        }
    });


});

app.post('/addFavorite',(req,res)=>{
    console.log("tetete");
    let rawdata = fs.readFileSync('./data/usersCookies.json');
    let data = JSON.parse(rawdata);
    // si le pseudo n'existe pas
    var obj ={
        id : data.usersCookies.length,
        idCookie : req.body.idCookie,
        idUser : req.body.idUser
    }
    data.usersCookies.push(obj);
   
    // data.usersCookies.push(obj);
    fs.writeFile ("./data/usersCookies.json", JSON.stringify(data), function(err) {
        if (err){
            throw err;
        } 
    });
    res.send(true);
});

app.post('/removeFavorite',(req,res)=>{
    let rawdata = fs.readFileSync('./data/usersCookies.json');
    let data = JSON.parse(rawdata);
    // si le pseudo n'existe pas
    if(data.usersCookies){
        data.usersCookies.forEach(c=>{
            if (c.idCookie==req.body.idCookie && c.idUser==req.body.idUser){
                data.usersCookies.splice(data.usersCookies.indexOf(c),1);
            }
        })
    }

    fs.writeFile ("./data/usersCookies.json", JSON.stringify(data), function(err) {
        if (err){
            throw err;
        } 
    });
    res.send(true);
});

app.post('/addProfil',(req,res)=>{
    let rawdata = fs.readFileSync('./data/profils.json');
    let data = JSON.parse(rawdata);
    // si le pseudo n'existe pas
    if (!data.profils.find(p=>p.pseudo==req.body.pseudo)){
        var obj ={
            id : data.profils.length,
            pseudo : req.body.pseudo,
            mdp : req.body.mdp,
            isAdmin : req.body.isAdmin,
        }
        data.profils.push(obj);
        fs.writeFile ("./data/profils.json", JSON.stringify(data), function(err) {
            if (err){
                throw err;
            } 
        });
        res.send("success");
    }
    else{
        res.send("pseudoPris");
    } 
});

app.post('/resetFavorite',(req,res)=>{
    console.log("id",req.body.id)
    let rawdata = fs.readFileSync('./data/usersCookies.json');
    let data = JSON.parse(rawdata);
    let tab = data.usersCookies.filter(x=>req.body.id!=x.idUser);
    data.usersCookies=tab;

   
    fs.writeFile ("./data/usersCookies.json", JSON.stringify(data), function(err) {
        if (err){
            res.send(err);
        } 
        else{
            res.send(true);
        }
    });
   
});



app.post('/addCookie',(req,res)=>{
    // res.download("./images"+r);
    let rawdata = fs.readFileSync('./data/cookies.json');
    let data = JSON.parse(rawdata);
    var obj={
        id : data.cookies.length,
        prix : req.body.prix,
        nom : req.body.nom,
        image : req.body.image,
        desc : req.body.desc
    }
    data.cookies.push(obj);
    fs.writeFile ("./data/cookies.json", JSON.stringify(data), function(err) {
        if (err){
            throw err;
        } 
    });
    res.send("success");
});

app.get('/cookies',(req,res)=>{
    let rawC = fs.readFileSync('./data/cookies.json');
    let dataC = JSON.parse(rawC);

    let rawUC = fs.readFileSync('./data/usersCookies.json');
    let dataUC = JSON.parse(rawUC);
    dataC.cookies.forEach(c=>{
        c.likeByList=dataUC.usersCookies.filter(x=>x.idCookie==c.id).map(x=>x.idUser);
    })
    res.send(dataC.cookies);
});

app.post("/deleteFromFavorite",(req,res)=>{
    console.log("req",req.body);
    let file = fs.readFileSync('./data/usersCookies.json');
    let data = JSON.parse(file);
    for(let i=0;i<data.usersCookies.length;i++){
        if (data.usersCookies[i].idCookie==req.body.id){
            data.usersCookies.splice(i,1);
        }
    }
    
    fs.writeFile ("./data/usersCookies.json", JSON.stringify(data), function(err) {
        if (err){
            res.send(false);
        } 
        else{
            res.send(true);
        }
    });
    
});

// Initialisations du serveur sur le port 666
app.listen(3000, ()=>{
 console.log("serveur lancé");   
});



// app.get('/', (req, res)=>{
//     console.log(req, res);
//     res.send("Doom for ethernity");
// });

// app.get('/profil/:id', (req, res)=>{
//     console.log(req, res);
//     res.send("profil"+req.params.id);
// });

// app.get('/etudiants', (req, res)=>{
//     console.log(req, res);
//     res.sendFile(path.resolve("./data/listeEtudiants.json"));
// });

// app.get('/images', (req, res)=>{
//     console.log(req, res);
//     res.sendFile(path.resolve("./images/p1.jpg"));
// });

/** Fonction de traitement du profil */
function getProfil(id) {
    return fs.readFile(
        path.resolve('./data/listeEtudiants.json'),
        (erreur, data) => {
            if (erreur) throw erreur;
            console.log(data);
            JSON.parse(data).find(profil => {
                if (profil._id == id) {
                    console.log(profil);
                    return profil;
                }
            }
            );
        }
    )
};

