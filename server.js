const usuario = require("./models/usuario")

const express = require("express")
const app = express()

app.listen(80);

app.get("/", function(req,res){
        res.render("template1")
})

app.get("/template1",function(req,res){
        res.render('template1')
})

app.get('/login',function(req,res){
        res.render("login")
})

app.get("/CadastroUsuario", function(req,res){
        res.render("cadastroUsuario")
})

app.get("/cadastroOng", function(req,res){
        res.render("cadastroOng")
})

app.get("/doacao", function(req,res){
        res.render("doacao")
})

app.get("/alimentos",function(req,res){
        res.render('alimentos')
})

app.get("/brinquedos",function(req,res){
        res.render('roupas')
})

app.get("/roupas",function(req,res){
        res.render('roupas')
})

app.get("/dinheiro",function(req,res){
        res.render('dinheiro')
})

app.get("/outros",function(req,res){
        res.render('outros')
})

app.get("/Ajuda", function(req,res){
        res.render("Ajuda")
})

app.get("/esqueceuSenha", function(req,res){
        res.render("esqueceuSenha")
})


app.use('/static', express.static(__dirname + '/public'));




const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

//configuração handlebars para 
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set("view engine",'handlebars')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//esse bloco é disparado pelo enviar do formulario
app.post('/cadUsuario',function(req,res){
        usuario.create({
                nome:req.body.nome,
                senha:req.body.senha
        }).then(function(){
                res.send("Cadastro com Sucesso")
        }).catch(function(){
                res.send("Erro"+erro)
        })
})
