import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ComprasService } from '../services/compras.service';
import { ComprovanteComponent } from '../comprovante/comprovante.component';


@Component({
  selector: 'app-historico-cliente',
  templateUrl: './historico-cliente.component.html',
  styleUrls: ['./historico-cliente.component.scss'],
})
export class HistoricoClienteComponent implements OnInit {

  @Input() cliente: any;
  historico = [];

  constructor(private comprasService: ComprasService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getHistorico();
  }

  getHistorico() {
    this.comprasService.getHistorico(this.cliente.id).subscribe((compras) => {
      this.historico = compras;
      console.log(compras);
    });
  }

  async pagamento(idCompra) {
    const compra = await this.comprasService.getCompra(idCompra).toPromise();
    if (!compra.pago) {
      const pergunta = await this.alertCtrl.create(
        {
          header: "Confirmar",
          message: "Deseja confirmar o pagamento?",
          buttons: [
            {
              text: "Sim",
              role: 'confirm',
              handler: (val) => {
                this.comprasService.alterarCompra(idCompra, {pago: true}).subscribe((res) => {
                  this.confirmarPagamento(compra);
                });
                
                
              }
            },
            {
              text: "Não",
              role: 'cancel',
              handler: (val) => {
                this.alertCtrl.dismiss();
              }
            }
          ],
  
        }
      )
      pergunta.present();
      
    } else {
      const pergunta = await this.alertCtrl.create(
        {
          header: "Visualizar",
          message: "Deseja visualizar o comprovante?",
          buttons: [
            {
              text: "Sim",
              role: 'confirm',
              handler: (val) => {
                this.confirmarPagamento(compra);
              }
            },
            {
              text: "Não",
              role: 'cancel',
              handler: (val) => {
                this.alertCtrl.dismiss();
              }
            }
          ],
  
        }
      )
      pergunta.present();
      
    }
    // const alteracao = {
    //   pago: !compra.pago
    // };
    // const loading = await this.loadingCtrl.create();
    // loading.present();
    // this.comprasService.alterarCompra(idCompra, alteracao).subscribe(async () => {
    //   loading.dismiss();
    //   const alert = await this.alertCtrl.create({
    //     header: 'Sucesso',
    //     message: 'Compra alterada com sucesso',
    //     buttons: ['Ok']
    //   });
    //   await alert.present();
    //   this.clearArray(this.historico);
    //   this.getHistorico();
    // });
  }

  async confirmarPagamento(compra) {
    
    this.comprovante(compra)
  }

  async comprovante(compra) {
    const modalComprovante = await this.modalCtrl.create(
      {
        component: ComprovanteComponent,
        componentProps: {
          compra
        }
      }
    );
    modalComprovante.present();
  }

  clearArray(array: Array<object>) {
    while (array.length > 0) {
      array.pop();
    }
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}
