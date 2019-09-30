import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';
import { HistoricoClienteComponent } from '../historico-cliente/historico-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
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
  declarations: [ClientesPage, HistoricoClienteComponent],
  entryComponents: [HistoricoClienteComponent]
})
export class ClientesPageModule {}
