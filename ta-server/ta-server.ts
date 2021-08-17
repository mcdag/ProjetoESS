import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';
import {CadastroDeMetas} from './cadastrodemetas';

var taserver = express();

var cadastroAluno: CadastroDeAlunos = new CadastroDeAlunos();
var cadastroMeta: CadastroDeMetas = new CadastroDeMetas();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastroAluno.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = cadastroAluno.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastroAluno.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})


taserver.get('/metas', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastroMeta.getMetas()));
})

taserver.post('/meta/:name', function (req: express.Request, res: express.Response) {
  let key = <string> req.params.name;
  let meta = cadastroMeta.cadastrar(key);

  if (meta) {
    cadastroAluno.cadastrarMeta(<string> key)
    res.send({"success": "A meta foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "A meta não pode ser cadastrado"});
  }
})

taserver.delete('/meta/:name', function (req: express.Request, res: express.Response){
  let key = req.params.name;
  let meta = cadastroMeta.remover(key);
  
  if (meta) {
    cadastroAluno.removerMeta( key)
    res.send({"success": "A meta foi removida com sucesso"});
  } else {
    res.send({"failure": "A meta não pode ser removido"});
  }
})


var server = taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }