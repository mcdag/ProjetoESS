import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

    cadastrarMeta(meta: string): void {     
      this.alunos.forEach(
        aluno => {
          aluno.metas[meta] =  "";
      })
    }

    atualizarMeta(metaAntiga: string, metaNova: string): void {
      this.alunos.forEach(
        aluno => {   
          aluno.metas.set(metaNova, aluno.metas[metaAntiga])                  
          aluno.metas.delete(metaAntiga);
      })
    }

    removerMeta(meta: string): void{
      this.alunos.forEach(
        aluno => {      
          //cria aluno auxiliar para receber todas as metas
          var alunoAux = new Aluno(); 
          alunoAux.copyFrom(aluno);

          // apaga todas as metas do aluno atual
          aluno.metas = new Map<string, string>(); 

          // aluno atual recebe todas as metas menos a meta a ser removida
          for(let key in alunoAux.metas){
            if(key != meta){
              aluno.metas[key] = alunoAux.metas[key]
            }
          }   
      })
    }

    cadastrar(aluno: Aluno): Aluno {
     var result = null;
     if (this.cpfNaoCadastrado(aluno.cpf)) {
       result = new Aluno();
       result.copyFrom(aluno);
       this.alunos.push(result);
     }
     return result;
   }

    cpfNaoCadastrado(cpf: string): boolean {
      return !this.alunos.find(a => a.cpf == cpf);
   }

    atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
   }

    getAlunos(): Aluno[] {
     return this.alunos;
   }
}