import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComprasPage } from './compras.page';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CadastrarClientePageModule } from '../cadastrar-cliente/cadastrar-cliente.module';
import { CadastrarClientePage } from '../cadastrar-cliente/cadastrar-cliente.page';
import { ClinicasComponent } from './components/clinicas/clinicas.component';
import { DetalhesClinicaComponent } from '../detalhes-clinica/detalhes-clinica.component';
import { ResumoComponent } from './components/resumo/resumo.component';
import { DetalhesClinicasModule } from '../shared/detalhes-clinicas/detalhes-clinicas.module';
import { ComprovanteComponent } from '../comprovante/comprovante.component';
import { ComprovanteModule } from '../shared/comprovante/comprovante.module';


const routes: Routes = [
  {
    path: '',
    component: ComprasPage,
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clinicas',
    component: ClinicasComponent
  },
  {
    path: 'resumo',
    component: ResumoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CadastrarClientePageModule,
    RouterModule.forChild(routes),
    DetalhesClinicasModule,
    ComprovanteModule
  ],
  declarations: [ComprasPage, ClientesComponent, ClinicasComponent, ResumoComponent],
  entryComponents: [CadastrarClientePage, DetalhesClinicaComponent, ComprovanteComponent]
})
export class ComprasPageModule {}
