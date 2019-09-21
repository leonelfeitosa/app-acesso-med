import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClinicasPage } from './clinicas.page';
import { DetalhesClinicaComponent } from '../detalhes-clinica/detalhes-clinica.component';

const routes: Routes = [
  {
    path: '',
    component: ClinicasPage
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
  declarations: [ClinicasPage, DetalhesClinicaComponent],
  entryComponents: [DetalhesClinicaComponent]
})
export class ClinicasPageModule {}
