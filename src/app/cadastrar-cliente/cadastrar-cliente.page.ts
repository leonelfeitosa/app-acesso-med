import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { CadastrarResponsavelPage } from '../cadastrar-responsavel/cadastrar-responsavel.page';



@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.page.html',
  styleUrls: ['./cadastrar-cliente.page.scss'],
})
export class CadastrarClientePage implements OnInit {

  clienteGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required)
  });
  responsavel: any = {};
  precisaResponsavel = false;
  editarResponsavel = false;

  constructor(private navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, private clientesService: ClientesService, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async cadastrarResp(){
    let modal;
    if(this.editarResponsavel) {
      modal = await this.modalCtrl.create({
        component: CadastrarResponsavelPage,
        componentProps: {
          responsavel: this.responsavel,
          editar: true
        }
      });
    }else{
      modal = await this.modalCtrl.create({
        component: CadastrarResponsavelPage,
        componentProps: {
          editar: false
        }
      })
    }
    
    modal.present();
    modal.onDidDismiss().then((data) => {
      this.responsavel = data.data.responsavel;
      this.editarResponsavel = true;
    });
  }

  async cadastrarCliente() {
    if (this.clienteGroup.valid ) {
      if (this.precisaResponsavel && Object.keys(this.responsavel).length === 0) {
          const alert = await this.alertCtrl.create({
            header: 'Erro',
            message: 'É preciso cadastrar um responsável',
            buttons: ['OK']
          });
          await alert.present();
      } else {
        const cliente: any = {
          nome: this.clienteGroup.value.nome,
          rg: this.clienteGroup.value.rg,
          cpf: this.clienteGroup.value.cpf,
          endereco: this.clienteGroup.value.endereco,
          data_nascimento: this.formatarData(),
          responsavel: this.responsavel
        };
        const loading = await this.loadingCtrl.create();
        loading.present();
        this.clientesService.cadastrarCliente(cliente).subscribe(async (data) => {
          loading.dismiss();
          const toast = await this.toastCtrl.create({
            message: 'Cliente Cadastrado com sucesso',
            duration: 1000,
            color: 'dark'
          });
          toast.present();
          this.navCtrl.pop();
        })
      }
    }
  }

  formatarData () {
    const data = new Date(this.clienteGroup.value.data_nascimento);
    return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`
  }

  calcularIdade() {
    const idade = this.getAge(this.clienteGroup.value.data_nascimento);
    if (idade < 18) {
      this.precisaResponsavel = true;
    } else {
      this.precisaResponsavel = false;
    }
  }

  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

}
