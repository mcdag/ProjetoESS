
export class CadastroDeMetas {
    metas: string[] = [];
 
     cadastrar(key: string) : string {
      var result = null;
      if (this.metaNaoCadastrada(key)) {
        this.metas.push(key);
        result = key;       
      }
      return result;
    }

    remover(meta: string){
      var result = null;

      if(!this.metaNaoCadastrada(meta)){
        let index = this.metas.indexOf(meta);
        result = this.metas[index];
        this.metas.splice(index, 1);      
      }
      
      return result;
    }

    metaNaoCadastrada(key: string) : boolean {
        return !this.metas.includes(key);
    }
 
    //  atualizar(aluno: Aluno): Aluno {
    //   var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
    //   if (result) result.copyFrom(aluno);
    //   return result;
    // }
 
     getMetas(): string[]{ 
      return this.metas;
    }
 }