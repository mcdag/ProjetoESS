
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
 
     atualizar(metaAntiga: string, metaNova: string): string {
      var result =null;
      if(!this.metaNaoCadastrada(metaAntiga)){        
        this.cadastrar(metaNova);
        this.remover(metaAntiga);
        result = metaNova;
      }
      return result;
    }
 
     getMetas(): string[]{ 
      return this.metas;
    }
 }