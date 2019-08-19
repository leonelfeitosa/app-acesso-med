import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-responsavel',
  templateUrl: './cadastrar-responsavel.page.html',
  styleUrls: ['./cadastrar-responsavel.page.scss'],
})
export class CadastrarResponsavelPage implements OnInit {

  @Input() responsavel: any;
  @Input() editar: boolean;

  responsavelGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required)
  });

  constructor(private loadingCtrl: LoadingController, private navCtrl: NavController, private modalCtrl: ModalController, private navParams: NavParams) { 
    this.editar = navParams.get('editar');
    if(this.editar) {
      this.responsavel = navParams.get('responsavel');
      this.responsavelGroup.setValue({
        nome: this.responsavel.nome,
        rg: this.responsavel.rg,
        cpf: this.responsavel.cpf,
        endereco: this.responsavel.endereco,
        data_nascimento: this.formatDate(this.responsavel.data_nascimento).toISOString()
      });
    }
  }

  ngOnInit() {
  }

  dateFromISO8601(isostr) {
    const parts = isostr.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  }

  formatDate(data: string) {
    const datas = data.split('/');
    return new Date(parseInt(datas[2]), parseInt(datas[1]), parseInt(datas[0]));
  }

  async submit() {
    if(this.responsavelGroup.valid){
      const loading = await this.loadingCtrl.create();
      loading.present();
      const data_nascimento = this.dateFromISO8601(this.responsavelGroup.value.data_nascimento);
      const data_formatada = data_nascimento.getDate() + '/' + (data_nascimento.getMonth() + 1) + '/' + data_nascimento.getFullYear();
      const responsavel = {
        nome: this.responsavelGroup.value.nome,
        rg: this.responsavelGroup.value.rg,
        cpf: this.responsavelGroup.value.cpf,
        endereco: this.responsavelGroup.value.endereco,
        data_nascimento: data_formatada
      };
      loading.dismiss()
      this.modalCtrl.dismiss({
        responsavel: responsavel
      })
    }
  }

  fechar() {
    this.modalCtrl.dismiss();
  }

}
