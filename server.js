const usuario = require("./models/usuario")

const Ong = require("./models/Ong")

const produtos = require("./models/cadastroProdutos")

//criptografia de dados utilizando a ferramenta chamada criptoJS
 const crypto = require("crypto-md5");


//contante responsavél pela conexão com o express. 
const express = require("express")
const app = express()


//configuração do multer que serve para fazer upload de arquivos, imagens etc
const multer= require("multer")

const storage  = multer.diskStorage({
       destination:(req,file,cb) =>{cb(null, 'public/img')},
       filename:(req,file,cb) => {cb(null,file.originalname)}
})

const upload = multer({storage})

//Configuração do login usando session
//Session é reponsavél por hospedar a sessão de cada usuario usando express-session
var session = require('express-session');

app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
}));



//req : Recebe do front-end e res: envia para o front-end.
// render: renderisa a rota e send: somente indica o nome mas não renderisa.
//findAll(): lista todos os dados do fórmulario.
//Configuração das rotas
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
        usuario.findAll({
                where:{'tipo': "Ong" }
            }).then(function(doador){ 
                res.render('cadastroOng',{doador: doador.map(pagamento =>pagamento.toJSON())})
                })
        })

app.get("/doacao", function(req,res){
        res.render("doacao")
})

app.get("/alimentos",function(req,res){
        produtos.findAll({
                where:{'categoriaDoacao': "alimentos" }
            }).then(function(produtos){ 
                res.render('alimentos',{produtos: produtos.map(pagamento =>pagamento.toJSON())})
                })
})

app.get("/brinquedos",function(req,res){
        produtos.findAll({
        where:{'categoriaDoacao': "brinquedos" }
            }).then(function(produtos){ 
                res.render('brinquedos',{produtos: produtos.map(pagamento =>pagamento.toJSON())})
                })
})

app.get("/roupas",function(req,res){
        produtos.findAll({
         where:{'categoriaDoacao': "roupas" }
            }).then(function(produtos){ 
                res.render('roupas',{produtos: produtos.map(pagamento =>pagamento.toJSON())})
                 })
})

app.get("/dinheiro",function(req,res){
        produtos.findAll({
         where:{'categoriaDoacao': "doacaoEmDinheiro" }
                }).then(function(produtos){ 
                  res.render('dinheiro',{produtos: produtos.map(pagamento =>pagamento.toJSON())})
                })
})

app.get("/animais",function(req,res){
        produtos.findAll({
         where:{'categoriaDoacao': "animais" }
           }).then(function(produtos){ 
                   res.render('animais',{produtos: produtos.map(pagamento =>pagamento.toJSON())})
                  })
})

app.get("/Ajuda", function(req,res){
        res.render("Ajuda")
})

app.get("/esqueceuSenha", function(req,res){
        res.render("esqueceuSenha")
})

app.get("/meuPerfil", function(req,res){
        if(req.session.nome, req.session.senha){
                usuario.findAll().then(function(usuario){
                res.render('meuPerfil', {usuario: usuario.map(pagameto => pagameto.toJSON())})
         })
}else{
        res.render('login');
}


})

app.get("/nossasOng", function(req,res){
          usuario.findAll({
                where:{'tipo': "Ong" }
            }).then(function(doador){ 
                res.render('nossasOng',{doador: doador.map(pagamento =>pagamento.toJSON())})
                })
        })

app.get("/cadastroProdutos", function(req,res){
        produtos.findAll().then(function(produtos){ 
        res.render('cadastroProdutos',{produtos: produtos.map(pagamento =>pagamento.toJSON())})
        })
})


//----------------------------------------------------


// Rota para se fazer possivel o CSS e colocar as imagens
app.use('/static', express.static(__dirname + '/public'));



//constantes responsaveis pela ospedagem do handleBars com express e body-parser.
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

