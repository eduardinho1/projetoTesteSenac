const usuario = require("./models/usuario")

const Ong = require("./models/Ong")

const express = require("express")
const app = express()

app.listen(3000);

app.get("/", function(req,res){
        res.render("template1")
})

app.get("/template1",function(req,res){
        res.render('template1')
})

app.get('/login',function(req,res){
        res.render("login")
})

app.get('/escolhaTipo',function(req,res){
        res.render("escolhaTipo")
})


app.get("/cadastroUsuario", function(req,res){
        usuario.findAll().then(function(doadores){ 
        res.render('cadastroUsuario',{doador: doadores.map(pagamento =>pagamento.toJSON())})
        })
})

app.get("/cadastroOng", function(req,res){
        Ong.findAll().then(function(doadores){ 
        res.render('cadastroOng',{doador: doadores.map(pagamento =>pagamento.toJSON())})
        })
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

app.get("/meuPerfil", function(req,res){
        res.render("meuPerfil")
})

app.get("/nossasOng", function(req,res){
        res.render("nossasOng")
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
                senha:req.body.senha,
                Email:req.body.Email,
                cpf:req.body.cpf,
                Endereco1:req.body.Endereco1,
                endereco2:req.body.endereco2,
                estado:req.body.estado,
                cidade:req.body.cidade
        }).then(function(){
                res.render('login')
        }).catch(function(){
                res.send("Erro"+erro)
        })
})

app.post('/cadOng',function(req,res){
        Ong.create({
           nomeOng:req.body.nomeOng,
           cnpj:req.body.cnpj,
           dataFundacao:req.body.dataFuncao,
           email:req.body.email,
           senha:req.body.senha,
           estado:req.body.estado,
           cidade:req.body.cidade,
           endereco1:req.body.endereco1,
           endereco2:req.body.endereco2    
        }).then(function(){
                res.render('login')
        }).catch(function(){
                res.send("Erro"+erro)
        })
})

app.get('/delete/:id', function(req,res){
        usuario.destroy({
            where:{'id': req.params.id}
        }).then(function(){
            usuario.findAll().then(function(doadores){
                res.render('cadastroUsuario', {doador: doadores.map(pagamento => pagamento.toJSON())})
            })
    
        .catch(function(){res.send("não deu certo")})
        })
    })

    app.get('/apaga/:id', function(req,res){
        Ong.destroy({
            where:{'id': req.params.id}
        }).then(function(){
            Ong.findAll().then(function(doadores){
                res.render('cadastroOng', {doador: doadores.map(pagamento => pagamento.toJSON())})
            })
    
        .catch(function(){res.send("não deu certo")})
        })
    })

app.get('/update/:id', function(req,res){
        usuario.findAll({ where:{'id': req.params.id}}).then(function(doadores){
                res.render('atualiza',{doador: doadores.map(pagamento => pagamento.toJSON())})
        })
})

app.post('/updateUsuario', function(req,res){
        usuario.update({nome: req.body.nome, senha:req.body.senha},{
                where:{id:req.body.codigo}}
        ).then(function(){
                usuario.findAll().then(function(doadores){
                res.render('cadastroUsuario',{doador: doadores.map(pagamento => pagamento.toJSON())})

                }).catch(function(erro){
                        res.send("Erro "+erro)
                })
        })
         
        
})