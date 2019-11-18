import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';
import { HistoricoClienteComponent } from '../historico-cliente/historico-cliente.component';
import { ComprovanteComponent } from '../comprovante/comprovante.component';
import { ComprovanteModule } from '../shared/comprovante/comprovante.module';

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
    RouterModule.forChild(routes),
    ComprovanteModule
  ],
  declarations: [ClientesPage, HistoricoClienteComponent],
  entryComponents: [HistoricoClienteComponent, ComprovanteComponent]
})
export class ClientesPageModule {}
