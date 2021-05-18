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
