import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clinica } from '../models/clinica';

@Component({
  selector: 'app-detalhes-clinica',
  templateUrl: './detalhes-clinica.component.html',
  styleUrls: ['./detalhes-clinica.component.scss'],
})
export class DetalhesClinicaComponent implements OnInit {

  @Input() clinica: any;
  @Input() isCompra: boolean;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  fechar() {
    this.modalCtrl.dismiss();
  }

  selecionarProcedimento(procedimento: any) {
    if (this.isCompra) {
      this.modalCtrl.dismiss({
        procedimento,
        clinica: this.clinica.id
      });
    }
  }

}
