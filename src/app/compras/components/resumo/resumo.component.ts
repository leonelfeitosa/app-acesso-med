import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { ClientesService } from '../../../services/clientes.service';
import { ClinicasService } from '../../../services/clinicas.service';
import { ComprasService } from '../../../services/compras.service';




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

  registrarCompra() {
    this.loadingCtrl.create().then((loading) => {
      loading.present();
    });
    this.comprasService.cadastrarCompra(this.compra).subscribe(() => {
      this.loadingCtrl.dismiss();
      this.toastCtrl.create({
        message: 'Compra realizada com sucesso',
        duration: 1000,
        color: 'dark'
      }).then((toast) => {
        toast.present();
        this.navCtrl.navigateRoot('/home');
      });
    });
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
