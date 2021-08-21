import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';
import { MetaService } from './meta.service';

  @Component({
   selector: 'metas',
   templateUrl: './metas.component.html',
   styleUrls: ['./metas.component.css']
 })
 export class MetasComponent implements OnInit {
    constructor(private alunoService: AlunoService, private metaService: MetaService) {}

    alunos: Aluno[];
    metas: string[];
    nomeduplicado: boolean = false;

    criarMeta(meta: string): void {
      this.metaService.criar(meta).subscribe(
        am => {
          if(am == null){
            //alert("um erro ocorreu ao tentar cadastrar uma nova meta")
            this.nomeduplicado = true;
          }else{
            this.metas.push(am);
          }
        },
        msg  => { alert(msg.message);}
      );      
    }

    atualizarMeta(metaAntiga: string, metaNova: string) :void {  
      this.metaService.atualizar(metaAntiga, metaNova).subscribe(
        am => {
          if(am == null){
            alert("Um erro ocorreu ao tentar atualizar a meta" + metaAntiga)
          }else{
            let index = this.metas.indexOf(metaAntiga);            
            this.metas[index] = metaNova;
            this.alunos.forEach(
              aluno => {   
                aluno.metas[metaNova] = aluno.metas[metaAntiga];
            })
            this.removerMetaFront(metaAntiga);
          }
        },
        msg  => { alert(msg.message);}
      );      
    }


    removerMetaFront(meta: string): void{
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

    removerMeta(meta: string) :void {
      this.metaService.remover(meta).subscribe(
        am => {
          if(am == null){
            alert("um erro ocorreu ao tentar remover "+meta)
          }else{
            let index = this.metas.indexOf(meta);  
            console.log(index);       
            this.metas.splice(index, 1);         
          }
        },
        msg  => { alert(msg.message);}
      );      
    }

    atualizarAluno(aluno: Aluno): void {
      this.alunoService.atualizar(aluno).subscribe(
         (a) => { if (a == null) {
          alert("Unexpected fatal error trying to update student information! Please contact the systems administratos."); 
        }
      },
         (msg) => { alert(msg.message); }
      );
    }

    onMove(): void {
      this.nomeduplicado = false;
    }

    ngOnInit(): void {      
      this.alunoService.getAlunos()      
      .subscribe(
         (as) =>  { 
           this.alunos = as;                                
          },
         (msg) => { alert(msg.message); }
      );
      this.metaService.getMetas().subscribe(
        (as) =>  { 
          this.metas = as;                     
         },
        (msg) => { alert(msg.message); }
     );
    }


  } 