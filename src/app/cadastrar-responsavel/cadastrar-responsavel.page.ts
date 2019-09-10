import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController, NavParams } from '@ionic/angular';
import { LocalService } from '../services/local.service';
import { Responsavel } from '../models/responsavel';
import { Estado } from '../models/estado';
import { Cidade } from '../models/cidade';

@Component({
  selector: 'app-cadastrar-responsavel',
  templateUrl: './cadastrar-responsavel.page.html',
  styleUrls: ['./cadastrar-responsavel.page.scss'],
})
export class CadastrarResponsavelPage implements OnInit {

  @Input() responsavel: Responsavel;
  @Input() editar: boolean;

  responsavelGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required)
  });

  estados: Estado[] = [];
  cidades: Cidade[] = [];
  compararEstados = this.compararEstadosFn;
  compararCidades = this.compararCidadesFn;

  constructor(private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private navParams: NavParams,
              private localService: LocalService) {
  }

  ngOnInit() {
    this.getEstados();
    this.configureForm();
    this.editar = this.navParams.get('editar');
    if (this.editar) {
      this.responsavel = this.navParams.get('responsavel');
      const estado = this.findEstado(this.responsavel.estado);
      this.estadoSelecionado(estado);
      this.responsavelGroup.setValue({
        nome: this.responsavel.nome,
        rg: this.responsavel.rg,
        cpf: this.responsavel.cpf,
        endereco: this.responsavel.endereco,
        dataNascimento: this.formatDate(this.responsavel.dataNascimento).toISOString(),
        estado,
        cidade: this.findCidade(this.responsavel.cidade),
      });
    }
  }

  dateFromISO8601(isostr: string) {
    const parts = isostr.match(/\d+/g);
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10),
    parseInt(parts[3], 10), parseInt(parts[4], 10), parseInt(parts[5], 10));
  }

  formatDate(data) {
    const datas = data.split('/');
    return new Date(datas[2], datas[1], datas[0]);
  }

  async submit() {
    if (this.responsavelGroup.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      const dataNascimento = this.dateFromISO8601(this.responsavelGroup.value.dataNascimento);
      const dataFormatada = dataNascimento.getDate() + '/' + (dataNascimento.getMonth() + 1) + '/' + dataNascimento.getFullYear();
      const responsavel: Responsavel = {
        nome: this.responsavelGroup.value.nome,
        rg: this.responsavelGroup.value.rg,
        cpf: this.responsavelGroup.value.cpf,
        endereco: this.responsavelGroup.value.endereco,
        dataNascimento: dataFormatada,
        estado: this.responsavelGroup.value.estado.sigla,
        cidade: this.responsavelGroup.value.cidade.nome
      };
      loading.dismiss();
      this.modalCtrl.dismiss({
        responsavel
      });
    }
  }

  compararEstadosFn(o1, o2) {
    return o1.sigla === o2.sigla;
  }

  compararCidadesFn(o1, o2) {
    return o1.nome === o2.nome;
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

  estadoSelecionado(value) {
    this.localService.getCidades(value.id).subscribe((cidades) => {
      this.cidades = cidades.map((cidade) => {
        const newCidade: Cidade = {
          nome: cidade.nome,
        };
        return newCidade;
      });
    });
    this.responsavelGroup.get('cidade').enable();
  }

  configureForm() {
    this.responsavelGroup.get('estado').valueChanges.subscribe((value) => {
      this.estadoSelecionado(value);
    });
    this.responsavelGroup.get('cidade').disable();
  }

  findEstado(sigla: string) {
    return this.estados.find((estado) => {
      if (sigla.toLowerCase() === estado.sigla.toLowerCase()) {
        return true;
      }
      return false;
    });
  }

  findCidade(nome: string) {
    return this.cidades.find((cidade) => {
      if (nome.toLowerCase() === cidade.nome.toLowerCase()) {
        return true;
      }
      return false;
    });
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}
