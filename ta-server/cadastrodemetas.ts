
export class CadastroDeMetas {
    metas: String[] = [];
 
     cadastrar(key: String) : String {
      var result = null;
      if (this.metaNaoCadastrada(key)) {
        this.metas.push(key);
        result = key;       
      }
      return result;
    }

    remover(meta: String){
      var result = null;

      if(!this.metaNaoCadastrada(meta)){
        let index = this.metas.indexOf(meta);
        result = this.metas[index];
        this.metas.splice(index, 1);      
      }
      
      return result;
    }

    metaNaoCadastrada(key: String) : boolean {
        return !this.metas.includes(key);
    }
 
    //  atualizar(aluno: Aluno): Aluno {
    //   var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
    //   if (result) result.copyFrom(aluno);
    //   return result;
    // }
 
     getMetas(): String[]{ 
      return this.metas;
    }
 }