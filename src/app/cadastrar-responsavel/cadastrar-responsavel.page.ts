import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-responsavel',
  templateUrl: './cadastrar-responsavel.page.html',
  styleUrls: ['./cadastrar-responsavel.page.scss'],
})
export class CadastrarResponsavelPage implements OnInit {

  responsavelGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    rg: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    endereco: new FormControl('', Validators.required),
    data_nascimento: new FormControl('', Validators.required)
  });

  constructor(private loadingCtrl: LoadingController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  dateFromISO8601(isostr) {
    const parts = isostr.match(/\d+/g);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
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
      localStorage.setItem('responsavel', JSON.stringify(responsavel));
      loading.dismiss()
      this.navCtrl.pop();
    }
  }

}