//configuração handlebars para criar o main.
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set("view engine",'handlebars')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//esse bloco é disparado pelo enviar do formulario
//upload é a constante do multer responsavél por colocar Imagens/arquivos.
app.post('/cadUsuario',upload.single('colocarImagem'), function(req,res){
        console.log(req.file.originalname);
        usuario.create({
                tipo:req.body.tipo,
                nome:req.body.nome,
                senha: crypto(req.body.senha),
                Email:req.body.Email,
                cnpj:req.body.cnpj,
                descricao:req.body.descricao,
                colocarImagem:req.file.originalname
        }).then(function(){
                res.render('login')
        }).catch(function(){
                res.send("Erro"+erro)
        })
})

app.post('/cadDoador',function(req,res){
        usuario.create({
                tipo:req.body.tipo,
                nome:req.body.nome,
                senha:crypto(req.body.senha),
                Email:req.body.Email
        }).then(function(){
                res.render('login')
        }).catch(function(){
                res.send("Erro"+erro)
        })
})


app.post('/cadProdutos', function(req,res){
        produtos.create({
                categoriaDoacao:req.body.categoriaDoacao,
                nomeProduto:req.body.nomeProduto,
                quantidade:req.body.quantidade,
                prioridade:req.body.prioridade
        }).then(function(){
                res.render('doacao')
        }).catch(function(){
                res.send("Erro"+erro)
        })
})
//-------------------------------------------------------------------------------------------------


//este bloco é responsavél por deletar os cadastro de seus respectivos formularios 
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

    app.get('/apaga1/:id', function(req,res){
        produtos.destroy({
            where:{'id': req.params.id}
        }).then(function(){
        produtos.findAll().then(function(produtos){
                res.render('cadastroProdutos', {produtos: produtos.map(pagamento => pagamento.toJSON())})
            })
    
        .catch(function(){res.send("não deu certo")})
        })
    })

    
//--------------------------------------------------------------------------------------------------------

//este bloco é responsavel por modificar/alterar os cadastros de seus respectivos formularios/tabelas.
app.get('/update/:id', function(req,res){
        usuario.findAll({ where:{'id': req.params.id}}).then(function(doadores){
                res.render('atualiza',{doador: doadores.map(pagamento => pagamento.toJSON())})
        })
})

app.get('/updateProdutos/:id', function(req,res){
        produtos.findAll({ where:{'id': req.params.id}}).then(function(produtos){
                res.render('atualizaProdutos',{produtos: produtos.map(pagamento => pagamento.toJSON())})
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

app.post('/updateProdutos', function(req,res){
        produtos.update({ categoriaDoacao:req.body.categoriaDoacao, nomeProduto:req.body.nomeProduto,},{
                where:{id:req.body.codigo}}
        ).then(function(){
                produtos.findAll().then(function(produtos){
                res.render('cadastroProdutos',{produtos: produtos.map(pagamento => pagamento.toJSON())})

                }).catch(function(erro){
                        res.send("Erro "+erro)
                })
        })
         
        
})


//-------------------------------------------------------------------------------------

//Isso faz login sem consultar se o usuario existe só checando as informação que estão aqui!
/*app.post('/cadLogin', function(req,res){ 
        req.session.nome= 'andre';
        req.session.senha= 'repolho123'

        if(req.session.nome == req.body.nome && req.body.senha == 'repolho123'){
                res.send("usuario ligado")
        }else{
                res.send("usuario não concectado")
  }
})*/

//Isso faz login conferindo no banco de dados se o usuario existe e inicia a sessão!
app.post('/cadLogin', function(req,res){
        req.session.nome = req.body.nome
        req.session.senha = crypto(req.body.senha);
 usuario.count({where: {nome: req.session.nome, senha: req.session.senha}}).then(function(dados){
         if(dados >= 1){
                 res.render('template1')
         }else{
                 res.send('usuario não cadastrado' + dados)
         }
 }) 

});

//Isso faz logoff desfazendo a função!
app.get('/logoff', function(req,res){
        req.session.destroy(function(){
                res.render('template1')
        })
})


//--------------------------------------------------------------------------------------
app.listen(3000);