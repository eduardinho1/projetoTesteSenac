//Isso faz login sem consultar se o usuario existe só checando as informação que estão aqui!
app.post('/cadLogin', function(req,res){ 
        req.session.nome= 'andre';
        req.session.senha= 'repolho123'

        if(req.session.nome == req.body.nome && req.body.senha == 'repolho123'){
                res.send("usuario ligado")
        }else{
                res.send("usuario não concectado")
  }
})

//req : Recebe do front-end e res: envia para o front-end.
// render: renderisa a rota e send: somente indica o nome mas não renderisa.
//findAll(): lista todos os dados do fórmulario.

/*<div class="row">
<div class="form-group">
    <label for="inputNome">Usuario</label>
    <input name="usuario" type="text" class="form-control" id="inputAddress" placeholder="ex: Eduardo" required> 
</div>

<div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input name="Email" type="email" class="form-control" id="inputEmail4">
</div>

<textarea name="Sobre o que se trata sua requisição?" rows="10" cols="70" class="form-group" placeholder="Bugs, erros, sugestões etc..." required></textarea>
<br>
<button type="submit" class="btn btn-primary form-group">prosseguir</button>*/


//>>>>>>>>>>>>>>>>>>>>>CADASTRO PARA PESSOA<<<<<<<<<<<<<<<<<<<
app.get("/cadPessoa", function(req,res){
        if(req.session.idUsuario == undefined){//para segurança.
                 res.render("pessoa")
        }else{
                res.redirect("/")
        }
})

app.post('/cadPessoa',upload.single('colocarImagem'), function(req,res){
        req.session.cpf = req.body.cpf
        if(req.file){
                var imagem = req.file.originalname
        }else{
                var imagem = 'imagemerro.png'
        }
        pessoa.create({
                nome:req.body.nome,
                endereco:req.body.endereco,
                cpf:req.body.cpf
        }).then(function(){
                pessoa.findAll({where: {cpf:req.session.cpf}}).then(function(doadores){
                        idPessoa = doadores.map(pagamento => pagamento.toJSON().id)
                        console.log("veio isso"+idPessoa) 
                        usuario_padrao = req.session.cpf,
                        senha_padrao = "user123"
                        usuario.create({
                            usuario:req.session.cpf,//aqui pega o nome do usuario como CPF 
                            senha: 'user123', //aqui uma senha pre-definida para quando for fazer o login
                            foto:imagem,
                            Pessoaid: idPessoa.toString()    
                }).then(function(){
                        res.redirect("/")

                notificar.notificando(
                        "eduardomeneghettitec@gmail.com",
                        "123eduardo",
                        "eduardomeneghettitec@gmail.com",
                        usuario_padrao,
                        senha_padrao
                )

                })

        })

})

})

app.get("/restrita", function(req,res){
        if(req.session.idusuario != undefined){
usuario.findAll({
        raw: true,
      //  attibutes:['id'],
        include:[{
                model:pessoa,
                required:true,//elimita registro não encontrado na parental 
        }],where:{id:req.session.idusuario},
        //order:[['id']]
        }).then(function(usuario2){
                res.render('arearestrita',{usuario2})
                console.log(usuario2)
        })
        }else{
                res.redirect('/')

        }

})

/*<div class="card-header bg-white">
    <h1>banco de dados</h1> 
  <div class="table-responsive">
  <table class="table">
  <tr>
    <th>Imagem da Ong</th>
    <th>Nome</th>
    <th>cnpj</th>
    <th>Email</th>
    <th>numeroOng</th>
    <th>descrição da Ong</th>
    <th>atualizar</th>
    <th>excluir</th>
  </tr>
  
    <tr>
      <td><img src="static/img/{{colocarImagem}}"></td>
      <td>{{usuario}}</td>
      <td>{{cnpj}}</td>
      <td>{{Email}}</td>
      <td>{{telefone}}</td>
      <td>{{descricao}}</td>
      <td><button class="btn btn-secondary"><a href="/update/{{id}}" class="text-white" >
      atualizar</a></button></td>
       <td>
        <form method="POST" action="/delete1" style="display: inline;" onsubmit="confirmarDelecao(event, this)">

          <input type="hidden" name="id" value="{{id}}">
          <button class="btn btn-success">Excluir</button>
                    
        </form> 
        
        </form>
       
      </td>
    </tr>
  
</table>
</div>
</div>
</div>

<script>
    function confirmarDelecao(event, form){
        event.preventDefault();
        var decision = confirm("Tem certeza em deletar essa categoria?")
        if(decision){
            form.submit();
        }
    }
</script>*/

