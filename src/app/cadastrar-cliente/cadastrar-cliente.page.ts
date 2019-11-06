import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { CadastrarResponsavelPage } from '../cadastrar-responsavel/cadastrar-responsavel.page';
import { Cidade } from '../models/cidade';
import { Estado } from '../models/estado';
import { LocalService } from '../services/local.service';
import { Cliente } from '../models/cliente';
import { Responsavel } from '../models/responsavel';



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
    data_nascimento: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
  });
  responsavel: any = {};
  precisaResponsavel = false;
  editarResponsavel = false;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  compararEstados = this.compararEstadosFn;
  compararCidades = this.compararCidadesFn;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private clientesService: ClientesService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private localService: LocalService) { }

  ngOnInit() {
    this.configureForm();
    this.getEstados();
  }

  async cadastrarResp() {
    let modal;
    if (this.editarResponsavel) {
      modal = await this.modalCtrl.create({
        component: CadastrarResponsavelPage,
        componentProps: {
          responsavel: this.responsavel,
          editar: true
        }
      });
    } else {
      modal = await this.modalCtrl.create({
        component: CadastrarResponsavelPage,
        componentProps: {
          editar: false
        }
      });
    }
    modal.present();
    modal.onDidDismiss().then((data) => {
      this.responsavel = data.data.responsavel;
      this.editarResponsavel = true;
      this.clienteGroup.setErrors(null);
    });
  }

  async cadastrarCliente() {
    if (this.clienteGroup.valid) {
      if (this.precisaResponsavel && Object.keys(this.responsavel).length === 0) {
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'É preciso cadastrar um responsável',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const cliente: Cliente = {
          nome: this.clienteGroup.value.nome,
          rg: this.clienteGroup.value.rg,
          cpf: this.clienteGroup.value.cpf,
          endereco: this.clienteGroup.value.endereco,
          dataNascimento: this.formatarData(),
          responsavel: this.responsavel,
          estado: this.clienteGroup.value.estado.sigla,
          cidade: this.clienteGroup.value.cidade.nome,
        };
        const loading = await this.loadingCtrl.create();
        loading.present();
        this.clientesService.cadastrarCliente(cliente).subscribe(async (data) => {
          loading.dismiss();
          if (await this.testarModal()) {
            this.modalCtrl.dismiss({
              cliente: data.id
            });
          } else {
            const toast = await this.toastCtrl.create({
              message: 'Cliente Cadastrado com sucesso',
              duration: 1000,
              color: 'dark'
            });
            toast.present();
            this.voltarHome();
          }
        });
      }
    }
  }

  getEstados() {
    this.localService.getEstados().subscribe((estados) => {
      this.estados = estados.map((estado) => {
        const newEstado: Estado = {
          id: estado.id,
          nome: estado.nome,
          sigla: estado.sigla,
        };
        return newEstado;
      });
    });
  }
  compararEstadosFn(o1, o2) {
    return o1.sigla === o2.sigla;
  }

  compararCidadesFn(o1, o2) {
    return o1.nome === o2.nome;
  }

  estadoSelecionado(value) {
    this.localService.getCidades(value.id).subscribe((cidades) => {
      this.cidades = cidades.map((cidade) => {
        const newCidade: Cidade = {
          nome: cidade.nome,
        };
        return newCidade;
      });
    });
    this.clienteGroup.get('cidade').enable();
  }

  formatarData() {
    const data = new Date(this.clienteGroup.value.data_nascimento);
    return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`;
  }

  calcularIdade() {
    const idade = this.getAge(this.clienteGroup.value.data_nascimento);
    if (idade < 18) {
      this.precisaResponsavel = true;
      this.clienteGroup.setErrors({ invalid: true });
    } else {
      this.precisaResponsavel = false;
    }
  }

  getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  clearArray(array: any[]) {
    while (array.length > 0) {
      array.pop();
    }
  }

  configureForm() {
    this.clienteGroup.get('estado').valueChanges.subscribe((value) => {
      this.estadoSelecionado(value);
    });
    this.clienteGroup.get('cidade').disable();
  }

  async testarModal() {
    return await this.modalCtrl.getTop();
    
  }

  async voltarHome() {
    let resultado = await this.testarModal();
    if (resultado) {
      this.modalCtrl.dismiss();
    } else {
      this.navCtrl.navigateRoot('/home');
    }

  }

}
