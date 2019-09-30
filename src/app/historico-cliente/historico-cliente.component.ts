import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComprasService } from '../services/compras.service';

@Component({
  selector: 'app-historico-cliente',
  templateUrl: './historico-cliente.component.html',
  styleUrls: ['./historico-cliente.component.scss'],
})
export class HistoricoClienteComponent implements OnInit {

  @Input() cliente: any;
  historico = [];

  constructor(private comprasService: ComprasService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getHistorico();
  }

  getHistorico() {
    this.comprasService.getHistorico(this.cliente.id).subscribe((compras) => {
      this.historico = compras;
      console.log(compras);
    });
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}
