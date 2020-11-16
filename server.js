const usuario = require("./models/usuario")

const express = require("express")
const app = express()

app.listen(80);

app.get("/template1", function(req,res){
        res.render("templete1")
})

app.get('/login',function(req,res){
        res.render("login")
})

app.get("/CadastroUsuario", function(req,res){
        res.send("cadastro para os Usuario")
})

app.get("/cadastroOng", function(req,res){
        res.send("cadastro para as Ong")
})

app.get("/doacoes", function(req,res){
        res.send("Doação")
})

app.get("/formasDeContato", function(req,res){
        res.send("outras formas para falar conosco")
})



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
