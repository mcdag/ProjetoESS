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
    metas: String[];

    criarMeta(meta: string): void {
      this.metaService.criar(meta).subscribe(
        am => {
          if(am == null){
            alert("um erro ocorreu ao tentar cadastrar uma nova meta")
          }else{
            this.metas.push(am);
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