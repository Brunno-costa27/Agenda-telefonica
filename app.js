const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require("moment");
const Usuario = require("./models/usuario");
const { sequelize } = require("./models/db");
const session = require("express-session");
const flash = require("connect-flash");
const Op = Sequelize.Op;

//configurações
//handlebars
app.engine('handlebars' , handlebars({defaultLayout: 'main',
helpers: {
    formatDate: (date) => {
        return moment(date).format("DD/MM/YYYY");
    }
},
runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
      })
    );
app.set('view engine' , 'handlebars')

//body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//session
app.use(session({
    secret: "agenda",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//Midleware
app.use((req,res,next) => {
    res.locals.sucesso = req.flash("sucesso")
    res.locals.erro = req.flash("erro")
    next()
})

// Criando rotas
app.get('/login' , function(req,res){

    res.render("login");
});

app.get('/editar/:id/:usuario/:senha', function(req,res){

    res.render("editar");
});
       

//Visualiza o contato de acordo com a solicitação
app.get('/visualizar/:id/:usuario/:senha' , function(req,res){

    Usuario.findOne({where:{id: req.params.id}}).then((usuario) =>{
        res.render("visualizar",{users: usuario})
    }).catch((err) =>{
        res.send("erro");
    })    
    })


// listar todos os contatos da tabela usuario 
app.get('/listar' , function(req,res){
    Usuario.findAll({order:[['usuario','ASC']]}).then(function(usuario){ //coloca usuarios em ordem alfabetica
        
        res.render("listar_contatos",{usuario: usuario});
    })
    
});


// Cadastrando contato
app.post('/listar' , function(req,res){
    Usuario.create({
        usuario: req.body.usuario,
        senha: req.body.contato
    }).then(function(){
        res.redirect("/listar");
    }).catch(function(erro){
        res.send("Usuario não cadastrado");
    })
    
});

//Apagando um contato pelo id
app.get('/apagar/:id',function(req,res){
    Usuario.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect("/listar");
    }).catch(function(erro){
        res.send("erro");
    })
})


//editando um contato pelo id
app.post('/editar/:id/:usuario/:senha' , function(req,res){
    
    Usuario.findOne({where:{id: req.params.id}}).then((usuario) =>{
    
        usuario.usuario = req.body.nome
        usuario.senha = req.body.contato
        
        usuario.save().then(() =>{
            res.redirect("/listar")
        })
    })   
});




app.listen(8080);