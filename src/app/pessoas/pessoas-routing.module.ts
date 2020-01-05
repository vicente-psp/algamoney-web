import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/salvar', component: PessoaCadastroComponent },
  { path: 'pessoas/salvar/:id', component: PessoaCadastroComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class PessoasRoutingModule { }
