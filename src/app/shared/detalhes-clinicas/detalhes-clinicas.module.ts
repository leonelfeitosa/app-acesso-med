import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetalhesClinicaComponent } from '../../detalhes-clinica/detalhes-clinica.component';



@NgModule({
  declarations: [
    DetalhesClinicaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    DetalhesClinicaComponent
  ]
})
export class DetalhesClinicasModule { }
