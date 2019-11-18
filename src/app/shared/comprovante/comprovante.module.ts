import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprovanteComponent } from '../../comprovante/comprovante.component';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [ComprovanteComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ComprovanteComponent
  ]

})
export class ComprovanteModule { }
