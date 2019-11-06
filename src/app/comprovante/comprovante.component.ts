import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComprovanteService } from '../services/comprovante.service';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss'],
})
export class ComprovanteComponent implements OnInit {

  @Input() compra;

  constructor(private modalCtrl: ModalController, private comprovanteService:ComprovanteService) { }

  ngOnInit() {
    console.log(this.compra);
  }

  compartilhar() {
    const pdf = this.comprovanteService.gerarPdf(this.compra);
    this.comprovanteService.compartilharArquivo(pdf);
  }

  fechar() {
    this.modalCtrl.dismiss();
  }


}
