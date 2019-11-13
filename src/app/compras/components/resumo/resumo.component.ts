import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController, AlertController, ModalController } from '@ionic/angular';
import { ClientesService } from '../../../services/clientes.service';
import { ClinicasService } from '../../../services/clinicas.service';
import { ComprasService } from '../../../services/compras.service';
import { ComprovanteComponent } from '../../../comprovante/comprovante.component';




@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.scss'],
})
export class ResumoComponent implements OnInit {

  resumoCompra: any = {};
  compra: any;
  loaded = false;

  constructor(private clientesService: ClientesService,
              private clinicasService: ClinicasService,
              private comprasService: ComprasService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.loadingCtrl.create().then((loading) => {
      loading.present();
    });
    this.getCompraFromLocalStorage();
    this.getCompra().then(() => {
      this.loaded = true;
      this.loadingCtrl.dismiss();
    });
  }

  async registrarCompra() {
    this.loadingCtrl.create().then((loading) => {
      loading.present();
    });
    const compra = await this.comprasService.cadastrarCompra(this.compra).toPromise();
    this.loadingCtrl.dismiss();
    // const toast = await this.toastCtrl.create({
    //   message: 'Compra realizada com sucesso',
    //   duration: 1000,
    //   color: 'dark'
    // });
    // toast.present();
    const alert = await this.alertCtrl.create({
      header: 'Compra realizada',
      message: 'Compra realizada. Deseja visualizar o comprovante?',
      buttons: [{
        text: 'Sim',
        role: 'confirm',
        cssClass: 'primary',
        handler: async (e) => {
          const modal = await this.modalCtrl.create({
            component: ComprovanteComponent,
            componentProps: {
              compra
            }
          });
          modal.present();
        }
      }, {
        text: 'Não',
        role: 'cancel',
        cssClass: 'secondary'
      }]
    });
    alert.present();
  }

  getCompraFromLocalStorage() {
    this.compra = JSON.parse(localStorage.getItem('newCompra'));
  }

  async getCompra() {
    this.resumoCompra.cliente = await this.clientesService.getCliente(this.compra.cliente).toPromise();
    this.resumoCompra.clinica = await this.clinicasService.getClinica(this.compra.clinica).toPromise();
    this.resumoCompra.procedimento = this.compra.procedimento;
  }

  getEndereco(elemento: any) {
    return `${elemento.endereco}, ${elemento.cidade}, ${elemento.estado}`;
  }

}
