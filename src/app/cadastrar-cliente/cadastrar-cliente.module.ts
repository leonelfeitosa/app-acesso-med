import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastrarClientePage } from './cadastrar-cliente.page';
import { CadastrarResponsavelPage } from '../cadastrar-responsavel/cadastrar-responsavel.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastrarClientePage, CadastrarResponsavelPage],
  entryComponents: [CadastrarResponsavelPage]
})
export class CadastrarClientePageModule {}
