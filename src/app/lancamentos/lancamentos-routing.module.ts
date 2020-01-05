import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';


const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/salvar', component: LancamentoCadastroComponent },
  { path: 'lancamentos/salvar/:id', component: LancamentoCadastroComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class LancamentosRoutingModule { }
